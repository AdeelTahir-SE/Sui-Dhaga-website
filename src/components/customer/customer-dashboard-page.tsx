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
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  fetchCustomerProfileApi,
  fetchDashboardStatsApi,
  fetchRecentOrdersApi,
  fetchUpcomingAppointmentsApi,
  fetchSavedDesignsApi,
  fetchRecommendedOutfitsApi,
  CustomerProfile,
  DashboardStats,
  RecentOrderSummary,
  UpcomingAppointmentSummary,
  SavedDesignSummary,
  RecommendedOutfit
} from "@/lib/customer-dashboard-data";

export function CustomerDashboardPage() {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrderSummary[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointmentSummary[]>([]);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesignSummary[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedOutfit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    Promise.all([
      fetchCustomerProfileApi(),
      fetchDashboardStatsApi(),
      fetchRecentOrdersApi(),
      fetchUpcomingAppointmentsApi(),
      fetchSavedDesignsApi(),
      fetchRecommendedOutfitsApi()
    ]).then(([profileData, statsData, ordersData, appointmentsData, designsData, recsData]) => {
      if (isSubscribed) {
        setProfile(profileData);
        setStats(statsData);
        setRecentOrders(ordersData);
        setUpcomingAppointments(appointmentsData);
        setSavedDesigns(designsData);
        setRecommendations(recsData);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const userName = profile?.name || "Ayesha Khan";

  return (
    <PublicShell>
      <div className="customer-dashboard-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="customer-dashboard-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="customer-dashboard-container">
          {/* Main 2-Column Dashboard Layout Grid: Reused Community Sidebar + Dashboard Content */}
          <div className="customer-dashboard-layout-grid">
            {/* 1. Left Customer Navigation Sidebar (Reused Community Sidebar) */}
            <aside className="customer-sidebar-nav">
              <nav className="sidebar-menu-list">
                {/* Active Dashboard Tab */}
                <Link href="/customer/dashboard" className="sidebar-item active">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <Link href="/customer/appointments" className="sidebar-item">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>

                <Link href="/customer/orders" className="sidebar-item">
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

            {/* 2. Main Dashboard Content Area */}
            <main className="customer-dashboard-main-content">
              {/* Welcome Header Banner */}
              <section className="customer-welcome-hero" aria-label="Welcome Banner">
                <div className="welcome-text-content">
                  <span className="welcome-greeting">Welcome back,</span>
                  <h1 className="customer-user-name">{userName}</h1>
                  <p className="welcome-tagline">
                    Here&apos;s what&apos;s happening with your style journey today.
                  </p>
                </div>

                <div className="welcome-illustration-banner" aria-hidden="true">
                  <img
                    src="/images/dashboard/welcome-banner.jpg"
                    alt=""
                    className="welcome-banner-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/home/ai_studio.png";
                    }}
                  />
                </div>
              </section>

              {/* Quick Overview (4 Stat Cards) */}
              <section className="dashboard-section-block" aria-labelledby="quick-overview-title">
                <h2 id="quick-overview-title" className="section-title-heading">
                  Quick Overview
                </h2>

                <div className="quick-overview-grid">
                  {/* Stat 1: Upcoming Appointments */}
                  <article className="stat-overview-card">
                    <div className="stat-card-number">
                      {stats?.upcomingAppointmentsCount ?? 3}
                    </div>
                    <div className="stat-card-label">Upcoming Appointments</div>
                    <Link href="/customer/appointments" className="stat-card-link">
                      View all
                    </Link>
                  </article>

                  {/* Stat 2: Orders in Progress */}
                  <article className="stat-overview-card">
                    <div className="stat-card-number">
                      {stats?.ordersInProgressCount ?? 2}
                    </div>
                    <div className="stat-card-label">Orders in Progress</div>
                    <Link href="/customer/orders" className="stat-card-link">
                      View all
                    </Link>
                  </article>

                  {/* Stat 3: Saved Designs */}
                  <article className="stat-overview-card">
                    <div className="stat-card-number">
                      {stats?.savedDesignsCount ?? 5}
                    </div>
                    <div className="stat-card-label">Saved Designs</div>
                    <Link href="/customer/saved-designs" className="stat-card-link">
                      View all
                    </Link>
                  </article>

                  {/* Stat 4: Measurements Saved */}
                  <article className="stat-overview-card">
                    <div className="stat-card-number">
                      {stats?.measurementsSavedCount ?? 12}
                    </div>
                    <div className="stat-card-label">Measurements Saved</div>
                    <Link href="/customer/measurements" className="stat-card-link">
                      View all
                    </Link>
                  </article>
                </div>
              </section>

              {/* Middle Section: Recent Orders & Upcoming Appointments (2 Columns) */}
              <div className="dashboard-middle-grid">
                {/* Recent Orders Panel */}
                <section className="dashboard-panel-card" aria-labelledby="recent-orders-heading">
                  <h2 id="recent-orders-heading" className="panel-card-title">
                    Recent Orders
                  </h2>

                  <div className="orders-list-wrapper">
                    {recentOrders.map((order) => (
                      <Link
                        key={order.id}
                        href={`/customer/orders/${order.id}`}
                        className="order-row-item"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="order-item-avatar">
                          <img
                            src={order.image}
                            alt={order.itemTitle}
                            className="order-avatar-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/booking/ref-gold-anarkali.jpg";
                            }}
                          />
                        </div>

                        <div className="order-info-details">
                          <span className="order-number-text">{order.orderNumber}</span>
                          <h3 className="order-item-name">{order.itemTitle}</h3>
                        </div>

                        <div className="order-status-col">
                          <span
                            className={`order-status-pill ${
                              order.status === "Delivered"
                                ? "delivered"
                                : order.status === "Out for Delivery"
                                ? "out-for-delivery"
                                : "in-progress"
                            }`}
                          >
                            <span className="status-dot" />
                            {order.status}
                          </span>
                          <ChevronRight size={16} className="row-chevron" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link href="/customer/orders" className="panel-full-btn">
                    View All Orders
                  </Link>
                </section>

                {/* Upcoming Appointments Panel */}
                <section className="dashboard-panel-card" aria-labelledby="upcoming-appointments-heading">
                  <h2 id="upcoming-appointments-heading" className="panel-card-title">
                    Upcoming Appointments
                  </h2>

                  <div className="appointments-list-wrapper">
                    {upcomingAppointments.map((apt) => (
                      <Link
                        key={apt.id}
                        href={`/customer/appointments/${apt.id}`}
                        className="appointment-row-item"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="tailor-avatar-circle">
                          <img
                            src={apt.tailorImage}
                            alt={apt.tailorName}
                            className="tailor-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/home/tailor-rekha.png";
                            }}
                          />
                        </div>

                        <div className="appointment-info-details">
                          <span className="appointment-datetime">
                            {apt.date} - {apt.time}
                          </span>
                          <h3 className="appointment-tailor-name">{apt.tailorName}</h3>
                          <span className="appointment-service-name">{apt.serviceName}</span>
                        </div>

                        <div className="appointment-status-col">
                          <span className="appointment-status-pill">
                            {apt.status}
                          </span>
                          <ChevronRight size={16} className="row-chevron" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link href="/customer/appointments" className="panel-full-btn">
                    View All Appointments
                  </Link>
                </section>
              </div>

              {/* Bottom Section: Saved Designs + Style Assistant + Recommended For You (3 Columns) */}
              <div className="dashboard-bottom-grid">
                {/* Card 1: Saved Designs */}
                <section className="dashboard-panel-card compact-card" aria-labelledby="saved-designs-heading">
                  <div className="panel-header-row">
                    <h2 id="saved-designs-heading" className="panel-card-title margin-0">
                      Saved Designs
                    </h2>
                    <Link href="/customer/saved-designs" className="header-view-link">
                      View all
                    </Link>
                  </div>

                  <div className="saved-designs-thumbnails-row">
                    {savedDesigns.slice(0, 3).map((dsg) => (
                      <div key={dsg.id} className="saved-design-thumb-card">
                        <img
                          src={dsg.image}
                          alt={dsg.title}
                          className="design-thumb-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/booking/ref-pink-kurti.jpg";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Card 2: Style Assistant */}
                <section className="dashboard-panel-card compact-card style-assistant-card" aria-labelledby="style-assistant-heading">
                  <h2 id="style-assistant-heading" className="panel-card-title">
                    Style Assistant
                  </h2>
                  <p className="assistant-copy">
                    Need help choosing the right style? Chat with our AI Style Assistant.
                  </p>

                  <Link href="/design-studio/chat" className="assistant-start-btn">
                    Start Chat
                  </Link>
                </section>

                {/* Card 3: Recommended For You */}
                <section className="dashboard-panel-card compact-card" aria-labelledby="recommended-heading">
                  <div className="panel-header-row">
                    <h2 id="recommended-heading" className="panel-card-title margin-0">
                      Recommended For You
                    </h2>
                    <Link href="/tailors" className="header-view-link">
                      View all
                    </Link>
                  </div>

                  {recommendations[0] && (
                    <div className="recommended-card-body">
                      <div className="recommended-thumb-box">
                        <img
                          src={recommendations[0].image}
                          alt={recommendations[0].title}
                          className="rec-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/booking/ref-peach-gown.jpg";
                          }}
                        />
                      </div>

                      <div className="recommended-meta-box">
                        <h3 className="rec-title">{recommendations[0].title}</h3>
                        <span className="rec-starting-label">Starting from</span>
                        <span className="rec-price-val">{recommendations[0].startingPrice}</span>

                        <Link href={`/tailors/${recommendations[0].tailorId}`} className="rec-explore-btn">
                          Explore
                        </Link>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </main>
          </div>
        </div>

        {/* Page Level Transparent Corner Motifs at the exact bottom corners of the page */}
        <div className="customer-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="customer-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
