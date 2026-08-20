"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  CheckCheck,
  Smile,
  Image as ImageIcon
} from "lucide-react";
import { PublicNav } from "@/components/common/site-shell";
import { TailorSidebar } from "@/components/tailors/tailor-sidebar";
import { AdminToast } from "@/components/admin/admin-toast";
import "@/styles/pages/tailor-messages-view.css";

interface ChatMessage {
  id: string;
  sender: "tailor" | "customer";
  text: string;
  time: string;
}

interface TailorConversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  orderNumber?: string;
  outfitTitle?: string;
  isOnline: boolean;
  messages: ChatMessage[];
}

const initialTailorConversations: TailorConversation[] = [
  {
    id: "conv-1",
    customerName: "Neha Verma",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Thanks! Please share the updates.",
    time: "10:30 AM",
    unreadCount: 2,
    orderNumber: "SD1256",
    outfitTitle: "Custom Anarkali Suit",
    isOnline: true,
    messages: [
      { id: "m1", sender: "customer", text: "Hi Master Arjun! How is the stitching coming along for my Anarkali suit?", time: "10:15 AM" },
      { id: "m2", sender: "tailor", text: "Hello Neha! We have finished the hand embroidery on the neckline and attached the flared umbrella panels. Ready for trial soon!", time: "10:22 AM" },
      { id: "m3", sender: "customer", text: "That sounds wonderful! Can you share a quick photo?", time: "10:28 AM" },
      { id: "m4", sender: "customer", text: "Thanks! Please share the updates.", time: "10:30 AM" }
    ]
  },
  {
    id: "conv-2",
    customerName: "Pooja Mehta",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Can you share the fabric options?",
    time: "9:15 AM",
    unreadCount: 1,
    orderNumber: "SD1257",
    outfitTitle: "Lehenga Set",
    isOnline: false,
    messages: [
      { id: "m21", sender: "customer", text: "Hello! I am looking for pure organza in peach or mint for my lehenga blouse.", time: "9:10 AM" },
      { id: "m22", sender: "customer", text: "Can you share the fabric options?", time: "9:15 AM" }
    ]
  },
  {
    id: "conv-3",
    customerName: "Rohan Singh",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Okay, see you tomorrow.",
    time: "Yesterday",
    unreadCount: 0,
    orderNumber: "SD1258",
    outfitTitle: "Sherwani Stitching",
    isOnline: true,
    messages: [
      { id: "m31", sender: "tailor", text: "Hi Rohan, your royal Jamawar sherwani is ready for the trial fitting at 4:00 PM tomorrow.", time: "Yesterday, 04:30 PM" },
      { id: "m32", sender: "customer", text: "Okay, see you tomorrow.", time: "Yesterday, 04:45 PM" }
    ]
  },
  {
    id: "conv-4",
    customerName: "Ayesha Khan",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Love your work!",
    time: "Yesterday",
    unreadCount: 0,
    orderNumber: "SD1259",
    outfitTitle: "Kurta Set",
    isOnline: false,
    messages: [
      { id: "m41", sender: "customer", text: "Received the Kurta set today! The fitting and delicate lace finish is perfection.", time: "Yesterday, 02:00 PM" },
      { id: "m42", sender: "customer", text: "Love your work!", time: "Yesterday, 02:01 PM" },
      { id: "m43", sender: "tailor", text: "Thank you so much Ayesha! It was a pleasure crafting for you.", time: "Yesterday, 02:15 PM" }
    ]
  },
  {
    id: "conv-5",
    customerName: "Meera Iyer",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Do you do alterations?",
    time: "2 May",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: "m51", sender: "customer", text: "Hi! I have a designer bridal blouse that needs waist tapering.", time: "2 May, 11:00 AM" },
      { id: "m52", sender: "customer", text: "Do you do alterations?", time: "2 May, 11:01 AM" }
    ]
  }
];

