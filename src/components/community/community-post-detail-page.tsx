"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Send,
  CheckCircle,
  Sparkles,
  ArrowRight,
  UserPlus,
  UserCheck
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  getCommunityPostById,
  fetchCommunityPostByIdApi,
  togglePostLikeApi,
  togglePostSaveApi,
  CommunityPost,
  PostComment
} from "@/lib/community-data";

interface CommunityPostDetailPageProps {
  postId?: string;
}

export function CommunityPostDetailPage({ postId: propPostId }: CommunityPostDetailPageProps) {
  const params = useParams();
  const router = useRouter();
  const activePostId = propPostId || (params?.postId as string) || "post-1";

  const [post, setPost] = useState<CommunityPost | undefined>(() => getCommunityPostById(activePostId));
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [comments, setComments] = useState<PostComment[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    fetchCommunityPostByIdApi(activePostId).then((data) => {
      if (isSubscribed && data) {
        setPost(data);
        setComments(data.comments || []);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [activePostId]);

  if (!post) {
    return (
      <PublicShell>
        <div className="community-post-not-found">
          <h2>Post Not Found</h2>
          <p>The requested community post could not be found.</p>
          <Link href="/community" className="btn-primary">
            Back to Community Feed
          </Link>
        </div>
      </PublicShell>
    );
  }

  const images = post.images && post.images.length > 0 ? post.images : ["/images/home/feature-tailors.png"];

  // Handle Like Action
  const handleToggleLike = () => {
    if (!post) return;
    const nextLiked = !post.isLiked;
    const nextCount = nextLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);
    setPost({ ...post, isLiked: nextLiked, likesCount: nextCount });
    togglePostLikeApi(post.id, nextLiked);
  };

  // Handle Save Action
  const handleToggleSave = () => {
    if (!post) return;
    const nextSaved = !post.isSaved;
    const nextCount = nextSaved ? post.savesCount + 1 : Math.max(0, post.savesCount - 1);
    setPost({ ...post, isSaved: nextSaved, savesCount: nextCount });
    togglePostSaveApi(post.id, nextSaved);
  };

  // Handle Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !post) return;

    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      author: "You",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: commentInput.trim(),
      timestamp: "Just now"
    };

    setComments((prev) => [...prev, newComment]);
    setPost((prev) => (prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : prev));
    setCommentInput("");
  };

  // Handle Use as Reference CTA
  const handleUseAsReference = () => {
    // Navigate to AI Design Studio passing reference post details
    const referenceQuery = encodeURIComponent(post.content);
    router.push(`/design-studio?reference=${encodeURIComponent(post.id)}&prompt=${referenceQuery}`);
  };

  return (
    <PublicShell>
      <div className="post-detail-page-root">
        {/* Left Ribbon Accent */}
        <div className="post-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="post-detail-container">
          {/* Breadcrumb Navigation */}
          <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link href="/community">Community</Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <span className="current">Post</span>
          </nav>

          {/* Main 2-Column Card Layout */}
          <div className="post-detail-card-grid">
            {/* Left Column: Post Gallery */}
            <div className="post-gallery-column">
              <div className="gallery-split-view">
                {/* Large Featured Main Image */}
                <div className="main-featured-image-wrap">
                  <img
                    src={images[activeImageIndex] || images[0]}
                    alt={`${post.author}'s design creation`}
                    className="main-featured-img"
                  />
                </div>

                {/* Vertical Side Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="side-thumbnails-strip">
                    {images.slice(0, 4).map((imgUrl, idx) => {
                      const isLast = idx === 3 && images.length > 4;
                      return (
                        <button
                          key={idx}
                          className={`side-thumb-btn ${activeImageIndex === idx ? "active" : ""}`}
                          onClick={() => setActiveImageIndex(idx)}
                        >
                          <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                          {isLast && (
                            <div className="thumb-plus-overlay">
                              +{images.length - 3}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Creator Info, Details, Metrics & Comments */}
            <div className="post-info-column">
              {/* Creator Header Row */}
              <div className="creator-header-row">
                <div className="creator-meta">
                  <img src={post.avatar} alt={post.author} className="creator-avatar" />
                  <div className="creator-names">
                    <h4 className="creator-name">{post.author}</h4>
                    <span className="post-time">{post.timestamp}</span>
                  </div>
                </div>

                <button
                  className={`follow-creator-btn ${isFollowing ? "following" : ""}`}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* Post Description / Caption */}
              <div className="post-body-text">
                <p className="caption-paragraph">{post.content}</p>
                <p className="details-paragraph">
                  Used georgette fabric with thread and sequin embroidery. Perfect for day events!
                </p>
              </div>

              {/* Hashtag Pills */}
              {post.tags && post.tags.length > 0 && (
                <div className="post-detail-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="detail-tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Metrics Bar */}
              <div className="post-metrics-bar">
                <button
                  className={`metric-btn like-btn ${post.isLiked ? "active" : ""}`}
                  onClick={handleToggleLike}
                >
                  <Heart
                    size={20}
                    fill={post.isLiked ? "#E11D48" : "none"}
                    color={post.isLiked ? "#E11D48" : "#475569"}
                  />
                  <span>{post.likesCount}</span>
                </button>

                <div className="metric-btn comment-btn">
                  <MessageCircle size={20} />
                  <span>{post.commentsCount}</span>
                </div>

                <button
                  className={`metric-btn save-btn ${post.isSaved ? "active" : ""}`}
                  onClick={handleToggleSave}
                >
                  <Bookmark
                    size={20}
                    fill={post.isSaved ? "#078B87" : "none"}
                    color={post.isSaved ? "#078B87" : "#475569"}
                  />
                  <span>Save</span>
                </button>

                <button className="metric-btn share-btn" title="Share Post">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Social Proof Bar */}
              <div className="social-proof-bar">
                <div className="proof-avatars">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt=""
                  />
                  <img
                    src="/images/home/tailor-rekha.png"
                    alt=""
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt=""
                  />
                </div>
                <span className="proof-text">
                  Liked by <strong>Stitch Craft</strong> and 127 others
                </span>
              </div>

              {/* Use as Reference Primary CTA Button */}
              <button
                className="use-as-reference-btn"
                onClick={handleUseAsReference}
              >
                <span>Use as Reference</span>
              </button>

              {/* Comments Section */}
              <div className="detail-comments-block">
                <div className="comments-header-row">
                  <h3>Comments ({comments.length})</h3>
                  <button className="view-all-comments-btn">View all</button>
                </div>

                <div className="comments-feed-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment-feed-item">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="comment-user-avatar"
                      />
                      <div className="comment-content-block">
                        <div className="comment-user-row">
                          <h5 className="comment-user-name">
                            {comment.author}
                            <CheckCircle size={13} className="verified-icon" />
                          </h5>
                          <span className="comment-text-content">{comment.text}</span>
                        </div>
                        <div className="comment-meta-actions">
                          <span className="comment-time-stamp">{comment.timestamp}</span>
                          <button className="comment-reply-btn">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add a Comment Input Row */}
                <form onSubmit={handleAddComment} className="detail-add-comment-form">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="detail-comment-input"
                  />
                  <button type="submit" className="detail-send-comment-btn" title="Send Comment" aria-label="Send Comment">
                    <Send size={15} color="#ffffff" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Corner Brand Transparent PNG Motif */}
        <div className="post-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
