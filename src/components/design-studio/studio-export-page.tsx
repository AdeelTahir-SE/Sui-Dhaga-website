"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Scissors, Check } from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { initialRecentDesigns } from "@/lib/design-studio-data";

interface StudioExportPageProps {
  designId?: string;
}

export function StudioExportPage({ designId = "DSK1234" }: StudioExportPageProps) {
  const activeDesign =
    initialRecentDesigns.find((d) => d.id === designId) ||
    initialRecentDesigns[0];

  const [activeTab, setActiveTab] = useState("Tech Pack");
  const [selectedColorIdx, setSelectedColorIdx] = useState(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navTabs = [
    "Tech Pack",
    "Garment Details",
    "Size Chart",
    "Colors",
    "Fabrics",
    "Embroidery"
  ];

  const sizeChartData = [
    { size: "S", bust: "36", waist: "30", hip: "38", shoulder: "14", sleeve: "22", length: "54" },
    { size: "M", bust: "38", waist: "32", hip: "40", shoulder: "14.5", sleeve: "22.5", length: "55" },
    { size: "L", bust: "40", waist: "34", hip: "42", shoulder: "15", sleeve: "23", length: "56" },
    { size: "XL", bust: "42", waist: "36", hip: "44", shoulder: "15.5", sleeve: "23.5", length: "57" },
    { size: "XXL", bust: "44", waist: "38", hip: "46", shoulder: "16", sleeve: "24", length: "58" }
  ];

  const colorSwatches = [
    "#111111",
    "#A8A8A8",
    "#D5B069",
    "#C75D5D",
    "#2E4A3E",
    "#A8DADC",
    "#078B87"
  ];

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
                    src={activeDesign?.image || "/images/design-studio/recent/kurta-mint.jpg"}
                    alt={activeDesign?.title || "Garment Spec"}
                    className="studio-export-preview-img"
                  />
                </div>

                {/* Garment Overview Table */}
                <div className="studio-export-overview-box">
                  <div>
                    <h2 className="studio-export-overview-title">Garment Overview</h2>
                    <p className="studio-export-overview-subtitle">
                      {activeDesign?.title || "Mint Green Anarkali Suit"}
                    </p>
                  </div>

                  <table className="studio-export-overview-table">
                    <tbody>
                      <tr>
                        <td className="studio-export-overview-label">Style</td>
                        <td className="studio-export-overview-value">Traditional</td>
                      </tr>
                      <tr>
                        <td className="studio-export-overview-label">Occasion</td>
                        <td className="studio-export-overview-value">Wedding</td>
                      </tr>
                      <tr>
                        <td className="studio-export-overview-label">Season</td>
                        <td className="studio-export-overview-value">All Season</td>
                      </tr>
                      <tr>
                        <td className="studio-export-overview-label">Fit</td>
                        <td className="studio-export-overview-value">Regular Fit</td>
                      </tr>
                      <tr>
                        <td className="studio-export-overview-label">Set</td>
                        <td className="studio-export-overview-value">
                          3 Piece (Kurta, Dupatta, Bottom)
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
                  <li>• Use soft lining for comfort.</li>
                  <li>• Keep flare as per design.</li>
                  <li>• Embroidery on yoke and sleeves.</li>
                  <li>• Attach hooks at back.</li>
                </ul>
              </div>
            </div>

            {/* Right Card: Size Chart, Color Palette, Fabrics & Details */}
            <div className="studio-export-right-card">
              {/* Size Chart */}
              <div>
                <h2 className="studio-export-section-heading">Size Chart (inches)</h2>
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
                        <th>Kurta Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChartData.map((row) => (
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
                          <th>Top</th>
                          <th>Dupatta</th>
                          <th>Bottom</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Georgette</td>
                          <td>Net</td>
                          <td>Santoon</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop: "6px", fontSize: "0.78rem" }}>
                    <span style={{ color: "#6B7280", fontWeight: 600 }}>Embroidery Details: </span>
                    <span style={{ color: "#111111", fontWeight: 700 }}>Floral Motifs</span>
                  </div>
                </div>

                {/* Embroidery Details */}
                <div className="studio-export-detail-panel">
                  <h4 className="studio-export-detail-panel-title">Embroidery Details</h4>
                  <ul className="studio-export-bullets-list">
                    <li>• Thread Work</li>
                    <li>• Floral Motifs</li>
                    <li>• Sequence Work</li>
                    <li>• Zari Highlights</li>
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
                  href={`/customer/find-tailor?designId=${designId}&title=${encodeURIComponent(
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
        </div>
      </div>
    </PublicShell>
  );
}
