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

function getCurrentUserId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem("sui_dhaga_user");
    if (raw) {
      const u = JSON.parse(raw);
      return u.id || u.userId || u._id;
    }
  } catch {}
  return undefined;
}

type RawRecord = Record<string, unknown>;

export function mapBackendMessageToChat(rawMsg: ApiChatMessage | RawRecord, currentUserId?: string): ChatMessage {
  const msg = rawMsg as RawRecord;
  const myId = currentUserId || getCurrentUserId();
  const senderId = (msg.sender_id || msg.senderId) as string | undefined;
  const isUserSender = myId && senderId ? senderId === myId : (msg.sender === "user" || msg.sender_role === "client");

  const rawImages = (msg.attachments || msg.images || []) as unknown[];
  const images = Array.isArray(rawImages)
    ? rawImages
        .map((a) => {
          if (typeof a === "string") return a;
          const obj = a as Record<string, unknown>;
          return String(obj?.url || obj?.fileUrl || "");
        })
        .filter(Boolean)
    : [];

  return {
    id: String(msg.id),
    sender: isUserSender ? "user" : "tailor",
    text: String(msg.text || msg.message || ""),
    timestamp: msg.created_at
      ? new Date(String(msg.created_at)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "Just now",
    images,
    readStatus: Boolean(msg.read_status || msg.is_read || msg.isRead)
  };
}

export function mapBackendConversationToItem(rawConv: ApiConversation | RawRecord): ConversationItem {
  const conv = rawConv as RawRecord;
  const tailorObj = conv.tailor as RawRecord | undefined;
  const participantObj = conv.participant as RawRecord | undefined;
  const clientObj = conv.client as RawRecord | undefined;
  const customerObj = conv.customer as RawRecord | undefined;

  const myId = getCurrentUserId();
  const tailorName = String(
    tailorObj?.shopName ||
    tailorObj?.shop_name ||
    participantObj?.full_name ||
    participantObj?.name ||
    tailorObj?.name ||
    clientObj?.full_name ||
    customerObj?.full_name ||
    "Master Tailor"
  );

  const avatar = String(
    tailorObj?.avatar_url ||
    participantObj?.avatar_url ||
    clientObj?.avatar_url ||
    customerObj?.avatar_url ||
    "/images/home/tailor-rekha.png"
  );

  const lastMsgRaw = conv.last_message ?? conv.lastMessage;
  const lastMsg =
    typeof lastMsgRaw === "string"
      ? lastMsgRaw
      : String((lastMsgRaw as RawRecord | undefined)?.text || (lastMsgRaw as RawRecord | undefined)?.message || "Started conversation");

  const timeRaw = (conv.updated_at || conv.created_at) as string | undefined;
  const timestamp = timeRaw
    ? new Date(timeRaw).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Recently";

  const rawMsgs = conv.messages as Array<ApiChatMessage | RawRecord> | undefined;
  const rawOrderStatus = String(conv.order_status || conv.orderStatus || "In Progress").toLowerCase();
  const orderStatus: ConversationItem["orderStatus"] =
    rawOrderStatus.includes("deliver") || rawOrderStatus.includes("complet")
      ? "Delivered"
      : rawOrderStatus.includes("confirm")
      ? "Confirmed"
      : rawOrderStatus.includes("pend")
      ? "Pending"
      : "In Progress";

  return {
    id: String(conv.id),
    tailorName,
    handle: `@${tailorName.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
    avatar,
    rating: Number(tailorObj?.rating) || 4.8,
    reviewsCount: Number(tailorObj?.reviewsCount) || 120,
    isOnline: true,
    isTyping: false,
    lastMessage: lastMsg,
    timestamp,
    unreadCount: Number(conv.unread_count || conv.unreadCount) || 0,
    orderNumber: String(conv.order_number || conv.orderNumber || "#SD1256"),
    outfitTitle: String(conv.outfit_title || conv.outfitTitle || "Custom Stitching"),
    outfitImage: String(conv.outfit_image || conv.outfitImage || "/images/home/hero-float-pastel-anarkali.png"),
    orderStatus,
    messages: Array.isArray(rawMsgs) ? rawMsgs.map((m) => mapBackendMessageToChat(m, myId)) : []
  };
}

export function getConversationById(id: string): ConversationItem | undefined {
  return initialConversations.find((c) => c.id === id);
}

export async function fetchConversationsApi(): Promise<ConversationItem[]> {
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("sui_dhaga_auth_token");

  try {
    const res = await conversationService.getConversations();
    if (res?.data && Array.isArray(res.data)) {
      const mapped = res.data.map(mapBackendConversationToItem);
      // Merge with locally stored conversations if any
      let localList: ConversationItem[] = [];
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("sui_dhaga_conversations");
          if (raw) localList = JSON.parse(raw);
        } catch {}
      }
      return [...mapped, ...localList.filter((l) => !mapped.some((m) => m.id === l.id))];
    }
  } catch (err) {
    console.warn("[Messages API] Backend conversations unavailable, checking local store:", err);
  }

  // Local storage sync
  let list: ConversationItem[] = [];
  try {
    if (typeof window !== "undefined") {
      const storedJson = localStorage.getItem("sui_dhaga_conversations");
      if (storedJson) {
        list = JSON.parse(storedJson);
      }
    }
  } catch (e) {
    console.warn("Error reading local conversations:", e);
  }

  // If user is authenticated, return their actual conversations (or empty list if new user)
  if (hasToken) {
    return list;
  }

  // Demo fallback for unauthenticated guest visitors
  return list.length > 0 ? list : initialConversations;
}

export async function fetchMessagesForConversationApi(conversationId: string): Promise<ChatMessage[]> {
  const myId = getCurrentUserId();
  try {
    const res = await conversationService.getMessages(conversationId);
    if (res?.data && Array.isArray(res.data)) {
      return res.data.map((m) => mapBackendMessageToChat(m, myId));
    }
  } catch (err) {
    console.warn("[Messages API] Fetch messages failed, checking local store:", err);
  }

  // Local storage check
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(`sui_dhaga_chat_${conversationId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
  }

  const conv = getConversationById(conversationId);
  return conv?.messages || [];
}

export async function sendChatMessageApi(
  conversationId: string,
  text: string,
  file?: File
): Promise<{ success: boolean; message?: ChatMessage }> {
  const myId = getCurrentUserId();
  try {
    const res = await conversationService.sendMessage(conversationId, { text, file });
    if (res?.data) {
      const chatMsg = mapBackendMessageToChat(res.data, myId);
      return { success: true, message: chatMsg };
    }
  } catch (err) {
    console.warn("[Messages API] Send message on backend failed, updating local state:", err);
  }

  const newMsg: ChatMessage = {
    id: `m-${Date.now()}`,
    sender: "user",
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    readStatus: false
  };

  // Sync to local storage
  if (typeof window !== "undefined") {
    try {
      const key = `sui_dhaga_chat_${conversationId}`;
      const raw = localStorage.getItem(key);
      const list = raw ? JSON.parse(raw) : [];
      list.push(newMsg);
      localStorage.setItem(key, JSON.stringify(list));
    } catch {}
  }

  const conv = getConversationById(conversationId);
  if (conv) {
    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.timestamp = "Just now";
  }

  return { success: true, message: newMsg };
}

export async function startConversationApi(
  tailorId: string,
  initialMessage?: string
): Promise<{ success: boolean; conversation?: ConversationItem; error?: string }> {
  try {
    const res = await conversationService.startConversation({
      tailorId,
      initialMessage,
    });
    if (res?.data) {
      const mapped = mapBackendConversationToItem(res.data);
      return { success: true, conversation: mapped };
    }
  } catch (err: unknown) {
    console.warn("[Messages API] Start conversation on backend failed:", err);
  }
  return { success: false, error: "Failed to start conversation" };
}
