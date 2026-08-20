"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Scissors,
  Clock,
  DollarSign,
  AlertTriangle
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-services-view.css";

export interface TailorServiceRecord {
  id: string;
  name: string;
  category: string;
  startingPrice: number; // e.g. 2000
  deliveryTime: string; // e.g. "7 - 10 days"
  status: "active" | "inactive";
}

const initialTailorServices: TailorServiceRecord[] = [
  {
    id: "srv-1",
    name: "Custom Anarkali Suit",
    category: "Women's Formal",
    startingPrice: 2000,
    deliveryTime: "7 - 10 days",
    status: "active"
  },
  {
    id: "srv-2",
    name: "Lehenga Stitching",
    category: "Bridal Wear",
    startingPrice: 3500,
    deliveryTime: "10 - 15 days",
    status: "active"
  },
  {
    id: "srv-3",
    name: "Blouse Stitching",
    category: "Ethnic Wear",
    startingPrice: 800,
    deliveryTime: "3 - 4 days",
    status: "active"
  },
  {
    id: "srv-4",
    name: "Sherwani Stitching",
    category: "Men's Formal",
    startingPrice: 3500,
    deliveryTime: "7 - 10 days",
    status: "active"
  },
  {
    id: "srv-5",
    name: "Kurta Set",
    category: "Casual & Semi-Formal",
    startingPrice: 1200,
    deliveryTime: "5 - 7 days",
    status: "active"
  },
  {
    id: "srv-6",
    name: "Alterations",
    category: "Alterations & Fitting",
    startingPrice: 300,
    deliveryTime: "2 - 3 days",
    status: "active"
  }
];

const KEY_TAILOR_SERVICES = "sui_dhaga_tailor_services_list";

