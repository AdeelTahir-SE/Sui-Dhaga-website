"use client";

import Link from "next/link";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import { Clock, ChevronRight, Mail } from "lucide-react";

export function BlogPage() {
  const featuredArticles = [
    {
      id: "anarkali-styles",
      badge: "STYLE GUIDE",
      title: "Top 10 Anarkali Styles You Need This Season",
      desc: "From classic cuts to modern twists – find your perfect Anarkali.",
      image: "/images/blog/anarkali.png",
      author: "Meena Tailors",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      date: "20 May 2024",
      readTime: "6 min read",
    },
    {
      id: "perfect-fabric",
      badge: "FABRIC GUIDE",
      title: "How to Choose the Perfect Fabric",
      desc: "A complete guide to fabrics, their feel, fall & occasion.",
      image: "/images/blog/fabrics.png",
      author: "Stitch Craft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      date: "18 May 2024",
      readTime: "5 min read",
    },
    {
      id: "custom-vs-readymade",
      badge: "TAILORING TIPS",
      title: "Custom vs Ready-made: What's Better?",
      desc: "We break down the pros, cons, and what suits you best.",
      image: "/images/blog/sketch.png",
      author: "Aarav Bespoke",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      date: "15 May 2024",
      readTime: "4 min read",
    },
  ];

  const categories = [
    {
      name: "Style Guides",
      count: "24 Articles",
      color: "#0d9488",
      bgColor: "#f0fdf4",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a3 3 0 0 0-3 3v2H6a1 1 0 0 0-1 1v2a6 6 0 0 0 4 5.65V22h6v-6.35A6 6 0 0 0 19 10V8a1 1 0 0 0-1-1h-3V5a3 3 0 0 0-3-3z" />
          <path d="M9 22h6" />
        </svg>
      ),
    },
    {
      name: "Fabric Guides",
      count: "18 Articles",
      color: "#e86054",
      bgColor: "#fff5f5",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#e86054" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 4v16" />
          <path d="M14 4v16" />
        </svg>
      ),
    },
    {
      name: "Tailoring Tips",
      count: "22 Articles",
      color: "#0e8388",
      bgColor: "#f0fdfa",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0e8388" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      name: "AI Fashion Tips",
      count: "12 Articles",
      color: "#059669",
      bgColor: "#ecfdf5",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M9 9h6v6H9z" />
          <text x="7" y="15" fontSize="8" fontWeight="bold" fill="#059669" stroke="none">AI</text>
        </svg>
      ),
    },
    {
      name: "Customer Stories",
      count: "16 Articles",
      color: "#d97706",
      bgColor: "#fffbeb",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  const latestPosts = [
    {
      id: "groom-wear-2024",
      title: "Groom Wear Trends 2024: What's in Style",
      desc: "From sherwanis to indo-westerns, explore the top groom wear trends for your big day.",
      image: "/images/blog/groomwear.png",
      author: "Rohit Sharma",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      date: "12 May 2024",
      readTime: "5 min read",
    },
    {
      id: "embroidery-guide",
      title: "Hand Embroidery vs Machine Embroidery",
      desc: "Understand the differences, uses, and which one is right for your outfit.",
      image: "/images/blog/embroidery.png",
      author: "Stitch Craft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      date: "10 May 2024",
      readTime: "4 min read",
    },
    {
      id: "summer-fabric-guide",
      title: "Summer Fabric Guide: Stay Cool & Stylish",
      desc: "Beat the heat with these breathable fabrics perfect for summer outfits.",
      image: "/images/blog/summer.png",
      author: "Meena Tailors",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      date: "8 May 2024",
      readTime: "5 min read",
    },
  ];

  return (
    <div className="blog-page-root">
      <PublicNav />

      <main className="blog-container">
        {/* Breadcrumb */}
        <div className="blog-breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} className="breadcrumb-arrow" />
          <span className="current">Blog</span>
        </div>

        {/* Hero Section */}
        <section className="blog-hero">
          {/* Decorative Doodles */}
          <div className="doodle doodle-zigzag" aria-hidden="true">
            <svg width="44" height="18" viewBox="0 0 44 18" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 14 L10 4 L18 14 L26 4 L34 14 L42 4" />
            </svg>
          </div>
          <div className="doodle doodle-kite" aria-hidden="true">
            <svg width="22" height="26" viewBox="0 0 24 28" fill="none" stroke="#e86054" strokeWidth="1.8">
              <polygon points="12 2, 22 14, 12 26, 2 14" fill="rgba(232,96,84,0.08)" />
              <line x1="12" y1="2" x2="12" y2="26" />
              <line x1="2" y1="14" x2="22" y2="14" />
            </svg>
          </div>
          <div className="doodle doodle-circle" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#333" strokeWidth="2">
              <circle cx="8" cy="8" r="6" />
            </svg>
          </div>
          <div className="doodle doodle-grid" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="#cbd5e1">
              <circle cx="4" cy="4" r="1.8" /><circle cx="14" cy="4" r="1.8" /><circle cx="24" cy="4" r="1.8" /><circle cx="34" cy="4" r="1.8" />
              <circle cx="4" cy="14" r="1.8" /><circle cx="14" cy="14" r="1.8" /><circle cx="24" cy="14" r="1.8" /><circle cx="34" cy="14" r="1.8" />
              <circle cx="4" cy="24" r="1.8" /><circle cx="14" cy="24" r="1.8" /><circle cx="24" cy="24" r="1.8" /><circle cx="34" cy="24" r="1.8" />
            </svg>
          </div>

          <div className="blog-hero-content">
            <h1>
              Stories, styles & <br />
              <span className="accent-text">tailoring tips.</span>
            </h1>
            <p>Explore the world of fashion, fabrics, and custom tailoring crafted for you.</p>
          </div>

          <div className="blog-hero-illustration">
            <img
              src="/images/blog/hero-illustration.png"
              alt="Tailor crafting outfit at vintage sewing machine"
            />
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="blog-section">
          <div className="section-header">
            <h2>Featured Articles</h2>
            <Link href="/blog" className="view-all-link">
              View all
            </Link>
          </div>

          <div className="featured-cards-wrapper">
            <div className="featured-cards-grid">
              {featuredArticles.map((article) => (
                <article key={article.id} className="featured-card">
                  <div className="card-image-box">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className="card-body">
                    <span className="card-badge">{article.badge}</span>
                    <h3 className="card-title">
                      <Link href={`/blog/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="card-desc">{article.desc}</p>

                    <div className="card-footer">
                      <div className="author-info">
                        <img src={article.avatar} alt={article.author} className="author-avatar" />
                        <span className="author-name">{article.author}</span>
                      </div>
                      <span className="meta-date">{article.date}</span>
                      <div className="meta-readtime">
                        <Clock size={13} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Slider Next Arrow Button */}
            <button className="slider-next-btn" aria-label="Next featured articles">
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        {/* Browse By Category Section */}
        <section className="blog-section">
          <div className="section-header">
            <h2>Browse By Category</h2>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div key={cat.name} className="category-card">
                <div className="cat-icon-wrapper">
                  {cat.icon}
                </div>
                <div className="cat-info">
                  <h3>{cat.name}</h3>
                  <p>{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Posts + Stay Inspired Grid */}
        <section className="blog-section main-posts-grid">
          {/* Latest Posts Column */}
          <div className="latest-posts-col">
            <div className="section-header">
              <h2>Latest Posts</h2>
              <Link href="/blog" className="view-all-link">
                View all
              </Link>
            </div>

            <div className="latest-posts-list">
              {latestPosts.map((post) => (
                <article key={post.id} className="latest-post-card">
                  <div className="post-thumb">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="post-details">
                    <h3 className="post-title">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="post-desc">{post.desc}</p>
                    <div className="card-footer">
                      <div className="author-info">
                        <img src={post.avatar} alt={post.author} className="author-avatar" />
                        <span className="author-name">{post.author}</span>
                      </div>
                      <span className="meta-date">{post.date}</span>
                      <div className="meta-readtime">
                        <Clock size={13} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Stay Inspired Newsletter Card */}
          <div className="stay-inspired-col">
            <div className="stay-inspired-card">
              <div className="mail-icon-box">
                <Mail size={22} strokeWidth={1.8} />
              </div>
              <h3>Stay inspired</h3>
              <p>Get the latest fashion tips, style guides & more.</p>

              <form onSubmit={(e) => e.preventDefault()} className="subscribe-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="subscribe-input"
                  required
                />
                <button type="submit" className="subscribe-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
