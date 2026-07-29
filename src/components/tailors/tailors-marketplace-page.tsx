"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Heart,
  MapPin,
  ChevronDown,
  X,
  Map as MapIcon,
  SlidersHorizontal,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { getTailors, TailorItem, FilterOptions } from "@/lib/tailors-data";

export function TailorsMarketplacePage() {
  // Search and Filter State
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("all");
  const [specialty, setSpecialty] = useState<string>("all");
  const [service, setService] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [moreFilter, setMoreFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("top-rated");

  // Interactive UI State
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(4);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [hoveredTailorId, setHoveredTailorId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [isMapVisible, setIsMapVisible] = useState<boolean>(true);

  // Query options object for backend-ready fetching
  const filterOptions: FilterOptions = useMemo(
    () => ({
      searchQuery,
      location,
      specialty,
      service,
      priceRange,
      ratingMin: ratingMin > 0 ? ratingMin : undefined,
      topRatedOnly: moreFilter === "top-rated",
      verifiedOnly: moreFilter === "verified",
      sortBy
    }),
    [searchQuery, location, specialty, service, priceRange, ratingMin, moreFilter, sortBy]
  );

  // Backend-ready data service response
  const { tailors, totalCount, hasMore } = useMemo(
    () => getTailors(filterOptions, page, pageSize),
    [filterOptions, page, pageSize]
  );

  // Handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setSearchQuery("");
    setLocation("all");
    setSpecialty("all");
    setService("all");
    setPriceRange("all");
    setRatingMin(0);
    setMoreFilter("all");
    setSortBy("top-rated");
    setPage(1);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    location !== "all" ||
    specialty !== "all" ||
    service !== "all" ||
    priceRange !== "all" ||
    ratingMin > 0 ||
    moreFilter !== "all";

  return (
    <PublicShell>
      <div className="tailors-page-root">
        <div className="tailors-container">
          {/* Breadcrumb */}
          <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span className="current">Tailors</span>
          </nav>

          {/* Hero Header */}
          <header className="tailors-hero-section">
            <div className="tailors-hero-copy">
              <h1>
                Find the perfect <span className="accent-text">tailor</span> near you
              </h1>
              <p>Discover verified experts who can bring your custom style to life.</p>
            </div>
            <div className="tailors-doodle-dotgrid" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="6" cy="6" r="3" fill="#CBD5E1" />
                <circle cx="24" cy="6" r="3" fill="#CBD5E1" />
                <circle cx="42" cy="6" r="3" fill="#CBD5E1" />
                <circle cx="6" cy="24" r="3" fill="#CBD5E1" />
                <circle cx="24" cy="24" r="3" fill="#CBD5E1" />
                <circle cx="42" cy="24" r="3" fill="#CBD5E1" />
                <circle cx="6" cy="42" r="3" fill="#CBD5E1" />
                <circle cx="24" cy="42" r="3" fill="#CBD5E1" />
                <circle cx="42" cy="42" r="3" fill="#CBD5E1" />
              </svg>
            </div>
          </header>

          {/* Search Bar & Filter Strip */}
          <section className="tailors-search-filter-block" aria-label="Search and Filter Tailors">
            <form onSubmit={handleSearchSubmit} className="search-input-group">
              <Search size={20} className="search-icon-inline" />
              <input
                type="text"
                className="tailor-search-input"
                placeholder="Search by name, specialty or location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="tailor-search-btn">
                Search
              </button>
            </form>

            {/* Filter Dropdown Pills */}
            <div className="filter-pills-row">
              {/* Location */}
              <div className="filter-select-wrapper">
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setPage(1);
                  }}
                  className={location !== "all" ? "active" : ""}
                >
                  <option value="all">Location</option>
                  <option value="Siri Fort">Siri Fort</option>
                  <option value="Greater Kailash">Greater Kailash</option>
                  <option value="Saket">Saket</option>
                  <option value="Hauz Khas">Hauz Khas</option>
                  <option value="Vasant Kunj">Vasant Kunj</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>

              {/* Specialties */}
              <div className="filter-select-wrapper">
                <select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                    setPage(1);
                  }}
                  className={specialty !== "all" ? "active" : ""}
                >
                  <option value="all">Specialties</option>
                  <option value="Women's Wear">Women&apos;s Wear</option>
                  <option value="Men's Wear">Men&apos;s Wear</option>
                  <option value="Ethnic Wear">Ethnic Wear</option>
                  <option value="Bridal Wear">Bridal Wear</option>
                  <option value="Kids Wear">Kids Wear</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>

              {/* Services */}
              <div className="filter-select-wrapper">
                <select
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    setPage(1);
                  }}
                  className={service !== "all" ? "active" : ""}
                >
                  <option value="all">Services</option>
                  <option value="Sarees">Sarees</option>
                  <option value="Lehengas">Lehengas</option>
                  <option value="Sherwani">Sherwani</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Suits">Suits</option>
                  <option value="Gowns">Gowns</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>

              {/* Price Range */}
              <div className="filter-select-wrapper">
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                    setPage(1);
                  }}
                  className={priceRange !== "all" ? "active" : ""}
                >
                  <option value="all">Price Range</option>
                  <option value="under-1500">Under ₹1,500</option>
                  <option value="1500-3000">₹1,500 - ₹3,000</option>
                  <option value="above-3000">Above ₹3,000</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>

              {/* Rating */}
              <div className="filter-select-wrapper">
                <select
                  value={ratingMin}
                  onChange={(e) => {
                    setRatingMin(Number(e.target.value));
                    setPage(1);
                  }}
                  className={ratingMin > 0 ? "active" : ""}
                >
                  <option value="0">Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>

              {/* More Filters */}
              <div className="filter-select-wrapper">
                <select
                  value={moreFilter}
                  onChange={(e) => {
                    setMoreFilter(e.target.value);
                    setPage(1);
                  }}
                  className={moreFilter !== "all" ? "active" : ""}
                >
                  <option value="all">More Filters</option>
                  <option value="top-rated">Top Rated Only</option>
                  <option value="verified">Verified Only</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>

              {/* Sort By */}
              <div className="filter-select-wrapper sort-select-wrapper">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="top-rated">Sort by: Top Rated</option>
                  <option value="nearest">Sort by: Nearest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="filter-select-arrow" />
              </div>
            </div>
          </section>

          {/* Main Split Layout: Tailors List + Map */}
          <div className="tailors-split-layout">
            {/* Left Column: Tailor Cards List */}
            <main className="tailors-list-column">
              <div className="list-results-header">
                <h2>{totalCount} Tailors Found</h2>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="clear-filters-btn">
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Cards List */}
              <div className="tailors-cards-list">
                {tailors.length === 0 ? (
                  <div className="no-results-box" style={{ padding: "40px 20px", textAlign: "center", background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                    <p style={{ fontSize: "16px", color: "#64748b", margin: 0 }}>
                      No tailors matched your filter criteria. Try adjusting your search query or location.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      style={{ marginTop: "14px", background: "#078b87", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  tailors.map((tailor) => {
                    const isWishlisted = !!wishlist[tailor.id];
                    const isHovered = hoveredTailorId === tailor.id || selectedPinId === tailor.id;

                    return (
                      <article
                        key={tailor.id}
                        className={`tailor-marketplace-card ${isHovered ? "hovered" : ""}`}
                        onMouseEnter={() => setHoveredTailorId(tailor.id)}
                        onMouseLeave={() => setHoveredTailorId(null)}
                      >
                        <div className="tailor-card-thumb">
                          <img src={tailor.image} alt={tailor.name} />
                        </div>

                        <div className="tailor-card-details">
                          <div>
                            <div className="tailor-card-top-row">
                              <div className="tailor-name-block">
                                <h3 className="tailor-card-name">
                                  <Link href={`/tailors/${tailor.id}`}>{tailor.name}</Link>
                                </h3>
                                {tailor.topRated && (
                                  <span className="top-rated-badge">
                                    <Sparkles size={11} /> Top Rated
                                  </span>
                                )}
                              </div>
                              <button
                                className={`wishlist-heart-btn ${isWishlisted ? "active" : ""}`}
                                onClick={(e) => toggleWishlist(tailor.id, e)}
                                aria-label="Add to wishlist"
                              >
                                <Heart size={18} fill={isWishlisted ? "#e86054" : "none"} />
                              </button>
                            </div>

                            <div className="tailor-rating-line">
                              <Star size={15} className="star-icon" />
                              <span className="rating-score">{tailor.rating}</span>
                              <span>({tailor.reviewsCount})</span>
                              <span className="dot-divider">•</span>
                              <span>{tailor.distance}</span>
                            </div>

                            <div className="tailor-specialties-line">
                              {tailor.specialties.join(" • ")}
                            </div>
                          </div>

                          <div className="tailor-bottom-action-row">
                            <span className="price-delivery-info">
                              {tailor.startingPrice} • {tailor.turnaroundTime}
                            </span>
                            <Link href={`/tailors/${tailor.id}`} className="view-profile-btn">
                              View Profile
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </main>

            {/* Right Column: Interactive Map Preview Panel */}
            {isMapVisible && (
              <aside className="tailors-map-column" aria-label="Map View">
                <div className="map-preview-card">
                  {/* Close Map Button */}
                  <button
                    className="map-close-btn"
                    onClick={() => setIsMapVisible(false)}
                    aria-label="Close Map"
                  >
                    <X size={16} />
                  </button>

                  {/* Vector Map Graphic Canvas */}
                  <div className="map-vector-bg">
                    {/* Road graphics SVG */}
                    <svg className="map-road-lines" width="100%" height="100%">
                      <path
                        d="M -20 120 Q 180 80 320 220 T 540 380"
                        stroke="#CBD5E1"
                        strokeWidth="8"
                        fill="none"
                      />
                      <path
                        d="M 120 -20 Q 220 180 160 380 T 420 540"
                        stroke="#CBD5E1"
                        strokeWidth="6"
                        fill="none"
                      />
                      <path
                        d="M 380 0 Q 320 240 480 360"
                        stroke="#E2E8F0"
                        strokeWidth="5"
                        fill="none"
                      />
                    </svg>

                    {/* Locality Text Labels */}
                    <span className="map-locality-labels label-siri-fort">SIRI FORT</span>
                    <span className="map-locality-labels label-greater-kailash">
                      GREATER KAILASH
                    </span>
                    <span className="map-locality-labels label-saket">SAKET</span>

                    {/* Map Pins for Loaded Tailors */}
                    {tailors.map((t) => {
                      const isActive = hoveredTailorId === t.id || selectedPinId === t.id;

                      return (
                        <div
                          key={t.id}
                          className={`map-pin-marker ${isActive ? "active" : ""}`}
                          style={{ left: `${t.mapPin.x}%`, top: `${t.mapPin.y}%` }}
                          onClick={() => setSelectedPinId(t.id)}
                          onMouseEnter={() => setHoveredTailorId(t.id)}
                          onMouseLeave={() => setHoveredTailorId(null)}
                          title={`${t.name} (${t.locality})`}
                        >
                          <MapPin size={32} className="map-pin-icon" fill={isActive ? "#e86054" : "#078b87"} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Floating Toggle Map Button */}
                  <button
                    className="floating-map-toggle-btn"
                    onClick={() => setIsMapVisible(false)}
                  >
                    <MapIcon size={16} /> Hide map
                  </button>
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* Background Organic Decorative Waves */}
        <span className="tailors-bg-doodle-yellow" aria-hidden="true" />
        <span className="tailors-bg-doodle-coral" aria-hidden="true" />
      </div>
    </PublicShell>
  );
}
