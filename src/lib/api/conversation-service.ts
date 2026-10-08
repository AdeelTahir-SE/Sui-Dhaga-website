/**
 * Direct Messaging and Conversations Service
 * Endpoints: /conversations/*, /messages/*
 */

import { apiClient } from "./client";
import { ApiResponse, Conversation, ChatMessage } from "./types";

export const conversationService = {
  /**
   * List conversations for authenticated user
   */
  getConversations: async (params?: { page?: number; limit?: number }): Promise<ApiResponse<Conversation[]>> => {
    return apiClient.get<ApiResponse<Conversation[]>>("/conversations", { params });
  },

  /**
   * Start or get an existing conversation
   */
  startConversation: async (payload: {
    tailorId?: string;
    clientId?: string;
    participantId?: string;
    initialMessage?: string;
  }): Promise<ApiResponse<Conversation>> => {
    return apiClient.post<ApiResponse<Conversation>>("/conversations", payload);
  },

  /**
   * Get conversation details by ID
   */
  getConversationById: async (conversationId: string): Promise<ApiResponse<Conversation>> => {
    return apiClient.get<ApiResponse<Conversation>>(`/conversations/${conversationId}`);
  },

  /**
   * Get messages in a conversation
   */
  getMessages: async (
    conversationId: string,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<ChatMessage[]>> => {
    return apiClient.get<ApiResponse<ChatMessage[]>>(`/conversations/${conversationId}/messages`, { params });
  },

  /**
   * Send a text message or attachment in a conversation
   */
  sendMessage: async (
    conversationId: string,
    payload: { text?: string; attachments?: string[]; file?: File | Blob }
  ): Promise<ApiResponse<ChatMessage>> => {
    if (payload.file) {
      const formData = new FormData();
      formData.append("file", payload.file);
      if (payload.text) formData.append("text", payload.text);
      return apiClient.post<ApiResponse<ChatMessage>>(`/conversations/${conversationId}/messages`, formData);
    }
    return apiClient.post<ApiResponse<ChatMessage>>(`/conversations/${conversationId}/messages`, {
      text: payload.text,
      attachments: payload.attachments,
    });
  },

  /**
   * Get conversation between specific tailor and client
   */
  getConversationBetween: async (tailorId: string, clientId: string): Promise<ApiResponse<Conversation>> => {
    return apiClient.get<ApiResponse<Conversation>>(`/conversations/${tailorId}/${clientId}`);
  },

  /**
   * Get messages between specific tailor and client
   */
  getMessagesBetween: async (
    tailorId: string,
    clientId: string,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<ChatMessage[]>> => {
    return apiClient.get<ApiResponse<ChatMessage[]>>(`/conversations/${tailorId}/${clientId}/messages`, { params });
  },

  /**
   * Send message between specific tailor and client
   */
  sendMessageBetween: async (
    tailorId: string,
    clientId: string,
    payload: { text?: string; attachments?: string[]; file?: File | Blob }
  ): Promise<ApiResponse<ChatMessage>> => {
    if (payload.file) {
      const formData = new FormData();
      formData.append("file", payload.file);
      if (payload.text) formData.append("text", payload.text);
      return apiClient.post<ApiResponse<ChatMessage>>(`/conversations/${tailorId}/${clientId}/messages`, formData);
    }
    return apiClient.post<ApiResponse<ChatMessage>>(`/conversations/${tailorId}/${clientId}/messages`, {
      text: payload.text,
      attachments: payload.attachments,
    });
  },

  /**
   * Mark a message as read
   */
  markMessageRead: async (messageId: string): Promise<ApiResponse<null>> => {
    return apiClient.patch<ApiResponse<null>>(`/messages/${messageId}/read`);
  },

  /**
   * Add attachment to message
   */
  addAttachment: async (
    messageId: string,
    file: File | Blob
  ): Promise<ApiResponse<{ fileUrl: string }>> => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<ApiResponse<{ fileUrl: string }>>(`/messages/${messageId}/attachments`, formData);
  },
};
