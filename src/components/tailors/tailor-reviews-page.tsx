"use client";

import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  CheckCircle2,
  CornerDownRight,
  Send,
  ThumbsUp,
  Image as ImageIcon
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-reviews-view.css";

interface ReviewItem {
  id: string;
  authorName: string;
  avatar: string;
  rating: number;
  date: string;
  orderTitle: string;
  orderNumber: string;
  comment: string;
  photos?: string[];
  reply?: {
    date: string;
    text: string;
  };
}

const initialTailorReviews: ReviewItem[] = [
  {
    id: "r1",
    authorName: "Neha Verma",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "14 May 2024",
    orderTitle: "Custom Anarkali Suit",
    orderNumber: "SD1256",
    comment:
      "Master Arjun's bespoke fitting exceeded all my expectations! The intricate zardozi embroidery on the neckline and the flared umbrella panels drape like royal couture. Delivery was right on schedule.",
    photos: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80"
    ],
    reply: {
      date: "15 May 2024",
      text: "Thank you so much Neha ji! It was our true pleasure stitching your festive Anarkali suit. Looking forward to crafting your next bespoke outfit!"
    }
  },
  {
    id: "r2",
    authorName: "Rohan Singh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "10 May 2024",
    orderTitle: "Sherwani Stitching",
    orderNumber: "SD1258",
    comment:
      "Ordered a Banarasi Jamawar wedding sherwani with handmade metal buttons. The shoulder posture and sleeve length were 100% spot on during the first trial. Highly recommend Verma Stitch Studio!",
    photos: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&auto=format&fit=crop&q=80"
    ]
  },
  {
    id: "r3",
    authorName: "Ayesha Khan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    date: "08 May 2024",
    orderTitle: "Lawn Kurta Set",
    orderNumber: "SD1259",
    comment:
      "Super neat stitching and fine lace details on the cuffs and hemline. The fit is breathable yet tailored.",
    reply: {
      date: "08 May 2024",
      text: "Thank you Ayesha! Glad you loved the lace finishing and comfortable fit."
    }
  },
  {
    id: "r4",
    authorName: "Pooja Mehta",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    rating: 4,
    date: "02 May 2024",
    orderTitle: "Padded Saree Blouse",
    orderNumber: "SD1257",
    comment:
      "The sweetheart neck cut is beautiful and pads are positioned accurately. Turnaround took 4 days instead of 3, but the craftsmanship made up for it."
  }
];

