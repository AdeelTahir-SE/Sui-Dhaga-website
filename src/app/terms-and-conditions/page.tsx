"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Shield,
  UserCheck,
  Scissors,
  CalendarCheck,
  CreditCard,
  FileText,
  Ban,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";

export interface TermsSection {
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

const termsSections: TermsSection[] = [
  {
    id: "platform-usage",
    number: 1,
    title: "Platform Usage Rules",
    badge: "GENERAL GOVERNANCE",
    summary: "Essential rules governing your access to the Sui Dhaga web and mobile ecosystem, AI Design Studio, and tailoring marketplace.",
    icon: Shield,
    subClauses: [
      {
        heading: "Account Eligibility & Age Requirement",
        text: "Users must be at least 18 years old or have explicit consent from a parent or legal guardian to create an account, purchase custom outfits, or register as a tailor partner."
      },
      {
        heading: "Fair System Usage & AI Integrity",
        text: "Automated scraping, reverse-engineering our AI design generation model, or exploiting system vulnerabilities is strictly prohibited and will result in immediate IP restriction."
      },
      {
        heading: "Account Security & Credentials",
        text: "You are solely responsible for protecting your account credentials and for all activities, bookings, and communications conducted under your profile."
      },
      {
        heading: "Boutique Marketplace Scope",
        text: "Sui Dhaga operates as a digital boutique platform connecting clients with independent expert artisans. We facilitate safe transactions, design previews, and order tracking."
      }
    ]
  },
  {
    id: "customer-responsibilities",
    number: 2,
    title: "Customer Responsibilities",
    badge: "CLIENT OBLIGATIONS",
    summary: "Your role in ensuring an accurate, timely, and successful custom garment creation experience.",
    icon: UserCheck,
    subClauses: [
      {
        heading: "Accurate Measurement Submission",
        text: "Customers must provide precise body measurements or book an in-person measurement session with a verified tailor. Sui Dhaga is not liable for fit discrepancies resulting from incorrect self-submitted measurements."
      },
      {
        heading: "Customer-Provided Fabric Care",
        text: "If supplying your own fabric, you must ensure sufficient yardage as specified by the tailor, inspect the material for flaws prior to handing it over, and state any special wash/steam requirements."
      },
      {
        heading: "Design Approval & Timely Feedback",
        text: "Prompt feedback on draft sketches, embroidery proofs, and fitting updates is required within 48 hours to maintain scheduled delivery dates."
      },
      {
        heading: "Fitting Session Attendance",
        text: "Clients must attend scheduled fitting appointments on time or provide at least 24 hours advance notice for rescheduling."
      }
    ]
  },
  {
    id: "tailor-responsibilities",
    number: 3,
    title: "Tailor Responsibilities",
    badge: "PARTNER CRAFTSMANSHIP",
    summary: "Professional standards of craftsmanship, order deadlines, pricing transparency, and material handling required from verified tailors.",
    icon: Scissors,
    subClauses: [
      {
        heading: "Craftsmanship & Design Fidelity",
        text: "Tailor partners agree to construct custom garments strictly adhering to the agreed design references, measurement profiles, stitching specifications, and lining quality."
      },
      {
        heading: "On-Time Order Fulfillment",
        text: "Orders must be completed and dispatched on or before the agreed delivery date. Continuous unexcused delays impact tailor verification standing on the platform."
      },
      {
        heading: "Transparent Itemized Pricing",
        text: "All fees—including base stitching, hand Zardozi embroidery, additional kalis, and alterations—must be declared upfront in the quote without hidden surcharges."
      },
      {
        heading: "Material Protection & Safeguarding",
        text: "Tailors are responsible for storing customer fabrics in clean, safe conditions and must compensate for any material damaged during cutting or tailoring."
      }
    ]
  },
  {
    id: "booking-rules",
    number: 4,
    title: "Booking Rules",
    badge: "APPOINTMENTS & SLOTS",
    summary: "Guidelines governing appointment scheduling, home consultation slots, order confirmation, and delay management.",
    icon: CalendarCheck,
    subClauses: [
      {
        heading: "Booking Confirmation",
        text: "An appointment or custom order is officially confirmed once accepted by the tailor and secured by the initial platform deposit."
      },
      {
        heading: "Rescheduling & Cancellations",
        text: "Free appointment rescheduling is available up to 24 hours prior to the slot. Late cancellations within 6 hours may incur a nominal slot retention fee."
      },
      {
        heading: "Home Consultation Service Areas",
        text: "Home measurement visits are valid only within designated tailor service radius limits as verified during the booking process."
      },
      {
        heading: "Unforeseen Craft Delays",
        text: "In cases of intricate artisan handwork requiring extra drying or hand-embroidery time, tailors must notify the customer and support team at least 48 hours before the deadline."
      }
    ]
  },
  {
    id: "payment-rules",
    number: 5,
    title: "Payment Rules",
    badge: "ESCROW & TRANSACTIONS",
    summary: "Secure escrow payment protection, advance deposit requirements, milestone disbursements, and refund conditions.",
    icon: CreditCard,
    subClauses: [
      {
        heading: "Sui Dhaga Escrow Protection",
        text: "All payments are held securely in escrow by Sui Dhaga payment partners and are released to tailors only after successful fitting approval or order completion."
      },
      {
        heading: "Advance Deposit Standard",
        text: "A 50% advance deposit is required upon order placement to enable tailors to procure raw materials and draft custom pattern cuts."
      },
      {
        heading: "Final Balance Release",
        text: "The remaining 50% balance is charged upon final garment inspection or courier dispatch verification."
      },
      {
        heading: "Refund Eligibility",
        text: "Refunds are processed per our Refund Policy in instances of irreparable size error, major unapproved design deviation, or unfulfilled order deadlines."
      }
    ]
  },
  {
    id: "content-rules",
    number: 6,
    title: "Content & Design Intellectual Property",
    badge: "INTELLECTUAL PROPERTY",
    summary: "Ownership of custom designs, community showcase photos, AI prompt inputs, and acceptable content standards.",
    icon: FileText,
    subClauses: [
      {
        heading: "Ownership of Original Concepts",
        text: "Design concepts uploaded or configured by clients remain their personal property. Tailors receive a limited non-exclusive license to manufacture the garment for that specific order."
      },
      {
        heading: "Community Feed Submissions",
        text: "By publishing photos to the Sui Dhaga Community Inspiration gallery, you grant us a non-exclusive license to feature your outfit look across our platform for inspiration."
      },
      {
        heading: "Prohibited Content & Media",
        text: "Users may not upload offensive, explicit, trademark-violating, or defamatory image references or text prompts into the AI studio or message channels."
      },
      {
        heading: "AI Generation Usage",
        text: "AI Studio visuals are synthesized design previews intended for personal custom tailoring inspiration and non-commercial visualization."
      }
    ]
  },
  {
    id: "account-suspension",
    number: 7,
    title: "Account Suspension & Termination",
    badge: "PLATFORM SAFETY",
    summary: "Grounds for policy warnings, temporary service holds, marketplace delisting, and account termination.",
    icon: Ban,
    subClauses: [
      {
        heading: "Off-Platform Transaction Solicitation",
        text: "Attempting to bypass Sui Dhaga escrow by soliciting direct cash payments or offline deals outside the platform compromises buyer protection and is grounds for immediate account suspension."
      },
      {
        heading: "Harassment & Abusive Conduct",
        text: "Zero tolerance is enforced for discriminatory language, harassment, or verbal abuse directed towards clients, tailors, or customer care specialists."
      },
      {
        heading: "Repeated Order Default",
        text: "Tailors who consistently fail to deliver orders or maintain minimum rating benchmarks will face temporary queue restriction or permanent store delisting."
      },
      {
        heading: "Suspension Appeals Process",
        text: "If your account is placed on hold, you may submit a formal appeal to support@suidhaga.com within 14 calendar days along with supporting documentation."
      }
    ]
  }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "platform-usage": true,
    "customer-responsibilities": true,
    "tailor-responsibilities": true,
    "booking-rules": true,
    "payment-rules": true,
    "content-rules": true,
    "account-suspension": true
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    termsSections.forEach((sec) => (allExpanded[sec.id] = true));
    setExpandedSections(allExpanded);
  };

  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    termsSections.forEach((sec) => (allCollapsed[sec.id] = false));
    setExpandedSections(allCollapsed);
  };

  const filteredSections = activeTab === "all"
    ? termsSections
    : termsSections.filter((sec) => sec.id === activeTab);

  return (
    <PublicShell>
      <div className="terms-reference-page">
        {/* Hero Section */}
        <section className="terms-hero" aria-labelledby="terms-title">
          <div className="terms-hero-copy">
            <p className="terms-breadcrumb">
              <Link href="/">
                <Home size={13} aria-hidden="true" />
                Home
              </Link>
              <span aria-hidden="true">&gt;</span>
              <span>Terms &amp; Conditions</span>
            </p>
            <h1 id="terms-title">Terms &amp; Conditions</h1>
            <p>
              The rules, rights, and responsibilities that ensure custom fashion bookings,
              escrow payments, AI design tools, and tailor collaborations remain transparent,
              safe, and fair for everyone.
            </p>
          </div>

          <div className="terms-hero-illustration-container">
            <img
              src="/images/terms/hero-illustration.png"
              alt="Terms and conditions legal illustration"
              className="terms-hero-illustration-img"
            />
          </div>
        </section>

        {/* Quick Filter Navigation Bar */}
        <div className="terms-filter-bar">
          <div className="filter-tabs">
            <button
              className={`filter-chip ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All 7 Rules
            </button>
            {termsSections.map((sec) => (
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

        {/* 7 Rules Detailed Grid */}
        <section className="terms-policy-grid" aria-label="Terms and conditions sections">
          {filteredSections.map((sec) => {
            const Icon = sec.icon;
            const isExpanded = !!expandedSections[sec.id];

            return (
              <article
                className={`terms-policy-card ${isExpanded ? "expanded" : ""}`}
                key={sec.id}
                id={sec.id}
              >
                <div className="terms-card-header" onClick={() => toggleSection(sec.id)}>
                  <div className="terms-policy-icon">
                    <Icon size={30} strokeWidth={1.9} />
                  </div>
                  <div className="terms-card-head-text">
                    <div className="terms-badge-row">
                      <span className="terms-num-pill">Section {sec.number}</span>
                      <span className="terms-category-badge">{sec.badge}</span>
                    </div>
                    <h2>{sec.title}</h2>
                    <p className="terms-summary">{sec.summary}</p>
                  </div>
                  <button
                    className="toggle-accordion-btn"
                    aria-label={isExpanded ? "Collapse section" : "Expand section"}
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="terms-clauses-body">
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

        {/* Transparency & Trust Banner */}
        <section className="terms-trust-banner">
          <div className="banner-badge">
            <Sparkles size={18} />
            <span>TRANSPARENT FAIR-TRADE POLICY</span>
          </div>
          <h2>Built on trust, tailored with integrity</h2>
          <p>
            Sui Dhaga holds all transactions in secure escrow and protects both clients and artisan tailors
            with verified review systems, precise measurement mapping, and dedicated dispute resolution.
          </p>
        </section>

        {/* Support & Contact Card */}
        <section className="terms-support-card" aria-label="Policy questions support">
          <article className="support-left">
            <div className="terms-support-icon">
              <HelpCircle size={34} strokeWidth={2} />
            </div>
            <div>
              <h2>Have Questions About Our Terms?</h2>
              <p>
                Our legal and customer support team is available 6 days a week to clarify any policy,
                booking rule, or tailor agreement questions.
              </p>
            </div>
          </article>
          <article className="support-right">
            <h2>Legal &amp; Policy Helpdesk</h2>
            <p>Get in touch with our policy team for assistance.</p>
            <Link href="/contact" className="terms-contact-btn">
              Contact Support <ArrowRight size={16} />
            </Link>
          </article>
        </section>

        {/* Floating Decorative Elements */}
        <span className="terms-floating-diamond" aria-hidden="true" />
        <span className="terms-floating-ring" aria-hidden="true" />
      </div>
    </PublicShell>
  );
}