export function TailorMessagesPage() {
  const [conversations, setConversations] = useState<TailorConversation[]>(initialTailorConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  const filteredConversations = conversations.filter((c) =>
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectConversation = (conv: TailorConversation) => {
    setActiveConvId(conv.id);
    // Clear unread badge
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConvId) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "tailor",
      text: messageInput.trim(),
      time: "Just now"
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: newMsg.text,
              time: "Just now",
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    setMessageInput("");
  };

  return (
    <div className="tms-layout-wrapper">
      {/* Top Navbar */}
      <PublicNav />

      <div className="tms-body-container">
        {/* Left Navigation Sidebar */}
        <TailorSidebar activeKey="messages" />

        {/* Main Content Area */}
        <main className="tms-main-content">
          {/* Header Area */}
          <div className="tms-header">
            <h1 className="tms-title">Messages</h1>
          </div>

          {/* Search Bar & Filter Row matching reference design */}
          <div className="tms-search-row">
            <div className="tms-search-input-wrap">
              <Search size={18} className="tms-search-icon" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tms-search-input"
              />
            </div>

            <button
              type="button"
              onClick={() => setToastMessage("Message filters toggled.")}
              className="tms-filter-btn"
              title="Filter Messages"
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* 2-Column Grid (Conversation List Left + Chat Window Right) */}
          <div className="tms-chat-grid">
            {/* Left Card: Conversations List matching exact design */}
            <div className="tms-conversations-card">
              {filteredConversations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7280" }}>
                  No messages matching your search.
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isActive = activeConvId === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={`tms-conv-item ${isActive ? "active" : ""}`}
                    >
                      <img
                        src={conv.customerAvatar}
                        alt={conv.customerName}
                        className="tms-conv-avatar"
                      />

                      <div className="tms-conv-info">
                        <div className="tms-conv-header">
                          <h3 className="tms-conv-name">{conv.customerName}</h3>
                          <span className="tms-conv-time">{conv.time}</span>
                        </div>

                        <div className="tms-conv-msg-row">
                          <p className="tms-conv-last-msg">{conv.lastMessage}</p>
                          {conv.unreadCount > 0 && (
                            <span className="tms-unread-badge">{conv.unreadCount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Card: Empty State or Active Chat Window */}
            <div className="tms-chat-window-card">
              {!activeConversation ? (
                /* Empty State matching exact graphic from reference image */
                <div className="tms-empty-state">
                  <svg
                    className="tms-empty-illustration"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Soft Bubble */}
                    <path
                      d="M40 50C40 38.9543 48.9543 30 60 30H150C161.046 30 170 38.9543 170 50V110C170 121.046 161.046 130 150 130H80L50 155V130H60C48.9543 130 40 121.046 40 110V50Z"
                      fill="#D1FAE5"
                    />
                    {/* Content Lines on back bubble */}
                    <rect x="65" y="58" width="60" height="6" rx="3" fill="#059669" />
                    <rect x="65" y="74" width="40" height="6" rx="3" fill="#059669" />

                    {/* Foreground Deep Teal Bubble */}
                    <path
                      d="M85 105C85 96.7157 91.7157 90 100 90H165C173.284 90 180 96.7157 180 105V145C180 153.284 173.284 160 165 160H140L120 175V160H100C91.7157 160 85 153.284 85 145V105Z"
                      fill="#078B87"
                    />
                    {/* 3 Message Dots on front bubble */}
                    <circle cx="118" cy="125" r="4" fill="#FFFFFF" />
                    <circle cx="133" cy="125" r="4" fill="#FFFFFF" />
                    <circle cx="148" cy="125" r="4" fill="#FFFFFF" />
                  </svg>

                  <h3 className="tms-empty-title">Select a conversation</h3>
                  <p className="tms-empty-sub">Choose a chat to start messaging</p>
                </div>
              ) : (
                /* Active Chat Window */
                <>
                  {/* Chat Header */}
                  <div className="tms-active-chat-header">
                    <div className="tms-chat-user-meta">
                      <img
                        src={activeConversation.customerAvatar}
                        alt={activeConversation.customerName}
                        style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
                      />
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                          {activeConversation.customerName}
                        </h3>
                        <p style={{ fontSize: "0.78rem", color: "#078B87", margin: "2px 0 0", fontWeight: 650 }}>
                          {activeConversation.isOnline ? "● Online" : "● Active recently"} {activeConversation.orderNumber && `· Order #${activeConversation.orderNumber}`}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setToastMessage(`Calling ${activeConversation.customerName}...`)}
                        style={{ background: "#FFFFFF", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "6px 10px", color: "#374151", cursor: "pointer" }}
                      >
                        <Phone size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setToastMessage("Viewing client specs.")}
                        style={{ background: "#FFFFFF", border: "1px solid #D1D5DB", borderRadius: "8px", padding: "6px 10px", color: "#374151", cursor: "pointer" }}
                      >
                        <Info size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Messages Body */}
                  <div className="tms-chat-msgs-body">
                    {activeConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`tms-bubble ${msg.sender === "tailor" ? "sent" : "received"}`}
                      >
                        <p style={{ margin: 0 }}>{msg.text}</p>
                        <span className="tms-bubble-time">{msg.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Message Input Bar */}
                  <form onSubmit={handleSendMessage} className="tms-input-bar">
                    <button
                      type="button"
                      onClick={() => setToastMessage("Attach photo or garment sketch.")}
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}
                      title="Attach file"
                    >
                      <Paperclip size={20} />
                    </button>

                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="tms-chat-input"
                    />

                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="tms-btn-send"
                      title="Send Message"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Global Toast Alert */}
      {toastMessage && (
        <AdminToast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
