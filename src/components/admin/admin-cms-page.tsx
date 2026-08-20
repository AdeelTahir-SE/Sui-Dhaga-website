"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Trash2,
  CheckCircle2,
  Image,
  Megaphone,
  Sparkles,
  X
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import { AdminCMSContent, AdminCMSBanner, AdminCMSAnnouncement } from "@/lib/api/admin-types";
import { initialCMSContent } from "@/lib/admin-data";

export function AdminCmsPage() {
  const [cms, setCms] = useState<AdminCMSContent>(initialCMSContent);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadCms = async () => {
    try {
      const data = await adminService.cms.getContent();
      setCms(data);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to load CMS content.");
    }
  };

  useEffect(() => {
    loadCms();
  }, []);

  const handleToggleBanner = async (id: string) => {
    const updatedBanners = cms.banners.map((b) =>
      b.id === id ? { ...b, isActive: !b.isActive } : b
    );
    const newCms = { ...cms, banners: updatedBanners };
    setCms(newCms);
    await adminService.cms.saveContent(newCms);
    setToastMessage("Banner visibility toggled successfully.");
  };

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar activeKey="cms" />

      <div className="admin-main-container">
        <AdminHeader />

        <main className="admin-dashboard-body">
          <div className="admin-page-header">
            <div className="admin-page-title-wrap">
              <h1>Platform CMS & Announcements</h1>
              <p>Manage customer home page banners, seasonal campaigns, and network-wide announcement broadcasts.</p>
            </div>
          </div>

          {/* Banners Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>Promotional Banners</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {cms.banners.map((ban) => (
                <div
                  key={ban.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EAE6DF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}
                >
                  <img
                    src={ban.imageUrl}
                    alt={ban.title}
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          background: "#E6F4F3",
                          color: "#078B87",
                          padding: "2px 8px",
                          borderRadius: "4px"
                        }}
                      >
                        {ban.position.replace("_", " ")}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleBanner(ban.id)}
                        className={`admin-status-badge ${ban.isActive ? "badge-active" : "badge-suspended"}`}
                        style={{ cursor: "pointer", border: "none" }}
                      >
                        {ban.isActive ? "Active on Site" : "Inactive"}
                      </button>
                    </div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 4px" }}>
                      {ban.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 12px" }}>
                      {ban.subtitle}
                    </p>
                    <span style={{ fontSize: "0.82rem", fontWeight: 650, color: "#078B87" }}>
                      CTA Link: {ban.ctaLink} ({ban.ctaText})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0 }}>System Broadcasts</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {cms.announcements.map((anc) => (
                <div
                  key={anc.id}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EAE6DF",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <Megaphone size={20} color="#078B87" />
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 800, margin: "0 0 2px" }}>
                        {anc.title}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#4B5563", margin: 0 }}>
                        {anc.message}
                      </p>
                    </div>
                  </div>
                  <span
                    className="admin-status-badge badge-role"
                    style={{ textTransform: "uppercase" }}
                  >
                    Target: {anc.targetAudience}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
