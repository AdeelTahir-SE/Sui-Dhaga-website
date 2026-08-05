"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Paperclip,
  Smile,
  Send,
  Settings,
  Share2,
  CheckCheck,
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
  LogOut
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import {
  getConversationById,
  fetchConversationsApi,
  sendChatMessageApi,
  ConversationItem,
  ChatMessage
} from "@/lib/messages-data";

interface MessagesChatRoomPageProps {
  conversationId?: string;
}

export function MessagesChatRoomPage({ conversationId: propConvId }: MessagesChatRoomPageProps) {
  const params = useParams();
  const activeConvId = propConvId || (params?.conversationId as string) || "rekha-tailors";

  const [conversation, setConversation] = useState<ConversationItem | undefined>(() =>
    getConversationById(activeConvId)
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isSubscribed = true;

    fetchConversationsApi().then((list) => {
      if (isSubscribed) {
        const found = list.find((c) => c.id === activeConvId) || getConversationById(activeConvId);
        if (found) {
          setConversation(found);
          setMessages(found.messages || []);
        }
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [activeConvId]);

  // Auto-scroll chat feed to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <PublicShell>
        <div className="chat-room-not-found">
          <h2>Conversation Not Found</h2>
          <p>The requested chat conversation could not be found.</p>
          <Link href="/messages" className="btn-primary">
            Back to Messages
          </Link>
        </div>
      </PublicShell>
    );
  }

  // Handle Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const userText = messageInput.trim();
    setMessageInput("");

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      readStatus: true
    };

    setMessages((prev) => [...prev, newMsg]);

    // Sync with backend API helper
    await sendChatMessageApi(activeConvId, userText);
  };

  return (
    <PublicShell>
      <div className="chat-room-page-root">
        {/* Left Hero Yellow Ribbon Accent */}
        <div className="chat-hero-ribbon" aria-hidden="true">
          <img src="/images/tailors/hero-ribbon.png" alt="" className="ribbon-img" />
        </div>

        <div className="chat-room-container">
          {/* Dashboard Outer Layout Grid: Sidebar + Chat Room Main Card */}
          <div className="chat-room-layout-grid">
            {/* 1. Left Customer Navigation Sidebar */}
            <aside className="chat-sidebar-nav">
              <nav className="sidebar-menu-list">
                <Link href="/dashboard" className="sidebar-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/appointments" className="sidebar-item">
                  <Calendar size={18} />
                  <span>Appointments</span>
                </Link>
                <Link href="/orders" className="sidebar-item">
                  <Package size={18} />
                  <span>Orders</span>
                </Link>
                <Link href="/measurements" className="sidebar-item">
                  <Ruler size={18} />
                  <span>Measurements</span>
                </Link>
                <Link href="/saved-designs" className="sidebar-item">
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

            {/* 2. Main Chat Room Window */}
            <main className="chat-room-main-card">
              {/* Breadcrumb Navigation inside Main Card Header */}
              <nav className="tailors-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="breadcrumb-arrow">&gt;</span>
                <Link href="/messages">Messages</Link>
                <span className="breadcrumb-arrow">&gt;</span>
                <span className="current">{conversation.tailorName}</span>
              </nav>

              {/* Chat Header Row */}
              <div className="chat-header-row">
                <div className="header-tailor-info">
                  <img
                    src={conversation.avatar}
                    alt={conversation.tailorName}
                    className="header-avatar"
                  />
                  <div className="header-text-block">
                    <h3 className="header-tailor-name">{conversation.tailorName}</h3>
                    <div className="header-meta-row">
                      <span className="header-rating">
                        <Star size={13} fill="#F59E0B" color="#F59E0B" />
                        <strong>{conversation.rating || 4.9}</strong> ({conversation.reviewsCount || 128} reviews)
                      </span>
                      <span className="meta-bullet">•</span>
                      <span className="header-online-status">
                        <span className="online-green-dot" />
                        Online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Action CTAs */}
                <div className="header-actions-group">
                  <Link
                    href={`/tailors/${conversation.id}`}
                    className="chat-action-btn profile-btn"
                  >
                    View Profile
                  </Link>
                  <Link href="/orders" className="chat-action-btn order-details-btn">
                    Order Details
                  </Link>
                  <button className="chat-action-icon-btn" title="Chat Settings">
                    <Settings size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Feed Box */}
              <div className="chat-messages-feed-box">
                {/* Date Divider */}
                <div className="chat-date-divider">
                  <span>Today, 20 May</span>
                </div>

                {/* Messages List */}
                <div className="messages-list-flow">
                  {messages.map((msg) => {
                    const isUser = msg.sender === "user";

                    return (
                      <div
                        key={msg.id}
                        className={`chat-message-row ${isUser ? "outgoing-user" : "incoming-tailor"}`}
                      >
                        {/* Tailor Avatar on Incoming Messages */}
                        {!isUser && (
                          <img
                            src={conversation.avatar}
                            alt={conversation.tailorName}
                            className="msg-author-avatar"
                          />
                        )}

                        {/* Speech Bubble Card */}
                        <div className={`message-bubble-card ${isUser ? "user-bubble" : "tailor-bubble"}`}>
                          <p className="message-text">{msg.text}</p>

                          {/* Image Attachments Strip */}
                          {msg.images && msg.images.length > 0 && (
                            <div className="message-attachments-strip">
                              {msg.images.map((imgUrl, idx) => (
                                <div key={idx} className="msg-attachment-thumb">
                                  <img src={imgUrl} alt={`Attachment ${idx + 1}`} />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Timestamp & Read Receipt */}
                          <div className="message-meta-footer">
                            <span className="msg-time">{msg.timestamp}</span>
                            {isUser && <CheckCheck size={14} className="read-receipt-icon" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Order Reference Banner Card (Above Input Bar) */}
              <div className="chat-order-reference-card">
                <div className="order-ref-left">
                  <img
                    src={conversation.outfitImage}
                    alt={conversation.outfitTitle}
                    className="order-ref-thumb"
                  />
                  <div className="order-ref-text">
                    <span className="order-ref-number">Order {conversation.orderNumber || "#SD1256"}</span>
                    <h5 className="order-ref-title">{conversation.outfitTitle}</h5>
                  </div>
                </div>

                <div className="order-ref-right">
                  <span className="order-ref-status-badge">
                    {conversation.orderStatus}
                  </span>
                  <button className="order-ref-share-btn" title="Share Order Context">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>

              {/* Bottom Chat Input Form Bar */}
              <form onSubmit={handleSendMessage} className="chat-input-form-bar">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="chat-text-input"
                />

                <div className="chat-input-actions">
                  <button type="button" className="input-icon-btn" title="Attach file">
                    <Paperclip size={18} />
                  </button>
                  <button type="button" className="input-icon-btn" title="Insert Emoji">
                    <Smile size={18} />
                  </button>
                  <button type="submit" className="chat-send-submit-btn" title="Send Message" aria-label="Send Message">
                    <Send size={16} color="#ffffff" />
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>

        {/* Bottom Corner Brand Transparent PNG Motif */}
        <div className="chat-corner-png-right" aria-hidden="true">
          <img src="/images/auth/edge-coral.png" alt="" className="corner-png-img" />
        </div>
      </div>
    </PublicShell>
  );
}
