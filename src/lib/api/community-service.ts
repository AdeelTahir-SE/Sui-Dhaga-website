/**
 * Community Hub, Posts, Comments, Likes & Saves Service
 * Endpoints: /community/*
 */

import { apiClient } from "./client";
import {
  fetchWithCache,
  invalidateCacheDomain,
  stableCacheKey,
  updateCachedDomainEntries,
} from "./data-cache";
import { ApiResponse, CommunityPost, CommunityComment } from "./types";

export const communityService = {
  /**
   * List community posts with search and tag filters
   */
  getPosts: async (params?: { tag?: string; search?: string }): Promise<ApiResponse<CommunityPost[]>> => {
    const key = `posts:${stableCacheKey(params as Record<string, unknown> | undefined)}`;
    return fetchWithCache(
      "community",
      key,
      () => apiClient.get<ApiResponse<CommunityPost[]>>("/community/posts", { params }),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(Array.isArray(res?.data) && res.data.length > 0),
      }
    );
  },

  /**
   * Create a new community post
   */
  createPost: async (payload: {
    title: string;
    content: string;
    images?: (File | Blob | string)[];
    tags?: string[];
  }): Promise<ApiResponse<CommunityPost>> => {
    const hasFiles = payload.images?.some((img) => typeof img !== "string");
    const res = hasFiles
      ? await (() => {
          const formData = new FormData();
          formData.append("title", payload.title);
          formData.append("content", payload.content);
          if (payload.tags) formData.append("tags", payload.tags.join(","));
          payload.images?.forEach((img) => {
            if (typeof img !== "string") formData.append("images", img);
          });
          return apiClient.post<ApiResponse<CommunityPost>>("/community/posts", formData);
        })()
      : await apiClient.post<ApiResponse<CommunityPost>>("/community/posts", {
          title: payload.title,
          content: payload.content,
          images: payload.images as string[],
          tags: payload.tags,
        });

    invalidateCacheDomain("community");
    return res;
  },

  /**
   * Get community post by ID
   */
  getPostById: async (postId: string): Promise<ApiResponse<CommunityPost>> => {
    return fetchWithCache(
      "community",
      `post:${postId}`,
      () => apiClient.get<ApiResponse<CommunityPost>>(`/community/posts/${postId}`),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.data),
      }
    );
  },

  /**
   * Update community post
   */
  updatePost: async (
    postId: string,
    updates: Partial<CommunityPost>
  ): Promise<ApiResponse<CommunityPost>> => {
    const res = await apiClient.patch<ApiResponse<CommunityPost>>(`/community/posts/${postId}`, updates);
    invalidateCacheDomain("community");
    return res;
  },

  /**
   * Delete community post
   */
  deletePost: async (postId: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/community/posts/${postId}`);
    invalidateCacheDomain("community");
    return res;
  },

  /**
   * Toggle like on post and sync cached feed/detail entries without full refetch
   */
  toggleLike: async (postId: string): Promise<ApiResponse<{ isLiked: boolean; likesCount: number }>> => {
    const res = await apiClient.post<ApiResponse<{ isLiked: boolean; likesCount: number }>>(
      `/community/posts/${postId}/like`
    );
    const nextLiked = res?.data?.isLiked;
    const nextCount = res?.data?.likesCount;
    if (typeof nextLiked === "boolean") {
      updateCachedDomainEntries<ApiResponse<CommunityPost[]>>(
        "community",
        (k) => k.startsWith("posts:"),
        (entry) => ({
          ...entry,
          data: entry.data.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  isLiked: nextLiked,
                  is_liked: nextLiked,
                  likesCount: typeof nextCount === "number" ? nextCount : p.likesCount,
                  likes_count: typeof nextCount === "number" ? nextCount : p.likes_count,
                }
              : p
          ),
        })
      );
      updateCachedDomainEntries<ApiResponse<CommunityPost>>(
        "community",
        (k) => k === `post:${postId}`,
        (entry) => ({
          ...entry,
          data: {
            ...entry.data,
            isLiked: nextLiked,
            is_liked: nextLiked,
            likesCount: typeof nextCount === "number" ? nextCount : entry.data.likesCount,
            likes_count: typeof nextCount === "number" ? nextCount : entry.data.likes_count,
          },
        })
      );
    }
    return res;
  },

  /**
   * Toggle save / bookmark on post and sync cached entries
   */
  toggleSave: async (postId: string): Promise<ApiResponse<{ isSaved: boolean }>> => {
    const res = await apiClient.post<ApiResponse<{ isSaved: boolean }>>(`/community/posts/${postId}/save`);
    const nextSaved = res?.data?.isSaved;
    if (typeof nextSaved === "boolean") {
      updateCachedDomainEntries<ApiResponse<CommunityPost[]>>(
        "community",
        (k) => k.startsWith("posts:"),
        (entry) => ({
          ...entry,
          data: entry.data.map((p) =>
            p.id === postId ? { ...p, isSaved: nextSaved, is_saved: nextSaved } : p
          ),
        })
      );
      updateCachedDomainEntries<ApiResponse<CommunityPost>>(
        "community",
        (k) => k === `post:${postId}`,
        (entry) => ({
          ...entry,
          data: { ...entry.data, isSaved: nextSaved, is_saved: nextSaved },
        })
      );
    }
    return res;
  },

  /**
   * Get comments for post
   */
  getComments: async (postId: string): Promise<ApiResponse<CommunityComment[]>> => {
    return fetchWithCache(
      "community",
      `comments:${postId}`,
      () => apiClient.get<ApiResponse<CommunityComment[]>>(`/community/posts/${postId}/comments`),
      {
        scope: "auth",
        shouldCache: (res) => Array.isArray(res?.data),
      }
    );
  },

  /**
   * Add comment to post
   */
  addComment: async (postId: string, content: string): Promise<ApiResponse<CommunityComment>> => {
    const res = await apiClient.post<ApiResponse<CommunityComment>>(`/community/posts/${postId}/comments`, {
      content,
    });
    invalidateCacheDomain("community");
    return res;
  },
};
