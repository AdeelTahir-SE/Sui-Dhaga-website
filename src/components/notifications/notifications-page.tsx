"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  Trash2,
  Calendar,
  Package,
  Heart,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { NotificationListSkeleton } from "@/components/common/shadow-skeleton";
import { notificationService } from "@/lib/api/notification-service";
import { AppNotification } from "@/lib/api/types";
import "@/styles/pages/customer-dashboard.css";
import "@/styles/pages/customer-account-views.css";

export interface DisplayNotification {
  id: string;
  type: "order" | "appointment" | "message" | "community" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkUrl?: string;
}

export const initialMockNotifications: DisplayNotification[] = [
  {
    id: "notif-1",
    type: "appointment",
    title: "Appointment Reminder",
    message: "Your fitting appointment with Rekha Tailors is scheduled for tomorrow at 2:00 PM.",
    timestamp: "10 mins ago",
    isRead: false,
    linkUrl: "/customer/appointments"
  },
  {
    id: "notif-2",
    type: "order",
    title: "Order In Production",
    message: "Master Arjun has started cutting fabric for your Custom Anarkali Suit (Order #SD1256).",
    timestamp: "2 hours ago",
    isRead: false,
    linkUrl: "/customer/orders"
  },
  {
    id: "notif-3",
    type: "message",
    title: "New Message from Rekha Tailors",
    message: "Rekha Tailors: 'Your order is ready and will be delivered on 24 May.'",
    timestamp: "5 hours ago",
    isRead: true,
    linkUrl: "/messages/rekha-tailors"
  },
  {
    id: "notif-4",
    type: "community",
    title: "New Likes on Your Creation",
    message: "Zainab Malik and 14 others liked your Pastel Anarkali design post.",
    timestamp: "1 day ago",
    isRead: true,
    linkUrl: "/community"
  },
  {
    id: "notif-5",
    type: "system",
    title: "New AI Studio Models Available",
    message: "Explore our latest 3D virtual fitting room templates in the AI Design Studio.",
    timestamp: "2 days ago",
    isRead: true,
    linkUrl: "/design-studio"
  }
];

export function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState<DisplayNotification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "order" | "appointment" | "community">("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;
    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");

    notificationService
      .getNotifications()
      .then((res) => {
        if (!isSubscribed) return;
        if (res?.data && Array.isArray(res.data)) {
          const mapped: DisplayNotification[] = res.data.map((n: AppNotification) => ({
            id: n.id,
            type: (n.type as DisplayNotification["type"]) || "system",
            title: n.title,
            message: n.message,
            timestamp: n.created_at ? new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Recently",
            isRead: n.is_read ?? n.isRead ?? false,
            linkUrl: n.link_url || n.linkUrl || "/customer/dashboard"
          }));
          setNotifications(mapped);
        } else if (hasToken) {
          setNotifications([]);
        } else {
          setNotifications(initialMockNotifications);
        }
      })
      .catch((err) => {
        console.warn("[Notifications Page] Fetch fallback:", err);
        if (hasToken) {
          setNotifications([]);
        } else {
          setNotifications(initialMockNotifications);
        }
      })
      .finally(() => {
        if (isSubscribed) setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
    } catch {}
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkSingleRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
    } catch {}
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
    } catch {}
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.isRead;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIcon = (type: DisplayNotification["type"]) => {
    switch (type) {
      case "order":
        return <Package size={18} style={{ color: "#d97706" }} />;
      case "appointment":
        return <Calendar size={18} style={{ color: "#0d9488" }} />;
      case "message":
        return <MessageSquare size={18} style={{ color: "#2563eb" }} />;
      case "community":
        return <Heart size={18} style={{ color: "#e11d48" }} />;
      case "system":
      default:
        return <Sparkles size={18} style={{ color: "#9333ea" }} />;
    }
  };

  return (
    <PublicShell>
      <div className="customer-page-root">
        {/* Ribbon Accent */}
        <div className="measurements-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="customer-page-container">
          <div className="customer-page-layout-grid">
            <CustomerSidebar active="notifications" />

            <main className="customer-main-feed-area">
              {/* Breadcrumb */}
              <nav className="customer-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} />
                <Link href="/customer/dashboard">Dashboard</Link>
                <ChevronRight size={14} />
                <span className="crumb-current">Notifications</span>
              </nav>

              {/* Header */}
              <div className="customer-header-row">
                <div>
                  <h1 className="customer-page-title">Notifications</h1>
                  <p className="customer-page-subtitle">
                    Stay updated on your custom orders, tailor appointments, and community activity.
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="btn-outline-sd"
                  >
                    <CheckCheck size={16} />
                    <span>Mark all as read</span>
                  </button>
                )}
              </div>

              {/* Segmented Filter Bar */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  paddingBottom: "8px",
                  marginBottom: "20px"
                }}
              >
                {(
                  [
                    { key: "all", label: `All (${notifications.length})` },
                    { key: "unread", label: `Unread (${unreadCount})` },
                    { key: "order", label: "Orders" },
                    { key: "appointment", label: "Appointments" },
                    { key: "community", label: "Community" }
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: "1px solid",
                      borderColor: activeTab === tab.key ? "#078b87" : "#e2e8f0",
                      background: activeTab === tab.key ? "#078b87" : "#ffffff",
                      color: activeTab === tab.key ? "#ffffff" : "#475569",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Notifications List */}
              {isLoading ? (
                <NotificationListSkeleton count={4} />
              ) : filteredNotifications.length === 0 ? (
                <div className="customer-empty-state-box">
                  <div className="customer-empty-state-icon">
                    <Bell size={36} />
                  </div>
                  <h2 className="customer-empty-state-title">You&apos;re All Caught Up!</h2>
                  <p className="customer-empty-state-desc">
                    No new alerts right now. When tailors update your stitching progress or fitting schedules, you&apos;ll be notified here.
                  </p>
                  <Link href="/customer/dashboard" className="btn-primary-sd">
                    <span>Back to Dashboard</span>
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {filteredNotifications.map((notif) => (
                    <article
                      key={notif.id}
                      onClick={() => handleMarkSingleRead(notif.id)}
                      className="customer-section-card"
                      style={{
                        margin: 0,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        borderLeft: notif.isRead ? "1px solid #e2e8f0" : "4px solid #078b87",
                        background: notif.isRead ? "#ffffff" : "#f0fdfa",
                        cursor: "pointer"
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                          flexShrink: 0
                        }}
                      >
                        {getIcon(notif.type)}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                          <h3 style={{ fontSize: "15px", fontWeight: 700, color: notif.isRead ? "#334155" : "#0f172a", margin: 0 }}>
                            {notif.title}
                          </h3>
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>{notif.timestamp}</span>
                        </div>
                        <p style={{ fontSize: "13.5px", color: "#475569", margin: "0 0 8px 0", lineHeight: 1.5 }}>
                          {notif.message}
                        </p>

                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          {notif.linkUrl && (
                            <Link
                              href={notif.linkUrl}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#078b87",
                                textDecoration: "none"
                              }}
                            >
                              <span>View Details</span>
                              <ExternalLink size={12} />
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notif.id);
                            }}
                            title="Delete notification"
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#94a3b8",
                              cursor: "pointer",
                              padding: "2px",
                              marginLeft: "auto"
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
