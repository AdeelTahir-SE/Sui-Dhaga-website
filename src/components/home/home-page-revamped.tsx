"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Users,
  Heart,
  Star,
  Sparkles,
  Layers,
  Send,
  FolderHeart,
  Scissors,
  Palette,
  Building2,
  ShieldCheck,
  Cpu,
  Lock,
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  FileCheck,
  PackageCheck,
  Store,
  HelpCircle,
} from "lucide-react";

export function HomePageRevamped() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0); // First FAQ open by default
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const testimonials = [
    {
      name: "Neha Kapoor",
      role: "Designer, Mumbai",
      avatar: "/images/home/avatar-neha.jpg",
      quote:
        "The AI design studio is a game changer. It saves me hours every week!",
      rating: 5,
    },
    {
      name: "Imran Khan",
      role: "Tailor, Karachi",
      avatar: "/images/home/avatar-imran.jpg",
      quote:
        "Managing orders and clients has never been this easy. Sui Dhaga is a must-have!",
      rating: 5,
    },
    {
      name: "Priya Mehta",
      role: "Brand Owner, Delhi",
      avatar: "/images/home/avatar-priya.jpg",
      quote:
        "I found amazing tailors for my brand. The community is so supportive!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How do I create an account?",
      a: "Click on 'Get Started Free' at the top or bottom of the page. Fill in your basic details, choose whether you are a Customer, Tailor, or Designer, and your account will be activated instantly.",
    },
    {
      q: "Can I work with multiple tailors?",
      a: "Yes, you can browse verified tailors across specialties (bridal, suits, casuals), message them directly, request quotes, and manage multiple custom orders simultaneously.",
    },
    {
      q: "Is the AI design studio free to use?",
      a: "Yes! Every user receives free starter AI generation credits upon registration to sketch garments, generate variations, and export design specifications.",
    },
    {
      q: "How do I track my orders?",
      a: "Once an order is placed, you can track its progress step-by-step in your customer dashboard, from measurement approval and stitching to packaging and doorstep delivery.",
    },
    {
      q: "What payment methods are accepted?",
      a: "We support Credit/Debit Cards, Net Banking, UPI, digital wallets, and milestone-based escrow payments to ensure both tailors and customers are 100% protected.",
    },
    {
      q: "Is Sui Dhaga available in my country?",
      a: "Sui Dhaga provides local tailor connections across India and Pakistan, while our AI Design Studio and digital fashion consulting tools are accessible globally.",
    },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-revamp-root" suppressHydrationWarning>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Pic 1 Top)                                               */}
      {/* ========================================================================= */}
      <section className="hr-hero-section">
        <div className="hr-hero-bg-blobs" aria-hidden="true">
          <div className="hr-blob-mint"></div>
          <div className="hr-blob-coral-corner"></div>
          <div className="hr-doodle-dashes"></div>
        </div>

        <div className="hr-container hr-hero-container">
          <div className="hr-hero-left">
            <span className="hr-eyebrow-text">Your Creative Business Partner</span>

            <h1 className="hr-hero-heading">
              Your style. <br />
              <span className="hr-hero-coral-heading">Our craft.</span>
            </h1>

            <p className="hr-hero-description">
              Discover, create, and grow your tailor business with Sui Dhaga — the all-in-one platform for
              designers, tailors and fashion entrepreneurs.
            </p>

            <div className="hr-hero-btn-row">
              <Link href="/auth/register" className="hr-btn hr-btn-teal">
                <span>Get Started Free</span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                className="hr-btn hr-btn-outline"
                onClick={() => setDemoOpen(true)}
              >
                <span className="hr-play-icon-wrap">
                  <Play size={12} fill="currentColor" />
                </span>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* 3 Metrics Row */}
            <div className="hr-hero-stats-row">
              <div className="hr-stat-box">
                <div className="hr-stat-icon-wrap hr-stat-teal">
                  <Users size={18} />
                </div>
                <div className="hr-stat-info">
                  <strong>50,000+</strong>
                  <span>Active Tailors</span>
                </div>
              </div>

              <div className="hr-stat-box">
                <div className="hr-stat-icon-wrap hr-stat-coral">
                  <Heart size={18} />
                </div>
                <div className="hr-stat-info">
                  <strong>120,000+</strong>
                  <span>Happy Customers</span>
                </div>
              </div>

              <div className="hr-stat-box">
                <div className="hr-stat-icon-wrap hr-stat-yellow">
                  <Star size={18} fill="#F59E0B" color="#F59E0B" />
                </div>
                <div className="hr-stat-info">
                  <strong>4.8/5</strong>
                  <span>Customer Rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hr-hero-right">
            <div className="hr-hero-art-wrapper">
              <div className="hr-hero-mint-backdrop"></div>
              <div className="hr-hero-coral-accent"></div>
              <img
                src="/images/home/hero_illustration.png"
                alt="Sui Dhaga Tailor and Fashion Designer"
                className="hr-hero-illustration-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EVERYTHING YOU NEED IN ONE PLACE (Pic 1 Mid)                           */}
      {/* ========================================================================= */}
      <section className="hr-section hr-features-section">
        <div className="hr-container">
          <div className="hr-heading-block">
            <h2 className="hr-title-main">Everything you need in one place</h2>
            <p className="hr-subtitle-main">
              From design to delivery, Sui Dhaga helps you manage your entire tailoring business — easily and
              efficiently.
            </p>
          </div>

          <div className="hr-features-grid-4">
            <div className="hr-card-feature">
              <div className="hr-f-icon-circle hr-icon-mint-bg">
                <Palette size={22} className="hr-icon-mint-fg" />
              </div>
              <h3>Create Designs</h3>
              <p>Bring your ideas to life with easy design tools.</p>
            </div>

            <div className="hr-card-feature">
              <div className="hr-f-icon-circle hr-icon-coral-bg">
                <FileCheck size={22} className="hr-icon-coral-fg" />
              </div>
              <h3>Manage Orders</h3>
              <p>Track orders and meet deadlines.</p>
            </div>

            <div className="hr-card-feature">
              <div className="hr-f-icon-circle hr-icon-yellow-bg">
                <Store size={22} className="hr-icon-yellow-fg" />
              </div>
              <h3>Grow Your Business</h3>
              <p>Get discovered by more customers.</p>
            </div>

            <div className="hr-card-feature">
              <div className="hr-f-icon-circle hr-icon-blue-bg">
                <ShieldCheck size={22} className="hr-icon-blue-fg" />
              </div>
              <h3>Secure &amp; Reliable</h3>
              <p>Safe payments and trusted support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DESIGNED FOR EVERY STEP OF YOUR JOURNEY (Pic 1 Lower Mid)              */}
      {/* ========================================================================= */}
      <section className="hr-section hr-journey-section">
        <div className="hr-container hr-journey-layout">
          <div className="hr-journey-text">
            <h2 className="hr-title-main hr-text-left">Designed for every step of your journey</h2>
            <p className="hr-subtitle-main hr-text-left">
              Whether you&apos;re a tailor, designer, or fashion brand, Sui Dhaga gives you the tools to work
              smarter, not harder.
            </p>
            <div className="hr-journey-cta-wrap">
              <Link href="/how-it-works" className="hr-btn hr-btn-teal">
                <span>Explore Features</span>
              </Link>
            </div>
          </div>

          <div className="hr-journey-graphic">
            <div className="hr-journey-graphic-card">
              <img
                src="/images/home/journey-mockup.jpg"
                alt="Designed for every step mockup"
                className="hr-journey-mockup-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS (Pic 1 Bottom)                                            */}
      {/* ========================================================================= */}
      <section className="hr-section hr-how-it-works-section">
        <div className="hr-container">
          <div className="hr-heading-block">
            <h2 className="hr-title-main">How It Works</h2>
            <p className="hr-subtitle-main">Simple steps to your perfect fit.</p>
          </div>

          <div className="hr-steps-stepper">
            {/* Step 1 */}
            <div className="hr-step-box">
              <div className="hr-step-round-icon hr-step-icon-teal">
                <Users size={24} />
              </div>
              <h4>1. Create Account</h4>
              <p>Sign up in minutes and set up your profile.</p>
            </div>

            <div className="hr-step-connector-arrow" aria-hidden="true">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="hr-step-box">
              <div className="hr-step-round-icon hr-step-icon-coral">
                <Layers size={24} />
              </div>
              <h4>2. Add Your Work</h4>
              <p>Upload designs, styles or services.</p>
            </div>

            <div className="hr-step-connector-arrow" aria-hidden="true">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="hr-step-box">
              <div className="hr-step-round-icon hr-step-icon-blue">
                <Sparkles size={24} />
              </div>
              <h4>3. Connect</h4>
              <p>Tailor your preferences and find your audience.</p>
            </div>

            <div className="hr-step-connector-arrow" aria-hidden="true">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path d="M0 6H28M28 6L23 1M28 6L23 11" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="hr-step-box">
              <div className="hr-step-round-icon hr-step-icon-yellow">
                <Heart size={24} />
              </div>
              <h4>4. Receive</h4>
              <p>Manage your business with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AI STUDIO (Pic 2 Top)                                                  */}
      {/* ========================================================================= */}
      <section className="hr-section hr-ai-studio-section">
        <div className="hr-container">
          <div className="hr-heading-block">
            <h2 className="hr-title-main">AI Studio</h2>
            <h3 className="hr-title-secondary">Generate stunning designs and share with your tailors.</h3>
            <p className="hr-subtitle-main">
              Turn your ideas into professional designs with AI, and share them directly with your team.
            </p>
            <div className="hr-ai-cta-row">
              <Link href="/design-studio" className="hr-btn hr-btn-teal">
                <span>Explore AI Studio</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Center Laptop Showcase */}
          <div className="hr-ai-laptop-stage">
            <div className="hr-ai-laptop-card">
              <img
                src="/images/home/ai-studio-showcase.jpg"
                alt="AI Fashion Design Studio Showcase"
                className="hr-ai-laptop-img"
              />
            </div>
          </div>

          {/* 4 Feature Pills Underneath */}
          <div className="hr-ai-pills-row">
            <div className="hr-ai-feature-pill">
              <div className="hr-pill-icon hr-icon-mint-bg">
                <Sparkles size={20} className="hr-icon-mint-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Text to Design</strong>
                <p>Describe your idea, get professional designs.</p>
              </div>
            </div>

            <div className="hr-ai-feature-pill">
              <div className="hr-pill-icon hr-icon-coral-bg">
                <Palette size={20} className="hr-icon-coral-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Multiple Variations</strong>
                <p>Explore different styles, colors and fits.</p>
              </div>
            </div>

            <div className="hr-ai-feature-pill">
              <div className="hr-pill-icon hr-icon-blue-bg">
                <Send size={20} className="hr-icon-blue-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Share Instantly</strong>
                <p>Send designs to your tailors and team.</p>
              </div>
            </div>

            <div className="hr-ai-feature-pill">
              <div className="hr-pill-icon hr-icon-yellow-bg">
                <FolderHeart size={20} className="hr-icon-yellow-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Save &amp; Organize</strong>
                <p>Keep your ideas and designs in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BUILT FOR TAILORS, DESIGNERS & BRANDS (Pic 2 Mid)                      */}
      {/* ========================================================================= */}
      <section className="hr-section hr-personas-section">
        <div className="hr-container">
          <div className="hr-heading-block">
            <h2 className="hr-title-main">Built for Tailors, Designers &amp; Fashion Entrepreneurs</h2>
            <p className="hr-subtitle-main">
              From small workshops to growing brands, Sui Dhaga supports your passion and helps you reach new
              heights.
            </p>
          </div>

          <div className="hr-personas-grid-3">
            {/* Card 1: Tailors */}
            <article className="hr-persona-item-card">
              <div className="hr-persona-photo-frame">
                <img
                  src="/images/home/persona-tailors.jpg"
                  alt="Tailor in workshop"
                  className="hr-persona-photo"
                />
              </div>
              <div className="hr-persona-info">
                <div className="hr-persona-tag-row">
                  <div className="hr-persona-icon-badge hr-badge-teal">
                    <Scissors size={16} />
                  </div>
                  <h3>Tailors</h3>
                </div>
                <ul className="hr-persona-bullet-list">
                  <li>
                    <span className="hr-bullet-circle"></span>
                    <span>Manage orders, track deliveries, and grow your client base.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Card 2: Designers */}
            <article className="hr-persona-item-card">
              <div className="hr-persona-photo-frame">
                <img
                  src="/images/home/persona-designers.jpg"
                  alt="Fashion Designer sketching"
                  className="hr-persona-photo"
                />
              </div>
              <div className="hr-persona-info">
                <div className="hr-persona-tag-row">
                  <div className="hr-persona-icon-badge hr-badge-coral">
                    <Palette size={16} />
                  </div>
                  <h3>Designers</h3>
                </div>
                <ul className="hr-persona-bullet-list">
                  <li>
                    <span className="hr-bullet-circle"></span>
                    <span>Showcase your collections and get discovered.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Card 3: Brands */}
            <article className="hr-persona-item-card">
              <div className="hr-persona-photo-frame">
                <img
                  src="/images/home/persona-brands.jpg"
                  alt="Fashion brand founder"
                  className="hr-persona-photo"
                />
              </div>
              <div className="hr-persona-info">
                <div className="hr-persona-tag-row">
                  <div className="hr-persona-icon-badge hr-badge-blue">
                    <Building2 size={16} />
                  </div>
                  <h3>Brands</h3>
                </div>
                <ul className="hr-persona-bullet-list">
                  <li>
                    <span className="hr-bullet-circle"></span>
                    <span>Scale your business with powerful tools and insights.</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY SUI DHAGA? (Pic 2 Lower Mid)                                       */}
      {/* ========================================================================= */}
      <section className="hr-section hr-why-section">
        <div className="hr-container">
          <div className="hr-heading-block">
            <h2 className="hr-title-main">Why Sui Dhaga?</h2>
          </div>

          <div className="hr-why-grid-4">
            <div className="hr-why-box-card">
              <div className="hr-why-icon-wrap hr-icon-mint-bg">
                <ShieldCheck size={28} className="hr-icon-mint-fg" />
              </div>
              <h4>Trusted Network</h4>
              <p>of expert tailors</p>
            </div>

            <div className="hr-why-box-card">
              <div className="hr-why-icon-wrap hr-icon-coral-bg">
                <Cpu size={28} className="hr-icon-coral-fg" />
              </div>
              <h4>AI-Powered</h4>
              <p>Design Studio</p>
            </div>

            <div className="hr-why-box-card">
              <div className="hr-why-icon-wrap hr-icon-blue-bg">
                <Lock size={28} className="hr-icon-blue-fg" />
              </div>
              <h4>Secure &amp; Easy</h4>
              <p>Experience</p>
            </div>

            <div className="hr-why-box-card">
              <div className="hr-why-icon-wrap hr-icon-yellow-bg">
                <Globe size={28} className="hr-icon-yellow-fg" />
              </div>
              <h4>Made for You</h4>
              <p>Loved Globally</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FEATURED TESTIMONIAL BANNER (Pic 3 Top)                                */}
      {/* ========================================================================= */}
      <section className="hr-section hr-featured-quote-section">
        <div className="hr-container">
          <div className="hr-featured-quote-banner">
            <div className="hr-quote-content-col">
              <div className="hr-quote-mark-icon">“</div>
              <blockquote className="hr-quote-text">
                &ldquo;Sui Dhaga makes my work easier, faster and more professional. I love it!&rdquo;
              </blockquote>
              <div className="hr-quote-signoff">
                <strong>Rohit Sharma</strong>
                <span>Tailor, New Delhi</span>
              </div>
            </div>

            <div className="hr-quote-image-col">
              <div className="hr-quote-photo-holder">
                <img
                  src="/images/home/testimonial-rohit.jpg"
                  alt="Rohit Sharma Tailor"
                  className="hr-quote-photo-img"
                />
                <div className="hr-quote-floating-heart hr-heart-top-right">
                  <Heart size={16} fill="#FF5B52" color="#FF5B52" />
                </div>
                <div className="hr-quote-floating-heart hr-heart-bottom-left">
                  <Heart size={14} fill="#078B87" color="#078B87" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHAT OUR COMMUNITY SAYS (Pic 3 Mid)                                    */}
      {/* ========================================================================= */}
      <section className="hr-section hr-community-section">
        <div className="hr-container">
          <div className="hr-heading-block">
            <h2 className="hr-title-main">What Our Community Says</h2>
            <p className="hr-subtitle-main">Real stories from tailors, designers and brands around the world.</p>
          </div>

          <div className="hr-carousel-wrapper">
            <button
              type="button"
              className="hr-carousel-nav-btn hr-btn-prev"
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="hr-testimonials-grid-3">
              {testimonials.map((t, idx) => (
                <article
                  key={t.name}
                  className={`hr-community-review-card ${idx === testimonialIndex ? "hr-review-active" : ""}`}
                >
                  <div className="hr-review-avatar-wrap">
                    <img src={t.avatar} alt={t.name} className="hr-review-avatar" />
                  </div>
                  <p className="hr-review-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="hr-review-author-meta">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                  <div className="hr-review-stars-row" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="hr-carousel-nav-btn hr-btn-next"
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="hr-carousel-pagination-dots">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                className={`hr-dot-btn ${dotIdx === testimonialIndex ? "active" : ""}`}
                onClick={() => setTestimonialIndex(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (Pic 3 Lower Mid)                          */}
      {/* ========================================================================= */}
      <section className="hr-section hr-faq-section">
        <div className="hr-container hr-faq-layout">
          <div className="hr-faq-left-col">
            <div className="hr-heading-block hr-text-left">
              <h2 className="hr-title-main hr-text-left">Frequently Asked Questions</h2>
              <p className="hr-subtitle-main hr-text-left">Find quick answers to common questions about Sui Dhaga.</p>
            </div>

            <div className="hr-faq-accordion-group">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`hr-faq-card-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="hr-faq-btn-trigger"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="hr-faq-question-text">{faq.q}</span>
                      <span className="hr-faq-chevron-icon">
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="hr-faq-answer-drawer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hr-faq-right-col">
            <div className="hr-faq-character-holder">
              <img
                src="/images/home/faq-illustration.jpg"
                alt="Frequently Asked Questions Assistance"
                className="hr-faq-illustration-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. READY TO GROW YOUR BUSINESS CTA BANNER (Pic 3 Bottom)                 */}
      {/* ========================================================================= */}
      <section className="hr-section hr-cta-strip-section">
        <div className="hr-container">
          <div className="hr-bottom-cta-banner">
            <div className="hr-cta-corner-ribbon-teal" aria-hidden="true"></div>
            <div className="hr-cta-corner-ribbon-yellow" aria-hidden="true"></div>

            <div className="hr-bottom-cta-left">
              <div className="hr-cta-mannequin-frame">
                <img
                  src="/images/home/cta-mannequin.jpg"
                  alt="Ready to grow your tailoring business"
                  className="hr-cta-mannequin-img"
                />
              </div>
            </div>

            <div className="hr-bottom-cta-right">
              <h2 className="hr-bottom-cta-title">Ready to Grow Your Business?</h2>
              <p className="hr-bottom-cta-subtitle">
                Join thousands of tailors and designers already using Sui Dhaga.
              </p>
              <div className="hr-bottom-cta-btn-wrap">
                <Link href="/auth/register" className="hr-btn hr-btn-teal hr-btn-cta-large">
                  <span>Get Started Free</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE DEMO MODAL                                                    */}
      {/* ========================================================================= */}
      {demoOpen && (
        <div className="hr-modal-overlay" onClick={() => setDemoOpen(false)}>
          <div className="hr-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="hr-modal-close-btn"
              onClick={() => setDemoOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="hr-modal-head">
              <h3>Experience Sui Dhaga Platform</h3>
              <p>Discover how custom tailoring and AI design come together seamlessly.</p>
            </div>

            <div className="hr-modal-body">
              <div className="hr-modal-feature-box">
                <div className="hr-modal-icon-circle">
                  <Sparkles size={40} className="hr-icon-mint-fg" />
                </div>
                <h4>Interactive Design &amp; Order Workflow</h4>
                <p>
                  Start generating 3D outfit variations in seconds, share tech packs with tailors, and track
                  milestones in real time.
                </p>
                <div className="hr-modal-btn-row">
                  <Link
                    href="/design-studio"
                    className="hr-btn hr-btn-teal"
                    onClick={() => setDemoOpen(false)}
                  >
                    Try AI Studio
                  </Link>
                  <Link
                    href="/tailors"
                    className="hr-btn hr-btn-outline"
                    onClick={() => setDemoOpen(false)}
                  >
                    Explore Tailors
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
