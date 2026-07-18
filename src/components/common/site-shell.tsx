"use client"

import Link from "next/link";
import { navItems } from "./data";
import { AnimeNavBar, AnimeMascot } from "@/components/ui/anime-navbar";
import { Scissors, Wand2, Users, HelpCircle, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const animeNavItems = [
  { name: "Find a Tailor", url: "/tailors", icon: Scissors },
  { name: "AI Design Studio", url: "/design-studio", icon: Wand2 },
  { name: "Community", url: "/community", icon: Users },
  { name: "How It Works", url: "/faqs", icon: HelpCircle },
  { name: "Pricing", url: "/checkout", icon: CreditCard },
];

export function PublicNav() {
  const pathname = usePathname();
  const [hoveredAuth, setHoveredAuth] = useState<string | null>(null);

  return (
    <header className="site-nav" style={{ position: 'relative', zIndex: 10000 }}>
      <Link href="/" className="brand">Sui Dhaga</Link>
      <AnimeNavBar items={animeNavItems} defaultActive="Find a Tailor" />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="nav-icons" aria-label="Quick actions">
          <span>Search</span>
          <span>Alerts</span>
        </div>
        <div className="nav-auth-buttons" style={{ display: 'flex', gap: '12px', marginLeft: '12px' }}>
          <Link 
            href="/auth/login" 
            className="btn secondary" 
            style={{ position: 'relative', height: '36px', padding: '0 16px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', borderRadius: '8px' }}
            onMouseEnter={() => setHoveredAuth('login')}
            onMouseLeave={() => setHoveredAuth(null)}
          >
            {pathname === '/auth/login' && <AnimeMascot hovered={hoveredAuth === 'login'} />}
            Login
          </Link>
          <Link 
            href="/auth/register" 
            className="btn primary" 
            style={{ position: 'relative', height: '36px', padding: '0 16px', display: 'inline-flex', alignItems: 'center', fontSize: '14px', borderRadius: '8px' }}
            onMouseEnter={() => setHoveredAuth('register')}
            onMouseLeave={() => setHoveredAuth(null)}
          >
            {pathname === '/auth/register' && <AnimeMascot hovered={hoveredAuth === 'register'} />}
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <Link href="/" className="footer-logo">Sui Dhaga</Link>
        <p>Tailored for you. Made by experts.</p>
        <div className="social-row">
          <span>f</span><span>in</span><span>p</span><span>yt</span>
        </div>
      </div>
      <div className="footer-links-grid">
        <FooterColumn title="Explore" links={["Find a Tailor", "AI Design Studio", "How It Works", "Pricing", "Blog"]} />
        <FooterColumn title="Company" links={["About Us", "Contact Us", "Careers"]} />
        <FooterColumn title="Support" links={["FAQs", "Privacy Policy", "Terms & Conditions", "Refund Policy"]} />
      </div>
      <div className="footer-app-block">
        <h4>Download App</h4>
        <div className="store-badge"><span>Get it on</span>Google Play</div>
        <div className="store-badge"><span>Download on the</span>App Store</div>
      </div>
      <div className="footer-bottom">
        <span>2026 Sui Dhaga. All rights reserved.</span>
        <span>Custom fashion, crafted beautifully.</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>
      {links.map((link) => (
        <Link key={link} href="#">{link}</Link>
      ))}
    </div>
  );
}

export function PublicShell({ children, footer = true }: { children: React.ReactNode; footer?: boolean }) {
  return (
    <div className="brand-page">
      <div className="ambient-layer" aria-hidden="true" />
      <PublicNav />
      <main>{children}</main>
      {footer ? <PublicFooter /> : null}
    </div>
  );
}

export function DashboardShell({
  children,
  active,
  role = "customer",
}: {
  children: React.ReactNode;
  active: string;
  role?: "customer" | "studio" | "tailor" | "admin";
}) {
  const isAdmin = role === "admin";
  const items = role === "admin"
    ? ["Dashboard", "Users", "Tailors", "Orders", "Payments", "Disputes", "Reviews", "Reports", "CMS", "Settings"]
    : role === "tailor"
      ? ["Dashboard", "Profile", "Services", "Orders", "Appointments", "Availability", "Messages", "Earnings", "Reviews", "Payouts", "Settings"]
      : role === "studio"
        ? ["Studio Home", "New Design", "My Designs", "Templates", "AI Assistant", "Inspiration", "Trash", "Help & Support", "Settings"]
        : ["Dashboard", "Appointments", "Orders", "Measurements", "Saved Designs", "Wishlist", "Community", "Messages", "Addresses", "Payment Methods", "Notifications", "Account Settings"];

  return (
    <div className={isAdmin ? "admin-page" : "app-page"}>
      <div className="ambient-layer" aria-hidden="true" />
      {isAdmin ? null : <PublicNav />}
      <div className="dashboard-grid">
        <aside className={isAdmin ? "admin-sidebar" : "side-nav"}>
          <Link href={isAdmin ? "/admin/dashboard" : "/"} className="side-brand">{isAdmin ? "Sui Dhaga Admin" : "Sui Dhaga"}</Link>
          {items.map((item) => (
            <Link key={item} className={item === active ? "active" : ""} href="#">
              <span className="mini-icon" />
              {item}
            </Link>
          ))}
          <Link href="/auth/login" className="logout">Logout</Link>
        </aside>
        <section className="dashboard-content">
          {isAdmin ? <AdminTopbar /> : null}
          {children}
        </section>
      </div>
    </div>
  );
}

function AdminTopbar() {
  return (
    <div className="admin-topbar">
      <label>
        <span className="sr-only">Search admin content</span>
        <input placeholder="Search anything..." />
      </label>
      <span>Alerts</span>
      <strong>Admin</strong>
    </div>
  );
}

export function DecorativeFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="decor-frame">
      <span className="motif motif-stitches" />
      <span className="motif motif-diamond" />
      <span className="motif motif-wave" />
      <span className="blob blob-yellow" />
      <span className="blob blob-teal" />
      <span className="blob blob-coral" />
      {children}
    </section>
  );
}

export function FigureCard({ label, tone = "teal" }: { label: string; tone?: "teal" | "coral" | "yellow" | "cream" }) {
  return (
    <div className={`figure-card ${tone}`}>
      <div className="figure-head" />
      <div className="figure-body" />
      <span>{label}</span>
    </div>
  );
}

export function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="status-pill">{children}</span>;
}

export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
  visual = "Tailoring",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  copy: string;
  visual?: string;
}) {
  return (
    <DecorativeFrame>
      <div className="hero-grid">
        <div className="hero-copy">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title} {accent ? <span>{accent}</span> : null}</h1>
          <p>{copy}</p>
          <div className="button-row">
            <Link className="btn primary" href="/tailors">Find a Tailor</Link>
            <Link className="btn secondary" href="/design-studio">Start AI Designing</Link>
          </div>
          <div className="hero-metrics" aria-label="Platform highlights">
            <strong>2K+ Tailors</strong>
            <strong>4.8 Avg Rating</strong>
            <strong>AI Designs</strong>
          </div>
        </div>
        <div className="hero-visual">
          <FigureCard label={visual} tone="yellow" />
          <div className="floating-note">Custom fit, crafted beautifully</div>
        </div>
      </div>
    </DecorativeFrame>
  );
}
