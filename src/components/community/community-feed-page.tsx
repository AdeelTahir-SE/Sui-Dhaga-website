"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
  Plus,
  X,
  Send,
  Image as ImageIcon,
  CheckCircle,
  LayoutDashboard,
  Calendar,
  Package,
  Ruler,
  FolderHeart,
  Users,
  MessageSquare,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
  Flame
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  initialPosts,
  initialTrendingDesigns,
  initialFollowingUsers,
  fetchCommunityPostsApi,
  togglePostLikeApi,
  togglePostSaveApi,
  createCommunityPostApi,
  CommunityPost,
  TrendingDesign,
  FollowingUser
} from "@/lib/community-data";

export function CommunityFeedPage() {
  const [activeTab, setActiveTab] = useState<"for-you" | "following" | "trending" | "latest">("for-you");
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [trendingDesigns] = useState<TrendingDesign[]>(initialTrendingDesigns);
  const [followingUsers, setFollowingUsers] = useState<FollowingUser[]>(initialFollowingUsers);
  
  // Comment drawer state
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");

  // Create post modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newPostCaption, setNewPostCaption] = useState<string>("");
  const [newPostImageUrl, setNewPostImageUrl] = useState<string>("");
  const [newPostTags, setNewPostTags] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  // Fetch API feed data on tab change
  useEffect(() => {
    let isSubscribed = true;
    fetchCommunityPostsApi(activeTab).then((data) => {
      if (isSubscribed && data && data.length > 0) {
        setPosts(data);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [activeTab]);

  // Handle Like action
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextLiked = !post.isLiked;
          const nextCount = nextLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1);
          togglePostLikeApi(postId, nextLiked);
          return { ...post, isLiked: nextLiked, likesCount: nextCount };
        }
        return post;
      })
    );
  };

  // Handle Save / Bookmark action
  const handleToggleSave = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextSaved = !post.isSaved;
          const nextCount = nextSaved ? post.savesCount + 1 : Math.max(0, post.savesCount - 1);
          togglePostSaveApi(postId, nextSaved);
          return { ...post, isSaved: nextSaved, savesCount: nextCount };
        }
        return post;
      })
    );
  };

  // Handle Follow / Unfollow user
  const handleToggleFollow = (userId: string) => {
    setFollowingUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user))
    );
  };

  // Handle Submit Comment
  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;

    const newCommentObj = {
      id: `c-${Date.now()}`,
      author: "You",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: commentInput.trim(),
      timestamp: "Just now"
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const updatedComments = [...(post.comments || []), newCommentObj];
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: updatedComments
          };
        }
        return post;
      })
    );

    setCommentInput("");
  };

  // Handle Create New Post
  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostCaption.trim()) return;

    setIsPublishing(true);
    const tagsArray = newPostTags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const postPayload = {
      content: newPostCaption,
      images: newPostImageUrl.trim()
        ? [newPostImageUrl.trim(), "/images/home/feature-tailors.png"]
        : ["/images/home/feature-tailors.png", "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"],
      tags: tagsArray.length > 0 ? tagsArray : ["CustomStitching", "Design"]
    };

    const res = await createCommunityPostApi(postPayload);
    if (res.success && res.post) {
      setPosts((prev) => [res.post!, ...prev]);
    }

    setIsPublishing(false);
    setIsCreateModalOpen(false);
    setNewPostCaption("");
    setNewPostImageUrl("");
    setNewPostTags("");
  };

  return (
    <PublicShell>
      <div className="community-page-root">
        {/* Left Hero Ribbon Accent */}
        <div className="community-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="community-container">
          {/* Dashboard Outer Layout Grid: Sidebar + Feed Content */}
          <div className="community-layout-grid">
            {/* 1. Left Customer Dashboard Navigation Sidebar */}
            <aside className="community-sidebar-nav">
              <nav className="sidebar-menu-list">
                <Link href="/customer/dashboard" className="sidebar-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/customer/appointments" className="sidebar-item">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>
                <Link href="/customer/orders" className="sidebar-item">
                  <Package size={18} />
                  <span>Orders</span>
                </Link>
                <Link href="/customer/measurements" className="sidebar-item">
                  <Ruler size={18} />
                  <span>Measurements</span>
                </Link>
                <Link href="/customer/saved-designs" className="sidebar-item">
                  <FolderHeart size={18} />
                  <span>Saved Designs</span>
                </Link>
                <Link href="/wishlist" className="sidebar-item">
                  <Heart size={18} />
                  <span>Wishlist</span>
                </Link>
                
                {/* Active Community Tab */}
                <Link href="/community" className="sidebar-item active">
                  <Users size={18} />
                  <span>Community</span>
                </Link>

                <Link href="/messages" className="sidebar-item">
                  <MessageSquare size={18} />
                  <span>Messages</span>
                </Link>
                <Link href="/addresses" className="sidebar-item">
                  <MapPin size={18} />
                  <span>Addresses</span>
                </Link>
                <Link href="/payments" className="sidebar-item">
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                </Link>
                <Link href="/notifications" className="sidebar-item">
                  <Bell size={18} />
                  <span>Notifications</span>
                </Link>
                <Link href="/settings" className="sidebar-item">
                  <Settings size={18} />
                  <span>Account Settings</span>
                </Link>
                <button className="sidebar-item logout-btn">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </aside>

            {/* 2. Middle Main Feed Area */}
            <main className="community-main-feed-area">
              {/* Header Title Row */}
              <div className="feed-header-row">
                <div className="feed-title-block">
                  <h1 className="feed-main-title">Welcome to the Community</h1>
                  <p className="feed-subtitle">
                    Share designs, get inspired, and connect with fashion lovers.
                  </p>
                </div>

                {/* + Create Post Primary Button */}
                <Link href="/community/create" className="create-post-header-btn">
                  <Plus size={18} />
                  <span>Create Post</span>
                </Link>
              </div>

              {/* Feed Tabs Navigation */}
              <div className="feed-tabs-bar">
                <button
                  className={`tab-btn ${activeTab === "for-you" ? "active" : ""}`}
                  onClick={() => setActiveTab("for-you")}
                >
                  For You
                </button>
                <button
                  className={`tab-btn ${activeTab === "following" ? "active" : ""}`}
                  onClick={() => setActiveTab("following")}
                >
                  Following
                </button>
                <button
                  className={`tab-btn ${activeTab === "trending" ? "active" : ""}`}
                  onClick={() => setActiveTab("trending")}
                >
                  Trending
                </button>
                <button
                  className={`tab-btn ${activeTab === "latest" ? "active" : ""}`}
                  onClick={() => setActiveTab("latest")}
                >
                  Latest
                </button>
              </div>

              {/* Posts List */}
              <div className="feed-posts-list">
                {posts.map((post) => {
                  const extraImagesCount = post.images.length > 3 ? post.images.length - 3 : 0;
                  const isCommentsOpen = expandedCommentsPostId === post.id;

                  return (
                    <article key={post.id} className="community-post-card">
                      {/* Post Author Header */}
                      <div className="post-header-row">
                        <div className="author-info">
                          <img src={post.avatar} alt={post.author} className="author-avatar" />
                          <div className="author-name-block">
                            <div className="name-and-badge">
                              <h4 className="author-name">{post.author}</h4>
                              {post.isVerified && (
                                <CheckCircle size={14} className="verified-icon" />
                              )}
                            </div>
                            <span className="post-timestamp">{post.timestamp}</span>
                          </div>
                        </div>

                        <button className="post-options-btn" title="More Options">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>

                      {/* Post Content Caption */}
                      <Link href={`/community/post/${post.id}`} className="post-caption-link">
                        <p className="post-caption-text">{post.content}</p>
                      </Link>

                      {/* Multi-Image Collage Grid Layout */}
                      {post.images && post.images.length > 0 && (
                        <Link href={`/community/post/${post.id}`} className="post-images-collage-link">
                          <div className="post-images-collage">
                            {/* Main Left Featured Image */}
                            <div className="collage-featured-img-wrap">
                              <img src={post.images[0]} alt="Post visual 1" className="collage-img" />
                            </div>

                            {/* Right Side 2x2 Sub-Grid */}
                            {post.images.length > 1 && (
                              <div className="collage-sub-grid">
                                <div className="collage-sub-img-wrap">
                                  <img src={post.images[1]} alt="Post visual 2" className="collage-img" />
                                </div>
                                {post.images.length > 2 && (
                                  <div className="collage-sub-img-wrap">
                                    <img src={post.images[2]} alt="Post visual 3" className="collage-img" />
                                  </div>
                                )}
                                {post.images.length > 3 && (
                                  <div className="collage-sub-img-wrap badge-overlay-wrap">
                                    <img src={post.images[3]} alt="Post visual 4" className="collage-img" />
                                    <div className="extra-images-badge">+{extraImagesCount}</div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </Link>
                      )}

                      {/* Hashtag Pills */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="post-tags-row">
                          {post.tags.map((tag) => (
                            <span key={tag} className="post-tag-pill">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Bar Footer */}
                      <div className="post-action-bar">
                        <button
                          className={`action-btn like-btn ${post.isLiked ? "liked" : ""}`}
                          onClick={() => handleToggleLike(post.id)}
                        >
                          <Heart
                            size={18}
                            fill={post.isLiked ? "#E11D48" : "none"}
                            color={post.isLiked ? "#E11D48" : "#64748B"}
                          />
                          <span className="action-count">{post.likesCount}</span>
                        </button>

                        <button
                          className="action-btn comment-btn"
                          onClick={() =>
                            setExpandedCommentsPostId(isCommentsOpen ? null : post.id)
                          }
                        >
                          <MessageCircle size={18} />
                          <span className="action-count">{post.commentsCount}</span>
                        </button>

                        <button
                          className={`action-btn save-btn ${post.isSaved ? "saved" : ""}`}
                          onClick={() => handleToggleSave(post.id)}
                        >
                          <Bookmark
                            size={18}
                            fill={post.isSaved ? "#078B87" : "none"}
                            color={post.isSaved ? "#078B87" : "#64748B"}
                          />
                          <span className="action-text">{post.isSaved ? "Saved" : "Save"}</span>
                        </button>
                      </div>

                      {/* Expandable Comments Drawer Section */}
                      {isCommentsOpen && (
                        <div className="post-comments-drawer">
                          <div className="comments-list">
                            {(post.comments || []).length > 0 ? (
                              post.comments!.map((comment) => (
                                <div key={comment.id} className="comment-item">
                                  <img
                                    src={comment.avatar}
                                    alt={comment.author}
                                    className="comment-avatar"
                                  />
                                  <div className="comment-bubble">
                                    <div className="comment-head">
                                      <span className="comment-author">{comment.author}</span>
                                      <span className="comment-time">{comment.timestamp}</span>
                                    </div>
                                    <p className="comment-text">{comment.text}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="no-comments-yet">No comments yet. Be the first to comment!</p>
                            )}
                          </div>

                          {/* Add Comment Input */}
                          <div className="add-comment-row">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddComment(post.id);
                              }}
                            />
                            <button
                              className="send-comment-btn"
                              onClick={() => handleAddComment(post.id)}
                            >
                              <Send size={15} />
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </main>

            {/* 3. Right Sidebar Column: Trending Designs & Following Cards */}
            <aside className="community-right-widgets">
              {/* Trending Designs Widget Card */}
              <div className="widget-card trending-designs-card">
                <div className="widget-card-header">
                  <h3>Trending Designs</h3>
                  <Link href="/customer/saved-designs" className="widget-view-all">
                    View all
                  </Link>
                </div>

                <div className="trending-designs-list">
                  {trendingDesigns.map((design) => (
                    <Link key={design.id} href="/community/post/post-1" className="trending-design-item">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="trending-thumb"
                      />
                      <div className="trending-info">
                        <h5 className="trending-title">{design.title}</h5>
                        <div className="trending-likes">
                          <Heart size={12} fill="#E11D48" color="#E11D48" />
                          <span>{design.likes}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Following Users Widget Card */}
              <div className="widget-card following-users-card">
                <div className="widget-card-header">
                  <h3>Following</h3>
                  <Link href="/tailors" className="widget-view-all">
                    View all
                  </Link>
                </div>

                <div className="following-users-list">
                  {followingUsers.map((user) => (
                    <div key={user.id} className="following-user-item">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <h5 className="user-name">{user.name}</h5>
                        <span className="user-handle">{user.handle}</span>
                      </div>
                      <button
                        className={`follow-toggle-btn ${user.isFollowing ? "following" : ""}`}
                        onClick={() => handleToggleFollow(user.id)}
                      >
                        {user.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Modal Dialog: + Create Post */}
        {isCreateModalOpen && (
          <div className="create-post-modal-backdrop" onClick={() => setIsCreateModalOpen(false)}>
            <div className="create-post-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Create Community Post</h3>
                <button
                  className="modal-close-btn"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handlePublishPost} className="create-post-form">
                <div className="form-group">
                  <label className="form-label">Caption / Description</label>
                  <textarea
                    rows={4}
                    placeholder="Share your outfit design, fitting story, or ask for feedback..."
                    value={newPostCaption}
                    onChange={(e) => setNewPostCaption(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL (Optional)</label>
                  <div className="input-with-icon">
                    <ImageIcon size={16} className="input-icon" />
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newPostImageUrl}
                      onChange={(e) => setNewPostImageUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hashtags (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Anarkali, WeddingWear, CustomStitching"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                  />
                </div>

                <div className="modal-form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="publish-btn" disabled={isPublishing}>
                    {isPublishing ? "Publishing..." : "Publish Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transparent Corner Motifs */}
        <div className="community-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
