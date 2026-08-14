"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
  X,
  Sparkles,
  Info,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Scissors
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { getTailorById, fetchTailorByIdApi, TailorItem } from "@/lib/tailors-data";
import {
  getTailorServices,
  fetchTailorServicesApi,
  fetchAvailableSlotsApi,
  createBookingAppointmentApi,
  samplePresetReferences,
  TailorBookingService,
  BookingAppointmentResponse
} from "@/lib/booking-data";

interface BookingAppointmentPageProps {
  tailorId?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BookingAppointmentPage({ tailorId: propTailorId }: BookingAppointmentPageProps) {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeTailorId = propTailorId || (params?.tailorId as string) || "rekha-tailors";

  // Tailor state
  const [tailor, setTailor] = useState<TailorItem | undefined>(() => getTailorById(activeTailorId));
  const [services, setServices] = useState<TailorBookingService[]>(() => getTailorServices(activeTailorId));
  const [selectedServiceId, setSelectedServiceId] = useState<string>(() => {
    const list = getTailorServices(activeTailorId);
    return list[0]?.id || "srv-custom-stitching";
  });
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // Date selection state (defaulting to current or upcoming date)
  const today = new Date();
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const defaultD = new Date();
    defaultD.setDate(defaultD.getDate() + 2); // 2 days from now by default
    return defaultD;
  });

  // Time slot state
  const [availableSlots, setAvailableSlots] = useState<string[]>([
    "9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"
  ]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("2:00 PM");

  // Notes state
  const [notes, setNotes] = useState<string>("");

  // Reference images state
  const [selectedPresets, setSelectedPresets] = useState<string[]>(["ref-1", "ref-2", "ref-3"]);
  const [customImages, setCustomImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Booking action state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingAppointmentResponse | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Load tailor and services data
  useEffect(() => {
    let isSubscribed = true;
    fetchTailorByIdApi(activeTailorId).then((data) => {
      if (isSubscribed && data) {
        setTailor(data);
      }
    });

    fetchTailorServicesApi(activeTailorId).then((data) => {
      if (isSubscribed && data && data.length > 0) {
        setServices(data);
        setSelectedServiceId(data[0].id);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [activeTailorId]);

  // Update slots when date changes
  useEffect(() => {
    let isSubscribed = true;
    const formattedDate = selectedDate.toISOString().split("T")[0];
    fetchAvailableSlotsApi(activeTailorId, formattedDate).then((slots) => {
      if (isSubscribed && slots && slots.length > 0) {
        setAvailableSlots(slots);
        if (!slots.includes(selectedTimeSlot)) {
          setSelectedTimeSlot(slots[0]);
        }
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [activeTailorId, selectedDate]);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0] || {
    id: "srv-custom-stitching",
    name: "Custom Stitching",
    price: "Rs. 2,000",
    priceValue: 2000,
    deliveryTime: "7-10 days"
  };

  // Calendar helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    // Don't allow selecting dates in the past
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (newDate < startOfToday) return;

    setSelectedDate(newDate);
  };

  // Image Upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeCustomImage = (indexToRemove: number) => {
    setCustomImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const togglePresetReference = (id: string) => {
    setSelectedPresets((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Format date helper (e.g. "20 May 2024")
  const formatDateDisplay = (date: Date) => {
    const d = date.getDate();
    const m = MONTH_NAMES[date.getMonth()];
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
  };

  const formatShortDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Booking Submission
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);

    const presetImages = samplePresetReferences
      .filter((p) => selectedPresets.includes(p.id))
      .map((p) => p.image);

    const allReferences = [...presetImages, ...customImages];

    const payload = {
      tailorId: activeTailorId,
      tailorName: tailor?.name || "Rekha Tailors",
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      priceValue: selectedService.priceValue,
      date: formatShortDate(selectedDate),
      timeSlot: selectedTimeSlot,
      notes: notes.trim(),
      referenceImages: allReferences
    };

    try {
      const result = await createBookingAppointmentApi(payload);
      if (result.success && result.appointment) {
        setConfirmedBooking(result.appointment);
        setShowSuccessModal(true);
      } else {
        alert(result.error || "Failed to confirm appointment. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong while confirming your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar render grid
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const calendarDays = [];
  // Empty padding for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`pad-${i}`} className="calendar-day empty" aria-hidden="true" />);
  }

  // Days in month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(currentYear, currentMonth, day);
    const isPast = dayDate < startOfToday;
    const isSelected =
      selectedDate.getFullYear() === currentYear &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getDate() === day;
    const isToday =
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day;

    calendarDays.push(
      <button
        key={`day-${day}`}
        type="button"
        disabled={isPast}
        onClick={() => handleSelectDay(day)}
        className={`calendar-day-btn ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${
          isPast ? "disabled" : ""
        }`}
        aria-label={`${day} ${MONTH_NAMES[currentMonth]} ${currentYear}`}
        aria-pressed={isSelected}
      >
        <span>{day}</span>
        {isToday && !isSelected && <span className="today-dot" />}
      </button>
    );
  }

  const tailorName = tailor?.name || "Rekha Tailors";
  const tailorImage = tailor?.image || "/images/home/tailor-rekha.png";
  const tailorRating = tailor?.rating || 4.8;
  const tailorReviewsCount = tailor?.reviewsCount || 128;
  const tailorDistance = tailor?.distance || "0.6 km away";
  const tailorSpecialties = tailor?.specialties || ["Women's Wear", "Sarees", "Lehengas"];

  return (
    <PublicShell>
      <div className="booking-page-root">
        {/* Bottom Corner Decorative Motifs */}
        <div className="booking-corner-bottom-left" aria-hidden="true">
          <img src="/images/auth/edge-teal.png" alt="" className="booking-corner-img" />
        </div>

        <div className="booking-corner-bottom-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="booking-corner-img" />
        </div>

        <div className="booking-content-container">
          {/* Breadcrumb Navigation */}
          <nav className="booking-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="crumb-link">Home</Link>
            <span className="crumb-separator">&gt;</span>
            <Link href="/tailors" className="crumb-link">Tailors</Link>
            <span className="crumb-separator">&gt;</span>
            <Link href={`/tailors/${activeTailorId}`} className="crumb-link">{tailorName}</Link>
            <span className="crumb-separator">&gt;</span>
            <span className="crumb-current">Book Appointment</span>
          </nav>

          {/* Page Heading */}
          <header className="booking-header">
            <h1 className="booking-title">Book your appointment</h1>
            <p className="booking-subtitle">
              Fill in the details to book your slot with {tailorName}.
            </p>
          </header>

          {/* Main Booking Interactive Grid */}
          <div className="booking-main-layout">
            {/* LEFT / CENTER WORKFLOW COLUMN */}
            <div className="booking-steps-column">
              {/* TOP ROW: SELECTED TAILOR + SERVICE SELECTION + CALENDAR */}
              <div className="booking-top-grid">
                {/* 1. Selected Tailor Card */}
                <section className="booking-card tailor-summary-card" aria-label="Selected Tailor Information">
                  <h2 className="card-section-title">Selected Tailor</h2>
                  
                  <div className="tailor-summary-body">
                    <div className="tailor-avatar-wrapper">
                      <img
                        src={tailorImage}
                        alt={tailorName}
                        className="tailor-avatar-img"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/home/tailor-rekha.png";
                        }}
                      />
                    </div>

                    <div className="tailor-info-details">
                      <div className="tailor-name-row">
                        <h3 className="tailor-name">{tailorName}</h3>
                        <span className="top-rated-pill">
                          <Star className="star-icon" size={11} fill="#F7B915" />
                          Top Rated
                        </span>
                      </div>

                      <div className="tailor-meta-row">
                        <span className="rating-text">
                          <Star size={13} fill="#F7B915" color="#F7B915" className="meta-star" />
                          <strong>{tailorRating}</strong> ({tailorReviewsCount} reviews)
                        </span>
                        <span className="meta-bullet">•</span>
                        <span className="distance-text">{tailorDistance}</span>
                      </div>

                      <div className="tailor-tags-row">
                        {tailorSpecialties.map((spec) => (
                          <span key={spec} className="tailor-tag-chip">
                            {spec}
                          </span>
                        ))}
                      </div>

                      <Link href={`/tailors/${activeTailorId}`} className="view-profile-link">
                        View Profile <ArrowRight size={13} className="arrow-icon" />
                      </Link>
                    </div>
                  </div>
                </section>

                {/* 2. Step 1: Select Service */}
                <section className="booking-card select-service-card" aria-labelledby="step-1-title">
                  <div className="step-title-header">
                    <div className="step-number-badge">1</div>
                    <h2 id="step-1-title" className="step-title-text">Select Service</h2>
                  </div>

                  <div className="service-selector-container">
                    <label className="input-field-label" htmlFor="service-select">
                      Choose a service
                    </label>

                    {/* Custom Dropdown Trigger */}
                    <div className="custom-dropdown-wrap">
                      <button
                        id="service-select"
                        type="button"
                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                        className={`service-dropdown-trigger ${isServiceDropdownOpen ? "open" : ""}`}
                        aria-expanded={isServiceDropdownOpen}
                      >
                        <span className="selected-service-title">{selectedService.name}</span>
                        <ChevronDown
                          size={18}
                          className={`dropdown-chevron ${isServiceDropdownOpen ? "rotate" : ""}`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isServiceDropdownOpen && (
                        <div className="service-dropdown-menu">
                          {services.map((srv) => (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => {
                                setSelectedServiceId(srv.id);
                                setIsServiceDropdownOpen(false);
                              }}
                              className={`service-option-item ${
                                srv.id === selectedService.id ? "active" : ""
                              }`}
                            >
                              <div className="service-option-info">
                                <span className="option-name">{srv.name}</span>
                                {srv.popular && <span className="popular-badge">Popular</span>}
                              </div>
                              <div className="service-option-meta">
                                <span className="option-price">{srv.price}</span>
                                <span className="option-delivery">{srv.deliveryTime}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Service Price & Turnaround Display Bar */}
                    <div className="service-details-row">
                      <div className="service-price-block">
                        <span className="price-label">Price:</span>
                        <span className="price-value">{selectedService.price}</span>
                      </div>
                      <div className="service-time-block">
                        <span className="time-label">Estimated:</span>
                        <span className="time-value">{selectedService.deliveryTime}</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Step 2: Select Date */}
                <section className="booking-card select-date-card" aria-labelledby="step-2-title">
                  <div className="step-title-header">
                    <div className="step-number-badge">2</div>
                    <h2 id="step-2-title" className="step-title-text">Select Date</h2>
                  </div>

                  <div className="calendar-widget">
                    {/* Calendar Month Header */}
                    <div className="calendar-header-bar">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="calendar-nav-btn prev"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <div className="calendar-month-year">
                        {MONTH_NAMES[currentMonth]} {currentYear}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="calendar-nav-btn next"
                        aria-label="Next Month"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>

                    {/* Weekday Names Header */}
                    <div className="calendar-weekdays-grid">
                      {WEEKDAY_NAMES.map((w) => (
                        <span key={w} className="weekday-label">
                          {w}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Days Grid */}
                    <div className="calendar-days-grid">{calendarDays}</div>
                  </div>
                </section>

                {/* 4. Step 3: Select Time */}
                <section className="booking-card select-time-card" aria-labelledby="step-3-title">
                  <div className="step-title-header">
                    <div className="step-number-badge">3</div>
                    <h2 id="step-3-title" className="step-title-text">Select Time</h2>
                  </div>

                  <div className="time-slots-container">
                    <label className="input-field-label">Available Slots</label>
                    <div className="time-slots-grid">
                      {availableSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`time-slot-btn ${isSelected ? "selected" : ""}`}
                            aria-pressed={isSelected}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>

              {/* BOTTOM ROW: NOTES & REFERENCE IMAGES */}
              <div className="booking-bottom-grid">
                {/* Step 4: Add Notes (Optional) */}
                <section className="booking-card add-notes-card" aria-labelledby="step-4-title">
                  <div className="step-title-header">
                    <div className="step-number-badge">4</div>
                    <h2 id="step-4-title" className="step-title-text">Add Notes (Optional)</h2>
                  </div>

                  <div className="notes-input-wrapper">
                    <label htmlFor="booking-notes-input" className="input-field-label">
                      Tell us more about your requirements
                    </label>
                    <div className="textarea-container">
                      <textarea
                        id="booking-notes-input"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                        placeholder="Type your notes here... (e.g. preferred neckline, custom fitting requests, fabric details)"
                        maxLength={200}
                        rows={4}
                        className="custom-notes-textarea"
                      />
                      <span className="character-count">{notes.length}/200</span>
                    </div>
                  </div>
                </section>

                {/* Step 5: Upload Reference Image (Optional) */}
                <section className="booking-card upload-reference-card" aria-labelledby="step-5-title">
                  <div className="step-title-header">
                    <div className="step-number-badge">5</div>
                    <h2 id="step-5-title" className="step-title-text">Upload Reference Image (Optional)</h2>
                  </div>

                  <div className="reference-upload-container">
                    <label className="input-field-label">
                      Upload images to help tailor understand your style
                    </label>

                    <div className="reference-items-row">
                      {/* Upload Button Box */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="upload-dropzone-button"
                      >
                        <div className="upload-icon-circle">
                          <Upload size={20} className="upload-icon" />
                        </div>
                        <span className="upload-main-text">Upload Image</span>
                        <span className="upload-sub-text">JPG, PNG up to 10MB</span>
                      </button>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/png, image/jpeg, image/webp"
                        multiple
                        className="hidden-file-input"
                        style={{ display: "none" }}
                      />

                      {/* Preset Sample References with Selectable Checkbox */}
                      {samplePresetReferences.map((preset) => {
                        const isPresetSelected = selectedPresets.includes(preset.id);
                        return (
                          <div
                            key={preset.id}
                            className={`reference-thumbnail-card ${isPresetSelected ? "active" : ""}`}
                            onClick={() => togglePresetReference(preset.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                togglePresetReference(preset.id);
                              }
                            }}
                          >
                            <img
                              src={preset.image}
                              alt={preset.title}
                              className="thumbnail-img"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage(preset.image);
                              }}
                            />
                            <div className="preset-toggle-badge">
                              {isPresetSelected ? (
                                <div className="checked-indicator">
                                  <Check size={12} strokeWidth={3} />
                                </div>
                              ) : (
                                <div className="unchecked-indicator" />
                              )}
                            </div>
                            <span className="thumbnail-title">{preset.title}</span>
                          </div>
                        );
                      })}

                      {/* User Uploaded Custom Thumbnails */}
                      {customImages.map((imgUrl, idx) => (
                        <div key={`custom-${idx}`} className="reference-thumbnail-card custom-uploaded active">
                          <img
                            src={imgUrl}
                            alt={`Uploaded reference ${idx + 1}`}
                            className="thumbnail-img"
                            onClick={() => setPreviewImage(imgUrl)}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCustomImage(idx);
                            }}
                            className="remove-image-btn"
                            title="Remove uploaded image"
                            aria-label="Remove image"
                          >
                            <X size={12} />
                          </button>
                          <span className="thumbnail-title">Custom {idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT SIDEBAR: APPOINTMENT SUMMARY CARD */}
            <aside className="booking-summary-sidebar">
              <div className="appointment-summary-card">
                <h2 className="summary-card-title">Appointment Summary</h2>

                <div className="summary-details-list">
                  <div className="summary-row">
                    <span className="summary-label">Service</span>
                    <span className="summary-value font-medium">{selectedService.name}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Date</span>
                    <span className="summary-value">{formatDateDisplay(selectedDate)}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Time</span>
                    <span className="summary-value">{selectedTimeSlot}</span>
                  </div>

                  <div className="summary-row">
                    <span className="summary-label">Delivery Time</span>
                    <span className="summary-value">{selectedService.deliveryTime}</span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-row total-price-row">
                    <span className="summary-label-total">Estimated Price</span>
                    <span className="summary-price-total">{selectedService.price}</span>
                  </div>
                </div>

                {/* Primary Booking CTA */}
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting}
                  className="confirm-booking-btn"
                >
                  {isSubmitting ? (
                    <span className="booking-spinner-text">
                      <span className="spinner-dot" /> Confirming...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>

                <p className="summary-subtext">You can reschedule or cancel later</p>

                {/* Guarantee Trust Strip */}
                <div className="summary-trust-badge">
                  <ShieldCheck size={16} className="trust-shield-icon" />
                  <span>Sui Dhāga Perfect Fit &amp; Punctuality Guarantee</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* IMAGE PREVIEW LIGHTBOX MODAL */}
        {previewImage && (
          <div
            className="booking-lightbox-overlay"
            onClick={() => setPreviewImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setPreviewImage(null)}
                aria-label="Close image preview"
              >
                <X size={20} />
              </button>
              <img src={previewImage} alt="Reference Preview" className="lightbox-img" />
            </div>
          </div>
        )}

        {/* CONFIRMATION SUCCESS MODAL */}
        {showSuccessModal && confirmedBooking && (
          <div className="booking-modal-overlay" role="dialog" aria-modal="true">
            <div className="booking-success-modal-card">
              <div className="success-modal-header">
                <div className="success-icon-badge">
                  <CheckCircle2 size={36} className="check-icon" />
                </div>
                <h2 className="success-modal-title">Appointment Confirmed!</h2>
                <p className="success-modal-subtitle">
                  Your appointment with <strong>{confirmedBooking.tailorName}</strong> is locked in.
                </p>
                <div className="reference-badge">
                  Ref: <span>{confirmedBooking.referenceNo}</span>
                </div>
              </div>

              <div className="success-recap-box">
                <div className="recap-row">
                  <span className="recap-label">Service</span>
                  <span className="recap-val">{confirmedBooking.serviceName}</span>
                </div>
                <div className="recap-row">
                  <span className="recap-label">Date &amp; Time</span>
                  <span className="recap-val">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>
                <div className="recap-row">
                  <span className="recap-label">Estimated Price</span>
                  <span className="recap-val font-bold">{confirmedBooking.price}</span>
                </div>
                <div className="recap-row">
                  <span className="recap-label">Location</span>
                  <span className="recap-val">{confirmedBooking.tailorAddress}</span>
                </div>
              </div>

              <div className="success-modal-actions">
                <Link
                  href="/customer/appointments"
                  className="modal-btn-primary"
                  onClick={() => setShowSuccessModal(false)}
                >
                  <CalendarCheck size={16} /> View My Appointments
                </Link>
                <Link
                  href={`/tailors/${activeTailorId}`}
                  className="modal-btn-secondary"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Back to Tailor Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicShell>
  );
}
