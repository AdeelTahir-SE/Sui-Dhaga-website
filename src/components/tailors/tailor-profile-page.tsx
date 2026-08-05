"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Heart,
  CheckCircle,
  Clock,
  Calendar,
  MessageSquare,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { getTailorById, fetchTailorByIdApi, toggleWishlistApi, TailorItem } from "@/lib/tailors-data";

interface TailorProfilePageProps {
  tailorId?: string;
}

export function TailorProfilePage({ tailorId: propTailorId }: TailorProfilePageProps) {
  const params = useParams();
  const activeId = propTailorId || (params?.tailorId as string) || "rekha-tailors";

  const [tailor, setTailor] = useState<TailorItem | undefined>(() => getTailorById(activeId));
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    fetchTailorByIdApi(activeId)
      .then((data) => {
        if (isSubscribed && data) {
          setTailor(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.error("[Tailor Profile] Fetch error:", err);
          setIsLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [activeId]);

  if (!tailor) {
    return (
      <PublicShell>
        <div className="tailor-profile-not-found">
          <h2>Tailor Not Found</h2>
          <p>The requested tailor profile could not be found.</p>
          <Link href="/tailors" className="btn-primary">
            Back to Tailors
          </Link>
        </div>
      </PublicShell>
    );
  }

  const galleryImages = tailor.gallery && tailor.gallery.length > 0 ? tailor.gallery : [tailor.image];

  const handleWishlistToggle = () => {
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);
    toggleWishlistApi(tailor.id, nextState);
  };

  return (
    <PublicShell>
      <div className="tailor-profile-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="tailor-profile-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="profile-ribbon-img" />
        </div>

        <div className="tailor-profile-container">
          {/* Breadcrumb Navigation */}
          <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link href="/tailors">Tailors</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span className="current">{tailor.name}</span>
          </nav>

          {/* Hero Profile Header Card */}
          <section className="profile-hero-card" aria-label="Tailor Profile Header">
            <div className="profile-hero-grid">
              {/* Left Column: Gallery Display */}
              <div className="profile-gallery-block">
                <div className="main-image-wrap">
                  <img
                    src={galleryImages[activeImageIndex] || tailor.image}
                    alt={tailor.name}
                    className="main-gallery-img"
                  />
                  <button className="expand-gallery-btn" title="View full image">
                    <Maximize2 size={16} />
                  </button>
                </div>

                <div className="thumbnail-strip">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      className={`thumb-btn ${activeImageIndex === idx ? "active" : ""}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={imgUrl} alt={`${tailor.name} thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                  <div className="thumb-more-badge">+12</div>
                </div>
              </div>

              {/* Right Column: Tailor Info & CTAs */}
              <div className="profile-info-block">
                <div className="profile-header-top-row">
                  <div className="title-and-badges">
                    <h1 className="tailor-profile-title">{tailor.name}</h1>
                    <div className="profile-badges-row">
                      {tailor.topRated && (
                        <span className="badge-pill top-rated">
                          <Award size={13} />
                          Top Rated
                        </span>
                      )}
                      {tailor.verified && (
                        <span className="badge-pill verified">
                          <ShieldCheck size={14} />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Top Action CTAs */}
                  <div className="profile-cta-buttons">
                    <Link href={`/book?tailorId=${tailor.id}`} className="cta-btn book-btn">
                      Book Appointment
                    </Link>
                    <Link href={`/messages?tailorId=${tailor.id}`} className="cta-btn message-btn">
                      <MessageSquare size={16} />
                      Message
                    </Link>
                  </div>
                </div>

                {/* Rating & Distance */}
                <div className="profile-rating-distance">
                  <span className="rating-score">
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <strong>{tailor.rating}</strong> ({tailor.reviewsCount} reviews)
                  </span>
                  <span className="meta-bullet">•</span>
                  <span className="distance-val">{tailor.distance} away</span>
                </div>

                {/* Specialties list line */}
                <p className="profile-specialties-line">
                  {tailor.specialties.join(" • ")}
                </p>

                {/* Stats Banner Grid */}
                <div className="profile-stats-grid">
                  <div className="stat-card">
                    <span className="stat-num">{tailor.experience || "12+"}</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">{tailor.happyCustomers || "2K+"}</span>
                    <span className="stat-label">Happy Customers</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">{tailor.onTimeDelivery || "98%"}</span>
                    <span className="stat-label">On-time Delivery</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-num">{tailor.rating}★</span>
                    <span className="stat-label">Average Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Middle Content Grid: About, Packages, Availability */}
          <div className="profile-middle-grid">
            {/* Column 1: About & Specialties */}
            <div className="profile-about-card">
              <h3 className="section-card-title">About {tailor.name}</h3>
              <p className="about-description">
                {tailor.about ||
                  `We bring 12+ years of expertise in creating elegant and customized outfits. From traditional wear to contemporary styles, we ensure perfect fit and premium craftsmanship for all special occasions.`}
              </p>

              <div className="about-specialties-block">
                <h4 className="sub-title">Specialties</h4>
                <div className="specialties-pills">
                  {tailor.specialties.map((spec) => (
                    <span key={spec} className="spec-tag-pill">
                      {spec}
                    </span>
                  ))}
                  <span className="spec-tag-pill">Blouses</span>
                  <span className="spec-tag-pill">Anarkali</span>
                  <span className="spec-tag-pill">Kurtis</span>
                  <span className="spec-tag-pill">Alterations</span>
                </div>
              </div>
            </div>

            {/* Column 2: Services & Packages */}
            <div className="profile-packages-card">
              <div className="packages-card-header">
                <h3 className="section-card-title">Services &amp; Packages</h3>
                <Link href={`/tailors/${tailor.id}/packages`} className="view-packages-link">
                  View all packages
                </Link>
              </div>

              <div className="packages-cards-row">
                {(tailor.packages || []).map((pkg) => (
                  <div key={pkg.id} className={`package-item-card ${pkg.popular ? "popular" : ""}`}>
                    {pkg.popular && <span className="popular-badge">Popular</span>}
                    <div className="package-card-top">
                      <h4 className="pkg-title">{pkg.name}</h4>
                      <button
                        className={`pkg-wishlist-icon ${isWishlisted ? "active" : ""}`}
                        onClick={handleWishlistToggle}
                      >
                        <Heart
                          size={15}
                          fill={isWishlisted ? "#E11D48" : "none"}
                          color={isWishlisted ? "#E11D48" : "#94A3B8"}
                        />
                      </button>
                    </div>

                    <div className="pkg-price-block">
                      <span className="starting-from">Starting from</span>
                      <span className="pkg-price">{pkg.price}</span>
                    </div>

                    <div className="pkg-turnaround">
                      <Clock size={14} />
                      <span>{pkg.turnaround}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Availability Schedule */}
            <div className="profile-availability-card">
              <h3 className="section-card-title">Availability</h3>
              <div className="availability-table">
                {(tailor.availability || []).map((slot) => (
                  <div key={slot.day} className={`availability-row ${slot.closed ? "closed" : ""}`}>
                    <span className="day-name">{slot.day}</span>
                    <span className="hours-val">{slot.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Content: Reviews & Ratings */}
          <section className="profile-reviews-section" aria-label="Customer Reviews">
            <h3 className="reviews-section-title">Reviews ({tailor.reviewsCount})</h3>

            <div className="reviews-layout-grid">
              {/* Left Score & Breakdown */}
              <div className="rating-overview-card">
                <div className="big-rating-score">{tailor.rating}</div>
                <div className="stars-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span className="based-on-text">Based on {tailor.reviewsCount} reviews</span>

                <div className="rating-bars-list">
                  {[5, 4, 3, 2, 1].map((starVal) => {
                    const percent = (tailor.ratingBreakdown || {})[starVal] || (starVal === 5 ? 84 : starVal === 4 ? 12 : 3);
                    return (
                      <div key={starVal} className="rating-bar-row">
                        <span className="star-num">{starVal}★</span>
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="bar-percent">{percent}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Customer Testimonials Carousel/Grid */}
              <div className="reviews-list-container">
                {(tailor.reviews || []).map((rev) => (
                  <div key={rev.id} className="review-testimonial-card">
                    <div className="reviewer-header">
                      <img src={rev.avatar} alt={rev.author} className="reviewer-avatar" />
                      <div className="reviewer-info">
                        <h5 className="reviewer-name">{rev.author}</h5>
                        <span className="review-date">{rev.date}</span>
                      </div>
                    </div>

                    <div className="review-stars-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          fill={s <= rev.rating ? "#F59E0B" : "none"}
                          color={s <= rev.rating ? "#F59E0B" : "#CBD5E1"}
                        />
                      ))}
                    </div>

                    <p className="review-comment-text">&ldquo;{rev.comment}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Page Level Decorative Transparent PNG Motifs */}
        <div className="profile-corner-png-left" aria-hidden="true">
          <img src="/images/auth/edge-teal.png" alt="" className="corner-png-img" />
        </div>
        <div className="profile-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
