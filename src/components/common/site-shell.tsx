"use client"

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { navItems } from "./data";
import { AnimeNavBar, AnimeMascot } from "@/components/ui/anime-navbar";
import {
  Scissors,
  Wand2,
  Users,
  HelpCircle,
  CreditCard,
  Search,
  Bell,
  User,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Star,
  ChevronRight,
  MapPin
} from "lucide-react";
import { initialTailors } from "@/lib/tailors-data";

const animeNavItems = [
  { name: "Find a Tailor", url: "/tailors", icon: Scissors },
  { name: "AI Design Studio", url: "/design-studio", icon: Wand2 },
  { name: "Community", url: "/community", icon: Users },
  { name: "How It Works", url: "/how-it-works", icon: HelpCircle },
  { name: "Pricing", url: "/pricing", icon: CreditCard },
];

export function PublicNav({ navTheme }: { navTheme?: "default" | "velvet-gold" } = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileUrl, setProfileUrl] = useState("/auth/login");
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = useRef<HTMLDivElement>(null);
  const isVelvetGold = navTheme === "velvet-gold" || pathname === "/download" || pathname === "/download-app" || pathname === "/sun-drop";

  // Close search dropdown when navigating
  useEffect(() => {
    setIsSearchOpen(false);
  }, [pathname]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = searchContainerRef.current?.contains(target);
      const insideMobile = mobileSearchContainerRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Global Ctrl+K / Cmd+K and Esc keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Focus search input whenever dropdown opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Filter matching tailors for instant search dropdown
  const matchingTailors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return initialTailors.filter((t) => {
      const matchName = t.name.toLowerCase().includes(q);
      const matchCity = t.city.toLowerCase().includes(q) || t.locality.toLowerCase().includes(q);
      const matchSpecialty = t.specialties.some((s) => s.toLowerCase().includes(q));
      const matchServices = t.services.some((s) => s.toLowerCase().includes(q));
      return matchName || matchCity || matchSpecialty || matchServices;
    });
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim();
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/tailors?q=${encodeURIComponent(q)}`);
  };

  const handleSelectChip = (chip: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/tailors?q=${encodeURIComponent(chip)}`);
  };

  const handleSelectTailor = (tailorId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/tailors/${tailorId}`);
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("sui_dhaga_auth_token");
      const rawUser = localStorage.getItem("sui_dhaga_user");
      if (token && rawUser) {
        const u = JSON.parse(rawUser);
        const role = u.role || "customer";
        if (role === "admin") setProfileUrl("/admin/dashboard");
        else if (role === "tailor") setProfileUrl("/tailor/dashboard");
        else setProfileUrl("/customer/dashboard");

        const name = u.name || u.full_name || u.email || "";
        if (name) {
          const parts = name.trim().split(" ");
          const initials =
            parts.length > 1
              ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
              : name.slice(0, 2).toUpperCase();
          setUserInitials(initials);
        }
      } else {
        setProfileUrl("/auth/login");
        setUserInitials(null);
      }
    } catch {}
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 24) {
        setHidden(false);
        setScrolled(false);
      } else if (currentScrollY > lastScrollY + 8) {
        setHidden(true);
        setScrolled(true);
      } else if (currentScrollY < lastScrollY - 8) {
        setHidden(false);
        setScrolled(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`} style={{ 
      position: 'fixed', 
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 10000, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '16px 48px',
      backgroundColor: isVelvetGold 
        ? (scrolled ? 'rgba(18, 4, 30, 0.92)' : 'rgba(14, 2, 24, 0.95)')
        : (scrolled ? 'rgba(250, 248, 245, 0.62)' : '#FAF8F5'),
      boxSizing: 'border-box',
      border: 'none',
      borderBottom: isVelvetGold ? '1px solid rgba(251, 191, 36, 0.25)' : 'none',
      borderRadius: 0,
      backdropFilter: isVelvetGold 
        ? 'blur(20px) saturate(1.4)' 
        : (scrolled ? 'blur(18px) saturate(1.2)' : 'none'),
      transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
      transition: 'transform 280ms ease, background-color 240ms ease, color 240ms ease',
      boxShadow: 'none'
    }}>
      <Link href="/" style={{ 
        fontSize: '26px', 
        fontWeight: 900, 
        color: isVelvetGold ? '#FCD34D' : (scrolled ? '#078b87' : '#000'), 
        textDecoration: 'none', 
        letterSpacing: '-0.5px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Sui Dhága
      </Link>
      
      <nav className="hidden md:flex" style={{ gap: '32px', alignItems: 'center' }}>
        {animeNavItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.url} 
            style={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              color: isVelvetGold ? '#FDE68A' : (scrolled ? '#078b87' : '#111'),
              textDecoration: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex" style={{ alignItems: 'center', gap: '24px' }}>
        {/* Search Popover Container: Anchored under the Search Icon */}
        <div ref={searchContainerRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Search tailors and designs"
            title="Search tailors and designs (Ctrl+K)"
            style={{
              background: isSearchOpen ? 'rgba(7, 139, 135, 0.12)' : 'none',
              border: 'none',
              cursor: 'pointer',
              color: isSearchOpen ? '#078b87' : (isVelvetGold ? '#FDE68A' : (scrolled ? '#078b87' : '#111')),
              padding: '6px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <Search size={22} strokeWidth={2} />
          </button>

          {/* Search Dropdown directly under the search icon */}
          {isSearchOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 14px)',
                right: 0,
                width: '380px',
                maxWidth: 'calc(100vw - 32px)',
                background: '#ffffff',
                borderRadius: '18px',
                boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                zIndex: 10005,
                color: '#1e293b'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Form */}
              <form
                onSubmit={handleSearchSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderBottom: '1px solid #f1f5f9',
                  background: '#f8fafc'
                }}
              >
                <Search size={18} color="#078b87" style={{ flexShrink: 0 }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tailors, styles, cities..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: '#1e293b',
                    fontWeight: 500
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: '#e2e8f0',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#64748b'
                    }}
                    title="Clear"
                  >
                    <X size={12} />
                  </button>
                )}
                <button
                  type="submit"
                  style={{
                    background: '#078b87',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Go</span>
                  <ArrowRight size={12} />
                </button>
              </form>

              {/* Suggestions / Results List */}
              <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '14px 16px' }}>
                {matchingTailors.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Matching Tailors ({matchingTailors.length})
                      </span>
                    </div>
                    {matchingTailors.slice(0, 4).map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelectTailor(t.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          background: '#ffffff',
                          border: '1px solid #f1f5f9',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                      >
                        <img
                          src={t.image || '/images/home/tailor-rekha.png'}
                          alt={t.name}
                          style={{ width: '36px', height: '36px', borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#1e293b' }}>{t.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: '#d97706' }}>
                              <Star size={11} fill="#d97706" color="#d97706" />
                              <span>{t.rating}</span>
                            </div>
                          </div>
                          <p style={{ fontSize: '11.5px', color: '#64748b', margin: '1px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {t.locality}, {t.city} · {t.specialties.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      style={{
                        background: '#f0fdfa',
                        border: '1px solid #ccfbf1',
                        borderRadius: '10px',
                        color: '#0f766e',
                        padding: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        marginTop: '4px'
                      }}
                    >
                      View all results in Marketplace &rarr;
                    </button>
                  </div>
                ) : searchQuery.trim().length > 0 ? (
                  <div style={{ textAlign: 'center', padding: '18px 8px' }}>
                    <p style={{ fontSize: '13.5px', fontWeight: 650, color: '#1e293b', margin: '0 0 4px' }}>
                      No exact match for &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px' }}>
                      Search across all tailor listings and specialties.
                    </p>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      style={{
                        background: '#078b87',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 650,
                        cursor: 'pointer'
                      }}
                    >
                      Search Marketplace
                    </button>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                      Popular Searches
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                      {['Bridal Lehenga', 'Anarkali', 'Rekha Tailors', 'Kurtis', 'Faisalabad'].map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleSelectChip(chip)}
                          style={{
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            borderRadius: '16px',
                            padding: '4px 10px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: '#334155',
                            cursor: 'pointer'
                          }}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>

                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                      Quick Links
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <Link
                        href="/tailors"
                        onClick={() => setIsSearchOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 10px', borderRadius: '8px', background: '#f8fafc', color: '#1e293b', fontSize: '12px', fontWeight: 650, textDecoration: 'none' }}
                      >
                        <Scissors size={14} color="#078b87" />
                        <span>Find Tailors</span>
                      </Link>
                      <Link
                        href="/design-studio"
                        onClick={() => setIsSearchOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 10px', borderRadius: '8px', background: '#f8fafc', color: '#1e293b', fontSize: '12px', fontWeight: 650, textDecoration: 'none' }}
                      >
                        <Wand2 size={14} color="#E86A33" />
                        <span>AI Studio</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer shortcut bar */}
              <div
                style={{
                  padding: '8px 14px',
                  background: '#f8fafc',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: '#94a3b8'
                }}
              >
                <span>Press <kbd style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: '4px', color: '#475569', fontWeight: 700 }}>Enter</kbd> to search</span>
                <span>Press <kbd style={{ background: '#e2e8f0', padding: '1px 5px', borderRadius: '4px', color: '#475569', fontWeight: 700 }}>Esc</kbd> to close</span>
              </div>
            </div>
          )}
        </div>

        <Link href="/notifications" aria-label="Notifications" style={{ background: 'none', border: 'none', cursor: 'pointer', color: isVelvetGold ? '#FDE68A' : (scrolled ? '#078b87' : '#111'), padding: 0, display: 'flex' }}>
          <Bell size={22} strokeWidth={2} />
        </Link>
        <Link href={profileUrl} aria-label="Profile" style={{ 
          background: isVelvetGold ? 'linear-gradient(135deg, #B45309 0%, #78350F 100%)' : '#14919b', 
          border: isVelvetGold ? '1px solid #FCD34D' : 'none', 
          cursor: 'pointer', 
          color: '#fff', 
          width: '38px', 
          height: '38px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 700,
        }}>
          {userInitials ? userInitials : <User size={20} strokeWidth={2} />}
        </Link>
      </div>

      <div className="md:hidden flex" style={{ alignItems: 'center', gap: '16px', position: 'relative' }}>
        <div ref={mobileSearchContainerRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Search"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: isVelvetGold ? '#FDE68A' : (scrolled ? '#078b87' : '#111'), padding: 0, display: 'flex' }}
          >
            <Search size={22} strokeWidth={2} />
          </button>

          {isSearchOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 14px)',
                right: '-40px',
                width: '320px',
                maxWidth: 'calc(100vw - 32px)',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                zIndex: 10005,
                color: '#1e293b'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={handleSearchSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  borderBottom: '1px solid #f1f5f9',
                  background: '#f8fafc'
                }}
              >
                <Search size={16} color="#078b87" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tailors, styles..."
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '13.5px',
                    color: '#1e293b'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#078b87',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  Go
                </button>
              </form>
            </div>
          )}
        </div>

        <button className="flex" aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', color: isVelvetGold ? '#FDE68A' : (scrolled ? '#078b87' : '#111'), padding: 0, alignItems: 'center' }}>
          <Menu size={28} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}

