"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/common/site-shell";
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  ArrowRight,
  Scissors,
  Wand2,
  Ruler,
  Calendar,
  ShoppingBag,
  Bot,
  MessageSquare,
  Users,
  Bell,
  Sparkles,
  RefreshCw,
  Home,
  User,
  Star,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Lock,
  Camera,
} from "lucide-react";

// ==========================================
// CONFIGURATION: APK FILE LINK & METADATA
// ==========================================
export const APP_VERSION_API_URL = "https://sui-dhaga-backend.vercel.app/api/v1/app-version/latest?platform=android&clientVersion=1";
export const DEFAULT_APK_URL = "https://sui-dhaga-backend.vercel.app/api/v1/app-version/latest?platform=android&clientVersion=1";
export const APK_VERSION = "v1.0.0";
export const APK_FILE_SIZE = "28.6 MB";
export const APK_MIN_ANDROID = "Android 8.0+";

// 8 App Quick Actions
const QUICK_ACTIONS = [
  { id: "appts",     label: "Appointments",  icon: Calendar,      color: "text-amber-800",  bg: "bg-amber-50"  },
  { id: "tailors",   label: "Book Tailor",   icon: Scissors,      color: "text-purple-900", bg: "bg-purple-50" },
  { id: "studio",    label: "Design Studio", icon: Wand2,         color: "text-purple-800", bg: "bg-purple-50" },
  { id: "orders",    label: "My Orders",     icon: ShoppingBag,   color: "text-amber-900",  bg: "bg-amber-50"  },
  { id: "measure",   label: "Measurements",  icon: Ruler,         color: "text-amber-800",  bg: "bg-amber-50"  },
  { id: "aichat",    label: "AI Chat",       icon: Bot,           color: "text-purple-800", bg: "bg-purple-50" },
  { id: "messages",  label: "Messages",      icon: MessageSquare, color: "text-purple-900", bg: "bg-purple-50" },
  { id: "community", label: "Community",     icon: Users,         color: "text-amber-900",  bg: "bg-amber-50"  },
];

// Feature strip
const APP_FEATURES = [
  { icon: Wand2,    label: "AI Design Studio",  desc: "Text-to-design couture in seconds" },
  { icon: Camera,   label: "3D Measurement",    desc: "Camera-accurate body sizing"       },
  { icon: Scissors, label: "Master Tailors",    desc: "2,000+ verified tailor experts"    },
  { icon: Sparkles, label: "Sundrop Exclusives",desc: "Collab-only capsule collections"   },
];

// Installation steps
const INSTALL_STEPS = [
  {
    step: "01",
    title: "Download the APK",
    desc: "Tap 'Download APK' above. The file will save automatically to your Downloads folder.",
  },
  {
    step: "02",
    title: "Enable Unknown Sources",
    desc: "Go to Settings > Security > Install unknown apps, then allow your browser or Files app to install.",
  },
  {
    step: "03",
    title: "Install & Open",
    desc: "Open the APK from your Downloads folder, tap Install, then launch Sui Dhaga and sign in.",
  },
];

