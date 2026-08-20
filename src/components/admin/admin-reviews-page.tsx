"use client";

import React, { useState, useEffect } from "react";
import { Star, Eye, EyeOff, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminReview } from "@/lib/api/admin-types";

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.reviews.getReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      setToastMessage("Failed to load reviews from API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleStatus = async (review: AdminReview) => {
    const newStatus = review.status === "published" ? "hidden" : "published";
    try {
      const updated = await adminService.reviews.moderateReview(review.id, {
        status: newStatus
      });
      setReviews((prev) => prev.map((r) => (r.id === review.id ? updated : r)));
      setToastMessage(`Review has been ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to update review moderation status.");
    }
  };

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="reviews" />

      <div className="admin-main-container">
        <AdminHeader />

        <main className="admin-dashboard-body">
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1>Review Moderation</h1>
              <p>Curate authentic client testimonials, moderate artisan ratings, and remove inappropriate content.</p>
            </div>
          </div>

          <div className="admin-table-container">
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-th">Reviewer & Order</th>
                    <th className="admin-th">Tailor Partner</th>
                    <th className="admin-th">Rating</th>
                    <th className="admin-th">Feedback Comment</th>
                    <th className="admin-th">Status</th>
                    <th className="admin-th" style={{ textAlign: "right" }}>Moderation</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((rev) => (
                    <tr key={rev.id}>
                      <td className="admin-td">
                        <div className="admin-user-cell">
                          <img
                            src={rev.customerAvatar}
                            alt={rev.customerName}
                            className="admin-user-avatar"
                          />
                          <div>
                            <p className="admin-user-info-name">{rev.customerName}</p>
                            <p className="admin-user-info-sub">{rev.orderNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="admin-td">
                        <span style={{ fontWeight: 700 }}>{rev.tailorName}</span>
                      </td>
                      <td className="admin-td">
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                          ))}
                        </div>
                      </td>
                      <td className="admin-td" style={{ maxWidth: "320px" }}>
                        <p style={{ fontWeight: 700, margin: "0 0 2px", fontSize: "0.88rem" }}>
                          {rev.reviewTitle}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#4B5563", margin: 0 }}>
                          {rev.comment}
                        </p>
                      </td>
                      <td className="admin-td">
                        <span
                          className={`admin-status-badge ${
                            rev.status === "published" ? "badge-active" : "badge-suspended"
                          }`}
                        >
                          <span style={{ textTransform: "capitalize" }}>{rev.status}</span>
                        </span>
                      </td>
                      <td className="admin-td" style={{ textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(rev)}
                          className="admin-action-btn-sm"
                        >
                          {rev.status === "published" ? (
                            <>
                              <EyeOff size={14} />
                              <span>Hide Review</span>
                            </>
                          ) : (
                            <>
                              <Eye size={14} />
                              <span>Publish</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
