"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Calendar,
  Clock,
  DollarSign,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Scissors
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import {
  tailorDashboardService,
  TailorDashboardData,
  initialTailorDashboardData
} from "@/lib/tailor-dashboard-data";
import "@/styles/pages/tailor-dashboard-view.css";

export function TailorDashboardPage() {
  const [data, setData] = useState<TailorDashboardData>(initialTailorDashboardData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await tailorDashboardService.getDashboardData();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch tailor dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const { tailor, overview, todayAppointments, newOrders, recentMessages, earningsSummary } = data;

  return (
    <div className="td-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="td-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="dashboard" />

        {/* Main Dashboard Body */}
        <main className="td-main-content">
          {/* Welcome Header matching reference image */}
          <div className="td-header">
            <h1 className="td-welcome-title">
              Welcome back, {tailor.name}! 👋
            </h1>
            <p className="td-welcome-sub">
              Here&apos;s what&apos;s happening with your business today.
            </p>
          </div>

          {/* 1. Overview Cards (4 Top Cards) */}
          <div className="td-overview-grid">
            {/* Card 1: New Orders */}
            <div className="td-stat-card">
              <span className="td-stat-number">{overview.newOrdersCount}</span>
              <span className="td-stat-label">New Orders</span>
              <span className="td-stat-change-positive">{overview.newOrdersChange}</span>
            </div>

            {/* Card 2: Appointments */}
            <div className="td-stat-card">
              <span className="td-stat-number">{overview.appointmentsCount}</span>
              <span className="td-stat-label">Appointments</span>
              <span className="td-stat-change-positive">{overview.appointmentsChange}</span>
            </div>

            {/* Card 3: Orders in Progress */}
            <div className="td-stat-card">
              <span className="td-stat-number">{overview.ordersInProgressCount}</span>
              <span className="td-stat-label">Orders in Progress</span>
              <Link href="/tailor/orders" className="td-stat-link">
                <span>View all</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Card 4: This Month Earnings */}
            <div className="td-stat-card">
              <span className="td-stat-number">
                ₹{overview.thisMonthEarnings.toLocaleString("en-IN")}
              </span>
              <span className="td-stat-label">This Month Earnings</span>
              <Link href="/tailor/earnings" className="td-stat-link">
                <span>View details</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* 2. Middle Row: Today's Appointments (Left) + New Orders (Right) */}
          <div className="td-middle-grid">
            {/* Left Card: Today's Appointments */}
            <div className="td-section-card">
              <div>
                <h2 className="td-card-title">Today&apos;s Appointments</h2>
                <div className="td-items-list">
                  {todayAppointments.map((apt) => (
                    <div key={apt.id} className="td-appointment-item">
                      {/* Time Badge */}
                      <div className="td-time-badge">
                        <span>{apt.time}</span>
                        <span className="td-time-badge-sub">{apt.type}</span>
                      </div>

                      {/* Garment / Client Thumbnail */}
                      <img
                        src={apt.garmentImage}
                        alt={apt.serviceName}
                        className="td-garment-thumb"
                      />

                      {/* Service & Client Details */}
                      <div className="td-item-info">
                        <p className="td-item-name">{apt.serviceName}</p>
                        <p className="td-item-sub">{apt.customerName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View all appointments link */}
              <Link href="/tailor/appointments" className="td-card-footer-link">
                <span>View all appointments</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right Card: New Orders */}
            <div className="td-section-card">
              <div>
                <h2 className="td-card-title">New Orders</h2>
                <div className="td-items-list">
                  {newOrders.map((ord) => (
                    <Link
                      key={ord.id}
                      href={`/tailor/orders/${ord.orderNumber.replace("#", "")}`}
                      className="td-order-item"
                      style={{ textDecoration: "none" }}
                    >
                      {/* Garment Image Thumbnail */}
                      <img
                        src={ord.garmentImage}
                        alt={ord.itemTitle}
                        className="td-garment-thumb"
                      />

                      {/* Order Info */}
                      <div className="td-item-info">
                        <p className="td-item-name">Order #{ord.orderNumber}</p>
                        <p className="td-item-sub">{ord.itemTitle}</p>
                      </div>

                      {/* Time Stamp */}
                      <span className="td-order-time">{ord.timeAgo}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* View all orders link */}
              <Link href="/tailor/orders" className="td-card-footer-link">
                <span>View all orders</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* 3. Bottom Row: Recent Messages + Earnings Summary + Profile Completion */}
          <div className="td-bottom-grid">
            {/* Card 1: Recent Messages */}
            <div className="td-bottom-card">
              <div>
                <h2 className="td-card-title">Recent Messages</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "18px" }}>
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="td-message-item">
                      <img src={msg.avatar} alt={msg.customerName} className="td-user-avatar" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <p className="td-msg-name">{msg.customerName}</p>
                          <span className="td-msg-time">{msg.timeAgo}</span>
                        </div>
                        <p className="td-msg-text">{msg.lastMessage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/tailor/messages" className="td-card-btn">
                <span>Go to Messages</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Card 2: Earnings Summary */}
            <div className="td-bottom-card">
              <div>
                <h2 className="td-card-title">Earnings Summary</h2>
                <h3 className="td-earnings-big">
                  ₹{earningsSummary.totalEarnings.toLocaleString("en-IN")}
                </h3>
                <p className="td-earnings-sub">Total Earnings</p>

                <div className="td-earnings-pills">
                  <div className="td-earn-pill">
                    <span className="td-earn-pill-dot-green" />
                    <div>
                      <span>₹{earningsSummary.completedAmount.toLocaleString("en-IN")}</span>
                      <span className="td-earn-pill-label">Completed</span>
                    </div>
                  </div>

                  <div className="td-earn-pill">
                    <span className="td-earn-pill-dot-amber" />
                    <div>
                      <span>₹{earningsSummary.pendingAmount.toLocaleString("en-IN")}</span>
                      <span className="td-earn-pill-label">Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/tailor/earnings" className="td-card-btn">
                <span>View Earnings</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Card 3: Profile Completion */}
            <div className="td-bottom-card">
              <div>
                <h2 className="td-card-title">Profile Completion</h2>
                <h3 className="td-profile-percent">{tailor.profileCompletion}%</h3>
                <p className="td-profile-desc">
                  Complete your profile to get more client discovery and orders.
                </p>

                {/* Progress Track */}
                <div className="td-progress-track">
                  <div
                    className="td-progress-fill"
                    style={{ width: `${tailor.profileCompletion}%` }}
                  />
                </div>
              </div>

              <Link href="/tailor/onboarding" className="td-card-btn">
                <span>Complete Now</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
