"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Scissors,
  ShoppingBag,
  Calendar,
  Clock,
  MessageSquare,
  DollarSign,
  Star,
  CreditCard,
  Settings,
  LogOut
} from "lucide-react";

interface TailorSidebarProps {
  activeKey?: string;
}

export function TailorSidebar({ activeKey = "dashboard" }: TailorSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { key: "dashboard", label: "Dashboard", href: "/tailor/dashboard", icon: LayoutDashboard },
    { key: "profile", label: "Profile", href: "/tailor/profile", icon: User },
    { key: "services", label: "Services", href: "/tailor/services", icon: Scissors },
    { key: "orders", label: "Orders", href: "/tailor/orders", icon: ShoppingBag },
    { key: "appointments", label: "Appointments", href: "/tailor/appointments", icon: Calendar },
    { key: "availability", label: "Availability", href: "/tailor/availability", icon: Clock },
    { key: "messages", label: "Messages", href: "/tailor/messages", icon: MessageSquare },
    { key: "earnings", label: "Earnings", href: "/tailor/earnings", icon: DollarSign },
    { key: "reviews", label: "Reviews", href: "/tailor/reviews", icon: Star },
    { key: "payouts", label: "Payouts", href: "/tailor/payouts", icon: CreditCard },
    { key: "settings", label: "Settings", href: "/tailor/settings", icon: Settings },
  ];

  return (
    <aside
      style={{
        width: "240px",
        background: "#FAF8F5",
        borderRight: "1px solid #EAE6DF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px",
        flexShrink: 0
      }}
    >
      <div>
        {/* Navigation Link List */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeKey === item.key || pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 750 : 600,
                  color: isActive ? "#FFFFFF" : "#4B5563",
                  background: isActive ? "#078B87" : "transparent",
                  textDecoration: "none",
                  boxShadow: isActive ? "0 4px 12px rgba(7, 139, 135, 0.25)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                <Icon size={18} color={isActive ? "#FFFFFF" : "#6B7280"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Bottom Link */}
      <div style={{ borderTop: "1px solid #EAE6DF", paddingTop: "14px", marginTop: "24px" }}>
        <Link
          href="/auth/login"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 650,
            color: "#6B7280",
            textDecoration: "none",
            transition: "all 0.15s ease"
          }}
        >
          <LogOut size={18} color="#6B7280" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}
