"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Sparkles, Scissors, FileText, Heart, Edit3, Loader2, Check } from "lucide-react";
import {
  StudioDesignItem,
  generateDesignFromPromptApi,
  toggleFavoriteStudioDesignApi
} from "@/lib/design-studio-data";

interface StudioDetailModalProps {
  design: StudioDesignItem | null;
  onClose: () => void;
  onFavoriteChange?: (id: string, isFav: boolean) => void;
}

export function StudioDetailModal({
  design,
  onClose,
  onFavoriteChange
}: StudioDetailModalProps) {
  const [isFav, setIsFav] = useState(design?.isFavorite || false);

  if (!design) return null;

  const handleToggleFav = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = await toggleFavoriteStudioDesignApi(design.id);
    setIsFav(newStatus);
    if (onFavoriteChange) {
      onFavoriteChange(design.id, newStatus);
    }
  };

  return (
    <div className="studio-modal-backdrop" onClick={onClose}>
      <div className="studio-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="studio-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Media Preview Pane */}
        <div className="studio-modal-media-pane">
          <img
            src={design.image}
            alt={design.title}
            className="studio-modal-media-img"
          />
          <div style={{ marginTop: "14px", display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={handleToggleFav}
              className={`studio-card-fav-btn ${isFav ? "is-fav" : ""}`}
              style={{ position: "static", border: "1px solid #E5E7EB", width: "40px", height: "40px" }}
              title="Add to Favorites"
            >
              <Heart size={18} fill={isFav ? "#FF5B52" : "none"} color={isFav ? "#FF5B52" : "#4B5563"} />
            </button>
            <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>{design.editedAgo}</span>
          </div>
        </div>

        {/* Content Pane */}
        <div className="studio-modal-content-pane">
          <div>
            <span className="studio-modal-category">{design.category}</span>
            <h3 className="studio-modal-title">{design.title}</h3>
          </div>

          <div className="studio-modal-prompt-box">
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", color: "#078B87", fontWeight: 700, fontSize: "0.8rem" }}>
              <Sparkles size={14} />
              <span>AI DESIGN PROMPT</span>
            </div>
            <p style={{ margin: 0 }}>{design.prompt}</p>
          </div>

          <div className="studio-modal-specs-grid">
            <div className="studio-modal-spec-item">
              <div className="studio-modal-spec-label">Fabric Recommendation</div>
              <div className="studio-modal-spec-val">{design.fabric}</div>
            </div>
            <div className="studio-modal-spec-item">
              <div className="studio-modal-spec-label">Estimated Tailoring</div>
              <div className="studio-modal-spec-val" style={{ color: "#078B87" }}>
                {design.estimatedCost}
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <div className="studio-modal-spec-label" style={{ marginBottom: "8px" }}>
              Suggested Color Palette
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {design.colorPalette.map((hex, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: hex,
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.15)"
                  }}
                  title={hex}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="studio-modal-actions-row">
            <Link
              href={`/book?designId=${encodeURIComponent(design.id)}&title=${encodeURIComponent(design.title)}`}
              className="studio-cta-btn"
              style={{ flex: 1.2, textDecoration: "none" }}
            >
              <Scissors size={16} />
              <span>Book a Tailor</span>
            </Link>

            <Link
              href={`/design-studio/editor/${design.id}`}
              className="studio-quick-action-pill"
              style={{ flex: 1, padding: "10px 14px", textDecoration: "none" }}
            >
              <Edit3 size={16} />
              <span>Open in Editor</span>
            </Link>

            <Link
              href={`/design-studio/export/${design.id}`}
              className="studio-quick-action-pill"
              style={{ flex: 1, padding: "10px 14px", textDecoration: "none" }}
            >
              <FileText size={16} />
              <span>Tech Pack</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StudioPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDesignCreated: (newDesign: StudioDesignItem) => void;
}

export function StudioPromptModal({
  isOpen,
  onClose,
  onDesignCreated
}: StudioPromptModalProps) {
  const [promptText, setPromptText] = useState("");
  const [garmentType, setGarmentType] = useState("Anarkali Suit");
  const [styleType, setStyleType] = useState("Festive");
  const [colorTone, setColorTone] = useState("#078B87");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const garmentOptions = [
    "Anarkali Suit",
    "Pastel Kurta Set",
    "Floral Lehenga",
    "Indo-Western Fusion",
    "Banarasi Saree",
    "Regal Sherwani"
  ];

  const styleOptions = ["Festive", "Royal Wedding", "Minimal Chic", "Contemporary", "Daytime Elegant"];

  const colorOptions = ["#078B87", "#D5B069", "#F2BCBC", "#A8DADC", "#6652A8", "#84A85C"];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsGenerating(true);
    try {
      const generated = await generateDesignFromPromptApi({
        prompt: promptText,
        garmentType,
        style: styleType,
        occasion: styleType,
        colorPreference: colorTone
      });
      onDesignCreated(generated);
      onClose();
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="studio-modal-backdrop" onClick={onClose}>
      <div className="studio-modal-card" style={{ maxWidth: "640px", gridTemplateColumns: "1fr" }} onClick={(e) => e.stopPropagation()}>
        <button className="studio-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <div className="studio-action-icon-wrap teal-solid" style={{ width: "36px", height: "36px" }}>
              <Sparkles size={18} />
            </div>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111", margin: 0 }}>
              Describe Your Dream Outfit
            </h3>
          </div>
          <p style={{ fontSize: "0.9rem", color: "#6B7280", margin: "0 0 24px" }}>
            AI will create a high-fidelity tailor-ready design reference in seconds.
          </p>

          <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="studio-form-group">
              <label className="studio-form-label">
                <span>Prompt / Outfit Description</span>
                <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>0/300</span>
              </label>
              <textarea
                className="studio-prompt-textarea"
                rows={3}
                placeholder="e.g. Royal emerald green Anarkali with intricate golden zardozi embroidery and organza flared layers..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                required
              />
            </div>

            <div className="studio-form-group">
              <label className="studio-form-label">Garment Type</label>
              <select
                value={garmentType}
                onChange={(e) => setGarmentType(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #D1D5DB",
                  background: "#FAF8F5",
                  fontSize: "0.92rem",
                  fontFamily: "inherit"
                }}
              >
                {garmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="studio-form-group">
              <label className="studio-form-label">Style / Occasion</label>
              <div className="studio-chips-row">
                {styleOptions.map((style) => (
                  <button
                    type="button"
                    key={style}
                    className={`studio-chip-btn ${styleType === style ? "active" : ""}`}
                    onClick={() => setStyleType(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="studio-form-group">
              <label className="studio-form-label">Primary Color Preference</label>
              <div className="studio-swatches-row">
                {colorOptions.map((hex) => (
                  <button
                    type="button"
                    key={hex}
                    className={`studio-swatch-circle ${colorTone === hex ? "active" : ""}`}
                    style={{ backgroundColor: hex }}
                    onClick={() => setColorTone(hex)}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !promptText.trim()}
              className="studio-cta-btn"
              style={{ padding: "12px", fontSize: "1rem", marginTop: "8px" }}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Generating Outfit with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generate Design Reference</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
