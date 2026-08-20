"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Shield,
  Percent,
  CreditCard,
  Bell,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminPlatformSettings } from "@/lib/api/admin-types";
import { initialPlatformSettings } from "@/lib/admin-data";

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminPlatformSettings>(initialPlatformSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.settings.getSettings();
      setSettings(data);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to load settings from API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const updated = await adminService.settings.updateSettings(settings);
      setSettings(updated);
      setToastMessage("Platform configuration saved & synced successfully.");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to save platform settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="settings" />

      <div className="admin-main-container">
        <AdminHeader />

        <main className="admin-dashboard-body">
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1>Platform Configuration & Rules</h1>
              <p>Control commission percentage tiers, escrow hold windows, artisan verification protocols and automated alerts.</p>
            </div>
          </div>

          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* General Settings */}
            <div style={{ background: "#FFFFFF", border: "1px solid #EAE6DF", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 16px", color: "#111111" }}>
                General Platform Identity
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Platform Brand Name</label>
                  <input
                    type="text"
                    value={settings.general.platformName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, platformName: e.target.value }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Customer Support Email</label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, supportEmail: e.target.value }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Helpline Contact Number</label>
                  <input
                    type="text"
                    value={settings.general.supportPhone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, supportPhone: e.target.value }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Billing Currency & Symbol</label>
                  <input
                    type="text"
                    value={`${settings.general.currency} (${settings.general.currencySymbol})`}
                    disabled
                    className="admin-form-input"
                    style={{ background: "#FAF8F5" }}
                  />
                </div>
              </div>
            </div>

            {/* Commission Tier Rates */}
            <div style={{ background: "#FFFFFF", border: "1px solid #EAE6DF", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 16px", color: "#111111" }}>
                Platform Commission Tiers (%)
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Standard Boutique Rate (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={settings.commission.defaultRatePercent}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        commission: {
                          ...settings.commission,
                          defaultRatePercent: Number(e.target.value)
                        }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Gold Partner Tier Rate (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={settings.commission.goldTierRatePercent}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        commission: {
                          ...settings.commission,
                          goldTierRatePercent: Number(e.target.value)
                        }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Platinum Partner Tier Rate (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={settings.commission.platinumTierRatePercent}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        commission: {
                          ...settings.commission,
                          platinumTierRatePercent: Number(e.target.value)
                        }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
              </div>
            </div>

            {/* Escrow & Payout Rules */}
            <div style={{ background: "#FFFFFF", border: "1px solid #EAE6DF", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 16px", color: "#111111" }}>
                Escrow Protection & Tailor Payout Policies
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Escrow Hold Window (Days after Delivery)</label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={settings.payouts.escrowHoldDays}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payouts: {
                          ...settings.payouts,
                          escrowHoldDays: Number(e.target.value)
                        }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Minimum Withdrawal Threshold (PKR)</label>
                  <input
                    type="number"
                    step={500}
                    value={settings.payouts.minPayoutThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payouts: {
                          ...settings.payouts,
                          minPayoutThreshold: Number(e.target.value)
                        }
                      })
                    }
                    className="admin-form-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Settlement Cycle</label>
                  <select
                    value={settings.payouts.payoutCycle}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        payouts: {
                          ...settings.payouts,
                          payoutCycle: e.target.value as any
                        }
                      })
                    }
                    className="admin-form-select"
                  >
                    <option value="daily">Daily 1Link Settlements</option>
                    <option value="weekly">Weekly (Every Tuesday)</option>
                    <option value="bi_weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notification Toggles */}
            <div style={{ background: "#FFFFFF", border: "1px solid #EAE6DF", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 16px", color: "#111111" }}>
                Real-Time Administrator Notifications
              </h2>
              <div>
                <div className="admin-switch-row">
                  <div>
                    <h3 className="admin-switch-label">Dispute Escalation Email Alerts</h3>
                    <p className="admin-switch-desc">
                      Notify admin team immediately when a customer files a quality dispute.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailAlertsOnDispute}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          emailAlertsOnDispute: e.target.checked
                        }
                      })
                    }
                    style={{ width: "20px", height: "20px", accentColor: "#078B87", cursor: "pointer" }}
                  />
                </div>

                <div className="admin-switch-row">
                  <div>
                    <h3 className="admin-switch-label">High-Value Order Alerts (&gt; Rs 50,000)</h3>
                    <p className="admin-switch-desc">
                      Send SMS and push alerts when a bridal or luxury pret order is placed.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.smsAlertsOnHighValueOrder}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          smsAlertsOnHighValueOrder: e.target.checked
                        }
                      })
                    }
                    style={{ width: "20px", height: "20px", accentColor: "#078B87", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                disabled={isSaving}
                className="admin-btn-primary"
                style={{ padding: "12px 28px", fontSize: "0.95rem" }}
              >
                <Save size={18} />
                <span>{isSaving ? "Saving..." : "Save Configuration"}</span>
              </button>
            </div>
          </form>
        </main>
      </div>

      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
