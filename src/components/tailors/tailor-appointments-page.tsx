"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  X,
  Check,
  User,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-appointments-view.css";

export type AppointmentStatus = "upcoming" | "request" | "completed" | "rejected";

export interface TailorAppointmentItem {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAvatar: string;
  serviceName: string;
  type: "In-Shop Fitting" | "Home Measurement Visit" | "Bespoke Trial";
  date: string;
  time: string;
  address?: string;
  notes?: string;
  status: AppointmentStatus;
}

const initialAppointmentsList: TailorAppointmentItem[] = [
  {
    id: "apt-1",
    customerName: "Neha Verma",
    customerPhone: "+91 98765-11223",
    customerEmail: "neha.verma@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    serviceName: "Anarkali Suit Fitting",
    type: "In-Shop Fitting",
    date: "20 May 2024",
    time: "10:00 AM",
    address: "Shop #14, Main Market, Fashion Enclave",
    notes: "First fitting for flare and waist adjustment.",
    status: "upcoming"
  },
  {
    id: "apt-2",
    customerName: "Pooja Mehta",
    customerPhone: "+91 98112-33445",
    customerEmail: "pooja.mehta@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    serviceName: "Blouse Stitching",
    type: "In-Shop Fitting",
    date: "20 May 2024",
    time: "12:30 PM",
    address: "Shop #14, Main Market, Fashion Enclave",
    notes: "Measurement verification for padded blouse.",
    status: "upcoming"
  },
  {
    id: "apt-3",
    customerName: "Rohan Singh",
    customerPhone: "+91 99001-22334",
    customerEmail: "rohan.singh@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    serviceName: "Sherwani Trial",
    type: "Bespoke Trial",
    date: "21 May 2024",
    time: "04:00 PM",
    address: "Shop #14, Main Market, Fashion Enclave",
    notes: "Wedding sherwani shoulder and sleeve length check.",
    status: "request"
  },
  {
    id: "apt-4",
    customerName: "Ayesha Khan",
    customerPhone: "+91 98334-55667",
    customerEmail: "ayesha.khan@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    serviceName: "Lehenga Fitting",
    type: "In-Shop Fitting",
    date: "21 May 2024",
    time: "05:30 PM",
    address: "Shop #14, Main Market, Fashion Enclave",
    notes: "Bridal lehenga can-can and waistband check.",
    status: "request"
  },
  {
    id: "apt-5",
    customerName: "Sneha Das",
    customerPhone: "+91 98450-99887",
    customerEmail: "sneha.das@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
    serviceName: "Saree Blouse Trial",
    type: "In-Shop Fitting",
    date: "22 May 2024",
    time: "11:30 AM",
    status: "upcoming"
  },
  {
    id: "apt-6",
    customerName: "Karan Malhotra",
    customerPhone: "+91 98223-44556",
    customerEmail: "karan.malhotra@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    serviceName: "Tuxedo Fitting",
    type: "In-Shop Fitting",
    date: "23 May 2024",
    time: "02:00 PM",
    status: "upcoming"
  },
  {
    id: "apt-7",
    customerName: "Meera Iyer",
    customerPhone: "+91 98110-77889",
    customerEmail: "meera.iyer@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    serviceName: "Chikankari Kurti Fitting",
    type: "In-Shop Fitting",
    date: "15 May 2024",
    time: "03:00 PM",
    status: "completed"
  },
  {
    id: "apt-8",
    customerName: "Vikram Singh",
    customerPhone: "+91 98770-33221",
    customerEmail: "vikram.singh@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    serviceName: "Nehru Jacket Trial",
    type: "In-Shop Fitting",
    date: "14 May 2024",
    time: "01:00 PM",
    status: "completed"
  },
  {
    id: "apt-9",
    customerName: "Ananya Das",
    customerPhone: "+91 98441-22334",
    customerEmail: "ananya.das@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&auto=format&fit=crop&q=80",
    serviceName: "Bridal Blouse Fitting",
    type: "In-Shop Fitting",
    date: "12 May 2024",
    time: "11:00 AM",
    status: "completed"
  },
  {
    id: "apt-10",
    customerName: "Zainab Rashid",
    customerPhone: "+91 98552-33441",
    customerEmail: "zainab.rashid@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    serviceName: "Sharara Set Trial",
    type: "In-Shop Fitting",
    date: "10 May 2024",
    time: "04:30 PM",
    status: "completed"
  },
  {
    id: "apt-11",
    customerName: "Rahul Verma",
    customerPhone: "+91 98112-99881",
    customerEmail: "rahul.verma@email.com",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    serviceName: "Kurta Trial",
    type: "In-Shop Fitting",
    date: "08 May 2024",
    time: "05:00 PM",
    status: "completed"
  }
];

