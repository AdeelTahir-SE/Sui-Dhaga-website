"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Edit3,
  FileText,
  Scissors,
  Trash2,
  Check,
  Eye,
  Plus
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioDetailModal } from "@/components/design-studio/studio-modals";
import {
  initialRecentDesigns,
  StudioDesignItem
} from "@/lib/design-studio-data";

export function StudioMyDesignsPage() {
  const [designs, setDesigns] = useState<StudioDesignItem[]>(initialRecentDesigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStyle, setSelectedStyle] = useState("All Styles");
  const [sortOrder, setSortOrder] = useState<"Latest" | "Oldest" | "A-Z">("Latest");

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedDesignForModal, setSelectedDesignForModal] = useState<StudioDesignItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & search computation
  const filteredDesigns = useMemo(() => {
    let list = [...designs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.prompt.toLowerCase().includes(q)
      );
    }

    if (selectedType !== "All Types") {
      list = list.filter((d) => d.category === selectedType || d.tags.includes(selectedType));
    }

    if (selectedStyle !== "All Styles") {
      list = list.filter((d) => d.tags.includes(selectedStyle));
    }

    if (sortOrder === "A-Z") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "Oldest") {
      list.reverse();
    }

    return list;
  }, [designs, searchQuery, selectedType, selectedStyle, sortOrder]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    setActiveMenuId(null);
    setToastMessage("Design removed from My Designs.");
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <PublicShell>
      <div className="studio-root-container" onClick={() => setActiveMenuId(null)}>
        {/* Signature Coral Bottom Right Wave Accent */}
        <div className="studio-coral-corner-wave" aria-hidden="true">
          <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 220C50 180 80 140 130 155C180 170 200 110 240 100C270 92 280 60 280 0V220H0Z"
              fill="#FF5B52"
            />
          </svg>
        </div>

        <div className="studio-my-designs-page-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-my-designs-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-my-designs-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-my-designs-breadcrumb-sep">&gt;</span>
            <span className="studio-my-designs-breadcrumb-active">My Designs</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-my-designs-header-section">
            <div className="studio-my-designs-flag-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M0 0L14 12L0 24V0Z" fill="#FFD233" />
                <path d="M0 0L14 12L0 24" stroke="#111111" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h1 className="studio-my-designs-main-heading">My Designs</h1>
              <p className="studio-my-designs-sub-heading">
                All your created designs in one place.
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

          {/* Search & Filter Controls Bar */}
          <div className="studio-my-designs-controls-bar">
            {/* Search Input */}
            <div className="studio-my-designs-search-wrap">
              <Search size={18} className="studio-my-designs-search-icon" />
              <input
                type="text"
                placeholder="Search my designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="studio-my-designs-search-input"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="studio-my-designs-filters-wrap">
              {/* Type Filter */}
              <div className="studio-my-designs-select-wrap">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="studio-my-designs-select"
                >
                  <option value="All Types">All Types</option>
                  <option value="Anarkali">Anarkali</option>
                  <option value="Lehenga">Lehenga</option>
                  <option value="Kurta Set">Kurta Set</option>
                  <option value="Indo-Western">Indo Western</option>
                  <option value="Saree">Saree</option>
                  <option value="Sherwani">Men's Wear</option>
                </select>
                <ChevronDown size={16} className="studio-my-designs-select-arrow" />
              </div>

              {/* Style Filter */}
              <div className="studio-my-designs-select-wrap">
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="studio-my-designs-select"
                >
                  <option value="All Styles">All Styles</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Sangeet">Sangeet / Festive</option>
                  <option value="Floral">Floral Embroidery</option>
                  <option value="Pastel Mint">Pastel Glow</option>
                  <option value="Classic">Classic Cuts</option>
                </select>
                <ChevronDown size={16} className="studio-my-designs-select-arrow" />
              </div>

              {/* Sort Order */}
              <div className="studio-my-designs-select-wrap">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="studio-my-designs-select"
                >
                  <option value="Latest">Sort: Latest</option>
                  <option value="Oldest">Sort: Oldest</option>
                  <option value="A-Z">Sort: A to Z</option>
                </select>
                <ChevronDown size={16} className="studio-my-designs-select-arrow" />
              </div>
            </div>
          </div>

          {/* 4-Column Design Cards Grid */}
          {filteredDesigns.length === 0 ? (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "1px solid #EAE6DF",
                padding: "60px 24px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px"
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>No matching designs found</h3>
              <p style={{ color: "#6B7280", margin: 0, maxWidth: "400px" }}>
                Try adjusting your search query or filters to find what you're looking for.
              </p>
              <Link
                href="/design-studio/new"
                style={{
                  background: "#0B7B6E",
                  color: "#FFFFFF",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: 650,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "8px"
                }}
              >
                <Plus size={16} />
                <span>Create New Design</span>
              </Link>
            </div>
          ) : (
            <div className="studio-my-designs-4col-grid">
              {filteredDesigns.map((design) => (
                <article
                  key={design.id}
                  className="studio-my-design-card"
                  onClick={() => setSelectedDesignForModal(design)}
                >
                  <div className="studio-my-design-img-frame">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="studio-my-design-img"
                    />
                  </div>
                  <div className="studio-my-design-body">
                    <h3 className="studio-my-design-title">{design.title}</h3>
                    <div className="studio-my-design-meta-bar">
                      <span className="studio-my-design-edited-text">
                        {design.editedAgo}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === design.id ? null : design.id);
                        }}
                        className="studio-my-design-menu-btn"
                        aria-label="Design options menu"
                      >
                        <MoreHorizontal size={17} />
                      </button>

                      {/* Dropdown Action Menu */}
                      {activeMenuId === design.id && (
                        <div
                          className="studio-my-design-menu-popup"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link
                            href={`/design-studio/editor/${design.id}`}
                            className="studio-my-design-menu-item"
                          >
                            <Edit3 size={14} />
                            <span>Open in Editor</span>
                          </Link>

                          <Link
                            href={`/design-studio/export/${design.id}`}
                            className="studio-my-design-menu-item"
                          >
                            <FileText size={14} />
                            <span>Export Tech Pack</span>
                          </Link>

                          <Link
                            href={`/customer/find-tailor?designId=${design.id}`}
                            className="studio-my-design-menu-item"
                          >
                            <Scissors size={14} />
                            <span>Book a Tailor</span>
                          </Link>

                          <button
                            type="button"
                            onClick={(e) => handleDelete(design.id, e)}
                            className="studio-my-design-menu-item danger"
                          >
                            <Trash2 size={14} />
                            <span>Delete Design</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Quick View / Details Modal */}
        <StudioDetailModal
          design={selectedDesignForModal}
          onClose={() => setSelectedDesignForModal(null)}
        />
      </div>
    </PublicShell>
  );
}
