"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  TrendingUp,
  Scissors,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  DollarSign,
  Clock,
  Sparkles,
  X,
  Building2,
  FileText,
  Check,
  Award
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/become-tailor.css";

export function BecomeATailorPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    shopName: "",
    city: "Lahore",
    province: "Punjab",
    address: "",
    experienceYears: 5,
    specialties: ["Bridal Lehengas", "Sherwanis"],
    cnicOrId: "",
    bankName: "",
    accountTitle: "",
    accountNumber: ""
  });

  const availableSpecialties = [
    "Bridal Lehengas",
    "Sherwanis & Prince Coats",
    "Formal Silk Suits",
    "Casual Kurtas & Shalwar",
    "Designer Blouses & Sarees",
    "Western Dresses & Gowns",
    "Alterations & Fitting"
  ];

  const toggleSpecialty = (item: string) => {
    setFormData((prev) => {
      const exists = prev.specialties.includes(item);
      return {
        ...prev,
        specialties: exists
          ? prev.specialties.filter((s) => s !== item)
          : [...prev.specialties, item]
      };
    });
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(
      `🎉 Congratulations ${formData.ownerName || "Master Artisan"}! Your application for "${
        formData.shopName || "Bespoke Studio"
      }" has been submitted for administrative verification.`
    );
    setIsApplyModalOpen(false);
    setStep(1);
  };

  return (
    <>
      <PublicNav />
      <div className="become-tailor-container">
        {/* =========================================================================
            1. Hero Section
            ========================================================================= */}
        <section className="bt-hero-section">
          <div className="bt-hero-content">
            <span className="bt-hero-eyebrow">Craft. Create. Earn.</span>
            <h1 className="bt-hero-title">
              <span className="bt-hero-title-highlight">Grow with</span> Sui Dhāga
            </h1>
            <p className="bt-hero-desc">
              Join thousands of expert tailors and get more customers, more orders, and grow your business online.
            </p>
            <div className="bt-hero-actions">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="bt-btn-primary"
              >
                <span>Apply Now</span>
                <ArrowRight size={18} />
              </button>
              <a href="#why-tailors-love" className="bt-btn-secondary">
                Learn More
              </a>
            </div>
          </div>

          <div className="bt-hero-image-wrap">
            {/* Background Sun Accent */}
            <div className="bt-hero-sun-circle" />

            {/* Generated Photorealistic Hero Portrait */}
            <img
              src="/images/become-tailor-hero.jpg"
              alt="Professional Tailor Partner"
              className="bt-hero-img"
            />

            {/* Floating Badge */}
            <div className="bt-hero-floating-card">
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#FEF3C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Star size={20} color="#D97706" fill="#D97706" />
              </div>
              <div>
                <p style={{ fontSize: "0.95rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                  4.9★ Master Rating
                </p>
                <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0 }}>
                  1,200+ Verified Partners
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. Benefits Section ("Why Tailors love Sui Dhaga")
            ========================================================================= */}
        <section id="why-tailors-love" className="bt-benefits-section">
          <div className="bt-benefits-card">
            <h2 className="bt-section-heading">Why Tailors love Sui Dhāga</h2>
            <div className="bt-benefits-grid">
              {/* Benefit 1: More Customers */}
              <div className="bt-benefit-item">
                <div className="bt-benefit-icon-box" style={{ background: "#FEF3C7" }}>
                  <Users size={24} color="#D97706" />
                </div>
                <h3 className="bt-benefit-title">More Customers</h3>
                <p className="bt-benefit-desc">
                  Get discovered by customers near you looking for bespoke tailoring.
                </p>
              </div>

              {/* Benefit 2: Steady Orders */}
              <div className="bt-benefit-item">
                <div className="bt-benefit-icon-box" style={{ background: "#FEE2E2" }}>
                  <ShoppingBag size={24} color="#DC2626" />
                </div>
                <h3 className="bt-benefit-title">Steady Orders</h3>
                <p className="bt-benefit-desc">
                  Regular orders and secure escrow payments directly to your bank account.
                </p>
              </div>

              {/* Benefit 3: Business Growth */}
              <div className="bt-benefit-item">
                <div className="bt-benefit-icon-box" style={{ background: "#FCE7F3" }}>
                  <TrendingUp size={24} color="#DB2777" />
                </div>
                <h3 className="bt-benefit-title">Business Growth</h3>
                <p className="bt-benefit-desc">
                  Build your brand, showcase your portfolio, and grow your tailoring shop online.
                </p>
              </div>

              {/* Benefit 4: Smart Tools */}
              <div className="bt-benefit-item">
                <div className="bt-benefit-icon-box" style={{ background: "#E0F2FE" }}>
                  <Scissors size={24} color="#0284C7" />
                </div>
                <h3 className="bt-benefit-title">Smart Tools</h3>
                <p className="bt-benefit-desc">
                  Manage orders, customer measurements, and custom AI design studio requests easily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. How It Works Section
            ========================================================================= */}
        <section id="how-it-works" className="bt-how-section">
          <h2 className="bt-section-heading">How It Works</h2>
          <div className="bt-how-grid">
            {/* Step 1 */}
            <div className="bt-how-step-card">
              <span className="bt-step-num">1</span>
              <h3 className="bt-step-title">Apply</h3>
              <p className="bt-step-desc">
                Fill a short form with your basic details, workshop address, and tailoring craft experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bt-how-step-card">
              <span className="bt-step-num">2</span>
              <h3 className="bt-step-title">Get Verified</h3>
              <p className="bt-step-desc">
                Submit ID and workshop verification for quick administrative approval within 24 hours.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bt-how-step-card">
              <span className="bt-step-num">3</span>
              <h3 className="bt-step-title">Set Up Profile</h3>
              <p className="bt-step-desc">
                Add your specialties, pricing list, portfolio photos, and available booking appointment slots.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bt-how-step-card">
              <span className="bt-step-num">4</span>
              <h3 className="bt-step-title">Start Getting Orders</h3>
              <p className="bt-step-desc">
                Receive customer requests, 3D measurements, and guaranteed payouts upon successful delivery.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. Split Section: Earning Potential & Requirements
            ========================================================================= */}
        <section className="bt-split-section">
          {/* Left Card: Earning Potential */}
          <div className="bt-earning-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Sparkles size={18} color="#078B87" />
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                  Earning Potential
                </h3>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#6B7280", margin: "0 0 16px" }}>
                Earn more with every stitch
              </p>

              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#078B87" }}>
                Top tailors on Sui Dhāga earn
              </span>
              <h4 className="bt-earning-big-number">₹60K – ₹2L+</h4>
              <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 24px" }}>
                per month*
              </p>
            </div>

            {/* Ascending 5-Step Bar Chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "100px", paddingBottom: "8px" }}>
              <div style={{ flex: 1, height: "30%", background: "#E0F2FE", borderRadius: "6px" }} />
              <div style={{ flex: 1, height: "45%", background: "#BAE6FD", borderRadius: "6px" }} />
              <div style={{ flex: 1, height: "65%", background: "#38BDF8", borderRadius: "6px" }} />
              <div style={{ flex: 1, height: "85%", background: "#0284C7", borderRadius: "6px" }} />
              <div style={{ flex: 1, height: "100%", background: "#078B87", borderRadius: "6px", boxShadow: "0 4px 12px rgba(7,139,135,0.4)" }} />
            </div>
          </div>

          {/* Right Card: Requirements */}
          <div className="bt-requirements-card">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <ShieldCheck size={20} color="#078B87" />
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                  Requirements
                </h3>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#6B7280", margin: "0 0 16px" }}>
                Simple criteria to join our verified artisan network
              </p>

              <ul className="bt-req-list">
                <li className="bt-req-item">
                  <span className="bt-req-dot" />
                  <span>At least 2 years of professional tailoring experience</span>
                </li>
                <li className="bt-req-item">
                  <span className="bt-req-dot" />
                  <span>Own tailoring setup or boutique workshop</span>
                </li>
                <li className="bt-req-item">
                  <span className="bt-req-dot" />
                  <span>Valid ID proof (National ID / CNIC / Aadhaar)</span>
                </li>
                <li className="bt-req-item">
                  <span className="bt-req-dot" />
                  <span>Bank account for direct escrow payouts</span>
                </li>
                <li className="bt-req-item">
                  <span className="bt-req-dot" />
                  <span>Passion for quality stitching & customer satisfaction</span>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="bt-btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>Start Application</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. Bottom CTA Banner
            ========================================================================= */}
        <section className="bt-cta-banner">
          <div className="bt-cta-card">
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, margin: 0, color: "#FFFFFF" }}>
              Ready to take your tailoring business online?
            </h2>
            <p style={{ fontSize: "1.15rem", color: "#FFFFFF", opacity: 0.95, maxWidth: "620px", margin: 0, lineHeight: 1.6 }}>
              Join Sui Dhāga today and connect with thousands of customers looking for premium bespoke outfits.
            </p>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              style={{
                background: "#FFFFFF",
                color: "#078B87",
                border: "none",
                borderRadius: "14px",
                padding: "16px 36px",
                fontSize: "1.1rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                transition: "transform 0.2s ease"
              }}
            >
              <span>Apply in 2 Minutes</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* =========================================================================
            6. Interactive Multi-Step Application Modal
            ========================================================================= */}
        {isApplyModalOpen && (
          <div className="bt-modal-backdrop" onClick={() => setIsApplyModalOpen(false)}>
            <div className="bt-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="bt-modal-header">
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                    Tailor Partner Onboarding
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                    Step {step} of 3 · Quick verification process
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmitApplication}>
                <div className="bt-modal-body">
                  {/* Step 1: Personal & Boutique Details */}
                  {step === 1 && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Master Muhammad Aslam"
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+92 300 1234567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="aslam.tailors@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Boutique / Shop Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Master Aslam Bespoke"
                            value={formData.shopName}
                            onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            City *
                          </label>
                          <select
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem", background: "#FFFFFF" }}
                          >
                            <option value="Lahore">Lahore</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                            <option value="Faisalabad">Faisalabad</option>
                            <option value="Multan">Multan</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value="Quetta">Quetta</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Workshop / Shop Address *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Shop #42, Main Anarkali Bazaar"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Experience & Craft Specialties */}
                  {step === 2 && (
                    <>
                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                          Years of Professional Tailoring Experience
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                          style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "10px" }}>
                          Select Your Craft Specialties (Select all that apply)
                        </label>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {availableSpecialties.map((item) => {
                            const isSelected = formData.specialties.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleSpecialty(item)}
                                style={{
                                  background: isSelected ? "#078B87" : "#F3F4F6",
                                  color: isSelected ? "#FFFFFF" : "#374151",
                                  border: "none",
                                  borderRadius: "20px",
                                  padding: "8px 16px",
                                  fontSize: "0.85rem",
                                  fontWeight: 650,
                                  cursor: "pointer",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                {item} {isSelected ? "✓" : "+"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 3: Verification & Payout Details */}
                  {step === 3 && (
                    <>
                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                          National ID / CNIC Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="35201-1234567-1"
                          value={formData.cnicOrId}
                          onChange={(e) => setFormData({ ...formData, cnicOrId: e.target.value })}
                          style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Bank Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Meezan Bank / HBL"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                            Account Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Muhammad Aslam"
                            value={formData.accountTitle}
                            onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                          IBAN / Account Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="PK78MEZN0002010103492817"
                          value={formData.accountNumber}
                          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                          style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                        />
                      </div>

                      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "8px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <ShieldCheck size={20} color="#15803D" style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: "0.8rem", color: "#166534", margin: 0 }}>
                          Your bank information is securely encrypted and used solely for direct escrow payouts.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="bt-modal-footer">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      style={{ background: "#FFFFFF", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "10px 20px", fontWeight: 700, color: "#374151", cursor: "pointer" }}
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="bt-btn-primary"
                    >
                      <span>Continue</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bt-btn-primary"
                    >
                      <CheckCircle2 size={16} />
                      <span>Submit Application</span>
                    </button>
                  )}
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
      <PublicFooter />
    </>
  );
}
