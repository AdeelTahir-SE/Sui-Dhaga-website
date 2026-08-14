"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Scissors,
  CheckCircle2,
  Truck,
  PackageCheck,
  Star,
  MapPin,
  MessageSquare,
  Download,
  HelpCircle,
  ChevronRight,
  Headphones,
  Check,
  Clock,
  ShieldCheck,
  X,
  Eye,
  Sparkles
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { fetchOrderByIdApi, initialOrdersData, OrderItem } from "@/lib/orders-data";

interface TrackingStep {
  id: string;
  name: string;
  date: string;
  icon: React.ReactNode;
  status: "completed" | "current" | "pending";
}

export function OrderDetailPage({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isItemDetailsModalOpen, setIsItemDetailsModalOpen] = useState<boolean>(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;

    fetchOrderByIdApi(orderId).then((data) => {
      if (isSubscribed) {
        setOrder(data || initialOrdersData[0]);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [orderId]);

  const currentOrder = order || initialOrdersData[0];

  // Calculate pricing
  const itemPrice = currentOrder.amountValue || 2000;
  const shippingFee = 0;
  const platformFee = 100;
  const totalAmount = itemPrice + shippingFee + platformFee;

  // 7 Step Workflow matching screenshot
  const trackingSteps: TrackingStep[] = [
    {
      id: "step-1",
      name: "Order Placed",
      date: "20 May",
      icon: <Package size={16} />,
      status: "completed"
    },
    {
      id: "step-2",
      name: "Fabric Confirmed",
      date: "21 May",
      icon: <Layers size={16} />,
      status: "completed"
    },
    {
      id: "step-3",
      name: "Cutting",
      date: "22 May",
      icon: <Scissors size={16} />,
      status: "completed"
    },
    {
      id: "step-4",
      name: "Stitching",
      date: "23 May",
      icon: <Sparkles size={16} />,
      status: currentOrder.status === "In Progress" || currentOrder.status === "Processing" ? "current" : currentOrder.status === "Delivered" ? "completed" : "pending"
    },
    {
      id: "step-5",
      name: "Quality Check",
      date: "25 May",
      icon: <ShieldCheck size={16} />,
      status: currentOrder.status === "Delivered" ? "completed" : "pending"
    },
    {
      id: "step-6",
      name: "Out for Delivery",
      date: "26 May",
      icon: <Truck size={16} />,
      status: currentOrder.status === "Delivered" ? "completed" : "pending"
    },
    {
      id: "step-7",
      name: "Delivered",
      date: "27 May",
      icon: <PackageCheck size={16} />,
      status: currentOrder.status === "Delivered" ? "completed" : "pending"
    }
  ];

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <PublicShell>
      <div className="order-detail-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="order-detail-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="order-detail-container">
          {/* Breadcrumb Navigation */}
          <nav className="order-breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="crumb-link">
              Home
            </Link>
            <ChevronRight size={14} className="crumb-sep" />
            <Link href="/customer/orders" className="crumb-link">
              Orders
            </Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span className="crumb-current">Order Details</span>
          </nav>

          {/* Top Order Header Row */}
          <div className="order-header-banner">
            <div className="order-title-meta-block">
              <div className="order-heading-badge-row">
                <h1 className="order-main-title">{currentOrder.orderNumber}</h1>
                <span
                  className={`order-status-pill ${
                    currentOrder.status === "Delivered"
                      ? "delivered"
                      : currentOrder.status === "Cancelled"
                      ? "cancelled"
                      : "in-progress"
                  }`}
                >
                  <span className="status-dot" />
                  {currentOrder.status}
                </span>
              </div>

              <p className="order-dates-meta">
                Placed on {currentOrder.placedDate} &nbsp;•&nbsp; Estimated delivery: {currentOrder.estimatedDelivery}
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="order-top-actions">
              <button
                type="button"
                onClick={handleDownloadInvoice}
                className="order-action-btn invoice-btn"
              >
                <Download size={15} />
                <span>Download Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSupportModalOpen(true)}
                className="order-action-btn help-btn"
              >
                <Headphones size={15} />
                <span>Need Help?</span>
              </button>
            </div>
          </div>

          {/* Horizontal Tracking Timeline Stepper */}
          <section className="order-timeline-card" aria-label="Order Tracking Timeline">
            <div className="stepper-track-line" />
            <div className="stepper-steps-wrapper">
              {trackingSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`stepper-step-item ${step.status}`}
                >
                  <div className="step-circle-icon">
                    {step.status === "completed" ? (
                      <Check size={16} />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="step-title-text">{step.name}</span>
                  <span className="step-date-text">{step.date}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3-Column Main Grid: Order Items, Tailor Info, Payment Summary */}
          <div className="order-main-cards-grid">
            {/* Card 1: Order Items */}
            <section className="order-panel-card items-panel" aria-labelledby="order-items-heading">
              <h2 id="order-items-heading" className="panel-card-title">
                Order Items
              </h2>

              <div className="order-item-detail-row">
                <div className="item-garment-thumb">
                  <img
                    src={currentOrder.garmentImage}
                    alt={currentOrder.itemTitle}
                    className="item-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/booking/ref-gold-anarkali.jpg";
                    }}
                  />
                </div>

                <div className="item-meta-details">
                  <div className="item-title-row">
                    <h3 className="item-name">{currentOrder.serviceCategory || currentOrder.itemTitle}</h3>
                    <ChevronRight size={16} className="item-arrow-icon" />
                  </div>

                  <div className="item-specs-list">
                    <span className="spec-line">Size: {currentOrder.size || "M"}</span>
                    <span className="spec-line">Color: {currentOrder.color || "Light Pink"}</span>
                    <span className="spec-line">Qty: 1</span>
                  </div>

                  <span className="item-price-tag">{currentOrder.amount}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsItemDetailsModalOpen(true)}
                className="view-item-details-btn"
              >
                View Details
              </button>
            </section>

            {/* Card 2: Tailor Information */}
            <section className="order-panel-card tailor-panel" aria-labelledby="tailor-info-heading">
              <h2 id="tailor-info-heading" className="panel-card-title">
                Tailor Information
              </h2>

              <div className="tailor-content-body">
                <div className="tailor-profile-flex">
                  <div className="tailor-photo-frame">
                    <img
                      src={currentOrder.tailorAvatar}
                      alt={currentOrder.tailorName}
                      className="tailor-photo-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/home/tailor-rekha.png";
                      }}
                    />
                  </div>

                  <div className="tailor-text-info">
                    <h3 className="tailor-title-name">{currentOrder.tailorName}</h3>
                    <div className="tailor-stars-row">
                      <Star size={13} fill="#F7B915" color="#F7B915" />
                      <strong>{currentOrder.tailorRating}</strong>
                      <span className="reviews-count">({currentOrder.tailorReviewsCount} reviews)</span>
                    </div>
                    <div className="tailor-loc-row">
                      <MapPin size={12} className="loc-pin" />
                      <span>0.6 km away</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/messages/${currentOrder.tailorId}`}
                  className="message-tailor-full-btn"
                >
                  <MessageSquare size={16} />
                  <span>Message</span>
                </Link>
              </div>
            </section>

            {/* Card 3: Payment Summary */}
            <section className="order-panel-card payment-panel" aria-labelledby="payment-summary-heading">
              <h2 id="payment-summary-heading" className="panel-card-title">
                Payment Summary
              </h2>

              <div className="payment-breakdown-list">
                <div className="pay-row">
                  <span className="pay-label">Item Total</span>
                  <span className="pay-value font-semibold">₹{itemPrice.toLocaleString()}</span>
                </div>

                <div className="pay-row">
                  <span className="pay-label">Shipping Charges</span>
                  <span className="pay-value font-semibold text-green">₹0</span>
                </div>

                <div className="pay-row">
                  <span className="pay-label">Platform Fee</span>
                  <span className="pay-value font-semibold">₹{platformFee}</span>
                </div>

                <div className="pay-row total-row">
                  <span className="pay-label font-bold">Total Amount</span>
                  <span className="pay-value total-val">₹{totalAmount.toLocaleString()}</span>
                </div>

                <div className="pay-status-footer">
                  <span className="pay-method-text">Paid via UPI</span>
                  <span className="pay-status-pill">Paid</span>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Support CTA Banner */}
          <div className="order-support-banner">
            <span className="support-banner-text">Need help with your order?</span>
            <Link href="/contact" className="order-contact-support-btn">
              Contact Support
            </Link>
          </div>
        </div>

        {/* --------------------------------------------------------------------------
           MODAL 1: ITEM & SPECIFICATIONS DETAILS
           -------------------------------------------------------------------------- */}
        {isItemDetailsModalOpen && (
          <div className="order-modal-overlay" onClick={() => setIsItemDetailsModalOpen(false)}>
            <div className="order-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">Garment Specifications</h2>
                <button
                  type="button"
                  onClick={() => setIsItemDetailsModalOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                <div className="spec-modal-header">
                  <img
                    src={currentOrder.garmentImage}
                    alt={currentOrder.itemTitle}
                    className="spec-thumb-img"
                  />
                  <div>
                    <h3 className="spec-item-name">{currentOrder.itemTitle}</h3>
                    <span className="spec-item-tailor">Stitched by {currentOrder.tailorName}</span>
                  </div>
                </div>

                <div className="spec-kv-grid">
                  <div className="spec-box">
                    <span className="spec-label">Fabric</span>
                    <span className="spec-val">{currentOrder.fabric || "Raw Silk & Chiffon"}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Color</span>
                    <span className="spec-val">{currentOrder.color || "Light Pink"}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Size</span>
                    <span className="spec-val">{currentOrder.size || "Custom Fit (M)"}</span>
                  </div>
                  <div className="spec-box">
                    <span className="spec-label">Work Type</span>
                    <span className="spec-val">{currentOrder.work || "Zari & Sequin Embroidery"}</span>
                  </div>
                </div>

                {currentOrder.notes && (
                  <div className="spec-notes-box">
                    <span className="spec-label">Customization Notes</span>
                    <p className="spec-notes-text">{currentOrder.notes}</p>
                  </div>
                )}

                {currentOrder.referenceImages && currentOrder.referenceImages.length > 0 && (
                  <div className="spec-ref-box">
                    <span className="spec-label">Reference Attachments</span>
                    <div className="spec-ref-gallery">
                      {currentOrder.referenceImages.map((img, i) => (
                        <div key={i} className="spec-ref-thumb">
                          <img src={img} alt={`Ref ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer-row">
                <button
                  type="button"
                  onClick={() => setIsItemDetailsModalOpen(false)}
                  className="modal-done-btn"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
           MODAL 2: NEED HELP / SUPPORT
           -------------------------------------------------------------------------- */}
        {isSupportModalOpen && (
          <div className="order-modal-overlay" onClick={() => setIsSupportModalOpen(false)}>
            <div className="order-modal-card support-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">Need Help with Order {currentOrder.orderNumber}?</h2>
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                <p className="support-intro-text">
                  How would you like us to assist you today?
                </p>

                <div className="support-options-list">
                  <Link
                    href={`/messages/${currentOrder.tailorId}`}
                    className="support-option-item"
                  >
                    <MessageSquare className="support-opt-icon" size={20} />
                    <div>
                      <strong className="support-opt-title">Message Tailor Directly</strong>
                      <span className="support-opt-desc">Ask about alteration adjustments or fitting questions.</span>
                    </div>
                  </Link>

                  <Link href="/contact" className="support-option-item">
                    <Headphones className="support-opt-icon" size={20} />
                    <div>
                      <strong className="support-opt-title">Sui Dhāga Customer Support</strong>
                      <span className="support-opt-desc">Get assistance with delivery, payments, or disputes.</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="modal-footer-row">
                <button
                  type="button"
                  onClick={() => setIsSupportModalOpen(false)}
                  className="modal-done-btn"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Level Transparent Corner Motifs */}
        <div className="order-detail-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="order-detail-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
