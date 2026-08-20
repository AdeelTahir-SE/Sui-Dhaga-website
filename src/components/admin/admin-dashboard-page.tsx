"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Users,
  Scissors,
  ShoppingBag,
  IndianRupee,
  ChevronDown,
  TrendingUp,
  UserPlus,
  CheckCircle2,
  Package,
  CreditCard,
  Star,
  AlertTriangle,
  Download,
  RefreshCw
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import {
  AdminStats,
  RevenueDataPoint,
  AdminActivityItem
} from "@/lib/api/admin-types";
import {
  initialAdminStats,
  initialRevenueChartData,
  initialRecentActivities
} from "@/lib/admin-data";

export function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>(initialAdminStats);
  const [chartData, setChartData] = useState<RevenueDataPoint[]>(initialRevenueChartData);
  const [activities, setActivities] = useState<AdminActivityItem[]>(initialRecentActivities);
  const [selectedRange, setSelectedRange] = useState("20 May - 26 May, 2024");
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<RevenueDataPoint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const rangeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        rangeDropdownRef.current &&
        !rangeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRangeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadData = async (showToast = false) => {
    try {
      setIsLoading(true);
      const [loadedStats, loadedChart, loadedActs] = await Promise.all([
        adminService.dashboard.getStats(),
        adminService.dashboard.getRevenueChart(selectedRange),
        adminService.dashboard.getRecentActivities()
      ]);
      setStats(loadedStats);
      setChartData(loadedChart);
      setActivities(loadedActs);
      if (showToast) {
        setToastMessage("Dashboard data synchronized with server.");
      }
    } catch (err) {
      console.error("Failed to load admin dashboard data:", err);
      setToastMessage("Error loading data from API. Showing local state.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleExportSummary = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Metric,Value,Growth\n" +
      `Total Users,${stats.totalUsers},${stats.usersGrowth}\n` +
      `Total Tailors,${stats.totalTailors},${stats.tailorsGrowth}\n` +
      `Total Orders,${stats.totalOrders},${stats.ordersGrowth}\n` +
      `Total Revenue,${stats.totalRevenue},${stats.revenueGrowth}\n` +
      `Active Users,${stats.activeUsers},-\n` +
      `Escrow Balance,${stats.escrowBalance},-\n` +
      `Monthly Commission,${stats.monthlyCommission},-\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sui_dhaga_admin_summary_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage("Summary CSV downloaded successfully.");
  };

  // SVG Chart Dimensions & Calculations
  const chartWidth = 560;
  const chartHeight = 180;
  const paddingX = 40;
  const paddingY = 20;
  const maxRevenue = 1200000; // 12 Lakhs

  const points = chartData.map((d, index) => {
    const x = paddingX + (index * (chartWidth - paddingX * 2)) / (chartData.length - 1);
    const y = chartHeight - paddingY - (d.revenue / maxRevenue) * (chartHeight - paddingY * 2);
    return { ...d, x, y };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${chartHeight - paddingY} L ${points[0]?.x || 0} ${chartHeight - paddingY} Z`;

  const getActivityIcon = (type: AdminActivityItem["type"]) => {
    switch (type) {
      case "user":
        return <UserPlus size={16} />;
      case "tailor":
        return <CheckCircle2 size={16} />;
      case "order":
        return <Package size={16} />;
      case "payment":
        return <CreditCard size={16} />;
      case "review":
        return <Star size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getActivityClass = (type: AdminActivityItem["type"]) => {
    switch (type) {
      case "user":
        return "admin-act-user";
      case "tailor":
        return "admin-act-tailor";
      case "order":
        return "admin-act-order";
      case "payment":
        return "admin-act-payment";
      case "review":
        return "admin-act-review";
      default:
        return "admin-act-tailor";
    }
  };

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="dashboard" />

      <div className="admin-main-container">
        <AdminHeader />

        <main className="admin-dashboard-body">
          {/* Welcome Bar with Date Range Selector & Actions */}
          <div className="admin-welcome-bar">
            <div>
              <h1 className="admin-welcome-title">Welcome back, Admin! 👋</h1>
              <p className="admin-welcome-sub">
                Live platform metrics, active orders, and financial oversight.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => loadData(true)}
                className="admin-btn-secondary"
                title="Refresh Metrics"
              >
                <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
                <span>Sync</span>
              </button>

              <button
                type="button"
                onClick={handleExportSummary}
                className="admin-btn-secondary"
                title="Export CSV Summary"
              >
                <Download size={15} />
                <span>Export CSV</span>
              </button>

              <div ref={rangeDropdownRef} style={{ position: "relative", zIndex: 100 }}>
                <button
                  type="button"
                  onClick={() => setIsRangeOpen(!isRangeOpen)}
                  className="admin-date-picker-btn"
                >
                  <span>{selectedRange}</span>
                  <ChevronDown size={16} color="#6B7280" />
                </button>

                {isRangeOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "46px",
                      right: 0,
                      background: "#FFFFFF",
                      border: "1px solid #EAE6DF",
                      borderRadius: "12px",
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      boxShadow: "0 14px 35px rgba(0,0,0,0.18)",
                      zIndex: 200,
                      minWidth: "220px"
                    }}
                  >
                    {[
                      "20 May - 26 May, 2024",
                      "Today (Last 24h)",
                      "Last 30 Days",
                      "This Quarter (Q2 2024)",
                      "Year to Date (2024)"
                    ].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => {
                          setSelectedRange(range);
                          setIsRangeOpen(false);
                        }}
                        style={{
                          background: selectedRange === range ? "#FAF8F5" : "transparent",
                          border: "none",
                          padding: "8px 12px",
                          fontSize: "0.85rem",
                          fontWeight: selectedRange === range ? 700 : 550,
                          color: selectedRange === range ? "#078B87" : "#374151",
                          borderRadius: "6px",
                          textAlign: "left",
                          cursor: "pointer"
                        }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top 4 Key Stat Cards */}
          <div className="admin-top-stats-grid">
            {/* Total Users */}
            <Link href="/admin/users" style={{ textDecoration: "none" }}>
              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <div className="admin-stat-icon-circle admin-stat-icon-blue">
                    <Users size={22} />
                  </div>
                  <div>
                    <p className="admin-stat-label">Total Users</p>
                    <h2 className="admin-stat-value">
                      {stats.totalUsers.toLocaleString()}
                    </h2>
                  </div>
                </div>
                <div className="admin-stat-growth-tag">
                  <span>{stats.usersGrowth.split(" ")[0]} {stats.usersGrowth.split(" ")[1]}</span>
                  <span className="admin-stat-growth-sub">vs last week</span>
                </div>
              </div>
            </Link>

            {/* Total Tailors */}
            <Link href="/admin/tailors" style={{ textDecoration: "none" }}>
              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <div className="admin-stat-icon-circle admin-stat-icon-purple">
                    <Scissors size={22} />
                  </div>
                  <div>
                    <p className="admin-stat-label">Total Tailors</p>
                    <h2 className="admin-stat-value">
                      {stats.totalTailors.toLocaleString()}
                    </h2>
                  </div>
                </div>
                <div className="admin-stat-growth-tag">
                  <span>{stats.tailorsGrowth.split(" ")[0]} {stats.tailorsGrowth.split(" ")[1]}</span>
                  <span className="admin-stat-growth-sub">vs last week</span>
                </div>
              </div>
            </Link>

            {/* Total Orders */}
            <Link href="/admin/orders" style={{ textDecoration: "none" }}>
              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <div className="admin-stat-icon-circle admin-stat-icon-orange">
                    <ShoppingBag size={22} />
                  </div>
                  <div>
                    <p className="admin-stat-label">Total Orders</p>
                    <h2 className="admin-stat-value">
                      {stats.totalOrders.toLocaleString()}
                    </h2>
                  </div>
                </div>
                <div className="admin-stat-growth-tag">
                  <span>{stats.ordersGrowth.split(" ")[0]} {stats.ordersGrowth.split(" ")[1]}</span>
                  <span className="admin-stat-growth-sub">vs last week</span>
                </div>
              </div>
            </Link>

            {/* Total Revenue */}
            <Link href="/admin/payments" style={{ textDecoration: "none" }}>
              <div className="admin-stat-card">
                <div className="admin-stat-card-header">
                  <div className="admin-stat-icon-circle admin-stat-icon-green">
                    <IndianRupee size={22} />
                  </div>
                  <div>
                    <p className="admin-stat-label">Total Revenue</p>
                    <h2 className="admin-stat-value">
                      Rs {stats.totalRevenue.toLocaleString("en-PK")}
                    </h2>
                  </div>
                </div>
                <div className="admin-stat-growth-tag">
                  <span>{stats.revenueGrowth.split(" ")[0]} {stats.revenueGrowth.split(" ")[1]}</span>
                  <span className="admin-stat-growth-sub">vs last week</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Middle Row: Revenue Overview Chart + Recent Activity Feed */}
          <div className="admin-middle-split-grid">
            <div className="admin-chart-card">
              <div className="admin-chart-top-bar">
                <div>
                  <h3 className="admin-chart-title">Revenue Overview</h3>
                  <h4 className="admin-chart-big-revenue">Rs {stats.totalRevenue.toLocaleString("en-PK")}</h4>
                  <p className="admin-chart-subtext">Gross Customer Transaction Volume</p>
                </div>
                <div className="admin-chart-growth-pill">
                  <TrendingUp size={14} />
                  <span>{stats.revenueGrowth}</span>
                </div>
              </div>

              {/* Interactive SVG Chart */}
              <div className="admin-svg-chart-container">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="admin-chart-svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="adminRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#078B87" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#078B87" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  {[0, 300000, 600000, 900000, 1200000].map((val) => {
                    const y = chartHeight - paddingY - (val / maxRevenue) * (chartHeight - paddingY * 2);
                    const label = val === 0 ? "Rs 0" : `Rs ${val / 100000}L`;
                    return (
                      <g key={val}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={chartWidth - paddingX}
                          y2={y}
                          className="admin-chart-grid-line"
                        />
                        <text
                          x={paddingX - 10}
                          y={y + 4}
                          textAnchor="end"
                          className="admin-chart-axis-text"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Area Fill */}
                  <path d={areaD} fill="url(#adminRevenueGradient)" />

                  {/* Line Path */}
                  <path d={pathD} className="admin-chart-line-path" />

                  {/* Interactive Data Points */}
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={hoveredPoint?.date === p.date ? 6 : 4.5}
                        className="admin-chart-dot"
                        onMouseEnter={() => setHoveredPoint(p)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      <text
                        x={p.x}
                        y={chartHeight - 4}
                        textAnchor="middle"
                        className="admin-chart-axis-text"
                      >
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>

                {hoveredPoint && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#111827",
                      color: "#FFFFFF",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      pointerEvents: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}
                  >
                    {hoveredPoint.label}: Rs {hoveredPoint.revenue.toLocaleString("en-PK")} ({hoveredPoint.ordersCount} orders, Comm: Rs {hoveredPoint.commission.toLocaleString()})
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity Feed Card */}
            <div className="admin-activity-card">
              <h3 className="admin-activity-title">Recent Activity Feed</h3>
              <div className="admin-activity-list">
                {activities.map((act) => (
                  <div key={act.id} className="admin-activity-item">
                    <div className={`admin-activity-icon-wrap ${getActivityClass(act.type)}`}>
                      {getActivityIcon(act.type)}
                    </div>
                    <div className="admin-activity-content">
                      <h4 className="admin-activity-item-title">{act.title}</h4>
                      <p className="admin-activity-item-desc">{act.description}</p>
                    </div>
                    <span className="admin-activity-time">{act.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom 4 Quick Status / Metrics Grid */}
          <div className="admin-bottom-metrics-grid">
            <div className="admin-metric-card">
              <div className="admin-metric-icon-wrap admin-metric-green">
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#059669", boxShadow: "0 0 0 4px rgba(5, 150, 105, 0.2)" }} />
              </div>
              <div className="admin-metric-body">
                <p className="admin-metric-label">Active Users</p>
                <h4 className="admin-metric-value">{stats.activeUsers.toLocaleString()}</h4>
                <p className="admin-metric-sub">Online right now</p>
              </div>
            </div>

            <Link href="/admin/orders" style={{ textDecoration: "none" }}>
              <div className="admin-metric-card">
                <div className="admin-metric-icon-wrap admin-metric-orange">
                  <ShoppingBag size={18} />
                </div>
                <div className="admin-metric-body">
                  <p className="admin-metric-label">Orders in Progress</p>
                  <h4 className="admin-metric-value">{stats.ordersInProgress.toLocaleString()}</h4>
                  <p className="admin-metric-sub">In cutting / stitching</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/tailors" style={{ textDecoration: "none" }}>
              <div className="admin-metric-card">
                <div className="admin-metric-icon-wrap admin-metric-yellow">
                  <Scissors size={18} />
                </div>
                <div className="admin-metric-body">
                  <p className="admin-metric-label">Pending Verifications</p>
                  <h4 className="admin-metric-value">{stats.pendingVerifications}</h4>
                  <p className="admin-metric-sub" style={{ color: "#D97706", fontWeight: 700 }}>
                    Requires verification
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/admin/disputes" style={{ textDecoration: "none" }}>
              <div className="admin-metric-card">
                <div className="admin-metric-icon-wrap admin-metric-red">
                  <AlertTriangle size={18} />
                </div>
                <div className="admin-metric-body">
                  <p className="admin-metric-label">Open Disputes</p>
                  <h4 className="admin-metric-value">{stats.openDisputes}</h4>
                  <p className="admin-metric-sub" style={{ color: "#DC2626", fontWeight: 700 }}>
                    Requires mediation
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>

      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
