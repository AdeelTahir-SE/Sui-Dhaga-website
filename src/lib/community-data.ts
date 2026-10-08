export interface PostComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  isVerified?: boolean;
  content: string;
  images: string[];
  tags: string[];
  likesCount: number;
  isLiked?: boolean;
  commentsCount: number;
  savesCount: number;
  isSaved?: boolean;
  comments?: PostComment[];
}

export interface TrendingDesign {
  id: string;
  title: string;
  image: string;
  likes: number;
}

export interface FollowingUser {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified?: boolean;
  isFollowing: boolean;
}

export const initialPosts: CommunityPost[] = [
  {
    id: "post-1",
    author: "Ayesha Khan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    timestamp: "2 hours ago",
    content: "Designed this pastel Anarkali for a summer wedding 🌸 Would love your feedback!",
    images: [
      "/images/home/community_1.png",
      "/images/home/community_2.png",
      "/images/home/community_3.png",
      "/images/home/community_4.png",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
    ],
    tags: ["Anarkali", "Pastel", "WeddingWear", "Embroidered"],
    likesCount: 128,
    isLiked: true,
    commentsCount: 24,
    savesCount: 15,
    isSaved: false,
    comments: [
      {
        id: "c-1",
        author: "Zainab Malik",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: "The embroidery detail on the neck is exquisite! Great work!",
        timestamp: "1 hour ago"
      },
      {
        id: "c-2",
        author: "Rekha Tailors",
        avatar: "/images/home/tailor-rekha.png",
        text: "Beautiful flare and fitting! Very elegant choice of pastel shades.",
        timestamp: "45 mins ago"
      }
    ]
  },
  {
    id: "post-2",
    author: "Meera Tailors",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    timestamp: "5 hours ago",
    isVerified: true,
    content: "Royal blue never goes out of style 💙 Client loved the final look!",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80"
    ],
    tags: ["Lehenga", "RoyalBlue", "BridalWear"],
    likesCount: 96,
    isLiked: false,
    commentsCount: 18,
    savesCount: 22,
    isSaved: true,
    comments: [
      {
        id: "c-3",
        author: "Fatima Noor",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        text: "Stunning color depth! How long did the zardozi work take?",
        timestamp: "3 hours ago"
      }
    ]
  },
  {
    id: "post-3",
    author: "Stitch Craft",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    timestamp: "1 day ago",
    isVerified: true,
    content: "Handcrafted velvet Prince coat for groomsmen. Classic tailoring with modern silhouette.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80"
    ],
    tags: ["MensWear", "PrinceCoat", "Velvet", "GroomFashion"],
    likesCount: 142,
    isLiked: false,
    commentsCount: 31,
    savesCount: 40,
    isSaved: false,
    comments: []
  }
];

export const initialTrendingDesigns: TrendingDesign[] = [
  {
    id: "trend-1",
    title: "Floral Lehenga",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=80",
    likes: 126
  },
  {
    id: "trend-2",
    title: "Pastel Anarkali",
    image: "/images/home/hero-float-pastel-anarkali.png",
    likes: 98
  },
  {
    id: "trend-3",
    title: "Sabyasachi Inspired",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=80",
    likes: 87
  },
  {
    id: "trend-4",
    title: "Indo Western Jacket",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    likes: 76
  },
  {
    id: "trend-5",
    title: "Yellow Sharara",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    likes: 65
  }
];

export const initialFollowingUsers: FollowingUser[] = [
  {
    id: "stitch-craft",
    name: "Stitch Craft",
    handle: "@stitchcraft",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    isVerified: true,
    isFollowing: true
  },
  {
    id: "rekha-tailors",
    name: "Rekha Tailors",
    handle: "@rekhatailors",
    avatar: "/images/home/tailor-rekha.png",
    isVerified: true,
    isFollowing: true
  },
  {
    id: "aarav-bespoke",
    name: "Aarav Bespoke",
    handle: "@aaravbespoke",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    isVerified: true,
    isFollowing: true
  },
  {
    id: "noor-thread",
    name: "Noor & Thread",
    handle: "@noorandthread",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    isVerified: false,
    isFollowing: true
  },
  {
    id: "ethnic-weaves",
    name: "Ethnic Weaves",
    handle: "@ethnicweaves",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    isVerified: false,
    isFollowing: true
  }
];

import { communityService } from "./api/community-service";
import { CommunityPost as ApiPost, CommunityComment as ApiComment } from "./api/types";

export function mapBackendCommentToItem(c: ApiComment): PostComment {
  return {
    id: c.id,
    author: c.user?.full_name || c.user?.name || c.user?.email?.split("@")[0] || "Community Member",
    avatar: c.user?.avatar_url || "/images/home/tailor-rekha.png",
    text: c.content,
    timestamp: c.created_at
      ? new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "Just now"
  };
}

