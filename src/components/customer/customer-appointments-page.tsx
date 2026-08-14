"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  Clock,
  Star,
  CheckCircle2,
  X,
  AlertCircle,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Scissors
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  fetchCustomerAppointmentsApi,
  rescheduleCustomerAppointmentApi,
  cancelCustomerAppointmentApi,
  initialAppointmentsData,
  AppointmentItem
} from "@/lib/appointments-data";

type TabType = "Upcoming" | "Completed" | "Cancelled";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AVAILABLE_RESCHEDULE_SLOTS = [
  "9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"
];

export function CustomerAppointmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Upcoming");
  const [allAppointments, setAllAppointments] = useState<AppointmentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal States
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("Schedule conflict on my side");
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  // Reschedule Calendar State
  const today = new Date();
  const [rescheduleYear, setRescheduleYear] = useState<number>(today.getFullYear());
  const [rescheduleMonth, setRescheduleMonth] = useState<number>(today.getMonth());
  const [rescheduleDate, setRescheduleDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  });
  const [rescheduleTimeSlot, setRescheduleTimeSlot] = useState<string>("2:00 PM");

  // Load appointments
  useEffect(() => {
    let isSubscribed = true;
    fetchCustomerAppointmentsApi("All").then((data) => {
      if (isSubscribed) {
        setAllAppointments(data);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Counts for tabs
  const upcomingCount = allAppointments.filter((a) => a.status === "Upcoming").length;
  const completedCount = allAppointments.filter((a) => a.status === "Completed").length;
  const cancelledCount = allAppointments.filter((a) => a.status === "Cancelled").length;

  const currentList = allAppointments.filter((a) => a.status === activeTab);

  // Reschedule Handlers
  const handleOpenReschedule = (apt: AppointmentItem) => {
    setSelectedAppointment(apt);
    setRescheduleTimeSlot(apt.time || "2:00 PM");
    setIsDetailsOpen(false);
    setIsRescheduleOpen(true);
  };

  const handleConfirmReschedule = async () => {
    if (!selectedAppointment) return;
    setIsActionLoading(true);

    const formattedDate = `${rescheduleDate.getDate()} ${MONTH_NAMES[rescheduleDate.getMonth()]}, ${rescheduleDate.getFullYear()}`;

    try {
      const res = await rescheduleCustomerAppointmentApi(
        selectedAppointment.id,
        formattedDate,
        rescheduleTimeSlot
      );
      if (res.success) {
        setAllAppointments((prev) =>
          prev.map((item) =>
            item.id === selectedAppointment.id
              ? { ...item, date: formattedDate, time: rescheduleTimeSlot }
              : item
          )
        );
        setIsRescheduleOpen(false);
        alert(`Appointment successfully rescheduled to ${formattedDate} at ${rescheduleTimeSlot}!`);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to reschedule. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Cancel Handlers
  const handleOpenCancel = (apt: AppointmentItem) => {
    setSelectedAppointment(apt);
    setIsDetailsOpen(false);
    setIsCancelOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointment) return;
    setIsActionLoading(true);

    try {
      const res = await cancelCustomerAppointmentApi(selectedAppointment.id, cancelReason);
      if (res.success) {
        setAllAppointments((prev) =>
          prev.map((item) =>
            item.id === selectedAppointment.id
              ? { ...item, status: "Cancelled", cancelReason }
              : item
          )
        );
        setIsCancelOpen(false);
        setActiveTab("Cancelled");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to cancel appointment. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Add to Calendar .ics generator
  const handleDownloadIcs = (apt: AppointmentItem) => {
    const title = `Tailor Appointment with ${apt.tailorName}`;
    const desc = `Service: ${apt.serviceName}\nAddress: ${apt.tailorAddress}\nReference: ${apt.referenceNo}`;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sui Dhaga//Appointments//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${apt.tailorAddress}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `appointment-${apt.referenceNo}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calendar Helpers for Reschedule Modal
  const daysInMonth = new Date(rescheduleYear, rescheduleMonth + 1, 0).getDate();
  const firstDay = new Date(rescheduleYear, rescheduleMonth, 1).getDay();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`pad-${i}`} className="cal-day empty" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(rescheduleYear, rescheduleMonth, day);
    const isPast = dayDate < startOfToday;
    const isSelected =
      rescheduleDate.getFullYear() === rescheduleYear &&
      rescheduleDate.getMonth() === rescheduleMonth &&
      rescheduleDate.getDate() === day;

    calendarDays.push(
      <button
        key={`day-${day}`}
        type="button"
        disabled={isPast}
        onClick={() => setRescheduleDate(new Date(rescheduleYear, rescheduleMonth, day))}
        className={`cal-day-btn ${isSelected ? "selected" : ""} ${isPast ? "disabled" : ""}`}
      >
        {day}
      </button>
    );
  }

  return (
    <PublicShell>
      <div className="customer-appointments-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="appointments-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="appointments-container">
          {/* Main 2-Column Layout Grid: Reused Community Sidebar + Appointments Content */}
          <div className="appointments-layout-grid">
            {/* 1. Left Customer Navigation Sidebar (Reused Community Sidebar) */}
            <aside className="customer-sidebar-nav">
              <nav className="sidebar-menu-list">
                <Link href="/customer/dashboard" className="sidebar-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                {/* Active Appointments Tab */}
                <Link href="/customer/appointments" className="sidebar-item active">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>

                <Link href="/customer/orders" className="sidebar-item">
                  <Package size={18} />
                  <span>Orders</span>
                </Link>

                <Link href="/customer/measurements" className="sidebar-item">
                  <Ruler size={18} />
                  <span>Measurements</span>
                </Link>

                <Link href="/customer/saved-designs" className="sidebar-item">
                  <FolderHeart size={18} />
                  <span>Saved Designs</span>
                </Link>

                <Link href="/customer/wishlist" className="sidebar-item">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>

                <Link href="/community" className="sidebar-item">
                  <Users size={18} />
                  <span>Community</span>
                </Link>

                <Link href="/messages" className="sidebar-item">
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </Link>

                <Link href="/customer/addresses" className="sidebar-item">
                  <MapPin size={18} />
                  <span>Addresses</span>
                </Link>

                <Link href="/customer/payments" className="sidebar-item">
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                </Link>

                <Link href="/notifications" className="sidebar-item">
                  <Bell size={18} />
                  <span>Notifications</span>
                </Link>

                <Link href="/customer/settings" className="sidebar-item">
                  <Settings size={18} />
                  <span>Account Settings</span>
                </Link>

                <Link href="/auth/login" className="sidebar-item logout-btn">
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </nav>
            </aside>

            {/* 2. Main Appointments Content Area */}
            <main className="appointments-main-content">
              {/* Header Title Row with CTA */}
              <div className="appointments-header-row">
                <div className="header-title-block">
                  <h1 className="appointments-page-title">My Appointments</h1>
                  <p className="appointments-page-subtitle">
                    Manage all your tailor appointments in one place.
                  </p>
                </div>

                {/* Primary Top-Right CTA */}
                <Link href="/tailors" className="book-new-appointment-btn">
                  Book New Appointment
                </Link>
              </div>

              {/* Segmented Filter Tabs */}
              <div className="appointments-tabs-bar" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Upcoming"}
                  onClick={() => setActiveTab("Upcoming")}
                  className={`tab-btn ${activeTab === "Upcoming" ? "active" : ""}`}
                >
                  Upcoming ({upcomingCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Completed"}
                  onClick={() => setActiveTab("Completed")}
                  className={`tab-btn ${activeTab === "Completed" ? "active" : ""}`}
                >
                  Completed ({completedCount})
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Cancelled"}
                  onClick={() => setActiveTab("Cancelled")}
                  className={`tab-btn ${activeTab === "Cancelled" ? "active" : ""}`}
                >
                  Cancelled ({cancelledCount})
                </button>
              </div>

              {/* Appointments List Cards */}
              <div className="appointments-cards-list">
                {currentList.length === 0 ? (
                  <div className="empty-appointments-card">
                    <CalendarCheck size={48} className="empty-icon" />
                    <h3 className="empty-title">No {activeTab.toLowerCase()} appointments found</h3>
                    <p className="empty-subtitle">
                      {activeTab === "Upcoming"
                        ? "You have no upcoming tailor bookings scheduled."
                        : `No ${activeTab.toLowerCase()} appointment records to display.`}
                    </p>
                    <Link href="/tailors" className="empty-book-cta">
                      Find a Tailor &amp; Book Now
                    </Link>
                  </div>
                ) : (
                  currentList.map((apt) => (
                    <article key={apt.id} className="appointment-item-card">
                      {/* Tailor Avatar */}
                      <div className="card-avatar-box">
                        <img
                          src={apt.tailorAvatar}
                          alt={apt.tailorName}
                          className="card-avatar-img"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/home/tailor-rekha.png";
                          }}
                        />
                      </div>

                      {/* Main Info Details */}
                      <div className="card-info-box">
                        <div className="card-datetime-row">
                          <span className="datetime-text">
                            {apt.date} • {apt.time}
                          </span>
                        </div>

                        <h2 className="tailor-name-heading">{apt.tailorName}</h2>
                        <span className="service-name-text">{apt.serviceName}</span>
                        <span className="distance-location-text">{apt.distance}</span>
                      </div>

                      {/* Right Action & Status Box */}
                      <div className="card-actions-box">
                        {/* Status Badge */}
                        <span
                          className={`status-pill ${
                            apt.status === "Completed"
                              ? "completed"
                              : apt.status === "Cancelled"
                              ? "cancelled"
                              : "upcoming"
                          }`}
                        >
                          {apt.status}
                        </span>

                        {/* Action Buttons */}
                        <div className="action-buttons-group">
                          {apt.status === "Upcoming" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleOpenReschedule(apt)}
                                className="action-btn secondary-btn"
                              >
                                Reschedule
                              </button>
                              <Link
                                href={`/customer/appointments/${apt.id}`}
                                className="action-btn primary-outline-btn"
                              >
                                View Details
                              </Link>
                            </>
                          )}

                          {apt.status === "Completed" && (
                            <>
                              <Link
                                href={`/book/${apt.tailorId}`}
                                className="action-btn secondary-btn"
                              >
                                Book Again
                              </Link>
                              <Link
                                href={`/customer/appointments/${apt.id}`}
                                className="action-btn primary-outline-btn"
                              >
                                View Details
                              </Link>
                            </>
                          )}

                          {apt.status === "Cancelled" && (
                            <>
                              <Link
                                href={`/book/${apt.tailorId}`}
                                className="action-btn secondary-btn"
                              >
                                Rebook Slot
                              </Link>
                              <Link
                                href={`/customer/appointments/${apt.id}`}
                                className="action-btn primary-outline-btn"
                              >
                                View Details
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </main>
          </div>
        </div>

        {/* --------------------------------------------------------------------------
           MODAL 1: VIEW DETAILS MODAL
           -------------------------------------------------------------------------- */}
        {isDetailsOpen && selectedAppointment && (
          <div className="appointments-modal-overlay" onClick={() => setIsDetailsOpen(false)}>
            <div className="appointments-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">Appointment Details</h2>
                <button
                  type="button"
                  onClick={() => setIsDetailsOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                {/* Tailor Header Info */}
                <div className="modal-tailor-strip">
                  <img
                    src={selectedAppointment.tailorAvatar}
                    alt={selectedAppointment.tailorName}
                    className="modal-tailor-avatar"
                  />
                  <div className="modal-tailor-meta">
                    <h3 className="modal-tailor-name">{selectedAppointment.tailorName}</h3>
                    <span className="modal-tailor-rating">
                      <Star size={13} fill="#F7B915" color="#F7B915" />
                      <strong>{selectedAppointment.tailorRating}</strong> ({selectedAppointment.tailorReviewsCount} reviews)
                    </span>
                    <span className="modal-tailor-address">{selectedAppointment.tailorAddress}</span>
                  </div>
                </div>

                {/* Service Details Recap */}
                <div className="modal-details-grid">
                  <div className="detail-item-box">
                    <span className="detail-label">Service</span>
                    <span className="detail-value font-bold">{selectedAppointment.serviceName}</span>
                  </div>
                  <div className="detail-item-box">
                    <span className="detail-label">Estimated Price</span>
                    <span className="detail-value font-bold text-teal">{selectedAppointment.price}</span>
                  </div>
                  <div className="detail-item-box">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{selectedAppointment.date}</span>
                  </div>
                  <div className="detail-item-box">
                    <span className="detail-label">Time &amp; Duration</span>
                    <span className="detail-value">{selectedAppointment.time} ({selectedAppointment.duration})</span>
                  </div>
                  <div className="detail-item-box full-width">
                    <span className="detail-label">Reference ID</span>
                    <span className="detail-value font-mono">{selectedAppointment.referenceNo}</span>
                  </div>
                </div>

                {/* Notes Section */}
                {selectedAppointment.notes && (
                  <div className="modal-notes-section">
                    <span className="detail-label">Customer Notes</span>
                    <p className="notes-text-body">{selectedAppointment.notes}</p>
                  </div>
                )}

                {/* Reference Images */}
                {selectedAppointment.referenceImages && selectedAppointment.referenceImages.length > 0 && (
                  <div className="modal-ref-images-section">
                    <span className="detail-label">Reference Images</span>
                    <div className="ref-images-thumbnails">
                      {selectedAppointment.referenceImages.map((imgUrl, i) => (
                        <div key={i} className="ref-thumb-card">
                          <img src={imgUrl} alt={`Reference ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Bottom Actions */}
              <div className="modal-actions-footer">
                <button
                  type="button"
                  onClick={() => handleDownloadIcs(selectedAppointment)}
                  className="modal-footer-btn secondary"
                >
                  <CalendarCheck size={16} /> Add to Calendar (.ics)
                </button>

                {selectedAppointment.status === "Upcoming" && (
                  <button
                    type="button"
                    onClick={() => handleOpenCancel(selectedAppointment)}
                    className="modal-footer-btn danger"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
           MODAL 2: RESCHEDULE MODAL
           -------------------------------------------------------------------------- */}
        {isRescheduleOpen && selectedAppointment && (
          <div className="appointments-modal-overlay" onClick={() => setIsRescheduleOpen(false)}>
            <div className="appointments-modal-card reschedule-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">Reschedule Appointment</h2>
                <button
                  type="button"
                  onClick={() => setIsRescheduleOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                <p className="reschedule-intro-text">
                  Choose a new slot with <strong>{selectedAppointment.tailorName}</strong> for{" "}
                  <em>{selectedAppointment.serviceName}</em>.
                </p>

                {/* Interactive Mini Calendar */}
                <div className="reschedule-calendar-box">
                  <div className="cal-header">
                    <button
                      type="button"
                      onClick={() => {
                        if (rescheduleMonth === 0) {
                          setRescheduleMonth(11);
                          setRescheduleYear(rescheduleYear - 1);
                        } else {
                          setRescheduleMonth(rescheduleMonth - 1);
                        }
                      }}
                      className="cal-nav-btn"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="cal-month-title">
                      {MONTH_NAMES[rescheduleMonth]} {rescheduleYear}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (rescheduleMonth === 11) {
                          setRescheduleMonth(0);
                          setRescheduleYear(rescheduleYear + 1);
                        } else {
                          setRescheduleMonth(rescheduleMonth + 1);
                        }
                      }}
                      className="cal-nav-btn"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="cal-weekdays">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => (
                      <span key={w}>{w}</span>
                    ))}
                  </div>

                  <div className="cal-grid">{calendarDays}</div>
                </div>

                {/* Time Slots Grid */}
                <div className="reschedule-slots-box">
                  <span className="detail-label">Select New Time Slot</span>
                  <div className="slots-pills-grid">
                    {AVAILABLE_RESCHEDULE_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setRescheduleTimeSlot(slot)}
                        className={`slot-pill ${rescheduleTimeSlot === slot ? "selected" : ""}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reschedule Confirmation Footer */}
              <div className="modal-actions-footer">
                <button
                  type="button"
                  onClick={() => setIsRescheduleOpen(false)}
                  className="modal-footer-btn secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReschedule}
                  disabled={isActionLoading}
                  className="modal-footer-btn primary"
                >
                  {isActionLoading ? "Rescheduling..." : "Confirm Reschedule"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
           MODAL 3: CANCEL APPOINTMENT CONFIRMATION DIALOG
           -------------------------------------------------------------------------- */}
        {isCancelOpen && selectedAppointment && (
          <div className="appointments-modal-overlay" onClick={() => setIsCancelOpen(false)}>
            <div className="appointments-modal-card cancel-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title text-danger">Cancel Appointment</h2>
                <button
                  type="button"
                  onClick={() => setIsCancelOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="cancel-dialog-body">
                <AlertCircle size={40} className="cancel-alert-icon" />
                <p className="cancel-warning-text">
                  Are you sure you want to cancel your appointment with{" "}
                  <strong>{selectedAppointment.tailorName}</strong> on{" "}
                  <strong>{selectedAppointment.date}</strong> at{" "}
                  <strong>{selectedAppointment.time}</strong>?
                </p>

                <div className="cancel-reason-input-group">
                  <label htmlFor="cancel-reason-select" className="detail-label">
                    Please tell us the reason for cancellation:
                  </label>
                  <select
                    id="cancel-reason-select"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="cancel-select-dropdown"
                  >
                    <option value="Schedule conflict on my side">Schedule conflict on my side</option>
                    <option value="Found an alternative tailor">Found an alternative tailor</option>
                    <option value="Fabric / outfit not ready yet">Fabric / outfit not ready yet</option>
                    <option value="Need to change required services">Need to change required services</option>
                    <option value="Other reason">Other reason</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions-footer">
                <button
                  type="button"
                  onClick={() => setIsCancelOpen(false)}
                  className="modal-footer-btn secondary"
                >
                  Keep Appointment
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  disabled={isActionLoading}
                  className="modal-footer-btn danger"
                >
                  {isActionLoading ? "Cancelling..." : "Confirm Cancellation"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Level Transparent Corner Motifs */}
        <div className="appointments-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="appointments-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
