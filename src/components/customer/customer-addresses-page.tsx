"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  Check,
  Edit2,
  Trash2,
  ChevronRight,
  Sparkles,
  X,
  Phone,
  User,
  Building
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { CardsGridSkeleton } from "@/components/common/shadow-skeleton";
import { userService } from "@/lib/api/user-service";
import "@/styles/pages/customer-dashboard.css";
import "@/styles/pages/customer-account-views.css";

export interface CustomerAddressItem {
  id: string;
  label: "Home" | "Office" | "Other";
  recipientName: string;
  phone: string;
  street: string;
  area: string;
  city: string;
  postalCode?: string;
  isDefault: boolean;
}

const initialDummyAddresses: CustomerAddressItem[] = [
  {
    id: "addr-1",
    label: "Home",
    recipientName: "Ayesha Khan",
    phone: "+92 300 9876543",
    street: "House 42, Street 8, Block B",
    area: "People's Colony No. 1",
    city: "Faisalabad",
    postalCode: "38000",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    recipientName: "Ayesha Khan",
    phone: "+92 300 9876543",
    street: "Suite 304, Kohinoor City Plaza, Jaranwala Road",
    area: "Kohinoor City",
    city: "Faisalabad",
    postalCode: "38040",
    isDefault: false,
  },
];

