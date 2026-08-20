"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  Clock,
  Scissors,
  Check,
  X,
  User,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-order-detail-view.css";

export function TailorOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const rawOrderId = (params?.orderId as string) || "SD1256";
  const orderId = rawOrderId.startsWith("SD") ? rawOrderId : `SD${rawOrderId}`;

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Order Detail State matching reference design
  const [order, setOrder] = useState({
    orderNumber: orderId,
    status: "In Progress",
    placedDate: "10 May 2024",
    deliveryDate: "20 May 2024",
    customer: {
      name: "Neha Verma",
      email: "neha.verma@email.com",
      phone: "+91 98765-43210",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"
    },
    item: {
      title: "Custom Anarkali Suit",
      price: 2000,
      fabric: "Georgette",
      color: "Pastel Green",
      size: "M",
      qty: 1,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
    },
    measurements: {
      chest: "36 in",
      waist: "28 in",
      hips: "38 in",
      shoulder: "14.5 in",
      sleeves: "22 in",
      length: "52 in"
    },
    designReferences: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
    ],
    payment: {
      itemTotal: 2000,
      shippingCharges: 100,
      platformFee: 100,
      totalAmount: 2200,
      status: "Paid"
    },
    timeline: [
      { step: "Order Placed", time: "10 May 2024, 10:30 AM", completed: true },
      { step: "Fabric Confirmed", time: "11 May 2024, 12:00 PM", completed: true },
      { step: "In Progress", time: "12 May 2024, 03:00 AM", completed: true },
      { step: "Ready for Trial", time: "-", completed: false },
      { step: "Delivered", time: "-", completed: false }
    ]
  });

  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [trialTime, setTrialTime] = useState("18 May 2024, 04:00 PM");

  // Hydrate order details if matching order found
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("sui_dhaga_tailor_orders_list");
        const list = saved ? JSON.parse(saved) : [];
        const match = list.find(
          (o: any) =>
            o.orderNumber?.replace("#", "").toLowerCase() === orderId.toLowerCase() ||
            o.id?.toLowerCase() === orderId.toLowerCase()
        );
        if (match) {
          setOrder((prev) => ({
            ...prev,
            orderNumber: match.orderNumber?.replace("#", "") || orderId,
            status: match.status === "in_progress" ? "In Progress" : match.status === "new" ? "New" : match.status === "completed" ? "Completed" : "In Progress",
            placedDate: match.date || prev.placedDate,
            deliveryDate: match.expectedDelivery || prev.deliveryDate,
            customer: {
              name: match.customerName || prev.customer.name,
              email: match.customerEmail || prev.customer.email,
              phone: match.customerPhone || prev.customer.phone,
              avatar: match.customerAvatar || prev.customer.avatar
            },
            item: {
              ...prev.item,
              title: match.itemTitle || prev.item.title,
              price: match.amount || prev.item.price,
              fabric: match.fabricDetails || prev.item.fabric
            },
            payment: {
              ...prev.payment,
              itemTotal: match.amount || prev.payment.itemTotal,
              totalAmount: (match.amount || 2000) + 200
            }
          }));
          setSelectedStatus(match.status === "in_progress" ? "In Progress" : match.status === "new" ? "New" : match.status === "completed" ? "Completed" : "In Progress");
        }
      } catch (e) {
        console.warn("Failed to hydrate tailor order details:", e);
      }
    }
  }, [orderId]);

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTimeline = order.timeline.map((t) => {
      if (t.step === "Ready for Trial" && selectedStatus === "Ready for Trial") {
        return { ...t, completed: true, time: trialTime };
      }
      if (t.step === "Delivered" && selectedStatus === "Delivered") {
        return { ...t, completed: true, time: "20 May 2024, 02:30 PM" };
      }
      return t;
    });

    setOrder({
      ...order,
      status: selectedStatus,
      timeline: updatedTimeline
    });

    setIsUpdateModalOpen(false);
    setToastMessage(`✓ Order #${order.orderNumber} status updated to "${selectedStatus}".`);
  };

  return (
    <>
      <PublicNav />

      <div className="tod-container">
        <div className="tod-inner">
          {/* Breadcrumb matching exact design */}
          <div className="tod-breadcrumb">
            <Link href="/tailor/orders">Orders</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#111827", fontWeight: 650 }}>Order #{order.orderNumber}</span>
          </div>

          {/* Page Header */}
          <div className="tod-page-header">
            <div className="tod-title-row">
              <h1 className="tod-title">Order #{order.orderNumber}</h1>
              <span className="tod-status-pill">
                ● {order.status}
              </span>
            </div>
            <p className="tod-subtitle">
              Placed on {order.placedDate} &nbsp;•&nbsp; Delivery by {order.deliveryDate}
            </p>
          </div>

          {/* 2-Column Main Grid */}
          <div className="tod-grid">
            {/* =========================================================================
                LEFT COLUMN (Customer Info, Order Items & Specs, Design References)
                ========================================================================= */}
            <div className="tod-col">
              {/* 1. Customer Information Card */}
              <div className="tod-card">
                <h2 className="tod-card-title">Customer Information</h2>
                <div className="tod-customer-wrap">
                  <img
                    src={order.customer.avatar}
                    alt={order.customer.name}
                    className="tod-customer-avatar"
                  />
                  <div className="tod-customer-details">
                    <h3 className="tod-customer-name">{order.customer.name}</h3>
                    <p className="tod-customer-email">{order.customer.email}</p>
                    <p className="tod-customer-phone">{order.customer.phone}</p>
                    <Link href="/tailor/profile" className="tod-view-profile-link">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>

              {/* 2. Order Items & Measurements Card */}
              <div className="tod-card">
                <h2 className="tod-card-title">Order Items</h2>

                <div className="tod-item-row">
                  <img
                    src={order.item.image}
                    alt={order.item.title}
                    className="tod-item-thumb"
                  />
                  <div className="tod-item-info">
                    <div className="tod-item-header">
                      <h3 className="tod-item-title">{order.item.title}</h3>
                      <span className="tod-item-price">
                        ₹{order.item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="tod-item-spec">
                      <strong>Fabric: </strong>{order.item.fabric}
                    </p>
                    <p className="tod-item-spec">
                      <strong>Color: </strong>{order.item.color}
                    </p>
                    <p className="tod-item-spec">
                      <strong>Size: </strong>{order.item.size}
                    </p>
                    <p className="tod-item-spec">
                      <strong>Qty: </strong>{order.item.qty}
                    </p>
                  </div>
                </div>

                {/* Custom Body Measurements Sub-grid */}
                <div>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 750, color: "#374151", margin: "0 0 10px" }}>
                    Customer 3D Measurements
                  </h4>
                  <div className="tod-measurements-grid">
                    <div className="tod-m-item">
                      <span className="tod-m-label">Chest / Bust</span>
                      <span className="tod-m-val">{order.measurements.chest}</span>
                    </div>
                    <div className="tod-m-item">
                      <span className="tod-m-label">Waist</span>
                      <span className="tod-m-val">{order.measurements.waist}</span>
                    </div>
                    <div className="tod-m-item">
                      <span className="tod-m-label">Hips</span>
                      <span className="tod-m-val">{order.measurements.hips}</span>
                    </div>
                    <div className="tod-m-item">
                      <span className="tod-m-label">Shoulder</span>
                      <span className="tod-m-val">{order.measurements.shoulder}</span>
                    </div>
                    <div className="tod-m-item">
                      <span className="tod-m-label">Sleeves</span>
                      <span className="tod-m-val">{order.measurements.sleeves}</span>
                    </div>
                    <div className="tod-m-item">
                      <span className="tod-m-label">Full Length</span>
                      <span className="tod-m-val">{order.measurements.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Design Reference Card */}
              <div className="tod-card">
                <h2 className="tod-card-title">Design Reference</h2>
                <div className="tod-gallery-grid">
                  {order.designReferences.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Reference Angle ${idx + 1}`}
                      className="tod-gallery-thumb"
                      onClick={() => setToastMessage("Full-resolution angle inspected.")}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* =========================================================================
                RIGHT COLUMN (Payment Summary, Tracking Timeline, Action Buttons)
                ========================================================================= */}
            <div className="tod-col">
              {/* 1. Payment Summary Card */}
              <div className="tod-card">
                <h2 className="tod-card-title">Payment Summary</h2>

                <div className="tod-pay-row">
                  <span>Item Total</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>
                    ₹{order.payment.itemTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="tod-pay-row">
                  <span>Shipping Charges</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>
                    ₹{order.payment.shippingCharges.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="tod-pay-row">
                  <span>Platform Fee</span>
                  <span style={{ fontWeight: 700, color: "#111827" }}>
                    ₹{order.payment.platformFee.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="tod-pay-row-total">
                  <span>Total Amount</span>
                  <span>₹{order.payment.totalAmount.toLocaleString("en-IN")}</span>
                </div>

                <div className="tod-pay-status-row">
                  <span className="tod-paid-badge">Paid</span>
                  <span className="tod-paid-amount">
                    ₹{order.payment.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* 2. Tracking Timeline Card */}
              <div className="tod-card">
                <h2 className="tod-card-title">Tracking Timeline</h2>

                <div className="tod-timeline">
                  {order.timeline.map((item, idx) => (
                    <div key={idx} className="tod-timeline-item">
                      <div className={`tod-timeline-icon ${item.completed ? "completed" : "pending"}`}>
                        {item.completed ? <Check size={14} strokeWidth={3} /> : "○"}
                      </div>
                      <div className="tod-timeline-content">
                        <span className="tod-timeline-title">{item.step}</span>
                        <span className="tod-timeline-time">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Action Buttons Row */}
              <div className="tod-actions-row">
                <Link href="/tailor/messages" className="tod-btn-primary">
                  <MessageSquare size={16} />
                  <span>Message Customer</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="tod-btn-primary"
                >
                  <CheckCircle2 size={16} />
                  <span>Update Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Update Status Milestone Modal */}
        {isUpdateModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              zIndex: 100000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={() => setIsUpdateModalOpen(false)}
          >
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "500px",
                padding: "26px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                  Update Milestone Status
                </h3>
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateStatusSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                      Current Production Stage
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "10px",
                        fontSize: "0.92rem",
                        background: "#FFFFFF",
                        fontWeight: 650
                      }}
                    >
                      <option value="In Progress">In Progress (Cutting & Stitching)</option>
                      <option value="Ready for Trial">Ready for Trial / Fitting</option>
                      <option value="Delivered">Delivered & Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {selectedStatus === "Ready for Trial" && (
                    <div>
                      <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                        Trial Fitting Date & Time
                      </label>
                      <input
                        type="text"
                        value={trialTime}
                        onChange={(e) => setTrialTime(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          border: "1px solid #D1D5DB",
                          borderRadius: "10px",
                          fontSize: "0.92rem"
                        }}
                      />
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setIsUpdateModalOpen(false)}
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
                      <span>Confirm Update</span>
                    </button>
                  </div>
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
