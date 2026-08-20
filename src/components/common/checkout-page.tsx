"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  MapPin,
  Clock,
  CheckCircle2,
  Lock,
  Tag,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Scissors
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/checkout-view.css";

export function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [couponCode, setCouponCode] = useState("FIRSTSTITCH");
  const [couponApplied, setCouponApplied] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Price calculations matching reference data
  const subtotal = 12500;
  const deliveryFee = 200;
  const platformFee = 150;
  const discount = couponApplied ? 1250 : 0;
  const totalAmount = subtotal + deliveryFee + platformFee - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "FIRSTSTITCH" || couponCode.toUpperCase() === "SUIDHAGA10") {
      setCouponApplied(true);
      setToastMessage("🎉 Coupon applied! 10% discount subtracted from total.");
    } else {
      setCouponApplied(false);
      setToastMessage("Invalid promo code. Use FIRSTSTITCH for 10% off.");
    }
  };

  const handlePlaceOrder = () => {
    setIsSuccessOpen(true);
  };

  return (
    <>
      <PublicNav />

      <div className="chk-layout-wrapper">
        <div className="chk-inner">
          {/* Breadcrumb */}
          <div className="chk-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <Link href="/tailors">Tailors</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#111827", fontWeight: 650 }}>Checkout</span>
          </div>

          {/* Header */}
          <div className="chk-header">
            <h1 className="chk-title">Checkout &amp; Order Summary</h1>
            <p className="chk-subtitle">
              Review your bespoke outfit specifications, select a payment channel, and place your order.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="chk-grid">
            {/* Left Column (Order Items, Fitting Address, Payment Methods) */}
            <div className="chk-left-col">
              {/* 1. Order Summary Card */}
              <div className="chk-card">
                <h2 className="chk-card-title">
                  <Scissors size={20} color="#078B87" />
                  <span>Custom Order Details</span>
                </h2>

                <div className="chk-item-row">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80"
                    alt="Custom Anarkali Suit"
                    className="chk-item-thumb"
                  />

                  <div className="chk-item-meta">
                    <h3 className="chk-item-name">Custom Anarkali Suit</h3>
                    <p className="chk-item-sub">Fabric: Pastel Green Floral Silk &amp; Flared Umbrella</p>
                    <p className="chk-item-sub">
                      Master Tailor: <strong>Rekha Tailors (@rekhatailors)</strong> · Verified Partner
                    </p>
                    <p className="chk-item-sub">Size: Custom 3D Profile (Chest: 36&quot;, Waist: 30&quot;, Length: 52&quot;)</p>

                    <div className="chk-item-price-row">
                      <span style={{ fontSize: "0.82rem", color: "#6B7280" }}>Qty: 1</span>
                      <span className="chk-item-price">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0F766E", fontSize: "0.85rem", fontWeight: 650, background: "#F0FDFA", padding: "10px 14px", borderRadius: "10px" }}>
                  <Clock size={16} />
                  <span>Estimated Delivery by 25 May 2024 (5-7 business days)</span>
                </div>
              </div>

              {/* 2. Delivery & Fitting Address */}
              <div className="chk-card">
                <h2 className="chk-card-title">
                  <MapPin size={20} color="#078B87" />
                  <span>Delivery &amp; Fitting Address</span>
                </h2>

                <div className="chk-addr-box">
                  <div>
                    <p style={{ fontSize: "0.95rem", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                      Neha Verma (Home)
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: "0 0 2px" }}>
                      Apartment 4B, Heritage Heights, Connaught Place
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0 }}>
                      New Delhi, 110001 · +91 98765 43210
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setToastMessage("Address selector modal opened.")}
                    style={{ background: "transparent", border: "none", color: "#078B87", fontWeight: 750, fontSize: "0.85rem", cursor: "pointer" }}
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* 3. Payment Methods matching reference data */}
              <div className="chk-card">
                <h2 className="chk-card-title">
                  <CreditCard size={20} color="#078B87" />
                  <span>Payment Method</span>
                </h2>

                <div className="chk-payment-list">
                  {/* Option 1: UPI */}
                  <div
                    onClick={() => setSelectedMethod("upi")}
                    className={`chk-pay-option ${selectedMethod === "upi" ? "selected" : ""}`}
                  >
                    <div className="chk-pay-left">
                      <div className="chk-pay-icon-box">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 className="chk-pay-title">UPI Apps</h4>
                        <p className="chk-pay-sub">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "upi" && <div className="chk-radio-dot" />}
                    </div>
                  </div>

                  {/* Option 2: Cards */}
                  <div
                    onClick={() => setSelectedMethod("card")}
                    className={`chk-pay-option ${selectedMethod === "card" ? "selected" : ""}`}
                  >
                    <div className="chk-pay-left">
                      <div className="chk-pay-icon-box">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <h4 className="chk-pay-title">Credit / Debit Card</h4>
                        <p className="chk-pay-sub">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "card" && <div className="chk-radio-dot" />}
                    </div>
                  </div>

                  {/* Option 3: Net Banking */}
                  <div
                    onClick={() => setSelectedMethod("netbanking")}
                    className={`chk-pay-option ${selectedMethod === "netbanking" ? "selected" : ""}`}
                  >
                    <div className="chk-pay-left">
                      <div className="chk-pay-icon-box">
                        <Building size={20} />
                      </div>
                      <div>
                        <h4 className="chk-pay-title">Net Banking</h4>
                        <p className="chk-pay-sub">All major Indian banks supported</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "netbanking" && <div className="chk-radio-dot" />}
                    </div>
                  </div>

                  {/* Option 4: Escrow Wallet */}
                  <div
                    onClick={() => setSelectedMethod("wallet")}
                    className={`chk-pay-option ${selectedMethod === "wallet" ? "selected" : ""}`}
                  >
                    <div className="chk-pay-left">
                      <div className="chk-pay-icon-box">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <h4 className="chk-pay-title">Sui Dhāga Escrow Wallet</h4>
                        <p className="chk-pay-sub">Instant release with 100% buyer protection</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "wallet" && <div className="chk-radio-dot" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Price Details & Escrow Guarantee) */}
            <div className="chk-right-col">
              <div className="chk-price-card">
                <h2 className="chk-card-title" style={{ margin: 0 }}>
                  Price Details
                </h2>

                {/* Promo Code Form */}
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Have a Promo Code?
                  </label>
                  <form onSubmit={handleApplyCoupon} className="chk-coupon-wrap">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="chk-coupon-input"
                    />
                    <button type="submit" className="chk-btn-apply">
                      Apply
                    </button>
                  </form>
                  {couponApplied && (
                    <span style={{ fontSize: "0.78rem", color: "#15803D", fontWeight: 700, display: "inline-block", marginTop: "4px" }}>
                      ✓ FIRSTSTITCH applied (₹1,250 OFF)
                    </span>
                  )}
                </div>

                {/* Itemized breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                  <div className="chk-price-row">
                    <span>Stitching &amp; Bespoke Tailoring</span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="chk-price-row">
                    <span>Doorstep Fitting &amp; Delivery</span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>₹{deliveryFee}</span>
                  </div>

                  <div className="chk-price-row">
                    <span>Platform Escrow Protection Fee</span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>₹{platformFee}</span>
                  </div>

                  {couponApplied && (
                    <div className="chk-price-row" style={{ color: "#15803D" }}>
                      <span>Promo Discount</span>
                      <span style={{ fontWeight: 750 }}>-₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="chk-price-total-row">
                    <span>Total (Incl. Taxes)</span>
                    <span style={{ color: "#078B87", fontSize: "1.35rem" }}>
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="chk-btn-pay"
                >
                  <Lock size={18} />
                  <span>Pay ₹{totalAmount.toLocaleString("en-IN")} &amp; Place Order</span>
                </button>

                {/* Escrow Guarantee Badge */}
                <div className="chk-escrow-badge">
                  <ShieldCheck size={24} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>100% Escrow Protection:</strong> Funds are only released to the tailor after your trial fitting and delivery confirmation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Success Modal */}
      {isSuccessOpen && (
        <div className="chk-modal-backdrop">
          <div className="chk-success-card">
            <div className="chk-success-icon-circle">
              <CheckCircle2 size={46} strokeWidth={2.5} />
            </div>

            <h2 style={{ fontSize: "1.7rem", fontWeight: 900, color: "#111827", margin: "0 0 8px" }}>
              Order Placed Successfully!
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6B7280", margin: "0 0 24px", lineHeight: 1.5 }}>
              Thank you! Your custom order has been placed with <strong>Rekha Tailors</strong>. A confirmation email and SMS receipt have been sent.
            </p>

            <div style={{ background: "#FAF8F5", border: "1px solid #EAE6DF", borderRadius: "14px", padding: "16px 24px", width: "100%", marginBottom: "24px" }}>
              <span style={{ fontSize: "0.78rem", color: "#6B7280", fontWeight: 650 }}>Order Tracking ID</span>
              <p style={{ fontSize: "1.25rem", fontWeight: 900, color: "#078B87", margin: "2px 0 0", fontFamily: "monospace" }}>
                #ORD123456
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
              <Link
                href="/tailor/orders"
                style={{
                  background: "#078B87",
                  color: "#FFFFFF",
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
              >
                <span>Track Order Milestones</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/tailors"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  color: "#374151",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: 750,
                  fontSize: "0.9rem",
                  textDecoration: "none"
                }}
              >
                Continue Exploring
              </Link>
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
