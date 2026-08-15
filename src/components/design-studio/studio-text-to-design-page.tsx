"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronDown,
  Bookmark,
  Download,
  Loader2,
  Check,
  Heart,
  Scissors
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  generateDesignFromPromptApi,
  StudioDesignItem
} from "@/lib/design-studio-data";

export function StudioTextToDesignPage() {
  const [prompt, setPrompt] = useState(
    "Elegant pastel pink Anarkali suit with floral embroidery and net dupatta"
  );
  const [garmentType, setGarmentType] = useState("Anarkali Suit");
  const [styleType, setStyleType] = useState("Traditional");
  const [occasion, setOccasion] = useState("Wedding");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Gallery variations
  const [variations, setVariations] = useState<string[]>([
    "/images/design-studio/generated-pink-anarkali.jpg",
    "/images/design-studio/recent/anarkali-gold.jpg",
    "/images/design-studio/recent/lehenga-rose.jpg",
    "/images/design-studio/recent/kurta-mint.jpg"
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const result = await generateDesignFromPromptApi({
        prompt,
        garmentType,
        style: styleType,
        occasion
      });

      // Update variations with newly generated image at the front
      if (result.image) {
        setVariations((prev) => [result.image, ...prev.slice(0, 3)]);
        setActiveImageIndex(0);
      }

      setToastMessage("AI design generated successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDesign = () => {
    setIsSaved(true);
    setToastMessage("Design saved to My Designs!");
    setTimeout(() => {
      setIsSaved(false);
      setToastMessage(null);
    }, 3000);
  };

  const handleDownload = () => {
    const activeSrc = variations[activeImageIndex];
    const link = document.createElement("a");
    link.href = activeSrc;
    link.download = `sui-dhaga-${garmentType.toLowerCase().replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage("Downloading design image...");
    setTimeout(() => setToastMessage(null), 2500);
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

        <div className="studio-text-main-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-text-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-text-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-text-breadcrumb-sep">&gt;</span>
            <span className="studio-text-breadcrumb-active">Text to Design</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-text-header-section">
            <div className="studio-text-flag-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M0 0L14 12L0 24V0Z" fill="#FFD233" />
                <path d="M0 0L14 12L0 24" stroke="#111111" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h1 className="studio-text-main-heading">Describe your outfit</h1>
              <p className="studio-text-sub-heading">
                Share the details and let AI design it for you.
              </p>
            </div>
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

          {/* 2-Column Split Workspace */}
          <div className="studio-text-workspace-grid">
            {/* Left Column: Form Card */}
            <form onSubmit={handleGenerate} className="studio-text-form-card">
              {/* Your Prompt */}
              <div className="studio-text-field-group">
                <label className="studio-text-field-label">Your Prompt</label>
                <div className="studio-text-textarea-wrap">
                  <textarea
                    className="studio-text-textarea"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your outfit silhouette, colors, and embroidery..."
                    maxLength={500}
                    required
                  />
                  <span className="studio-text-char-count">{prompt.length}/500</span>
                </div>
              </div>

              {/* Garment Type */}
              <div className="studio-text-field-group">
                <label className="studio-text-field-label">Garment Type</label>
                <div className="studio-text-select-wrap">
                  <select
                    className="studio-text-select"
                    value={garmentType}
                    onChange={(e) => setGarmentType(e.target.value)}
                  >
                    <option value="Anarkali Suit">Anarkali Suit</option>
                    <option value="Lehenga Choli">Lehenga Choli</option>
                    <option value="Pastel Kurta Set">Pastel Kurta Set</option>
                    <option value="Indo-Western Gown">Indo-Western Gown</option>
                    <option value="Banarasi Saree Blouse">Banarasi Saree Blouse</option>
                    <option value="Royal Sherwani">Royal Sherwani</option>
                  </select>
                  <ChevronDown size={18} className="studio-text-select-icon" />
                </div>
              </div>

              {/* Style */}
              <div className="studio-text-field-group">
                <label className="studio-text-field-label">Style</label>
                <div className="studio-text-select-wrap">
                  <select
                    className="studio-text-select"
                    value={styleType}
                    onChange={(e) => setStyleType(e.target.value)}
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Modern Contemporary">Modern Contemporary</option>
                    <option value="Minimalist Chic">Minimalist Chic</option>
                    <option value="Royal / Heavy Flare">Royal / Heavy Flare</option>
                    <option value="Pastel Glow">Pastel Glow</option>
                  </select>
                  <ChevronDown size={18} className="studio-text-select-icon" />
                </div>
              </div>

              {/* Occasion */}
              <div className="studio-text-field-group">
                <label className="studio-text-field-label">Occasion</label>
                <div className="studio-text-select-wrap">
                  <select
                    className="studio-text-select"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Reception">Reception</option>
                    <option value="Festive / Eid / Diwali">Festive / Eid / Diwali</option>
                    <option value="Sangeet / Mehendi">Sangeet / Mehendi</option>
                    <option value="Party / Cocktail">Party / Cocktail</option>
                    <option value="Casual / Daywear">Casual / Daywear</option>
                  </select>
                  <ChevronDown size={18} className="studio-text-select-icon" />
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="studio-text-submit-btn"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating Outfit with AI...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Design</span>
                    <Sparkles size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Right Column: AI Generated Result Card */}
            <div className="studio-text-result-card">
              <h2 className="studio-text-result-heading">AI Generated Result</h2>

              <div className="studio-text-gallery-layout">
                {/* Main Large Visual Frame */}
                <div className="studio-text-main-frame">
                  <img
                    src={variations[activeImageIndex]}
                    alt="AI Generated Outfit"
                    className="studio-text-main-img"
                  />
                </div>

                {/* Vertical Thumbnail Strip (3 Right Thumbnails) */}
                <div className="studio-text-thumbs-column">
                  {variations.slice(1, 4).map((imgSrc, idx) => {
                    const actualIdx = idx + 1;
                    return (
                      <div
                        key={idx}
                        className={`studio-text-thumb-box ${activeImageIndex === actualIdx ? "active" : ""}`}
                        onClick={() => setActiveImageIndex(actualIdx)}
                        title="View Angle Variation"
                      >
                        <img
                          src={imgSrc}
                          alt={`Variation ${actualIdx}`}
                          className="studio-text-thumb-img"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="studio-text-actions-bar">
                <button
                  type="button"
                  onClick={handleSaveDesign}
                  className="studio-text-outline-action"
                >
                  {isSaved ? <Check size={17} color="#0B7B6E" /> : <Bookmark size={17} />}
                  <span>{isSaved ? "Saved!" : "Save Design"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="studio-text-outline-action"
                >
                  <Download size={17} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