export function PublicFooter({ footerTheme }: { footerTheme?: "default" | "velvet-gold" } = {}) {
  const pathname = usePathname();
  const isVelvetGold = footerTheme === "velvet-gold" || pathname === "/download" || pathname === "/download-app" || pathname === "/sun-drop";
  return (
    <footer style={{ 
      backgroundColor: isVelvetGold ? '#07000C' : '#0F172A', 
      backgroundImage: isVelvetGold ? 'radial-gradient(ellipse at 50% -20%, #220636 0%, #08000F 70%)' : 'none',
      borderTop: isVelvetGold ? '1px solid rgba(251, 191, 36, 0.25)' : 'none',
      color: '#fff', 
      padding: '60px 48px 24px', 
      position: 'relative', 
      overflow: 'hidden', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <style dangerouslySetInnerHTML={{__html: `
        .footer-link {
          color: ${isVelvetGold ? '#EDE9FE' : '#94A3B8'};
          text-decoration: none;
          font-size: 16px;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: ${isVelvetGold ? '#FCD34D' : '#14919b'};
          transform: translateX(4px);
        }
        .footer-social-link {
          transition: transform 0.2s ease, opacity 0.2s ease;
          display: inline-block;
        }
        .footer-social-link:hover {
          transform: translateY(-4px) scale(1.1);
          opacity: 0.8;
        }
        .footer-app-btn {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .footer-app-btn:hover {
          transform: translateY(-4px);
          background-color: ${isVelvetGold ? '#2A0944 !important' : '#1e293b !important'};
          border-color: ${isVelvetGold ? '#FCD34D !important' : '#334155'};
        }
      `}} />

      {/* Decorative Wavy Corner SVG */}
      <svg 
        viewBox="0 0 300 300" 
        style={{ position: 'absolute', bottom: 0, right: 0, width: '300px', height: '300px', zIndex: 0, pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill={isVelvetGold ? "#2A0944" : "#14919b"} 
          d="M300,0 C270,30 250,50 260,90 C270,130 230,160 220,190 C210,220 230,250 180,270 C130,290 80,280 40,300 L300,300 Z" 
        />
        {/* Constellation of dots */}
        <g fill={isVelvetGold ? "#FCD34D" : "#fff"} opacity={isVelvetGold ? "0.45" : "0.6"}>
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
          <Link href="/" style={{ fontSize: '26px', fontWeight: 800, color: isVelvetGold ? '#FCD34D' : '#fff', textDecoration: 'none', display: 'block', marginBottom: '16px' }}>Sui Dhāga</Link>
          <p style={{ fontSize: '16px', color: isVelvetGold ? '#EDE9FE' : '#94A3B8', marginBottom: '32px' }}>Tailored for you. Made by experts.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" className="footer-social-link">
              <img src="/icons/footer/facebook.png" alt="Facebook" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#" className="footer-social-link">
              <img src="/icons/footer/instagram.png" alt="Instagram" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#" className="footer-social-link">
              <img src="/icons/footer/pinterest.png" alt="Pinterest" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
            <a href="#" className="footer-social-link">
              <img src="/icons/footer/youtube.png" alt="YouTube" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <FooterColumn title="Explore" links={["Find a Tailor", "AI Design Studio", "How It Works", "Pricing"]} isVelvetGold={isVelvetGold} />
        
        {/* Company Links */}
        <FooterColumn title="Company" links={["About Us", "Contact Us", "Blog", "Careers"]} isVelvetGold={isVelvetGold} />
        
        {/* Support Links */}
        <FooterColumn title="Support" links={["FAQs", "Privacy Policy", "Terms & Conditions", "Refund Policy"]} isVelvetGold={isVelvetGold} />

        {/* App Download */}
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: isVelvetGold ? '#FCD34D' : '#F8FAFC' }}>Download App</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="footer-app-btn" style={{ backgroundColor: isVelvetGold ? 'rgba(26, 6, 42, 0.85)' : '#000', color: '#fff', border: isVelvetGold ? '1px solid rgba(251, 191, 36, 0.35)' : '1px solid #334155', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <img src="/icons/footer/google-play.png" alt="Google Play" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: '11px', color: isVelvetGold ? '#FDE68A' : '#94A3B8', lineHeight: 1 }}>GET IT ON</div>
                <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1, marginTop: '4px' }}>Google Play</div>
              </div>
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noreferrer" className="footer-app-btn" style={{ backgroundColor: isVelvetGold ? 'rgba(26, 6, 42, 0.85)' : '#000', color: '#fff', border: isVelvetGold ? '1px solid rgba(251, 191, 36, 0.35)' : '1px solid #334155', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.69C20.06,16.76 19.6,18.23 18.71,19.5M12,6.11C13.11,6.11 14.39,5.2 15.11,4.07C15.75,3.15 16.25,1.84 16.14,0.5C14.93,0.55 13.56,1.31 12.8,2.23C12.16,3 11.59,4.32 11.73,5.64C13.06,5.75 14.41,4.96 15.17,4C14.5,4.96 13.25,5.75 12,5.64V6.11Z" /></svg>
              <div>
                <div style={{ fontSize: '11px', color: isVelvetGold ? '#FDE68A' : '#94A3B8', lineHeight: 1 }}>Download on the</div>
                <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1, marginTop: '4px' }}>App Store</div>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: isVelvetGold ? '1px solid rgba(251, 191, 36, 0.18)' : '1px solid #1E293B', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', color: isVelvetGold ? '#FDE68A' : '#94A3B8', fontSize: '16px' }}>
        <span>© 2024 Sui Dhāga. All rights reserved.</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, isVelvetGold }: { title: string; links: string[]; isVelvetGold?: boolean }) {
  const footerHref: Record<string, string> = {
    "Find a Tailor": "/tailors",
    "AI Design Studio": "/design-studio",
    "How It Works": "/how-it-works",
    Pricing: "/pricing",
    "About Us": "/about",
    "Contact Us": "/contact",
    Blog: "/blog",
    Careers: "/become-a-tailor",
    FAQs: "/faqs",
    "Privacy Policy": "/privacy-policy",
    "Terms & Conditions": "/terms-and-conditions",
    "Refund Policy": "/refund-policy",
  };

  return (
    <div style={{ flex: '1 1 140px' }}>
      <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: isVelvetGold ? '#FCD34D' : '#F8FAFC' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map((link) => (
          <Link key={link} href={footerHref[link] ?? "/"} className="footer-link">{link}</Link>
        ))}
      </div>
    </div>
  );
}

