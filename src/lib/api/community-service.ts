/**
 * Community Hub, Posts, Comments, Likes & Saves Service
 * Endpoints: /community/*
 */

import { apiClient } from "./client";
import { ApiResponse, CommunityPost, CommunityComment } from "./types";

export const communityService = {
  /**
   * List community posts with search and tag filters
   */
  getPosts: async (params?: { tag?: string; search?: string }): Promise<ApiResponse<CommunityPost[]>> => {
    return apiClient.get<ApiResponse<CommunityPost[]>>("/community/posts", { params });
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
    // Check if any images are Files
    const hasFiles = payload.images?.some((img) => typeof img !== "string");
    if (hasFiles) {
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      if (payload.tags) formData.append("tags", payload.tags.join(","));
      payload.images?.forEach((img) => {
        if (typeof img !== "string") formData.append("images", img);
      });
      return apiClient.post<ApiResponse<CommunityPost>>("/community/posts", formData);
    }
    return apiClient.post<ApiResponse<CommunityPost>>("/community/posts", {
      title: payload.title,
      content: payload.content,
      images: payload.images as string[],
      tags: payload.tags,
    });
  },

  /**
   * Get community post by ID
   */
  getPostById: async (postId: string): Promise<ApiResponse<CommunityPost>> => {
    return apiClient.get<ApiResponse<CommunityPost>>(`/community/posts/${postId}`);
  },

  /**
   * Update community post
   */
  updatePost: async (
    postId: string,
    updates: Partial<CommunityPost>
  ): Promise<ApiResponse<CommunityPost>> => {
    return apiClient.patch<ApiResponse<CommunityPost>>(`/community/posts/${postId}`, updates);
  },

  /**
   * Delete community post
   */
  deletePost: async (postId: string): Promise<ApiResponse<null>> => {
    return apiClient.delete<ApiResponse<null>>(`/community/posts/${postId}`);
  },

  /**
   * Toggle like on post
   */
  toggleLike: async (postId: string): Promise<ApiResponse<{ isLiked: boolean; likesCount: number }>> => {
    return apiClient.post<ApiResponse<{ isLiked: boolean; likesCount: number }>>(`/community/posts/${postId}/like`);
  },

  /**
   * Toggle save / bookmark on post
   */
  toggleSave: async (postId: string): Promise<ApiResponse<{ isSaved: boolean }>> => {
    return apiClient.post<ApiResponse<{ isSaved: boolean }>>(`/community/posts/${postId}/save`);
  },

  /**
   * Get comments for post
   */
  getComments: async (postId: string): Promise<ApiResponse<CommunityComment[]>> => {
    return apiClient.get<ApiResponse<CommunityComment[]>>(`/community/posts/${postId}/comments`);
  },

  /**
   * Add comment to post
   */
  addComment: async (postId: string, content: string): Promise<ApiResponse<CommunityComment>> => {
    return apiClient.post<ApiResponse<CommunityComment>>(`/community/posts/${postId}/comments`, { content });
  },
};
