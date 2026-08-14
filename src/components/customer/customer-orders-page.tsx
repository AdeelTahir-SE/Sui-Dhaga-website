"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Ruler,
  FolderHeart,
  Heart,
  Users,
  MessageSquare,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Search,
  Filter
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  fetchCustomerOrdersApi,
  initialOrdersData,
  OrderItem
} from "@/lib/orders-data";

type OrderTabType = "All" | "Processing" | "In Progress" | "Delivered" | "Cancelled";

export function CustomerOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderTabType>("All");
  const [allOrders, setAllOrders] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    fetchCustomerOrdersApi("All").then((data) => {
      if (isSubscribed) {
        setAllOrders(data);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Counts for tabs
  const allCount = allOrders.length;
  const processingCount = allOrders.filter((o) => o.status === "Processing").length;
  const inProgressCount = allOrders.filter((o) => o.status === "In Progress").length;
  const deliveredCount = allOrders.filter((o) => o.status === "Delivered").length;
  const cancelledCount = allOrders.filter((o) => o.status === "Cancelled").length;

  const filteredOrders = allOrders.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesSearch =
      searchQuery === "" ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.tailorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <PublicShell>
      <div className="customer-orders-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="orders-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="orders-container">
          {/* Main 2-Column Layout Grid: Reused Community Sidebar + Orders Content */}
          <div className="orders-layout-grid">
            {/* 1. Left Customer Navigation Sidebar (Reused Community Sidebar) */}
            <aside className="customer-sidebar-nav">
              <nav className="sidebar-menu-list">
                <Link href="/customer/dashboard" className="sidebar-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <Link href="/customer/appointments" className="sidebar-item">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>

                {/* Active Orders Tab */}
                <Link href="/customer/orders" className="sidebar-item active">
                  <Package size={18} />
                  <span>Orders</span>
                </Link>

                <Link href="/customer/measurements" className="sidebar-item">
                  <Ruler size={18} />
                  <span>Measurements</span>
                </Link>

                <Link href="/customer/saved-designs" className="sidebar-item">
                  <FolderHeart size={18} />
                  <span>Saved Designs</span>
                </Link>

                <Link href="/customer/wishlist" className="sidebar-item">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>

                <Link href="/community" className="sidebar-item">
                  <Users size={18} />
                  <span>Community</span>
                </Link>

                <Link href="/messages" className="sidebar-item">
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </Link>

                <Link href="/customer/addresses" className="sidebar-item">
                  <MapPin size={18} />
                  <span>Addresses</span>
                </Link>

                <Link href="/customer/payments" className="sidebar-item">
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                </Link>

                <Link href="/notifications" className="sidebar-item">
                  <Bell size={18} />
                  <span>Notifications</span>
                </Link>

                <Link href="/customer/settings" className="sidebar-item">
                  <Settings size={18} />
                  <span>Account Settings</span>
                </Link>

                <Link href="/auth/login" className="sidebar-item logout-btn">
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </nav>
            </aside>

            {/* 2. Main Orders Content Area */}
            <main className="orders-main-content">
              {/* Header Title Row */}
              <div className="orders-header-row">
                <div className="header-title-block">
                  <h1 className="orders-page-title">My Orders</h1>
                  <p className="orders-page-subtitle">
                    Track and manage all your orders.
                  </p>
                </div>
              </div>

              {/* Segmented Filter Tabs */}
              <div className="orders-tabs-bar" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "All"}
                  onClick={() => setActiveTab("All")}
                  className={`tab-btn ${activeTab === "All" ? "active" : ""}`}
                >
                  All Orders ({allCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Processing"}
                  onClick={() => setActiveTab("Processing")}
                  className={`tab-btn ${activeTab === "Processing" ? "active" : ""}`}
                >
                  Processing ({processingCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "In Progress"}
                  onClick={() => setActiveTab("In Progress")}
                  className={`tab-btn ${activeTab === "In Progress" ? "active" : ""}`}
                >
                  In Progress ({inProgressCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Delivered"}
                  onClick={() => setActiveTab("Delivered")}
                  className={`tab-btn ${activeTab === "Delivered" ? "active" : ""}`}
                >
                  Delivered ({deliveredCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Cancelled"}
                  onClick={() => setActiveTab("Cancelled")}
                  className={`tab-btn ${activeTab === "Cancelled" ? "active" : ""}`}
                >
                  Cancelled ({cancelledCount})
                </button>
              </div>

              {/* Orders List Cards */}
              <div className="orders-cards-list">
                {filteredOrders.length === 0 ? (
                  <div className="empty-orders-card">
                    <ShoppingBag size={48} className="empty-icon" />
                    <h3 className="empty-title">No orders found</h3>
                    <p className="empty-subtitle">
                      {activeTab === "All"
                        ? "You haven't placed any custom tailoring orders yet."
                        : `No orders currently matching "${activeTab}".`}
                    </p>
                    <Link href="/tailors" className="empty-browse-cta">
                      Explore Verified Tailors
                    </Link>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <article key={order.id} className="order-item-card">
                      {/* Garment Image Thumbnail */}
                      <div className="order-thumb-box">
                        <img
                          src={order.garmentImage}
                          alt={order.itemTitle}
                          className="order-thumb-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/booking/ref-gold-anarkali.jpg";
                          }}
                        />
                      </div>

                      {/* Order ID & Tailor Name */}
                      <div className="order-col-info">
                        <strong className="order-id-title">{order.orderNumber}</strong>
                        <span className="order-tailor-name">{order.tailorName}</span>
                      </div>

                      {/* Service / Garment Type */}
                      <div className="order-col-service">
                        <span className="order-service-title">{order.itemTitle}</span>
                      </div>

                      {/* Placed Date */}
                      <div className="order-col-date">
                        <span className="order-date-text">{order.placedDate}</span>
                      </div>

                      {/* Price Amount */}
                      <div className="order-col-amount">
                        <span className="order-amount-text">{order.amount}</span>
                      </div>

                      {/* Status Pill Badge */}
                      <div className="order-col-status">
                        <span
                          className={`order-status-pill ${
                            order.status === "Delivered"
                              ? "delivered"
                              : order.status === "Cancelled"
                              ? "cancelled"
                              : order.status === "Processing"
                              ? "processing"
                              : "in-progress"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Action Button: View Details */}
                      <div className="order-col-action">
                        <Link
                          href={`/customer/orders/${order.id}`}
                          className="order-view-details-btn"
                        >
                          View Details
                        </Link>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </main>
          </div>
        </div>

        {/* Page Level Transparent Corner Motifs */}
        <div className="orders-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="orders-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
