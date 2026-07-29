"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  ShieldCheck,
  CheckCircle2,
  CalendarX,
  Scissors,
  Scale,
  CreditCard,
  Headphones,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";

export interface RefundSection {
  id: string;
  number: number;
  title: string;
  badge: string;
  summary: string;
  icon: any;
  subClauses: {
    heading: string;
    text: string;
  }[];
}

const refundSections: RefundSection[] = [
  {
    id: "refund-eligibility",
    number: 1,
    title: "Refund Eligibility",
    badge: "ELIGIBILITY CRITERIA",
    summary: "Clear conditions under which full or partial refunds are granted for custom tailoring orders.",
    icon: ShieldCheck,
    subClauses: [
      {
        heading: "Stitching & Fit Discrepancies",
        text: "You are eligible for a full refund or free alteration if the finished garment suffers structural stitching defects or deviates from your confirmed body measurement profile by more than 1.5 inches."
      },
      {
        heading: "Major Unapproved Design Deviation",
        text: "Refund eligibility triggers if the tailor makes unauthorized modifications to the agreed silhouette, sleeve style, neckline cut, or fabric choice without prior written customer consent."
      },
      {
        heading: "Material Damage Guarantee",
        text: "If client-supplied fabric is damaged, stained, or torn while in the tailor's care, Sui Dhaga reimburses the verified purchase value of the fabric in full."
      },
      {
        heading: "Extreme Fulfillment Delays",
        text: "If an order exceeds the promised completion deadline by more than 5 business days without agreed extension, you may cancel for a 100% refund."
      }
    ]
  },
  {
    id: "booking-cancellation",
    number: 2,
    title: "Booking Cancellation",
    badge: "APPOINTMENT SLOTS",
    summary: "Cancellation windows and deposit refund rules for home measurement visits and tailor consultations.",
    icon: CalendarX,
    subClauses: [
      {
        heading: "Free Cancellation Window",
        text: "Bookings may be cancelled free of charge with a 100% deposit refund up to 24 hours prior to the scheduled appointment time."
      },
      {
        heading: "Late Cancellation Fee",
        text: "Cancellations made within 6 hours of the slot incur a nominal 15% slot retention fee to compensate the tailor for reserved travel and consultation time."
      },
      {
        heading: "Tailor-Initiated Cancellations",
        text: "If a tailor cancels a confirmed booking, the customer receives an instant 100% refund plus a 10% discount voucher for their next booking."
      },
      {
        heading: "Free Slot Rescheduling",
        text: "Instead of cancelling, clients can reschedule their appointment up to 2 times free of charge at least 6 hours before the original time."
      }
    ]
  },
  {
    id: "order-cancellation",
    number: 3,
    title: "Order Cancellation",
    badge: "CUSTOM ORDERS",
    summary: "Refund terms based on custom garment production stages—before vs after fabric cutting.",
    icon: Scissors,
    subClauses: [
      {
        heading: "Pre-Cutting Full Refund",
        text: "Orders cancelled before fabric cutting and pattern drafting have commenced are eligible for a 100% full deposit refund."
      },
      {
        heading: "Post-Cutting Partial Refund",
        text: "If fabric cutting has already begun, raw material expenses and a 25% pattern drafting fee are retained, with the remaining balance refunded immediately."
      },
      {
        heading: "Custom Hand Embroidery Stage",
        text: "Once custom hand Zardozi or Aari embroidery work has commenced, artisan labor costs incurred up to that milestone are non-refundable."
      },
      {
        heading: "Inactivity Default Cancellation",
        text: "If a tailor fails to initiate work within 5 calendar days of order confirmation, the client may cancel for an immediate 100% refund."
      }
    ]
  },
  {
    id: "tailor-disputes",
    number: 4,
    title: "Tailor Disputes & Resolutions",
    badge: "DISPUTE MEDIATION",
    summary: "7-day free alteration guarantee, mediation procedures, and third-party alteration reimbursements.",
    icon: Scale,
    subClauses: [
      {
        heading: "7-Day Free Alteration Window",
        text: "Tailors are required to perform up to 2 free fit adjustments within 7 calendar days of garment delivery if sizing deviates from profile."
      },
      {
        heading: "Sui Dhaga Independent Inspection",
        text: "If a client and tailor disagree on fit or craft quality, Sui Dhaga's technical master tailors inspect measurement logs and photos to issue a binding ruling."
      },
      {
        heading: "Third-Party Alteration Credit",
        text: "If a local tailor correction is approved by our dispute team, Sui Dhaga reimburses up to 100% of reasonable third-party alteration receipts."
      },
      {
        heading: "Pre-Paid Return Courier",
        text: "We provide pre-paid return shipping labels for returning defective garments during approved dispute resolution cases."
      }
    ]
  },
  {
    id: "payment-refund-process",
    number: 5,
    title: "Payment Refund Process",
    badge: "ESCROW REVERSAL",
    summary: "Timelines, payment gateway reversals, escrow protection, and bank statement credits.",
    icon: CreditCard,
    subClauses: [
      {
        heading: "Original Payment Source Reversal",
        text: "Approved refunds are credited back directly to your original payment method (Credit/Debit Card, UPI, NetBanking, or Digital Wallet)."
      },
      {
        heading: "Processing Timeline",
        text: "Escrow refunds are initiated within 24 hours of dispute approval and reflect on your bank account statement within 3 to 5 business days."
      },
      {
        heading: "Sui Dhaga Wallet Bonus Option",
        text: "Customers may opt for instant Sui Dhaga Wallet credit with an extra 5% bonus top-up for immediate use on future tailoring orders."
      },
      {
        heading: "Bank Statement Line Item",
        text: "Refund credits appear on your bank statement under the merchant descriptor 'SUI DHAGA BOUTIQUE REFUND'."
      }
    ]
  },
  {
    id: "contact-support",
    number: 6,
    title: "Contact Support & Escalations",
    badge: "CUSTOMER HELPDESK",
    summary: "Dedicated resolution channels, response commitments, and escalation contacts for refund assistance.",
    icon: Headphones,
    subClauses: [
      {
        heading: "Dashboard One-Click Dispute Ticket",
        text: "Initiate a refund request directly from your Customer Orders Dashboard by clicking 'Request Refund' on the target order card."
      },
      {
        heading: "Priority Email Resolution Desk",
        text: "Send order numbers, photos, and refund claims directly to our resolution specialists at support@suidhaga.com."
      },
      {
        heading: "Guaranteed Response Timeline",
        text: "All refund tickets and dispute submissions receive an initial ticket response within 4 business hours."
      },
      {
        heading: "Telephone Helpline",
        text: "Call our customer care desk at +91 98765 43210 (Monday to Saturday, 9:00 AM – 7:00 PM IST) for live assistance."
      }
    ]
  }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "refund-eligibility": true,
    "booking-cancellation": true,
    "order-cancellation": true,
    "tailor-disputes": true,
    "payment-refund-process": true,
    "contact-support": true
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    refundSections.forEach((sec) => (allExpanded[sec.id] = true));
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    refundSections.forEach((sec) => (allCollapsed[sec.id] = false));
    setExpandedSections(allCollapsed);
  };

  const filteredSections = activeTab === "all"
    ? refundSections
    : refundSections.filter((sec) => sec.id === activeTab);

  return (
    <PublicShell>
      <div className="refund-reference-page">
        {/* Hero Section */}
        <section className="refund-hero" aria-labelledby="refund-title">
          <div className="refund-hero-copy">
            <p className="refund-breadcrumb">
              <Link href="/">
                <Home size={13} aria-hidden="true" />
                Home
              </Link>
              <span aria-hidden="true">&gt;</span>
              <span>Refund Policy</span>
            </p>
            <h1 id="refund-title">Refund Policy</h1>
            <p>
              Your peace of mind is guaranteed. Learn about our escrow protection, 7-day free alterations,
              order cancellation rules, and hassle-free payment refund timelines.
            </p>
          </div>

          <div className="refund-hero-illustration-container">
            <img
              src="/images/refund/hero-illustration.png"
              alt="Refund policy illustration"
              className="refund-hero-illustration-img"
            />
          </div>
        </section>

        {/* Quick Filter Navigation Bar */}
        <div className="refund-filter-bar">
          <div className="filter-tabs">
            <button
              className={`filter-chip ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All 6 Points
            </button>
            {refundSections.map((sec) => (
              <button
                key={sec.id}
                className={`filter-chip ${activeTab === sec.id ? "active" : ""}`}
                onClick={() => setActiveTab(sec.id)}
              >
                {sec.title}
              </button>
            ))}
          </div>

          <div className="expand-controls">
            <button onClick={expandAll} className="control-btn">
              Expand All
            </button>
            <span className="dot-sep">•</span>
            <button onClick={collapseAll} className="control-btn">
              Collapse All
            </button>
          </div>
        </div>

        {/* 6 Refund Points Grid */}
        <section className="refund-policy-grid" aria-label="Refund policy sections">
          {filteredSections.map((sec) => {
            const Icon = sec.icon;
            const isExpanded = !!expandedSections[sec.id];

            return (
              <article
                className={`refund-policy-card ${isExpanded ? "expanded" : ""}`}
                key={sec.id}
                id={sec.id}
              >
                <div className="refund-card-header" onClick={() => toggleSection(sec.id)}>
                  <div className="refund-policy-icon">
                    <Icon size={30} strokeWidth={1.9} />
                  </div>
                  <div className="refund-card-head-text">
                    <div className="refund-badge-row">
                      <span className="refund-num-pill">Point {sec.number}</span>
                      <span className="refund-category-badge">{sec.badge}</span>
                    </div>
                    <h2>{sec.title}</h2>
                    <p className="refund-summary">{sec.summary}</p>
                  </div>
                  <button
                    className="toggle-accordion-btn"
                    aria-label={isExpanded ? "Collapse section" : "Expand section"}
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="refund-clauses-body">
                    <div className="clauses-divider" />
                    <div className="clauses-list">
                      {sec.subClauses.map((clause, idx) => (
                        <div className="clause-item" key={idx}>
                          <div className="clause-check-icon">
                            <CheckCircle2 size={18} />
                          </div>
                          <div className="clause-content">
                            <h3>{clause.heading}</h3>
                            <p>{clause.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* 100% Escrow Protection Banner */}
        <section className="refund-trust-banner">
          <div className="banner-badge">
            <Sparkles size={18} />
            <span>100% MONEY-BACK ESCROW GUARANTEE</span>
          </div>
          <h2>Shop custom tailoring with complete confidence</h2>
          <p>
            Your payment stays protected in escrow until you approve your final fitting. If any garment fails
            to meet agreed specifications, our refund and free alteration policy protects you completely.
          </p>
        </section>

        {/* Support & Contact Card */}
        <section className="refund-support-card" aria-label="Refund helpdesk support">
          <article className="support-left">
            <div className="refund-support-icon">
              <HelpCircle size={34} strokeWidth={2} />
            </div>
            <div>
              <h2>Need Help With a Refund or Order Dispute?</h2>
              <p>
                Our dedicated resolution specialists are available to review fit photos, verify measurement logs,
                and process your payment refund quickly.
              </p>
            </div>
          </article>
          <article className="support-right">
            <h2>Order Resolution Desk</h2>
            <p>Get instant assistance with your refund claim.</p>
            <Link href="/contact" className="refund-contact-btn">
              Contact Support <ArrowRight size={16} />
            </Link>
          </article>
        </section>

        {/* Floating Decorative Elements */}
        <span className="refund-floating-diamond" aria-hidden="true" />
        <span className="refund-floating-ring" aria-hidden="true" />
      </div>
    </PublicShell>
  );
}
