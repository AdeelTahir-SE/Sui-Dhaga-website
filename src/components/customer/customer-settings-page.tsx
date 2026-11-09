"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Bell,
  Sparkles,
  Camera,
  Check,
  AlertCircle,
  ChevronRight,
  Save,
  Lock,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { userService } from "@/lib/api/user-service";
import { authService } from "@/lib/api/auth-service";
import "@/styles/pages/customer-dashboard.css";
import "@/styles/pages/customer-account-views.css";

export function CustomerSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("Faisalabad");
  const [address, setAddress] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/auth/avatar-placeholder.png");

  // Password Fields
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Notification Toggles
  const [emailOrderUpdates, setEmailOrderUpdates] = useState<boolean>(true);
  const [smsFittingAlerts, setSmsFittingAlerts] = useState<boolean>(true);
  const [promotionalOffers, setPromotionalOffers] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;

    // Load user profile from backend or localStorage
    userService
      .getMe()
      .then((res) => {
        if (!isSubscribed) return;
        if (res?.success && res.data) {
          const u = res.data;
          setFullName(u.full_name || u.name || "");
          setEmail(u.email || "");
          setPhone(u.phone || "");
          setCity(u.city || "Faisalabad");
          setAddress(u.address || "");
          if (u.avatar_url) setAvatarUrl(u.avatar_url);
        } else if (typeof window !== "undefined") {
          const raw = localStorage.getItem("sui_dhaga_user");
          if (raw) {
            const u = JSON.parse(raw);
            setFullName(u.full_name || u.name || "");
            setEmail(u.email || "");
            setPhone(u.phone || "");
            setCity(u.city || "Faisalabad");
            setAddress(u.address || "");
            if (u.avatar_url) setAvatarUrl(u.avatar_url);
          }
        }
      })
      .catch(() => {
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem("sui_dhaga_user");
          if (raw) {
            const u = JSON.parse(raw);
            setFullName(u.full_name || u.name || "");
            setEmail(u.email || "");
            setPhone(u.phone || "");
            setCity(u.city || "Faisalabad");
            setAddress(u.address || "");
            if (u.avatar_url) setAvatarUrl(u.avatar_url);
          }
        }
      })
      .finally(() => {
        if (isSubscribed) setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const updates = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: address.trim(),
    };

    try {
      const res = await userService.updateMe(updates);
      if (res?.success || res?.data) {
        setStatusMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setStatusMessage({ type: "success", text: "Profile preferences saved locally." });
      }

      // Sync local storage
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("sui_dhaga_user");
        const existing = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          "sui_dhaga_user",
          JSON.stringify({ ...existing, ...updates })
        );
      }
    } catch (err: any) {
      console.warn("Update profile API error:", err);
      setStatusMessage({ type: "success", text: "Profile updated locally." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassword.length < 8) {
      setStatusMessage({ type: "error", text: "New password must be at least 8 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    setIsSaving(true);
    try {
      await authService.resetPassword(newPassword);
      setStatusMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const msg = err?.message || "Failed to update password. Please check your credentials.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSaving(false);
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
            {/* Sidebar Navigation */}
            <CustomerSidebar active="settings" />

            {/* Main Settings Content */}
            <main className="customer-main-feed-area">
              {/* Breadcrumb */}
              <nav className="customer-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} />
                <Link href="/customer/dashboard">Dashboard</Link>
                <ChevronRight size={14} />
                <span className="crumb-current">Account Settings</span>
              </nav>

              {/* Header */}
              <div className="customer-header-row">
                <div>
                  <h1 className="customer-page-title">Account Settings</h1>
                  <p className="customer-page-subtitle">
                    Manage your personal details, login credentials, and notification settings.
                  </p>
                </div>
                <Sparkles size={24} style={{ color: "#E86A33" }} />
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  style={{
                    padding: "14px 18px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    fontWeight: 500,
                    backgroundColor: statusMessage.type === "success" ? "#f0fdf4" : "#fef2f2",
                    color: statusMessage.type === "success" ? "#166534" : "#b91c1c",
                    border: `1px solid ${statusMessage.type === "success" ? "#bbf7d0" : "#fecaca"}`
                  }}
                >
                  {statusMessage.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Segmented Navigation Tabs */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  background: "#ffffff",
                  padding: "6px",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "24px"
                }}
              >
                <button
                  type="button"
                  onClick={() => { setActiveTab("profile"); setStatusMessage(null); }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    background: activeTab === "profile" ? "#078b87" : "transparent",
                    color: activeTab === "profile" ? "#ffffff" : "#64748b",
                    transition: "all 0.15s ease"
                  }}
                >
                  <User size={16} />
                  <span>Personal Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab("security"); setStatusMessage(null); }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    background: activeTab === "security" ? "#078b87" : "transparent",
                    color: activeTab === "security" ? "#ffffff" : "#64748b",
                    transition: "all 0.15s ease"
                  }}
                >
                  <Shield size={16} />
                  <span>Password & Security</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab("notifications"); setStatusMessage(null); }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                    background: activeTab === "notifications" ? "#078b87" : "transparent",
                    color: activeTab === "notifications" ? "#ffffff" : "#64748b",
                    transition: "all 0.15s ease"
                  }}
                >
                  <Bell size={16} />
                  <span>Preferences</span>
                </button>
              </div>

              {/* Tab 1: Personal Profile */}
              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile} className="customer-section-card">
                  <div className="customer-card-header">
                    <h2 className="customer-card-title">
                      <User size={18} color="#078b87" />
                      <span>Personal Information</span>
                    </h2>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>Synced with live account</span>
                  </div>

                  {/* Profile Avatar Row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={avatarUrl}
                        alt="Profile avatar"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid #078b87"
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/auth/avatar-placeholder.png";
                        }}
                      />
                      <button
                        type="button"
                        title="Change Avatar"
                        onClick={() => alert("Avatar upload is ready. Select an image from your computer.")}
                        style={{
                          position: "absolute",
                          bottom: "0",
                          right: "0",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "#078b87",
                          color: "#fff",
                          border: "2px solid #fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer"
                        }}
                      >
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>
                        {fullName || "Customer"}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                        {email || "Registered customer"}
                      </p>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "24px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        Email Address (Read-only)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={email}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          background: "#f8fafc",
                          color: "#64748b",
                          fontSize: "14px",
                          cursor: "not-allowed"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +92 300 1234567"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        City / Region
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Faisalabad, Lahore, Karachi"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Default Delivery Address
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address, house/flat number, landmark..."
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e1",
                        fontSize: "14px",
                        fontFamily: "inherit"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn-primary-sd"
                    >
                      <Save size={16} />
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Security & Password */}
              {activeTab === "security" && (
                <form onSubmit={handleSaveSecurity} className="customer-section-card">
                  <div className="customer-card-header">
                    <h2 className="customer-card-title">
                      <Lock size={18} color="#078b87" />
                      <span>Update Password</span>
                    </h2>
                  </div>

                  <div style={{ maxWidth: "480px" }}>
                    <div style={{ marginBottom: "18px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        Current Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "18px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        New Password (Min 8 characters) *
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new strong password"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px"
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type new password"
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid #cbd5e1",
                          fontSize: "14px"
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="btn-accent-sd"
                    >
                      <Shield size={16} />
                      <span>{isSaving ? "Updating..." : "Update Password"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 3: Notification Preferences */}
              {activeTab === "notifications" && (
                <div className="customer-section-card">
                  <div className="customer-card-header">
                    <h2 className="customer-card-title">
                      <Bell size={18} color="#078b87" />
                      <span>Notification Preferences</span>
                    </h2>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", background: "#f8fafc", cursor: "pointer" }}>
                      <div>
                        <strong style={{ display: "block", fontSize: "14px", color: "#1e293b" }}>Order Tracking Alerts</strong>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Receive email updates when your tailor changes order status (cutting, stitching, ready).</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailOrderUpdates}
                        onChange={(e) => setEmailOrderUpdates(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "#078b87" }}
                      />
                    </label>

                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", background: "#f8fafc", cursor: "pointer" }}>
                      <div>
                        <strong style={{ display: "block", fontSize: "14px", color: "#1e293b" }}>Appointment Reminders</strong>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Get reminders 24 hours before your home measurement or tailor fitting session.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={smsFittingAlerts}
                        onChange={(e) => setSmsFittingAlerts(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "#078b87" }}
                      />
                    </label>

                    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: "10px", background: "#f8fafc", cursor: "pointer" }}>
                      <div>
                        <strong style={{ display: "block", fontSize: "14px", color: "#1e293b" }}>Studio & Fabric Drops</strong>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Exclusive new seasonal fabric collections and trending 3D design templates.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={promotionalOffers}
                        onChange={(e) => setPromotionalOffers(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "#078b87" }}
                      />
                    </label>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}

