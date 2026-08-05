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
      "/images/home/feature-tailors.png",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80"
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
    image: "/images/home/feature-tailors.png",
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

/**
 * Async API fetcher for community feed posts.
 * Connects to process.env.NEXT_PUBLIC_API_URL if defined, with mock fallback.
 */
export async function fetchCommunityPostsApi(tab = "for-you"): Promise<CommunityPost[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/community/feed?tab=${encodeURIComponent(tab)}`, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store"
      });
      if (res.ok) {
        const data = await res.json();
        return data.posts ?? data.data ?? [];
      }
    } catch (err) {
      console.warn("[Community API] Backend feed endpoint unavailable, fallback to mock:", err);
    }
  }

  return initialPosts;
}

export async function togglePostLikeApi(postId: string, isLiked: boolean): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/community/posts/${encodeURIComponent(postId)}/like`, {
        method: isLiked ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      return res.ok;
    } catch (err) {
      console.warn("[Community API] Toggle like failed:", err);
    }
  }

  return true;
}

export async function togglePostSaveApi(postId: string, isSaved: boolean): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/community/posts/${encodeURIComponent(postId)}/save`, {
        method: isSaved ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      return res.ok;
    } catch (err) {
      console.warn("[Community API] Toggle save failed:", err);
    }
  }

  return true;
}

export async function createCommunityPostApi(postData: Partial<CommunityPost>): Promise<{ success: boolean; post?: CommunityPost }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/community/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, post: data.post ?? data };
      }
    } catch (err) {
      console.warn("[Community API] Create post failed:", err);
    }
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