export function PublicShell({ children, footer = true, navTheme, footerTheme }: { children: React.ReactNode; footer?: boolean; navTheme?: "default" | "velvet-gold"; footerTheme?: "default" | "velvet-gold" }) {
  return (
    <div className="brand-page">
      <div className="ambient-layer" aria-hidden="true" />
      <PublicNav navTheme={navTheme} />
      <main>{children}</main>
      {footer ? <PublicFooter footerTheme={footerTheme || navTheme} /> : null}
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

  const getDashboardItemHref = (item: string) => {
    if (role === "admin") {
      const slug = item.toLowerCase().replace(/\s+/g, "-");
      return slug === "dashboard" ? "/admin/dashboard" : `/admin/${slug}`;
    }
    if (role === "tailor") {
      const slug = item.toLowerCase().replace(/\s+/g, "-");
      return slug === "dashboard" ? "/tailor/dashboard" : `/tailor/${slug}`;
    }
    if (role === "studio") {
      if (item === "Studio Home") return "/design-studio";
      if (item === "New Design") return "/design-studio/new";
      if (item === "My Designs") return "/design-studio/my-designs";
      if (item === "Templates") return "/design-studio/templates";
      return "/design-studio";
    }
    const customerMap: Record<string, string> = {
      Dashboard: "/customer/dashboard",
      Appointments: "/customer/appointments",
      Orders: "/customer/orders",
      Measurements: "/customer/measurements",
      "Saved Designs": "/customer/saved-designs",
      Wishlist: "/customer/wishlist",
      Community: "/community",
      Messages: "/messages",
      Addresses: "/customer/addresses",
      "Payment Methods": "/customer/payments",
      Notifications: "/notifications",
      "Account Settings": "/customer/settings",
    };
    return customerMap[item] || "/customer/dashboard";
  };

  return (
    <div className={isAdmin ? "admin-page" : "app-page"}>
      <div className="ambient-layer" aria-hidden="true" />
      {isAdmin ? null : <PublicNav />}
      <div className="dashboard-grid">
        <aside className={isAdmin ? "admin-sidebar" : "side-nav"}>
          <Link href={isAdmin ? "/admin/dashboard" : "/"} className="side-brand">{isAdmin ? "Sui Dhaga Admin" : "Sui Dhaga"}</Link>
          {items.map((item) => (
            <Link key={item} className={item === active ? "active" : ""} href={getDashboardItemHref(item)}>
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
