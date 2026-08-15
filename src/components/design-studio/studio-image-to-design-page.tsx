"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Upload,
  X,
  Sparkles,
  Bookmark,
  Download,
  Loader2,
  Check,
  Eye,
  RefreshCw
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  generateDesignFromPromptApi,
  StudioDesignItem
} from "@/lib/design-studio-data";

export function StudioImageToDesignPage() {
  const [referenceImg, setReferenceImg] = useState<string>(
    "/images/design-studio/reference-cream-anarkali.jpg"
  );
  const [prompt, setPrompt] = useState(
    "Make it in pastel blue with silver embroidery and add a matching dupatta."
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavedAll, setIsSavedAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Results gallery variations
  const [results, setResults] = useState<string[]>([
    "/images/design-studio/generated-pastel-blue-anarkali.jpg",
    "/images/design-studio/recent/anarkali-gold.jpg",
    "/images/design-studio/recent/lehenga-rose.jpg",
    "/images/design-studio/recent/indowestern-sage.jpg"
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    try {
      const result = await generateDesignFromPromptApi({
        prompt: prompt || "Pastel blue ethnic Anarkali with intricate silver embroidery",
        garmentType: "Pastel Blue Anarkali Gown",
        style: "Modern Bridal Contemporary",
        occasion: "Wedding Reception",
        colorPreference: "#A8DADC",
        referenceImage: referenceImg
      });

      if (result.image) {
        setResults((prev) => [result.image, ...prev.slice(0, 3)]);
        setActiveImageIndex(0);
      }

      setToastMessage("Generated similar outfit variations!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAll = () => {
    setIsSavedAll(true);
    setToastMessage("All variations saved to your My Designs!");
    setTimeout(() => {
      setIsSavedAll(false);
      setToastMessage(null);
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setReferenceImg(reader.result);
          setToastMessage("Reference image uploaded!");
          setTimeout(() => setToastMessage(null), 2500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReference = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReferenceImg("");
  };

  return (
    <PublicShell>
      <div className="studio-root-container">
        {/* Signature Coral Bottom Right Wave Accent */}
        <div className="studio-coral-corner-wave" aria-hidden="true">
          <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 220C50 180 80 140 130 155C180 170 200 110 240 100C270 92 280 60 280 0V220H0Z"
              fill="#FF5B52"
            />
          </svg>
        </div>

        <div className="studio-image-main-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-image-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-image-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-image-breadcrumb-sep">&gt;</span>
            <span className="studio-image-breadcrumb-active">Image to Design</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-image-header-section">
            <h1 className="studio-image-main-heading">Upload image reference</h1>
            <p className="studio-image-sub-heading">
              Upload an image and get similar designs.
            </p>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div
              style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                background: "#111827",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                zIndex: 10000,
                animation: "studioFadeIn 0.2s ease"
              }}
            >
              <Check size={16} color="#22C55E" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 2-Column Split Workspace Grid */}
          <div className="studio-image-workspace-grid">
            {/* Left Column: Upload Reference & Prompt Form Card */}
            <form onSubmit={handleGenerate} className="studio-image-form-card">
              <div className="studio-image-field-group">
                <label className="studio-image-field-label">Upload Reference Image</label>

                <div className="studio-image-pair-grid">
                  {/* Reference Image Box (or Empty State) */}
                  {referenceImg ? (
                    <div className="studio-image-preview-frame">
                      <img
                        src={referenceImg}
                        alt="Reference outfit"
                        className="studio-image-preview-img"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveReference}
                        className="studio-image-preview-remove"
                        title="Remove reference image"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <label className="studio-image-upload-box" style={{ cursor: "pointer" }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                      />
                      <div className="studio-image-upload-icon-circle">
                        <Upload size={18} />
                      </div>
                      <p className="studio-image-upload-title">Select Photo</p>
                    </label>
                  )}

                  {/* Drag & Drop Upload Zone */}
                  <label className="studio-image-upload-box" style={{ cursor: "pointer" }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                    <div className="studio-image-upload-icon-circle">
                      <Upload size={18} />
                    </div>
                    <p className="studio-image-upload-title">
                      Click to upload or drag and drop
                    </p>
                    <p className="studio-image-upload-hint">JPG, PNG up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Optional Prompt Input */}
              <div className="studio-image-field-group">
                <label className="studio-image-field-label">
                  Describe your design (Optional)
                </label>
                <div className="studio-image-textarea-wrap">
                  <textarea
                    className="studio-image-textarea"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Change color to pastel blue with silver embroidery and add a matching dupatta..."
                    maxLength={500}
                  />
                  <span className="studio-image-char-count">{prompt.length}/500</span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="studio-image-submit-btn"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Analyzing Image & Generating Variations...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Similar Design</span>
                  </>
                )}
              </button>
            </form>

            {/* Right Column: AI Generated Results Card */}
            <div className="studio-image-result-card">
              <div className="studio-image-result-top">
                <h2 className="studio-image-result-heading">AI Generated Results</h2>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="studio-image-save-all-btn"
                >
                  {isSavedAll ? "Saved!" : "Save All"}
                </button>
              </div>

              <div className="studio-image-gallery-layout">
                {/* Main Large Visual Frame */}
                <div className="studio-image-main-frame">
                  <img
                    src={results[activeImageIndex]}
                    alt="AI Generated Outfit Result"
                    className="studio-image-main-img"
                  />
                </div>

                {/* Vertical Thumbnail Strip (3 Right Thumbnails) */}
                <div className="studio-image-thumbs-column">
                  {results.slice(1, 4).map((imgSrc, idx) => {
                    const actualIdx = idx + 1;
                    return (
                      <div
                        key={idx}
                        className={`studio-image-thumb-box ${activeImageIndex === actualIdx ? "active" : ""}`}
                        onClick={() => setActiveImageIndex(actualIdx)}
                        title="View Angle Variation"
                      >
                        <img
                          src={imgSrc}
                          alt={`Variation ${actualIdx}`}
                          className="studio-image-thumb-img"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
