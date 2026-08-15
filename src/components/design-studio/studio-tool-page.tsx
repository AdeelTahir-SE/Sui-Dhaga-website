"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  PenTool,
  Loader2,
  RefreshCw,
  Eye,
  Edit3,
  FileText,
  Heart,
  Check
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioSidebar } from "@/components/design-studio/studio-sidebar";
import { StudioDetailModal } from "@/components/design-studio/studio-modals";
import {
  StudioDesignItem,
  generateDesignFromPromptApi,
  initialRecentDesigns
} from "@/lib/design-studio-data";

interface StudioToolPageProps {
  view: "text" | "image" | "sketch";
}

export function StudioToolPage({ view }: StudioToolPageProps) {
  const isImage = view === "image";
  const isSketch = view === "sketch";

  const defaultPrompt = isImage
    ? "Remix this Anarkali silhouette with deep emerald raw silk fabric and golden gotta patti borders."
    : isSketch
    ? "Transform hand sketch into a royal floor-length Anarkali suit with flared paneling and sheer dupatta."
    : "Regal floor-length champagne gold embroidered Anarkali suit with intricate zardozi floral threadwork.";

  const [prompt, setPrompt] = useState(defaultPrompt);
  const [garmentType, setGarmentType] = useState("Anarkali Suit");
  const [styleType, setStyleType] = useState("Festive");
  const [occasion, setOccasion] = useState("Wedding Reception");
  const [selectedColor, setSelectedColor] = useState("#078B87");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<StudioDesignItem[]>(initialRecentDesigns.slice(0, 3));
  const [selectedDesign, setSelectedDesign] = useState<StudioDesignItem | null>(null);

  const colors = ["#078B87", "#D5B069", "#F2BCBC", "#A8DADC", "#6652A8", "#84A85C"];
  const styles = ["Festive", "Royal Wedding", "Modern Chic", "Pastel Glow", "Minimal Ethnic"];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const newDesign = await generateDesignFromPromptApi({
        prompt,
        garmentType,
        style: styleType,
        occasion,
        colorPreference: selectedColor
      });
      setResults((prev) => [newDesign, ...prev]);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const pageTitle = isImage
    ? "Image to Design"
    : isSketch
    ? "Sketch to Design"
    : "Text to Design";

  const pageSubtitle = isImage
    ? "Upload reference photo and customize style, color, and embellishments."
    : isSketch
    ? "Convert hand-drawn ethnic sketches into realistic tailor-ready outfits."
    : "Describe your dream outfit and generate AI design variations.";

  return (
    <PublicShell>
      <div className="studio-root-container">
        <div className="studio-main-wrapper">
          <div className="studio-layout-grid">
            <StudioSidebar activeTab="new" />

            <main className="studio-content-body">
              <div className="studio-hero-banner">
                <div>
                  <h1 className="studio-hero-title">{pageTitle}</h1>
                  <p className="studio-hero-subtitle">{pageSubtitle}</p>
                </div>
              </div>

              <div className="studio-tool-page-container">
                {/* Left Tool Configuration Panel */}
                <div className="studio-tool-card">
                  {/* File Upload Area (For Image & Sketch Modes) */}
                  {(isImage || isSketch) && (
                    <div className="studio-form-group">
                      <label className="studio-form-label">
                        <span>{isImage ? "Reference Image" : "Upload Sketch"}</span>
                        <span style={{ fontSize: "0.8rem", color: "#078B87", fontWeight: 600 }}>
                          JPG, PNG up to 10MB
                        </span>
                      </label>
                      <div
                        style={{
                          border: "2px dashed #CBD5E1",
                          borderRadius: "14px",
                          padding: "28px 20px",
                          textAlign: "center",
                          background: "#FAF8F5",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >
                        <div
                          className="studio-action-icon-wrap teal-outline"
                          style={{ width: "48px", height: "48px" }}
                        >
                          <Upload size={22} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: "#111", fontSize: "0.95rem" }}>
                            Click to upload or drag & drop
                          </p>
                          <p style={{ margin: "2px 0 0", color: "#6B7280", fontSize: "0.82rem" }}>
                            {isImage ? "Upload front or full-length outfit reference" : "Upload pencil sketch or fabric outline"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prompt Textarea */}
                  <div className="studio-form-group">
                    <label className="studio-form-label">
                      <span>Design Prompt & Instructions</span>
                      <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>{prompt.length}/500</span>
                    </label>
                    <textarea
                      className="studio-prompt-textarea"
                      rows={4}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe fabric, embroidery, flare, and neckline details..."
                    />
                  </div>

                  {/* Garment Selector */}
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
                      <option value="Anarkali Suit">Anarkali Suit</option>
                      <option value="Pastel Kurta Set">Pastel Kurta Set</option>
                      <option value="Floral Lehenga">Floral Lehenga</option>
                      <option value="Indo-Western Fusion">Indo-Western Fusion</option>
                      <option value="Banarasi Saree">Banarasi Saree</option>
                    </select>
                  </div>

                  {/* Style Chips */}
                  <div className="studio-form-group">
                    <label className="studio-form-label">Style Aesthetics</label>
                    <div className="studio-chips-row">
                      {styles.map((st) => (
                        <button
                          type="button"
                          key={st}
                          className={`studio-chip-btn ${styleType === st ? "active" : ""}`}
                          onClick={() => setStyleType(st)}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Swatches */}
                  <div className="studio-form-group">
                    <label className="studio-form-label">Color Theme</label>
                    <div className="studio-swatches-row">
                      {colors.map((hex) => (
                        <button
                          type="button"
                          key={hex}
                          className={`studio-swatch-circle ${selectedColor === hex ? "active" : ""}`}
                          style={{ backgroundColor: hex }}
                          onClick={() => setSelectedColor(hex)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="studio-cta-btn"
                    style={{ padding: "12px", fontSize: "1rem", marginTop: "8px" }}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Rendering Outfit Variations...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>Generate Design Variations</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Right Result Preview Panel */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 750, color: "#111", margin: 0 }}>
                      Generated Variations
                    </h3>
                    <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>
                      {results.length} concepts available
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {results.map((design) => (
                      <div
                        key={design.id}
                        className="studio-design-card"
                        style={{ flexDirection: "row", height: "130px" }}
                        onClick={() => setSelectedDesign(design)}
                      >
                        <div style={{ width: "110px", height: "100%", background: "#F5F2EB", flexShrink: 0 }}>
                          <img
                            src={design.image}
                            alt={design.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "#078B87", fontWeight: 700, textTransform: "uppercase" }}>
                              {design.category}
                            </span>
                            <h4 style={{ fontSize: "1rem", fontWeight: 750, color: "#111", margin: "2px 0 0" }}>
                              {design.title}
                            </h4>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>{design.estimatedCost}</span>
                            <span style={{ fontSize: "0.82rem", color: "#078B87", fontWeight: 700 }}>
                              Quick View →
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Modal */}
        <StudioDetailModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      </div>
    </PublicShell>
  );
}
