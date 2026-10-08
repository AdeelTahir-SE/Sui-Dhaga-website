export interface ChatMessage {
  id: string;
  sender: "user" | "tailor";
  text: string;
  timestamp: string;
  images?: string[];
  readStatus?: boolean;
}

export interface ConversationItem {
  id: string;
  tailorName: string;
  handle?: string;
  avatar: string;
  rating?: number;
  reviewsCount?: number;
  isOnline?: boolean;
  isTyping?: boolean;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  orderNumber?: string;
  outfitTitle: string;
  outfitImage: string;
  orderStatus: "In Progress" | "Delivered" | "Confirmed" | "Pending";
  messages: ChatMessage[];
}

export const initialConversations: ConversationItem[] = [
  {
    id: "rekha-tailors",
    tailorName: "Rekha Tailors",
    handle: "@rekhatailors",
    avatar: "/images/home/tailor-rekha.png",
    rating: 4.9,
    reviewsCount: 128,
    isOnline: true,
    isTyping: false,
    lastMessage: "Yes, here it is: TRK123456789",
    timestamp: "10:35 AM",
    unreadCount: 0,
    orderNumber: "#SD1256",
    outfitTitle: "Custom Anarkali Suit",
    outfitImage: "/images/home/hero-float-pastel-anarkali.png",
    orderStatus: "In Progress",
    messages: [
      {
        id: "m-1",
        sender: "tailor",
        text: "Hi Ayesha! 👋 How can I help you with your order?",
        timestamp: "10:30 AM"
      },
      {
        id: "m-2",
        sender: "user",
        text: "Hi! I wanted to confirm the delivery date for my Anarkali suit.",
        timestamp: "10:32 AM",
        readStatus: true
      },
      {
        id: "m-3",
        sender: "tailor",
        text: "Sure! Your order is ready and will be delivered on 24 May.",
        timestamp: "10:32 AM",
        images: [
          "/images/home/community_1.png",
          "/images/home/community_2.png",
          "/images/home/hero-float-pastel-anarkali.png"
        ]
      },
      {
        id: "m-4",
        sender: "user",
        text: "That's great! Can you share the tracking ID?",
        timestamp: "10:34 AM",
        readStatus: true
      },
      {
        id: "m-5",
        sender: "tailor",
        text: "Yes, here it is: TRK123456789. You will get updates on your email as well.",
        timestamp: "10:35 AM"
      }
    ]
  },
  {
    id: "stitch-craft",
    tailorName: "Stitch Craft",
    handle: "@stitchcraft",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Your order has been delivered.",
    timestamp: "9:15 AM",
    unreadCount: 1,
    outfitTitle: "Blue Lehenga",
    outfitImage: "/images/home/hero-float-royal-blue-lehenga.png",
    orderStatus: "Delivered",
    messages: [
      { id: "m-4", sender: "user", text: "When will the Royal Blue Lehenga be dispatched?", timestamp: "Yesterday" },
      { id: "m-5", sender: "tailor", text: "Your order has been delivered by courier today!", timestamp: "9:15 AM" }
    ]
  },
  {
    id: "aarav-bespoke",
    tailorName: "Aarav Bespoke",
    handle: "@aaravbespoke",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Thanks for your message!",
    timestamp: "Yesterday",
    unreadCount: 0,
    outfitTitle: "Sherwani",
    outfitImage: "/images/home/hero-float-teal-sherwani.png",
    orderStatus: "Confirmed",
    messages: [
      { id: "m-6", sender: "user", text: "Looking forward to fitting trial on Friday.", timestamp: "Yesterday" },
      { id: "m-7", sender: "tailor", text: "Thanks for your message! See you on Friday at 3 PM.", timestamp: "Yesterday" }
    ]
  },
  {
    id: "noor-thread",
    tailorName: "Noor & Thread",
    handle: "@noorandthread",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Let me know your measurements.",
    timestamp: "Yesterday",
    unreadCount: 2,
    outfitTitle: "Kurta Set",
    outfitImage: "/images/home/hero-float-cream-kurta.png",
    orderStatus: "In Progress",
    messages: [
      { id: "m-8", sender: "tailor", text: "Hi! Let me know your measurements for the neck collar size.", timestamp: "Yesterday" }
    ]
  },
  {
    id: "ethnic-weaves",
    tailorName: "Ethnic Weaves",
    handle: "@ethnicweaves",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    lastMessage: "We've sent you the invoice.",
    timestamp: "2 May",
    unreadCount: 0,
    outfitTitle: "Banarasi Saree",
    outfitImage: "/images/home/hero-float-gold-saree.png",
    orderStatus: "Confirmed",
    messages: [
      { id: "m-9", sender: "tailor", text: "We've sent you the invoice and fitting receipt.", timestamp: "2 May" }
    ]
  },
  {
    id: "meena-tailors",
    tailorName: "Meena Tailors",
    handle: "@meenatailors",
    avatar: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=120&auto=format&fit=crop&q=80",
    lastMessage: "Looking forward to it!",
    timestamp: "1 May",
    unreadCount: 0,
    outfitTitle: "Silk Kurti",
    outfitImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=80",
    orderStatus: "Delivered",
    messages: [
      { id: "m-10", sender: "tailor", text: "Looking forward to working with you again!", timestamp: "1 May" }
    ]
  },
  {
    id: "design-studio-team",
    tailorName: "Design Studio Team",
    handle: "@suidhaga_support",
    avatar: "/images/home/ai_studio.png",
    lastMessage: "Check out new templates!",
    timestamp: "1 May",
    unreadCount: 0,
    outfitTitle: "AI Studio Pack",
    outfitImage: "/images/home/create-ai-studio.png",
    orderStatus: "Confirmed",
    messages: [
      { id: "m-11", sender: "tailor", text: "Check out new AI 3D design studio templates!", timestamp: "1 May" }
    ]
  }
];

