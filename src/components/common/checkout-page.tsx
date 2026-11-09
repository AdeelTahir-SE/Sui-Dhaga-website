"use client";

import React, { useState, useEffect } from "react";
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
  Scissors,
  X,
  Phone,
  User,
  LayoutDashboard
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { AdminToast } from "@/components/admin/admin-toast";
import { orderService } from "@/lib/api/order-service";
import { userService } from "@/lib/api/user-service";
import "@/styles/pages/checkout-view.css";

export function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<"wallet" | "card" | "netbanking" | "upi">("wallet");
  const [couponCode, setCouponCode] = useState("FIRSTSTITCH");
  const [couponApplied, setCouponApplied] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string>("SD1256");

  // Dynamic user shipping state
  const [recipientName, setRecipientName] = useState("Ayesha Khan");
  const [recipientStreet, setRecipientStreet] = useState("House 42, Street 8, Block B, People's Colony No. 1");
  const [recipientCity, setRecipientCity] = useState("Faisalabad");
  const [recipientPhone, setRecipientPhone] = useState("+92 300 9876543");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Load user data on mount
  useEffect(() => {
    let isSubscribed = true;

    // Check localStorage first
    if (typeof window !== "undefined") {
      try {
        const rawUser = localStorage.getItem("sui_dhaga_user");
        if (rawUser) {
          const u = JSON.parse(rawUser);
          if (u.name || u.full_name) setRecipientName(u.name || u.full_name);
          if (u.address) setRecipientStreet(u.address);
          if (u.city) setRecipientCity(u.city);
          if (u.phone) setRecipientPhone(u.phone);
        }

        const rawAddresses = localStorage.getItem("sui_dhaga_customer_addresses");
        if (rawAddresses) {
          const addrs = JSON.parse(rawAddresses);
          const defaultAddr = addrs.find((a: any) => a.isDefault) || addrs[0];
          if (defaultAddr) {
            setRecipientName(defaultAddr.recipientName || "Ayesha Khan");
            setRecipientStreet(`${defaultAddr.street}, ${defaultAddr.area}`);
            setRecipientCity(defaultAddr.city || "Faisalabad");
            setRecipientPhone(defaultAddr.phone || "+92 300 9876543");
          }
        }
      } catch {}
    }

    // Try fetching from backend /users/me
    userService
      .getMe()
      .then((res) => {
        if (!isSubscribed) return;
        const u = res?.data;
        if (u) {
          if (u.full_name || u.name) setRecipientName(u.full_name || u.name || "");
          if (u.address) setRecipientStreet(u.address);
          if (u.city) setRecipientCity(u.city);
          if (u.phone) setRecipientPhone(u.phone);
        }
      })
      .catch(() => {});

    return () => {
      isSubscribed = false;
    };
  }, []);

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

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const orderNum = `SD${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await orderService.createOrder({
        tailorId: "rekha-tailors",
        amount: totalAmount,
        notes: `Custom Anarkali Suit · Payment Method: ${selectedMethod} · Recipient: ${recipientName} (${recipientPhone}) · Shipping Address: ${recipientStreet}, ${recipientCity}`
      });

      const newId = res?.data?.id || orderNum;
      setPlacedOrderId(newId);

      // Save order into customer local order storage for instant dashboard updates
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("sui_dhaga_customer_orders");
          const existing = raw ? JSON.parse(raw) : [];
          const newOrderRecord = {
            id: newId,
            orderNumber: `Order #${newId.startsWith("SD") ? newId : "SD" + newId.slice(-4).toUpperCase()}`,
            tailorId: "rekha-tailors",
            tailorName: "Rekha Tailors",
            tailorAvatar: "/images/home/tailor-rekha.png",
            tailorRating: 4.8,
            tailorReviewsCount: 128,
            tailorAddress: "Block B, Commercial Area, D Ground, Faisalabad",
            itemTitle: "Custom Anarkali Suit",
            serviceCategory: "Anarkali Suit",
            garmentImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80",
            placedDate: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
            estimatedDelivery: new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
            amount: `Rs. ${totalAmount.toLocaleString()}`,
            amountValue: totalAmount,
            status: "Processing",
            fabric: "Pastel Green Floral Silk & Flared Umbrella",
            timeline: [
              { title: "Order Placed & Escrow Secured", subtitle: "Just now", complete: true },
              { title: "Design Discussion & Measurements", subtitle: "Pending", complete: false },
              { title: "Fabric Cut & Stitching", subtitle: "Pending", complete: false },
              { title: "Quality Check & Fitting", subtitle: "Pending", complete: false },
              { title: "Delivered", subtitle: "Pending", complete: false }
            ]
          };
          localStorage.setItem("sui_dhaga_customer_orders", JSON.stringify([newOrderRecord, ...existing]));
        } catch {}
      }

      setIsSuccessOpen(true);
    } catch {
      // Fallback for guest demo mode
      setPlacedOrderId(orderNum);
      setIsSuccessOpen(true);
    } finally {
      setIsSubmitting(false);
    }
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
              Review your bespoke outfit specifications, select an escrow payment channel, and place your order.
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
                      <span className="chk-item-price">Rs. {subtotal.toLocaleString()}</span>
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
                      {recipientName} (Home)
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: "0 0 2px" }}>
                      {recipientStreet}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0 }}>
                      {recipientCity} · {recipientPhone}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddressModalOpen(true)}
                    style={{ background: "transparent", border: "none", color: "#078B87", fontWeight: 750, fontSize: "0.85rem", cursor: "pointer" }}
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* 3. Payment Methods matching Pakistani & Global Channels */}
              <div className="chk-card">
                <h2 className="chk-card-title">
                  <CreditCard size={20} color="#078B87" />
                  <span>Payment Method (Protected with Escrow)</span>
                </h2>

                <div className="chk-payment-list">
                  {/* Option 1: Mobile Wallets (JazzCash / EasyPaisa) */}
                  <div
                    onClick={() => setSelectedMethod("wallet")}
                    className={`chk-pay-option ${selectedMethod === "wallet" ? "selected" : ""}`}
                  >
                    <div className="chk-pay-left">
                      <div className="chk-pay-icon-box">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 className="chk-pay-title">JazzCash / EasyPaisa Mobile Wallet</h4>
                        <p className="chk-pay-sub">Fast mobile payment with OTP verification</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "wallet" && <div className="chk-radio-dot" />}
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
                        <p className="chk-pay-sub">Visa, Mastercard, PayPak, UnionPay</p>
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
                        <h4 className="chk-pay-title">Direct Bank Transfer (1Link)</h4>
                        <p className="chk-pay-sub">All major banks: HBL, Meezan, Alfalah, UBL</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "netbanking" && <div className="chk-radio-dot" />}
                    </div>
                  </div>

                  {/* Option 4: Escrow Balance */}
                  <div
                    onClick={() => setSelectedMethod("upi")}
                    className={`chk-pay-option ${selectedMethod === "upi" ? "selected" : ""}`}
                  >
                    <div className="chk-pay-left">
                      <div className="chk-pay-icon-box">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <h4 className="chk-pay-title">Sui Dhāga Escrow Wallet</h4>
                        <p className="chk-pay-sub">Instant release with 100% buyer protection guarantee</p>
                      </div>
                    </div>
                    <div className="chk-radio-circle">
                      {selectedMethod === "upi" && <div className="chk-radio-dot" />}
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
                      ✓ FIRSTSTITCH applied (Rs. 1,250 OFF)
                    </span>
                  )}
                </div>

                {/* Itemized breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
                  <div className="chk-price-row">
                    <span>Stitching &amp; Bespoke Tailoring</span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="chk-price-row">
                    <span>Doorstep Fitting &amp; Delivery</span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>Rs. {deliveryFee}</span>
                  </div>

                  <div className="chk-price-row">
                    <span>Platform Escrow Protection Fee</span>
                    <span style={{ fontWeight: 700, color: "#111827" }}>Rs. {platformFee}</span>
                  </div>

                  {couponApplied && (
                    <div className="chk-price-row" style={{ color: "#15803D" }}>
                      <span>Promo Discount</span>
                      <span style={{ fontWeight: 750 }}>-Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="chk-price-total-row">
                    <span>Total (Incl. Taxes)</span>
                    <span style={{ color: "#078B87", fontSize: "1.35rem" }}>
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="chk-btn-pay"
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  <Lock size={18} />
                  <span>{isSubmitting ? "Securing Order..." : `Pay Rs. ${totalAmount.toLocaleString()} & Place Order`}</span>
                </button>

                {/* Escrow Guarantee Badge */}
                <div className="chk-escrow-badge">
                  <ShieldCheck size={24} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>100% Escrow Protection:</strong> Funds are safely held in trust and only released to the tailor after your trial fitting and delivery confirmation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Edit Modal */}
      {isAddressModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setIsAddressModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "480px",
              padding: "26px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 750, color: "#1e293b", margin: 0 }}>
                Delivery Address
              </h3>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 650, color: "#374151", display: "block", marginBottom: "5px" }}>
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: 650, color: "#374151", display: "block", marginBottom: "5px" }}>
                  Street &amp; House Address
                </label>
                <input
                  type="text"
                  value={recipientStreet}
                  onChange={(e) => setRecipientStreet(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 650, color: "#374151", display: "block", marginBottom: "5px" }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 650, color: "#374151", display: "block", marginBottom: "5px" }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsAddressModalOpen(false);
                  setToastMessage("Delivery address updated for this order.");
                }}
                style={{
                  background: "#078b87",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  marginTop: "8px"
                }}
              >
                Save Delivery Address
              </button>
            </div>
          </div>
        </div>
      )}

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
              Thank you! Your custom order has been placed with <strong>Rekha Tailors</strong>. Your funds are secured in Sui Dhāga Escrow and will only be released after your trial fitting.
            </p>

            <div style={{ background: "#FAF8F5", border: "1px solid #EAE6DF", borderRadius: "14px", padding: "16px 24px", width: "100%", marginBottom: "24px" }}>
              <span style={{ fontSize: "0.78rem", color: "#6B7280", fontWeight: 650 }}>Order Tracking ID</span>
              <p style={{ fontSize: "1.25rem", fontWeight: 900, color: "#078B87", margin: "2px 0 0", fontFamily: "monospace" }}>
                #{placedOrderId.startsWith("SD") ? placedOrderId : `SD${placedOrderId.slice(-4).toUpperCase()}`}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
              <Link
                href="/customer/orders"
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
                href="/customer/dashboard"
                style={{
                  background: "#F0FDFA",
                  border: "1px solid #CCFBF1",
                  color: "#0F766E",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: 750,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
              >
                <LayoutDashboard size={16} />
                <span>Go to Customer Dashboard</span>
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
                Continue Exploring Tailors
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
