/**
 * User Notifications and Alerts Service
 * Endpoints: /notifications/*
 */

import { apiClient } from "./client";
import { ApiResponse, AppNotification } from "./types";

export const notificationService = {
  /**
   * List notifications for authenticated user
   */
  getNotifications: async (): Promise<ApiResponse<AppNotification[]>> => {
    return apiClient.get<ApiResponse<AppNotification[]>>("/notifications");
  },

  /**
   * Get unread notifications count
   */
  getUnreadCount: async (): Promise<ApiResponse<{ unreadCount: number }>> => {
    return apiClient.get<ApiResponse<{ unreadCount: number }>>("/notifications/unread-count");
  },

  /**
   * Register push device token
   */
  registerPushToken: async (token: string, platform: string = "web"): Promise<ApiResponse<null>> => {
    return apiClient.post<ApiResponse<null>>("/notifications/push-token", { token, platform });
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async (): Promise<ApiResponse<null>> => {
    return apiClient.post<ApiResponse<null>>("/notifications/read-all");
  },

  /**
   * Mark a single notification as read
   */
  markAsRead: async (notificationId: string): Promise<ApiResponse<null>> => {
    return apiClient.patch<ApiResponse<null>>(`/notifications/${notificationId}/read`);
  },

  /**
   * Delete a notification
   */
  deleteNotification: async (notificationId: string): Promise<ApiResponse<null>> => {
    return apiClient.delete<ApiResponse<null>>(`/notifications/${notificationId}`);
  },
};
