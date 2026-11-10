/**
 * User Profile Management Service
 * Endpoints: /users/*
 */

import { apiClient, setAuthSession } from "./client";
import { fetchWithCache, invalidateCacheDomain } from "./data-cache";
import { ApiResponse, UserProfile } from "./types";

export const userService = {
  /**
   * Retrieve profile of currently authenticated user
   */
  getMe: async (): Promise<ApiResponse<UserProfile>> => {
    return fetchWithCache(
      "user",
      "me",
      async () => {
        const res = await apiClient.get<ApiResponse<UserProfile>>("/users/me");
        if (res?.data) {
          const token =
            typeof window !== "undefined" ? localStorage.getItem("sui_dhaga_auth_token") || "" : "";
          if (token) setAuthSession(token, res.data);
        }
        return res;
      },
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.data),
      }
    );
  },

  /**
   * Update profile details for current user
   */
  updateMe: async (updates: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
    const res = await apiClient.patch<ApiResponse<UserProfile>>("/users/me", updates);
    if (res?.data) {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("sui_dhaga_auth_token") || "" : "";
      if (token) setAuthSession(token, res.data);
    }
    invalidateCacheDomain("user");
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Upload profile avatar image
   */
  uploadAvatar: async (imageFile: File | Blob): Promise<ApiResponse<{ avatar_url: string }>> => {
    const formData = new FormData();
    formData.append("avatar", imageFile);
    const res = await apiClient.post<ApiResponse<{ avatar_url: string }>>("/users/me/avatar", formData);
    invalidateCacheDomain("user");
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Get public profile information of another user
   */
  getUserById: async (userId: string): Promise<ApiResponse<UserProfile>> => {
    return apiClient.get<ApiResponse<UserProfile>>(`/users/${userId}`);
  },

  /**
   * Soft delete / deactivate user profile
   */
  deleteAccount: async (): Promise<ApiResponse<null>> => {
    return apiClient.delete<ApiResponse<null>>("/users/me");
  },
};
