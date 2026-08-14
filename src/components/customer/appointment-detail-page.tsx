"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  MessageSquare,
  Eye,
  ExternalLink,
  ChevronRight as BreadcrumbSeparator,
  Sparkles
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  fetchAppointmentByIdApi,
  rescheduleCustomerAppointmentApi,
  cancelCustomerAppointmentApi,
  AppointmentItem,
  initialAppointmentsData
} from "@/lib/appointments-data";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const AVAILABLE_RESCHEDULE_SLOTS = [
  "9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"
];

export function AppointmentDetailPage({ appointmentId }: { appointmentId: string }) {
  const [appointment, setAppointment] = useState<AppointmentItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Modals & Lightbox
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("Schedule conflict on my side");
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
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

  useEffect(() => {
    let isSubscribed = true;

    fetchAppointmentByIdApi(appointmentId).then((data) => {
      if (isSubscribed) {
        setAppointment(data || initialAppointmentsData[0]);
        if (data?.time) setRescheduleTimeSlot(data.time);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [appointmentId]);

  const handleCopyBookingId = () => {
    if (!appointment) return;
    navigator.clipboard.writeText(appointment.referenceNo);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleConfirmReschedule = async () => {
    if (!appointment) return;
    setIsActionLoading(true);

    const formattedDate = `${rescheduleDate.getDate()} ${MONTH_NAMES[rescheduleDate.getMonth()]}, ${rescheduleDate.getFullYear()}`;

    try {
      const res = await rescheduleCustomerAppointmentApi(
        appointment.id,
        formattedDate,
        rescheduleTimeSlot
      );
      if (res.success) {
        setAppointment((prev) =>
          prev ? { ...prev, date: formattedDate, time: rescheduleTimeSlot } : prev
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

  const handleConfirmCancel = async () => {
    if (!appointment) return;
    setIsActionLoading(true);

    try {
      const res = await cancelCustomerAppointmentApi(appointment.id, cancelReason);
      if (res.success) {
        setAppointment((prev) =>
          prev ? { ...prev, status: "Cancelled", cancelReason } : prev
        );
        setIsCancelOpen(false);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to cancel appointment. Please try again.");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Calendar Helpers
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

  const defaultRefImages = [
    "/images/booking/ref-pink-kurti.jpg",
    "/images/booking/ref-peach-gown.jpg",
    "/images/booking/ref-neckline-detail.jpg",
    "/images/booking/ref-gold-anarkali.jpg"
  ];

  const galleryImages =
    appointment?.referenceImages && appointment.referenceImages.length > 0
      ? appointment.referenceImages
      : defaultRefImages;

  return (
    <PublicShell>
      <div className="appointment-detail-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="detail-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="detail-container">
          {/* Breadcrumb Navigation */}
          <nav className="detail-breadcrumb-nav" aria-label="Breadcrumbs">
            <Link href="/" className="crumb-link">
              Home
            </Link>
            <BreadcrumbSeparator size={14} className="crumb-separator" />
            <Link href="/customer/appointments" className="crumb-link">
              Appointments
            </Link>
            <BreadcrumbSeparator size={14} className="crumb-separator" />
            <span className="crumb-current">Appointment Details</span>
          </nav>

          {/* Top Row Grid (3 Cards) */}
          <div className="detail-top-cards-grid">
            {/* Card 1: Appointment Status */}
            <section className="detail-card-panel status-card-panel" aria-labelledby="status-card-title">
              <h2 id="status-card-title" className="detail-card-heading">
                Appointment Status
              </h2>

              <div className="status-badge-container">
                <span
                  className={`status-indicator-pill ${
                    appointment?.status === "Completed"
                      ? "completed"
                      : appointment?.status === "Cancelled"
                      ? "cancelled"
                      : "upcoming"
                  }`}
                >
                  <span className="status-glow-dot" />
                  {appointment?.status || "Upcoming"}
                </span>
              </div>

              <div className="booking-id-container">
                <span className="booking-id-label">Booking ID</span>
                <div className="booking-id-val-row">
                  <strong className="booking-id-text">
                    {appointment?.referenceNo || "APT1256"}
                  </strong>
                  <button
                    type="button"
                    onClick={handleCopyBookingId}
                    className="copy-id-btn"
                    title="Copy Booking ID"
                  >
                    {copiedId ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <div className="status-actions-group">
                {appointment?.status === "Upcoming" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsRescheduleOpen(true)}
                      className="status-action-btn reschedule-btn"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCancelOpen(true)}
                      className="status-action-btn cancel-btn"
                    >
                      Cancel Appointment
                    </button>
                  </>
                ) : appointment?.status === "Completed" ? (
                  <Link
                    href={`/book/${appointment.tailorId}`}
                    className="status-action-btn reschedule-btn text-center"
                  >
                    Book Again
                  </Link>
                ) : (
                  <Link
                    href={`/book/${appointment?.tailorId || "rekha-tailors"}`}
                    className="status-action-btn reschedule-btn text-center"
                  >
                    Rebook Slot
                  </Link>
                )}
              </div>
            </section>

            {/* Card 2: Appointment Details */}
            <section className="detail-card-panel details-card-panel" aria-labelledby="details-card-title">
              <h2 id="details-card-title" className="detail-card-heading">
                Appointment Details
              </h2>

              <div className="details-key-value-list">
                <div className="kv-row">
                  <span className="kv-key">Date</span>
                  <span className="kv-value font-semibold">
                    {appointment?.date || "20 May, 2024"}
                  </span>
                </div>

                <div className="kv-row">
                  <span className="kv-key">Time</span>
                  <span className="kv-value font-semibold">
                    {appointment?.time || "2:00 PM"}
                  </span>
                </div>

                <div className="kv-row">
                  <span className="kv-key">Service</span>
                  <span className="kv-value font-semibold text-dark">
                    {appointment?.serviceName || "Custom Stitching"}
                  </span>
                </div>

                <div className="kv-row">
                  <span className="kv-key">Delivery Time</span>
                  <span className="kv-value">
                    {appointment?.deliveryTime || "7-10 days"}
                  </span>
                </div>

                <div className="kv-row kv-notes-row">
                  <span className="kv-key">Notes</span>
                  <p className="kv-value kv-notes-text">
                    {appointment?.notes ||
                      "Light pink Anarkali with embroidery on neckline and matching sleeves piping."}
                  </p>
                </div>
              </div>
            </section>

            {/* Card 3: Tailor Information */}
            <section className="detail-card-panel tailor-card-panel" aria-labelledby="tailor-card-title">
              <h2 id="tailor-card-title" className="detail-card-heading">
                Tailor Information
              </h2>

              <div className="tailor-info-content">
                <div className="tailor-header-flex">
                  <div className="tailor-avatar-frame">
                    <img
                      src={appointment?.tailorAvatar || "/images/home/tailor-rekha.png"}
                      alt={appointment?.tailorName || "Tailor"}
                      className="tailor-avatar-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/home/tailor-rekha.png";
                      }}
                    />
                  </div>

                  <div className="tailor-meta-details">
                    <h3 className="tailor-name-heading">
                      {appointment?.tailorName || "Rekha Tailors"}
                    </h3>
                    <div className="tailor-rating-row">
                      <Star size={13} fill="#F7B915" color="#F7B915" />
                      <strong className="rating-score">
                        {appointment?.tailorRating || 4.8}
                      </strong>
                      <span className="reviews-count">
                        ({appointment?.tailorReviewsCount || 128} reviews)
                      </span>
                    </div>
                    <div className="tailor-distance-row">
                      <MapPin size={12} className="map-pin-icon" />
                      <span>{appointment?.distance || "0.6 km away"}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/tailors/${appointment?.tailorId || "rekha-tailors"}`}
                  className="view-profile-btn"
                >
                  View Profile
                </Link>
              </div>
            </section>
          </div>

          {/* Bottom Row Grid (2 Cards) */}
          <div className="detail-bottom-cards-grid">
            {/* Card 4: Reference Images */}
            <section className="detail-card-panel ref-images-panel" aria-labelledby="ref-images-title">
              <h2 id="ref-images-title" className="detail-card-heading">
                Reference Images
              </h2>

              <div className="ref-images-gallery-row">
                {galleryImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="gallery-thumb-item"
                    onClick={() => setActiveLightboxImg(imgUrl)}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src={imgUrl}
                      alt={`Reference Inspiration ${index + 1}`}
                      className="gallery-img"
                    />
                    {index === 3 && galleryImages.length > 4 && (
                      <div className="more-images-overlay">
                        <span>+{galleryImages.length - 3}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Card 5: Need Help? */}
            <section className="detail-card-panel help-card-panel" aria-labelledby="help-card-title">
              <h2 id="help-card-title" className="detail-card-heading">
                Need Help?
              </h2>
              <p className="help-text-copy">
                If you have any questions or need to make changes, feel free to contact the tailor directly.
              </p>

              <Link
                href={`/messages/${appointment?.tailorId || "rekha-tailors"}`}
                className="message-tailor-btn"
              >
                Message Tailor
              </Link>
            </section>
          </div>
        </div>

        {/* --------------------------------------------------------------------------
           MODAL 1: RESCHEDULE MODAL
           -------------------------------------------------------------------------- */}
        {isRescheduleOpen && appointment && (
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
                  Choose a new date and time slot for your appointment with{" "}
                  <strong>{appointment.tailorName}</strong>.
                </p>

                {/* Calendar */}
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

                {/* Time Slots */}
                <div className="reschedule-slots-box">
                  <span className="detail-label">Select Time Slot</span>
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
           MODAL 2: CANCEL APPOINTMENT CONFIRMATION DIALOG
           -------------------------------------------------------------------------- */}
        {isCancelOpen && appointment && (
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
                  <strong>{appointment.tailorName}</strong> on{" "}
                  <strong>{appointment.date}</strong> at <strong>{appointment.time}</strong>?
                </p>

                <div className="cancel-reason-input-group">
                  <label htmlFor="cancel-reason-select" className="detail-label">
                    Please tell us the reason:
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

        {/* --------------------------------------------------------------------------
           MODAL 3: LIGHTBOX PREVIEW
           -------------------------------------------------------------------------- */}
        {activeLightboxImg && (
          <div className="lightbox-overlay" onClick={() => setActiveLightboxImg(null)}>
            <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setActiveLightboxImg(null)}
                aria-label="Close image preview"
              >
                <X size={24} />
              </button>
              <img src={activeLightboxImg} alt="Reference Preview" className="lightbox-full-img" />
            </div>
          </div>
        )}

        {/* Page Level Transparent Corner Motifs */}
        <div className="detail-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="detail-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
