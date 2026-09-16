import Link from "next/link";
import { AccountRoleChoice } from "./account-role-choice";
import { adminUsers, appointments, designs, orders, tailors } from "./data";
import { CountryCodeSelect } from "./country-code-select";
import { DashboardShell, DecorativeFrame, FigureCard, PageHero, PublicShell, StatusPill } from "./site-shell";
import { HomePageRevamped } from "@/components/home/home-page-revamped";

export function HomePage() {
  return (
    <PublicShell>
      <HomePageRevamped />
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
    forgot: ["FORGOT PASSWORD?", "No worries, happens to the best of us!", "Enter your email address and we'll send you a link to reset your password.", "Reset your password", "Send Reset Link"],
    reset: ["CREATE NEW PASSWORD", "Almost there! Set new password", "Your new password must be different from previous used passwords.", "Set new password", "Reset Password"],
  }[mode];

  return (
    <PublicShell footer={mode === "login" || mode === "forgot" || mode === "reset"}>
      <div className={`auth-page-container auth-page-${mode}`}>
        {mode === "register" ? <div className="auth-bg-blob-left"></div> : null}
        {mode === "register" ? <div className="auth-bg-blob-right"></div> : null}
        {mode === "register" ? <img className="auth-edge-coral" src="/images/auth/edge-coral.png" alt="" aria-hidden="true" /> : null}
        {(mode === "forgot" || mode === "login" || mode === "reset") ? (
          <>
            <img className="auth-edge-teal" src="/images/auth/edge-teal.png" alt="" aria-hidden="true" />
            <img className="auth-edge-coral-forgot" src="/images/auth/edge-coral.png" alt="" aria-hidden="true" />
          </>
        ) : null}
        
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
            <div className="auth-illustration">
              {mode === "register" && (
                <div className="bg-elements">
                   <span className="dot-pattern top-right"></span>
                   <span className="dot-pattern bottom-right"></span>
                   <span className="paper-plane">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#FF5B52" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                   </span>
                   <span className="yellow-triangle"></span>
                </div>
              )}
              <img 
                src={
                  mode === "login" 
                    ? "/images/auth/login_illustration.png" 
                    : mode === "register" 
                      ? "/images/auth/signup_illustration.png" 
                      : mode === "reset" 
                        ? "/images/auth/reset_illustration.png" 
                        : "/images/auth/forgot_illustration.png"
                } 
                alt={
                  mode === "login" 
                    ? "Login illustration" 
                    : mode === "register" 
                      ? "Tailor illustration" 
                      : mode === "reset"
                        ? "Reset password illustration"
                        : "Forgot password illustration"
                } 
              />
            </div>
          </div>
          <FormCard
            title={copy[3]}
            intro={mode === "register" ? "Join Sui Dhaga and discover the perfect custom tailoring experience." : mode === "login" ? "Welcome back! Please enter your details." : mode === "forgot" ? "Enter the email address associated with your account." : "Choose a strong password for your account."}
            fields={mode === "login" ? ["Email Address", "Password"] : mode === "forgot" ? ["Email Address"] : mode === "reset" ? ["New Password", "Confirm Password"] : ["Full Name", "Email", "Phone Number", "Password", "Confirm Password"]}
            button={copy[4]}
            mode={mode}
          />
        </section>
      </div>
    </PublicShell>
  );
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
          <div key={field} style={{ marginBottom: '16px' }}>
            <label>
              <span className="field-label">{field}</span>
              <div className={`input-wrap ${field === "Phone Number" ? "phone-input-wrap" : ""}`}>
                 {field === "Phone Number" ? (
                   <CountryCodeSelect />
                 ) : null}
                 <input 
                   type={field.toLowerCase().includes("password") ? "password" : field.toLowerCase().includes("email") ? "email" : field === "Phone Number" ? "tel" : "text"} 
                   placeholder={field.toLowerCase().includes("password") ? (field.includes("Confirm") ? "Confirm new password" : field.includes("New") ? "Enter new password" : "Create a password") : field.toLowerCase().includes("email") ? "Enter your email" : field === "Phone Number" ? "Enter phone number" : "Enter your full name"} 
                 />
                 {field.toLowerCase().includes("password") && (
                   <span className="eye-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                   </span>
                 )}
              </div>
            </label>

            {mode === "reset" && field === "New Password" && (
              <ul className="password-checklist" style={{ listStyle: 'none', padding: 0, margin: '14px 0 8px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  "At least 8 characters",
                  "One uppercase letter",
                  "One number",
                  "One special character"
                ].map((rule) => (
                  <li key={rule} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e6f4f1', color: '#078b87', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            )}
          </div>
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

      {mode === "forgot" && (
        <>
          <div className="forgot-info-box" style={{ marginTop: '24px', background: '#fffdf0', border: '1px solid #fef08a', borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div className="info-icon" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffffff', border: '1px solid #fde047', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#078b87', flexShrink: 0, marginTop: '2px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '13.5px', fontWeight: '800', color: '#1e293b', marginBottom: '2px' }}>Didn&apos;t receive the email?</strong>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>Check your spam folder or try again.</p>
            </div>
          </div>
          <Link href="/auth/login" className="back-to-login-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#078b87', fontWeight: '700', fontSize: '14.5px', marginTop: '24px', textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Login
          </Link>
        </>
      )}

      {mode === "reset" && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/auth/login" className="back-to-login-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#078b87', fontWeight: '700', fontSize: '14.5px', textDecoration: 'none' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Login
          </Link>
        </div>
      )}
      
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
             <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
             Continue with Google
          </button>
           <p className="auth-footer-link" style={{ marginTop: '32px' }}>Don&apos;t have an account? <Link href="/auth/register" style={{ color: 'var(--teal)', fontWeight: '600' }}>Register now</Link></p>
        </div>
      )}
    </form>
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
            <p>4.8 (128 reviews) · 0.6 km away · Women&apos;s Wear · Sarees · Lehengas</p>
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
        <ListPanel title="Recent Orders" rows={orders.slice(0, 3).map((o) => `${o.id} Â· ${o.item} Â· ${o.status}`)} />
        <ListPanel title="Upcoming Appointments" rows={appointments.map((a) => `${a.date} Â· ${a.tailor} Â· ${a.status}`)} />
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
