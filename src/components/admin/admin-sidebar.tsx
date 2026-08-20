"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Scissors,
  ShoppingBag,
  CreditCard,
  Scale,
  Star,
  FileBarChart,
  Layers,
  Settings,
  LogOut
} from "lucide-react";

interface AdminSidebarProps {
  activeKey?: string;
}

export function AdminSidebar({ activeKey }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { key: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { key: "users", label: "Users", href: "/admin/users", icon: Users, badge: "12.8k" },
    { key: "tailors", label: "Tailors", href: "/admin/tailors", icon: Scissors, badge: "34 New" },
    { key: "orders", label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { key: "payments", label: "Payments", href: "/admin/payments", icon: CreditCard },
    { key: "disputes", label: "Disputes", href: "/admin/disputes", icon: Scale, badge: "12" },
    { key: "reviews", label: "Reviews", href: "/admin/reviews", icon: Star },
    { key: "reports", label: "Reports", href: "/admin/reports", icon: FileBarChart },
    { key: "cms", label: "CMS", href: "/admin/cms", icon: Layers },
    { key: "settings", label: "Settings", href: "/admin/settings", icon: Settings }
  ];

  return (
    <aside className="admin-sidebar" aria-label="Admin Navigation">
      <div>
        {/* Brand Logo */}
        <Link href="/admin/dashboard" className="admin-sidebar-brand">
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "#078B87",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.85rem"
            }}
          >
            SD
          </div>
          <h1 className="admin-sidebar-brand-title">Sui Dhāga</h1>
          <span className="admin-sidebar-brand-badge">Admin</span>
        </Link>

        {/* Navigation Items */}
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive =
              activeKey === item.key ||
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`admin-sidebar-link ${isActive ? "active" : ""}`}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className="admin-sidebar-link-badge"
                    style={{
                      backgroundColor: item.key === "disputes" ? "#EF4444" : "rgba(255,255,255,0.15)"
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="admin-sidebar-footer">
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }
          }}
          className="admin-logout-btn"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
