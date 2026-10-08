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
  Info,
  Clock,
  ArrowRight
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { notificationService } from "@/lib/api/notification-service";
import { AppNotification } from "@/lib/api/types";

export interface DisplayNotification {
  id: string;
  type: "order" | "appointment" | "message" | "community" | "system";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkUrl?: string;
  actorAvatar?: string;
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
    linkUrl: "/community/post/post-1"
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
  const [notifications, setNotifications] = useState<DisplayNotification[]>(initialMockNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "order" | "appointment" | "community">("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    notificationService
      .getNotifications()
      .then((res) => {
        if (isSubscribed && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: DisplayNotification[] = res.data.map((n: AppNotification) => ({
            id: n.id,
            type: (n.type as any) || "system",
            title: n.title,
            message: n.message,
            timestamp: n.created_at ? new Date(n.created_at).toLocaleTimeString() : "Recently",
            isRead: n.is_read ?? n.isRead ?? false,
            linkUrl: n.link_url || n.linkUrl || "/customer/dashboard"
          }));
          setNotifications(mapped);
        }
      })
      .catch((err) => {
        console.warn("[Notifications Page] Fetch failed, using local notifications:", err);
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
    } catch (e) {}
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkSingleRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
    } catch (e) {}
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
    } catch (e) {}
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
        return <Package size={18} className="text-amber-500" />;
      case "appointment":
        return <Calendar size={18} className="text-teal-600" />;
      case "message":
        return <MessageSquare size={18} className="text-blue-500" />;
      case "community":
        return <Heart size={18} className="text-rose-500" />;
      case "system":
      default:
        return <Sparkles size={18} className="text-purple-500" />;
    }
  };

  return (
    <PublicShell>
      <div className="notifications-container" style={{ maxWidth: "860px", margin: "40px auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #078b87 0%, #0d9488 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                <Bell size={22} />
              </div>
              <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: 0 }}>
                Notifications
              </h1>
            </div>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>
              Stay updated on your custom orders, tailor appointments, and community activity.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "10px",
                background: "#f0fdfa",
                border: "1px solid #ccfbf1",
                color: "#078b87",
                fontSize: "13.5px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Tab Filter Navigation */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "12px",
            marginBottom: "24px",
            overflowX: "auto"
          }}
        >
          {[
            { id: "all", label: "All" },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "order", label: "Orders" },
            { id: "appointment", label: "Appointments" },
            { id: "community", label: "Community" }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "none",
                fontSize: "13.5px",
                fontWeight: activeTab === t.id ? "700" : "500",
                background: activeTab === t.id ? "#078b87" : "#f1f5f9",
                color: activeTab === t.id ? "#ffffff" : "#475569",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredNotifications.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px dashed #cbd5e1"
              }}
            >
              <Bell size={40} style={{ color: "#94a3b8", margin: "0 auto 12px" }} />
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#334155" }}>No notifications</h3>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                You&apos;re completely caught up! We will notify you when there are updates.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "18px 20px",
                  background: notif.isRead ? "#ffffff" : "#f8fafc",
                  borderRadius: "14px",
                  border: notif.isRead ? "1px solid #e2e8f0" : "1px solid #99f6e4",
                  boxShadow: notif.isRead ? "none" : "0 2px 10px rgba(7, 139, 135, 0.05)",
                  transition: "all 0.2s ease"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {getIcon(notif.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: notif.isRead ? "600" : "800", color: "#0f172a", margin: 0 }}>
                      {notif.title}
                    </h4>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>{notif.timestamp}</span>
                  </div>

                  <p style={{ fontSize: "13.5px", color: "#475569", margin: "0 0 12px 0", lineHeight: "1.5" }}>
                    {notif.message}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {notif.linkUrl && (
                      <Link
                        href={notif.linkUrl}
                        onClick={() => handleMarkSingleRead(notif.id)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                          fontWeight: "700",
                          color: "#078b87",
                          textDecoration: "none"
                        }}
                      >
                        View details
                        <ArrowRight size={14} />
                      </Link>
                    )}

                    {!notif.isRead && (
                      <button
                        onClick={() => handleMarkSingleRead(notif.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#64748b",
                          fontSize: "12.5px",
                          fontWeight: "600",
                          cursor: "pointer",
                          padding: 0
                        }}
                      >
                        Mark as read
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(notif.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#94a3b8",
                        cursor: "pointer",
                        padding: 0,
                        marginLeft: "auto"
                      }}
                      title="Delete notification"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PublicShell>
  );
}
