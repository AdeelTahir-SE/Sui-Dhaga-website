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
  ChevronDown,
  HelpCircle,
  Play,
  Check,
  X,
  Sparkles,
  Info,
  ChevronRight,
  Edit3,
  Trash2,
  Video
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  fetchMeasurementProfilesApi,
  saveMeasurementProfileApi,
  initialMeasurementProfiles,
  STANDARD_SIZE_GUIDE_CHART,
  MEASURING_INSTRUCTIONS_STEPS,
  MeasurementProfile,
  MeasurementValues
} from "@/lib/measurements-data";

export function CustomerMeasurementsPage() {
  const [profiles, setProfiles] = useState<MeasurementProfile[]>(initialMeasurementProfiles);
  const [activeProfileId, setActiveProfileId] = useState<string>("prof-self");
  const [unit, setUnit] = useState<"Inches" | "Centimeters (cm)">("Inches");
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  // Form State for Add / Edit
  const [formProfileName, setFormProfileName] = useState<string>("");
  const [formBust, setFormBust] = useState<number>(36);
  const [formWaist, setFormWaist] = useState<number>(30);
  const [formHip, setFormHip] = useState<number>(39);
  const [formShoulder, setFormShoulder] = useState<number>(15);
  const [formArmLength, setFormArmLength] = useState<number>(22);
  const [formSleeveLength, setFormSleeveLength] = useState<number>(18);
  const [formTopLength, setFormTopLength] = useState<number>(54);
  const [formNotes, setFormNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;

    fetchMeasurementProfilesApi().then((data) => {
      if (isSubscribed) {
        setProfiles(data);
        if (data.length > 0) {
          setActiveProfileId(data[0].id);
          setUnit(data[0].unit);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) || profiles[0] || initialMeasurementProfiles[0];

  // Conversion helper
  const formatVal = (valInInches: number | undefined) => {
    if (valInInches === undefined) return "-";
    if (unit === "Inches") return `${valInInches} in`;
    const cm = Math.round(valInInches * 2.54);
    return `${cm} cm`;
  };

  const handleOpenAddModal = () => {
    setFormProfileName("");
    setFormBust(36);
    setFormWaist(30);
    setFormHip(39);
    setFormShoulder(15);
    setFormArmLength(22);
    setFormSleeveLength(18);
    setFormTopLength(54);
    setFormNotes("");
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = () => {
    setFormProfileName(activeProfile.name);
    setFormBust(activeProfile.values.bust);
    setFormWaist(activeProfile.values.waist);
    setFormHip(activeProfile.values.hip);
    setFormShoulder(activeProfile.values.shoulder);
    setFormArmLength(activeProfile.values.armLength);
    setFormSleeveLength(activeProfile.values.sleeveLength);
    setFormTopLength(activeProfile.values.topLength);
    setFormNotes(activeProfile.notes || "");
    setIsAddModalOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;

    const newProfile: MeasurementProfile = {
      id: formProfileName === activeProfile.name ? activeProfile.id : `prof-${Date.now()}`,
      name: formProfileName.trim() || "My Measurements",
      lastUpdated: formattedDate,
      unit: unit,
      standardSize: formBust <= 34 ? "S (Small)" : formBust <= 37 ? "M (Medium)" : "L (Large)",
      values: {
        bust: Number(formBust),
        waist: Number(formWaist),
        hip: Number(formHip),
        shoulder: Number(formShoulder),
        armLength: Number(formArmLength),
        sleeveLength: Number(formSleeveLength),
        topLength: Number(formTopLength)
      },
      notes: formNotes
    };

    try {
      await saveMeasurementProfileApi(newProfile);
      setProfiles((prev) => {
        const existingIdx = prev.findIndex((p) => p.id === newProfile.id);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = newProfile;
          return updated;
        }
        return [...prev, newProfile];
      });
      setActiveProfileId(newProfile.id);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save measurement profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const measurementRows = [
    { key: "bust", label: "Bust", val: activeProfile.values.bust },
    { key: "waist", label: "Waist", val: activeProfile.values.waist },
    { key: "hip", label: "Hip", val: activeProfile.values.hip },
    { key: "shoulder", label: "Shoulder", val: activeProfile.values.shoulder },
    { key: "armLength", label: "Arm Length", val: activeProfile.values.armLength },
    { key: "sleeveLength", label: "Sleeve Length", val: activeProfile.values.sleeveLength },
    { key: "topLength", label: "Top Length", val: activeProfile.values.topLength }
  ];

  return (
    <PublicShell>
      <div className="customer-measurements-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="measurements-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="measurements-container">
          {/* 2-Column Layout Grid: Reused Community Sidebar + Measurements Content */}
          <div className="measurements-layout-grid">
            {/* 1. Left Customer Navigation Sidebar (Reused Community Sidebar) */}
            <aside className="customer-sidebar-nav">
              <nav className="sidebar-menu-list">
                <Link href="/customer/dashboard" className="sidebar-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <Link href="/customer/appointments" className="sidebar-item">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>

                <Link href="/customer/orders" className="sidebar-item">
                  <Package size={18} />
                  <span>Orders</span>
                </Link>

                {/* Active Measurements Tab */}
                <Link href="/customer/measurements" className="sidebar-item active">
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

            {/* 2. Main Measurements Content Area */}
            <main className="measurements-main-content">
              {/* Breadcrumb Navigation */}
              <nav className="measurements-breadcrumb-nav" aria-label="Breadcrumb">
                <Link href="/" className="crumb-link">
                  Home
                </Link>
                <ChevronRight size={14} className="crumb-sep" />
                <span className="crumb-current">Measurements</span>
              </nav>

              {/* Header Title Row */}
              <div className="measurements-header-row">
                <div className="header-title-block">
                  <h1 className="measurements-page-title">My Measurements</h1>
                  <p className="measurements-page-subtitle">
                    Manage your body measurements for the perfect fit.
                  </p>
                </div>

                <div className="header-spark-accent" aria-hidden="true">
                  <Sparkles size={24} className="sparkle-gold-icon" />
                </div>
              </div>

              {/* 3-Column Grid: Profile / Body Overview / Help & Video */}
              <div className="measurements-cards-grid">
                {/* Column 1: Measurement Profile Panel */}
                <section className="measurement-panel-card profile-selector-panel" aria-labelledby="profile-panel-heading">
                  <h2 id="profile-panel-heading" className="panel-card-title">
                    Measurement Profile
                  </h2>

                  <div className="profile-input-group">
                    <label htmlFor="profile-selector-dropdown" className="field-label">
                      Profile Name
                    </label>
                    <div className="select-dropdown-wrapper">
                      <select
                        id="profile-selector-dropdown"
                        value={activeProfileId}
                        onChange={(e) => setActiveProfileId(e.target.value)}
                        className="profile-name-select"
                      >
                        {profiles.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="dropdown-arrow-icon" />
                    </div>
                  </div>

                  <span className="last-updated-text">
                    Last updated: {activeProfile.lastUpdated}
                  </span>

                  <div className="units-input-group">
                    <label htmlFor="unit-selector-dropdown" className="field-label">
                      Units
                    </label>
                    <div className="select-dropdown-wrapper">
                      <select
                        id="unit-selector-dropdown"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as "Inches" | "Centimeters (cm)")}
                        className="unit-select-dropdown"
                      >
                        <option value="Inches">Inches</option>
                        <option value="Centimeters (cm)">Centimeters (cm)</option>
                      </select>
                      <ChevronDown size={16} className="dropdown-arrow-icon" />
                    </div>
                  </div>

                  <div className="profile-actions-bottom">
                    <Link
                      href="/customer/measurements/new"
                      className="add-new-measurement-btn"
                      style={{ textDecoration: "none" }}
                    >
                      <Plus size={16} />
                      <span>Add New Measurement</span>
                    </Link>

                    <button
                      type="button"
                      onClick={handleOpenEditModal}
                      className="edit-current-profile-btn"
                    >
                      <Edit3 size={15} />
                      <span>Edit Current Values</span>
                    </button>
                  </div>
                </section>

                {/* Column 2: Body Overview Panel (Silhouette + Measurements Table) */}
                <section className="measurement-panel-card body-overview-panel" aria-labelledby="body-overview-heading">
                  <h2 id="body-overview-heading" className="panel-card-title">
                    Body Overview
                  </h2>

                  <div className="body-overview-inner-split">
                    {/* Left: Interactive Anatomy Diagram */}
                    <div className="body-diagram-visual-box">
                      <div className="diagram-img-wrapper">
                        <img
                          src="/images/measurements/female-body-diagram.jpg"
                          alt="Body Anatomy Diagram"
                          className="diagram-silhouette-img"
                        />

                        {/* Interactive Hotspot Indicators */}
                        <button
                          type="button"
                          onMouseEnter={() => setHighlightedField("bust")}
                          onMouseLeave={() => setHighlightedField(null)}
                          className={`diagram-hotspot bust-dot ${highlightedField === "bust" ? "active" : ""}`}
                          title="Bust: 36 in"
                        />
                        <button
                          type="button"
                          onMouseEnter={() => setHighlightedField("waist")}
                          onMouseLeave={() => setHighlightedField(null)}
                          className={`diagram-hotspot waist-dot ${highlightedField === "waist" ? "active" : ""}`}
                          title="Waist: 30 in"
                        />
                        <button
                          type="button"
                          onMouseEnter={() => setHighlightedField("hip")}
                          onMouseLeave={() => setHighlightedField(null)}
                          className={`diagram-hotspot hip-dot ${highlightedField === "hip" ? "active" : ""}`}
                          title="Hip: 39 in"
                        />
                        <button
                          type="button"
                          onMouseEnter={() => setHighlightedField("shoulder")}
                          onMouseLeave={() => setHighlightedField(null)}
                          className={`diagram-hotspot shoulder-dot ${highlightedField === "shoulder" ? "active" : ""}`}
                          title="Shoulder: 15 in"
                        />
                      </div>
                    </div>

                    {/* Right: Measurements Table List */}
                    <div className="measurements-list-table-box">
                      <div className="measurements-table-header">
                        <span className="th-col th-label">Measurement</span>
                        <span className="th-col th-unit">{unit}</span>
                      </div>

                      <div className="measurements-table-body">
                        {measurementRows.map((row) => (
                          <div
                            key={row.key}
                            onMouseEnter={() => setHighlightedField(row.key)}
                            onMouseLeave={() => setHighlightedField(null)}
                            className={`measurement-table-row ${
                              highlightedField === row.key ? "highlighted" : ""
                            }`}
                          >
                            <span className="row-item-label">{row.label}</span>
                            <span className="row-item-value">{formatVal(row.val)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Column 3: Help & Video Cards */}
                <div className="measurements-side-cards-column">
                  {/* Card 3A: Need Help? & Size Guide */}
                  <section className="measurement-panel-card help-panel-card" aria-labelledby="need-help-heading">
                    <h2 id="need-help-heading" className="panel-card-title">
                      Need Help?
                    </h2>
                    <p className="help-card-desc">
                      Check our size guide or learn how to measure
                    </p>

                    <div className="size-badge-box">
                      <span className="standard-size-pill">
                        {activeProfile.standardSize || "M (Medium)"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="view-size-guide-btn"
                    >
                      View Size Guide
                    </button>
                  </section>

                  {/* Card 3B: How to Measure? Video Guide */}
                  <section className="measurement-panel-card video-panel-card" aria-labelledby="how-to-measure-heading">
                    <h2 id="how-to-measure-heading" className="panel-card-title">
                      How to Measure?
                    </h2>

                    <button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="watch-video-btn"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Watch Video</span>
                    </button>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* --------------------------------------------------------------------------
           MODAL 1: ADD / EDIT MEASUREMENTS FORM
           -------------------------------------------------------------------------- */}
        {isAddModalOpen && (
          <div className="measurements-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
            <div className="measurements-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">
                  {formProfileName ? "Edit Measurements" : "Add New Measurement Profile"}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="modal-form-scrollable">
                <div className="form-field-item">
                  <label className="field-label">Profile Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. My Festive Fit / Mom's Kurta"
                    value={formProfileName}
                    onChange={(e) => setFormProfileName(e.target.value)}
                    className="form-text-input"
                  />
                </div>

                <div className="form-two-col-grid">
                  <div className="form-field-item">
                    <label className="field-label">Bust ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formBust}
                      onChange={(e) => setFormBust(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Waist ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formWaist}
                      onChange={(e) => setFormWaist(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Hip ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formHip}
                      onChange={(e) => setFormHip(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Shoulder ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formShoulder}
                      onChange={(e) => setFormShoulder(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Arm Length ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formArmLength}
                      onChange={(e) => setFormArmLength(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>

                  <div className="form-field-item">
                    <label className="field-label">Sleeve Length ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formSleeveLength}
                      onChange={(e) => setFormSleeveLength(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>

                  <div className="form-field-item full-width">
                    <label className="field-label">Top / Kameez Length ({unit})</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={formTopLength}
                      onChange={(e) => setFormTopLength(Number(e.target.value))}
                      className="form-text-input"
                    />
                  </div>
                </div>

                <div className="form-field-item">
                  <label className="field-label">Notes for Tailor (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Specific fitting notes e.g. prefer comfort ease on arms..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="form-textarea-input"
                  />
                </div>

                <div className="modal-footer-actions">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="modal-secondary-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="modal-primary-btn"
                  >
                    {isSaving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
           MODAL 2: STANDARD SIZE GUIDE CHART
           -------------------------------------------------------------------------- */}
        {isSizeGuideOpen && (
          <div className="measurements-modal-overlay" onClick={() => setIsSizeGuideOpen(false)}>
            <div className="measurements-modal-card size-guide-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">Standard Size Guide Chart</h2>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                <p className="guide-intro-note">
                  Use this reference chart to compare your custom measurements against standard ready-to-wear sizes.
                </p>

                <div className="size-chart-table-wrapper">
                  <table className="size-chart-table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Bust</th>
                        <th>Waist</th>
                        <th>Hips</th>
                        <th>Shoulder</th>
                        <th>US</th>
                        <th>UK</th>
                      </tr>
                    </thead>
                    <tbody>
                      {STANDARD_SIZE_GUIDE_CHART.map((s) => (
                        <tr key={s.size} className={s.size.includes("Medium") ? "highlight-row" : ""}>
                          <td><strong>{s.size}</strong></td>
                          <td>{s.bust}</td>
                          <td>{s.waist}</td>
                          <td>{s.hip}</td>
                          <td>{s.shoulder}</td>
                          <td>{s.us}</td>
                          <td>{s.uk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="modal-footer-row">
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="modal-done-btn"
                >
                  Close Size Guide
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------------------
           MODAL 3: HOW TO MEASURE VIDEO & GUIDE TUTORIAL
           -------------------------------------------------------------------------- */}
        {isVideoModalOpen && (
          <div className="measurements-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
            <div className="measurements-modal-card video-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-row">
                <h2 className="modal-title">How to Measure at Home</h2>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-content-scrollable">
                {/* Simulated Video Player Banner */}
                <div className="video-player-mock-box">
                  <div className="video-backdrop">
                    <img
                      src="/images/home/ai_studio.png"
                      alt="Measuring Video Tutorial"
                      className="video-poster-img"
                    />
                    <div className="video-play-center-btn">
                      <Play size={32} fill="#ffffff" color="#ffffff" />
                    </div>
                  </div>
                  <span className="video-caption">
                    Video Guide: Easy 3-Minute Accurate Measuring Tutorial
                  </span>
                </div>

                <div className="measuring-steps-guide-list">
                  <h3 className="steps-list-heading">Step-by-Step Measuring Guidelines</h3>
                  {MEASURING_INSTRUCTIONS_STEPS.map((stepItem) => (
                    <div key={stepItem.step} className="measuring-step-card">
                      <strong className="step-card-title">{stepItem.step}</strong>
                      <p className="step-card-desc">{stepItem.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-footer-row">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="modal-done-btn"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Level Transparent Corner Motifs */}
        <div className="measurements-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="measurements-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
