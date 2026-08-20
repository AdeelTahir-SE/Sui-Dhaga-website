"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Check,
  X,
  Clock,
  Calendar as CalendarIcon,
  ShieldAlert,
  Save
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-availability-view.css";

interface TimeSlot {
  id: string;
  label: string; // e.g. "09:00 AM - 11:00 AM"
  enabled: boolean;
}

const defaultSlots: TimeSlot[] = [
  { id: "s1", label: "09:00 AM - 11:00 AM", enabled: true },
  { id: "s2", label: "11:00 AM - 01:00 PM", enabled: true },
  { id: "s3", label: "02:00 PM - 04:00 PM", enabled: true },
  { id: "s4", label: "04:00 PM - 06:00 PM", enabled: true }
];

const KEY_TAILOR_AVAILABILITY = "sui_dhaga_tailor_availability";

export function TailorAvailabilityPage() {
  const [selectedDay, setSelectedDay] = useState<number>(20);
  const [selectedMonth, setSelectedMonth] = useState<string>("May 2024");
  const [slots, setSlots] = useState<TimeSlot[]>(defaultSlots);
  const [blockedDates, setBlockedDates] = useState<string[]>([
    "25 May 2024",
    "24 May 2024"
  ]);
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [newSlotStart, setNewSlotStart] = useState("06:00 PM");
  const [newSlotEnd, setNewSlotEnd] = useState("08:00 PM");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(KEY_TAILOR_AVAILABILITY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.slots) setSlots(parsed.slots);
          if (parsed.blockedDates) setBlockedDates(parsed.blockedDates);
        }
      } catch (e) {
        console.warn("Failed to load availability from localStorage:", e);
      }
    }
  }, []);

  const selectedDateString = `${selectedDay} ${selectedMonth}`;
  const isSelectedDateBlocked = blockedDates.includes(selectedDateString);

  const toggleSlotEnabled = (id: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const label = `${newSlotStart} - ${newSlotEnd}`;
    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      label,
      enabled: true
    };
    setSlots([...slots, newSlot]);
    setIsAddSlotOpen(false);
    setToastMessage(`✓ Added time slot ${label}`);
  };

  const handleToggleBlockDate = (dateStr: string) => {
    if (blockedDates.includes(dateStr)) {
      setBlockedDates(blockedDates.filter((d) => d !== dateStr));
      setToastMessage(`Unblocked date: ${dateStr}`);
    } else {
      setBlockedDates([...blockedDates, dateStr]);
      setToastMessage(`Blocked date: ${dateStr}`);
    }
  };

  const handleSaveAvailability = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          KEY_TAILOR_AVAILABILITY,
          JSON.stringify({ slots, blockedDates })
        );
      } catch (e) {
        console.warn("Failed to save availability:", e);
      }
    }
    setToastMessage("🎉 Working hours and booking availability saved successfully!");
  };

  // Calendar Days generator for May 2024 (starts on Wednesday)
  const daysInMonth = 31;
  const startDayOffset = 3; // Wednesday

  const renderCalendarCells = () => {
    const cells = [];
    // Empty prefix cells
    for (let i = 0; i < startDayOffset; i++) {
      cells.push(<div key={`empty-${i}`} className="tav-day-cell disabled" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${day} ${selectedMonth}`;
      const isSelected = selectedDay === day;
      const isBlocked = blockedDates.includes(dateString);

      cells.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => setSelectedDay(day)}
          className={`tav-day-cell ${isSelected ? "selected" : ""} ${isBlocked ? "blocked" : ""}`}
        >
          <span>{day}</span>
          {!isBlocked && (day % 2 === 0 || day === 20) && (
            <span className="tav-dot-indicator" />
          )}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="tav-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tav-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="availability" />

        {/* Main Content Area */}
        <main className="tav-main-content">
          {/* Header Area */}
          <div className="tav-header">
            <h1 className="tav-title">Manage Your Availability</h1>
            <p className="tav-subtitle">Set your working hours and availability.</p>
          </div>

          {/* 2-Column Grid matching reference image */}
          <div className="tav-grid">
            {/* Left Column: Calendar Card + Save Button */}
            <div>
              <div className="tav-calendar-card">
                {/* Month Navigator */}
                <div className="tav-month-nav">
                  <button
                    type="button"
                    onClick={() => setToastMessage("Browsing previous month.")}
                    className="tav-nav-btn"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="tav-month-label">{selectedMonth}</span>
                  <button
                    type="button"
                    onClick={() => setToastMessage("Browsing next month.")}
                    className="tav-nav-btn"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Calendar Day Grid */}
                <div className="tav-calendar-grid">
                  <span className="tav-day-header">Sun</span>
                  <span className="tav-day-header">Mon</span>
                  <span className="tav-day-header">Tue</span>
                  <span className="tav-day-header">Wed</span>
                  <span className="tav-day-header">Thu</span>
                  <span className="tav-day-header">Fri</span>
                  <span className="tav-day-header">Sat</span>

                  {renderCalendarCells()}
                </div>
              </div>

              {/* Save Availability Button matching exact design */}
              <button
                type="button"
                onClick={handleSaveAvailability}
                className="tav-btn-save"
              >
                Save Availability
              </button>
            </div>

            {/* Right Column: Selected Date Slots + Blocked Dates */}
            <div className="tav-right-col">
              {/* Card 1: Selected Date & Slots */}
              <div className="tav-slots-card">
                <p className="tav-card-label">Selected Date</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                  <h3 className="tav-selected-date-title" style={{ margin: 0 }}>
                    {selectedDateString}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleToggleBlockDate(selectedDateString)}
                    style={{
                      background: isSelectedDateBlocked ? "#DCFCE7" : "#FEE2E2",
                      color: isSelectedDateBlocked ? "#15803D" : "#EF4444",
                      border: "none",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "0.78rem",
                      fontWeight: 750,
                      cursor: "pointer"
                    }}
                  >
                    {isSelectedDateBlocked ? "Unblock Date" : "Block Date"}
                  </button>
                </div>

                <h4 className="tav-section-subhead">Available Slots</h4>

                {/* Slots List */}
                <div className="tav-slots-list">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => toggleSlotEnabled(slot.id)}
                      className={`tav-slot-item ${slot.enabled ? "active" : ""}`}
                    >
                      <span>{slot.label}</span>
                      <input
                        type="checkbox"
                        checked={slot.enabled}
                        onChange={() => toggleSlotEnabled(slot.id)}
                        style={{ width: "16px", height: "16px", accentColor: "#078B87", cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>

                {/* Add Slot Button */}
                <button
                  type="button"
                  onClick={() => setIsAddSlotOpen(true)}
                  className="tav-btn-add-slot"
                >
                  <Plus size={16} />
                  <span>Add Slot</span>
                </button>
              </div>

              {/* Card 2: Blocked Dates */}
              <div className="tav-blocked-card">
                <h4 className="tav-section-subhead" style={{ margin: 0 }}>
                  Blocked Dates
                </h4>

                <div className="tav-blocked-list">
                  {blockedDates.length === 0 ? (
                    <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "10px 0 0" }}>
                      No blocked dates. All standard dates open for bookings.
                    </p>
                  ) : (
                    blockedDates.map((dateStr) => (
                      <div key={dateStr} className="tav-blocked-item">
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <ShieldAlert size={15} color="#EF4444" />
                          <span>{dateStr}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleBlockDate(dateStr)}
                          className="tav-btn-unblock"
                          title="Unblock date"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Slot Modal */}
      {isAddSlotOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setIsAddSlotOpen(false)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "460px",
              padding: "24px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                Add Custom Time Slot
              </h3>
              <button
                type="button"
                onClick={() => setIsAddSlotOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSlot}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    Start Time
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlotStart}
                    onChange={(e) => setNewSlotStart(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>
                    End Time
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlotEnd}
                    onChange={(e) => setNewSlotEnd(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddSlotOpen(false)}
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
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    background: "#078B87",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 22px",
                    fontWeight: 750,
                    cursor: "pointer"
                  }}
                >
                  Add Slot
                </button>
              </div>
            </form>
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