export function TailorReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialTailorReviews);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredReviews = reviews.filter((r) => {
    if (activeTab === "all") return true;
    if (activeTab === "5_star") return r.rating === 5;
    if (activeTab === "4_star") return r.rating === 4;
    if (activeTab === "with_photos") return r.photos && r.photos.length > 0;
    if (activeTab === "needs_reply") return !r.reply;
    return true;
  });

  const handleSendReply = (reviewId: string) => {
    const text = replyTextMap[reviewId]?.trim();
    if (!text) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              reply: {
                date: "Just now",
                text
              }
            }
          : r
      )
    );

    setReplyTextMap({ ...replyTextMap, [reviewId]: "" });
    setToastMessage("✓ Official artisan response posted to customer review.");
  };

  return (
    <div className="trv-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="trv-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="reviews" />

        {/* Main Content Area */}
        <main className="trv-main-content">
          {/* Header Area */}
          <div className="trv-header">
            <h1 className="trv-title">Customer Reviews & Ratings</h1>
            <p className="trv-subtitle">
              Read client feedback and respond to custom tailoring reviews.
            </p>
          </div>

          {/* Top Overview & Breakdown Card */}
          <div className="trv-overview-card">
            {/* Left Big Score */}
            <div className="trv-big-rating-col">
              <span className="trv-score-big">4.8</span>
              <div className="trv-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" />
                ))}
              </div>
              <span className="trv-total-sub">Based on 128 verified reviews</span>
            </div>

            {/* Middle Distribution Bars */}
            <div className="trv-dist-col">
              <div className="trv-dist-row">
                <span>5 ★</span>
                <div className="trv-dist-bar-bg">
                  <div className="trv-dist-bar-fill" style={{ width: "82%" }} />
                </div>
                <span className="trv-dist-pct">82%</span>
              </div>

              <div className="trv-dist-row">
                <span>4 ★</span>
                <div className="trv-dist-bar-bg">
                  <div className="trv-dist-bar-fill" style={{ width: "12%" }} />
                </div>
                <span className="trv-dist-pct">12%</span>
              </div>

              <div className="trv-dist-row">
                <span>3 ★</span>
                <div className="trv-dist-bar-bg">
                  <div className="trv-dist-bar-fill" style={{ width: "4%" }} />
                </div>
                <span className="trv-dist-pct">4%</span>
              </div>

              <div className="trv-dist-row">
                <span>2 ★</span>
                <div className="trv-dist-bar-bg">
                  <div className="trv-dist-bar-fill" style={{ width: "1%" }} />
                </div>
                <span className="trv-dist-pct">1%</span>
              </div>

              <div className="trv-dist-row">
                <span>1 ★</span>
                <div className="trv-dist-bar-bg">
                  <div className="trv-dist-bar-fill" style={{ width: "1%" }} />
                </div>
                <span className="trv-dist-pct">1%</span>
              </div>
            </div>

            {/* Right Quality Stats */}
            <div className="trv-quality-col">
              <div className="trv-quality-item">
                <span className="trv-q-label">Fitting Accuracy</span>
                <span className="trv-q-val">4.9 / 5.0</span>
              </div>

              <div className="trv-quality-item">
                <span className="trv-q-label">On-Time Delivery</span>
                <span className="trv-q-val">4.8 / 5.0</span>
              </div>

              <div className="trv-quality-item">
                <span className="trv-q-label">Fabric Care & Finish</span>
                <span className="trv-q-val">4.9 / 5.0</span>
              </div>

              <div className="trv-quality-item">
                <span className="trv-q-label">Positive Feedback</span>
                <span className="trv-q-val" style={{ color: "#15803D" }}>96%</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="trv-tabs-row">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`trv-tab-btn ${activeTab === "all" ? "active" : ""}`}
            >
              All Reviews ({reviews.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("5_star")}
              className={`trv-tab-btn ${activeTab === "5_star" ? "active" : ""}`}
            >
              5 Stars ({reviews.filter((r) => r.rating === 5).length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("4_star")}
              className={`trv-tab-btn ${activeTab === "4_star" ? "active" : ""}`}
            >
              4 Stars ({reviews.filter((r) => r.rating === 4).length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("with_photos")}
              className={`trv-tab-btn ${activeTab === "with_photos" ? "active" : ""}`}
            >
              With Photos ({reviews.filter((r) => r.photos && r.photos.length > 0).length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("needs_reply")}
              className={`trv-tab-btn ${activeTab === "needs_reply" ? "active" : ""}`}
            >
              Needs Reply ({reviews.filter((r) => !r.reply).length})
            </button>
          </div>

          {/* Reviews List */}
          <div className="trv-list">
            {filteredReviews.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280", background: "#FFFFFF", borderRadius: "16px", border: "1px solid #EAE6DF" }}>
                No reviews found in this category.
              </div>
            ) : (
              filteredReviews.map((item) => (
                <div key={item.id} className="trv-card">
                  <div className="trv-card-header">
                    <div className="trv-author-info">
                      <img src={item.avatar} alt={item.authorName} className="trv-author-avatar" />
                      <div>
                        <h3 className="trv-author-name">{item.authorName}</h3>
                        <span className="trv-order-tag">
                          Verified Order #{item.orderNumber} · {item.orderTitle}
                        </span>
                      </div>
                    </div>

                    <div className="trv-rating-date">
                      <div className="trv-stars-row" style={{ margin: 0 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < item.rating ? "#F59E0B" : "none"}
                            color={i < item.rating ? "#F59E0B" : "#D1D5DB"}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>{item.date}</span>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="trv-comment-text">{item.comment}</p>

                  {/* Customer Outfit Photos Preview */}
                  {item.photos && item.photos.length > 0 && (
                    <div className="trv-photos-row">
                      {item.photos.map((photoUrl, idx) => (
                        <img
                          key={idx}
                          src={photoUrl}
                          alt="Customer outfit preview"
                          className="trv-photo-thumb"
                          onClick={() => setToastMessage("Full-screen photo view.")}
                        />
                      ))}
                    </div>
                  )}

                  {/* Tailor Reply or Reply Box */}
                  {item.reply ? (
                    <div className="trv-reply-box">
                      <div className="trv-reply-header">
                        <CornerDownRight size={14} />
                        <span>Response from Verma Stitch Studio ({item.reply.date})</span>
                      </div>
                      <p className="trv-reply-text">{item.reply.text}</p>
                    </div>
                  ) : (
                    <div style={{ marginTop: "4px" }}>
                      <div className="trv-reply-form">
                        <input
                          type="text"
                          placeholder="Write an official response to this review..."
                          value={replyTextMap[item.id] || ""}
                          onChange={(e) =>
                            setReplyTextMap({ ...replyTextMap, [item.id]: e.target.value })
                          }
                          className="trv-reply-input"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendReply(item.id)}
                          className="trv-btn-send-reply"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
