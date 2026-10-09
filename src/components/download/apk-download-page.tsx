"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PublicShell } from "@/components/common/site-shell";
import {
  Download,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Scissors,
  Wand2,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Camera,
} from "lucide-react";

// ==========================================
// CONFIGURATION: APK FILE LINK & METADATA
// ==========================================
export const APP_VERSION_API_URL = "https://sui-dhaga-backend.vercel.app/api/v1/app-version/latest?platform=android&clientVersion=1";
export const DEFAULT_APK_URL = "https://github.com/AdeelTahir-SE/Sui-Dhaga-mobile/releases/download/v1.0.2/sui-dhaga-v1.0.2-android.apk";
export const APK_VERSION = "v1.0.2";

// Feature strip
const APP_FEATURES = [
  { icon: Wand2,    label: "AI Design Studio",  desc: "Text-to-design couture in seconds" },
  { icon: Camera,   label: "3D Measurement",    desc: "Camera-accurate body sizing"       },
  { icon: Scissors, label: "Master Tailors",    desc: "Verified artisan tailor experts"   },
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
    if (e) {
      e.preventDefault();
    }
    const targetUrl = activeDownloadUrl || apkDownloadUrl || DEFAULT_APK_URL;

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
          if (targetUrl && typeof window !== "undefined") {
            const link = document.createElement("a");
            link.href = targetUrl;
            link.setAttribute("download", `SuiDhaga_${latestVersion}.apk`);
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
                        <div
                          key="dashboard-screen"
                          onClick={() => {
                            setPhoneScreen("tailors");
                            setIsPaused(true);
                          }}
                          className="phone-screen-anim relative w-full h-full bg-white overflow-hidden rounded-[35px] flex flex-col cursor-pointer"
                        >
                          <Image
                            src="/images/collab/sundrop-home-screen.png"
                            alt="Sui Dhaga Mobile App Home Dashboard Screen"
                            fill
                            priority
                            unoptimized
                            className="object-cover object-top phone-screenshot-crisp rounded-[35px]"
                            sizes="(max-width: 640px) 100vw, 400px"
                          />
                          {simulatedTap && (
                            <div className="simulated-tap-ripple top-[125px] left-[70px] z-20" />
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy & CTAs */}
            <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2">

              <div className="inline-flex items-center gap-2 mb-6 bg-purple-950/50 border border-amber-400/25 px-3.5 py-1.5 rounded-full text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-200/90 font-medium text-[11px]">Official Android Release &bull; Sundrop Exclusive</span>
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
                      Downloading SuiDhaga_{latestVersion}.apk...
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
                  href={activeDownloadUrl || DEFAULT_APK_URL}
                  onClick={triggerDownload}
                  id="apk-primary-download-btn"
                  aria-label={`Download Sui Dhaga APK ${latestVersion}`}
                  className="sundrop-btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold tracking-wide cursor-pointer text-center"
                >
                  <Download className="w-5 h-5 text-amber-200" />
                  <span>Download APK</span>
                </a>
              </div>

              {/* Share & Copy Link */}
              <div className="pt-2">
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
              </div>
            )}
          </div>

        </section>

        {/* Floating Bottom Pill */}
        <div className="relative z-10 mx-auto px-4 mt-10 md:mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 opal-bottom-pill text-xs font-medium text-amber-200/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-purple-200/80">Bespoke custom tailoring with Sui Dhaga &amp; Sundrop</span>
          </div>
        </div>

      </div>
    </PublicShell>
  );
}
