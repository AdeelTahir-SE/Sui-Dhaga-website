"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import {
  getTailors,
  fetchTailorsApi,
  toggleWishlistApi,
  TailorItem,
  FilterOptions,
  PaginatedTailorsResponse
} from "@/lib/tailors-data";
import { TailorsGoogleMap } from "./tailors-google-map";

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

  // Backend-ready data state (synchronous initial render + async API sync)
  const [tailorsData, setTailorsData] = useState<PaginatedTailorsResponse>(() =>
    getTailors(filterOptions, page, pageSize)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    fetchTailorsApi(filterOptions, page, pageSize)
      .then((data) => {
        if (isSubscribed) {
          setTailorsData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.error("[Tailors Page] Failed to fetch tailors from backend:", err);
          setIsLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [filterOptions, page, pageSize]);

  const { tailors, totalCount, hasMore } = tailorsData;

  // Handlers
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const nextState = !wishlist[id];
    setWishlist((prev) => ({
      ...prev,
      [id]: nextState
    }));
    toggleWishlistApi(id, nextState);
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

  const mapLocationQuery = location !== "all"
    ? `${location}, Faisalabad`
    : (searchQuery.trim() !== "" ? searchQuery : "Faisalabad, Pakistan");

  return (
    <PublicShell>
      <div className="tailors-page-root">
        {/* Left Hero Yellow Ribbon Motif (Image Asset) */}
        <div className="tailors-left-hero-ribbon" aria-hidden="true">
          <img
            src="/images/tailors/hero-ribbon.png"
            alt=""
            className="tailors-left-hero-ribbon-img"
          />
        </div>

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
                  <option value="D Ground">D Ground</option>
                  <option value="Kohinoor City">Kohinoor City</option>
                  <option value="People's Colony">People&apos;s Colony</option>
                  <option value="Satyana Road">Satyana Road</option>
                  <option value="Anarkali Bazaar">Anarkali Bazaar</option>
                  <option value="Canal Road">Canal Road</option>
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
                  <option value="under-1500">Under Rs. 1,500</option>
                  <option value="1500-3000">Rs. 1,500 - Rs. 3,000</option>
                  <option value="above-3000">Above Rs. 3,000</option>
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

              {/* Compare Link Button */}
              <Link href="/tailors/compare" className="tailor-compare-nav-btn" title="Compare Tailors Side by Side">
                <SlidersHorizontal size={15} />
                <span>Compare</span>
              </Link>

              {/* Map View Link Button */}
              <Link href="/tailors/map" className="tailor-map-nav-btn" title="Open Full Interactive Map View">
                <MapIcon size={15} />
                <span>Map View</span>
              </Link>
            </div>
          </section>

          {/* Floating Middle Kite Doodle */}
          <div className="tailors-middle-kite-doodle" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M17 0 L34 17 L17 34 L0 17 Z" fill="#078B87" />
              <path d="M17 0 V34 M0 17 H34" stroke="#FAF8F5" strokeWidth="1.5" />
            </svg>
          </div>

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

            {/* Right Column: Dynamic Google Maps System */}
            {isMapVisible && (
              <aside className="tailors-map-column" aria-label="Google Map View">
                <TailorsGoogleMap
                  locationQuery={mapLocationQuery}
                  onCloseMap={() => setIsMapVisible(false)}
                />
              </aside>
            )}
          </div>
        </div>

        {/* Bottom Left Teal Organic Edge (Transparent Image Asset from Auth) */}
        <div className="tailors-bg-doodle-yellow" aria-hidden="true">
          <img
            src="/images/auth/edge-teal.png"
            alt=""
            className="tailors-bg-doodle-yellow-img"
          />
        </div>

        {/* Bottom Right Coral Organic Edge (Transparent Image Asset from Auth) */}
        <div className="tailors-bg-doodle-coral" aria-hidden="true">
          <img
            src="/images/auth/edge-coral.png"
            alt=""
            className="tailors-bg-doodle-coral-img"
          />
        </div>
      </div>
    </PublicShell>
  );
}
