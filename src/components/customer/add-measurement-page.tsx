"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Info,
  ArrowLeft,
  Check
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  saveMeasurementProfileApi,
  MeasurementProfile
} from "@/lib/measurements-data";

export function AddMeasurementPage() {
  const router = useRouter();
  const [unit, setUnit] = useState<"Inches" | "CM">("Inches");
  const [highlightedField, setHighlightedField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Form Fields (in inches by default)
  const [profileName, setProfileName] = useState<string>("");
  const [bust, setBust] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [shoulder, setShoulder] = useState<string>("");
  const [armLength, setArmLength] = useState<string>("");
  const [sleeveLength, setSleeveLength] = useState<string>("");
  const [topLength, setTopLength] = useState<string>("");
  const [neck, setNeck] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const unitSuffix = unit === "Inches" ? "in" : "cm";

  const handleUnitToggle = (newUnit: "Inches" | "CM") => {
    if (newUnit === unit) return;

    // Convert values if present
    const convert = (val: string, toCm: boolean) => {
      if (!val) return "";
      const num = parseFloat(val);
      if (isNaN(num)) return "";
      return toCm ? (num * 2.54).toFixed(1) : (num / 2.54).toFixed(1);
    };

    const toCm = newUnit === "CM";
    setBust(convert(bust, toCm));
    setWaist(convert(waist, toCm));
    setHip(convert(hip, toCm));
    setShoulder(convert(shoulder, toCm));
    setArmLength(convert(armLength, toCm));
    setSleeveLength(convert(sleeveLength, toCm));
    setTopLength(convert(topLength, toCm));
    setNeck(convert(neck, toCm));
    setUnit(newUnit);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const now = new Date();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;

    // Normalize to inches for standard comparison
    const bustInInches = unit === "CM" ? Number(bust) / 2.54 : Number(bust);

    const newProfile: MeasurementProfile = {
      id: `prof-${Date.now()}`,
      name: profileName.trim() || "My New Measurements",
      lastUpdated: formattedDate,
      unit: unit === "Inches" ? "Inches" : "Centimeters (cm)",
      standardSize:
        bustInInches <= 34 ? "S (Small)" : bustInInches <= 37 ? "M (Medium)" : "L (Large)",
      values: {
        bust: Number(bust) || 36,
        waist: Number(waist) || 30,
        hip: Number(hip) || 39,
        shoulder: Number(shoulder) || 15,
        armLength: Number(armLength) || 22,
        sleeveLength: Number(sleeveLength) || 18,
        topLength: Number(topLength) || 54,
        neck: Number(neck) || 14.5
      },
      notes: notes
    };

    try {
      await saveMeasurementProfileApi(newProfile);
      setSaveSuccess(true);
      setTimeout(() => {
        router.push("/customer/measurements");
      }, 700);
    } catch (err) {
      console.error(err);
      alert("Failed to save measurements. Please try again.");
      setIsSaving(false);
    }
  };

  return (
    <PublicShell>
      <div className="add-measurement-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="add-measurement-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="add-measurement-container">
          {/* Breadcrumb Navigation */}
          <nav className="add-measurement-breadcrumb-nav" aria-label="Breadcrumb">
            <Link href="/" className="crumb-link">
              Home
            </Link>
            <ChevronRight size={14} className="crumb-sep" />
            <Link href="/customer/measurements" className="crumb-link">
              Measurements
            </Link>
            <ChevronRight size={14} className="crumb-sep" />
            <span className="crumb-current">Add New</span>
          </nav>

          {/* Page Header with Units Toggle */}
          <div className="add-measurement-header-row">
            <div className="header-title-block">
              <h1 className="add-measurement-title">Add New Measurement</h1>
              <p className="add-measurement-subtitle">
                Enter your measurements to get the perfect fit.
              </p>
            </div>

            {/* Units Segmented Switcher */}
            <div className="units-toggle-block">
              <span className="units-toggle-label">Units</span>
              <div className="units-segmented-pill">
                <button
                  type="button"
                  onClick={() => handleUnitToggle("Inches")}
                  className={`unit-toggle-btn ${unit === "Inches" ? "active" : ""}`}
                >
                  Inches
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle("CM")}
                  className={`unit-toggle-btn ${unit === "CM" ? "active" : ""}`}
                >
                  CM
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Form Card */}
          <form onSubmit={handleSubmit} className="add-measurement-main-card">
            <div className="form-main-content-layout">
              {/* Left Column: Form Fields */}
              <div className="measurement-fields-column">
                <h2 className="fields-group-title">Body Measurements</h2>

                {/* Profile Name */}
                <div className="form-input-row profile-name-row">
                  <label htmlFor="profile-name-input" className="row-label">
                    Profile Name
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="profile-name-input"
                      type="text"
                      placeholder="e.g. My Festive Fit / Mom's Fit"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="form-num-input text-input-full"
                    />
                  </div>
                </div>

                {/* Bust */}
                <div
                  className={`form-input-row ${highlightedField === "bust" ? "focused" : ""}`}
                >
                  <label htmlFor="bust-input" className="row-label">
                    Bust
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="bust-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter bust size"
                      value={bust}
                      onFocus={() => setHighlightedField("bust")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setBust(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Waist */}
                <div
                  className={`form-input-row ${highlightedField === "waist" ? "focused" : ""}`}
                >
                  <label htmlFor="waist-input" className="row-label">
                    Waist
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="waist-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter waist size"
                      value={waist}
                      onFocus={() => setHighlightedField("waist")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setWaist(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Hip */}
                <div
                  className={`form-input-row ${highlightedField === "hip" ? "focused" : ""}`}
                >
                  <label htmlFor="hip-input" className="row-label">
                    Hip
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="hip-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter hip size"
                      value={hip}
                      onFocus={() => setHighlightedField("hip")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setHip(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Shoulder */}
                <div
                  className={`form-input-row ${highlightedField === "shoulder" ? "focused" : ""}`}
                >
                  <label htmlFor="shoulder-input" className="row-label">
                    Shoulder
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="shoulder-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter shoulder size"
                      value={shoulder}
                      onFocus={() => setHighlightedField("shoulder")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setShoulder(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Arm Length */}
                <div
                  className={`form-input-row ${highlightedField === "armLength" ? "focused" : ""}`}
                >
                  <label htmlFor="arm-input" className="row-label">
                    Arm Length
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="arm-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter arm length"
                      value={armLength}
                      onFocus={() => setHighlightedField("armLength")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setArmLength(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Sleeve Length */}
                <div
                  className={`form-input-row ${highlightedField === "sleeveLength" ? "focused" : ""}`}
                >
                  <label htmlFor="sleeve-input" className="row-label">
                    Sleeve Length
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="sleeve-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter sleeve length"
                      value={sleeveLength}
                      onFocus={() => setHighlightedField("sleeveLength")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setSleeveLength(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Top Length */}
                <div
                  className={`form-input-row ${highlightedField === "topLength" ? "focused" : ""}`}
                >
                  <label htmlFor="top-length-input" className="row-label">
                    Top Length
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="top-length-input"
                      type="number"
                      step="0.1"
                      required
                      placeholder="Enter top length"
                      value={topLength}
                      onFocus={() => setHighlightedField("topLength")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setTopLength(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>

                {/* Neck */}
                <div
                  className={`form-input-row ${highlightedField === "neck" ? "focused" : ""}`}
                >
                  <label htmlFor="neck-input" className="row-label">
                    Neck
                  </label>
                  <div className="input-with-suffix">
                    <input
                      id="neck-input"
                      type="number"
                      step="0.1"
                      placeholder="Enter neck size"
                      value={neck}
                      onFocus={() => setHighlightedField("neck")}
                      onBlur={() => setHighlightedField(null)}
                      onChange={(e) => setNeck(e.target.value)}
                      className="form-num-input"
                    />
                    <span className="unit-suffix-tag">{unitSuffix}</span>
                  </div>
                </div>
              </div>

              {/* Center Column: Interactive Mannequin Diagram */}
              <div className="body-diagram-center-column">
                <div className="diagram-container-frame">
                  <img
                    src="/images/measurements/female-body-diagram.jpg"
                    alt="Body Diagram"
                    className="diagram-mannequin-image"
                  />

                  {/* Hotspots */}
                  <div
                    className={`body-hotspot neck-pin ${highlightedField === "neck" ? "active" : ""}`}
                    title="Neck Point"
                  />
                  <div
                    className={`body-hotspot shoulder-pin ${highlightedField === "shoulder" ? "active" : ""}`}
                    title="Shoulder Point"
                  />
                  <div
                    className={`body-hotspot bust-pin ${highlightedField === "bust" ? "active" : ""}`}
                    title="Bust Point"
                  />
                  <div
                    className={`body-hotspot waist-pin ${highlightedField === "waist" ? "active" : ""}`}
                    title="Waist Point"
                  />
                  <div
                    className={`body-hotspot hip-pin ${highlightedField === "hip" ? "active" : ""}`}
                    title="Hip Point"
                  />
                  <div
                    className={`body-hotspot arm-pin ${highlightedField === "armLength" || highlightedField === "sleeveLength" ? "active" : ""}`}
                    title="Arm / Sleeve Point"
                  />
                </div>
              </div>

              {/* Right Column: Measurement Tips */}
              <div className="measurement-tips-column">
                <div className="measurement-tips-card">
                  <h3 className="tips-card-heading">Measurement Tips</h3>

                  <ul className="tips-checklist">
                    <li className="tip-item">
                      <span className="tip-bullet-dot" />
                      <span className="tip-text">Stand straight and relaxed.</span>
                    </li>
                    <li className="tip-item">
                      <span className="tip-bullet-dot" />
                      <span className="tip-text">Use a flexible tape measure.</span>
                    </li>
                    <li className="tip-item">
                      <span className="tip-bullet-dot" />
                      <span className="tip-text">Wear fitted clothes.</span>
                    </li>
                    <li className="tip-item">
                      <span className="tip-bullet-dot" />
                      <span className="tip-text">Measure over undergarments.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="add-measurement-form-footer">
              <button
                type="submit"
                disabled={isSaving}
                className="save-measurements-submit-btn"
              >
                {saveSuccess ? (
                  <>
                    <Check size={18} />
                    <span>Saved Successfully!</span>
                  </>
                ) : isSaving ? (
                  <span>Saving Measurements...</span>
                ) : (
                  <span>Save Measurements</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Page Level Transparent Corner Motifs */}
        <div className="add-measurement-corner-png-left" aria-hidden="true">
          <img src="/images/tailors/corner-yellow.png" alt="" className="corner-png-img" />
        </div>

        <div className="add-measurement-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
