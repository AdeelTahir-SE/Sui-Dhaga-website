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

function extractAuthTokens(
  data?: AuthSessionData | null,
  fallback?: { accessToken?: string; refreshToken?: string }
): { accessToken?: string; refreshToken?: string } {
  const accessToken =
    data?.accessToken ||
    data?.access_token ||
    data?.token ||
    data?.session?.access_token ||
    fallback?.accessToken;
  const refreshToken =
    data?.refreshToken ||
    data?.refresh_token ||
    data?.session?.refresh_token ||
    fallback?.refreshToken;
  return { accessToken, refreshToken };
}

function persistAuthSession(
  res: ApiResponse<AuthSessionData>,
  fallback?: { accessToken?: string; refreshToken?: string }
): void {
  if (res?.success === false) return;
  const { accessToken, refreshToken } = extractAuthTokens(res?.data, fallback);
  if (accessToken) {
    setAuthSession(accessToken, res?.data?.user, refreshToken);
  }
}

export function getDashboardRouteForRole(role?: string): string {
  if (role === "admin") return "/admin/dashboard";
  if (role === "tailor") return "/tailor/dashboard";
  return "/customer/dashboard";
}

export const authService = {
  /**
   * Register a new user account (customer or tailor)
   */
  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthSessionData>> => {
    const res = await apiClient.post<ApiResponse<AuthSessionData>>("/auth/register", payload);
    persistAuthSession(res);
    return res;
  },

  /**
   * Authenticate with email & password and store session JWT
   */
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthSessionData>> => {
    const res = await apiClient.post<ApiResponse<AuthSessionData>>("/auth/login", payload);
    persistAuthSession(res);
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
    persistAuthSession(res);
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
    const effectiveRedirect =
      redirectUri ||
      (typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined);
    const res = await apiClient.get<ApiResponse<{ url: string }>>("/auth/google-url", {
      params: effectiveRedirect ? { redirectUri: effectiveRedirect } : undefined,
    });
    return res?.data?.url || "";
  },

  /**
   * Authenticate with Google payload / token
   */
  loginWithGoogle: async (
    payload: {
      idToken?: string;
      accessToken?: string;
      access_token?: string;
      refreshToken?: string;
      refresh_token?: string;
      code?: string;
    } & Record<string, unknown>
  ): Promise<ApiResponse<AuthSessionData>> => {
    const fallbackAccess = payload.accessToken || payload.access_token;
    const fallbackRefresh = payload.refreshToken || payload.refresh_token;
    const res = await apiClient.post<ApiResponse<AuthSessionData>>(
      "/auth/google",
      payload,
      fallbackAccess ? { token: fallbackAccess } : undefined
    );
    persistAuthSession(res, {
      accessToken: fallbackAccess,
      refreshToken: fallbackRefresh,
    });
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
