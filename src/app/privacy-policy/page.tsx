import Link from "next/link";
import {
  ClipboardList,
  Cpu,
  CreditCard,
  Database,
  Home,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";

const policyCards = [
  {
    title: "Data We Collect",
    copy:
      "We collect personal information you provide (such as name, email, phone), along with details related to your orders, preferences, and interactions with our platform.",
    icon: Database,
  },
  {
    title: "How We Use Data",
    copy:
      "We use your data to provide services, process orders, personalize your experience, improve our platform, communicate updates, and ensure customer support.",
    icon: ClipboardList,
  },
  {
    title: "Location Data Usage",
    copy:
      "With your permission, we use location data to help you find nearby tailors, show relevant services, and improve delivery and pickup experiences.",
    icon: MapPin,
  },
  {
    title: "AI Design Data",
    copy:
      "When using our AI Design Studio, designs and inputs you provide are used to generate personalized suggestions and are not shared publicly without your consent.",
    icon: Cpu,
  },
  {
    title: "Payment Data",
    copy:
      "Payment information is securely processed through trusted third-party gateways. We do not store your full card details on our servers.",
    icon: CreditCard,
  },
  {
    title: "Your Rights",
    copy:
      "You have the right to access, update, delete, or restrict your data. You can also withdraw consent or raise concerns by contacting us.",
    icon: UserRound,
  },
];

export default function Page() {
  return (
    <PublicShell>
      <div className="privacy-reference-page">
        <section className="privacy-hero" aria-labelledby="privacy-title">
          <div className="privacy-hero-copy">
            <p className="privacy-breadcrumb">
              <Link href="/">
                <Home size={13} aria-hidden="true" />
                Home
              </Link>
              <span aria-hidden="true">&gt;</span>
              <span>Privacy Policy</span>
            </p>
            <h1 id="privacy-title">Privacy Policy</h1>
            <p>
              We value your privacy and are committed to protecting your personal
              information. This policy explains how we collect, use, and safeguard
              your data.
            </p>
          </div>

          <div className="privacy-hero-art" aria-hidden="true">
            <span className="privacy-sun" />
            <span className="privacy-document">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="privacy-shield">
              <LockKeyhole size={44} strokeWidth={2.1} />
            </span>
          </div>
        </section>

        <section className="privacy-policy-grid" aria-label="Privacy policy details">
          {policyCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <article className="privacy-policy-card" key={card.title}>
                <div className="privacy-policy-icon">
                  <Icon size={32} strokeWidth={1.9} />
                </div>
                <div>
                  <h2>
                    {index + 1}. {card.title}
                  </h2>
                  <p>{card.copy}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="privacy-support-card" aria-label="Privacy support">
          <article>
            <div className="privacy-support-icon">
              <ShieldCheck size={34} strokeWidth={2} />
            </div>
            <div>
              <h2>Your privacy, our priority</h2>
              <p>
                We implement industry-standard security measures to keep your data
                safe and never share your information without your consent.
              </p>
            </div>
          </article>
          <article>
            <h2>Have Questions?</h2>
            <p>We&apos;re here to help you with any privacy-related concerns.</p>
            <Link href="/contact">Contact Support</Link>
          </article>
        </section>

        <img
          className="privacy-side-illustration privacy-side-illustration-left"
          src="/images/privacy/privacy-tailor-shield.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="privacy-side-illustration privacy-side-illustration-right"
          src="/images/privacy/privacy-designer-tablet.png"
          alt=""
          aria-hidden="true"
        />
        <span className="privacy-floating-diamond" aria-hidden="true" />
        <span className="privacy-floating-ring" aria-hidden="true" />
      </div>
    </PublicShell>
  );
}
