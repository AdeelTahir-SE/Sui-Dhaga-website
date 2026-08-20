"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Check,
  X as XIcon,
  ShieldCheck,
  Wand2,
  Scissors,
  Crown,
  Building,
  CreditCard,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Zap,
  Lock
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/pricing-view.css";

interface PlanTier {
  id: "free" | "pro" | "business";
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  featured?: boolean;
  badge?: string;
  features: string[];
  ctaLabel: string;
}

const plans: PlanTier[] = [
  {
    id: "free",
    name: "Free / Explorer",
    desc: "Perfect for casual shoppers exploring AI fashion concepts and finding local master tailors.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "25 AI Design Studio Generations / mo",
      "Standard 2D Garment Renders",
      "1 Saved 3D Body Measurement Profile",
      "Verified Master Tailors Directory",
      "100% Escrow Buyer Protection",
      "Standard Community Support"
    ],
    ctaLabel: "Get Started Free"
  },
  {
    id: "pro",
    name: "Creator & Studio Pro",
    desc: "For fashion enthusiasts, creators, and discerning clients demanding bespoke perfection.",
    monthlyPrice: 1499,
    annualPrice: 14390,
    featured: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI Design Studio Renders",
      "Ultra HD 4K 3D Photorealistic Garments",
      "Export Complete Production Tech Packs",
      "Unlimited Saved 3D Measurement Profiles",
      "Priority Escrow & VIP Master Tailor Matching",
      "48-Hour Express Stitching Queue Access",
      "Priority 24/7 Concierge Support"
    ],
    ctaLabel: "Upgrade to Pro"
  },
  {
    id: "business",
    name: "Boutique & Atelier Elite",
    desc: "Built for master tailoring studios, designer boutiques, and commercial fashion ateliers.",
    monthlyPrice: 3999,
    annualPrice: 38390,
    features: [
      "Everything in Studio Pro included",
      "Verified Boutique Badge & Top Search Placement",
      "Client Tech Pack Importer & 3D Pattern Grading",
      "Multi-User Workshop Seats (Up to 5 Cutters)",
      "Automated Booking & Appointment Sync",
      "0% Platform Commission on First 20 Orders/mo",
      "Dedicated Account Manager & VIP Hotline"
    ],
    ctaLabel: "Start 14-Day Free Trial"
  }
];

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<PlanTier | null>(null);
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState<"upi" | "card" | "netbanking">("upi");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectPlan = (plan: PlanTier) => {
    if (plan.id === "free") {
      window.location.href = "/design-studio";
    } else {
      setSelectedPlanForModal(plan);
    }
  };

  const handleConfirmSubscription = () => {
    if (!selectedPlanForModal) return;
    setSelectedPlanForModal(null);
    setToastMessage(`🎉 Welcome to Sui Dhāga ${selectedPlanForModal.name}! Your subscription is active.`);
  };

  return (
    <>
      <PublicNav />

      <div className="prc-container">
        <div className="prc-inner">
          {/* Breadcrumb */}
          <div className="prc-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#111827", fontWeight: 650 }}>AI Studio &amp; Platform Pricing</span>
          </div>

          {/* Hero Section */}
          <section className="prc-hero">
            <div className="prc-hero-badge">
              <Sparkles size={14} />
              <span>AI Fashion &amp; Bespoke Platform</span>
            </div>
            <h1 className="prc-hero-title">
              Simple, Transparent Plans for <span>Creators &amp; Artisans</span>
            </h1>
            <p className="prc-hero-subtitle">
              Unlock unlimited AI design renders, export production-grade tech packs, manage 3D body measurements, and partner with top verified tailors.
            </p>
          </section>

          {/* Billing Cycle Toggle Switch */}
          <div className="prc-toggle-wrap">
            <div className="prc-toggle-btn-group">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`prc-toggle-pill ${billingCycle === "monthly" ? "active" : ""}`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`prc-toggle-pill ${billingCycle === "yearly" ? "active" : ""}`}
              >
                Annual Billing
              </button>
            </div>
            <span className="prc-discount-tag">Save 20% (2 Months Free)</span>
          </div>

          {/* 3-Tier Pricing Cards Grid */}
          <div className="prc-grid">
            {plans.map((plan) => {
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
              const unit = plan.monthlyPrice === 0
                ? "free forever"
                : billingCycle === "monthly"
                ? "/ month"
                : "/ year (billed annually)";

              return (
                <div
                  key={plan.id}
                  className={`prc-card ${plan.featured ? "featured" : ""}`}
                >
                  {plan.badge && (
                    <div className="prc-popular-badge">{plan.badge}</div>
                  )}

                  <h3 className="prc-plan-name">{plan.name}</h3>
                  <p className="prc-plan-desc">{plan.desc}</p>

                  <div className="prc-price-wrap">
                    <span className="prc-price-val">
                      {price === 0 ? "₹0" : `₹${price.toLocaleString("en-IN")}`}
                    </span>
                    <span className="prc-price-unit">{unit}</span>
                  </div>

                  <div className="prc-features-list">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="prc-feature-item">
                        <Check size={18} color="#078B87" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`prc-btn-action ${plan.featured ? "primary" : "outline"}`}
                  >
                    {plan.ctaLabel}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Feature Matrix Table */}
          <div className="prc-matrix-card">
            <h2 className="prc-matrix-title">Compare All Features</h2>
            <p className="prc-matrix-sub">
              Detailed breakdown of platform capabilities across each tier.
            </p>

            <div className="prc-table-scroll">
              <table className="prc-table">
                <thead>
                  <tr>
                    <th className="prc-th" style={{ width: "40%" }}>Platform Feature</th>
                    <th className="prc-th" style={{ width: "20%" }}>Free / Explorer</th>
                    <th className="prc-th" style={{ width: "20%", color: "#078B87" }}>Studio Pro</th>
                    <th className="prc-th" style={{ width: "20%" }}>Boutique Elite</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="prc-td"><strong>AI Design Studio Renders</strong></td>
                    <td className="prc-td">25 / month</td>
                    <td className="prc-td" style={{ color: "#078B87", fontWeight: 700 }}>Unlimited</td>
                    <td className="prc-td" style={{ color: "#078B87", fontWeight: 700 }}>Unlimited</td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>Render Quality &amp; Lighting</strong></td>
                    <td className="prc-td">Standard 2D</td>
                    <td className="prc-td">Ultra HD 4K 3D</td>
                    <td className="prc-td">Ultra HD 4K 3D Photoreal</td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>Export Production Tech Packs (PDF)</strong></td>
                    <td className="prc-td"><XIcon size={16} color="#9CA3AF" /></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>Saved 3D Measurement Profiles</strong></td>
                    <td className="prc-td">1 Profile</td>
                    <td className="prc-td">Unlimited</td>
                    <td className="prc-td">Unlimited + Client CRM</td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>Verified Tailor Discovery &amp; Escrow</strong></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>48-Hour Rush Stitching Queue</strong></td>
                    <td className="prc-td"><XIcon size={16} color="#9CA3AF" /></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                    <td className="prc-td"><Check size={18} color="#078B87" /></td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>Workshop Team Seats</strong></td>
                    <td className="prc-td">1 User</td>
                    <td className="prc-td">1 User</td>
                    <td className="prc-td">Up to 5 Cutters / Tailors</td>
                  </tr>
                  <tr>
                    <td className="prc-td"><strong>Customer Support Channel</strong></td>
                    <td className="prc-td">Community Forum</td>
                    <td className="prc-td">24/7 Priority Chat</td>
                    <td className="prc-td">Dedicated Account Manager</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Checkout Modal */}
      {selectedPlanForModal && (
        <div
          className="prc-modal-backdrop"
          onClick={() => setSelectedPlanForModal(null)}
        >
          <div
            className="prc-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="prc-modal-header">
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                  Subscribe to {selectedPlanForModal.name}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                  Billed {billingCycle === "monthly" ? "Monthly" : "Annually"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlanForModal(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="prc-modal-body">
              <div style={{ background: "#F0FDFA", border: "1px solid #CCFBF1", borderRadius: "14px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0F766E" }}>Plan Total</span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#078B87", margin: "2px 0 0" }}>
                    ₹{(billingCycle === "monthly" ? selectedPlanForModal.monthlyPrice : selectedPlanForModal.annualPrice).toLocaleString("en-IN")}
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6B7280" }}>
                      {billingCycle === "monthly" ? " / mo" : " / yr"}
                    </span>
                  </h3>
                </div>
                {billingCycle === "yearly" && (
                  <span className="prc-discount-tag">20% Saved</span>
                )}
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "8px" }}>
                  Select Payment Channel
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div
                    onClick={() => setSelectedPaymentChannel("upi")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: `1.5px solid ${selectedPaymentChannel === "upi" ? "#078B87" : "#E5E7EB"}`,
                      background: selectedPaymentChannel === "upi" ? "#F0FDFA" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Smartphone size={18} color="#078B87" />
                      <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>Instant UPI / QR Code</span>
                    </div>
                    <input type="radio" checked={selectedPaymentChannel === "upi"} readOnly />
                  </div>

                  <div
                    onClick={() => setSelectedPaymentChannel("card")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: `1.5px solid ${selectedPaymentChannel === "card" ? "#078B87" : "#E5E7EB"}`,
                      background: selectedPaymentChannel === "card" ? "#F0FDFA" : "#FFFFFF",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <CreditCard size={18} color="#078B87" />
                      <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>Credit / Debit Card (Auto-Renew)</span>
                    </div>
                    <input type="radio" checked={selectedPaymentChannel === "card"} readOnly />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#15803D", fontSize: "0.8rem", fontWeight: 650 }}>
                <ShieldCheck size={16} />
                <span>Encrypted 256-bit SSL Checkout · Cancel anytime in 1-click</span>
              </div>
            </div>

            <div className="prc-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedPlanForModal(null)}
                style={{ background: "#FFFFFF", border: "1px solid #D1D5DB", borderRadius: "10px", padding: "10px 18px", fontWeight: 700, color: "#374151", cursor: "pointer" }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmSubscription}
                style={{
                  background: "#078B87",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 22px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Lock size={15} />
                <span>Confirm &amp; Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <PublicFooter />
    </>
  );
}
