"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Scissors,
  MapPin,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Upload,
  Plus,
  Trash2,
  Camera,
  Building,
  CreditCard,
  FileText,
  Sparkles,
  Check
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { AdminToast } from "@/components/admin/admin-toast";
import { adminService } from "@/lib/api/admin-service";
import "@/styles/pages/tailor-onboarding.css";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  selected: boolean;
}

const defaultServices: ServiceItem[] = [
  { id: "s1", name: "Hand-Embroidered Bridal Lehenga", category: "Bridal", basePrice: 18000, selected: true },
  { id: "s2", name: "Custom Sherwani & Prince Coat", category: "Formal", basePrice: 12000, selected: true },
  { id: "s3", name: "Raw Silk Anarkali Gown", category: "Formal", basePrice: 8500, selected: true },
  { id: "s4", name: "Designer Kurta & Shalwar", category: "Casual", basePrice: 2500, selected: true },
  { id: "s5", name: "Padded Saree Blouse with Latkans", category: "Bridal", basePrice: 3200, selected: false },
  { id: "s6", name: "Garment Fitting & Alterations", category: "Alterations", basePrice: 800, selected: false },
];

export function TailorOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Profile State
  const [profile, setProfile] = useState({
    avatarUrl: "/images/tailor-onboarding-avatar.jpg",
    fullName: "Arjun Verma",
    businessName: "Verma Stitch Studio",
    experience: "8 years",
    phone: "+91 98765-43210",
    email: "arjunverma@email.com",
    bio: "Master bespoke artisan specializing in royal wedding couture, zardozi embroidery, and precision tailored menswear."
  });

  // Step 2: Services State
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [turnaroundDays, setTurnaroundDays] = useState("7-10 days");
  const [expressAvailable, setExpressAvailable] = useState(true);

  // Step 3: Location State
  const [location, setLocation] = useState({
    streetAddress: "Shop #14, Main Market, Fashion Enclave",
    city: "Jaipur",
    province: "Rajasthan",
    postalCode: "302001",
    landmark: "Opposite Royal Palace Gate",
    offerHomeVisits: true
  });

  // Step 4: Gallery State
  const [gallery, setGallery] = useState<string[]>([
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
  ]);

  // Step 5: Verification & Bank State
  const [verification, setVerification] = useState({
    idNumber: "35201-9876543-1",
    bankName: "HDFC Bank",
    accountTitle: "Arjun Verma Stitch Studio",
    accountNumber: "50200099887766",
    acceptedTerms: true
  });

  const stepsList = [
    { num: 1, label: "Profile Setup" },
    { num: 2, label: "Service Setup" },
    { num: 3, label: "Location Setup" },
    { num: 4, label: "Gallery Upload" },
    { num: 5, label: "Verification" }
  ];

  const calculateProgressPercent = () => {
    return currentStep * 20;
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Synchronize with API / Admin service store
      await adminService.tailors.getTailors(); // prefetch / mock verify

      setToastMessage("🎉 Profile submitted successfully! Redirecting to your Artisan Dashboard...");
      setTimeout(() => {
        router.push("/tailor/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setToastMessage("Submitted profile saved locally.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PublicNav />

      <div className="tob-container">
        <div className="tob-inner">
          {/* Breadcrumb matching design */}
          <div className="tob-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#111827", fontWeight: 650 }}>Onboarding</span>
          </div>

          {/* Page Heading matching reference design */}
          <div className="tob-page-header">
            <h1 className="tob-page-title">Complete your profile</h1>
            <p className="tob-page-subtitle">
              Let&apos;s set up your account and start your journey with Sui Dhāga.
            </p>
          </div>

          {/* Stepper Progress Bar matching exact image layout */}
          <div className="tob-stepper-wrap">
            <div className="tob-stepper">
              {/* Background Line Connector */}
              <div className="tob-stepper-line">
                <div
                  className="tob-stepper-line-fill"
                  style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
                />
              </div>

              {stepsList.map((stepItem) => {
                const isActive = currentStep === stepItem.num;
                const isCompleted = currentStep > stepItem.num;
                return (
                  <button
                    key={stepItem.num}
                    type="button"
                    onClick={() => setCurrentStep(stepItem.num)}
                    className={`tob-step-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                  >
                    <div className="tob-step-circle">
                      {isCompleted ? <Check size={18} strokeWidth={3} /> : stepItem.num}
                    </div>
                    <span className="tob-step-label">
                      {isActive ? `❖ ${stepItem.label} ❖` : stepItem.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Grid: Active Form (Left) + Next Steps / Progress (Right) */}
          <div className="tob-main-grid">
            {/* Left Form Box */}
            <div className="tob-form-card">
              {/* =========================================================================
                  STEP 1: Profile Setup
                  ========================================================================= */}
              {currentStep === 1 && (
                <div>
                  <h2 className="tob-form-section-title">Profile Setup</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "28px", alignItems: "start" }}>
                    {/* Avatar Upload Block */}
                    <div className="tob-avatar-section">
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151" }}>
                        Upload Profile Photo
                      </span>
                      <img
                        src={profile.avatarUrl}
                        alt={profile.fullName}
                        className="tob-avatar-preview"
                      />
                      <button
                        type="button"
                        onClick={() => setToastMessage("Select a photo from your gallery to update portrait.")}
                        className="tob-change-photo-btn"
                      >
                        <Camera size={14} />
                        <span>Change Photo</span>
                      </button>
                    </div>

                    {/* Form Fields matching image */}
                    <div>
                      <div className="tob-form-group">
                        <label className="tob-label">Full Name</label>
                        <input
                          type="text"
                          value={profile.fullName}
                          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                          className="tob-input"
                          placeholder="e.g. Arjun Verma"
                        />
                      </div>

                      <div className="tob-form-group">
                        <label className="tob-label">Business Name</label>
                        <input
                          type="text"
                          value={profile.businessName}
                          onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                          className="tob-input"
                          placeholder="e.g. Verma Stitch Studio"
                        />
                      </div>

                      <div className="tob-form-group">
                        <label className="tob-label">Experience</label>
                        <select
                          value={profile.experience}
                          onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                          className="tob-select"
                        >
                          <option value="2 years">2 years</option>
                          <option value="5 years">5 years</option>
                          <option value="8 years">8 years</option>
                          <option value="12 years">12 years</option>
                          <option value="15+ years">15+ years</option>
                          <option value="20+ years">20+ years</option>
                        </select>
                      </div>

                      <div className="tob-form-group">
                        <label className="tob-label">Phone Number</label>
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="tob-input"
                            placeholder="+91 98765-43210"
                          />
                        </div>
                      </div>

                      <div className="tob-form-group">
                        <label className="tob-label">Email Address</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="tob-input"
                          placeholder="arjunverma@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="tob-actions-row">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="tob-btn-primary"
                    >
                      <span>Save & Continue</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="tob-btn-skip"
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 2: Service Setup
                  ========================================================================= */}
              {currentStep === 2 && (
                <div>
                  <h2 className="tob-form-section-title">Service Setup</h2>
                  <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: "0 0 20px" }}>
                    Select the tailoring categories and bespoke stitching services you offer with your starting rates.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                    {services.map((s, idx) => (
                      <div
                        key={s.id}
                        style={{
                          background: s.selected ? "#FAF8F5" : "#FFFFFF",
                          border: s.selected ? "1.5px solid #078B87" : "1px solid #E5E7EB",
                          borderRadius: "12px",
                          padding: "14px 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "16px"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <input
                            type="checkbox"
                            checked={s.selected}
                            onChange={(e) => {
                              const updated = [...services];
                              updated[idx].selected = e.target.checked;
                              setServices(updated);
                            }}
                            style={{ width: "18px", height: "18px", accentColor: "#078B87", cursor: "pointer" }}
                          />
                          <div>
                            <p style={{ fontSize: "0.95rem", fontWeight: 750, color: "#111827", margin: 0 }}>
                              {s.name}
                            </p>
                            <span style={{ fontSize: "0.78rem", color: "#6B7280", fontWeight: 600 }}>
                              Category: {s.category}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>Starting at</span>
                          <input
                            type="number"
                            value={s.basePrice}
                            onChange={(e) => {
                              const updated = [...services];
                              updated[idx].basePrice = Number(e.target.value);
                              setServices(updated);
                            }}
                            style={{
                              width: "110px",
                              padding: "6px 10px",
                              border: "1px solid #D1D5DB",
                              borderRadius: "8px",
                              fontSize: "0.9rem",
                              fontWeight: 750,
                              color: "#111827"
                            }}
                          />
                          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#374151" }}>₹</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="tob-form-row">
                    <div className="tob-form-group">
                      <label className="tob-label">Standard Turnaround Timeline</label>
                      <select
                        value={turnaroundDays}
                        onChange={(e) => setTurnaroundDays(e.target.value)}
                        className="tob-select"
                      >
                        <option value="3-5 days">3-5 days (Fast Track)</option>
                        <option value="7-10 days">7-10 days (Standard)</option>
                        <option value="12-16 days">12-16 days (Bridal Couture)</option>
                      </select>
                    </div>
                    <div className="tob-form-group">
                      <label className="tob-label">Express Stitching Service</label>
                      <div
                        style={{
                          background: "#F9FAFB",
                          border: "1px solid #E5E7EB",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}
                      >
                        <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#374151" }}>
                          Accept 48-hour rush orders (+25% fee)
                        </span>
                        <input
                          type="checkbox"
                          checked={expressAvailable}
                          onChange={(e) => setExpressAvailable(e.target.checked)}
                          style={{ width: "18px", height: "18px", accentColor: "#078B87", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="tob-actions-row">
                    <button type="button" onClick={handleNextStep} className="tob-btn-primary">
                      <span>Save & Continue</span>
                      <ArrowRight size={16} />
                    </button>
                    <button type="button" onClick={handlePrevStep} className="tob-btn-skip">
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 3: Location Setup
                  ========================================================================= */}
              {currentStep === 3 && (
                <div>
                  <h2 className="tob-form-section-title">Location Setup</h2>
                  <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: "0 0 20px" }}>
                    Pin your boutique workshop location so nearby customers can easily book appointments and request fitting visits.
                  </p>

                  <div className="tob-form-group">
                    <label className="tob-label">Shop / Workshop Street Address</label>
                    <input
                      type="text"
                      value={location.streetAddress}
                      onChange={(e) => setLocation({ ...location, streetAddress: e.target.value })}
                      className="tob-input"
                      placeholder="e.g. Shop #14, Main Fashion Bazaar"
                    />
                  </div>

                  <div className="tob-form-row">
                    <div className="tob-form-group">
                      <label className="tob-label">City</label>
                      <select
                        value={location.city}
                        onChange={(e) => setLocation({ ...location, city: e.target.value })}
                        className="tob-select"
                      >
                        <option value="Jaipur">Jaipur</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                      </select>
                    </div>
                    <div className="tob-form-group">
                      <label className="tob-label">Province / State</label>
                      <input
                        type="text"
                        value={location.province}
                        onChange={(e) => setLocation({ ...location, province: e.target.value })}
                        className="tob-input"
                        placeholder="e.g. Rajasthan"
                      />
                    </div>
                  </div>

                  <div className="tob-form-row">
                    <div className="tob-form-group">
                      <label className="tob-label">Prominent Landmark</label>
                      <input
                        type="text"
                        value={location.landmark}
                        onChange={(e) => setLocation({ ...location, landmark: e.target.value })}
                        className="tob-input"
                        placeholder="e.g. Opposite Central Mall"
                      />
                    </div>
                    <div className="tob-form-group">
                      <label className="tob-label">Postal / ZIP Code</label>
                      <input
                        type="text"
                        value={location.postalCode}
                        onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
                        className="tob-input"
                        placeholder="302001"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      background: "#FAF8F5",
                      border: "1px solid #EAE6DF",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <MapPin size={20} color="#078B87" />
                      <div>
                        <p style={{ fontSize: "0.92rem", fontWeight: 750, color: "#111827", margin: 0 }}>
                          Offer Home Measuring & Delivery Visits
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: "2px 0 0" }}>
                          Enable customers within 15 km radius to book home tailor visits.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={location.offerHomeVisits}
                      onChange={(e) => setLocation({ ...location, offerHomeVisits: e.target.checked })}
                      style={{ width: "18px", height: "18px", accentColor: "#078B87", cursor: "pointer" }}
                    />
                  </div>

                  <div className="tob-actions-row">
                    <button type="button" onClick={handleNextStep} className="tob-btn-primary">
                      <span>Save & Continue</span>
                      <ArrowRight size={16} />
                    </button>
                    <button type="button" onClick={handlePrevStep} className="tob-btn-skip">
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 4: Gallery Upload
                  ========================================================================= */}
              {currentStep === 4 && (
                <div>
                  <h2 className="tob-form-section-title">Gallery Upload</h2>
                  <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: "0 0 20px" }}>
                    Showcase high-resolution photos of your finished bespoke creations, intricate embroidery details, and workshop setups.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "14px",
                      marginBottom: "20px"
                    }}
                  >
                    {gallery.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: "relative",
                          borderRadius: "12px",
                          overflow: "hidden",
                          aspectRatio: "1",
                          border: "2px solid #EAE6DF"
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt={`Sample work ${idx + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          onClick={() => setGallery(gallery.filter((_, i) => i !== idx))}
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            background: "rgba(0,0,0,0.65)",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "50%",
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer"
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}

                    {/* Upload New Box */}
                    <div
                      onClick={() => {
                        setGallery([
                          ...gallery,
                          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
                        ]);
                        setToastMessage("Added sample photo to your portfolio showcase.");
                      }}
                      style={{
                        borderRadius: "12px",
                        border: "2px dashed #078B87",
                        background: "#F0FDF4",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        aspectRatio: "1",
                        gap: "6px",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <Plus size={24} color="#078B87" />
                      <span style={{ fontSize: "0.85rem", fontWeight: 750, color: "#078B87" }}>
                        Add Photo
                      </span>
                    </div>
                  </div>

                  <div className="tob-actions-row">
                    <button type="button" onClick={handleNextStep} className="tob-btn-primary">
                      <span>Save & Continue</span>
                      <ArrowRight size={16} />
                    </button>
                    <button type="button" onClick={handlePrevStep} className="tob-btn-skip">
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STEP 5: Verification & Submit
                  ========================================================================= */}
              {currentStep === 5 && (
                <form onSubmit={handleFinalSubmit}>
                  <h2 className="tob-form-section-title">Identity & Payout Verification</h2>
                  <p style={{ fontSize: "0.92rem", color: "#6B7280", margin: "0 0 20px" }}>
                    Submit government identification and banking details to become a <strong>Verified Partner</strong> and receive direct order payouts.
                  </p>

                  <div className="tob-form-group">
                    <label className="tob-label">National ID / CNIC / Aadhaar Number</label>
                    <input
                      type="text"
                      required
                      value={verification.idNumber}
                      onChange={(e) => setVerification({ ...verification, idNumber: e.target.value })}
                      className="tob-input"
                      placeholder="e.g. 35201-9876543-1"
                    />
                  </div>

                  <div className="tob-form-row">
                    <div className="tob-form-group">
                      <label className="tob-label">Bank Name</label>
                      <input
                        type="text"
                        required
                        value={verification.bankName}
                        onChange={(e) => setVerification({ ...verification, bankName: e.target.value })}
                        className="tob-input"
                        placeholder="e.g. HDFC Bank / Meezan Bank"
                      />
                    </div>
                    <div className="tob-form-group">
                      <label className="tob-label">Account Title</label>
                      <input
                        type="text"
                        required
                        value={verification.accountTitle}
                        onChange={(e) => setVerification({ ...verification, accountTitle: e.target.value })}
                        className="tob-input"
                        placeholder="e.g. Arjun Verma Stitch Studio"
                      />
                    </div>
                  </div>

                  <div className="tob-form-group">
                    <label className="tob-label">Account Number / IBAN</label>
                    <input
                      type="text"
                      required
                      value={verification.accountNumber}
                      onChange={(e) => setVerification({ ...verification, accountNumber: e.target.value })}
                      className="tob-input"
                      placeholder="PK78MEZN0002010103492817"
                    />
                  </div>

                  <div
                    style={{
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      margin: "18px 0",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px"
                    }}
                  >
                    <ShieldCheck size={22} color="#15803D" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ fontSize: "0.88rem", fontWeight: 750, color: "#166534", margin: "0 0 2px" }}>
                        Escrow Protection Guarantee
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "#166534", margin: 0, lineHeight: 1.5 }}>
                        All client payments are held safely in platform escrow upon order placement and released directly to your verified bank account upon delivery confirmation.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0" }}>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={verification.acceptedTerms}
                      onChange={(e) => setVerification({ ...verification, acceptedTerms: e.target.checked })}
                      required
                      style={{ width: "18px", height: "18px", accentColor: "#078B87", cursor: "pointer" }}
                    />
                    <label htmlFor="terms" style={{ fontSize: "0.85rem", color: "#374151", cursor: "pointer" }}>
                      I agree to the <Link href="/terms-and-conditions" style={{ color: "#078B87", fontWeight: 700 }}>Artisan Partner Terms</Link> and Quality Code of Conduct.
                    </label>
                  </div>

                  <div className="tob-actions-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="tob-btn-primary"
                      style={{ padding: "14px 34px" }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{isSubmitting ? "Submitting Profile..." : "Submit Profile for Verification"}</span>
                    </button>
                    <button type="button" onClick={handlePrevStep} className="tob-btn-skip">
                      Back
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar matching reference design */}
            <div className="tob-sidebar">
              {/* Card 1: What happens next? */}
              <div className="tob-next-card">
                <h3 className="tob-next-title">What happens next?</h3>
                <div className="tob-next-list">
                  <div className="tob-next-item">
                    <div className="tob-next-icon-circle">
                      <Scissors size={15} color="#078B87" />
                    </div>
                    <p className="tob-next-text">Add your services and custom pricing</p>
                  </div>

                  <div className="tob-next-item">
                    <div className="tob-next-icon-circle">
                      <MapPin size={15} color="#078B87" />
                    </div>
                    <p className="tob-next-text">Share your location to get discovered by local clients</p>
                  </div>

                  <div className="tob-next-item">
                    <div className="tob-next-icon-circle">
                      <ShieldCheck size={15} color="#078B87" />
                    </div>
                    <p className="tob-next-text">Upload your work and get verified within 24 hours</p>
                  </div>

                  <div className="tob-next-item">
                    <div className="tob-next-icon-circle">
                      <Sparkles size={15} color="#078B87" />
                    </div>
                    <p className="tob-next-text">Start receiving custom bespoke orders!</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Progress Card matching exact layout */}
              <div className="tob-progress-card">
                <p className="tob-progress-label">
                  Your profile is {calculateProgressPercent()}% complete
                </p>
                <div className="tob-progress-bar-bg">
                  <div
                    className="tob-progress-bar-fill"
                    style={{ width: `${calculateProgressPercent()}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Toast Alert */}
        {toastMessage && (
          <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </div>

      <PublicFooter />
    </>
  );
}