export function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState<CustomerAddressItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddressItem | null>(null);

  // Form State
  const [formLabel, setFormLabel] = useState<"Home" | "Office" | "Other">("Home");
  const [formRecipient, setFormRecipient] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formStreet, setFormStreet] = useState<string>("");
  const [formArea, setFormArea] = useState<string>("");
  const [formCity, setFormCity] = useState<string>("Faisalabad");
  const [formPostal, setFormPostal] = useState<string>("");
  const [formIsDefault, setFormIsDefault] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    // Read from localStorage or initialize
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sui_dhaga_customer_addresses");
        if (stored) {
          const parsed = JSON.parse(stored) as unknown;
          if (Array.isArray(parsed)) {
            const list = parsed as CustomerAddressItem[];
            queueMicrotask(() => {
              if (!active) return;
              setAddresses(list);
              setIsLoading(false);
            });
            return () => {
              active = false;
            };
          }
        }
      } catch {}
    }

    // Check if user is authenticated
    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");
    if (hasToken) {
      // Try to populate from user profile
      userService.getMe().then((res) => {
        if (!active) return;
        if (res?.data && res.data.address) {
          const singleAddr: CustomerAddressItem = {
            id: `addr-${Date.now()}`,
            label: "Home",
            recipientName: res.data.full_name || res.data.name || "Customer",
            phone: res.data.phone || "",
            street: res.data.address,
            area: "Main",
            city: res.data.city || "Faisalabad",
            isDefault: true,
          };
          setAddresses([singleAddr]);
          localStorage.setItem("sui_dhaga_customer_addresses", JSON.stringify([singleAddr]));
        } else {
          setAddresses([]);
        }
      }).catch(() => {
        if (active) setAddresses([]);
      }).finally(() => {
        if (active) setIsLoading(false);
      });
    } else {
      queueMicrotask(() => {
        if (!active) return;
        setAddresses(initialDummyAddresses);
        setIsLoading(false);
      });
    }
    return () => {
      active = false;
    };
  }, []);

  const saveAddressesToStorage = (list: CustomerAddressItem[]) => {
    setAddresses(list);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sui_dhaga_customer_addresses", JSON.stringify(list));
      } catch {}
    }
  };

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setFormLabel("Home");
    setFormRecipient("");
    setFormPhone("");
    setFormStreet("");
    setFormArea("");
    setFormCity("Faisalabad");
    setFormPostal("");
    setFormIsDefault(addresses.length === 0);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CustomerAddressItem) => {
    setEditingAddress(item);
    setFormLabel(item.label);
    setFormRecipient(item.recipientName);
    setFormPhone(item.phone);
    setFormStreet(item.street);
    setFormArea(item.area);
    setFormCity(item.city);
    setFormPostal(item.postalCode || "");
    setFormIsDefault(item.isDefault);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this delivery address?")) return;
    const remaining = addresses.filter((a) => a.id !== id);
    if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    saveAddressesToStorage(remaining);
  };

  const handleSetDefault = async (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveAddressesToStorage(updated);

    const target = updated.find((a) => a.id === id);
    if (target) {
      try {
        await userService.updateMe({
          address: `${target.street}, ${target.area}`,
          city: target.city,
        });
      } catch {}
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAddr: CustomerAddressItem = {
      id: editingAddress ? editingAddress.id : `addr-${Date.now()}`,
      label: formLabel,
      recipientName: formRecipient.trim(),
      phone: formPhone.trim(),
      street: formStreet.trim(),
      area: formArea.trim(),
      city: formCity.trim(),
      postalCode: formPostal.trim() || undefined,
      isDefault: formIsDefault,
    };

    let updatedList: CustomerAddressItem[];
    if (editingAddress) {
      updatedList = addresses.map((a) => (a.id === newAddr.id ? newAddr : a));
    } else {
      updatedList = [...addresses, newAddr];
    }

    if (formIsDefault) {
      updatedList = updatedList.map((a) => ({
        ...a,
        isDefault: a.id === newAddr.id,
      }));

      // Sync with backend profile
      try {
        await userService.updateMe({
          address: `${newAddr.street}, ${newAddr.area}`,
          city: newAddr.city,
        });
      } catch {}
    }

    saveAddressesToStorage(updatedList);
    setIsModalOpen(false);
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
            <CustomerSidebar active="addresses" />

            <main className="customer-main-feed-area">
              {/* Breadcrumb */}
              <nav className="customer-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={14} />
                <Link href="/customer/dashboard">Dashboard</Link>
                <ChevronRight size={14} />
                <span className="crumb-current">Saved Addresses</span>
              </nav>

              {/* Header */}
              <div className="customer-header-row">
                <div>
                  <h1 className="customer-page-title">Delivery Addresses</h1>
                  <p className="customer-page-subtitle">
                    Manage shipping addresses for tailored outfit deliveries and fabric pickup.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="btn-primary-sd"
                >
                  <Plus size={16} />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Address Cards Grid */}
              {isLoading ? (
                <CardsGridSkeleton count={2} cardHeight={180} />
              ) : addresses.length === 0 ? (
                <div className="customer-empty-state-box">
                  <div className="customer-empty-state-icon">
                    <MapPin size={36} />
                  </div>
                  <h2 className="customer-empty-state-title">No Saved Addresses Yet</h2>
                  <p className="customer-empty-state-desc">
                    Save your delivery address once so our verified tailors and courier partners can deliver your bespoke garments safely to your doorstep.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenAdd}
                    className="btn-accent-sd"
                  >
                    <Plus size={16} />
                    <span>Add Delivery Address</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                  {addresses.map((addr) => (
                    <article
                      key={addr.id}
                      className="customer-section-card"
                      style={{
                        position: "relative",
                        border: addr.isDefault ? "2px solid #078b87" : "1px solid #e2e8f0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        {/* Label Badge & Default indicator */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: 700,
                              background: addr.label === "Home" ? "#f0fdf4" : addr.label === "Office" ? "#eff6ff" : "#fef3c7",
                              color: addr.label === "Home" ? "#166534" : addr.label === "Office" ? "#1e40af" : "#92400e"
                            }}
                          >
                            {addr.label === "Home" ? <Home size={13} /> : addr.label === "Office" ? <Briefcase size={13} /> : <MapPin size={13} />}
                            {addr.label}
                          </span>

                          {addr.isDefault && (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#078b87",
                                background: "#f0fdfa",
                                border: "1px solid #ccfbf1",
                                padding: "3px 8px",
                                borderRadius: "6px"
                              }}
                            >
                              <Check size={12} /> Default
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: "0 0 6px 0" }}>
                          {addr.recipientName}
                        </h3>

                        <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.5, margin: "0 0 10px 0" }}>
                          {addr.street}, {addr.area}
                          <br />
                          <strong>{addr.city}</strong> {addr.postalCode ? `(${addr.postalCode})` : ""}
                        </p>

                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b" }}>
                          <Phone size={13} />
                          <span>{addr.phone}</span>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "20px",
                          paddingTop: "14px",
                          borderTop: "1px solid #f1f5f9"
                        }}
                      >
                        {!addr.isDefault ? (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(addr.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#078b87",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor: "pointer",
                              padding: 0
                            }}
                          >
                            Set as default
                          </button>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#64748b" }}>Primary address</span>
                        )}

                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(addr)}
                            title="Edit Address"
                            style={{
                              background: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              padding: "6px 10px",
                              color: "#475569",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center"
                            }}
                          >
                            <Edit2 size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(addr.id)}
                            title="Delete Address"
                            style={{
                              background: "#fef2f2",
                              border: "1px solid #fee2e2",
                              borderRadius: "8px",
                              padding: "6px 10px",
                              color: "#dc2626",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center"
                            }}
                          >
                            <Trash2 size={13} />
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

        {/* Modal: Add / Edit Address */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: "20px"
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                width: "100%",
                maxWidth: "520px",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "28px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1e293b", margin: 0 }}>
                  {editingAddress ? "Edit Address" : "Add Delivery Address"}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Type pills */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
                  {(["Home", "Office", "Other"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormLabel(type)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "8px",
                        border: formLabel === type ? "2px solid #078b87" : "1px solid #e2e8f0",
                        background: formLabel === type ? "#f0fdfa" : "#fff",
                        color: formLabel === type ? "#078b87" : "#475569",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formRecipient}
                    onChange={(e) => setFormRecipient(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Street Address & House/Flat # *
                  </label>
                  <input
                    type="text"
                    required
                    value={formStreet}
                    onChange={(e) => setFormStreet(e.target.value)}
                    placeholder="e.g. House 42, Street 8, Block B"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                      Area / Colony *
                    </label>
                    <input
                      type="text"
                      required
                      value={formArea}
                      onChange={(e) => setFormArea(e.target.value)}
                      placeholder="e.g. People's Colony"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="e.g. Faisalabad"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "18px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={formPostal}
                    onChange={(e) => setFormPostal(e.target.value)}
                    placeholder="e.g. 38000"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13.5px", color: "#334155" }}>
                    <input
                      type="checkbox"
                      checked={formIsDefault}
                      onChange={(e) => setFormIsDefault(e.target.checked)}
                      style={{ width: "16px", height: "16px", accentColor: "#078b87" }}
                    />
                    <span>Set as primary delivery address</span>
                  </label>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-outline-sd"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-sd"
                  >
                    {editingAddress ? "Save Changes" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PublicShell>
  );
}

