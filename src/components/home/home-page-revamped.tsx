"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
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
  Store,
} from "lucide-react";

export function HomePageRevamped() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedGarment, setSelectedGarment] = useState<{
    id: string;
    title: string;
    tag: string;
    badgeType: string;
    price: string;
    rating: string;
    image: string;
    details: string;
    fabrics: string;
  } | null>(null);

  // Mouse coordinate state for magnetic hero tilt
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking for Needle & Thread
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Hero Parallax Transforms - Amplified for bold flashy motion
  const heroTextY = useTransform(scrollYProgress, [0, 0.18], [0, -50]);
  const heroArtY = useTransform(scrollYProgress, [0, 0.18], [0, 60]);
  const heroArtRotate = useTransform(scrollYProgress, [0, 0.18], [0, 3]);
  const heroArtScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.05]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 36, y: y * 36 });
  };

  const handleHeroMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Interactive Floating Garments Dataset tailored for women's bespoke fashion
  const floatingGarments = [
    {
      id: "coral-lehenga",
      title: "Bridal Zardozi Lehenga",
      tag: "✨ Hand-Embroidered",
      badgeType: "coral",
      price: "₹18,500",
      rating: "4.9 ★",
      image: "/images/home/hero-float-coral-lehenga.png",
      posClass: "hr-float-pos-top-left",
      details: "Pure raw silk with antique gold zardozi, hand-stitched pearls, and double dupatta.",
      fabrics: "Raw Silk, Organza, Velvet",
      driftX: -16,
      driftY: -18,
    },
    {
      id: "gold-saree",
      title: "Banarasi Katan Saree",
      tag: "🎨 AI Draped Preview",
      badgeType: "gold",
      price: "₹12,400",
      rating: "5.0 ★",
      image: "/images/home/hero-float-gold-saree.png",
      posClass: "hr-float-pos-bottom-right",
      details: "Pure zari weave with intricate Mughal motifs and customized designer blouse stitching.",
      fabrics: "Banarasi Silk, Brocade",
      driftX: 18,
      driftY: 16,
    },
    {
      id: "pastel-anarkali",
      title: "Pastel Chikankari Set",
      tag: "🌿 Bespoke 3-Day Fit",
      badgeType: "teal",
      price: "₹7,800",
      rating: "4.8 ★",
      image: "/images/home/hero-float-pastel-anarkali.png",
      posClass: "hr-float-pos-top-right",
      details: "Fine Lucknowi shadow chikankari with mukaish highlights on lightweight pure georgette.",
      fabrics: "Pure Georgette, Mulmul",
      driftX: 16,
      driftY: -14,
    },
    {
      id: "royal-blue-lehenga",
      title: "Royal Velvet Lehenga",
      tag: "💎 3D Virtual Try-On",
      badgeType: "coral",
      price: "₹21,000",
      rating: "4.9 ★",
      image: "/images/home/hero-float-royal-blue-lehenga.png",
      posClass: "hr-float-pos-bottom-left",
      details: "Deep royal blue micro velvet with silver dori work, sequins, and flared can-can skirt.",
      fabrics: "Micro Velvet, Soft Net",
      driftX: -18,
      driftY: 18,
    },
  ];

  const testimonials = [
    {
      name: "Neha Kapoor",
      role: "Designer, Mumbai",
      avatar: "/images/home/avatar-neha.jpg",
      quote:
        "The AI design studio is a game changer. It saves me hours every week creating sketches for my bridal clients!",
      rating: 5,
    },
    {
      name: "Imran Khan",
      role: "Master Tailor, Karachi",
      avatar: "/images/home/avatar-imran.jpg",
      quote:
        "Managing custom measurements and milestones has never been this easy. Sui Dhaga brought me 40+ new clients!",
      rating: 5,
    },
    {
      name: "Priya Mehta",
      role: "Brand Owner, Delhi",
      avatar: "/images/home/avatar-priya.jpg",
      quote:
        "I found verified master tailors for my boutique collection in days. The escrow payments give complete peace of mind!",
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

  // Staggered Motion Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 16,
      },
    },
  };

  return (
    <div className="home-revamp-root" suppressHydrationWarning>
      {/* ========================================================================= */}
      {/* TOP NEEDLE & GOLDEN THREAD SCROLL PROGRESS BAR                            */}
      {/* ========================================================================= */}
      <div className="hr-scroll-progress-track" aria-hidden="true">
        <motion.div className="hr-scroll-progress-bar" style={{ scaleX }}>
          <div className="hr-needle-indicator">
            <svg
              className="hr-needle-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M12 2l4 4M12 2L8 6" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH INTERACTIVE FLOATING GARMENTS & PARALLAX              */}
      {/* ========================================================================= */}
      <section className="hr-hero-section" ref={heroRef} onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
        <div className="hr-hero-bg-blobs" aria-hidden="true">
          <motion.div
            className="hr-blob-mint"
            animate={{
              scale: [1, 1.06, 1],
              rotate: [0, 4, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="hr-blob-coral-corner"
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, -6, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="hr-doodle-dashes"></div>
        </div>

        <div className="hr-container hr-hero-container">
          <motion.div className="hr-hero-left" style={{ y: heroTextY }}>
            <motion.span
              className="hr-eyebrow-text"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Creative Business Partner
            </motion.span>

            <motion.h1
              className="hr-hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your style. <br />
              <span className="hr-hero-coral-heading">Our craft.</span>
            </motion.h1>

            <motion.p
              className="hr-hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover, create, and grow your custom tailoring journey with Sui Dhaga — the all-in-one platform for
              bespoke designers, master tailors, and fashion enthusiasts.
            </motion.p>

            <motion.div
              className="hr-hero-btn-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
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
            </motion.div>

            {/* 3 Metrics Row */}
            <motion.div
              className="hr-hero-stats-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                className="hr-stat-box"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="hr-stat-icon-wrap hr-stat-teal">
                  <Users size={18} />
                </div>
                <div className="hr-stat-info">
                  <strong>50,000+</strong>
                  <span>Active Tailors</span>
                </div>
              </motion.div>

              <motion.div
                className="hr-stat-box"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="hr-stat-icon-wrap hr-stat-coral">
                  <Heart size={18} />
                </div>
                <div className="hr-stat-info">
                  <strong>120,000+</strong>
                  <span>Happy Customers</span>
                </div>
              </motion.div>

              <motion.div
                className="hr-stat-box"
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="hr-stat-icon-wrap hr-stat-yellow">
                  <Star size={18} fill="#F59E0B" color="#F59E0B" />
                </div>
                <div className="hr-stat-info">
                  <strong>4.8/5</strong>
                  <span>Customer Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="hr-hero-right">
            <motion.div
              className="hr-hero-art-wrapper hr-perspective-stage"
              style={{
                y: heroArtY,
                rotate: heroArtRotate,
                scale: heroArtScale,
              }}
            >
              <img
                src="/images/home/hero_illustration.png"
                alt="Sui Dhaga Tailor and Fashion Designer"
                className="hr-hero-illustration-img"
              />

              {/* ================================================================= */}
              {/* INTERACTIVE FLOATING GARMENT CARDS (PROMINENTLY OUTSIDE IMAGE)     */}
              {/* ================================================================= */}
              <div className="hr-floating-garments-stage">
                {floatingGarments.map((garment) => (
                  <motion.div
                    key={garment.id}
                    className={`hr-floating-garment-card ${garment.posClass}`}
                    onClick={() => setSelectedGarment(garment)}
                    animate={{
                      x: mouseOffset.x * (garment.driftX / 10),
                      y: mouseOffset.y * (garment.driftY / 10),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 140,
                      damping: 18,
                    }}
                    whileHover={{
                      scale: 1.12,
                      y: -12,
                      boxShadow: "0 30px 60px -12px rgba(0, 130, 138, 0.4), 0 0 30px rgba(255, 91, 82, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="hr-garment-thumb-wrap">
                      <img
                        src={garment.image}
                        alt={garment.title}
                        className="hr-garment-thumb-img"
                      />
                    </div>
                    <div className="hr-garment-info">
                      <span className="hr-garment-title">{garment.title}</span>
                      <div className="hr-garment-tag-row">
                        <span className={`hr-garment-badge ${garment.badgeType}`}>
                          {garment.tag}
                        </span>
                        <span className="hr-garment-meta">{garment.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EVERYTHING YOU NEED IN ONE PLACE (FLASHY 3D STAGGER)                   */}
      {/* ========================================================================= */}
      <section className="hr-section hr-features-section hr-perspective-stage">
        <div className="hr-container">
          <motion.div
            className="hr-heading-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hr-title-main">Everything you need in one place</h2>
            <p className="hr-subtitle-main">
              From bespoke AI design to doorstep delivery, Sui Dhaga helps you manage your entire custom fashion journey
              — effortlessly and beautifully.
            </p>
          </motion.div>

          <motion.div
            className="hr-features-grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div
              className="hr-card-feature"
              initial={{ opacity: 0, y: 40, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="hr-f-icon-circle hr-icon-mint-bg">
                <Palette size={24} className="hr-icon-mint-fg" />
              </div>
              <h3>Create Designs</h3>
              <p>Bring ideas to life with AI sketching &amp; 3D visualization.</p>
            </motion.div>

            <motion.div
              className="hr-card-feature"
              initial={{ opacity: 0, y: 40, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="hr-f-icon-circle hr-icon-coral-bg">
                <FileCheck size={24} className="hr-icon-coral-fg" />
              </div>
              <h3>Manage Orders</h3>
              <p>Track measurement approvals, fittings, and milestone schedules.</p>
            </motion.div>

            <motion.div
              className="hr-card-feature"
              initial={{ opacity: 0, y: 40, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="hr-f-icon-circle hr-icon-yellow-bg">
                <Store size={24} className="hr-icon-yellow-fg" />
              </div>
              <h3>Grow Your Business</h3>
              <p>Get discovered by thousands of customers seeking bespoke wear.</p>
            </motion.div>

            <motion.div
              className="hr-card-feature"
              initial={{ opacity: 0, y: 40, rotateX: 16 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <div className="hr-f-icon-circle hr-icon-blue-bg">
                <ShieldCheck size={24} className="hr-icon-blue-fg" />
              </div>
              <h3>Secure &amp; Protected</h3>
              <p>Milestone escrow payments and 100% fit satisfaction guarantee.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DESIGNED FOR EVERY STEP OF YOUR JOURNEY (PARALLAX + BADGES)            */}
      {/* ========================================================================= */}
      <section className="hr-section hr-journey-section">
        <div className="hr-container hr-journey-layout">
          <motion.div
            className="hr-journey-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hr-eyebrow-text">Precision &amp; Artistry</span>
            <h2 className="hr-title-main hr-text-left">Designed for every step of your journey</h2>
            <p className="hr-subtitle-main hr-text-left">
              Whether you are a customer ordering a dream bridal lehenga, a master artisan, or a rising fashion label,
              Sui Dhaga provides the precise digital tools to craft perfection.
            </p>
            <div className="hr-journey-cta-wrap">
              <Link href="/how-it-works" className="hr-btn hr-btn-teal">
                <span>Explore Features</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hr-journey-graphic hr-perspective-stage"
            initial={{ opacity: 0, x: 50, scale: 0.9, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="hr-journey-graphic-card"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ position: "relative" }}
            >
              <img
                src="/images/home/journey-mockup.jpg"
                alt="Designed for every step mockup"
                className="hr-journey-mockup-img"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS WITH PROGRESSIVE STITCHING TIMELINE                        */}
      {/* ========================================================================= */}
      <section className="hr-section hr-how-it-works-section">
        <div className="hr-container">
          <motion.div
            className="hr-heading-block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hr-title-main">How It Works</h2>
            <p className="hr-subtitle-main">Simple, transparent steps to your perfect bespoke fit.</p>
          </motion.div>

          <motion.div
            className="hr-steps-stepper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Step 1 */}
            <motion.div className="hr-step-box" variants={cardVariants} whileHover={{ scale: 1.05 }}>
              <div className="hr-step-round-icon hr-step-icon-teal">
                <Users size={24} />
              </div>
              <h4>1. Create Account</h4>
              <p>Sign up in seconds and save your standard body measurements.</p>
            </motion.div>

            <div className="hr-step-connector-arrow" aria-hidden="true">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path
                  d="M0 6H28M28 6L23 1M28 6L23 11"
                  stroke="#00828A"
                  strokeWidth="2.2"
                  className="hr-animated-thread-line"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <motion.div className="hr-step-box" variants={cardVariants} whileHover={{ scale: 1.05 }}>
              <div className="hr-step-round-icon hr-step-icon-coral">
                <Layers size={24} />
              </div>
              <h4>2. Add Your Work</h4>
              <p>Upload moodboards, custom sketches, or generate with AI.</p>
            </motion.div>

            <div className="hr-step-connector-arrow" aria-hidden="true">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path
                  d="M0 6H28M28 6L23 1M28 6L23 11"
                  stroke="#FF5B52"
                  strokeWidth="2.2"
                  className="hr-animated-thread-line"
                />
              </svg>
            </div>

            {/* Step 3 */}
            <motion.div className="hr-step-box" variants={cardVariants} whileHover={{ scale: 1.05 }}>
              <div className="hr-step-round-icon hr-step-icon-blue">
                <Sparkles size={24} />
              </div>
              <h4>3. Connect</h4>
              <p>Match with verified specialists and finalize stitches &amp; fabrics.</p>
            </motion.div>

            <div className="hr-step-connector-arrow" aria-hidden="true">
              <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                <path
                  d="M0 6H28M28 6L23 1M28 6L23 11"
                  stroke="#F59E0B"
                  strokeWidth="2.2"
                  className="hr-animated-thread-line"
                />
              </svg>
            </div>

            {/* Step 4 */}
            <motion.div className="hr-step-box" variants={cardVariants} whileHover={{ scale: 1.05 }}>
              <div className="hr-step-round-icon hr-step-icon-yellow">
                <Heart size={24} />
              </div>
              <h4>4. Receive</h4>
              <p>Doorstep delivery with guaranteed alteration and fit protection.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AI STUDIO WITH DRAMATIC 3D CINEMA UNFOLD                               */}
      {/* ========================================================================= */}
      <section className="hr-section hr-ai-studio-section hr-perspective-stage">
        <div className="hr-container">
          <motion.div
            className="hr-heading-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="hr-floating-prompt-chip"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles size={18} className="hr-sparkle-pulse" />
              <span>Prompt: Royal Emerald Velvet Bridal Lehenga with 3D Antique Zari Embroidery</span>
            </motion.div>
            <h2 className="hr-title-main">AI Fashion Design Studio</h2>
            <h3 className="hr-title-secondary">Generate stunning outfits and share tech packs with your tailors.</h3>
            <p className="hr-subtitle-main">
              Transform simple text ideas into realistic bespoke garments with intelligent fabric rendering, necklines,
              and embroidery variations.
            </p>
            <div className="hr-ai-cta-row">
              <Link href="/design-studio" className="hr-btn hr-btn-teal">
                <span>Explore AI Studio</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Center Laptop Showcase with Dramatic 3D Unfold */}
          <div className="hr-ai-laptop-stage">
            <motion.div
              className="hr-ai-laptop-card hr-3d-unfold-card"
              initial={{ opacity: 0, y: 70, rotateX: 26, scale: 0.86 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1.02 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <img
                src="/images/home/ai-studio-showcase.jpg"
                alt="AI Fashion Design Studio Showcase"
                className="hr-ai-laptop-img"
              />
            </motion.div>
          </div>

          {/* 4 Feature Pills Underneath */}
          <motion.div
            className="hr-ai-pills-row"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div className="hr-ai-feature-pill" variants={cardVariants}>
              <div className="hr-pill-icon hr-icon-mint-bg">
                <Sparkles size={20} className="hr-icon-mint-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Text to Design</strong>
                <p>Describe your vision, get realistic garment sketches.</p>
              </div>
            </motion.div>

            <motion.div className="hr-ai-feature-pill" variants={cardVariants}>
              <div className="hr-pill-icon hr-icon-coral-bg">
                <Palette size={20} className="hr-icon-coral-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Multiple Variations</strong>
                <p>Explore different silhouettes, sleeves, borders &amp; colors.</p>
              </div>
            </motion.div>

            <motion.div className="hr-ai-feature-pill" variants={cardVariants}>
              <div className="hr-pill-icon hr-icon-blue-bg">
                <Send size={20} className="hr-icon-blue-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Instant Tailor Share</strong>
                <p>Send tech specifications directly to your tailor with one click.</p>
              </div>
            </motion.div>

            <motion.div className="hr-ai-feature-pill" variants={cardVariants}>
              <div className="hr-pill-icon hr-icon-yellow-bg">
                <FolderHeart size={20} className="hr-icon-yellow-fg" />
              </div>
              <div className="hr-pill-body">
                <strong>Save &amp; Organize</strong>
                <p>Curate custom wardrobes and collection moodboards.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BUILT FOR TAILORS, DESIGNERS & BRANDS                                  */}
      {/* ========================================================================= */}
      <section className="hr-section hr-personas-section">
        <div className="hr-container">
          <motion.div
            className="hr-heading-block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hr-title-main">Built for Tailors, Designers &amp; Fashion Entrepreneurs</h2>
            <p className="hr-subtitle-main">
              From boutique ateliers to independent master tailors, Sui Dhaga supports your passion and expands your
              business horizons.
            </p>
          </motion.div>

          <motion.div
            className="hr-personas-grid-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Card 1: Tailors */}
            <motion.article
              className="hr-persona-item-card"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
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
            </motion.article>

            {/* Card 2: Designers */}
            <motion.article
              className="hr-persona-item-card"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
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
                    <span>Showcase your collections and get discovered by clients worldwide.</span>
                  </li>
                </ul>
              </div>
            </motion.article>

            {/* Card 3: Brands */}
            <motion.article
              className="hr-persona-item-card"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
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
                    <span>Scale custom sampling and production with vetted tailor clusters.</span>
                  </li>
                </ul>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY SUI DHAGA?                                                         */}
      {/* ========================================================================= */}
      <section className="hr-section hr-why-section">
        <div className="hr-container">
          <motion.div
            className="hr-heading-block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hr-title-main">Why Sui Dhaga?</h2>
          </motion.div>

          <motion.div
            className="hr-why-grid-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <motion.div
              className="hr-why-box-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="hr-why-icon-wrap hr-icon-mint-bg">
                <ShieldCheck size={28} className="hr-icon-mint-fg" />
              </div>
              <h4>Trusted Network</h4>
              <p>of vetted expert tailors</p>
            </motion.div>

            <motion.div
              className="hr-why-box-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="hr-why-icon-wrap hr-icon-coral-bg">
                <Cpu size={28} className="hr-icon-coral-fg" />
              </div>
              <h4>AI-Powered</h4>
              <p>Design &amp; Drape Studio</p>
            </motion.div>

            <motion.div
              className="hr-why-box-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="hr-why-icon-wrap hr-icon-blue-bg">
                <Lock size={28} className="hr-icon-blue-fg" />
              </div>
              <h4>Secure Escrow</h4>
              <p>Protection on all payments</p>
            </motion.div>

            <motion.div
              className="hr-why-box-card"
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="hr-why-icon-wrap hr-icon-yellow-bg">
                <Globe size={28} className="hr-icon-yellow-fg" />
              </div>
              <h4>Made for You</h4>
              <p>Loved globally</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FEATURED TESTIMONIAL BANNER                                            */}
      {/* ========================================================================= */}
      <section className="hr-section hr-featured-quote-section">
        <div className="hr-container">
          <motion.div
            className="hr-featured-quote-banner"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hr-quote-content-col">
              <div className="hr-quote-mark-icon">“</div>
              <blockquote className="hr-quote-text">
                &ldquo;Sui Dhaga makes my bespoke embroidery orders faster, clearer, and more professional. My clients
                love previewing their outfits before we stitch!&rdquo;
              </blockquote>
              <div className="hr-quote-signoff">
                <strong>Rohit Sharma</strong>
                <span>Master Craftsman, New Delhi</span>
              </div>
            </div>

            <div className="hr-quote-image-col">
              <div className="hr-quote-photo-holder">
                <img
                  src="/images/home/testimonial-rohit.jpg"
                  alt="Rohit Sharma Tailor"
                  className="hr-quote-photo-img"
                />
                <motion.div
                  className="hr-quote-floating-heart hr-heart-top-right"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart size={16} fill="#FF5B52" color="#FF5B52" />
                </motion.div>
                <motion.div
                  className="hr-quote-floating-heart hr-heart-bottom-left"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Heart size={14} fill="#00828A" color="#00828A" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. WHAT OUR COMMUNITY SAYS                                                */}
      {/* ========================================================================= */}
      <section className="hr-section hr-community-section">
        <div className="hr-container">
          <motion.div
            className="hr-heading-block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="hr-title-main">What Our Community Says</h2>
            <p className="hr-subtitle-main">Real stories from bespoke designers, tailors, and clients worldwide.</p>
          </motion.div>

          <div className="hr-carousel-wrapper">
            <button
              type="button"
              className="hr-carousel-nav-btn hr-btn-prev"
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                className="hr-testimonials-grid-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {testimonials.map((t, idx) => (
                  <motion.article
                    key={t.name}
                    className={`hr-community-review-card ${idx === testimonialIndex ? "hr-review-active" : ""}`}
                    whileHover={{ y: -4 }}
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
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

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
      {/* 10. FREQUENTLY ASKED QUESTIONS WITH SMOOTH SPRING EXPANSION               */}
      {/* ========================================================================= */}
      <section className="hr-section hr-faq-section">
        <div className="hr-container hr-faq-layout">
          <motion.div
            className="hr-faq-left-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
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
                      <motion.span
                        className="hr-faq-chevron-icon"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="hr-faq-answer-drawer"
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="hr-faq-right-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hr-faq-character-holder">
              <img
                src="/images/home/faq-illustration.jpg"
                alt="Frequently Asked Questions Assistance"
                className="hr-faq-illustration-img"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. READY TO GROW YOUR BUSINESS CTA BANNER                                */}
      {/* ========================================================================= */}
      <section className="hr-section hr-cta-strip-section">
        <div className="hr-container">
          <motion.div
            className="hr-bottom-cta-banner"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
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
              <h2 className="hr-bottom-cta-title">Ready to Craft Your Perfect Fit?</h2>
              <p className="hr-bottom-cta-subtitle">
                Join thousands of designers, master tailors, and clients creating the future of custom clothing.
              </p>
              <div className="hr-bottom-cta-btn-wrap">
                <Link href="/auth/register" className="hr-btn hr-btn-teal hr-btn-cta-large">
                  <span>Get Started Free</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GARMENT QUICK-PREVIEW MODAL                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedGarment && (
          <div className="hr-modal-overlay" onClick={() => setSelectedGarment(null)}>
            <motion.div
              className="hr-modal-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <button
                type="button"
                className="hr-modal-close-btn"
                onClick={() => setSelectedGarment(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="hr-modal-head">
                <div className="hr-garment-thumb-wrap" style={{ width: 68, height: 68, margin: "0 auto 12px auto" }}>
                  <img
                    src={selectedGarment.image}
                    alt={selectedGarment.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <h3>{selectedGarment.title}</h3>
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 6 }}>
                  <span className={`hr-garment-badge ${selectedGarment.badgeType}`}>
                    {selectedGarment.tag}
                  </span>
                  <span className="hr-garment-badge gold">{selectedGarment.rating}</span>
                </div>
              </div>

              <div className="hr-modal-body">
                <p style={{ textAlign: "center", color: "var(--hr-ink-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                  {selectedGarment.details}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "#F8FAFC",
                    borderRadius: "12px",
                    margin: "18px 0",
                    fontSize: "13.5px",
                  }}
                >
                  <span style={{ color: "var(--hr-muted)" }}>Recommended Fabrics:</span>
                  <strong style={{ color: "var(--hr-ink)" }}>{selectedGarment.fabrics}</strong>
                </div>

                <div className="hr-modal-btn-row">
                  <Link
                    href="/design-studio"
                    className="hr-btn hr-btn-teal"
                    onClick={() => setSelectedGarment(null)}
                  >
                    <Sparkles size={16} />
                    <span>Customize in AI Studio</span>
                  </Link>
                  <Link
                    href="/tailors"
                    className="hr-btn hr-btn-outline"
                    onClick={() => setSelectedGarment(null)}
                  >
                    <span>Find Tailor for This</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* INTERACTIVE DEMO MODAL                                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {demoOpen && (
          <div className="hr-modal-overlay" onClick={() => setDemoOpen(false)}>
            <motion.div
              className="hr-modal-container"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