export function mapBackendPostToItem(p: ApiPost): CommunityPost {
  const authorName = p.author?.full_name || p.author?.name || p.author?.email?.split("@")[0] || "Sui Dhāga Creator";
  const avatar = p.author?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80";
  const images = p.images && p.images.length > 0 ? p.images : ["/images/home/community_1.png"];

  return {
    id: p.id,
    author: authorName,
    avatar,
    timestamp: p.created_at
      ? new Date(p.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short" })
      : "Recently",
    isVerified: p.author?.role === "tailor",
    content: p.content || p.title || "",
    images,
    tags: p.tags || ["CustomDesign", "Fashion"],
    likesCount: p.likes_count ?? p.likesCount ?? 0,
    isLiked: p.is_liked ?? p.isLiked ?? false,
    commentsCount: p.comments_count ?? p.commentsCount ?? (p.comments?.length || 0),
    savesCount: p.saves_count ?? p.savesCount ?? 0,
    isSaved: p.is_saved ?? p.isSaved ?? false,
    comments: p.comments?.map(mapBackendCommentToItem) || []
  };
}

export function getCommunityPostById(id: string): CommunityPost | undefined {
  const post = initialPosts.find((p) => p.id === id) || initialPosts[0];
  if (!post) return undefined;

  return {
    ...post,
    content: post.content || "Designed this pastel Anarkali for a summer wedding 🌸 Used georgette fabric with thread and sequin embroidery. Perfect for day events!",
    comments: post.comments && post.comments.length > 0 ? post.comments : [
      {
        id: "c-1",
        author: "Stitch Craft",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: "Beautiful color combination! 😍",
        timestamp: "1 hour ago"
      },
      {
        id: "c-2",
        author: "Noor & Thread",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        text: "Love the embroidery details! ❤️",
        timestamp: "55 mins ago"
      },
      {
        id: "c-3",
        author: "Meera Tailors",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "What fabric did you use?",
        timestamp: "30 mins ago"
      }
    ]
  };
}

export async function fetchCommunityPostByIdApi(id: string): Promise<CommunityPost | undefined> {
  try {
    const res = await communityService.getPostById(id);
    if (res?.data) {
      return mapBackendPostToItem(res.data);
    }
  } catch (err) {
    console.warn("[Community API] Fetch post detail failed, fallback to mock:", err);
  }

  return getCommunityPostById(id);
}

/**
 * Async API fetcher for community feed posts.
 */
export async function fetchCommunityPostsApi(tab = "for-you"): Promise<CommunityPost[]> {
  try {
    const res = await communityService.getPosts();
    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map(mapBackendPostToItem);
    }
  } catch (err) {
    console.warn("[Community API] Backend feed endpoint unavailable, fallback to mock:", err);
  }

  return initialPosts;
}

export async function togglePostLikeApi(postId: string, isLiked: boolean): Promise<boolean> {
  try {
    await communityService.toggleLike(postId);
    return true;
  } catch (err) {
    console.warn("[Community API] Toggle like failed:", err);
  }

  return true;
}

export async function togglePostSaveApi(postId: string, isSaved: boolean): Promise<boolean> {
  try {
    await communityService.toggleSave(postId);
    return true;
  } catch (err) {
    console.warn("[Community API] Toggle save failed:", err);
  }

  return true;
}

export async function createCommunityPostApi(postData: Partial<CommunityPost>): Promise<{ success: boolean; post?: CommunityPost }> {
  try {
    const res = await communityService.createPost({
      title: postData.content?.slice(0, 50) || "Community Post",
      content: postData.content || "",
      images: postData.images || [],
      tags: postData.tags || ["CustomDesign"]
    });
    if (res?.data) {
      const mapped = mapBackendPostToItem(res.data);
      initialPosts.unshift(mapped);
      return { success: true, post: mapped };
    }
  } catch (err) {
    console.warn("[Community API] Create post on backend failed, saving locally:", err);
  }

  const newPost: CommunityPost = {
    id: `post-${Date.now()}`,
    author: postData.author || "You",
    avatar: postData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    timestamp: "Just now",
    content: postData.content || "",
    images: postData.images || ["/images/home/feature-tailors.png"],
    tags: postData.tags || ["CustomDesign", "Fashion"],
    likesCount: 0,
    isLiked: false,
    commentsCount: 0,
    savesCount: 0,
    isSaved: false,
    comments: []
  };

  initialPosts.unshift(newPost);
  return { success: true, post: newPost };
}