export function ApkDownloadPage({ apkDownloadUrl = DEFAULT_APK_URL }: { apkDownloadUrl?: string }) {
  const [copied,           setCopied]           = useState(false);
  const [downloading,      setDownloading]      = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadDone,     setDownloadDone]     = useState(false);
  const [pageUrl,          setPageUrl]          = useState("");
  const [stepsOpen,        setStepsOpen]        = useState(false);
  const [phoneScreen,      setPhoneScreen]      = useState<"dashboard" | "tailors">("dashboard");
  const [isPaused,         setIsPaused]         = useState(false);
  const [simulatedTap,     setSimulatedTap]     = useState(false);

  // Dynamic API state for latest app version
  const [latestVersion,    setLatestVersion]    = useState(APK_VERSION);
  const [activeDownloadUrl,setActiveDownloadUrl]= useState(apkDownloadUrl);
  const [releaseNotes,     setReleaseNotes]     = useState<string | null>(null);

  // Fetch latest version and download URL from backend API
  useEffect(() => {
    let isMounted = true;
    async function fetchAppVersion() {
      try {
        const res = await fetch(APP_VERSION_API_URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const json = await res.json();
        if (isMounted && json?.success && json?.data) {
          if (json.data.downloadUrl) {
            setActiveDownloadUrl(json.data.downloadUrl);
          }
          if (json.data.latestVersion) {
            setLatestVersion(`v${json.data.latestVersion}`);
          }
          if (json.data.releaseNotes) {
            setReleaseNotes(json.data.releaseNotes);
          }
        }
      } catch (err) {
        console.warn("Could not fetch app version, using defaults:", err);
      }
    }

    fetchAppVersion();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-playing interactive app preview loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setPhoneScreen((prev) => {
        if (prev === "dashboard") {
          setSimulatedTap(true);
          setTimeout(() => {
            setSimulatedTap(false);
            setPhoneScreen("tailors");
          }, 450);
          return "dashboard";
        } else {
          return "dashboard";
        }
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(pageUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Sui Dhaga Mobile App - Android APK",
          text: "Download the official Sui Dhaga Android App with exclusive Sundrop collaboration!",
          url: pageUrl || window.location.href,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const triggerDownload = (e?: React.MouseEvent) => {
    const targetUrl = activeDownloadUrl || apkDownloadUrl;
    if (e && (!targetUrl || targetUrl.startsWith("#"))) {
      e.preventDefault();
    }
    setDownloading(true);
    setDownloadProgress(0);
    setDownloadDone(false);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 25) + 20;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setDownloadProgress(100);
        setTimeout(() => {
          setDownloading(false);
          setDownloadDone(true);
          if (targetUrl && !targetUrl.startsWith("#") && typeof window !== "undefined") {
            window.open(targetUrl, "_blank", "noopener,noreferrer");
          }
        }, 400);
      } else {
        setDownloadProgress(current);
      }
    }, 120);
  };

  return (
    <PublicShell navTheme="velvet-gold">
      <div className="apk-page-velvet relative selection:bg-amber-400 selection:text-purple-950 pt-28 pb-16 md:pt-36 md:pb-20 min-h-[92vh] flex flex-col justify-between">
        <div className="velvet-glow-orb glow-orb-phone-aura" />
        <div className="velvet-glow-orb glow-orb-text-aura" />

        <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full my-auto">

          {/* Collab Brand Banner */}
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <div className="relative w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl shadow-purple-950/90 bg-[#0A0111]">
              <Image
                src="/images/collab/sundrop.png"
                alt="Sui Dhaga x Sundrop Collaboration"
                width={1600}
                height={600}
                priority
                unoptimized
                className="w-full h-auto block object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Phone Mockup */}
            <div
              className="lg:col-span-5 flex justify-center lg:justify-end order-2 lg:order-1"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="opal-phone-perspective-stage w-full max-w-[330px] sm:max-w-[355px] lg:max-w-[365px]">
                <div className="opal-phone-3d w-full">
                  <div className="phone-screen-velvet relative w-full bg-[#0D0216] overflow-hidden">

                    <div className="relative w-full h-[590px] sm:h-[620px] overflow-hidden rounded-[35px]">
                      {phoneScreen === "tailors" ? (
                        <div key="tailors-screen" className="phone-screen-anim relative w-full h-full bg-[#0A0111] overflow-hidden rounded-[35px] flex flex-col">
                          <Image
                            src="/images/collab/sundrop-tailors-screen.jpeg"
                            alt="Sundrop Tailor Directory Mobile App Screen"
                            fill
                            priority
                            unoptimized
                            className="object-cover object-top phone-screenshot-crisp rounded-[35px]"
                            sizes="(max-width: 640px) 100vw, 400px"
                          />
                        </div>
                      ) : (
                        <div key="dashboard-screen" className="phone-screen-anim w-full h-full bg-slate-50 text-stone-900 flex flex-col justify-between overflow-hidden rounded-[35px]">
                          <div>
                            <div className="pt-2 pb-1 bg-white">
                              <div className="phone-notch-pill-compact" />
                            </div>

                            <div className="px-4 pt-2.5 pb-2.5 bg-white border-b border-stone-100 flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-black text-stone-900 flex items-center gap-1">
                                  Hello, there <span className="text-base">&#128075;</span>
                                </h3>
                                <p className="text-[10px] text-stone-500 font-medium">Ready to look your best today?</p>
                              </div>
                              <div className="w-8 h-8 rounded-xl border border-stone-200 flex items-center justify-center text-amber-800 relative bg-amber-50/50">
                                <Bell className="w-3.5 h-3.5" />
                                <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 ring-2 ring-white" />
                              </div>
                            </div>

                            <div className="p-3.5 space-y-3">
                              {/* Clickable Sundrop Capsule Banner with simulated auto-tap */}
                              <div
                                onClick={() => {
                                  setPhoneScreen("tailors");
                                  setIsPaused(true);
                                }}
                                className={`royal-collab-banner rounded-2xl p-3.5 text-white relative cursor-pointer group transition-all duration-300 ${
                                  simulatedTap
                                    ? "scale-[0.98] ring-2 ring-amber-400 shadow-xl shadow-amber-500/40 brightness-110"
                                    : "hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                                }`}
                              >
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay rounded-2xl overflow-hidden">
                                  <Image src="/images/collab/sundrop-purple-banner.jpg" alt="Royal Velvet Banner" fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover" />
                                </div>

                                {simulatedTap && (
                                  <div className="simulated-tap-ripple top-1/2 right-12 -translate-y-1/2 z-20" />
                                )}

                                <div className="relative z-10 flex items-center justify-between">
                                  <div className="max-w-[170px]">
                                    <div className="flex items-center gap-1 mb-1">
                                      <span className="w-3 h-[1px] bg-amber-400/80" />
                                      <span className="text-[8px] font-bold uppercase tracking-wider text-amber-300">Exclusive Collaboration</span>
                                      <span className="w-3 h-[1px] bg-amber-400/80" />
                                    </div>
                                    <h4 className="text-sm font-bold text-amber-100 font-serif leading-tight">
                                      Sundrop <span className="text-amber-400 font-sans font-normal">x</span> Sui Dhaga
                                    </h4>
                                    <p className="text-[9.5px] text-purple-200 mt-0.5">Traditional Craft. Modern You.</p>
                                    <div className="mt-2">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold border border-amber-400/80 transition-all ${
                                        simulatedTap
                                          ? "bg-amber-400 text-purple-950 scale-105 shadow-md shadow-amber-400/50"
                                          : "text-amber-200 bg-black/40 group-hover:bg-amber-400 group-hover:text-purple-950"
                                      }`}>
                                        See Our Tailors <ArrowRight className="w-2.5 h-2.5" />
                                      </span>
                                    </div>
                                  </div>
                                  <div className={`shrink-0 w-12 h-12 rounded-full border border-amber-400 flex flex-col items-center justify-center text-center shadow-md bg-gradient-to-tr from-amber-700 via-amber-500 to-amber-300 transition-transform ${
                                    simulatedTap ? "scale-110 rotate-6" : "group-hover:scale-105"
                                  }`}>
                                    <span className="text-[7px] font-black tracking-wider text-[#2A0845]">SUNDROP</span>
                                    <span className="text-xs text-[#2A0845] leading-none">&#9728;</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-1.5 mt-2.5 pt-1.5 border-t border-purple-400/20">
                                  <span className="text-[8px] text-amber-300 font-medium">✨ Auto-previewing Sundrop capsule (click to explore)</span>
                                </div>
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-1.5 px-0.5">
                                  <h4 className="text-[11px] font-extrabold text-stone-900">Quick Actions</h4>
                                  <span className="text-[10px] font-bold text-amber-700">View All</span>
                                </div>
                                <div className="grid grid-cols-4 gap-1.5">
                                  {QUICK_ACTIONS.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                      <div key={action.id} className="app-quick-action-tile p-1.5 flex flex-col items-center justify-center text-center">
                                        <div className={`w-7 h-7 rounded-lg ${action.bg} flex items-center justify-center ${action.color} mb-1`}>
                                          <Icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[8.5px] font-bold text-stone-800 leading-tight">{action.label}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Sundrop Spotlight Card */}
                              <div className="spotlight-design-card p-3 relative overflow-hidden">
                                <div className="spotlight-card-glow" />
                                <div className="flex items-center gap-2 mb-2 relative z-10">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#2A0845] to-[#B45309] flex items-center justify-center shrink-0">
                                    <Sparkles className="w-3 h-3 text-amber-200" />
                                  </div>
                                  <span className="text-[9px] font-extrabold text-stone-800 uppercase tracking-wider">Sundrop Spotlight</span>
                                </div>
                                <div className="flex gap-2.5 items-center relative z-10">
                                  <div className="w-10 h-12 rounded-lg bg-gradient-to-b from-purple-100 to-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-amber-600" />
                                  </div>
                                  <div>
                                    <p className="text-[9px] font-bold text-stone-900 leading-tight">Royal Velvet Sherwani</p>
                                    <p className="text-[8px] text-stone-500 leading-tight">Sundrop x Sui Dhaga</p>
                                    <div className="flex items-center gap-1 mt-1">
                                      <span className="text-[8px] text-amber-700 font-bold">&#9733; 4.9</span>
                                      <span className="text-[7px] text-stone-400">(124 orders)</span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPhoneScreen("tailors");
                                    setIsPaused(true);
                                  }}
                                  className="w-full mt-2 py-1.5 px-2 rounded-lg bg-gradient-to-r from-[#2A0845] to-[#B45309] text-white text-[9px] font-bold text-center relative z-10 cursor-pointer hover:opacity-90 transition-opacity"
                                >
                                  View Collection &amp; Tailors
                                </button>
                              </div>

                            </div>
                          </div>

                          {/* Bottom Navigation */}
                          <div className="px-4 py-2.5 bg-white border-t border-stone-200 flex items-center justify-between text-[9px] text-stone-500 font-medium shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setPhoneScreen("dashboard");
                                setIsPaused(true);
                              }}
                              className="flex flex-col items-center text-[#B45309] font-bold cursor-pointer"
                            >
                              <Home className="w-4 h-4" /><span>Home</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPhoneScreen("tailors");
                                setIsPaused(true);
                              }}
                              className="flex flex-col items-center hover:text-amber-800 cursor-pointer"
                            >
                              <Scissors className="w-4 h-4" /><span>Tailors</span>
                            </button>
                            <div className="flex flex-col items-center">
                              <Wand2 className="w-4 h-4" /><span>AI Studio</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <ShoppingBag className="w-4 h-4" /><span>Orders</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <User className="w-4 h-4" /><span>Profile</span>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">

              <div className="inline-flex items-center gap-3 mb-6 bg-purple-950/50 border border-amber-400/25 px-3.5 py-1.5 rounded-full text-xs">
                <div className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                  <div className="flex text-amber-400 text-[10px] ml-0.5">&#9733;&#9733;&#9733;&#9733;</div>
                </div>
                <span className="w-1 h-1 rounded-full bg-amber-400/50" />
                <span className="text-amber-200/90 font-medium text-[11px]">15,000+ Tailored Fits &bull; Sundrop Collab</span>
              </div>

              <h1
                style={{ color: "#FFFFFF" }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6"
              >
                <span style={{ color: "#FFFFFF", display: "inline-block" }}>Bespoke fit.</span>{" "}<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #FFFDF0 0%, #FEF08A 25%, #FCD34D 55%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  Right in your pocket.
                </span>
              </h1>

              <p
                style={{ color: "#F1E8FD" }}
                className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9 font-normal"
              >
                Handcrafted bespoke couture meets instant 3D AI camera measurement.
                Download the official Android APK to design and stitch custom outfits with master tailors.
              </p>

              {downloading && (
                <div className="apk-feedback-card mb-6 max-w-lg">
                  <div className="flex items-center justify-between text-xs mb-2 text-amber-200 font-bold">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                      Downloading SuiDhaga_{latestVersion}.apk ({APK_FILE_SIZE})...
                    </span>
                    <span className="font-mono text-amber-400">{downloadProgress}%</span>
                  </div>
                  <div className="w-full bg-purple-900/80 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-150"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {downloadDone && (
                <div className="apk-feedback-card mb-6 flex items-center gap-3 max-w-lg">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                  <div>
                    <strong className="block text-xs font-bold text-amber-200">Download Complete!</strong>
                    <span className="text-[11px] text-purple-200">
                      Tap the APK in your notifications or Downloads folder to install.
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-6">
                <a
                  href={activeDownloadUrl || apkDownloadUrl}
                  onClick={triggerDownload}
                  id="apk-primary-download-btn"
                  aria-label={`Download Sui Dhaga APK ${latestVersion} - ${APK_FILE_SIZE}, ${APK_MIN_ANDROID}`}
                  className="sundrop-btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold tracking-wide cursor-pointer text-center"
                >
                  <Download className="w-5 h-5 text-amber-200" />
                  <span>Download APK</span>
                  <span className="text-xs bg-amber-950/50 px-2.5 py-0.5 rounded-full text-amber-200 font-mono font-normal">
                    {APK_FILE_SIZE}
                  </span>
                </a>
                <Link
                  href="/tailors"
                  className="velvet-btn-outline inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-center"
                >
                  <span>See Our Tailors</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </Link>
              </div>

              {/* Specs + Share - split into two rows for mobile */}
              <div className="space-y-2.5 pt-2">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-amber-200/80">
                  <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Play Protect Verified
                  </span>
                  <span className="text-amber-400/40">&bull;</span>
                  <span>{APK_MIN_ANDROID}</span>
                  <span className="text-amber-400/40">&bull;</span>
                  <span>{latestVersion} (Build 2026.4)</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-5 text-xs">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="hover:text-white text-amber-200/90 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="hover:text-white text-amber-200/90 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Share Page</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Feature Strip */}
          <div className="mt-20 md:mt-24">
            <p className="text-center text-amber-400/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Everything in the app
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {APP_FEATURES.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.label} className="apk-feature-tile">
                    <div className="apk-feature-icon-wrap">
                      <Icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <h4 className="text-sm font-bold text-white mt-3 mb-1">{feat.label}</h4>
                    <p className="text-xs text-purple-300/70 leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Install Steps Accordion */}
          <div className="mt-14 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => setStepsOpen((v) => !v)}
              className="install-accordion-trigger w-full flex items-center justify-between text-left"
              aria-expanded={stepsOpen}
              aria-controls="install-steps-panel"
            >
              <span className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <span className="text-base font-bold text-amber-100">How to install the APK?</span>
              </span>
              {stepsOpen
                ? <ChevronUp className="w-5 h-5 text-amber-400/70 shrink-0" />
                : <ChevronDown className="w-5 h-5 text-amber-400/70 shrink-0" />
              }
            </button>

            {stepsOpen && (
              <div id="install-steps-panel" className="install-steps-body">
                {INSTALL_STEPS.map((s) => (
                  <div key={s.step} className="install-step-item">
                    <div className="install-step-number">{s.step}</div>
                    <div>
                      <h5 className="text-sm font-bold text-amber-100 mb-0.5">{s.title}</h5>
                      <p className="text-xs text-purple-200/80 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="install-security-note">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-200/80 leading-relaxed">
                    This APK is Play Protect verified and cryptographically signed. Safe to install on Android 8.0+.
                  </p>
                </div>
              </div>
            )}
          </div>

        </section>

        {/* Floating Bottom Pill */}
        <div className="relative z-10 mx-auto px-4 mt-10 md:mt-14 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 opal-bottom-pill text-xs font-medium text-amber-200/90">
            <span className="font-black text-amber-300 font-mono tracking-tight text-sm">50,000+</span>
            <span className="text-purple-200/80">custom garments stitched with Sui Dhaga &amp; Sundrop</span>
          </div>
        </div>

      </div>
    </PublicShell>
  );
}
