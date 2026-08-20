"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wand2,
  Scissors,
  Ruler,
  ShieldCheck,
  Search,
  ChevronDown,
  Sparkles,
  HelpCircle,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import "@/styles/pages/how-it-works.css";

interface FaqItem {
  id: string;
  category: "general" | "customers" | "tailors" | "escrow" | "ai";
  question: string;
  answer: string;
}

const faqsData: FaqItem[] = [
  {
    id: "f1",
    category: "general",
    question: "How does Sui Dhāga guarantee the perfect fit?",
    answer:
      "Every order placed on Sui Dhāga is protected by our Perfect Fit Guarantee. Master tailors follow precise 3D measurement profiles, offer in-shop trial or home fitting sessions, and provide free alteration revisions if any garment requires minor adjustments."
  },
  {
    id: "f2",
    category: "escrow",
    question: "How does Escrow payment protection work?",
    answer:
      "When you place an order or book a tailor, your payment is securely held in platform Escrow. Funds are only transferred to the tailor artisan once you have received your finished outfit, tried it on, and confirmed your complete satisfaction."
  },
  {
    id: "f3",
    category: "customers",
    question: "Can I provide my own fabric or does the tailor source it?",
    answer:
      "You can choose either option! During checkout or service selection, you can elect to drop off / ship your own fabric, have the tailor pick it up during a home measurement visit, or choose premium silks, lawns, and organzas provided directly by the boutique."
  },
  {
    id: "f4",
    category: "ai",
    question: "How does the AI Design Studio help my tailor stitch accurately?",
    answer:
      "The AI Design Studio converts your text prompts and style ideas into multi-angle visual references with detailed neckline, sleeve, flare, and embroidery specifications. Tailors receive exportable specification sheets directly linked to your order code."
  },
  {
    id: "f5",
    category: "customers",
    question: "How do doorstep tailor measurement visits work?",
    answer:
      "Tailor partners who offer home measuring visits will travel to your address within their designated service radius (e.g. 15 km). They bring professional measuring tapes, silhouette guides, and fabric swatch catalogs to take accurate body dimensions in the comfort of your home."
  },
  {
    id: "f6",
    category: "general",
    question: "What is the typical stitching turnaround timeline?",
    answer:
      "Standard bespoke garments typically take 5-7 business days. Complex bridal couture and hand-embroidered lehengas take 10-15 days. For urgent events, many artisans offer a 48-Hour Rush Stitching service with priority tracking."
  },
  {
    id: "f7",
    category: "tailors",
    question: "How do tailor artisans get verified on Sui Dhāga?",
    answer:
      "Artisans submit government identity proof (CNIC / National ID / Aadhaar), workshop utility or commercial registration documents, and a portfolio of past finished work. Our curation team audits credentials within 24 hours before issuing the Verified Partner badge."
  },
  {
    id: "f8",
    category: "customers",
    question: "What happens if my custom garment requires alterations?",
    answer:
      "If any dimension or seam requires fine-tuning after delivery, simply notify your tailor through the platform within 7 days. Your tailor will perform alteration adjustments free of charge before the escrow payment is settled."
  },
  {
    id: "f9",
    category: "tailors",
    question: "How and when do tailor partners receive payouts?",
    answer:
      "Tailors can withdraw cleared earnings at any time directly to their verified bank accounts via NEFT, IMPS, or UPI. Payouts are processed instantly with transparent fee structures and zero hidden deductions."
  }
];

