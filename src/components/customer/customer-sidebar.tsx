"use client";

import React from "react";
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
} from "lucide-react";
import { authService } from "@/lib/api/auth-service";

export type CustomerSidebarActiveTab =
  | "dashboard"
  | "appointments"
  | "orders"
  | "measurements"
  | "saved-designs"
  | "wishlist"
  | "community"
  | "messages"
  | "addresses"
  | "payments"
  | "notifications"
  | "settings";

interface CustomerSidebarProps {
  active: CustomerSidebarActiveTab;
}

export function CustomerSidebar({ active }: CustomerSidebarProps) {
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await authService.logout();
    } catch {
      // ignore
    }
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  return (
    <aside className="customer-sidebar-nav">
      <nav className="sidebar-menu-list">
        <Link
          href="/customer/dashboard"
          className={`sidebar-item ${active === "dashboard" ? "active" : ""}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/customer/appointments"
          className={`sidebar-item ${active === "appointments" ? "active" : ""}`}
        >
          <Calendar size={18} />
          <span>Appointments</span>
        </Link>

        <Link
          href="/customer/orders"
          className={`sidebar-item ${active === "orders" ? "active" : ""}`}
        >
          <Package size={18} />
          <span>Orders</span>
        </Link>

        <Link
          href="/customer/measurements"
          className={`sidebar-item ${active === "measurements" ? "active" : ""}`}
        >
          <Ruler size={18} />
          <span>Measurements</span>
        </Link>

        <Link
          href="/customer/saved-designs"
          className={`sidebar-item ${active === "saved-designs" ? "active" : ""}`}
        >
          <FolderHeart size={18} />
          <span>Saved Designs</span>
        </Link>

        <Link
          href="/customer/wishlist"
          className={`sidebar-item ${active === "wishlist" ? "active" : ""}`}
        >
          <Heart size={18} />
          <span>Wishlist</span>
        </Link>

        <Link
          href="/community"
          className={`sidebar-item ${active === "community" ? "active" : ""}`}
        >
          <Users size={18} />
          <span>Community</span>
        </Link>

        <Link
          href="/messages"
          className={`sidebar-item ${active === "messages" ? "active" : ""}`}
        >
          <MessageSquare size={18} />
          <span>Messages</span>
        </Link>

        <Link
          href="/customer/addresses"
          className={`sidebar-item ${active === "addresses" ? "active" : ""}`}
        >
          <MapPin size={18} />
          <span>Addresses</span>
        </Link>

        <Link
          href="/customer/payments"
          className={`sidebar-item ${active === "payments" ? "active" : ""}`}
        >
          <CreditCard size={18} />
          <span>Payment Methods</span>
        </Link>

        <Link
          href="/notifications"
          className={`sidebar-item ${active === "notifications" ? "active" : ""}`}
        >
          <Bell size={18} />
          <span>Notifications</span>
        </Link>

        <Link
          href="/customer/settings"
          className={`sidebar-item ${active === "settings" ? "active" : ""}`}
        >
          <Settings size={18} />
          <span>Account Settings</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-item logout-btn"
          aria-label="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