export function TailorServicesPage() {
  const [services, setServices] = useState<TailorServiceRecord[]>(initialTailorServices);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<TailorServiceRecord | null>(null);
  const [deletingService, setDeletingService] = useState<TailorServiceRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: "",
    category: "Women's Wear",
    startingPrice: 1500,
    deliveryTime: "5 - 7 days",
    status: "active" as "active" | "inactive"
  });

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(KEY_TAILOR_SERVICES);
        if (saved) {
          setServices(JSON.parse(saved));
        } else {
          localStorage.setItem(KEY_TAILOR_SERVICES, JSON.stringify(initialTailorServices));
        }
      } catch (e) {
        console.warn("Failed to load services from localStorage:", e);
      }
    }
  }, []);

  const saveServicesToStorage = (updated: TailorServiceRecord[]) => {
    setServices(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(KEY_TAILOR_SERVICES, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save services to localStorage:", e);
      }
    }
  };

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      category: "Women's Formal",
      startingPrice: 1500,
      deliveryTime: "5 - 7 days",
      status: "active"
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (srv: TailorServiceRecord) => {
    setEditingService(srv);
    setFormData({
      name: srv.name,
      category: srv.category,
      startingPrice: srv.startingPrice,
      deliveryTime: srv.deliveryTime,
      status: srv.status
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: TailorServiceRecord = {
      id: `srv-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      startingPrice: Number(formData.startingPrice),
      deliveryTime: formData.deliveryTime,
      status: formData.status
    };

    const updated = [newService, ...services];
    saveServicesToStorage(updated);
    setIsAddModalOpen(false);
    setToastMessage(`✓ Service "${newService.name}" added successfully.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const updated = services.map((s) =>
      s.id === editingService.id
        ? {
            ...s,
            name: formData.name,
            category: formData.category,
            startingPrice: Number(formData.startingPrice),
            deliveryTime: formData.deliveryTime,
            status: formData.status
          }
        : s
    );

    saveServicesToStorage(updated);
    setEditingService(null);
    setToastMessage(`✓ Service "${formData.name}" updated successfully.`);
  };

  const handleConfirmDelete = () => {
    if (!deletingService) return;

    const updated = services.filter((s) => s.id !== deletingService.id);
    saveServicesToStorage(updated);
    setToastMessage(`Removed "${deletingService.name}" from your services list.`);
    setDeletingService(null);
  };

  return (
    <div className="ts-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="ts-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="services" />

        {/* Main Content Area */}
        <main className="ts-main-content">
          {/* Header Area matching reference image */}
          <div className="ts-header-wrap">
            <div>
              <h1 className="ts-title">My Services</h1>
              <p className="ts-subtitle">Add and manage the services you offer.</p>
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="ts-add-btn"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Add New Service</span>
            </button>
          </div>

          {/* Services Table Card matching exact design */}
          <div className="ts-table-card">
            <div className="ts-table-scroll">
              <table className="ts-table">
                <thead>
                  <tr>
                    <th className="ts-th" style={{ width: "28%" }}>Service</th>
                    <th className="ts-th" style={{ width: "20%" }}>Starting Price</th>
                    <th className="ts-th" style={{ width: "22%" }}>Delivery Time</th>
                    <th className="ts-th" style={{ width: "16%" }}>Status</th>
                    <th className="ts-th" style={{ width: "14%", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                        No services added yet. Click &quot;Add New Service&quot; above to get started.
                      </td>
                    </tr>
                  ) : (
                    services.map((srv) => (
                      <tr key={srv.id}>
                        {/* Service Name */}
                        <td className="ts-td">
                          <span className="ts-service-name">{srv.name}</span>
                        </td>

                        {/* Starting Price */}
                        <td className="ts-td">
                          <span className="ts-price">
                            ₹{srv.startingPrice.toLocaleString("en-IN")}
                          </span>
                        </td>

                        {/* Delivery Time */}
                        <td className="ts-td">
                          <span className="ts-delivery-time">{srv.deliveryTime}</span>
                        </td>

                        {/* Status */}
                        <td className="ts-td">
                          {srv.status === "active" ? (
                            <span className="ts-status-badge-active">Active</span>
                          ) : (
                            <span className="ts-status-badge-inactive">Inactive</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="ts-td" style={{ textAlign: "right" }}>
                          <div className="ts-actions-wrap" style={{ justifyContent: "flex-end" }}>
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(srv)}
                              className="ts-action-icon-btn ts-edit-icon"
                              title="Edit Service"
                            >
                              <Edit2 size={16} />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => setDeletingService(srv)}
                              className="ts-action-icon-btn ts-delete-icon"
                              title="Delete Service"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add New Service Modal */}
      {isAddModalOpen && (
        <div className="ts-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="ts-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                Add New Service
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAdd}>
              <div className="ts-modal-body">
                <div>
                  <label className="ts-form-label">Service Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Custom Bridal Lehenga"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label className="ts-form-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="ts-select"
                    >
                      <option value="Women's Formal">Women&apos;s Formal</option>
                      <option value="Bridal Wear">Bridal Wear</option>
                      <option value="Ethnic Wear">Ethnic Wear</option>
                      <option value="Men's Formal">Men&apos;s Formal</option>
                      <option value="Casual & Semi-Formal">Casual &amp; Semi-Formal</option>
                      <option value="Alterations & Fitting">Alterations &amp; Fitting</option>
                    </select>
                  </div>

                  <div>
                    <label className="ts-form-label">Starting Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min="100"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label className="ts-form-label">Delivery Timeline *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 7 - 10 days"
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      className="ts-input"
                    />
                  </div>

                  <div>
                    <label className="ts-form-label">Listing Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                      className="ts-select"
                    >
                      <option value="active">Active (Visible to clients)</option>
                      <option value="inactive">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="ts-modal-footer">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    color: "#374151",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ts-add-btn"
                  style={{ borderRadius: "8px", padding: "10px 22px" }}
                >
                  <Plus size={16} />
                  <span>Create Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="ts-modal-backdrop" onClick={() => setEditingService(null)}>
          <div className="ts-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                Edit Service: {editingService.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="ts-modal-body">
                <div>
                  <label className="ts-form-label">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ts-input"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label className="ts-form-label">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="ts-select"
                    >
                      <option value="Women's Formal">Women&apos;s Formal</option>
                      <option value="Bridal Wear">Bridal Wear</option>
                      <option value="Ethnic Wear">Ethnic Wear</option>
                      <option value="Men's Formal">Men&apos;s Formal</option>
                      <option value="Casual & Semi-Formal">Casual &amp; Semi-Formal</option>
                      <option value="Alterations & Fitting">Alterations &amp; Fitting</option>
                    </select>
                  </div>

                  <div>
                    <label className="ts-form-label">Starting Price (₹) *</label>
                    <input
                      type="number"
                      required
                      min="100"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                      className="ts-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label className="ts-form-label">Delivery Timeline *</label>
                    <input
                      type="text"
                      required
                      value={formData.deliveryTime}
                      onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                      className="ts-input"
                    />
                  </div>

                  <div>
                    <label className="ts-form-label">Listing Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                      className="ts-select"
                    >
                      <option value="active">Active (Visible to clients)</option>
                      <option value="inactive">Inactive (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="ts-modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    padding: "10px 18px",
                    fontWeight: 700,
                    color: "#374151",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="ts-add-btn"
                  style={{ borderRadius: "8px", padding: "10px 22px" }}
                >
                  <Check size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingService && (
        <div className="ts-modal-backdrop" onClick={() => setDeletingService(null)}>
          <div className="ts-modal-card" style={{ maxWidth: "460px" }} onClick={(e) => e.stopPropagation()}>
            <div className="ts-modal-header">
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#DC2626" }}>
                Delete Service
              </h3>
              <button
                type="button"
                onClick={() => setDeletingService(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="ts-modal-body">
              <p style={{ fontSize: "0.92rem", color: "#374151", margin: 0, lineHeight: 1.5 }}>
                Are you sure you want to remove <strong>&quot;{deletingService.name}&quot;</strong> from your services catalog? Clients will no longer be able to book this service.
              </p>
            </div>

            <div className="ts-modal-footer">
              <button
                type="button"
                onClick={() => setDeletingService(null)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  padding: "10px 18px",
                  fontWeight: 700,
                  color: "#374151",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  background: "#DC2626",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 22px",
                  fontWeight: 750,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
