"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioDetailModal } from "@/components/design-studio/studio-modals";
import { StudioDesignsGridSkeleton } from "@/components/common/shadow-skeleton";
import {
  fetchStudioTemplatesApi,
  peekStudioTemplates,
  StudioTemplate,
  StudioDesignItem
} from "@/lib/design-studio-data";
import { useCacheTick } from "@/lib/api/data-cache";

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
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab");

  const communityTick = useCacheTick("community");
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [tabOverride, setTabOverride] = useState<{
    param: string | null;
    value: "Popular" | "Trending" | "New Arrivals";
  } | null>(null);
  const activeTab: "Popular" | "Trending" | "New Arrivals" =
    tabOverride && tabOverride.param === tabParam
      ? tabOverride.value
      : tabParam === "inspiration"
      ? "Trending"
      : "Popular";
  const setActiveTab = (val: "Popular" | "Trending" | "New Arrivals") =>
    setTabOverride({ param: tabParam ?? null, value: val });

  const cachedTemplates = useMemo(
    () => (communityTick >= 0 ? peekStudioTemplates(selectedCategory, activeTab) : null),
    [communityTick, selectedCategory, activeTab]
  );
  const [fallbackTemplates, setFallbackTemplates] = useState<{
    key: string;
    list: StudioTemplate[];
  } | null>(null);

  const currentQueryKey = `${selectedCategory}::${activeTab}`;
  const templates =
    cachedTemplates ??
    (fallbackTemplates?.key === currentQueryKey ? fallbackTemplates.list : []);
  const isLoading =
    cachedTemplates === null && fallbackTemplates?.key !== currentQueryKey;

  const [templateForModal, setTemplateForModal] = useState<StudioDesignItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (cachedTemplates !== null) return;
    let isSubscribed = true;

    fetchStudioTemplatesApi(selectedCategory, activeTab)
      .then((data) => {
        if (isSubscribed) {
          setFallbackTemplates({ key: `${selectedCategory}::${activeTab}`, list: data });
        }
      })
      .catch((err) => {
        console.error("[Templates] Fetch failed:", err);
        if (isSubscribed) {
          setFallbackTemplates({ key: `${selectedCategory}::${activeTab}`, list: [] });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [cachedTemplates, selectedCategory, activeTab]);

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

  const handleUseTemplate = (tmpl: StudioTemplate) => {
    const modalItem: StudioDesignItem = {
      id: tmpl.id,
      title: tmpl.title,
      category: getTemplateDesignCategory(tmpl),
      editedAgo: "Template",
      savedDate: "Verified Pattern",
      image: tmpl.image,
      prompt: tmpl.description || `${tmpl.title} with custom tailoring specifications and premium ethnic fabric.`,
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
              {isLoading ? (
                <StudioDesignsGridSkeleton count={8} variant="templates" />
              ) : templates.length === 0 ? (
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px dashed #D6D0C4",
                    padding: "48px 24px",
                    textAlign: "center",
                    color: "#6B7280"
                  }}
                >
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    No templates found in &quot;{selectedCategory}&quot;. Try another style category.
                  </p>
                </div>
              ) : (
                <div className="studio-templates-4col-grid">
                  {templates.map((tmpl) => (
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
              )}

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
