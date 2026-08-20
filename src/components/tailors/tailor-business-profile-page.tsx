"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  Edit3,
  MapPin,
  ShieldCheck,
  Award,
  X,
  Camera,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-profile-view.css";

export function TailorBusinessProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tailor Profile State
  const [businessProfile, setBusinessProfile] = useState({
    shopName: "Verma Stitch Studio",
    ownerName: "Arjun Verma",
    avatar: "/images/tailor-onboarding-avatar.jpg",
    rating: 4.8,
    reviewsCount: 128,
    memberSince: "May 2023",
    specializesSummary: "Ethnic Wear, Wedding Wear, Men's Wear",
    about:
      "With over 8 years of experience, we bring your style to life with perfect stitching and attention to detail.",
    specialties: [
      "Anarkali Suits",
      "Lehengas",
      "Blouses",
      "Sherwanis",
      "Kurta Sets",
      "Alterations"
    ],
    city: "Jaipur",
    province: "Rajasthan",
    address: "Shop #14, Main Market, Fashion Enclave",
    servingRadiusKm: 15,
    phone: "+91 98765-43210",
    email: "arjunverma@email.com",
    isVerified: true
  });

  // Edit Form Temp State
  const [editForm, setEditForm] = useState({ ...businessProfile });
  const [newSpecialtyTag, setNewSpecialtyTag] = useState("");

  const handleOpenEdit = () => {
    setEditForm({ ...businessProfile });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setBusinessProfile({ ...editForm });
    setIsEditModalOpen(false);
    setToastMessage("🎉 Business profile updated successfully!");
  };

  const handleAddSpecialty = () => {
    if (newSpecialtyTag.trim() && !editForm.specialties.includes(newSpecialtyTag.trim())) {
      setEditForm({
        ...editForm,
        specialties: [...editForm.specialties, newSpecialtyTag.trim()]
      });
      setNewSpecialtyTag("");
    }
  };

  const handleRemoveSpecialty = (tag: string) => {
    setEditForm({
      ...editForm,
      specialties: editForm.specialties.filter((t) => t !== tag)
    });
  };

  return (
    <div className="tp-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tp-body-container">
        {/* Left Sidebar with Profile Active */}
        <TailorSidebar activeKey="profile" />

        {/* Main Content Area */}
        <main className="tp-main-content">
          {/* Header Title */}
          <div className="tp-header">
            <h1 className="tp-page-title">Your Business Profile</h1>
            <p className="tp-page-subtitle">
              Manage your business information and public profile.
            </p>
          </div>

          {/* 1. Top Business Card matching exact design */}
          <div className="tp-business-card">
            <div className="tp-business-left">
              {/* Tailor Avatar */}
              <img
                src={businessProfile.avatar}
                alt={businessProfile.shopName}
                className="tp-avatar-img"
              />

              {/* Meta Details */}
              <div className="tp-business-meta">
                <div className="tp-shop-title-row">
                  <h2 className="tp-shop-name">{businessProfile.shopName}</h2>
                  {businessProfile.isVerified && (
                    <span className="tp-verified-badge">
                      <CheckCircle2 size={13} />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                {/* Star Rating Line */}
                <div className="tp-rating-line">
                  <Star size={15} className="tp-rating-star" />
                  <span>{businessProfile.rating}</span>
                  <span className="tp-reviews-count">({businessProfile.reviewsCount} reviews)</span>
                </div>

                {/* Member Since */}
                <div className="tp-member-since">
                  <Award size={15} color="#D97706" />
                  <span>Member since {businessProfile.memberSince}</span>
                </div>

                {/* Specializes In Summary */}
                <p className="tp-specializes-summary">
                  <strong>Specializes in: </strong>
                  {businessProfile.specializesSummary}
                </p>
              </div>
            </div>

            {/* Edit Profile Action Button */}
            <button
              type="button"
              onClick={handleOpenEdit}
              className="tp-edit-btn"
            >
              <Edit3 size={15} />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* 2. Middle Card: About, Specialties, Location */}
          <div className="tp-details-card">
            {/* About Subsection */}
            <div>
              <h3 className="tp-sub-heading">About</h3>
              <p className="tp-about-text">{businessProfile.about}</p>
            </div>

            {/* Specialties Subsection */}
            <div>
              <h3 className="tp-sub-heading">Specialties</h3>
              <div className="tp-specialties-wrap">
                {businessProfile.specialties.map((spec) => (
                  <span key={spec} className="tp-specialty-pill">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Location Subsection with Map Preview */}
            <div>
              <h3 className="tp-sub-heading">Location</h3>
              <div className="tp-location-grid">
                <div className="tp-location-info">
                  <p className="tp-city-name">
                    {businessProfile.city}, {businessProfile.province}
                  </p>
                  <p className="tp-radius-info">
                    Serving within {businessProfile.servingRadiusKm} km
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "4px 0 0" }}>
                    Address: {businessProfile.address}
                  </p>
                </div>

                {/* Mini Map Visual Card with link */}
                <div className="tp-map-preview-card">
                  <MapPin size={28} color="#078B87" style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", opacity: 0.35 }} />
                  <Link href="/tailors" className="tp-map-btn">
                    <MapPin size={13} />
                    <span>View on map</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Card: Verification Status */}
          <div className="tp-verification-card">
            <h3 className="tp-sub-heading" style={{ margin: 0 }}>
              Verification Status
            </h3>

            <div className="tp-verify-list">
              <div className="tp-verify-row">
                <div className="tp-verify-left">
                  <CheckCircle2 size={18} color="#15803D" />
                  <span>ID Proof</span>
                </div>
                <span className="tp-verify-status-badge">Verified</span>
              </div>

              <div className="tp-verify-row">
                <div className="tp-verify-left">
                  <CheckCircle2 size={18} color="#15803D" />
                  <span>Address Proof</span>
                </div>
                <span className="tp-verify-status-badge">Verified</span>
              </div>

              <div className="tp-verify-row">
                <div className="tp-verify-left">
                  <CheckCircle2 size={18} color="#15803D" />
                  <span>Business Proof</span>
                </div>
                <span className="tp-verify-status-badge">Verified</span>
              </div>

              <div className="tp-verify-row">
                <div className="tp-verify-left">
                  <CheckCircle2 size={18} color="#15803D" />
                  <span>Bank Details</span>
                </div>
                <span className="tp-verify-status-badge">Verified</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="tp-modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="tp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tp-modal-header">
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                Edit Business Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div className="tp-modal-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.shopName}
                      onChange={(e) => setEditForm({ ...editForm, shopName: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      Owner Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editForm.ownerName}
                      onChange={(e) => setEditForm({ ...editForm, ownerName: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Specialties Summary (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={editForm.specializesSummary}
                    onChange={(e) => setEditForm({ ...editForm, specializesSummary: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                    placeholder="e.g. Ethnic Wear, Wedding Wear, Men's Wear"
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    About Workshop & Craft Experience
                  </label>
                  <textarea
                    rows={3}
                    value={editForm.about}
                    onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem", resize: "vertical" }}
                  />
                </div>

                {/* Specialties Tag Management */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Specialties Tags
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                    {editForm.specialties.map((spec) => (
                      <span
                        key={spec}
                        style={{
                          background: "#F0FDFA",
                          border: "1px solid #99F6E4",
                          color: "#0F766E",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          padding: "4px 12px",
                          borderRadius: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        {spec}
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecialty(spec)}
                          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#0F766E", padding: 0 }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Add another specialty..."
                      value={newSpecialtyTag}
                      onChange={(e) => setNewSpecialtyTag(e.target.value)}
                      style={{ flex: 1, padding: "8px 12px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.85rem" }}
                    />
                    <button
                      type="button"
                      onClick={handleAddSpecialty}
                      style={{
                        background: "#078B87",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      City & Province
                    </label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      Serving Radius (km)
                    </label>
                    <input
                      type="number"
                      value={editForm.servingRadiusKm}
                      onChange={(e) => setEditForm({ ...editForm, servingRadiusKm: Number(e.target.value) })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div className="tp-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    color: "#374151",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: "#078B87",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 22px",
                    fontWeight: 750,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Check size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
