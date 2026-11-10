"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Star,
  X,
  Plus,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  Clock,
  Award,
  Sparkles,
  Search,
  Loader2
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  initialTailors,
  getTailorById,
  fetchTailorByIdApi,
  mapBackendTailorToItem,
  TailorItem
} from "@/lib/tailors-data";
import { tailorService } from "@/lib/api/tailor-service";
import { stableCacheKey, useCachedEntry } from "@/lib/api/data-cache";
import { ApiResponse, TailorProfile } from "@/lib/api/types";
import { TailorsCompareSkeleton } from "@/components/common/shadow-skeleton";
import "@/styles/pages/tailors.css";

const COMPARE_LIST_CACHE_KEY = `list:${stableCacheKey({ limit: 50 })}`;

export function TailorsComparePage() {
  const searchParams = useSearchParams();
  const urlIds = searchParams?.get("ids") || searchParams?.get("tailors") || "";

  const cachedListEntry = useCachedEntry<ApiResponse<TailorProfile[]>>(
    "tailors",
    COMPARE_LIST_CACHE_KEY,
    { scope: "public" }
  );
  const [extraTailors, setExtraTailors] = useState<TailorItem[]>([]);
  const [fallbackSettled, setFallbackSettled] = useState(false);

  const allTailors = useMemo(() => {
    const base =
      cachedListEntry?.data?.data && Array.isArray(cachedListEntry.data.data) && cachedListEntry.data.data.length > 0
        ? cachedListEntry.data.data.map((t, idx) => mapBackendTailorToItem(t, idx))
        : initialTailors;
    if (extraTailors.length === 0) return base;
    const ids = new Set(base.map((t) => t.id));
    return [...base, ...extraTailors.filter((e) => !ids.has(e.id))];
  }, [cachedListEntry, extraTailors]);

  const [selectedOverride, setSelectedOverride] = useState<string[] | null>(null);
  const selectedIds = useMemo(() => {
    if (selectedOverride) return selectedOverride;
    if (urlIds) {
      const parsed = urlIds.split(",").map((s) => s.trim()).filter(Boolean);
      if (parsed.length > 0) return parsed.slice(0, 4);
    }
    if (cachedListEntry?.data?.data && cachedListEntry.data.data.length > 0) {
      return cachedListEntry.data.data.slice(0, 3).map((t, idx) => mapBackendTailorToItem(t, idx).id);
    }
    return ["rekha-tailors", "stitch-craft", "aarav-bespoke"];
  }, [selectedOverride, urlIds, cachedListEntry]);

  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [modalSearchInput, setModalSearchInput] = useState<string>("");
  const isLoading = !cachedListEntry && !fallbackSettled;

  // Load live tailors from backend database only when cache misses
  useEffect(() => {
    if (cachedListEntry) return;
    let isSubscribed = true;

    tailorService
      .getTailors({ limit: 50 })
      .catch((err) => {
        console.warn("[Tailors Compare] Live tailors fetch error, using fallback catalog:", err);
      })
      .finally(() => {
        if (isSubscribed) {
          setFallbackSettled(true);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [cachedListEntry]);

  // If any selected ID is not in allTailors (e.g. from deep link), fetch it individually
  useEffect(() => {
    if (isLoading) return;
    let isSubscribed = true;
    selectedIds.forEach(async (id) => {
      const exists = allTailors.some((t) => t.id === id);
      if (!exists) {
        try {
          const fetched = await fetchTailorByIdApi(id);
          if (fetched && isSubscribed) {
            setExtraTailors((prev) => (prev.some((p) => p.id === fetched.id) ? prev : [...prev, fetched]));
          }
        } catch (e) {
          console.warn("Could not fetch individual tailor:", id, e);
        }
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [selectedIds, allTailors, isLoading]);

  // Get full tailor objects for selected IDs
  const selectedTailors = useMemo(() => {
    return selectedIds
      .map((id) => allTailors.find((t) => t.id === id) || getTailorById(id))
      .filter((t): t is TailorItem => t !== undefined);
  }, [selectedIds, allTailors]);

  // Available tailors not yet selected
  const availableTailors = useMemo(() => {
    return allTailors.filter(
      (t) =>
        !selectedIds.includes(t.id) &&
        (modalSearchInput.trim() === "" ||
          t.name.toLowerCase().includes(modalSearchInput.toLowerCase()) ||
          t.specialties.some((s) => s.toLowerCase().includes(modalSearchInput.toLowerCase())) ||
          (t.city && t.city.toLowerCase().includes(modalSearchInput.toLowerCase())))
    );
  }, [selectedIds, allTailors, modalSearchInput]);

  const handleRemoveTailor = (id: string) => {
    if (selectedIds.length <= 1) return; // Keep at least 1 tailor
    setSelectedOverride(selectedIds.filter((item) => item !== id));
  };

  const handleAddTailor = (id: string) => {
    if (selectedIds.length >= 4) return;
    setSelectedOverride([...selectedIds, id]);
    setIsAddModalOpen(false);
    setModalSearchInput("");
  };

  return (
    <PublicShell>
      <div className="tailors-compare-page-root">
        {/* Left Hero Yellow Ribbon Motif */}
        <div className="compare-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="tailors-compare-container">
          {/* Breadcrumb */}
          <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link href="/tailors">Tailors</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span className="current">Compare</span>
          </nav>

          {/* Page Heading */}
          <div className="compare-header-block">
            <h1 className="compare-title">Compare Tailors</h1>
            <p className="compare-subtitle">
              Compare top tailors side-by-side and choose the best match for your needs.
            </p>
          </div>

          {/* Split Layout: Left Selected List + Right Comparison Table */}
          <div className="compare-split-layout">
            {/* Left Column: Selected Tailors & AI Assistant */}
            <aside className="compare-sidebar-column">
              {/* Selected Tailors Card */}
              <div className="selected-tailors-card">
                <div className="card-header-row">
                  <h3>Selected Tailors</h3>
                  {selectedIds.length < 4 && (
                    <button
                      className="edit-selection-btn"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      Edit Selection
                    </button>
                  )}
                </div>

                <div className="selected-tailors-list">
                  {selectedTailors.map((tailor) => (
                    <div key={tailor.id} className="selected-tailor-item">
                      <img
                        src={tailor.image}
                        alt={tailor.name}
                        className="selected-tailor-avatar"
                      />
                      <div className="selected-tailor-info">
                        <h4 className="tailor-name">{tailor.name}</h4>
                        <div className="rating-meta">
                          <Star size={13} fill="#F59E0B" color="#F59E0B" />
                          <span>
                            <strong>{tailor.rating}</strong> ({tailor.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>
                      {selectedIds.length > 1 && (
                        <button
                          className="remove-tailor-btn"
                          onClick={() => handleRemoveTailor(tailor.id)}
                          title={`Remove ${tailor.name}`}
                          aria-label={`Remove ${tailor.name}`}
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  ))}

                  {selectedIds.length < 4 && (
                    <button
                      className="add-more-tailor-btn"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      <Plus size={16} />
                      <span>Add Tailor to Compare</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Can't Decide Assistant Card */}
              <div className="cant-decide-assistant-card">
                <div className="assistant-icon-wrap">
                  <Sparkles size={24} className="sparkle-icon" />
                </div>
                <h4>Can&apos;t decide?</h4>
                <p>
                  Chat with our style assistant and get personalized recommendations based on your outfit &amp; deadline.
                </p>
                <Link href="/design-studio" className="chat-now-btn">
                  Chat Now
                </Link>
              </div>
            </aside>

            {/* Right Column: Comprehensive Comparison Matrix Table */}
            <main className="compare-matrix-column">
              {isLoading ? (
                <TailorsCompareSkeleton />
              ) : (
                <div className="comparison-table-wrapper">
                  <table className="comparison-table">
                    {/* Table Header: Tailor Cards */}
                    <thead>
                      <tr>
                        <th className="attr-column-header"></th>
                        {selectedTailors.map((tailor) => (
                          <th key={tailor.id} className="tailor-column-header">
                            <div className="header-tailor-card">
                              <img
                                src={tailor.image}
                                alt={tailor.name}
                                className="header-avatar"
                              />
                              <div className="header-info">
                                <h4 className="header-name">{tailor.name}</h4>
                                <div className="header-rating">
                                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                                  <span>
                                    <strong>{tailor.rating}</strong> ({tailor.reviewsCount})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {/* Rating & Reviews Row */}
                      <tr>
                        <td className="row-label">Rating &amp; Reviews</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value">
                            <div className="stars-display">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={14}
                                  fill={s <= Math.round(tailor.rating) ? "#F59E0B" : "none"}
                                  color={s <= Math.round(tailor.rating) ? "#F59E0B" : "#CBD5E1"}
                                />
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Starting Price Row */}
                      <tr>
                        <td className="row-label">Starting Price</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value highlight-price">
                            {tailor.startingPrice ? tailor.startingPrice.replace("Starting from ", "") : "PKR 1,500"}
                          </td>
                        ))}
                      </tr>

                      {/* Experience Row */}
                      <tr>
                        <td className="row-label">Experience</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value bold-value">
                            {tailor.experience || "8+ years"}
                          </td>
                        ))}
                      </tr>

                      {/* Specialties Row */}
                      <tr>
                        <td className="row-label">Specialties</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value">
                            {tailor.specialties?.length ? tailor.specialties.join(", ") : "Bespoke Tailoring"}
                          </td>
                        ))}
                      </tr>

                      {/* Delivery Time Row */}
                      <tr>
                        <td className="row-label">Delivery Time</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value">
                            {tailor.turnaroundTime || "3-5 days"}
                          </td>
                        ))}
                      </tr>

                      {/* On-time Delivery Row */}
                      <tr>
                        <td className="row-label">On-time Delivery</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value bold-value">
                            {tailor.onTimeDelivery || "98%"}
                          </td>
                        ))}
                      </tr>

                      {/* Happy Customers Row */}
                      <tr>
                        <td className="row-label">Happy Customers</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value">
                            {tailor.happyCustomers || "2K+"}
                          </td>
                        ))}
                      </tr>

                      {/* Price for Similar Outfit Row */}
                      <tr>
                        <td className="row-label">Price for Similar Outfit</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value">
                            {tailor.similarOutfitPrice || "Rs. 2,000 (Example)"}
                          </td>
                        ))}
                      </tr>

                      {/* Reviews Summary Row */}
                      <tr>
                        <td className="row-label">Reviews Summary</td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value italic-summary">
                            {tailor.reviewsSummary || "Excellent stitching and fit"}
                          </td>
                        ))}
                      </tr>

                      {/* Book Now CTA Row */}
                      <tr className="cta-row">
                        <td className="row-label"></td>
                        {selectedTailors.map((tailor) => (
                          <td key={tailor.id} className="cell-value cta-cell">
                            <Link
                              href={`/book/${tailor.id}`}
                              className="compare-book-btn"
                            >
                              Book Now
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Modal: Add Tailor Picker */}
        {isAddModalOpen && (
          <div className="add-tailor-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
            <div className="add-tailor-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Select Tailor to Compare</h3>
                <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <div className="modal-search-box">
                <Search size={16} className="modal-search-icon" />
                <input
                  type="text"
                  placeholder="Search by tailor name or specialty..."
                  value={modalSearchInput}
                  onChange={(e) => setModalSearchInput(e.target.value)}
                />
              </div>

              <div className="modal-tailors-list">
                {availableTailors.length > 0 ? (
                  availableTailors.map((tailor) => (
                    <div key={tailor.id} className="modal-tailor-item">
                      <img src={tailor.image} alt={tailor.name} className="modal-tailor-thumb" />
                      <div className="modal-tailor-info">
                        <h5>{tailor.name}</h5>
                        <p>{tailor.locality} • {tailor.specialties.slice(0, 2).join(", ")}</p>
                      </div>
                      <button
                        className="modal-select-btn"
                        onClick={() => handleAddTailor(tailor.id)}
                      >
                        Select
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-tailors-found">No additional tailors available to add.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Corner Brand Transparent Coral PNG Motif */}
        <div className="compare-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
