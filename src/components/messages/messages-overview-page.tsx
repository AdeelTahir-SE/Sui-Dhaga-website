"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Headphones,
  LayoutDashboard,
  Calendar,
  Package,
  Ruler,
  FolderHeart,
  Heart,
  Users,
  MessageSquare,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  initialConversations,
  fetchConversationsApi,
  ConversationItem
} from "@/lib/messages-data";

export function MessagesOverviewPage() {
  const [conversations, setConversations] = useState<ConversationItem[]>(initialConversations);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    let isSubscribed = true;
    fetchConversationsApi().then((data) => {
      if (isSubscribed && data && data.length > 0) {
        setConversations(data);
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, []);

  // Filtered conversation list based on search and unread filter
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        conv.tailorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.outfitTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = selectedFilter === "all" || conv.unreadCount > 0;

      return matchesSearch && matchesFilter;
    });
  }, [conversations, searchQuery, selectedFilter]);

  // Recent active order chats for the right widget card
  const recentOrderChats = useMemo(() => {
    return conversations.slice(0, 4);
  }, [conversations]);

  return (
    <PublicShell>
      <div className="messages-page-root">
        {/* Left Hero Yellow Ribbon Accent */}
        <div className="messages-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="messages-container">
          {/* Main 3-Column Outer Dashboard Layout: Navigation Sidebar + Messages Feed + Right Recent Chats Widgets */}
          <div className="messages-layout-grid">
            {/* 1. Left Customer Dashboard Navigation Sidebar */}
            <aside className="messages-sidebar-nav">
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
                <Link href="/community" className="sidebar-item">
                  <Users size={18} />
                  <span>Community</span>
                </Link>

                {/* Active Messages Tab */}
                <Link href="/messages" className="sidebar-item active">
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

            {/* 2. Middle Column: Search & Conversations List */}
            <main className="messages-main-feed-area">
              {/* Header Title Block */}
              <div className="messages-header-block">
                <h1 className="messages-main-title">Messages</h1>
                <p className="messages-subtitle">
                  Stay connected with tailors and designers.
                </p>
              </div>

              {/* Search Bar & Filter Controls Row */}
              <div className="messages-search-row">
                <div className="search-input-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="messages-search-input"
                  />
                </div>

                <button
                  className={`messages-filter-btn ${selectedFilter === "unread" ? "active" : ""}`}
                  onClick={() =>
                    setSelectedFilter(selectedFilter === "all" ? "unread" : "all")
                  }
                  title="Filter Unread Messages"
                  aria-label="Filter Unread Messages"
                >
                  <SlidersHorizontal size={15} />
                </button>
              </div>

              {/* Conversation Cards List */}
              <div className="conversations-list-container">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv) => (
                    <Link
                      key={conv.id}
                      href={`/messages/${conv.id}`}
                      className="conversation-item-card"
                    >
                      {/* Avatar with Online / Active status */}
                      <div className="avatar-wrapper">
                        <img
                          src={conv.avatar}
                          alt={conv.tailorName}
                          className="conv-avatar"
                        />
                        {conv.isTyping && (
                          <span className="online-indicator-dot" title="Active" />
                        )}
                      </div>

                      {/* Info & Message Preview */}
                      <div className="conv-content-block">
                        <div className="conv-top-row">
                          <h4 className="tailor-name">{conv.tailorName}</h4>
                          <span className="conv-timestamp">{conv.timestamp}</span>
                        </div>

                        <div className="conv-bottom-row">
                          <p className={`message-preview ${conv.isTyping ? "typing-text" : ""}`}>
                            {conv.lastMessage}
                          </p>

                          {/* Unread Counter Badge */}
                          {conv.unreadCount > 0 && (
                            <span className="unread-badge-pill">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="no-conversations-found">
                    <p>No messages match your search.</p>
                  </div>
                )}
              </div>
            </main>

            {/* 3. Right Sidebar Column: Recent Chats & Need Help Card */}
            <aside className="messages-right-widgets">
              {/* Recent Chats Card Widget */}
              <div className="widget-card recent-chats-widget-card">
                <div className="widget-card-header">
                  <h3>Recent Chats</h3>
                  <button className="recent-chats-icon-btn" title="Recent Orders">
                    <ArrowRight size={15} />
                  </button>
                </div>

                <div className="recent-chats-list">
                  {recentOrderChats.map((conv) => {
                    const statusClass =
                      conv.orderStatus === "In Progress"
                        ? "in-progress"
                        : conv.orderStatus === "Delivered"
                        ? "delivered"
                        : conv.orderStatus === "Confirmed"
                        ? "confirmed"
                        : "pending";

                    return (
                      <Link
                        key={conv.id}
                        href={`/messages/${conv.id}`}
                        className="recent-chat-project-card"
                      >
                        <img
                          src={conv.outfitImage}
                          alt={conv.outfitTitle}
                          className="project-outfit-thumb"
                        />
                        <div className="project-info">
                          <h5 className="project-tailor-name">{conv.tailorName}</h5>
                          <span className="project-outfit-title">{conv.outfitTitle}</span>
                        </div>

                        <div className="project-status-arrow">
                          <span className={`status-badge ${statusClass}`}>
                            {conv.orderStatus}
                          </span>
                          <ChevronRight size={15} className="arrow-icon" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Need Help Support Card Widget */}
              <div className="widget-card support-help-widget-card">
                <div className="support-card-content">
                  <div className="support-icon-circle">
                    <Headphones size={26} className="headphones-icon" />
                  </div>
                  <div className="support-text-block">
                    <h4>Need help?</h4>
                    <p>Our support team is here for you 24/7.</p>
                  </div>
                </div>

                <Link href="/contact" className="contact-support-btn">
                  Contact Support
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom Corner Brand Transparent PNG Motif */}
        <div className="messages-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
