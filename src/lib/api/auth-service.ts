/**
 * Authentication and Session Management Service
 * Endpoints: /auth/*
 */

import { apiClient, setAuthSession, clearAuthSession, getAuthToken } from "./client";
import {
  ApiResponse,
  AuthSessionData,
  RegisterPayload,
  LoginPayload,
  CompleteProfilePayload,
  UserProfile,
} from "./types";

export const authService = {
  /**
   * Register a new user account (customer or tailor)
   */
  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthSessionData>> => {
    const res = await apiClient.post<ApiResponse<AuthSessionData>>("/auth/register", payload);
    const token =
      res?.data?.accessToken ||
      res?.data?.token ||
      res?.data?.session?.access_token;
    if (token) {
      setAuthSession(token, res.data.user);
    }
    return res;
  },

  /**
   * Authenticate with email & password and store session JWT
   */
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthSessionData>> => {
    const res = await apiClient.post<ApiResponse<AuthSessionData>>("/auth/login", payload);
    const token =
      res?.data?.accessToken ||
      res?.data?.token ||
      res?.data?.session?.access_token;
    if (token) {
      setAuthSession(token, res.data?.user);
    }
    return res;
  },

  /**
   * Terminate current session
   */
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      const res = await apiClient.post<ApiResponse<null>>("/auth/logout");
      clearAuthSession();
      return res;
    } catch {
      clearAuthSession();
      return { success: true, message: "Logged out successfully", data: null };
    }
  },

  /**
   * Refresh session access token
   */
  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthSessionData>> => {
    const res = await apiClient.post<ApiResponse<AuthSessionData>>("/auth/refresh-token", { refreshToken });
    const token =
      res?.data?.accessToken ||
      res?.data?.token ||
      res?.data?.session?.access_token;
    if (token) {
      setAuthSession(token, res.data?.user);
    }
    return res;
  },

  /**
   * Send password reset email
   */
  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    return apiClient.post<ApiResponse<null>>("/auth/forgot-password", { email });
  },

  /**
   * Reset user password
   */
  resetPassword: async (password: string): Promise<ApiResponse<null>> => {
    return apiClient.post<ApiResponse<null>>("/auth/reset-password", { password });
  },

  /**
   * Get OAuth URL for Google Sign-In
   */
  getGoogleAuthUrl: async (redirectUri?: string): Promise<string> => {
    const res = await apiClient.get<ApiResponse<{ url: string }>>("/auth/google-url", {
      params: redirectUri ? { redirectUri } : undefined,
    });
    return res?.data?.url || "";
  },

  /**
   * Authenticate with Google payload / token
   */
  loginWithGoogle: async (payload: any): Promise<ApiResponse<AuthSessionData>> => {
    const res = await apiClient.post<ApiResponse<AuthSessionData>>("/auth/google", payload);
    const token =
      res?.data?.accessToken ||
      res?.data?.token ||
      res?.data?.session?.access_token;
    if (token) {
      setAuthSession(token, res.data?.user);
    }
    return res;
  },

  /**
   * Complete user profile role and information
   */
  completeProfile: async (payload: CompleteProfilePayload): Promise<ApiResponse<UserProfile>> => {
    return apiClient.post<ApiResponse<UserProfile>>("/auth/complete-profile", payload);
  },

  /**
   * Helper: Check if user is currently logged in
   */
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  /**
   * Helper: Get stored user data from local storage
   */
  getStoredUser: (): UserProfile | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("sui_dhaga_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },
};
