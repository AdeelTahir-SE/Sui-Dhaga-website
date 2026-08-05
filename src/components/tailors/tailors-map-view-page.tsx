"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Heart,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Target,
  Grid,
  Check,
  X
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

export function TailorsMapViewPage() {
  // Filters state
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("Faisalabad, Pakistan");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [showMoreSpecialties, setShowMoreSpecialties] = useState<boolean>(false);
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<string>("any");
  
  // UI Interactive State
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [selectedTailorId, setSelectedTailorId] = useState<string | null>("rekha-tailors");
  const [hoveredTailorId, setHoveredTailorId] = useState<string | null>(null);
  const [isSearchingArea, setIsSearchingArea] = useState<boolean>(false);

  // Carousel ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Specialties list
  const primarySpecialties = ["Sarees", "Lehengas", "Men's Wear", "Bridal Wear", "Shirts"];
  const extraSpecialties = ["Ethnic Wear", "Kids Wear", "Custom Suits", "Anarkalis"];

  // Filter options query builder
  const filterOptions: FilterOptions = useMemo(() => {
    let priceRange = "all";
    if (priceMax <= 1500) priceRange = "under-1500";
    else if (priceMax <= 3000) priceRange = "1500-3000";

    return {
      searchQuery,
      location: location.includes("Faisalabad") ? "all" : location,
      specialty: selectedSpecialties.length > 0 ? selectedSpecialties[0] : "all",
      priceRange,
      ratingMin: ratingMin > 0 ? ratingMin : undefined,
      sortBy: "top-rated"
    };
  }, [searchQuery, location, selectedSpecialties, priceMax, ratingMin]);

  // Data fetching (synchronous fallback + async API)
  const [tailorsData, setTailorsData] = useState<PaginatedTailorsResponse>(() =>
    getTailors(filterOptions, 1, 50)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    fetchTailorsApi(filterOptions, 1, 50)
      .then((data) => {
        if (isSubscribed) {
          setTailorsData(data);
          setIsLoading(false);
          if (data.tailors.length > 0 && !data.tailors.some(t => t.id === selectedTailorId)) {
            setSelectedTailorId(data.tailors[0].id);
          }
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.error("[Map Page] API Fetch Error:", err);
          setIsLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [filterOptions]);

  const { tailors } = tailorsData;

  // Selected tailor for the floating preview card
  const activeTailor = useMemo(() => {
    return tailors.find((t) => t.id === selectedTailorId) || tailors[0] || null;
  }, [tailors, selectedTailorId]);

  // Handlers
  const handleSpecialtyToggle = (spec: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const handleClearAll = () => {
    setSearchInput("");
    setSearchQuery("");
    setLocation("Faisalabad, Pakistan");
    setSelectedSpecialties([]);
    setPriceMax(10000);
    setRatingMin(0);
    setDeliveryTime("any");
  };

  const handleSearchThisArea = () => {
    setIsSearchingArea(true);
    setTimeout(() => {
      setIsSearchingArea(false);
    }, 600);
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const nextState = !wishlist[id];
    setWishlist((prev) => ({ ...prev, [id]: nextState }));
    toggleWishlistApi(id, nextState);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Google Maps Embed URL centered on exact real location with native Google location pointer pin mark
  const targetMapQuery = activeTailor
    ? `${activeTailor.lat},${activeTailor.lng} (${activeTailor.name})`
    : (location !== "Faisalabad, Pakistan" ? `${location}, Faisalabad` : "31.4180,73.1050 (Faisalabad)");
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(targetMapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <PublicShell>
      <div className="tailors-map-page-root">
        <div className="tailors-map-container">
          {/* Breadcrumb & Top Bar */}
          <div className="tailors-map-header-row">
            <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-arrow">&gt;</span>
              <Link href="/tailors">Tailors</Link>
              <span className="breadcrumb-arrow">&gt;</span>
              <span className="current">Map</span>
            </nav>

            <div className="tailors-view-toggle">
              <Link href="/tailors" className="view-toggle-btn">
                <Grid size={15} />
                <span>Grid View</span>
              </Link>
              <button className="view-toggle-btn active" title="Current View: Map View">
                <MapPin size={15} />
                <span>Map View</span>
              </button>
            </div>
          </div>

          {/* Main Map Page Layout: Left Filter Sidebar + Right Map Area */}
          <div className="tailors-map-layout">
            {/* Left Filter Sidebar */}
            <aside className="map-filters-sidebar">
              <div className="sidebar-header">
                <h3>Filters</h3>
                <button className="clear-all-btn" onClick={handleClearAll}>
                  Clear All
                </button>
              </div>

              <form onSubmit={handleApplyFilters} className="sidebar-filters-form">
                {/* Search input */}
                <div className="filter-group">
                  <label className="filter-label">Search this area</label>
                  <div className="search-input-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      className="filter-search-input"
                      placeholder="Search by name or specialty"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location Select */}
                <div className="filter-group">
                  <label className="filter-label">Location</label>
                  <div className="location-select-wrapper">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="filter-select"
                    >
                      <option value="Faisalabad, Pakistan">Current Location</option>
                      <option value="D Ground, Faisalabad">D Ground</option>
                      <option value="Kohinoor City, Faisalabad">Kohinoor City</option>
                      <option value="People's Colony, Faisalabad">People&apos;s Colony</option>
                      <option value="Satyana Road, Faisalabad">Satyana Road</option>
                      <option value="Anarkali Bazaar, Faisalabad">Anarkali Bazaar</option>
                      <option value="Canal Road, Faisalabad">Canal Road</option>
                    </select>
                    <Target size={16} className="location-target-icon" />
                  </div>
                </div>

                {/* Specialties Checkboxes */}
                <div className="filter-group">
                  <label className="filter-label">Specialties</label>
                  <div className="specialties-checkbox-list">
                    {primarySpecialties.map((spec) => (
                      <label key={spec} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedSpecialties.includes(spec)}
                          onChange={() => handleSpecialtyToggle(spec)}
                        />
                        <span className="checkbox-custom">
                          {selectedSpecialties.includes(spec) && <Check size={12} />}
                        </span>
                        <span className="checkbox-text">{spec}</span>
                      </label>
                    ))}

                    {showMoreSpecialties &&
                      extraSpecialties.map((spec) => (
                        <label key={spec} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={selectedSpecialties.includes(spec)}
                            onChange={() => handleSpecialtyToggle(spec)}
                          />
                          <span className="checkbox-custom">
                            {selectedSpecialties.includes(spec) && <Check size={12} />}
                          </span>
                          <span className="checkbox-text">{spec}</span>
                        </label>
                      ))}

                    <button
                      type="button"
                      className="view-more-specialties-btn"
                      onClick={() => setShowMoreSpecialties(!showMoreSpecialties)}
                    >
                      {showMoreSpecialties ? "- View less" : "+ View more"}
                    </button>
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="filter-group">
                  <div className="filter-label-row">
                    <label className="filter-label">Price Range</label>
                  </div>
                  <div className="price-slider-container">
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="500"
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="price-range-slider"
                    />
                    <div className="price-slider-labels">
                      <span>Rs. 500</span>
                      <span className="current-price-val">Rs. {priceMax.toLocaleString()}+</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter Pills */}
                <div className="filter-group">
                  <label className="filter-label">Rating</label>
                  <div className="rating-pills-group">
                    <button
                      type="button"
                      className={`rating-pill ${ratingMin === 4 ? "active" : ""}`}
                      onClick={() => setRatingMin(ratingMin === 4 ? 0 : 4)}
                    >
                      4★ &amp; above
                    </button>
                    <button
                      type="button"
                      className={`rating-pill ${ratingMin === 3 ? "active" : ""}`}
                      onClick={() => setRatingMin(ratingMin === 3 ? 0 : 3)}
                    >
                      3★ &amp; above
                    </button>
                    <button
                      type="button"
                      className={`rating-pill ${ratingMin === 2 ? "active" : ""}`}
                      onClick={() => setRatingMin(ratingMin === 2 ? 0 : 2)}
                    >
                      2★ &amp; above
                    </button>
                  </div>
                </div>

                {/* Delivery Time Select */}
                <div className="filter-group">
                  <label className="filter-label">Delivery Time</label>
                  <div className="select-dropdown-wrapper">
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="filter-select"
                    >
                      <option value="any">Any time</option>
                      <option value="3-days">1 - 3 days</option>
                      <option value="5-days">4 - 6 days</option>
                      <option value="7-days">7+ days</option>
                    </select>
                    <ChevronDown size={14} className="select-arrow" />
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button type="submit" className="apply-filters-btn">
                  Apply Filters
                </button>
              </form>
            </aside>

            {/* Right Map Canvas Area */}
            <main className="map-view-canvas-container">
              {/* Google Maps Live Iframe Embed with Native Map Pin */}
              <div className="google-maps-embed-wrapper">
                <iframe
                  key={targetMapQuery}
                  title="Google Maps Tailor Search Area"
                  src={googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Floating "Search this area" Button */}
              <button
                className={`search-this-area-btn ${isSearchingArea ? "loading" : ""}`}
                onClick={handleSearchThisArea}
              >
                <Search size={15} />
                <span>{isSearchingArea ? "Updating area..." : "Search this area"}</span>
              </button>

              {/* Floating Tailor Preview Card (Top Right Overlay) */}
              {activeTailor && (
                <div className="map-tailor-preview-card">
                  <div className="preview-card-image-wrap">
                    <img src={activeTailor.image} alt={activeTailor.name} className="preview-card-img" />
                    <button
                      className={`preview-wishlist-btn ${wishlist[activeTailor.id] ? "active" : ""}`}
                      onClick={(e) => toggleWishlist(activeTailor.id, e)}
                      title="Save tailor"
                    >
                      <Heart size={16} fill={wishlist[activeTailor.id] ? "#E11D48" : "none"} color={wishlist[activeTailor.id] ? "#E11D48" : "#475569"} />
                    </button>
                  </div>

                  <div className="preview-card-content">
                    <div className="preview-card-header">
                      <h4 className="preview-tailor-title">{activeTailor.name}</h4>
                      <div className="preview-meta-row">
                        <span className="preview-rating">
                          <Star size={14} className="star-icon" fill="#F59E0B" color="#F59E0B" />
                          <strong>{activeTailor.rating}</strong> ({activeTailor.reviewsCount})
                        </span>
                        <span className="preview-dot">•</span>
                        <span className="preview-distance">{activeTailor.distance}</span>
                      </div>
                    </div>

                    <p className="preview-specialties">
                      {activeTailor.specialties.join(" • ")}
                    </p>

                    <div className="preview-details-block">
                      <div className="preview-price">{activeTailor.startingPrice}</div>
                      <div className="preview-turnaround">{activeTailor.turnaroundTime} delivery</div>
                    </div>

                    <Link href={`/tailors/${activeTailor.id}`} className="preview-action-btn">
                      View Profile
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Horizontal Nearby Tailors Panel */}
              <div className="map-nearby-tailors-bar">
                <div className="nearby-bar-header">
                  <h4>Near you ({tailors.length})</h4>
                  <div className="carousel-nav-arrows">
                    <button className="carousel-arrow" onClick={() => scrollCarousel("left")} title="Scroll Left">
                      <ChevronLeft size={16} />
                    </button>
                    <button className="carousel-arrow" onClick={() => scrollCarousel("right")} title="Scroll Right">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="nearby-tailors-carousel" ref={carouselRef}>
                  {tailors.map((tailor) => {
                    const isSelected = tailor.id === selectedTailorId;

                    return (
                      <div
                        key={tailor.id}
                        className={`nearby-tailor-mini-card ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedTailorId(tailor.id)}
                      >
                        <img src={tailor.image} alt={tailor.name} className="mini-card-thumb" />
                        <div className="mini-card-info">
                          <h5 className="mini-card-name">{tailor.name}</h5>
                          <div className="mini-card-meta">
                            <span className="mini-card-rating">
                              <Star size={12} fill="#F59E0B" color="#F59E0B" />
                              {tailor.rating}
                            </span>
                            <span className="mini-card-distance">{tailor.distance}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Page-level Corner Coral Transparent PNG Motif */}
        <div className="map-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="map-corner-img" />
        </div>
      </div>
    </PublicShell>
  );
}
