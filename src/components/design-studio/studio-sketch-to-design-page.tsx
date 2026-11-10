"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Upload,
  X,
  Sparkles,
  Heart,
  Bookmark,
  Download,
  Loader2,
  Check,
  Eye,
  PenTool
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioGalleryResultSkeleton } from "@/components/common/shadow-skeleton";
import { uploadService } from "@/lib/api/upload-service";
import { getAuthToken } from "@/lib/api/client";
import {
  generateDesignFromPromptApi,
  peekStudioRecentDesigns,
  fetchStudioRecentDesignsApi,
  toggleFavoriteStudioDesignApi,
  StudioDesignItem
} from "@/lib/design-studio-data";
import { useCacheTick } from "@/lib/api/data-cache";

export function StudioSketchToDesignPage() {
  const designsTick = useCacheTick("designs");
  const cachedDesigns = useMemo(
    () => (designsTick >= 0 ? peekStudioRecentDesigns() : null),
    [designsTick]
  );

  const [sketchImg, setSketchImg] = useState<string>(
    "/images/design-studio/uploads/sketch-anarkali.png"
  );
  const [prompt, setPrompt] = useState(
    "Add delicate thread work embroidery and make it in mint green color."
  );

  const [generatedResults, setGeneratedResults] = useState<StudioDesignItem[] | null>(null);
  const [fallbackResults, setFallbackResults] = useState<StudioDesignItem[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const results =
    generatedResults ?? (cachedDesigns ? cachedDesigns.slice(0, 3) : fallbackResults ?? []);
  const setResults = (
    next: StudioDesignItem[] | ((prev: StudioDesignItem[]) => StudioDesignItem[])
  ) => {
    setGeneratedResults((prev) => {
      const base = prev ?? results;
      return typeof next === "function" ? next(base) : next;
    });
  };
  const isLoading =
    generatedResults === null && cachedDesigns === null && fallbackResults === null;

  useEffect(() => {
    if (cachedDesigns !== null) return;
    let isSubscribed = true;

    fetchStudioRecentDesignsApi()
      .then((list) => {
        if (isSubscribed) {
          setFallbackResults(list.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("[SketchToDesign] Failed loading studio concepts:", err);
        if (isSubscribed) setFallbackResults([]);
      });

    return () => {
      isSubscribed = false;
    };
  }, [cachedDesigns]);

  const activeResult = results[activeImageIndex];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    try {
      const result = await generateDesignFromPromptApi({
        prompt: prompt || "Pastel mint green flared Anarkali gown with delicate gold embroidery",
        garmentType: "Mint Green Anarkali Gown",
        style: "Traditional Festive",
        occasion: "Wedding Reception",
        colorPreference: "#A8DADC",
        referenceImage: sketchImg
      });

      setResults((prev) => [result, ...prev.slice(0, 2)]);
      setActiveImageIndex(0);
      setToastMessage("AI rendered 3D model from your sketch!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSketchImg(reader.result);
      }
    };
    reader.readAsDataURL(file);

    if (getAuthToken()) {
      try {
        const upRes = await uploadService.uploadImage(file, "sketches");
        if (upRes?.success && upRes.data?.url) {
          setSketchImg(upRes.data.url);
        }
      } catch (err) {
        console.warn("[SketchToDesign] Storage upload fallback to local preview:", err);
      }
    }

    setToastMessage("Sketch drawing uploaded!");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRemoveSketch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSketchImg("");
  };

  const handleToggleFavorite = async () => {
    if (!activeResult) return;
    const nextStatus = await toggleFavoriteStudioDesignApi(
      activeResult.id,
      activeResult.isFavorite
    );
    setResults((prev) =>
      prev.map((item) =>
        item.id === activeResult.id ? { ...item, isFavorite: nextStatus } : item
      )
    );
    setToastMessage(nextStatus ? "Added to favorites!" : "Removed from favorites");
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

        <div className="studio-image-main-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-image-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-image-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-image-breadcrumb-sep">&gt;</span>
            <span className="studio-image-breadcrumb-active">Sketch to Design</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-image-header-section">
            <h1 className="studio-image-main-heading">Upload your sketch</h1>
            <p className="studio-image-sub-heading">
              Upload your hand sketch and let AI bring it to life.
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
            {/* Left Column: Upload Sketch & Prompt Form Card */}
            <form onSubmit={handleGenerate} className="studio-image-form-card">
              <div className="studio-image-field-group">
                <label className="studio-image-field-label">Upload Sketch</label>

                <div className="studio-image-pair-grid">
                  {/* Sketch Image Box (or Empty State) */}
                  {sketchImg ? (
                    <div
                      className="studio-image-preview-frame"
                      style={{ background: "#FFFFFF", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <img
                        src={sketchImg}
                        alt="Uploaded garment sketch"
                        className="studio-image-preview-img"
                        style={{ objectFit: "contain", maxHeight: "100%" }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveSketch}
                        className="studio-image-preview-remove"
                        title="Remove sketch"
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
                        <PenTool size={18} />
                      </div>
                      <p className="studio-image-upload-title">Select Sketch</p>
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
                    placeholder="e.g. Add delicate thread work embroidery and make it in mint green color..."
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
                    <span>Rendering 3D Garment from Sketch...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Generate Design</span>
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
                  onClick={handleToggleFavorite}
                  disabled={!activeResult || isLoading || isGenerating}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: activeResult ? "pointer" : "default",
                    padding: "6px",
                    color: activeResult?.isFavorite ? "#FF5B52" : "#6B7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.15s ease"
                  }}
                  title="Toggle Favorite"
                >
                  <Heart
                    size={20}
                    fill={activeResult?.isFavorite ? "#FF5B52" : "none"}
                    color={activeResult?.isFavorite ? "#FF5B52" : "#4B5563"}
                  />
                </button>
              </div>

              {isLoading || isGenerating ? (
                <StudioGalleryResultSkeleton thumbs={2} layout="image" />
              ) : results.length === 0 ? (
                <div
                  style={{
                    background: "#FAF8F5",
                    border: "1px dashed #D6D0C4",
                    borderRadius: "14px",
                    padding: "64px 24px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <PenTool size={32} color="#078B87" />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, color: "#111827" }}>
                    Render Your Hand Sketch
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", maxWidth: "320px", margin: 0 }}>
                    Upload a sketch on the left and click &quot;Generate Design&quot; to transform it into a photorealistic outfit render.
                  </p>
                </div>
              ) : (
                <div className="studio-image-gallery-layout">
                  {/* Main Large Visual Frame */}
                  <div className="studio-image-main-frame">
                    <img
                      src={activeResult?.image || "/images/design-studio/generated-mint-anarkali.jpg"}
                      alt={activeResult?.title || "AI Generated Render from Sketch"}
                      className="studio-image-main-img"
                    />
                  </div>

                  {/* Vertical Thumbnail Strip (Right Thumbnails) */}
                  <div className="studio-image-thumbs-column">
                    {results.slice(1, 3).map((item, idx) => {
                      const actualIdx = idx + 1;
                      return (
                        <div
                          key={item.id || idx}
                          className={`studio-image-thumb-box ${activeImageIndex === actualIdx ? "active" : ""}`}
                          onClick={() => setActiveImageIndex(actualIdx)}
                          title={item.title || "View Render Angle"}
                        >
                          <img
                            src={item.image}
                            alt={item.title || `Variation ${actualIdx}`}
                            className="studio-image-thumb-img"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