export function HowItWorksPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordionId, setOpenAccordionId] = useState<string | null>("f1");

  const filteredFaqs = faqsData.filter((item) => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  return (
    <>
      <PublicNav />

      <div className="hiw-container">
        <div className="hiw-inner">
          {/* Breadcrumb */}
          <div className="hiw-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: "#111827", fontWeight: 650 }}>How It Works &amp; FAQs</span>
          </div>

          {/* Hero Section */}
          <section className="hiw-hero">
            <div className="hiw-hero-badge">
              <Sparkles size={14} />
              <span>Effortless Custom Fashion</span>
            </div>
            <h1 className="hiw-hero-title">
              How <span>Sui Dhāga</span> Works
            </h1>
            <p className="hiw-hero-subtitle">
              From AI-powered design inspiration to bespoke doorstep fitting, here is how our end-to-end custom tailoring experience comes to life seamlessly.
            </p>
          </section>

          {/* 4-Step How It Works Process */}
          <section className="hiw-steps-section">
            <div className="hiw-section-heading-wrap">
              <h2 className="hiw-section-title">A Seamless 4-Step Journey</h2>
              <p className="hiw-section-sub">
                Designed for speed, fit precision, and total payment security.
              </p>
            </div>

            <div className="hiw-steps-grid">
              {/* Step 1 */}
              <div className="hiw-step-card">
                <div className="hiw-step-num-badge">1</div>
                <div className="hiw-step-icon-wrap">
                  <Wand2 size={28} color="#078B87" />
                </div>
                <h3 className="hiw-step-title">Explore in AI Studio</h3>
                <p className="hiw-step-desc">
                  Prompt customized silhouettes, necklines, sleeves, color palettes, and preview 3D photorealistic garment concepts in seconds.
                </p>
              </div>

              {/* Step 2 */}
              <div className="hiw-step-card">
                <div className="hiw-step-num-badge">2</div>
                <div className="hiw-step-icon-wrap">
                  <Scissors size={28} color="#078B87" />
                </div>
                <h3 className="hiw-step-title">Connect with Tailors</h3>
                <p className="hiw-step-desc">
                  Browse top-rated artisans nearby, filter by bespoke specialty (Bridal, Formal, Ethnic, Suits), and check transparent pricing.
                </p>
              </div>

              {/* Step 3 */}
              <div className="hiw-step-card">
                <div className="hiw-step-num-badge">3</div>
                <div className="hiw-step-icon-wrap">
                  <Ruler size={28} color="#078B87" />
                </div>
                <h3 className="hiw-step-title">Precise Measurements</h3>
                <p className="hiw-step-desc">
                  Save your 3D body measurements once, book home measuring visits or boutique fitting trials, and attach your preferred fabrics.
                </p>
              </div>

              {/* Step 4 */}
              <div className="hiw-step-card">
                <div className="hiw-step-num-badge">4</div>
                <div className="hiw-step-icon-wrap">
                  <ShieldCheck size={28} color="#078B87" />
                </div>
                <h3 className="hiw-step-title">Escrow &amp; Perfect Fit</h3>
                <p className="hiw-step-desc">
                  Your payment is safely held in escrow. Track live stitching milestones, try on your outfit, and release payment upon satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive FAQs Accordion Section */}
          <section className="hiw-faqs-section">
            <div className="hiw-section-heading-wrap">
              <div className="hiw-hero-badge" style={{ marginBottom: "10px" }}>
                <HelpCircle size={14} />
                <span>Knowledge Base</span>
              </div>
              <h2 className="hiw-section-title">Frequently Asked Questions</h2>
              <p className="hiw-section-sub">
                Quick answers on booking, measurements, payments, delivery, and tailor partnerships.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="hiw-faq-search-wrap">
              <Search size={18} className="hiw-faq-search-icon" />
              <input
                type="text"
                placeholder="Search questions, keywords, policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hiw-faq-search-input"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="hiw-faq-cats">
              {[
                { id: "all", label: "All Questions" },
                { id: "general", label: "General & Process" },
                { id: "customers", label: "For Customers" },
                { id: "tailors", label: "For Tailor Partners" },
                { id: "escrow", label: "Payments & Escrow" },
                { id: "ai", label: "AI Design Studio" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`hiw-cat-pill ${activeCategory === cat.id ? "active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="hiw-faq-accordion">
              {filteredFaqs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280" }}>
                  No matching questions found. Try a different search term or contact our support team.
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openAccordionId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`hiw-accordion-item ${isOpen ? "open" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(faq.id)}
                        className="hiw-accordion-header"
                      >
                        <span>{faq.question}</span>
                        <div className="hiw-accordion-icon">
                          <ChevronDown size={16} />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="hiw-accordion-body">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Support Callout Card */}
          <div className="hiw-support-card">
            <div className="hiw-support-info">
              <h3 className="hiw-support-title">Still have questions?</h3>
              <p className="hiw-support-desc">
                Our customer care and tailor concierge team is available Mon - Sat (9:00 AM - 7:00 PM) to assist you with design guidance, appointments, and custom orders.
              </p>
            </div>

            <div className="hiw-support-actions">
              <Link href="/contact" className="hiw-btn-contact">
                <MessageCircle size={16} />
                <span>Contact Support</span>
              </Link>
              <Link
                href="/tailors"
                style={{
                  color: "#FFFFFF",
                  fontWeight: 750,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px"
                }}
              >
                <span>Find a Tailor</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </>
  );
}
