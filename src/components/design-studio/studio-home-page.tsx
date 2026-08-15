"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Bot,
  Heart,
  ChevronRight,
  Eye,
  Plus,
  ArrowRight,
  Wand2
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioSidebar } from "@/components/design-studio/studio-sidebar";
import {
  StudioDetailModal,
  StudioPromptModal
} from "@/components/design-studio/studio-modals";
import {
  StudioDesignItem,
  AiSuggestionItem,
  fetchStudioRecentDesignsApi,
  fetchStudioAiSuggestionsApi,
  toggleFavoriteStudioDesignApi,
  initialRecentDesigns,
  initialAiSuggestions
} from "@/lib/design-studio-data";

export function StudioHomePage() {
  const [recentDesigns, setRecentDesigns] = useState<StudioDesignItem[]>(initialRecentDesigns);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestionItem[]>(initialAiSuggestions);
  const [selectedDesign, setSelectedDesign] = useState<StudioDesignItem | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;

    Promise.all([
      fetchStudioRecentDesignsApi(),
      fetchStudioAiSuggestionsApi()
    ]).then(([designs, suggestions]) => {
      if (isSubscribed) {
        if (designs.length > 0) setRecentDesigns(designs);
        if (suggestions.length > 0) setAiSuggestions(suggestions);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleToggleFavorite = async (e: React.MouseEvent, designId: string) => {
    e.stopPropagation();
    const newStatus = await toggleFavoriteStudioDesignApi(designId);
    setRecentDesigns((prev) =>
      prev.map((d) => (d.id === designId ? { ...d, isFavorite: newStatus } : d))
    );
    if (selectedDesign?.id === designId) {
      setSelectedDesign((prev) => (prev ? { ...prev, isFavorite: newStatus } : null));
    }
  };

  const handleDesignCreated = (newDesign: StudioDesignItem) => {
    setRecentDesigns((prev) => [newDesign, ...prev]);
    setSelectedDesign(newDesign);
  };

  return (
    <PublicShell>
      <div className="studio-root-container">
        {/* Coral Bottom Right Organic Wave Accent (Matches Reference Image) */}
        <div className="studio-coral-corner-wave" aria-hidden="true">
          <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 220C50 180 80 140 130 155C180 170 200 110 240 100C270 92 280 60 280 0V220H0Z"
              fill="#FF5B52"
            />
          </svg>
        </div>

        <div className="studio-main-wrapper">
          <div className="studio-layout-grid">
            {/* 1. Left Studio Sidebar Nav */}
            <StudioSidebar activeTab="home" />

            {/* 2. Main Studio Content Area */}
            <main className="studio-content-body">
              {/* Hero Welcome Banner */}
              <div className="studio-hero-banner">
                <div>
                  <div className="studio-hero-title-row">
                    <h1 className="studio-hero-title">Welcome to AI Design Studio</h1>
                    <span style={{ fontSize: "1.85rem", lineHeight: 1 }}>👋</span>
                  </div>
                  <p className="studio-hero-subtitle">
                    Bring your ideas to life with the power of AI.
                  </p>
                </div>

                {/* Top-Right Decorative Diamond Motif (Matches Reference Image) */}
                <div className="studio-top-diamond-motif" aria-hidden="true">
                  <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M18 0L36 18L18 36L0 18L18 0Z"
                      fill="#FFD233"
                    />
                    <path
                      d="M18 6L30 18L18 30L6 18L18 6Z"
                      stroke="#111111"
                      strokeWidth="1.5"
                    />
                    <line x1="18" y1="6" x2="18" y2="30" stroke="#111111" strokeWidth="1.5" />
                    <line x1="6" y1="18" x2="30" y2="18" stroke="#111111" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* 3 Quick Action Cards */}
              <section className="studio-quick-actions-grid" aria-label="Studio Quick Actions">
                <button
                  onClick={() => setIsPromptModalOpen(true)}
                  className="studio-action-card"
                  style={{ textAlign: "left" }}
                >
                  <div className="studio-action-icon-wrap teal-solid">
                    <Sparkles size={22} />
                  </div>
                  <div className="studio-action-text">
                    <h3 className="studio-action-title">Create New Design</h3>
                    <p className="studio-action-desc">Start from scratch with AI</p>
                  </div>
                </button>

                <Link href="/design-studio/templates" className="studio-action-card">
                  <div className="studio-action-icon-wrap teal-outline">
                    <Layers size={22} />
                  </div>
                  <div className="studio-action-text">
                    <h3 className="studio-action-title">Browse Templates</h3>
                    <p className="studio-action-desc">Explore designer templates</p>
                  </div>
                </Link>

                <Link href="/design-studio/chat" className="studio-action-card">
                  <div className="studio-action-icon-wrap teal-soft">
                    <Bot size={22} />
                  </div>
                  <div className="studio-action-text">
                    <h3 className="studio-action-title">AI Assistant</h3>
                    <p className="studio-action-desc">Get design suggestions</p>
                  </div>
                </Link>
              </section>

              {/* Recent Designs Section */}
              <section aria-label="Recent Designs">
                <div className="studio-section-header">
                  <div className="studio-section-title-wrap">
                    <h2 className="studio-section-title">Recent Designs</h2>
                  </div>
                  <Link href="/design-studio/my-designs" className="studio-section-link">
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="studio-recent-grid">
                  {recentDesigns.slice(0, 4).map((design) => (
                    <article
                      key={design.id}
                      className="studio-design-card"
                      onClick={() => setSelectedDesign(design)}
                    >
                      {/* Image Thumbnail */}
                      <div className="studio-design-thumb-wrap">
                        <img
                          src={design.image}
                          alt={design.title}
                          className="studio-design-img"
                          loading="lazy"
                        />

                        {/* Favorite Button */}
                        <button
                          className={`studio-card-fav-btn ${design.isFavorite ? "is-fav" : ""}`}
                          onClick={(e) => handleToggleFavorite(e, design.id)}
                          aria-label="Toggle Favorite"
                        >
                          <Heart
                            size={16}
                            fill={design.isFavorite ? "#FF5B52" : "none"}
                            color={design.isFavorite ? "#FF5B52" : "#6B7280"}
                          />
                        </button>

                        {/* Hover Quick Action Overlay */}
                        <div className="studio-card-quick-actions">
                          <button
                            className="studio-quick-action-pill"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDesign(design);
                            }}
                          >
                            <Eye size={13} />
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Meta */}
                      <div className="studio-design-meta">
                        <h4 className="studio-design-title" title={design.title}>
                          {design.title}
                        </h4>
                        <p className="studio-design-edited">{design.editedAgo}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* AI Suggestions for You Section */}
              <section aria-label="AI Suggestions for You">
                <div className="studio-section-header">
                  <div className="studio-section-title-wrap">
                    <h2 className="studio-section-title">AI Suggestions for You</h2>
                    <span className="studio-badge-yellow">New</span>
                  </div>
                </div>

                <div className="studio-suggestions-row">
                  {aiSuggestions.slice(0, 5).map((sugg) => (
                    <article
                      key={sugg.id}
                      className="studio-suggestion-card"
                      onClick={() =>
                        setSelectedDesign({
                          id: `sugg-view-${sugg.id}`,
                          title: sugg.title,
                          category: sugg.category as any,
                          editedAgo: "AI Concept",
                          savedDate: "Today",
                          image: sugg.image,
                          prompt: sugg.prompt,
                          fabric: sugg.fabric,
                          colorPalette: ["#078B87", "#D5B069", "#FAF8F5", "#334155"],
                          estimatedCost: "₹12,000 - ₹18,000",
                          tags: sugg.tags,
                          isFavorite: false
                        })
                      }
                    >
                      <div className="studio-suggestion-thumb">
                        <img
                          src={sugg.image}
                          alt={sugg.title}
                          className="studio-suggestion-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="studio-suggestion-info">
                        <h4 className="studio-suggestion-title" title={sugg.title}>
                          {sugg.title}
                        </h4>
                        <p className="studio-suggestion-sub" title={sugg.subtitle}>
                          {sugg.subtitle}
                        </p>
                      </div>
                    </article>
                  ))}

                  {/* "Try with your idea" CTA Card (Matches Reference Image) */}
                  <div className="studio-cta-idea-card">
                    <div className="studio-cta-top">
                      <h3 className="studio-cta-title">Try with your idea</h3>
                      <p className="studio-cta-desc">
                        Describe your dream outfit and AI brings it for you.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsPromptModalOpen(true)}
                      className="studio-cta-btn"
                    >
                      <Sparkles size={15} />
                      <span>Try Now</span>
                    </button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/* Modals */}
        <StudioDetailModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
          onFavoriteChange={(id, isFav) => {
            setRecentDesigns((prev) =>
              prev.map((d) => (d.id === id ? { ...d, isFavorite: isFav } : d))
            );
          }}
        />

        <StudioPromptModal
          isOpen={isPromptModalOpen}
          onClose={() => setIsPromptModalOpen(false)}
          onDesignCreated={handleDesignCreated}
        />
      </div>
    </PublicShell>
  );
}