const KEY_TAILOR_APPOINTMENTS = "sui_dhaga_tailor_appointments_list";

export function TailorAppointmentsPage() {
  const [appointments, setAppointments] = useState<TailorAppointmentItem[]>(initialAppointmentsList);
  const [activeTab, setActiveTab] = useState<string>("all_view"); // "all_view" shows the curated table from the screenshot, or specific tab filters
  const [selectedAppointment, setSelectedAppointment] = useState<TailorAppointmentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(KEY_TAILOR_APPOINTMENTS);
        if (saved) {
          setAppointments(JSON.parse(saved));
        } else {
          localStorage.setItem(KEY_TAILOR_APPOINTMENTS, JSON.stringify(initialAppointmentsList));
        }
      } catch (e) {
        console.warn("Failed to load appointments from localStorage:", e);
      }
    }
  }, []);

  const saveAppointmentsToStorage = (updated: TailorAppointmentItem[]) => {
    setAppointments(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(KEY_TAILOR_APPOINTMENTS, JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save appointments to localStorage:", e);
      }
    }
  };

  const countUpcoming = appointments.filter((a) => a.status === "upcoming").length;
  const countRequests = appointments.filter((a) => a.status === "request").length;
  const countCompleted = appointments.filter((a) => a.status === "completed").length;

  // Filter list by tab
  const displayedAppointments = appointments.filter((item) => {
    if (activeTab === "upcoming") return item.status === "upcoming";
    if (activeTab === "requests") return item.status === "request";
    if (activeTab === "completed") return item.status === "completed";
    // Default view shows the 4 primary rows matching the screenshot
    return true;
  }).slice(0, activeTab === "all_view" ? 4 : 20);

  const handleAcceptRequest = (item: TailorAppointmentItem) => {
    const updated = appointments.map((a) =>
      a.id === item.id ? { ...a, status: "upcoming" as AppointmentStatus } : a
    );
    saveAppointmentsToStorage(updated);
    setToastMessage(`✓ Appointment request from ${item.customerName} accepted.`);
  };

  const handleRejectRequest = (item: TailorAppointmentItem) => {
    const updated = appointments.filter((a) => a.id !== item.id);
    saveAppointmentsToStorage(updated);
    setToastMessage(`Appointment request from ${item.customerName} declined.`);
  };

  return (
    <div className="tap-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tap-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="appointments" />

        {/* Main Content Area */}
        <main className="tap-main-content">
          {/* Header Area */}
          <div className="tap-header">
            <h1 className="tap-title">Appointments</h1>
          </div>

          {/* Filter Tabs matching exact design */}
          <div className="tap-tabs-row">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "upcoming" ? "all_view" : "upcoming")}
              className={`tap-tab-btn ${activeTab === "upcoming" || activeTab === "all_view" ? "active" : ""}`}
            >
              Upcoming ({countUpcoming})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("requests")}
              className={`tap-tab-btn ${activeTab === "requests" ? "active" : ""}`}
            >
              Requests ({countRequests})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`tap-tab-btn ${activeTab === "completed" ? "active" : ""}`}
            >
              Completed ({countCompleted})
            </button>
          </div>

          {/* Appointments List Card matching exact design */}
          <div className="tap-card-container">
            {displayedAppointments.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 20px", color: "#6B7280" }}>
                No appointments found in this category.
              </div>
            ) : (
              displayedAppointments.map((item) => (
                <div key={item.id} className="tap-item-row">
                  {/* Left Block: Customer Avatar + Name + Service */}
                  <div className="tap-customer-block">
                    <img
                      src={item.customerAvatar}
                      alt={item.customerName}
                      className="tap-avatar"
                    />
                    <div className="tap-name-service">
                      <p className="tap-customer-name">{item.customerName}</p>
                      <p className="tap-service-name">{item.serviceName}</p>
                    </div>
                  </div>

                  {/* Date Column */}
                  <p className="tap-date-col">{item.date}</p>

                  {/* Time Column */}
                  <p className="tap-time-col">{item.time}</p>

                  {/* Status Badge */}
                  <div>
                    {item.status === "upcoming" && (
                      <span className="tap-badge-upcoming">Upcoming</span>
                    )}
                    {item.status === "request" && (
                      <span className="tap-badge-requests">Requests</span>
                    )}
                    {item.status === "completed" && (
                      <span className="tap-badge-completed">Completed</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="tap-actions-cell">
                    {item.status === "upcoming" || item.status === "completed" ? (
                      <button
                        type="button"
                        onClick={() => setSelectedAppointment(item)}
                        className="tap-btn-view"
                      >
                        View
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleAcceptRequest(item)}
                          className="tap-btn-accept"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectRequest(item)}
                          className="tap-btn-reject"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* Bottom View All Appointments Button matching reference */}
            <div className="tap-bottom-cta-wrap">
              <button
                type="button"
                onClick={() => {
                  setActiveTab(activeTab === "all_full" ? "all_view" : "all_full");
                  setToastMessage("Displaying all appointment bookings and history.");
                }}
                className="tap-btn-view-all"
              >
                View All Appointments
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Appointment Inspection Modal */}
      {selectedAppointment && (
        <div className="tap-modal-backdrop" onClick={() => setSelectedAppointment(null)}>
          <div className="tap-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="tap-modal-header">
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#111827" }}>
                  Appointment Details
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "2px 0 0" }}>
                  {selectedAppointment.date} at {selectedAppointment.time}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="tap-modal-body">
              {/* Customer Row */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#FAF8F5", padding: "14px", borderRadius: "12px", border: "1px solid #EAE6DF" }}>
                <img
                  src={selectedAppointment.customerAvatar}
                  alt={selectedAppointment.customerName}
                  style={{ width: "54px", height: "54px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", margin: "0 0 2px" }}>
                    {selectedAppointment.customerName}
                  </h4>
                  <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: 0 }}>
                    {selectedAppointment.customerPhone} · {selectedAppointment.customerEmail}
                  </p>
                </div>
              </div>

              {/* Service & Type */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "#F9FAFB", padding: "12px", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>Service</span>
                  <p style={{ fontSize: "0.92rem", fontWeight: 750, color: "#111827", margin: "2px 0 0" }}>
                    {selectedAppointment.serviceName}
                  </p>
                </div>

                <div style={{ background: "#F9FAFB", padding: "12px", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>Appointment Type</span>
                  <p style={{ fontSize: "0.92rem", fontWeight: 750, color: "#111827", margin: "2px 0 0" }}>
                    {selectedAppointment.type}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {selectedAppointment.notes && (
                <div style={{ background: "#F9FAFB", padding: "12px", borderRadius: "10px", border: "1px solid #E5E7EB" }}>
                  <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>Notes & Fitting Details</span>
                  <p style={{ fontSize: "0.88rem", color: "#374151", margin: "4px 0 0" }}>
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="tap-modal-footer">
              <Link
                href="/tailor/messages"
                className="tap-btn-accept"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
              >
                <MessageSquare size={15} />
                <span>Message Customer</span>
              </Link>

              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontWeight: 700,
                  color: "#374151",
                  cursor: "pointer"
                }}
              >
                Close
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
