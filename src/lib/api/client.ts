/**
 * Sui Dhāga Universal API Client
 * ------------------------------
 * Universal HTTP client for communicating with backend REST APIs.
 * Supports configurable base URL, automatic authentication headers,
 * FormData upload handling, error wrapping, query serialization, and JSON decoding.
 */

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: any;
  token?: string;
}

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://sui-dhaga-backend.vercel.app/api/v1";

/**
 * Retrieves the currently active auth token from memory / localStorage.
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("sui_dhaga_auth_token") ||
    localStorage.getItem("sui_dhaga_admin_token") ||
    localStorage.getItem("supabase_auth_token") ||
    null
  );
}

/**
 * Sets the active auth token and user profile in storage.
 */
export function setAuthSession(token: string, user?: any): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("sui_dhaga_auth_token", token);
    localStorage.setItem("sui_dhaga_admin_token", token);
    if (user) {
      localStorage.setItem("sui_dhaga_user", JSON.stringify(user));
    }
  }
}

/**
 * Clears the active auth session.
 */
export function clearAuthSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sui_dhaga_auth_token");
    localStorage.removeItem("sui_dhaga_admin_token");
    localStorage.removeItem("sui_dhaga_user");
    localStorage.removeItem("supabase_auth_token");
  }
}

// Backward compatibility alias functions for admin modules
export const getAdminAuthToken = getAuthToken;
export const setAdminAuthToken = (token: string) => setAuthSession(token);
export const clearAdminAuthToken = clearAuthSession;

/**
 * Builds a query string from key-value parameters.
 */
export function buildQueryString(params?: Record<string, string | number | boolean | undefined | null>): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Core API Request Function
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, body, headers = {}, token, ...customConfig } = options;

  const authToken = token || getAuthToken();
  const queryString = buildQueryString(params);

  // Normalize endpoint URL
  let url = endpoint;
  if (!url.startsWith("http")) {
    const cleanBase = API_BASE_URL.replace(/\/+$/, "");
    const cleanPath = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    url = `${cleanBase}${cleanPath}${queryString}`;
  } else {
    url = `${url}${queryString}`;
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  if (authToken) {
    defaultHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  if (body !== undefined) {
    if (isFormData) {
      config.body = body;
    } else {
      config.body = typeof body === "string" ? body : JSON.stringify(body);
    }
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorDetails: any = null;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = { message: response.statusText };
    }

    const errorMessage =
      errorDetails?.message ||
      errorDetails?.error?.message ||
      `API request failed with status ${response.status}`;

    const error = new Error(errorMessage);
    (error as any).status = response.status;
    (error as any).details = errorDetails;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
