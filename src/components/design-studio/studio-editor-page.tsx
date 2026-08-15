"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutTemplate,
  Shapes,
  Type,
  Palette,
  Layers,
  Sparkles,
  Scissors,
  Ruler,
  Maximize2,
  RotateCcw,
  FlipHorizontal,
  Search,
  ZoomIn,
  ChevronDown,
  Check,
  X,
  Download,
  Share2,
  FileText,
  Save
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  initialRecentDesigns,
  StudioDesignItem
} from "@/lib/design-studio-data";

interface StudioEditorPageProps {
  designId?: string;
}

export function StudioEditorPage({ designId = "DS67234" }: StudioEditorPageProps) {
  // Find current design or fallback to default
  const activeDesign =
    initialRecentDesigns.find((d) => d.id === designId) ||
    initialRecentDesigns[0];

  const [activeTool, setActiveTool] = useState<string>("Templates");
  const [designTitle, setDesignTitle] = useState(activeDesign?.title || "Untitled Design");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);

  const [selectedColor, setSelectedColor] = useState("#A8DADC");
  const [selectedFabric, setSelectedFabric] = useState("Chanderi Silk");
  const [selectedEmbroidery, setSelectedEmbroidery] = useState("Floral Vine");
  const [showAiAssistant, setShowAiAssistant] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 3 Angle thumbnails for active design
  const angleThumbnails = [
    "/images/design-studio/editor/floral-anarkali-editor.png",
    "/images/design-studio/recent/kurta-mint.jpg",
    "/images/design-studio/generated-mint-anarkali.jpg"
  ];

  const colorPalette = [
    { name: "Ivory Silk", hex: "#FAF5EA" },
    { name: "Peacock Teal", hex: "#078B87" },
    { name: "Royal Maroon", hex: "#800020" },
    { name: "Pastel Mint", hex: "#A8DADC" },
    { name: "Peach Glow", hex: "#E7C0A0" },
    { name: "Coral Bloom", hex: "#FF5B52" },
    { name: "Emerald Deep", hex: "#0B7B6E" }
  ];

  const fabricOptions = [
    { id: "fab-1", name: "Raw Silk", texture: "linear-gradient(135deg, #E6D5B8 0%, #D4C3A3 100%)" },
    { id: "fab-2", name: "Organza Weave", texture: "linear-gradient(135deg, #F0E6D2 0%, #E2D3B8 100%)" },
    { id: "fab-3", name: "Chanderi Silk", texture: "linear-gradient(135deg, #D9C8A9 0%, #C7B594 100%)" },
    { id: "fab-4", name: "Pure Georgette", texture: "linear-gradient(135deg, #F5EBE1 0%, #E8D9C5 100%)" }
  ];

  const embroideryMotifs = [
    {
      id: "emb-1",
      name: "Mughal Paisley",
      svg: (
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" stroke="#4B5563" strokeWidth="1.2">
          <path d="M12 2C8 6 4 10 4 16C4 20.4 7.6 24 12 24C16.4 24 20 20.4 20 16C20 12 18 8 12 2Z" />
          <path d="M12 6C10 9 7 12 7 16C7 18.8 9.2 21 12 21" />
        </svg>
      )
    },
    {
      id: "emb-2",
      name: "Floral Vine",
      svg: (
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" stroke="#4B5563" strokeWidth="1.2">
          <path d="M12 2V26M12 8C15 6 18 8 18 11C15 11 12 10 12 10M12 16C9 14 6 16 6 19C9 19 12 18 12 18M12 20C15 18 18 20 18 23" />
        </svg>
      )
    },
    {
      id: "emb-3",
      name: "Royal Zardozi",
      svg: (
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none" stroke="#4B5563" strokeWidth="1.2">
          <polygon points="12,2 15,10 23,12 17,17 19,26 12,21 5,26 7,17 1,12 9,10" />
        </svg>
      )
    }
  ];

  const tools = [
    { id: "Templates", label: "Templates", icon: LayoutTemplate },
    { id: "Elements", label: "Elements", icon: Shapes },
    { id: "Text", label: "Text", icon: Type },
    { id: "Colors", label: "Colors", icon: Palette },
    { id: "Fabrics", label: "Fabrics", icon: Scissors },
    { id: "Embroidery", label: "Embroidery", icon: Sparkles },
    { id: "Measurements", label: "Measurements", icon: Ruler },
    { id: "AI Assistant", label: "AI Assistant", icon: Sparkles },
    { id: "Layers", label: "Layers", icon: Layers }
  ];

  const handleSave = () => {
    setToastMessage("Design specifications saved successfully!");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApplyAiSuggestion = () => {
    setSelectedEmbroidery("Floral Vine");
    setToastMessage("AI suggestion applied: Floral embroidery added to sleeves.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <PublicShell>
      <div className="studio-root-container">
        {/* Dual Decorative Corner Accents (Yellow on Left, Teal on Right) */}
        <div className="studio-editor-corner-left-wave" aria-hidden="true">
          <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 180C40 150 70 110 110 130C150 150 170 90 200 80C230 72 240 40 240 0H0V180Z"
              fill="#F5A623"
            />
          </svg>
        </div>

        <div className="studio-editor-corner-right-wave" aria-hidden="true">
          <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 180C40 150 70 110 110 130C150 150 170 90 200 80C230 72 240 40 240 0V180H0Z"
              fill="#078B87"
            />
          </svg>
        </div>

        <div className="studio-editor-fullpage-container">
          {/* Top Sub-Navbar */}
          <div className="studio-editor-top-nav">
            {/* Breadcrumb Navigation */}
            <nav className="studio-editor-breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/design-studio" className="studio-editor-breadcrumb-link">
                AI Design Studio
              </Link>
              <span className="studio-editor-breadcrumb-sep">&gt;</span>
              <Link href="/design-studio/my-designs" className="studio-editor-breadcrumb-link">
                Editor
              </Link>
              <span className="studio-editor-breadcrumb-sep">&gt;</span>
              <span className="studio-editor-breadcrumb-active">{designId}</span>
            </nav>

            {/* Center Editable Title */}
            <div className="studio-editor-center-title-box">
              <h1 className="studio-editor-title-heading">{designTitle}</h1>
              <p className="studio-editor-saved-status">Last saved 2 mins ago</p>
            </div>

            {/* Top Right Action Controls */}
            <div className="studio-editor-top-actions">
              <button
                type="button"
                onClick={() => {
                  setToastMessage("Search canvas components...");
                  setTimeout(() => setToastMessage(null), 2000);
                }}
                className="studio-editor-icon-btn"
                title="Search Tools"
              >
                <Search size={16} />
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="studio-editor-save-btn"
              >
                <Save size={15} />
                <span>Save</span>
              </button>

              <Link
                href={`/design-studio/export/${designId}`}
                className="studio-editor-export-btn"
              >
                <span>Export</span>
                <ChevronDown size={15} />
              </Link>
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

          {/* 3-Column Studio Editor Grid */}
          <div className="studio-editor-3col-grid">
            {/* Column 1: Left Studio Tool Sidebar */}
            <aside className="studio-editor-left-tools-bar">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                const isActive = activeTool === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setActiveTool(tool.id)}
                    className={`studio-editor-tool-item ${isActive ? "active" : ""}`}
                    title={tool.label}
                  >
                    <IconComponent size={18} />
                    <span className="studio-editor-tool-title">{tool.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Column 2: Center Interactive Canvas */}
            <main className="studio-editor-center-canvas-wrap">
              {/* Vertical Angles Strip */}
              <div className="studio-editor-angles-strip">
                {angleThumbnails.map((src, idx) => (
                  <div
                    key={idx}
                    className={`studio-editor-angle-thumb ${selectedAngleIndex === idx ? "active" : ""}`}
                    onClick={() => setSelectedAngleIndex(idx)}
                    title={`View Angle ${idx + 1}`}
                  >
                    <img
                      src={src}
                      alt={`Angle ${idx + 1}`}
                      className="studio-editor-angle-img"
                    />
                  </div>
                ))}
              </div>

              {/* Main Interactive Stage */}
              <div className="studio-editor-canvas-stage">
                {/* Bounding Box Frame with 8 Anchor Handles */}
                <div
                  className="studio-editor-bounding-box"
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${rotationDeg}deg) ${
                      isFlipped ? "scaleX(-1)" : ""
                    }`
                  }}
                >
                  <img
                    src={angleThumbnails[selectedAngleIndex]}
                    alt="Active Garment Canvas"
                    className="studio-editor-canvas-garment-img"
                  />

                  {/* 8 Bounding Box Anchor Resize Handles */}
                  <span className="studio-editor-handle-dot studio-editor-handle-tl" />
                  <span className="studio-editor-handle-dot studio-editor-handle-tr" />
                  <span className="studio-editor-handle-dot studio-editor-handle-bl" />
                  <span className="studio-editor-handle-dot studio-editor-handle-br" />
                  <span className="studio-editor-handle-dot studio-editor-handle-tc" />
                  <span className="studio-editor-handle-dot studio-editor-handle-bc" />
                  <span className="studio-editor-handle-dot studio-editor-handle-ml" />
                  <span className="studio-editor-handle-dot studio-editor-handle-mr" />
                </div>

                {/* Floating Bottom Pill Toolbar */}
                <div className="studio-editor-bottom-pill">
                  <span className="studio-editor-zoom-text">Zoom</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                    className="studio-editor-zoom-btn"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <span className="studio-editor-zoom-text">{zoomLevel}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                    className="studio-editor-zoom-btn"
                    title="Zoom In"
                  >
                    +
                  </button>

                  <div className="studio-editor-pill-divider" />

                  <button
                    type="button"
                    onClick={() => setRotationDeg((r) => (r + 90) % 360)}
                    className="studio-editor-pill-action"
                    title="Rotate 90deg"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFlipped((f) => !f)}
                    className="studio-editor-pill-action"
                    title="Flip Horizontal"
                  >
                    <FlipHorizontal size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setZoomLevel(100);
                      setRotationDeg(0);
                      setIsFlipped(false);
                    }}
                    className="studio-editor-pill-action"
                    title="Reset Canvas Fit"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </main>

            {/* Column 3: Right Inspector Panels */}
            <aside className="studio-editor-right-inspector">
              {/* AI Assistant Widget */}
              {showAiAssistant && (
                <div className="studio-editor-assistant-card">
                  <div className="studio-editor-assistant-top">
                    <h2 className="studio-editor-assistant-title">AI Assistant</h2>
                    <button
                      type="button"
                      onClick={() => setShowAiAssistant(false)}
                      className="studio-editor-assistant-close"
                      title="Hide Assistant"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="studio-editor-assistant-bubble">
                    Try adding floral embroidery on the sleeves?
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyAiSuggestion}
                    className="studio-editor-assistant-cta"
                  >
                    Apply Suggestion
                  </button>
                </div>
              )}

              {/* Color Palette Card */}
              <div className="studio-editor-section-card">
                <div className="studio-editor-section-header">
                  <h3 className="studio-editor-section-title">Color Palette</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage("Full color palette active.");
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="studio-editor-view-all-link"
                  >
                    View all
                  </button>
                </div>
                <div className="studio-editor-swatches-row">
                  {colorPalette.map((col) => (
                    <button
                      key={col.hex}
                      type="button"
                      onClick={() => {
                        setSelectedColor(col.hex);
                        setToastMessage(`Selected color: ${col.name}`);
                        setTimeout(() => setToastMessage(null), 2000);
                      }}
                      className={`studio-editor-swatch-circle ${
                        selectedColor === col.hex ? "active" : ""
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              {/* Fabric Options Card */}
              <div className="studio-editor-section-card">
                <div className="studio-editor-section-header">
                  <h3 className="studio-editor-section-title">Fabric Options</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage("Full fabric library active.");
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="studio-editor-view-all-link"
                  >
                    View all
                  </button>
                </div>
                <div className="studio-editor-fabric-grid">
                  {fabricOptions.map((fab) => (
                    <div
                      key={fab.id}
                      onClick={() => {
                        setSelectedFabric(fab.name);
                        setToastMessage(`Applied fabric: ${fab.name}`);
                        setTimeout(() => setToastMessage(null), 2000);
                      }}
                      className={`studio-editor-fabric-item ${
                        selectedFabric === fab.name ? "active" : ""
                      }`}
                      title={fab.name}
                    >
                      <div
                        className="studio-editor-fabric-texture"
                        style={{ background: fab.texture }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Embroidery Motifs Card */}
              <div className="studio-editor-section-card">
                <div className="studio-editor-section-header">
                  <h3 className="studio-editor-section-title">Embroidery</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMessage("Embroidery catalog active.");
                      setTimeout(() => setToastMessage(null), 2000);
                    }}
                    className="studio-editor-view-all-link"
                  >
                    View all
                  </button>
                </div>
                <div className="studio-editor-embroidery-grid">
                  {embroideryMotifs.map((emb) => (
                    <div
                      key={emb.id}
                      onClick={() => {
                        setSelectedEmbroidery(emb.name);
                        setToastMessage(`Added motif: ${emb.name}`);
                        setTimeout(() => setToastMessage(null), 2000);
                      }}
                      className={`studio-editor-embroidery-item ${
                        selectedEmbroidery === emb.name ? "active" : ""
                      }`}
                      title={emb.name}
                    >
                      {emb.svg}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
