"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicNav, PublicFooter } from "@/components/common/site-shell";
import {
  Clock,
  ChevronRight,
  Share2,
  Bookmark,
  Check,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Mail,
  UserCheck
} from "lucide-react";
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts, BlogPost } from "@/lib/blog-data";

interface BlogDetailPageProps {
  slug: string;
}

export function BlogDetailPage({ slug }: BlogDetailPageProps) {
  // Fetch post by slug, with fallback to first post if slug not matched
  const post: BlogPost = getBlogPostBySlug(slug) || getAllBlogPosts()[0];
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const allPosts = getAllBlogPosts();

  // Find index for next / previous posts navigation
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Interactive states
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleBookmarkToggle = () => {
    const newState = !bookmarked;
    setBookmarked(newState);
    showToast(newState ? "Article saved to reading list!" : "Article removed from reading list");
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="blog-page-root blog-detail-root">
      <PublicNav />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="blog-toast-notification">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="blog-container blog-detail-container">
        {/* Breadcrumb */}
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} className="breadcrumb-arrow" />
          <Link href="/blog">Blog</Link>
          <ChevronRight size={13} className="breadcrumb-arrow" />
          <span className="current">{post.title}</span>
        </nav>

        {/* Article Header Section */}
        <header className="blog-detail-header">
          <div className="detail-category-badge">{post.badge}</div>
          <h1 className="detail-title">{post.title}</h1>
          <p className="detail-excerpt">{post.excerpt}</p>

          {/* Author / Date / Share Bar */}
          <div className="detail-meta-strip">
            <div className="author-meta-block">
              <img src={post.author.avatar} alt={post.author.name} className="author-detail-avatar" />
              <div className="author-text-info">
                <span className="author-detail-name">{post.author.name}</span>
                <span className="author-detail-role">{post.author.role}</span>
              </div>
            </div>

            <div className="meta-divider" />

            <div className="meta-time-block">
              <span className="meta-detail-date">{post.date}</span>
              <div className="meta-readtime">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Header Share & Save Quick Action Buttons */}
            <div className="meta-actions-block">
              <button
                className={`icon-action-btn ${copied ? "active" : ""}`}
                onClick={handleCopyLink}
                title="Copy article link"
                aria-label="Copy link"
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
              </button>
              <button
                className={`icon-action-btn ${bookmarked ? "bookmarked" : ""}`}
                onClick={handleBookmarkToggle}
                title={bookmarked ? "Remove bookmark" : "Bookmark article"}
                aria-label="Bookmark article"
              >
                <Bookmark size={16} fill={bookmarked ? "#078b87" : "none"} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Main Image */}
        <figure className="detail-main-image-box">
          <img src={post.image} alt={post.title} className="detail-main-img" />
          {post.imageCaption && (
            <figcaption className="detail-image-caption">
              <span>📷 {post.imageCaption}</span>
            </figcaption>
          )}
        </figure>

        {/* Main Content Layout with Sticky Sidebar Share */}
        <div className="detail-content-layout">
          {/* Desktop Sticky Share Bar */}
          <aside className="sticky-share-sidebar" aria-label="Share Options">
            <span className="share-sidebar-label">Share</span>

            <button
              onClick={handleCopyLink}
              className={`share-btn copy-btn ${copied ? "copied" : ""}`}
              title="Copy link"
              aria-label="Copy link"
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn twitter-btn"
              title="Share on X / Twitter"
              aria-label="Share on X"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn facebook-btn"
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn whatsapp-btn"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn linkedin-btn"
              title="Share on LinkedIn"
              aria-label="Share on LinkedIn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            <button
              onClick={handleBookmarkToggle}
              className={`share-btn bookmark-btn ${bookmarked ? "active" : ""}`}
              title={bookmarked ? "Remove bookmark" : "Save bookmark"}
              aria-label="Save bookmark"
            >
              <Bookmark size={18} fill={bookmarked ? "#078b87" : "none"} />
            </button>
          </aside>

          {/* Article Body Content */}
          <article className="blog-article-body">
            {post.sections.map((section, idx) => {
              if (section.type === "paragraph") {
                return (
                  <p key={idx} className="article-paragraph">
                    {section.content as string}
                  </p>
                );
              }
              if (section.type === "heading") {
                return (
                  <h2 key={idx} className="article-heading">
                    {section.title}
                  </h2>
                );
              }
              if (section.type === "callout") {
                return (
                  <div key={idx} className="article-callout-box">
                    <div className="callout-header">
                      <Sparkles size={18} className="callout-icon" />
                      <h4>{section.title}</h4>
                    </div>
                    <p>{section.content as string}</p>
                  </div>
                );
              }
              if (section.type === "blockquote") {
                return (
                  <blockquote key={idx} className="article-blockquote">
                    <p>“{section.content as string}”</p>
                    {section.authorQuote && (
                      <cite className="blockquote-author">— {section.authorQuote}</cite>
                    )}
                  </blockquote>
                );
              }
              if (section.type === "list") {
                return (
                  <div key={idx} className="article-list-block">
                    {section.title && <h3 className="list-title">{section.title}</h3>}
                    <ul className="article-ul">
                      {(section.content as string[]).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
              if (section.type === "key-takeaways") {
                return (
                  <div key={idx} className="article-takeaways-card">
                    <h3>💡 {section.title}</h3>
                    <ul>
                      {(section.content as string[]).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}

            {/* Tags strip */}
            {post.tags && post.tags.length > 0 && (
              <div className="article-tags-wrap">
                <span className="tags-label">Tags:</span>
                <div className="tags-list">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio Card */}
            <div className="article-author-card">
              <img src={post.author.avatar} alt={post.author.name} className="author-card-avatar" />
              <div className="author-card-details">
                <div className="author-card-header">
                  <h3>Written by {post.author.name}</h3>
                  <span className="author-verified-badge">
                    <UserCheck size={13} /> Verified Tailor Partner
                  </span>
                </div>
                <p className="author-card-role">{post.author.role}</p>
                <p className="author-card-bio">{post.author.bio}</p>
              </div>
            </div>

            {/* Previous & Next Article Navigation */}
            <nav className="article-nav-links" aria-label="Article navigation">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="nav-post-card prev">
                  <span className="nav-label"><ArrowLeft size={14} /> Previous Article</span>
                  <strong className="nav-title">{prevPost.title}</strong>
                </Link>
              ) : (
                <div className="nav-post-card placeholder" />
              )}

              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="nav-post-card next">
                  <span className="nav-label">Next Article <ArrowRight size={14} /></span>
                  <strong className="nav-title">{nextPost.title}</strong>
                </Link>
              ) : (
                <div className="nav-post-card placeholder" />
              )}
            </nav>
          </article>
        </div>

        {/* Related Articles Section */}
        <section className="blog-section related-articles-section">
          <div className="section-header">
            <h2>Related Articles</h2>
            <Link href="/blog" className="view-all-link">
              View all
            </Link>
          </div>

          <div className="featured-cards-grid">
            {relatedPosts.map((relPost) => (
              <article key={relPost.id} className="featured-card">
                <div className="card-image-box">
                  <img src={relPost.image} alt={relPost.title} />
                </div>
                <div className="card-body">
                  <span className="card-badge">{relPost.badge}</span>
                  <h3 className="card-title">
                    <Link href={`/blog/${relPost.slug}`}>{relPost.title}</Link>
                  </h3>
                  <p className="card-desc">{relPost.excerpt}</p>

                  <div className="card-footer">
                    <div className="author-info">
                      <img src={relPost.author.avatar} alt={relPost.author.name} className="author-avatar" />
                      <span className="author-name">{relPost.author.name}</span>
                    </div>
                    <span className="meta-date">{relPost.date}</span>
                    <div className="meta-readtime">
                      <Clock size={13} />
                      <span>{relPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stay Inspired Newsletter Banner */}
        <section className="blog-section">
          <div className="stay-inspired-card detail-newsletter-banner">
            <div className="mail-icon-box">
              <Mail size={24} strokeWidth={1.8} />
            </div>
            <h3>Loved this article? Stay inspired!</h3>
            <p>Get the latest fashion guides, tailoring tips, & design ideas straight to your inbox.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              showToast("Thank you for subscribing to Sui Dhaga stories!");
            }} className="subscribe-form inline-subscribe-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="subscribe-input"
                required
              />
              <button type="submit" className="subscribe-btn">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
