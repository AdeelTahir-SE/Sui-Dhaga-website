import { PublicShell } from "@/components/common/site-shell";
import { Shield, Target, CheckCircle, Users, Wand2, Lock, Globe } from "lucide-react";
import Link from "next/link";

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function AboutPage() {
  return (
    <PublicShell>
      <div style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '140px 24px 80px' }}>
          
          {/* Breadcrumbs */}
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '48px', fontWeight: 500 }}>
            <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px' }}>&gt;</span> <span style={{ color: '#111' }}>About Us</span>
          </div>

          {/* Hero Section */}
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', marginBottom: '100px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', position: 'relative' }}>
              <h1 style={{ fontSize: '56px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-1.5px', lineHeight: 1.1 }}>About Sui Dhaga</h1>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#555', maxWidth: '440px', margin: 0 }}>
                Sui Dhaga is where tradition meets technology. We connect you with expert tailors and AI tools to create outfits that are uniquely yours.
              </p>
              
              {/* Decorative Motifs */}
              <div style={{ position: 'absolute', right: '40px', top: '10px', color: '#FF5252' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="12" y="2" width="14" height="14" transform="rotate(45 12 2)" />
                </svg>
              </div>
              <div style={{ position: 'absolute', right: '0', bottom: '0', color: '#111' }}>
                <svg width="60" height="20" viewBox="0 0 60 20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M0 10 L10 0 L20 10 L30 0 L40 10 L50 0 L60 10" />
                </svg>
              </div>
            </div>
            <div style={{ flex: '1 1 400px', position: 'relative' }}>
              {/* Background Shapes */}
              <div style={{ position: 'absolute', bottom: '-20px', left: '-30px', width: '140px', height: '140px', backgroundColor: '#FFD13B', borderRadius: '40px 40px 0 40px', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '200px', height: '160px', backgroundColor: '#14919b', borderRadius: '40px 40px 40px 0', zIndex: 0 }}></div>
              <div style={{ position: 'absolute', top: '-20px', right: '40px', width: '100px', height: '100px', backgroundColor: '#F3EFE9', borderRadius: '50%', zIndex: 0 }}></div>
              
              <img 
                src="/images/home/category-kurtas-suits.png" 
                alt="Tailor measuring" 
                style={{ position: 'relative', zIndex: 1, width: '100%', height: '440px', objectFit: 'cover', borderRadius: '32px', border: '8px solid #fff' }} 
              />
            </div>
          </div>

          {/* Cards Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '100px' }}>
            <div style={{ backgroundColor: '#FFF7ED', padding: '48px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#FF6B6B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Shield size={28} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>The Problem We Solve</h2>
              </div>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#444', margin: 0 }}>
                Finding the right tailor, explaining your style, and getting the perfect fit can be difficult and time-consuming.
              </p>
            </div>
            
            <div style={{ backgroundColor: '#F0F8F8', padding: '48px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: '#14919b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Target size={28} />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>Our Mission</h2>
              </div>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#444', margin: 0 }}>
                To make custom fashion accessible, personalized, and effortless for everyone through expert tailors and AI innovation.
              </p>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #EAEAEA', marginBottom: '80px' }} />

          {/* For Customers */}
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', marginBottom: '80px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <img 
                src="/images/home/recent-look-1.png" 
                alt="For Customers" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '32px' }} 
              />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.5px' }}>For Customers</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', fontWeight: 600, color: '#333' }}>
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Verified expert tailors
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', fontWeight: 600, color: '#333' }}>
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Easy booking & secure payments
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', fontWeight: 600, color: '#333' }}>
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Custom outfits, made just for you
                </li>
              </ul>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #EAEAEA', marginBottom: '80px' }} />

          {/* For Tailors */}
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', marginBottom: '80px', flexWrap: 'wrap-reverse' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '32px', letterSpacing: '-0.5px' }}>For Tailors</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', fontWeight: 600, color: '#333' }}>
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Grow your business
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', fontWeight: 600, color: '#333' }}>
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Reach more customers
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '18px', fontWeight: 600, color: '#333' }}>
                  <CheckCircle color="#fff" fill="#14919b" size={28} /> Smart tools to manage orders
                </li>
              </ul>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <img 
                src="/images/home/recent-look-2.png" 
                alt="For Tailors" 
                style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '32px' }} 
              />
            </div>
          </div>

          {/* Why Sui Dhaga? */}
          <div style={{ marginBottom: '100px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '48px', letterSpacing: '-0.5px' }}>Why Sui Dhaga?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div style={{ backgroundColor: '#fff', padding: '32px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -5, left: -5, width: '32px', height: '32px', backgroundColor: '#FFD13B', borderRadius: '50%', zIndex: 0 }}></div>
                  <Users size={32} style={{ position: 'relative', zIndex: 1, color: '#111' }} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#111' }}>Trusted Network<br/><span style={{ fontWeight: 500, color: '#444' }}>of expert tailors</span></h3>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '32px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -5, right: -5, width: '32px', height: '32px', backgroundColor: '#14919b', borderRadius: '8px', zIndex: 0 }}></div>
                  <Wand2 size={32} style={{ position: 'relative', zIndex: 1, color: '#111' }} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#111' }}>AI-Powered<br/><span style={{ fontWeight: 500, color: '#444' }}>Design Studio</span></h3>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '32px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#14919b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Lock size={24} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#111' }}>Secure & Easy<br/><span style={{ fontWeight: 500, color: '#444' }}>Experience</span></h3>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '32px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#FF5252', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Globe size={24} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#111' }}>Made for India,<br/><span style={{ fontWeight: 500, color: '#444' }}>Loved Globally</span></h3>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #EAEAEA', marginBottom: '80px' }} />

          {/* Our Team */}
          <div style={{ marginBottom: '100px', textAlign: 'center', position: 'relative' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '48px', letterSpacing: '-0.5px' }}>Our Team</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                { name: 'Ayesha Khan', role: 'Co-Founder & CEO', image: '/images/home/recent-look-1.png' },
                { name: 'Rohit Sharma', role: 'Co-Founder & CTO', image: '/images/home/recent-look-2.png' },
                { name: 'Meena Verma', role: 'Head of Design', image: '/images/home/recent-look-3.png' },
                { name: 'Arjun Malhotra', role: 'Head of Operations', image: '/images/home/recent-look-4.png' }
              ].map((member, i) => (
                <div key={i} style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #EAEAEA', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px', backgroundColor: '#F0EFEA' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px', color: '#111' }}>{member.name}</h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0 0 16px' }}>{member.role}</p>
                  <a href="#" style={{ color: '#0077b5', display: 'flex' }}><LinkedinIcon /></a>
                </div>
              ))}
            </div>
            
            {/* Decorative bottom right blob */}
            <div style={{ position: 'absolute', bottom: '-80px', right: '-120px', width: '200px', height: '200px', backgroundColor: '#FF6B6B', borderRadius: '40px 60px 40px 100px', zIndex: -1 }}></div>
          </div>

        </div>
      </div>
    </PublicShell>
  );
}
