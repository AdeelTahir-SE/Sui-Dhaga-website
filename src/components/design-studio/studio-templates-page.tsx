"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioDetailModal } from "@/components/design-studio/studio-modals";
import {
  initialTemplates,
  StudioTemplate,
  StudioDesignItem
} from "@/lib/design-studio-data";

type StudioDesignCategory = StudioDesignItem["category"];

function getTemplateDesignCategory(template: StudioTemplate): StudioDesignCategory {
  const tagText = template.tags.join(" ").toLowerCase();
  const titleText = template.title.toLowerCase();
  const searchableText = `${tagText} ${titleText}`;

  if (searchableText.includes("anarkali") || searchableText.includes("gown")) return "Anarkali";
  if (searchableText.includes("lehenga")) return "Lehenga";
  if (searchableText.includes("saree")) return "Saree";
  if (searchableText.includes("sherwani") || searchableText.includes("men")) return "Sherwani";
  if (searchableText.includes("kurta") || searchableText.includes("sharara") || searchableText.includes("co-ord")) return "Kurta Set";
  if (searchableText.includes("indo western") || searchableText.includes("fusion")) return "Indo-Western";

  return "Ethnic Wear";
}

export function StudioTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [activeTab, setActiveTab] = useState<"Popular" | "Trending" | "New Arrivals">("Popular");
  const [templateForModal, setTemplateForModal] = useState<StudioDesignItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    "All Templates",
    "Anarkali",
    "Lehenga",
    "Saree",
    "Kurta Set",
    "Indo Western",
    "Gown",
    "Men's Wear",
    "Kids Wear",
    "Co-ord Sets"
  ];

  const filteredTemplates = initialTemplates.filter((tmpl) => {
    if (selectedCategory === "All Templates") return true;
    if (selectedCategory === "Men's Wear") return tmpl.tags.includes("Men's Wear") || tmpl.category === "Men's";
    return tmpl.tags.includes(selectedCategory) || tmpl.title.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleUseTemplate = (tmpl: StudioTemplate) => {
    // Open Prompt Modal or Quick View Modal
    const modalItem: StudioDesignItem = {
      id: tmpl.id,
      title: tmpl.title,
      category: getTemplateDesignCategory(tmpl),
      editedAgo: "Template",
      savedDate: "Verified Pattern",
      image: tmpl.image,
      prompt: `${tmpl.title} with custom tailoring specifications and premium ethnic fabric.`,
      fabric: tmpl.fabric,
      colorPalette: ["#078B87", "#FAF8F5", "#D5B069", "#111111"],
      estimatedCost: tmpl.estimatedPrice,
      tags: tmpl.tags,
      isFavorite: false
    };

    setTemplateForModal(modalItem);
  };

  return (
    <PublicShell>
      <div className="studio-root-container">
        {/* Signature Gold Bottom Right Wave Accent matching screenshot */}
        <div className="studio-gold-corner-wave" aria-hidden="true">
          <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 220C50 180 80 140 130 155C180 170 200 110 240 100C270 92 280 60 280 0V220H0Z"
              fill="#F5A623"
            />
          </svg>
        </div>

        <div className="studio-templates-page-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-templates-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-templates-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-templates-breadcrumb-sep">&gt;</span>
            <span className="studio-templates-breadcrumb-active">Templates</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-templates-header-section">
            <div className="studio-templates-flag-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M0 0L14 12L0 24V0Z" fill="#FFD233" />
                <path d="M0 0L14 12L0 24" stroke="#111111" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h1 className="studio-templates-main-heading">Explore Templates</h1>
              <p className="studio-templates-sub-heading">
                Choose a template and customize it to your style.
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

          {/* Workspace Layout: Left Categories + Right Templates Grid */}
          <div className="studio-templates-workspace-layout">
            {/* Left Categories List */}
            <aside className="studio-templates-categories-panel">
              <h2 className="studio-templates-categories-title">Categories</h2>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`studio-templates-cat-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </aside>

            {/* Right Content Panel */}
            <section className="studio-templates-content-panel">
              {/* Filter Tabs */}
              <div className="studio-templates-tabs-row">
                {(["Popular", "Trending", "New Arrivals"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`studio-templates-tab-item ${
                      activeTab === tab ? "active" : ""
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* 4-Column Templates Grid */}
              <div className="studio-templates-4col-grid">
                {filteredTemplates.map((tmpl) => (
                  <article key={tmpl.id} className="studio-template-item-card">
                    <div className="studio-template-img-frame">
                      <img
                        src={tmpl.image}
                        alt={tmpl.title}
                        className="studio-template-img"
                      />
                    </div>
                    <div className="studio-template-card-body">
                      <h3 className="studio-template-card-title">{tmpl.title}</h3>
                      <button
                        type="button"
                        onClick={() => handleUseTemplate(tmpl)}
                        className="studio-template-use-cta"
                      >
                        Use Template
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* View More Templates Link */}
              <div className="studio-templates-more-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setToastMessage("All latest 2026 templates loaded!");
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className="studio-templates-more-btn"
                >
                  View More Templates
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Quick View / Customizer Modal */}
        <StudioDetailModal
          design={templateForModal}
          onClose={() => setTemplateForModal(null)}
        />
      </div>
    </PublicShell>
  );
}
