"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Ruler,
  FolderHeart,
  Heart,
  Users,
  MessageSquare,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  ChevronRight,
  X,
  Scissors,
  Eye,
  Check
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  fetchCustomerSavedDesignsApi,
  removeSavedDesignApi,
  toggleFavoriteDesignApi,
  initialSavedDesignsData,
  SavedDesignItem
} from "@/lib/saved-designs-data";

export function CustomerSavedDesignsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [designs, setDesigns] = useState<SavedDesignItem[]>(initialSavedDesignsData);
  const [selectedDesign, setSelectedDesign] = useState<SavedDesignItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchCustomerSavedDesignsApi("All").then((data) => {
      if (isSubscribed) {
        setDesigns(data);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleRemoveDesign = async (e: React.MouseEvent, designId: string) => {
    e.stopPropagation();
    await removeSavedDesignApi(designId);
    setDesigns((prev) => prev.filter((d) => d.id !== designId));
    if (selectedDesign?.id === designId) {
      setSelectedDesign(null);
    }
    setToastMessage("Design removed from saved items.");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleFavorite = async (e: React.MouseEvent, designId: string) => {
    e.stopPropagation();
    const newStatus = await toggleFavoriteDesignApi(designId);
    setDesigns((prev) =>
      prev.map((d) => (d.id === designId ? { ...d, isFavorite: newStatus } : d))
    );
    if (selectedDesign?.id === designId) {
      setSelectedDesign((prev) => (prev ? { ...prev, isFavorite: newStatus } : null));
    }
  };

  // Counts for tabs
  const allCount = designs.length;
  const outfitsCount = designs.filter((d) => d.category === "Outfits").length;
  const blousesCount = designs.filter((d) => d.category === "Blouses").length;
  const lehengasCount = designs.filter((d) => d.category === "Lehengas").length;
  const kurtiCount = designs.filter((d) => d.category === "Kurti").length;

  const filteredDesigns =
    activeCategory === "All"
      ? designs
      : designs.filter((d) => d.category === activeCategory);

  return (
    <PublicShell>
      <div className="customer-saved-designs-root">
        {/* Left Hero Ribbon Accent */}
        <div className="saved-designs-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="saved-designs-container">
          {/* Main 2-Column Layout Grid: Reused Community Sidebar + Saved Content */}
          <div className="saved-designs-layout-grid">
            {/* 1. Left Customer Navigation Sidebar (Reused Community Sidebar) */}
            <aside className="customer-sidebar-nav">
              <nav className="sidebar-menu-list">
                <Link href="/customer/dashboard" className="sidebar-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <Link href="/customer/appointments" className="sidebar-item">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>

                <Link href="/customer/orders" className="sidebar-item">
                  <Package size={18} />
                  <span>Orders</span>
                </Link>

                <Link href="/customer/measurements" className="sidebar-item">
                  <Ruler size={18} />
                  <span>Measurements</span>
                </Link>

                {/* Active Saved Designs Tab */}
                <Link href="/customer/saved-designs" className="sidebar-item active">
                  <FolderHeart size={18} />
                  <span>Saved Designs</span>
                </Link>

                <Link href="/customer/wishlist" className="sidebar-item">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>

                <Link href="/community" className="sidebar-item">
                  <Users size={18} />
                  <span>Community</span>
                </Link>

                <Link href="/messages" className="sidebar-item">
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </Link>

                <Link href="/customer/addresses" className="sidebar-item">
                  <MapPin size={18} />
                  <span>Addresses</span>
                </Link>

                <Link href="/customer/payments" className="sidebar-item">
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                </Link>

                <Link href="/notifications" className="sidebar-item">
                  <Bell size={18} />
                  <span>Notifications</span>
                </Link>

                <Link href="/customer/settings" className="sidebar-item">
                  <Settings size={18} />
                  <span>Account Settings</span>
                </Link>

                <Link href="/auth/login" className="sidebar-item logout-btn">
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </nav>
            </aside>

            {/* 2. Main Saved Designs Content Area */}
            <main className="saved-designs-main-content">
              {/* Breadcrumb Navigation */}
              <nav className="saved-designs-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">
                  Home
                </Link>
                <ChevronRight size={14} className="crumb-sep" />
                <span className="crumb-current">Saved Designs</span>
              </nav>

              {/* Header Title Row */}
              <div className="saved-designs-header-row">
                <div className="header-title-block">
                  <h1 className="saved-designs-title">Saved Designs</h1>
                  <p className="saved-designs-subtitle">
                    Your saved designs and custom ideas.
                  </p>
                </div>
              </div>

              {/* Segmented Filter Tabs */}
              <div className="saved-designs-tabs-bar" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "All"}
                  onClick={() => setActiveCategory("All")}
                  className={`tab-btn ${activeCategory === "All" ? "active" : ""}`}
                >
                  All ({allCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "Outfits"}
                  onClick={() => setActiveCategory("Outfits")}
                  className={`tab-btn ${activeCategory === "Outfits" ? "active" : ""}`}
                >
                  Outfits ({outfitsCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "Blouses"}
                  onClick={() => setActiveCategory("Blouses")}
                  className={`tab-btn ${activeCategory === "Blouses" ? "active" : ""}`}
                >
                  Blouses ({blousesCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "Lehengas"}
                  onClick={() => setActiveCategory("Lehengas")}
                  className={`tab-btn ${activeCategory === "Lehengas" ? "active" : ""}`}
                >
                  Lehengas ({lehengasCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === "Kurti"}
                  onClick={() => setActiveCategory("Kurti")}
                  className={`tab-btn ${activeCategory === "Kurti" ? "active" : ""}`}
                >
                  Kurti ({kurtiCount})
                </button>
              </div>

              {/* 4-Column Saved Designs Grid */}
              <div className="saved-designs-cards-grid">
                {filteredDesigns.map((design) => (
                  <article
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className="design-item-card"
                  >
                    {/* Garment Image Card */}
                    <div className="design-thumb-wrapper">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="design-thumb-img"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/booking/ref-gold-anarkali.jpg";
                        }}
                      />

                      {/* Favorite Heart Badge */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleFavorite(e, design.id)}
                        className={`design-fav-badge ${design.isFavorite ? "favorited" : ""}`}
                        title={design.isFavorite ? "Favorited" : "Add to favorites"}
                      >
                        <Heart
                          size={16}
                          fill={design.isFavorite ? "#e11d48" : "transparent"}
                          color={design.isFavorite ? "#e11d48" : "#ffffff"}
                        />
                      </button>
                    </div>

                    {/* Card Meta Row */}
                    <div className="design-card-meta-row">
                      <div className="design-title-block">
                        <h3 className="design-name-title">{design.title}</h3>
                        <span className="design-saved-date">Saved on {design.savedDate}</span>
                      </div>

                      {/* Action Menu / Remove Icon */}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveDesign(e, design.id)}
                        className="design-remove-btn"
                        title="Remove from saved"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </article>
                ))}

                {/* "Create New Design" Card */}
                <Link href="/ai-studio" className="create-new-design-card">
                  <div className="create-plus-circle">
                    <Plus size={24} />
                  </div>
                  <strong className="create-card-title">Create New Design</strong>
                  <span className="create-card-subtitle">Start from scratch</span>
                </Link>
              </div>
            </main>
          </div>
        </div>

        {/* --------------------------------------------------------------------------
           DESIGN DETAIL MODAL (Open Design & Remove CTA)
           -------------------------------------------------------------------------- */}
        {selectedDesign && (
          <div className="saved-modal-overlay" onClick={() => setSelectedDesign(null)}>
            <div className="saved-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">{selectedDesign.title}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedDesign(null)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                <div className="modal-design-grid">
                  {/* Large Preview Image */}
                  <div className="modal-preview-img-frame">
                    <img
                      src={selectedDesign.image}
                      alt={selectedDesign.title}
                      className="modal-preview-img"
                    />
                  </div>

                  {/* Design Info */}
                  <div className="modal-design-info-column">
                    <div className="design-badge-row">
                      <span className="category-pill">{selectedDesign.category}</span>
                      <span className="saved-date-pill">Saved on {selectedDesign.savedDate}</span>
                    </div>

                    {selectedDesign.prompt && (
                      <div className="design-prompt-box">
                        <span className="prompt-label">AI Studio Prompt / Inspiration</span>
                        <p className="prompt-text">"{selectedDesign.prompt}"</p>
                      </div>
                    )}

                    <div className="design-specs-list">
                      {selectedDesign.fabric && (
                        <div className="spec-row">
                          <span className="spec-label">Recommended Fabric:</span>
                          <span className="spec-val">{selectedDesign.fabric}</span>
                        </div>
                      )}
                      {selectedDesign.estimatedCost && (
                        <div className="spec-row">
                          <span className="spec-label">Est. Tailoring Cost:</span>
                          <span className="spec-val font-bold">{selectedDesign.estimatedCost}</span>
                        </div>
                      )}
                    </div>

                    {selectedDesign.tags && selectedDesign.tags.length > 0 && (
                      <div className="tags-flex-wrap">
                        {selectedDesign.tags.map((tag) => (
                          <span key={tag} className="tag-item">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="modal-action-buttons-group">
                      <Link
                        href="/ai-studio"
                        className="open-in-studio-btn"
                      >
                        <Sparkles size={16} />
                        <span>Open in AI Design Studio</span>
                      </Link>

                      <Link
                        href="/tailors"
                        className="book-tailor-btn"
                      >
                        <Scissors size={16} />
                        <span>Find Tailor for this Design</span>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => handleRemoveDesign(e, selectedDesign.id)}
                        className="remove-saved-action-btn"
                      >
                        <Trash2 size={16} />
                        <span>Remove from Saved Designs</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="saved-toast-notification">
            <Check size={16} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Level Transparent Corner Motifs */}
        <div className="saved-designs-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="saved-designs-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
