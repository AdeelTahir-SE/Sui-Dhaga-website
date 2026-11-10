"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Download, Scissors, Check } from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioExportSkeleton } from "@/components/common/shadow-skeleton";
import {
  peekDesignById,
  peekTechPackByDesignId,
  fetchDesignByIdApi,
  fetchTechPackByDesignIdApi,
  StudioDesignItem,
  TechPackData
} from "@/lib/design-studio-data";
import { useCacheTick } from "@/lib/api/data-cache";

interface StudioExportPageProps {
  designId?: string;
}

export function StudioExportPage({ designId = "DSK1234" }: StudioExportPageProps) {
  const designsTick = useCacheTick("designs");
  const measurementsTick = useCacheTick("measurements");

  const cachedDesign = useMemo(
    () => (designsTick >= 0 ? peekDesignById(designId) : undefined),
    [designsTick, designId]
  );
  const cachedTechPack = useMemo(
    () => (designsTick >= 0 && measurementsTick >= 0 ? peekTechPackByDesignId(designId) : null),
    [designsTick, measurementsTick, designId]
  );

  const [fallbackState, setFallbackState] = useState<{
    id: string;
    design: StudioDesignItem | null;
    techPack: TechPackData | null;
  } | null>(null);

  const activeDesign =
    cachedDesign !== undefined
      ? cachedDesign
      : fallbackState?.id === designId
      ? fallbackState.design
      : null;
  const techPack =
    cachedTechPack ?? (fallbackState?.id === designId ? fallbackState.techPack : null);
  const isLoading =
    (cachedDesign === undefined || cachedTechPack === null) && fallbackState?.id !== designId;

  const [activeTab, setActiveTab] = useState("Tech Pack");
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (cachedDesign !== undefined && cachedTechPack !== null) return;
    let isSubscribed = true;

    Promise.all([
      cachedDesign !== undefined ? Promise.resolve(cachedDesign) : fetchDesignByIdApi(designId),
      cachedTechPack !== null ? Promise.resolve(cachedTechPack) : fetchTechPackByDesignIdApi(designId)
    ])
      .then(([designData, tpData]) => {
        if (!isSubscribed) return;
        setFallbackState({ id: designId, design: designData, techPack: tpData });
      })
      .catch((err) => {
        console.error("[StudioExport] Load failed:", err);
        if (isSubscribed) {
          setFallbackState({ id: designId, design: null, techPack: null });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [designId, cachedDesign, cachedTechPack]);

  const navTabs = [
    "Tech Pack",
    "Garment Details",
    "Size Chart",
    "Colors",
    "Fabrics",
    "Embroidery"
  ];

  const sizeChartRows =
    techPack?.sizeChart?.map((row) => ({
      size: row.size,
      bust: row.chest,
      waist: row.waist,
      hip: row.hip,
      shoulder: row.size.startsWith("Custom") ? "Matched" : "14.5 in",
      sleeve: row.size.startsWith("Custom") ? "Matched" : "22.5 in",
      length: row.length
    })) || [
      { size: "S", bust: "34 in", waist: "28 in", hip: "38 in", shoulder: "14 in", sleeve: "22 in", length: "54 in" },
      { size: "M", bust: "36 in", waist: "30 in", hip: "40 in", shoulder: "14.5 in", sleeve: "22.5 in", length: "55 in" },
      { size: "L", bust: "38 in", waist: "32 in", hip: "42 in", shoulder: "15 in", sleeve: "23 in", length: "56 in" }
    ];

  const colorSwatches =
    techPack?.colorPalette?.length
      ? techPack.colorPalette.map((c) => c.hex)
      : ["#111111", "#A8A8A8", "#D5B069", "#C75D5D", "#2E4A3E", "#A8DADC", "#078B87"];

  const handleDownloadPdf = () => {
    setToastMessage("Generating PDF Tech Pack specification...");
    setTimeout(() => {
      window.print();
      setToastMessage(null);
    }, 600);
  };

  const handleShareWithTailor = () => {
    setToastMessage("Tech pack shared! Opening bespoke tailor consultation...");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <PublicShell>
      <div className="studio-root-container">
        {/* Decorative Corner Accents */}
        <div className="studio-export-corner-left-wave" aria-hidden="true">
          <img src="/images/contact/yellow-corner.png" alt="" />
        </div>

        <div className="studio-export-corner-right-wave" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" />
        </div>

        <div className="studio-export-page-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-export-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-export-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-export-breadcrumb-sep">&gt;</span>
            <Link href="/design-studio/my-designs" className="studio-export-breadcrumb-link">
              Export
            </Link>
            <span className="studio-export-breadcrumb-sep">&gt;</span>
            <span className="studio-export-breadcrumb-active">{designId}</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-export-header-section">
            <h1 className="studio-export-main-heading">Export Design / Tech Pack</h1>
            <p className="studio-export-sub-heading">
              Download tech pack or share with your tailor.
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
          {isLoading ? (
            <StudioExportSkeleton />
          ) : (
            <div className="studio-export-2col-grid">
              {/* Left Card: Tech Pack Preview & Garment Specs */}
              <div className="studio-export-left-card">
                <div className="studio-export-left-top-grid">
                  {/* Nav Jumps List */}
                  <div className="studio-export-nav-list">
                    {navTabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`studio-export-nav-tab ${
                          activeTab === tab ? "active" : ""
                        }`}
                      >
                        {tab} {activeTab === tab && ">"}
                      </button>
                    ))}
                  </div>

                  {/* Garment Preview Image */}
                  <div className="studio-export-preview-box">
                    <img
                      src={
                        activeDesign?.image ||
                        techPack?.previewImage ||
                        "/images/design-studio/recent/kurta-mint.jpg"
                      }
                      alt={activeDesign?.title || techPack?.designName || "Garment Spec"}
                      className="studio-export-preview-img"
                    />
                  </div>

                  {/* Garment Overview Table */}
                  <div className="studio-export-overview-box">
                    <div>
                      <h2 className="studio-export-overview-title">Garment Overview</h2>
                      <p className="studio-export-overview-subtitle">
                        {activeDesign?.title || techPack?.designName || "Custom Outfit Tech Pack"}
                      </p>
                    </div>

                    <table className="studio-export-overview-table">
                      <tbody>
                        <tr>
                          <td className="studio-export-overview-label">Category</td>
                          <td className="studio-export-overview-value">
                            {activeDesign?.category || techPack?.category || "Bespoke Ethnic"}
                          </td>
                        </tr>
                        <tr>
                          <td className="studio-export-overview-label">Occasion</td>
                          <td className="studio-export-overview-value">
                            {techPack?.occasion || "Festive / Wedding"}
                          </td>
                        </tr>
                        <tr>
                          <td className="studio-export-overview-label">Primary Fabric</td>
                          <td className="studio-export-overview-value">
                            {activeDesign?.fabric || techPack?.fabrics?.[0]?.name || "Pure Silk"}
                          </td>
                        </tr>
                        <tr>
                          <td className="studio-export-overview-label">Est. Budget</td>
                          <td className="studio-export-overview-value">
                            {activeDesign?.estimatedCost || "Rs. 14,500 - Rs. 20,000"}
                          </td>
                        </tr>
                        <tr>
                          <td className="studio-export-overview-label">Created On</td>
                          <td className="studio-export-overview-value">
                            {techPack?.createdOn || activeDesign?.savedDate || "Recently"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tailor Instructions Subsection */}
                <div className="studio-export-instructions-box">
                  <h3 className="studio-export-instructions-title">Tailor Instructions</h3>
                  <ul className="studio-export-instructions-list">
                    <li>• {techPack?.liningDetails || "Use soft breathable cotton lining for comfort."}</li>
                    <li>• {techPack?.embroideryDetails || "Embroidery detailing on yoke and sleeves."}</li>
                    <li>• {techPack?.stitchingNotes || "Maintain clean seam margins for future alterations."}</li>
                  </ul>
                </div>
              </div>

              {/* Right Card: Size Chart, Color Palette, Fabrics & Details */}
              <div className="studio-export-right-card">
                {/* Size Chart */}
                <div>
                  <h2 className="studio-export-section-heading">Size Chart & Saved Measurements</h2>
                  <div className="studio-export-size-table-wrap" style={{ marginTop: "10px" }}>
                    <table className="studio-export-size-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Bust</th>
                          <th>Waist</th>
                          <th>Hip</th>
                          <th>Shoulder</th>
                          <th>Sleeve Length</th>
                          <th>Length</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChartRows.map((row) => (
                          <tr key={row.size}>
                            <td><strong>{row.size}</strong></td>
                            <td>{row.bust}</td>
                            <td>{row.waist}</td>
                            <td>{row.hip}</td>
                            <td>{row.shoulder}</td>
                            <td>{row.sleeve}</td>
                            <td>{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <div className="studio-export-color-row">
                    <h3 className="studio-export-section-heading">Color Palette</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setToastMessage("Displaying verified pantone color swatches.");
                        setTimeout(() => setToastMessage(null), 2000);
                      }}
                      className="studio-export-more-btn"
                    >
                      View More
                    </button>
                  </div>
                  <div className="studio-export-swatches-wrap" style={{ marginTop: "10px" }}>
                    {colorSwatches.map((color, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`studio-export-swatch ${
                          selectedColorIdx === idx ? "active" : ""
                        }`}
                        style={{ backgroundColor: color, cursor: "pointer" }}
                        title={`Pantone ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Fabrics Used & Embroidery Details 2-Column Split */}
                <div className="studio-export-details-split">
                  {/* Fabrics Used */}
                  <div className="studio-export-detail-panel">
                    <h4 className="studio-export-detail-panel-title">Fabrics Used</h4>
                    <div className="studio-export-fabrics-table-scroll">
                      <table className="studio-export-fabrics-mini-table">
                        <thead>
                          <tr>
                            <th>Top / Primary</th>
                            <th>Composition</th>
                            <th>Yardage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(techPack?.fabrics || [{ name: "Pure Silk", composition: "100% Silk", yardage: "4.0m" }]).slice(0, 2).map((f, i) => (
                            <tr key={i}>
                              <td>{f.name}</td>
                              <td>{f.composition}</td>
                              <td>{f.yardage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Embroidery Details */}
                  <div className="studio-export-detail-panel">
                    <h4 className="studio-export-detail-panel-title">Embroidery & Tags</h4>
                    <ul className="studio-export-bullets-list">
                      {(activeDesign?.tags || ["Thread Work", "Floral Motifs", "Zari Highlights"]).map((tg) => (
                        <li key={tg}>• {tg}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="studio-export-cta-row">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="studio-export-pdf-btn"
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>

                  <Link
                    href={`/tailors?designId=${encodeURIComponent(activeDesign?.id || designId)}&title=${encodeURIComponent(
                      activeDesign?.title || "Custom Outfit"
                    )}`}
                    onClick={handleShareWithTailor}
                    className="studio-export-tailor-btn"
                  >
                    <Scissors size={16} />
                    <span>Share with Tailor</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicShell>
  );
}