import { conversationService } from "./api/conversation-service";
import { Conversation as ApiConversation, ChatMessage as ApiChatMessage } from "./api/types";

export function mapBackendMessageToChat(msg: ApiChatMessage, currentUserId?: string): ChatMessage {
  const isUserSender = currentUserId ? msg.sender_id === currentUserId || msg.senderId === currentUserId : true;
  return {
    id: msg.id,
    sender: isUserSender ? "user" : "tailor",
    text: msg.text || msg.message || "",
    timestamp: msg.created_at
      ? new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "Just now",
    images: msg.attachments?.map((a) => (typeof a === "string" ? a : a.url)) || [],
    readStatus: msg.read_status || msg.is_read || msg.isRead
  };
}

export function mapBackendConversationToItem(conv: ApiConversation): ConversationItem {
  const tailorName = conv.tailor?.shopName || conv.participant?.full_name || conv.participant?.name || conv.tailor?.name || "Master Tailor";
  const avatar = conv.tailor?.avatar_url || conv.participant?.avatar_url || "/images/home/tailor-rekha.png";
  const lastMsgRaw = conv.last_message ?? conv.lastMessage;
  const lastMsg = typeof lastMsgRaw === "string" ? lastMsgRaw : lastMsgRaw?.text || lastMsgRaw?.message || "Started conversation";
  const timestamp = conv.updated_at
    ? new Date(conv.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Recently";

  return {
    id: conv.id,
    tailorName,
    handle: `@${tailorName.toLowerCase().replace(/\s+/g, "")}`,
    avatar,
    rating: conv.tailor?.rating || 4.8,
    reviewsCount: conv.tailor?.reviewsCount || 120,
    isOnline: true,
    isTyping: false,
    lastMessage: lastMsg,
    timestamp,
    unreadCount: conv.unread_count || conv.unreadCount || 0,
    orderNumber: "#SD1256",
    outfitTitle: "Custom Stitching",
    outfitImage: "/images/home/hero-float-pastel-anarkali.png",
    orderStatus: "In Progress",
    messages: conv.messages ? conv.messages.map((m) => mapBackendMessageToChat(m)) : []
  };
}

export function getConversationById(id: string): ConversationItem | undefined {
  return initialConversations.find((c) => c.id === id) || initialConversations[0];
}

export async function fetchConversationsApi(): Promise<ConversationItem[]> {
  try {
    const res = await conversationService.getConversations();
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map(mapBackendConversationToItem);
    }
  } catch (err) {
    console.warn("[Messages API] Backend conversations unavailable, fallback to mock:", err);
  }

  return initialConversations;
}

export async function fetchMessagesForConversationApi(conversationId: string): Promise<ChatMessage[]> {
  try {
    const res = await conversationService.getMessages(conversationId);
    if (res?.data && Array.isArray(res.data)) {
      return res.data.map((m) => mapBackendMessageToChat(m));
    }
  } catch (err) {
    console.warn("[Messages API] Fetch messages failed, falling back locally:", err);
  }

  const conv = getConversationById(conversationId);
  return conv?.messages || [];
}

export async function sendChatMessageApi(
  conversationId: string,
  text: string
): Promise<{ success: boolean; message?: ChatMessage }> {
  try {
    const res = await conversationService.sendMessage(conversationId, { text });
    if (res?.data) {
      const chatMsg = mapBackendMessageToChat(res.data);
      return { success: true, message: chatMsg };
    }
  } catch (err) {
    console.warn("[Messages API] Send message on backend failed, updating local state:", err);
  }

  const newMsg: ChatMessage = {
    id: `m-${Date.now()}`,
    sender: "user",
    text,
    timestamp: "Just now"
  };

  const conv = getConversationById(conversationId);
  if (conv) {
    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.timestamp = "Just now";
  }

  return { success: true, message: newMsg };
}
