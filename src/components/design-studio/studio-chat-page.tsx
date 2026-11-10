"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
import { StudioChatVariationsSkeleton } from "@/components/common/shadow-skeleton";
import {
  peekStudioRecentDesigns,
  fetchStudioRecentDesignsApi,
  generateDesignFromPromptApi,
  StudioDesignItem
} from "@/lib/design-studio-data";
import { useCacheTick } from "@/lib/api/data-cache";

interface ChatBubbleItem {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export function StudioChatPage() {
  const designsTick = useCacheTick("designs");
  const cachedDesigns = useMemo(
    () => (designsTick >= 0 ? peekStudioRecentDesigns() : null),
    [designsTick]
  );

  const [messages, setMessages] = useState<ChatBubbleItem[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello! I'm your AI fashion designer. Tell me what outfit style, color, or occasion you have in mind."
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [generatedVariations, setGeneratedVariations] = useState<StudioDesignItem[] | null>(null);
  const [fallbackVariations, setFallbackVariations] = useState<StudioDesignItem[] | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<StudioDesignItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const msgCounterRef = useRef(2);

  const variations =
    generatedVariations ?? (cachedDesigns ? cachedDesigns.slice(0, 3) : fallbackVariations ?? []);
  const setVariations = (
    next: StudioDesignItem[] | ((prev: StudioDesignItem[]) => StudioDesignItem[])
  ) => {
    setGeneratedVariations((prev) => {
      const base = prev ?? variations;
      return typeof next === "function" ? next(base) : next;
    });
  };
  const isLoadingVariations =
    generatedVariations === null && cachedDesigns === null && fallbackVariations === null;

  useEffect(() => {
    if (cachedDesigns !== null) return;
    let isSubscribed = true;

    fetchStudioRecentDesignsApi()
      .then((designs) => {
        if (isSubscribed) {
          setFallbackVariations(designs.slice(0, 3));
        }
      })
      .catch((err) => {
        console.error("[StudioChat] Failed loading initial variations:", err);
        if (isSubscribed) setFallbackVariations([]);
      });

    return () => {
      isSubscribed = false;
    };
  }, [cachedDesigns]);

  const suggestedPrompts = [
    "Bridal lehenga for evening",
    "Summer kurta set",
    "Reception saree look",
    "Indo western for men"
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatBubbleItem = {
      id: `msg-u-${++msgCounterRef.current}`,
      sender: "user",
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const lower = text.toLowerCase();
      const garmentType = lower.includes("kurta")
        ? "Pastel Kurta Set"
        : lower.includes("saree")
        ? "Banarasi Saree"
        : lower.includes("sherwani") || lower.includes("men")
        ? "Indo-Western Sherwani"
        : lower.includes("anarkali")
        ? "Anarkali Suit"
        : "Festive Lehenga Set";

      const generated = await generateDesignFromPromptApi({
        prompt: text,
        garmentType,
        style: "Modern Ethnic",
        occasion: lower.includes("wedding") || lower.includes("bridal") ? "Wedding" : "Festive"
      });

      let aiText = `I've generated a custom ${garmentType} concept matching "${text}" — check it out on the right panel!`;
      if (lower.includes("summer") || lower.includes("kurta")) {
        aiText = "I've drafted lightweight pastel breathable kurta silhouettes with subtle neck detailing and added the new variation.";
      } else if (lower.includes("saree")) {
        aiText = "Here are contemporary pre-stitched cocktail saree drapes with sequin borders based on your styling note.";
      } else if (lower.includes("men") || lower.includes("indo")) {
        aiText = "Here is a tailored bandhgala & fusion kurta concept added to your variations panel.";
      }

      setVariations((prev) => [generated, ...prev.slice(0, 2)]);
      setMessages((prev) => [
        ...prev,
        { id: `msg-ai-${++msgCounterRef.current}`, sender: "ai", text: aiText }
      ]);
    } catch (err) {
      console.error("[StudioChat] Generation error:", err);
    } finally {
      setIsTyping(false);
    }
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

              {isLoadingVariations || isTyping ? (
                <StudioChatVariationsSkeleton count={3} />
              ) : variations.length === 0 ? (
                <div
                  style={{
                    background: "#FAF8F5",
                    border: "1px dashed #D6D0C4",
                    borderRadius: "14px",
                    padding: "48px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <Sparkles size={28} color="#078B87" />
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "#111827" }}>
                    No Variations Yet
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", maxWidth: "280px", margin: 0 }}>
                    Send a message or click one of the suggested styling prompts below to generate bespoke AI looks.
                  </p>
                </div>
              ) : (
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
              )}
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
