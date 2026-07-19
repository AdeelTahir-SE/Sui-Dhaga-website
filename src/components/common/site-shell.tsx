"use client"

import Link from "next/link";
import { navItems } from "./data";
import { AnimeNavBar, AnimeMascot } from "@/components/ui/anime-navbar";
import { Scissors, Wand2, Users, HelpCircle, CreditCard, Search, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";

const animeNavItems = [
  { name: "Find a Tailor", url: "/tailors", icon: Scissors },
  { name: "AI Design Studio", url: "/design-studio", icon: Wand2 },
  { name: "Community", url: "/community", icon: Users },
  { name: "How It Works", url: "/faqs", icon: HelpCircle },
  { name: "Pricing", url: "/checkout", icon: CreditCard },
];

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="site-nav" style={{ 
      position: 'fixed', 
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '16px 48px',
      backgroundColor: '#FAF8F5',
      boxSizing: 'border-box'
    }}>
      <Link href="/" style={{ 
        fontSize: '26px', 
        fontWeight: 900, 
        color: '#000', 
        textDecoration: 'none', 
        letterSpacing: '-0.5px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Sui Dhága
      </Link>
      
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {animeNavItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.url} 
            style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: '#111',
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button aria-label="Search" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111', padding: 0, display: 'flex' }}>
          <Search size={22} strokeWidth={2} />
        </button>
        <button aria-label="Alerts" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111', padding: 0, display: 'flex' }}>
          <Bell size={22} strokeWidth={2} />
        </button>
        <Link href="/auth/login" aria-label="Profile" style={{ 
          background: '#14919b', 
          border: 'none', 
          cursor: 'pointer', 
          color: '#fff', 
          width: '38px', 
          height: '38px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textDecoration: 'none'
        }}>
          <User size={20} strokeWidth={2} />
        </Link>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer style={{ backgroundColor: '#0F172A', color: '#fff', padding: '60px 48px 24px', position: 'relative', overflow: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Decorative Wavy Corner SVG */}
      <svg 
        viewBox="0 0 300 300" 
        style={{ position: 'absolute', bottom: 0, right: 0, width: '300px', height: '300px', zIndex: 0, pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill="#14919b" 
          d="M300,0 C270,30 250,50 260,90 C270,130 230,160 220,190 C210,220 230,250 180,270 C130,290 80,280 40,300 L300,300 Z" 
        />
        {/* Constellation of dots */}
        <g fill="#fff" opacity="0.6">
          <circle cx="80" cy="220" r="1.5" />
          <circle cx="110" cy="190" r="2" />
          <circle cx="140" cy="210" r="1" />
          <circle cx="100" cy="250" r="1.5" />
          <circle cx="130" cy="260" r="2" />
          <circle cx="160" cy="240" r="1.5" />
          <circle cx="180" cy="210" r="1" />
          <circle cx="70" cy="260" r="1" />
          <circle cx="170" cy="180" r="1.5" />
          <circle cx="150" cy="160" r="1" />
          <circle cx="200" cy="190" r="1.5" />
        </g>
      </svg>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', position: 'relative', zIndex: 1, marginBottom: '60px' }}>
        
        {/* Brand Block */}
        <div style={{ flex: '1 1 240px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: 800, color: '#fff', textDecoration: 'none', display: 'block', marginBottom: '16px' }}>Sui Dhaga</Link>
          <p style={{ fontSize: '16px', color: '#94A3B8', marginBottom: '32px' }}>Tailored for you. Made by experts.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#fff' }}>
              <img src="/icons/footer/facebook.png" alt="Facebook" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#" style={{ color: '#fff' }}>
              <img src="/icons/footer/instagram.png" alt="Instagram" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#" style={{ color: '#fff' }}>
              <img src="/icons/footer/pinterest.png" alt="Pinterest" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#" style={{ color: '#fff' }}>
              <img src="/icons/footer/youtube.png" alt="YouTube" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <FooterColumn title="Explore" links={["Find a Tailor", "AI Design Studio", "How It Works", "Pricing"]} />
        
        {/* Company Links */}
        <FooterColumn title="Company" links={["About Us", "Contact Us", "Blog", "Careers"]} />
        
        {/* Support Links */}
        <FooterColumn title="Support" links={["FAQs", "Privacy Policy", "Terms & Conditions", "Refund Policy"]} />

        {/* App Download */}
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#F8FAFC' }}>Download App</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{ backgroundColor: '#000', color: '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
              <img src="/icons/footer/google-play.png" alt="Google Play" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1 }}>GET IT ON</div>
                <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1, marginTop: '4px' }}>Google Play</div>
              </div>
            </button>
            <button style={{ backgroundColor: '#000', color: '#fff', border: '1px solid #334155', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.69C20.06,16.76 19.6,18.23 18.71,19.5M12,6.11C13.11,6.11 14.39,5.2 15.11,4.07C15.75,3.15 16.25,1.84 16.14,0.5C14.93,0.55 13.56,1.31 12.8,2.23C12.16,3 11.59,4.32 11.73,5.64C13.06,5.75 14.41,4.96 15.17,4C14.5,4.96 13.25,5.75 12,5.64V6.11Z" /></svg>
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1, marginTop: '4px' }}>App Store</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid #1E293B', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '16px' }}>
        <span>© 2024 Sui Dhaga. All rights reserved.</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ flex: '1 1 140px' }}>
      <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: '#F8FAFC' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map((link) => (
          <Link key={link} href="#" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '16px' }}>{link}</Link>
        ))}
      </div>
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
