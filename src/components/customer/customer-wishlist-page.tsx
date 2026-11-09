"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  ChevronRight,
  Trash2,
  ExternalLink,
  ShoppingBag,
  Star,
  Scissors
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import "@/styles/pages/customer-dashboard.css";
import "@/styles/pages/customer-account-views.css";

export interface WishlistItem {
  id: string;
  title: string;
  category: "Outfits" | "Lehengas" | "Kurtis" | "Men's Wear";
  tailorId: string;
  tailorName: string;
  tailorAvatar: string;
  tailorRating: number;
  image: string;
  price: string;
  priceValue: number;
  addedDate: string;
}

const initialWishlistItems: WishlistItem[] = [
  {
    id: "wish-1",
    title: "Handcrafted Zardozi Flared Lehenga",
    category: "Lehengas",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors",
    tailorAvatar: "/images/home/tailor-rekha.png",
    tailorRating: 4.9,
    image: "/images/booking/ref-peach-gown.jpg",
    price: "Rs. 18,500",
    priceValue: 18500,
    addedDate: "20 May, 2024"
  },
  {
    id: "wish-2",
    title: "Pastel Mint Silk Embroidered Kurti",
    category: "Kurtis",
    tailorId: "stitch-craft",
    tailorName: "Stitch Craft",
    tailorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    tailorRating: 4.8,
    image: "/images/booking/ref-pink-kurti.jpg",
    price: "Rs. 3,800",
    priceValue: 3800,
    addedDate: "18 May, 2024"
  },
  {
    id: "wish-3",
    title: "Royal Champagne Jamawar Sherwani",
    category: "Men's Wear",
    tailorId: "aarav-bespoke",
    tailorName: "Aarav Bespoke",
    tailorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    tailorRating: 4.7,
    image: "/images/home/hero-float-teal-sherwani.png",
    price: "Rs. 24,000",
    priceValue: 24000,
    addedDate: "15 May, 2024"
  },
  {
    id: "wish-4",
    title: "Kalidar Gold Foil Anarkali Suit",
    category: "Outfits",
    tailorId: "rekha-tailors",
    tailorName: "Rekha Tailors",
    tailorAvatar: "/images/home/tailor-rekha.png",
    tailorRating: 4.9,
    image: "/images/booking/ref-gold-anarkali.jpg",
    price: "Rs. 8,200",
    priceValue: 8200,
    addedDate: "12 May, 2024"
  }
];

export function CustomerWishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sui_dhaga_customer_wishlist");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setWishlist(parsed);
            setIsLoading(false);
            return;
          }
        }
      } catch {}
    }

    if (hasToken) {
      // Authenticated new user starts clean
      setWishlist([]);
    } else {
      // Demo guest user gets initial wishlist
      setWishlist(initialWishlistItems);
    }
    setIsLoading(false);
  }, []);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sui_dhaga_customer_wishlist", JSON.stringify(updated));
      } catch {}
    }
  };

  const filteredItems = activeCategory === "All"
    ? wishlist
    : wishlist.filter((w) => w.category === activeCategory);

  return (
    <PublicShell>
      <div className="customer-page-root">
        {/* Ribbon Accent */}
        <div className="measurements-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="customer-page-container">
          <div className="customer-page-layout-grid">
            <CustomerSidebar active="wishlist" />

            <main className="customer-main-feed-area">
              {/* Breadcrumb */}
              <nav className="customer-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} />
                <Link href="/customer/dashboard">Dashboard</Link>
                <ChevronRight size={14} />
                <span className="crumb-current">My Wishlist</span>
              </nav>

              {/* Header */}
              <div className="customer-header-row">
                <div>
                  <h1 className="customer-page-title">Saved Wishlist</h1>
                  <p className="customer-page-subtitle">
                    Keep track of outfits, tailor designs, and bespoke pieces you love.
                  </p>
                </div>
                <Sparkles size={24} style={{ color: "#E86A33" }} />
              </div>

              {/* Category Segmented Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingBottom: "8px",
                  marginBottom: "24px"
                }}
              >
                {(["All", "Outfits", "Lehengas", "Kurtis", "Men's Wear"] as const).map((cat) => {
                  const count = cat === "All" ? wishlist.length : wishlist.filter((w) => w.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "20px",
                        border: "1px solid",
                        borderColor: activeCategory === cat ? "#078b87" : "#e2e8f0",
                        background: activeCategory === cat ? "#078b87" : "#ffffff",
                        color: activeCategory === cat ? "#ffffff" : "#475569",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.15s ease"
                      }}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Wishlist Grid */}
              {!isLoading && filteredItems.length === 0 ? (
                <div className="customer-empty-state-box">
                  <div className="customer-empty-state-icon">
                    <Heart size={36} />
                  </div>
                  <h2 className="customer-empty-state-title">Your Wishlist is Empty</h2>
                  <p className="customer-empty-state-desc">
                    Explore verified master tailors or create custom outfits in the AI Studio to save styles for your next festive event.
                  </p>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/tailors" className="btn-primary-sd">
                      <Scissors size={15} />
                      <span>Browse Tailors</span>
                    </Link>
                    <Link href="/design-studio" className="btn-accent-sd">
                      <Sparkles size={15} />
                      <span>Launch AI Studio</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
                  {filteredItems.map((item) => (
                    <article
                      key={item.id}
                      className="customer-section-card"
                      style={{
                        padding: "0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease"
                      }}
                    >
                      {/* Image Thumbnail */}
                      <div style={{ position: "relative", height: "240px", width: "100%", background: "#f1f5f9" }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/booking/ref-gold-anarkali.jpg";
                          }}
                        />

                        {/* Favorite button */}
                        <button
                          type="button"
                          onClick={(e) => handleRemove(item.id, e)}
                          title="Remove from wishlist"
                          style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.9)",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "#e11d48",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                          }}
                        >
                          <Heart size={18} fill="#e11d48" />
                        </button>

                        <span
                          style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "12px",
                            background: "rgba(0,0,0,0.7)",
                            color: "#ffffff",
                            padding: "4px 10px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: 600,
                            backdropFilter: "blur(4px)"
                          }}
                        >
                          {item.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          {/* Tailor chip */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <img
                              src={item.tailorAvatar}
                              alt={item.tailorName}
                              style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover" }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/home/tailor-rekha.png";
                              }}
                            />
                            <span style={{ fontSize: "12.5px", fontWeight: 600, color: "#475569" }}>
                              {item.tailorName}
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontSize: "11.5px", color: "#f59e0b", marginLeft: "auto", fontWeight: 700 }}>
                              <Star size={12} fill="#f59e0b" />
                              {item.tailorRating}
                            </span>
                          </div>

                          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", margin: "0 0 10px 0", lineHeight: 1.4 }}>
                            {item.title}
                          </h3>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                          <div>
                            <span style={{ display: "block", fontSize: "11px", color: "#64748b" }}>Estimated Stitched</span>
                            <strong style={{ fontSize: "15px", color: "#078b87", fontWeight: 800 }}>
                              {item.price}
                            </strong>
                          </div>

                          <Link
                            href={`/book/${item.tailorId}`}
                            className="btn-primary-sd"
                            style={{ padding: "8px 14px", fontSize: "12.5px" }}
                          >
                            <Scissors size={14} />
                            <span>Book Stitching</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}

