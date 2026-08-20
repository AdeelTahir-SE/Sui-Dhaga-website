"use client";

import React, { useState } from "react";
import {
  Bell,
  Sliders,
  CreditCard,
  Shield,
  Check,
  Building,
  KeyRound,
  Lock,
  Smartphone,
  Save,
  HelpCircle
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-settings-view.css";

export function TailorSettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    appointmentAlerts: true,
    directMessages: true,
    weeklyDigest: false
  });

  // Workshop & Order Preferences
  const [workshopPrefs, setWorkshopPrefs] = useState({
    acceptRushOrders: true,
    homeVisits: true,
    serviceRadiusKm: 15,
    vacationMode: false
  });

  // Bank & Payout
  const [bankInfo, setBankInfo] = useState({
    bankName: "HDFC Bank",
    accountHolder: "Arjun Verma Stitch Studio",
    accountNumber: "•••• •••• •••• 8766",
    ifscOrIban: "HDFC0001234",
    upiId: "vermastudios@okhdfcbank"
  });

  // Security Form
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSaveAllSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("🎉 Workshop settings and account preferences saved successfully!");
  };

  return (
    <div className="tst-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tst-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="settings" />

        {/* Main Content Area */}
        <main className="tst-main-content">
          {/* Header Area */}
          <div className="tst-header">
            <h1 className="tst-title">Account &amp; Workshop Settings</h1>
            <p className="tst-subtitle">
              Manage notifications, privacy, payout bank accounts, and security preferences.
            </p>
          </div>

          <form onSubmit={handleSaveAllSettings} className="tst-sections-wrap">
            {/* 1. Notification Preferences */}
            <div className="tst-card">
              <div className="tst-card-header">
                <div className="tst-card-icon-circle">
                  <Bell size={20} />
                </div>
                <h2 className="tst-card-title">Notification Preferences</h2>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Order Milestone &amp; Status Alerts</p>
                  <p className="tst-toggle-desc">
                    Receive instant push notifications and SMS when clients approve designs or request fitting updates.
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={notifications.orderUpdates}
                    onChange={(e) =>
                      setNotifications({ ...notifications, orderUpdates: e.target.checked })
                    }
                  />
                  <span className="tst-slider" />
                </label>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Appointment Booking Requests</p>
                  <p className="tst-toggle-desc">
                    Alert you when clients schedule measurement or trial fitting sessions.
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={notifications.appointmentAlerts}
                    onChange={(e) =>
                      setNotifications({ ...notifications, appointmentAlerts: e.target.checked })
                    }
                  />
                  <span className="tst-slider" />
                </label>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Direct Customer Chat Messages</p>
                  <p className="tst-toggle-desc">
                    Get alerted when a client sends a message or reference photo.
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={notifications.directMessages}
                    onChange={(e) =>
                      setNotifications({ ...notifications, directMessages: e.target.checked })
                    }
                  />
                  <span className="tst-slider" />
                </label>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Weekly Business &amp; Earnings Digest</p>
                  <p className="tst-toggle-desc">
                    Summary of completed orders, revenue growth, and client review scores sent every Monday.
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={notifications.weeklyDigest}
                    onChange={(e) =>
                      setNotifications({ ...notifications, weeklyDigest: e.target.checked })
                    }
                  />
                  <span className="tst-slider" />
                </label>
              </div>
            </div>

            {/* 2. Workshop & Order Preferences */}
            <div className="tst-card">
              <div className="tst-card-header">
                <div className="tst-card-icon-circle">
                  <Sliders size={20} />
                </div>
                <h2 className="tst-card-title">Workshop &amp; Order Preferences</h2>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Accept 48-Hour Rush Orders</p>
                  <p className="tst-toggle-desc">
                    Allow clients to book priority express stitching (+25% premium surcharge).
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={workshopPrefs.acceptRushOrders}
                    onChange={(e) =>
                      setWorkshopPrefs({ ...workshopPrefs, acceptRushOrders: e.target.checked })
                    }
                  />
                  <span className="tst-slider" />
                </label>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Home Measurement Visits</p>
                  <p className="tst-toggle-desc">
                    Offer doorstep measuring &amp; delivery visits for local clients.
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={workshopPrefs.homeVisits}
                    onChange={(e) =>
                      setWorkshopPrefs({ ...workshopPrefs, homeVisits: e.target.checked })
                    }
                  />
                  <span className="tst-slider" />
                </label>
              </div>

              <div className="tst-form-row">
                <div className="tst-input-group">
                  <label className="tst-label">Max Travel Radius for Home Visits (km)</label>
                  <input
                    type="number"
                    value={workshopPrefs.serviceRadiusKm}
                    onChange={(e) =>
                      setWorkshopPrefs({ ...workshopPrefs, serviceRadiusKm: Number(e.target.value) })
                    }
                    className="tst-input"
                  />
                </div>

                <div className="tst-input-group">
                  <label className="tst-label">Vacation / Holiday Mode</label>
                  <select
                    value={workshopPrefs.vacationMode ? "on" : "off"}
                    onChange={(e) =>
                      setWorkshopPrefs({ ...workshopPrefs, vacationMode: e.target.value === "on" })
                    }
                    className="tst-input"
                  >
                    <option value="off">Active (Accepting new orders)</option>
                    <option value="on">Vacation Mode (Pause new bookings)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Bank & Payout Preferences */}
            <div className="tst-card">
              <div className="tst-card-header">
                <div className="tst-card-icon-circle">
                  <CreditCard size={20} />
                </div>
                <h2 className="tst-card-title">Bank &amp; Escrow Payout Details</h2>
              </div>

              <div className="tst-form-row">
                <div className="tst-input-group">
                  <label className="tst-label">Bank Name</label>
                  <input
                    type="text"
                    value={bankInfo.bankName}
                    onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                    className="tst-input"
                  />
                </div>

                <div className="tst-input-group">
                  <label className="tst-label">Account Holder Title</label>
                  <input
                    type="text"
                    value={bankInfo.accountHolder}
                    onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
                    className="tst-input"
                  />
                </div>
              </div>

              <div className="tst-form-row">
                <div className="tst-input-group">
                  <label className="tst-label">Account Number / IBAN</label>
                  <input
                    type="text"
                    value={bankInfo.accountNumber}
                    onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                    className="tst-input"
                  />
                </div>

                <div className="tst-input-group">
                  <label className="tst-label">UPI ID (Optional Instant Transfer)</label>
                  <input
                    type="text"
                    value={bankInfo.upiId}
                    onChange={(e) => setBankInfo({ ...bankInfo, upiId: e.target.value })}
                    className="tst-input"
                  />
                </div>
              </div>
            </div>

            {/* 4. Security & Authentication */}
            <div className="tst-card">
              <div className="tst-card-header">
                <div className="tst-card-icon-circle">
                  <Shield size={20} />
                </div>
                <h2 className="tst-card-title">Security &amp; Password</h2>
              </div>

              <div className="tst-toggle-row">
                <div className="tst-toggle-meta">
                  <p className="tst-toggle-label">Two-Factor Authentication (2FA)</p>
                  <p className="tst-toggle-desc">
                    Secure payout releases and account login with SMS verification codes.
                  </p>
                </div>
                <label className="tst-switch">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                  <span className="tst-slider" />
                </label>
              </div>

              <div className="tst-form-row">
                <div className="tst-input-group">
                  <label className="tst-label">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="tst-input"
                  />
                </div>

                <div className="tst-input-group">
                  <label className="tst-label">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="tst-input"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="tst-save-bar">
              <button type="submit" className="tst-btn-save">
                <Check size={18} strokeWidth={2.5} />
                <span>Save All Settings</span>
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
