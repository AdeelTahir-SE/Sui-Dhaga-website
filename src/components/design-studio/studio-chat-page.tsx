"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Sparkles,
  Heart,
  Bookmark,
  Check,
  Loader2,
  Eye,
  Scissors
} from "lucide-react";
import { PublicShell } from "@/components/common/site-shell";
import { StudioDetailModal } from "@/components/design-studio/studio-modals";
import { StudioDesignItem } from "@/lib/design-studio-data";

interface ChatBubbleItem {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export function StudioChatPage() {
  const [messages, setMessages] = useState<ChatBubbleItem[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello! I'm your AI fashion designer. Tell me what you have in mind."
    },
    {
      id: "msg-2",
      sender: "user",
      text: "I want a modern ethnic outfit for my sister's sangeet."
    },
    {
      id: "msg-3",
      sender: "ai",
      text: "Great! Do you prefer something like a lehenga, saree, anarkali or a fusion set?"
    },
    {
      id: "msg-4",
      sender: "user",
      text: "A lehenga in royal blue with silver embroidery."
    },
    {
      id: "msg-5",
      sender: "ai",
      text: "Here are some options I created based on your idea."
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<StudioDesignItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 3 Royal Blue Variations
  const variations: StudioDesignItem[] = [
    {
      id: "var-royal-1",
      title: "Royal Sapphire Lehenga (Sheer Sleeves)",
      category: "Lehenga",
      editedAgo: "AI Generated",
      savedDate: "Today",
      image: "/images/design-studio/chat-lehenga-var1.jpg",
      prompt: "Royal blue flared bridal lehenga with sheer embroidered long sleeves, sweetheart crop top and silver metallic threadwork.",
      fabric: "Pure Raw Silk & Net",
      colorPalette: ["#164E80", "#E5E7EB", "#FAF8F5", "#D5B069"],
      estimatedCost: "₹26,000 - ₹34,000",
      tags: ["Sangeet", "Royal Blue", "Silver Work"],
      isFavorite: true
    },
    {
      id: "var-royal-2",
      title: "Sapphire Floral Flare Lehenga",
      category: "Lehenga",
      editedAgo: "AI Generated",
      savedDate: "Today",
      image: "/images/design-studio/chat-lehenga-var2.jpg",
      prompt: "Royal sapphire blue heavy flared lehenga with elbow-length blouse, draped dupatta across shoulders and silver zardozi kalis.",
      fabric: "Banarasi Silk & Georgette",
      colorPalette: ["#164E80", "#FFFFFF", "#CDEBE4", "#6652A8"],
      estimatedCost: "₹28,000 - ₹38,000",
      tags: ["Bridal", "Heavy Flare", "Dupatta Drape"],
      isFavorite: false
    },
    {
      id: "var-royal-3",
      title: "Contemporary Sleeveless Royal Lehenga",
      category: "Lehenga",
      editedAgo: "AI Generated",
      savedDate: "Today",
      image: "/images/design-studio/chat-lehenga-var3.jpg",
      prompt: "Deep sapphire blue sleeveless crop-top lehenga with heavy metallic silver gotta patti embellishments and belted waistline.",
      fabric: "Micro Velvet & Net",
      colorPalette: ["#164E80", "#D1D5DB", "#FAF8F5", "#111111"],
      estimatedCost: "₹24,000 - ₹30,000",
      tags: ["Modern Sangeet", "Sleeveless", "Gotta Patti"],
      isFavorite: false
    }
  ];

  const suggestedPrompts = [
    "Bridal lehenga for evening",
    "Summer kurta set",
    "Reception saree look",
    "Indo western for men"
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatBubbleItem = {
      id: `msg-u-${Date.now()}`,
      sender: "user",
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "Here are tailored design suggestions based on your request:";
      if (text.toLowerCase().includes("summer") || text.toLowerCase().includes("kurta")) {
        aiText = "I've drafted lightweight pastel breathable kurta silhouettes with subtle neck detailing.";
      } else if (text.toLowerCase().includes("saree")) {
        aiText = "Here are contemporary pre-stitched cocktail saree drapes with sequin borders.";
      } else if (text.toLowerCase().includes("men") || text.toLowerCase().includes("indo")) {
        aiText = "Here are asymmetric bandhgala sherwanis and fusion kurtas for men.";
      }

      const aiMsg: ChatBubbleItem = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: aiText
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <PublicShell>
      <div className="studio-root-container">
        {/* Signature Coral Bottom Right Wave Accent */}
        <div className="studio-coral-corner-wave" aria-hidden="true">
          <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 220C50 180 80 140 130 155C180 170 200 110 240 100C270 92 280 60 280 0V220H0Z"
              fill="#FF5B52"
            />
          </svg>
        </div>

        <div className="studio-chat-page-main-container">
          {/* Breadcrumb Navigation */}
          <nav className="studio-chat-top-breadcrumb-row" aria-label="Breadcrumb">
            <Link href="/design-studio" className="studio-chat-top-breadcrumb-link">
              AI Design Studio
            </Link>
            <span className="studio-chat-top-breadcrumb-sep">&gt;</span>
            <span className="studio-chat-top-breadcrumb-active">Chat with AI</span>
          </nav>

          {/* Header Title Section */}
          <div className="studio-chat-top-header-section">
            <h1 className="studio-chat-top-main-heading">Chat with AI Designer</h1>
            <p className="studio-chat-top-sub-heading">
              Talk with AI and create your perfect outfit step by step.
            </p>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div
              style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                background: "#111827",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                zIndex: 10000,
                animation: "studioFadeIn 0.2s ease"
              }}
            >
              <Check size={16} color="#22C55E" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 2-Column Split Chat Workspace Grid */}
          <div className="studio-chat-page-workspace-grid">
            {/* Left Column: Chat Conversation Stream */}
            <div className="studio-chat-thread-box">
              {messages.map((msg) => (
                <div key={msg.id} className="studio-chat-message-item">
                  {msg.sender === "ai" ? (
                    <div>
                      <div className="studio-chat-ai-row">
                        <img
                          src="/images/design-studio/reference-cream-anarkali.jpg"
                          alt="AI Designer Avatar"
                          className="studio-chat-ai-avatar"
                        />
                        <div>
                          <div className="studio-chat-ai-header-label">AI Designer</div>
                          <div className="studio-chat-ai-bubble-box">{msg.text}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="studio-chat-user-row">
                      <div className="studio-chat-user-bubble-box">{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="studio-chat-ai-row">
                  <img
                    src="/images/design-studio/reference-cream-anarkali.jpg"
                    alt="AI Designer Avatar"
                    className="studio-chat-ai-avatar"
                  />
                  <div className="studio-chat-ai-bubble-box" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Loader2 size={16} className="animate-spin" color="#0B7B6E" />
                    <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>AI Designer is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: AI Generated Variations Card */}
            <div className="studio-chat-variations-card">
              <h2 className="studio-chat-variations-title">AI Generated Variations</h2>

              <div className="studio-chat-variations-3col-grid">
                {variations.map((v) => (
                  <div
                    key={v.id}
                    className="studio-chat-variation-item"
                    onClick={() => setSelectedDesign(v)}
                    title={v.title}
                  >
                    <img
                      src={v.image}
                      alt={v.title}
                      className="studio-chat-variation-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Suggested Prompts & Message Input Bar */}
          <div className="studio-chat-bottom-wrapper">
            <div>
              <div className="studio-chat-suggested-label">Suggested Prompts</div>
              <div className="studio-chat-prompts-chips-row">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="studio-chat-prompt-pill"
                    onClick={() => handleSend(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="studio-chat-input-form"
            >
              <input
                type="text"
                className="studio-chat-text-input"
                placeholder="Type your message..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="studio-chat-send-btn"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Quick View / Save Design Modal */}
        <StudioDetailModal
          design={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      </div>
    </PublicShell>
  );
}
