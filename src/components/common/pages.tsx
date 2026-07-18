import Link from "next/link";
import { AccountRoleChoice } from "./account-role-choice";
import { adminUsers, appointments, designs, orders, tailors } from "./data";
import { CountryCodeSelect } from "./country-code-select";
import { HowItWorksDeck } from "./how-it-works-deck";
import { LandingHero } from "./landing-hero";
import { DashboardShell, DecorativeFrame, FigureCard, PageHero, PublicShell, StatusPill } from "./site-shell";

export function HomePage() {
  const trustCards = [
    ["2K+", "Trusted Tailors", "Verified experts"],
    ["4.8", "Ratings & Reviews", "Real customer feedback"],
    ["Safe", "Secure Booking", "Protected and easy"],
    ["98%", "Perfect Fit", "Made for you"],
  ];
  const communityCards = [
    ["@neharatnavat", "Bridal Lehenga", "128", "/images/home/recent-look-1.png"],
    ["@ankit.atyle", "Indo Western", "96", "/images/home/recent-look-2.png"],
    ["@the_stitch.story", "Anarkali Suit", "88", "/images/home/recent-look-3.png"],
    ["@modern.threads", "Kurta Set", "76", "/images/home/recent-look-4.png"],
  ];
  const quickActions = [
    ["Book Appointment", "/book/rekha-tailors", "calendar"],
    ["AI Design Studio", "/design-studio", "wand"],
    ["My Orders", "/customer/orders", "bag"],
    ["Style Assistant", "/design-studio/chat", "sparkles"],
  ];
  const categories = [
    ["Kurtas & Suits", "/images/home/category-kurtas-suits.png", "mint"],
    ["Lehengas", "/images/home/category-lehengas.png", "coral"],
    ["Sarees", "/images/home/category-sarees.png", "gold"],
    ["Shirts", "/images/home/category-shirts.png", "blue"],
  ];
  const steps = [
    ["Discover", "Find the right tailor or design your own."],
    ["Customize", "Share details, choose fabrics and fit."],
    ["Create", "Tailor your piece or generate your outfit."],
    ["Receive", "Try on and enjoy your perfect fit."],
  ];

  return (
    <PublicShell>
      <LandingHero />

      <section className="home-trust-strip" aria-labelledby="home-trust-title">
        <div className="home-trust-intro">
          <span>Why Sui Dhaga</span>
          <h2 id="home-trust-title">Confidence stitched into every order</h2>
        </div>
        {trustCards.map(([metric, title, copy], index) => (
          <article className="home-trust-card" key={title}>
            <div className={`trust-icon trust-icon-${index + 1}`}>
              {index === 0 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              ) : index === 1 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6-4.36-4.25 6.03-.88L12 3z"></path></svg>
              ) : index === 2 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-5"></path></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1 2.96-3.08"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0-2.96-3.08"></path></svg>
              )}
            </div>
            <span className="home-trust-metric">{metric}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="home-mobile-inspired">
        <div className="home-greeting">
          <div>
            <span>Ready to look your best today?</span>
            <h2>Explore your Sui Dhaga home</h2>
          </div>
          <Link href="/notifications" aria-label="Open notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </Link>
        </div>

        <div className="home-quick-actions" aria-label="Quick actions">
          {quickActions.map(([title, href, icon]) => (
            <Link href={href} className="home-action-tile" key={title}>
              <span className={`home-action-icon home-action-${icon}`}>
                {icon === "calendar" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
                {icon === "wand" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 4V2"></path><path d="M15 16v-2"></path><path d="M8 9h2"></path><path d="M20 9h2"></path><path d="m17.8 11.8 1.4 1.4"></path><path d="m10.8 4.8-1.4-1.4"></path><path d="m17.8 6.2 1.4-1.4"></path><path d="m3 21 9-9"></path><path d="M12.2 6.2 17.8 11.8"></path></svg>}
                {icon === "bag" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>}
                {icon === "sparkles" && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2Z"></path><path d="M5 3v4"></path><path d="M3 5h4"></path><path d="M19 17v4"></path><path d="M17 19h4"></path></svg>}
              </span>
              <strong>{title}</strong>
            </Link>
          ))}
        </div>

        <div className="home-reference-grid">
          <section className="home-categories" aria-labelledby="home-categories-title">
            <div className="home-section-row">
              <h2 id="home-categories-title">Popular Categories</h2>
              <Link href="/fabrics">View all</Link>
            </div>
            <div className="home-category-grid">
              {categories.map(([title, image, tone]) => (
                <Link href="/tailors" className={`home-category-card tone-${tone}`} key={title}>
                  <img src={image} alt="" aria-hidden="true" />
                  <span>{title}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="home-recommended-tailor" aria-labelledby="home-tailor-title">
            <div className="home-section-row">
              <h2 id="home-tailor-title">Recommended Tailor</h2>
              <Link href="/tailors">View all</Link>
            </div>
            <article className="home-tailor-feature">
              <img src="/images/home/tailor-rekha.png" alt="" aria-hidden="true" />
              <div>
                <strong>Rekha Tailors</strong>
                <p>4.8 (128 reviews) · 2.1 km away</p>
                <span>Bridal, Suits, Sarees</span>
                <div className="home-tailor-badges">
                  <em>Verified</em>
                  <em>Top Rated</em>
                </div>
              </div>
              <Link href="/tailors/rekha-tailors">View Profile</Link>
            </article>
          </section>
        </div>
      </section>

      <section className="home-create-band">
        <div className="create-wave-field" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="home-create-head">
          <span>Create your way</span>
          <h2>Two powerful ways to create</h2>
          <p>Start with a human expert or shape your idea in the AI studio. Both paths lead to a custom outfit that feels made for you.</p>
        </div>
        <div className="home-create-grid">
          <article className="home-create-card">
            <img src="/images/home/create-hire-tailor.png" alt="" aria-hidden="true" className="home-create-bg" />
            <div>
              <h3>Hire a Tailor</h3>
              <Link href="/tailors" aria-label="Explore tailors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </article>
          <article className="home-create-card">
            <img src="/images/home/create-ai-studio.png" alt="" aria-hidden="true" className="home-create-bg" />
            <div>
              <h3>AI Design Studio</h3>
              <Link href="/design-studio" aria-label="Open AI Design Studio">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="home-community">
        <div className="section-head">
          <div>
            <h2>Community Inspiration</h2>
            <p>See what others are creating</p>
          </div>
          <Link href="/community">View all</Link>
        </div>
        <div className="home-community-grid">
          {communityCards.map(([handle, title, likes, image]) => (
            <article className="home-community-card" key={handle}>
              <img src={image} alt={title} className="outfit-card" />
              <div className="home-community-meta">
                <strong>{handle}</strong>
                <span className="likes">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  {likes}
                </span>
              </div>
              <p>{title}</p>
            </article>
          ))}
          <button className="home-next" aria-label="Next community designs">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </section>

      <section className="home-process">
        <div className="home-process-main">
          <div className="home-process-head">
            <span>How it works</span>
            <h2>From idea to outfit</h2>
            <p>Each step is designed to keep the process clear, personal, and easy to follow.</p>
          </div>
          <HowItWorksDeck steps={steps} />
        </div>
        <div className="home-phone-block">
          <div>
            <h2>Mobile Experience</h2>
            <p>Seamless on the go.</p>
          </div>
          <div className="home-phone">
            <img src="/images/home/mobile-app-home.png" alt="Sui Dhaga mobile app home screen" />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

export function PublicInfoPage({ type }: { type: "about" | "contact" | "faqs" | "blog" | "blog-detail" | "privacy" | "terms" | "refund" | "become" }) {
  const content = {
    about: ["About Sui Dhaga", "Where tradition meets technology.", "Our mission is to make custom fashion accessible, personal, and effortless."],
    contact: ["Get in Touch", "We would love to hear from you.", "Reach out for queries, support, partnerships, or tailor onboarding."],
    faqs: ["Quick Answers", "Everything customers and tailors ask most.", "Find guidance on booking, delivery, payments, designs, and order tracking."],
    blog: ["Stories, styles &", "tailoring tips.", "Explore fashion, fabrics, and custom tailoring crafted for you."],
    "blog-detail": ["Custom vs Ready-made:", "What's Better?", "A practical guide to choosing between speed and a perfect personal fit."],
    privacy: ["Privacy Policy", "", "How we collect, use, and protect your information across tailoring and AI design experiences."],
    terms: ["Terms & Conditions", "", "The rules that keep bookings, payments, designs, and collaborations clear for everyone."],
    refund: ["Refund Policy", "", "How cancellations, refund requests, and payment reversals are handled on Sui Dhaga."],
    become: ["Craft. Create. Earn.", "Grow with Sui Dhaga", "Join thousands of expert tailors and get more customers, orders, and online presence."],
  }[type];

  return (
    <PublicShell>
      <PageHero eyebrow={`Home > ${content[0]}`} title={content[0]} accent={content[1]} copy={content[2]} visual={type === "contact" ? "Support" : "Tailoring desk"} />
      {type === "contact" ? <ContactContent /> : type === "blog" || type === "blog-detail" ? <BlogContent detail={type === "blog-detail"} /> : <InfoGrid type={type} />}
    </PublicShell>
  );
}

function ContactContent() {
  return (
    <section className="content-grid">
      <FormCard title="Send us a Message" fields={["Full Name", "Email Address", "Subject", "Message"]} button="Send Message" />
      <article className="panel">
        <h2>Contact Information</h2>
        <p>Email Us<br /><strong>support@suidhaga.com</strong></p>
        <p>Call Us<br /><strong>+91 98765 43210</strong></p>
        <p>Business Hours<br /><strong>Mon - Sat: 9:00 AM - 7:00 PM</strong></p>
        <div className="map-card">Sui Dhaga HQ<br />Connaught Place, New Delhi</div>
      </article>
    </section>
  );
}

function BlogContent({ detail }: { detail: boolean }) {
  if (detail) {
    return (
      <section className="article-layout">
        <FigureCard label="Pastel anarkali" tone="cream" />
        <article className="panel">
          <p className="eyebrow">STYLE GUIDE</p>
          <h2>When custom tailoring wins</h2>
          <p>Custom outfits are strongest when fit, fabric, and embroidery details matter. Ready-made pieces are best for speed, but Sui Dhaga helps you get both confidence and convenience.</p>
          <p>Start with measurements, choose a tailor by specialty, and use AI references to communicate the exact silhouette you want.</p>
        </article>
      </section>
    );
  }

  return (
    <>
      <GallerySection title="Featured Articles" subtitle="Fresh fashion and tailoring reads" />
      <section className="category-row">
        {["Style Guides", "Fabric Guides", "Tailoring Tips", "AI Fashion Tips", "Customer Stories"].map((item) => (
          <article className="info-card" key={item}><h3>{item}</h3><p>24 Articles</p></article>
        ))}
      </section>
    </>
  );
}

function InfoGrid({ type }: { type: string }) {
  const labels = type === "become"
    ? ["More Customers", "Steady Orders", "Business Growth", "Smart Tools", "Get Verified", "Start Earning"]
    : ["Data We Collect", "How We Use Data", "Location Usage", "AI Design Data", "Payment Data", "Your Rights"];
  return (
    <section className="info-grid">
      {labels.map((label, index) => (
        <article className="panel" key={label}>
          <div className="round-icon" />
          <h3>{index + 1}. {label}</h3>
          <p>Clear, trustworthy information presented in the premium Sui Dhaga visual system.</p>
        </article>
      ))}
    </section>
  );
}

export function AuthPage({ mode }: { mode: "login" | "register" | "forgot" | "reset" }) {
  const copy = {
    login: ["WELCOME BACK", "Glad to see you again!", "Login to continue your custom fashion journey with Sui Dhaga.", "Login to your account", "Login"],
    register: ["CREATE YOUR ACCOUNT", "Let's get you started!", "Join Sui Dhaga and connect with expert tailors or showcase your craft.", "Create your account", "Create Account"],
    forgot: ["FORGOT PASSWORD?", "No worries, happens to the best of us!", "Enter your email and we will send you a link to reset your password.", "Reset your password", "Send Reset Link"],
    reset: ["CREATE NEW PASSWORD", "Almost there! Set new password", "Your new password must be different from previous used passwords.", "Set new password", "Reset Password"],
  }[mode];

  return (
    <PublicShell footer={false}>
      <div className={`auth-page-container auth-page-${mode}`}>
        <div className="auth-bg-blob-left"></div>
        <div className="auth-bg-blob-right"></div>
        {mode === "register" ? <img className="auth-edge-coral" src="/images/auth/edge-coral.png" alt="" aria-hidden="true" /> : null}
        
        {/* Full-page floating tailoring elements */}
        {mode === "login" && (
          <>
             <span className="bg-icon float-button">
               <svg viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1.5" fill="var(--coral)"/><circle cx="15" cy="9" r="1.5" fill="var(--coral)"/><circle cx="9" cy="15" r="1.5" fill="var(--coral)"/><circle cx="15" cy="15" r="1.5" fill="var(--coral)"/></svg>
             </span>
             <span className="bg-icon float-scissors">
               <svg viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
             </span>
          </>
        )}
        
        {mode === "register" && (
          <>
            <span className="dot-pattern vertical-column top-left-vert"></span>
            <span className="dot-pattern vertical-column bottom-right-vert"></span>
            <span className="dot-pattern vertical-column flow-right"></span>
            <span className="thread-flow thread-1">
               <svg viewBox="0 0 100 100" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 4">
                 <path d="M90,10 C 70,40 50,50 30,40 C 10,30 10,10 30,10 C 50,10 60,30 40,60 C 20,80 50,90 90,90" />
               </svg>
            </span>
            <span className="thread-flow thread-2">
               <svg viewBox="0 0 100 100" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 4">
                 <path d="M10,10 C 30,40 50,50 70,40 C 90,30 90,10 70,10 C 50,10 40,30 60,60 C 80,80 50,90 10,90" />
               </svg>
            </span>
          </>
        )}

        <section className="auth-grid">
          <div className="auth-hero">
            <p className="eyebrow">{copy[0]}</p>
            <h1>{copy[1]}</h1>
            <p>{copy[2]}</p>
            {(mode === "register" || mode === "login") ? (
               <div className="auth-illustration">
                  <div className="bg-elements">
                     {mode === "login" ? (
                       <>
                         <span className="dot-pattern top-right"></span>
                         <span className="dot-pattern bottom-right"></span>
                         <span className="red-cube">
                           <svg viewBox="0 0 24 24" fill="#FF5B52" stroke="#111" strokeWidth="1.5">
                             <polygon points="12 2 2 7 12 12 22 7" />
                             <polygon points="2 7 2 17 12 22 12 12" />
                             <polygon points="22 7 22 17 12 22 12 12" />
                           </svg>
                         </span>
                         <span className="yellow-diamond">
                            <svg viewBox="0 0 24 24" fill="#F7B915" stroke="#111" strokeWidth="1.5">
                              <polygon points="12 2 22 12 12 22 2 12" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <line x1="12" y1="2" x2="12" y2="22" />
                            </svg>
                         </span>
                       </>
                     ) : (
                       <>
                         <span className="dot-pattern top-right"></span>
                         <span className="dot-pattern bottom-right"></span>
                         <span className="paper-plane">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#FF5B52" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                         </span>
                         <span className="yellow-triangle"></span>
                       </>
                     )}
                  </div>
                  <img src={mode === "login" ? "/images/auth/login_illustration.png" : "/images/auth/signup_illustration.png"} alt={mode === "login" ? "Login illustration" : "Tailor illustration"} />
               </div>
            ) : (
               <FigureCard label={mode === "forgot" ? "Secure reset" : "Atelier welcome"} tone="yellow" />
            )}
          </div>
          <FormCard
            title={copy[3]}
            intro={mode === "register" ? "Join Sui Dhaga and discover the perfect custom tailoring experience." : mode === "login" ? "Welcome back! Please enter your details." : "Please enter your details."}
            fields={mode === "login" ? ["Email Address", "Password"] : mode === "forgot" ? ["Email Address"] : mode === "reset" ? ["New Password", "Confirm Password"] : ["Full Name", "Email", "Phone Number", "Password", "Confirm Password"]}
            button={copy[4]}
            mode={mode}
          />
        </section>
      </div>
    </PublicShell>
  );
}

export function MarketplacePage({ view }: { view: "list" | "map" | "profile" | "compare" | "fabrics" }) {
  if (view === "profile") return <TailorProfile />;
  if (view === "compare") return <CompareTailors />;

  return (
    <PublicShell>
      <DecorativeFrame>
        <section className="marketplace-head">
          <div>
            <p className="eyebrow">Home &gt; Tailors</p>
            <h1>{view === "fabrics" ? "Explore premium fabrics" : "Find the perfect tailor near you"}</h1>
            <p>Discover verified experts who can bring your style to life.</p>
          </div>
          <SearchFilters />
        </section>
        <section className={view === "map" ? "map-layout" : "split-market"}>
          <FiltersPanel />
          <div className="tailor-list">
            {tailors.map((tailor) => <TailorCard key={tailor.id} tailor={tailor} />)}
          </div>
          <MapPanel />
        </section>
      </DecorativeFrame>
    </PublicShell>
  );
}

function TailorProfile() {
  return (
    <PublicShell>
      <DecorativeFrame>
        <section className="profile-layout">
          <div>
            <FigureCard label="Rekha Tailors gallery" tone="cream" />
            <div className="thumb-row">{["1", "2", "3", "+12"].map((x) => <span key={x}>{x}</span>)}</div>
            <article className="panel"><h2>About Rekha Tailors</h2><p>We bring 12+ years of expertise in elegant and custom outfits, from traditional wear to contemporary styling.</p></article>
          </div>
          <div>
            <h1>Rekha Tailors <StatusPill>Verified</StatusPill></h1>
            <p>4.8 (128 reviews) · 0.6 km away · Women's Wear · Sarees · Lehengas</p>
            <div className="button-row"><Link className="btn primary" href="/book/rekha-tailors">Book Appointment</Link><Link className="btn secondary" href="/messages/rekha-tailors">Message</Link></div>
            <div className="stat-grid">{["12+ Years", "2K+ Customers", "98% On-time", "4.8 Rating"].map((x) => <article className="info-card" key={x}><strong>{x}</strong></article>)}</div>
            <section className="content-grid slim">
              <article className="panel"><h2>Services & Packages</h2><ServiceRows /></article>
              <article className="panel"><h2>Availability</h2><p>Mon-Sat · 9:00 AM - 7:00 PM</p><p>Sunday · Closed</p></article>
            </section>
          </div>
        </section>
        <GallerySection title="Reviews" subtitle="Based on 128 reviews" />
      </DecorativeFrame>
    </PublicShell>
  );
}

function CompareTailors() {
  return (
    <PublicShell>
      <DecorativeFrame>
        <h1>Compare Tailors</h1>
        <p>Compare top tailors and choose the best match for your needs.</p>
        <section className="compare-grid">
          <aside className="panel">
            <h3>Selected Tailors</h3>
            {tailors.slice(0, 3).map((tailor) => <TailorMini key={tailor.id} tailor={tailor} />)}
          </aside>
          <div className="table-panel">
            <table>
              <thead><tr><th>Metric</th>{tailors.slice(0, 3).map((t) => <th key={t.id}>{t.name}</th>)}</tr></thead>
              <tbody>
                {["Rating & Reviews", "Starting Price", "Experience", "Specialties", "Delivery Time", "On-time Delivery", "Happy Customers"].map((row) => (
                  <tr key={row}><td>{row}</td><td>4.8 stars</td><td>4.6 stars</td><td>4.7 stars</td></tr>
                ))}
                <tr><td>Action</td><td><button>Book Now</button></td><td><button>Book Now</button></td><td><button>Book Now</button></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </DecorativeFrame>
    </PublicShell>
  );
}

export function CustomerPage({ view }: { view: string }) {
  if (view === "book") return <BookingPage />;
  const active = view.includes("appointment") ? "Appointments" : view.includes("order") ? "Orders" : view.includes("measurement") ? "Measurements" : view.includes("wishlist") ? "Wishlist" : view.includes("saved") ? "Saved Designs" : "Dashboard";
  return (
    <DashboardShell active={active}>
      {view === "dashboard" ? <CustomerDashboard /> : view.includes("order-detail") ? <OrderDetail /> : view.includes("measurements") ? <Measurements edit={view.includes("new")} /> : view.includes("saved") || view.includes("wishlist") ? <SavedGrid title={active} /> : <ListPage title={`My ${active}`} />}
    </DashboardShell>
  );
}

function BookingPage() {
  return (
    <PublicShell>
      <DecorativeFrame>
        <h1>Book your appointment</h1>
        <p>Fill in the details to book your slot with Rekha Tailors.</p>
        <section className="booking-grid">
          <article className="panel"><h3>Selected Tailor</h3><TailorMini tailor={tailors[0]} /><label>Choose a service<select><option>Custom Stitching</option></select></label></article>
          <article className="panel"><h3>Select Date</h3><CalendarMock /></article>
          <article className="panel"><h3>Select Time</h3><div className="chip-row">{["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"].map((x) => <button key={x}>{x}</button>)}</div></article>
          <FormCard title="Add Details" fields={["Notes", "Reference Image"]} button="Confirm Booking" />
        </section>
      </DecorativeFrame>
    </PublicShell>
  );
}

function CustomerDashboard() {
  return (
    <>
      <PageHeader title="Welcome back, Ayesha Khan" copy="Here's what's happening with your style journey today." />
      <section className="stat-grid">{["3 Upcoming Appointments", "2 Orders in Progress", "5 Saved Designs", "12 Measurements Saved"].map((x) => <article className="info-card" key={x}><strong>{x}</strong><Link href="#">View all</Link></article>)}</section>
      <section className="content-grid">
        <ListPanel title="Recent Orders" rows={orders.slice(0, 3).map((o) => `${o.id} · ${o.item} · ${o.status}`)} />
        <ListPanel title="Upcoming Appointments" rows={appointments.map((a) => `${a.date} · ${a.tailor} · ${a.status}`)} />
      </section>
      <GallerySection title="Saved Designs" subtitle="Your latest inspiration" compact />
    </>
  );
}

export function StudioPage({ view }: { view: string }) {
  const active = view.includes("my") ? "My Designs" : view.includes("template") ? "Templates" : view === "new" ? "New Design" : "Studio Home";
  return (
    <DashboardShell active={active} role="studio">
      {view === "home" ? <StudioHome /> : view === "new" ? <StudioNew /> : view === "editor" ? <EditorPage /> : view === "export" ? <ExportPage /> : view === "templates" || view === "my-designs" ? <SavedGrid title={active} /> : <GeneratorPage view={view} />}
    </DashboardShell>
  );
}

function StudioHome() {
  return (
    <>
      <PageHeader title="Welcome to AI Design Studio" copy="Bring your ideas to life with the power of AI." />
      <section className="action-grid">{["Create New Design", "Browse Templates", "AI Assistant"].map((x) => <Link className="panel action-card" key={x} href="/design-studio/new"><h3>{x}</h3><p>Start creating with guided tools.</p></Link>)}</section>
      <GallerySection title="Recent Designs" subtitle="Your saved outfit ideas" compact />
    </>
  );
}

function StudioNew() {
  return (
    <>
      <PageHeader title="What would you like to create?" copy="Choose a method to start your design." />
      <section className="action-grid">
        {[
          ["Text to Design", "/design-studio/text-to-design"],
          ["Image to Design", "/design-studio/image-to-design"],
          ["Sketch to Design", "/design-studio/sketch-to-design"],
          ["Chat with AI", "/design-studio/chat"],
        ].map(([label, href]) => <Link className="panel action-card" key={label} href={href}><h3>{label}</h3><p>Describe, upload, sketch, or discuss your outfit.</p></Link>)}
      </section>
      <DecorativeFrame><FigureCard label="Designer at laptop" tone="yellow" /></DecorativeFrame>
    </>
  );
}

function GeneratorPage({ view }: { view: string }) {
  const title = view === "chat" ? "Chat with AI Designer" : view === "image-to-design" ? "Upload image reference" : view === "sketch-to-design" ? "Upload your sketch" : "Describe your outfit";
  return (
    <>
      <PageHeader title={title} copy="Share details and let AI generate a polished design reference." />
      <section className="studio-grid">
        <FormCard title="Your Prompt" fields={["Garment Type", "Style", "Occasion", "Design Notes"]} button="Generate Design" />
        <article className="panel">
          <h2>AI Generated Result</h2>
          <FigureCard label="Generated outfit" tone="cream" />
          <div className="button-row"><button>Save Design</button><button>Download</button></div>
        </article>
      </section>
    </>
  );
}

function EditorPage() {
  return (
    <>
      <div className="editor-top"><h1>Untitled Design</h1><div className="button-row"><button>Save</button><button>Export</button></div></div>
      <section className="editor-grid">
        <aside className="panel tool-list">{["Templates", "Elements", "Text", "Colors", "Fabrics", "Embroidery", "Measurements", "AI Assistant", "Layers"].map((x) => <button key={x}>{x}</button>)}</aside>
        <div className="canvas-panel"><FigureCard label="Garment canvas" tone="cream" /></div>
        <aside className="panel"><h3>AI Assistant</h3><p>Try adding floral embroidery on the sleeves.</p><button>Apply Suggestion</button><h3>Color Palette</h3><div className="swatches" /></aside>
      </section>
    </>
  );
}

function ExportPage() {
  return (
    <>
      <PageHeader title="Export Design / Tech Pack" copy="Download tech pack or share with your tailor." />
      <section className="studio-grid">
        <article className="panel"><FigureCard label="Mint green anarkali" tone="cream" /><button>Download PDF</button></article>
        <article className="table-panel"><SizeTable /></article>
      </section>
    </>
  );
}

export function CommunityPage({ view }: { view: string }) {
  const active = view.includes("message") ? "Messages" : "Community";
  return (
    <DashboardShell active={active}>
      {view === "messages" || view === "conversation" ? <Messages detail={view === "conversation"} /> : view === "create" ? <CreatePost /> : view === "post" ? <PostDetail /> : <CommunityFeed />}
    </DashboardShell>
  );
}

function CommunityFeed() {
  return (
    <>
      <PageHeader title="Welcome to the Community" copy="Share designs, get inspired, and connect with fashion lovers." action="Create Post" />
      <section className="feed-grid">
        <div>{[0, 1].map((i) => <PostCard key={i} design={designs[i]} />)}</div>
        <ListPanel title="Trending Designs" rows={designs.slice(0, 5).map((d) => d.title)} />
      </section>
    </>
  );
}

function CreatePost() {
  return (
    <>
      <PageHeader title="Share your creation" copy="Inspire others with your unique design." />
      <FormCard title="Upload Design" fields={["Caption", "Tags", "Visibility"]} button="Publish Post" />
    </>
  );
}

function PostDetail() {
  return (
    <section className="post-detail">
      <FigureCard label="Pastel anarkali post" tone="cream" />
      <article className="panel"><h2>Ayesha Khan</h2><p>Designed this pastel Anarkali for a summer wedding.</p><p>#Anarkali #Pastel #WeddingWear</p><button>Use as Reference</button><h3>Comments</h3><p>Beautiful color combination.</p></article>
    </section>
  );
}

function Messages({ detail }: { detail: boolean }) {
  return (
    <>
      <PageHeader title="Messages" copy="Stay connected with tailors and designers." />
      <section className="messages-grid">
        <ListPanel title="Recent Chats" rows={tailors.map((t) => `${t.name} · ${detail ? "Online" : "Typing..."}`)} />
        <article className="chat-panel">
          {detail ? <><p className="bubble left">How can I help with your order?</p><p className="bubble right">I wanted to confirm the delivery date.</p><p className="bubble left">Your order is ready and will be delivered on 24 May.</p></> : <p>Select a conversation to start messaging.</p>}
        </article>
      </section>
    </>
  );
}

export function TailorPage({ view }: { view: string }) {
  if (view === "onboarding") return <TailorOnboarding />;
  const active = view.includes("profile") ? "Profile" : view.includes("service") ? "Services" : view.includes("order") ? "Orders" : view.includes("appointment") ? "Appointments" : view.includes("availability") ? "Availability" : view.includes("earning") ? "Earnings" : "Dashboard";
  return (
    <DashboardShell active={active} role="tailor">
      {view === "dashboard" ? <TailorDashboard /> : view === "profile" ? <TailorBusinessProfile /> : view === "availability" ? <AvailabilityPage /> : view === "earnings" ? <EarningsPage /> : view === "order-detail" ? <OrderDetail tailor /> : <ListPage title={`My ${active}`} />}
    </DashboardShell>
  );
}

function TailorOnboarding() {
  return (
    <PublicShell>
      <PageHero eyebrow="Tailor Partner" title="Craft. Create. Earn." accent="Grow with Sui Dhaga" copy="Join thousands of expert tailors and get more customers, more orders, and grow your business online." visual="Tailor partner" />
      <InfoGrid type="become" />
    </PublicShell>
  );
}

function TailorDashboard() {
  return (
    <>
      <PageHeader title="Welcome back, Arjun" copy="Here's what's happening with your business today." />
      <section className="stat-grid">{["12 New Orders", "5 Appointments", "18 Orders in Progress", "Rs24,860 This Month"].map((x) => <article className="info-card" key={x}><strong>{x}</strong></article>)}</section>
      <section className="content-grid"><ListPanel title="Today's Appointments" rows={appointments.map((a) => `${a.time} · ${a.service}`)} /><ListPanel title="New Orders" rows={orders.map((o) => `${o.id} · ${o.item}`)} /></section>
    </>
  );
}

function TailorBusinessProfile() {
  return (
    <>
      <PageHeader title="Your Business Profile" copy="Manage your business information and public profile." />
      <section className="content-grid"><article className="panel"><TailorMini tailor={tailors[2]} /><p>8 years of experience, ethnic wear specialist.</p><button>Edit Profile</button></article><ListPanel title="Verification Status" rows={["ID Proof · Verified", "Address Proof · Verified", "Business Proof · Verified", "Bank Details · Verified"]} /></section>
    </>
  );
}

function AvailabilityPage() {
  return (
    <>
      <PageHeader title="Manage Your Availability" copy="Set your working hours and availability." />
      <section className="booking-grid"><CalendarMock /><FormCard title="Selected Date" fields={["9:00 - 10:00 AM", "11:00 - 1:00 PM", "2:00 - 4:00 PM", "Blocked Dates"]} button="Save Availability" /></section>
    </>
  );
}

function EarningsPage() {
  return (
    <>
      <PageHeader title="Earnings Overview" copy="Monitor earnings, transactions, and withdrawals." />
      <section className="stat-grid">{["Rs48,650 Total Earnings", "Rs38,250 This Month", "42 Completed Orders", "Rs6,400 Pending Payouts"].map((x) => <article className="info-card" key={x}><strong>{x}</strong></article>)}</section>
      <section className="content-grid"><div className="chart-card" /><ListPanel title="Withdrawal History" rows={["10 May · Rs5,000 · Paid", "25 Apr · Rs7,000 · Paid", "10 Apr · Rs6,000 · Paid"]} /></section>
    </>
  );
}

export function AdminPage({ view }: { view: string }) {
  const active = view[0].toUpperCase() + view.slice(1);
  return (
    <DashboardShell active={active === "Dashboard" ? "Dashboard" : active} role="admin">
      {view === "dashboard" ? <AdminDashboard /> : <AdminTable title={active} />}
    </DashboardShell>
  );
}

function AdminDashboard() {
  return (
    <>
      <PageHeader title="Welcome back, Admin" copy="Here's what's happening on the platform today." />
      <section className="stat-grid">{["12,845 Total Users", "2,341 Total Tailors", "5,672 Total Orders", "Rs45,78,320 Total Revenue"].map((x) => <article className="info-card" key={x}><strong>{x}</strong><p>Up vs last week</p></article>)}</section>
      <section className="content-grid"><div className="chart-card" /><ListPanel title="Recent Activity" rows={["New user registered", "Tailor verified", "New order placed", "Payment received", "Review added"]} /></section>
    </>
  );
}

function AdminTable({ title }: { title: string }) {
  const rows = title === "Payments" ? orders.map((o) => [o.id, o.item, o.amount, o.status]) : adminUsers.map((u) => [u.name, u.role, u.email, u.status]);
  return (
    <>
      <PageHeader title={title} copy={`Manage ${title.toLowerCase()} on the platform.`} action="Export" />
      <div className="filter-row"><input placeholder={`Search ${title.toLowerCase()}...`} /><select><option>All Status</option></select><button>Filters</button></div>
      <div className="table-panel"><table><thead><tr>{["Name / ID", "Type", "Detail", "Status", "Actions"].map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.join("")}>{row.map((cell) => <td key={cell}>{cell}</td>)}<td>View · More</td></tr>)}</tbody></table></div>
    </>
  );
}

function GallerySection({ title, subtitle, compact = false }: { title: string; subtitle: string; compact?: boolean }) {
  return (
    <section className={compact ? "gallery compact" : "gallery"}>
      <div className="section-head"><div><h2>{title}</h2><p>{subtitle}</p></div><Link href="#">View all</Link></div>
      <div className="design-grid">
        {designs.slice(0, compact ? 4 : 6).map((design, index) => (
          <article className="design-card" key={design.title}>
            <FigureCard label={design.type} tone={index % 2 ? "yellow" : "cream"} />
            <h3>{design.title}</h3>
            <p>{design.saved}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SearchFilters() {
  return <div className="search-row"><input placeholder="Search by name, specialty or location" /><button>Search</button></div>;
}

function FiltersPanel() {
  return <aside className="panel filters"><h3>Filters</h3>{["Location", "Specialties", "Services", "Price Range", "Rating"].map((x) => <label key={x}>{x}<select><option>All</option></select></label>)}<button>Apply Filters</button></aside>;
}

function MapPanel() {
  return <div className="map-panel">{Array.from({ length: 12 }).map((_, i) => <span className="pin" key={i} />)}<button>View full map</button></div>;
}

function TailorCard({ tailor }: { tailor: (typeof tailors)[number] }) {
  return <article className="tailor-card"><FigureCard label={tailor.name} /><div><h3>{tailor.name}</h3><p>{tailor.rating} stars · {tailor.distance}</p><p>{tailor.specialty} · Starting from {tailor.price}</p></div><Link href={`/tailors/${tailor.id}`}>View Profile</Link></article>;
}

function TailorMini({ tailor }: { tailor: (typeof tailors)[number] }) {
  return <div className="tailor-mini"><FigureCard label={tailor.name} /><div><strong>{tailor.name}</strong><p>{tailor.rating} ({tailor.reviews}) · {tailor.distance}</p></div></div>;
}

function FormCard({ title, intro, fields, button, mode }: { title: string; intro?: string; fields: string[]; button: string; mode?: string }) {
  const roleChoice = mode === "register";

  return (
    <form className={`form-card ${mode ? `form-card-${mode}` : ""}`}>
      <h2>{title}</h2>
      {intro ? <p className="form-intro">{intro}</p> : null}
      
      {roleChoice ? (
        <AccountRoleChoice />
      ) : null}

      <div className="form-fields">
        {fields.map((field) => (
          <label key={field}>
            <span className="field-label">{field}</span>
            <div className={`input-wrap ${field === "Phone Number" ? "phone-input-wrap" : ""}`}>
               {field === "Phone Number" ? (
                 <CountryCodeSelect />
               ) : null}
               <input 
                 type={field.toLowerCase().includes("password") ? "password" : field.toLowerCase().includes("email") ? "email" : field === "Phone Number" ? "tel" : "text"} 
                 placeholder={field.toLowerCase().includes("password") ? (field.includes("Confirm") ? "Confirm your password" : "Create a password") : field.toLowerCase().includes("email") ? "Enter your email address" : field === "Phone Number" ? "Enter phone number" : "Enter your full name"} 
               />
               {field.toLowerCase().includes("password") && (
                 <span className="eye-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                 </span>
               )}
            </div>
          </label>
        ))}
      </div>
      
      {roleChoice && (
        <label className="terms-checkbox">
           <input type="checkbox" defaultChecked />
           <span>I agree to the <Link href="/terms-and-conditions">Terms & Conditions</Link> and <Link href="/privacy-policy">Privacy Policy</Link></span>
        </label>
      )}

      {mode === "login" && (
        <div className="login-options" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0', fontSize: '14px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--muted)' }}>
             <input type="checkbox" style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--line)' }} />
             Remember me
          </label>
          <Link href="/auth/forgot-password" style={{ color: 'var(--teal)', fontWeight: '600' }}>Forgot Password?</Link>
        </div>
      )}

      <button type="button" className="btn primary submit-btn">{button}</button>
      
      {roleChoice && (
         <p className="auth-footer-link">Already have an account? <Link href="/auth/login">Login</Link></p>
      )}

      {mode === "login" && (
        <div className="social-login-section" style={{ marginTop: '24px', textAlign: 'center' }}>
          <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--muted)', fontSize: '12px', margin: '24px 0' }}>
            <span style={{ flex: 1, height: '1px', background: 'var(--line)' }}></span>
            or continue with
            <span style={{ flex: 1, height: '1px', background: 'var(--line)' }}></span>
          </div>
          <button type="button" className="google-btn" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontWeight: '600', cursor: 'pointer', color: 'var(--ink)' }}>
             <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
             Continue with Google
          </button>
          <p className="auth-footer-link" style={{ marginTop: '32px' }}>Don't have an account? <Link href="/auth/register" style={{ color: 'var(--teal)', fontWeight: '600' }}>Register now</Link></p>
        </div>
      )}
    </form>
  );
}

function PageHeader({ title, copy, action }: { title: string; copy: string; action?: string }) {
  return <header className="page-header"><div><h1>{title}</h1><p>{copy}</p></div>{action ? <button>{action}</button> : null}</header>;
}

function ListPanel({ title, rows }: { title: string; rows: string[] }) {
  return <article className="panel list-panel"><h2>{title}</h2>{rows.map((row) => <div key={row} className="list-row"><span>{row}</span><button>View</button></div>)}</article>;
}

function ListPage({ title }: { title: string }) {
  return <><PageHeader title={title} copy="Track and manage everything in one place." action="New" /><ListPanel title={title} rows={[...orders.map((o) => `${o.id} · ${o.item} · ${o.status}`), ...appointments.map((a) => `${a.date} · ${a.tailor}`)]} /></>;
}

function OrderDetail({ tailor = false }: { tailor?: boolean }) {
  return (
    <>
      <PageHeader title="Order #SD1256" copy="Placed on 20 May, 2024 · Estimated delivery: 27 May, 2024" action={tailor ? "Update Status" : "Download Invoice"} />
      <div className="progress-line">{["Order Placed", "Fabric Confirmed", "Cutting", "Stitching", "Quality Check", "Out for Delivery", "Delivered"].map((x) => <span key={x}>{x}</span>)}</div>
      <section className="content-grid"><ListPanel title="Order Items" rows={["Custom Anarkali Suit · Light Pink · Qty 1"]} /><ListPanel title={tailor ? "Customer Information" : "Tailor Information"} rows={["Ayesha Khan", "Rekha Tailors", "Message"]} /><ListPanel title="Payment Summary" rows={["Item Total Rs2,000", "Shipping Rs0", "Total Rs2,100", "Paid via UPI"]} /></section>
    </>
  );
}

function Measurements({ edit }: { edit: boolean }) {
  return (
    <>
      <PageHeader title={edit ? "Add New Measurement" : "My Measurements"} copy="Manage your body measurements for the perfect fit." action="Add New Measurement" />
      <section className="measurement-grid"><FigureCard label="Body overview" tone="cream" /><FormCard title="Body Measurements" fields={["Bust", "Waist", "Hip", "Shoulder", "Arm Length", "Sleeve Length", "Top Length", "Neck"]} button="Save Measurements" /></section>
    </>
  );
}

function SavedGrid({ title }: { title: string }) {
  return <><PageHeader title={title} copy="All your saved favorites in one place." /><GallerySection title={title} subtitle="Saved items and designs" compact /></>;
}

function PostCard({ design }: { design: (typeof designs)[number] }) {
  return <article className="post-card"><h3>Ayesha Khan</h3><p>Designed this {design.title} for a summer wedding.</p><FigureCard label={design.title} tone="cream" /><p>#Anarkali #Pastel #WeddingWear</p><div className="button-row"><button>Like</button><button>Comment</button><button>Save</button></div></article>;
}

function ServiceRows() {
  return <div className="service-row">{["Basic Stitching Rs1,000", "Premium Stitching Rs2,000", "Custom Design Rs3,500"].map((x) => <article className="info-card" key={x}>{x}</article>)}</div>;
}

function CalendarMock() {
  return <div className="calendar-mock">{Array.from({ length: 31 }).map((_, i) => <button className={i === 19 ? "selected" : ""} key={i}>{i + 1}</button>)}</div>;
}

function SizeTable() {
  return <table><thead><tr>{["Size", "Bust", "Waist", "Hip", "Shoulder"].map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{["S", "M", "L", "XL"].map((s) => <tr key={s}><td>{s}</td><td>34</td><td>28</td><td>36</td><td>14</td></tr>)}</tbody></table>;
}
