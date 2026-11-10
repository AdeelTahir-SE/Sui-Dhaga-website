/**
 * Sui Dhāga Universal API Client
 * ------------------------------
 * Universal HTTP client for communicating with backend REST APIs.
 * Supports configurable base URL, automatic authentication headers,
 * FormData upload handling, error wrapping, query serialization, and JSON decoding.
 */

import { invalidateAllCaches } from "./data-cache";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  token?: string;
}

export class ApiClientError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.details = details;
  }
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
export function setAuthSession(token: string, user?: unknown): void {
  if (typeof window !== "undefined") {
    const prevToken = getAuthToken();
    localStorage.setItem("sui_dhaga_auth_token", token);
    localStorage.setItem("sui_dhaga_admin_token", token);
    if (user) {
      localStorage.setItem("sui_dhaga_user", JSON.stringify(user));
    }
    if (prevToken !== token) {
      invalidateAllCaches();
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
    invalidateAllCaches();
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
export async function apiRequest<T = unknown>(
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
    let errorDetails: Record<string, unknown> | null = null;
    try {
      errorDetails = (await response.json()) as Record<string, unknown>;
    } catch {
      errorDetails = { message: response.statusText };
    }

    const nestedErr = errorDetails?.error as Record<string, unknown> | undefined;
    let errorMessage =
      (typeof errorDetails?.message === "string" && errorDetails.message) ||
      (typeof nestedErr?.message === "string" && nestedErr.message) ||
      `API request failed with status ${response.status}`;

    // Extract detailed validation field errors if returned by backend (e.g. Zod / Joi)
    const validationErrors = errorDetails?.errors as
      | { fieldErrors?: Record<string, unknown> }
      | undefined;
    if (validationErrors?.fieldErrors) {
      const fieldEntries = Object.entries(validationErrors.fieldErrors);
      if (fieldEntries.length > 0) {
        const fieldDetails = fieldEntries
          .map(([field, msgs]) => {
            const label = field.charAt(0).toUpperCase() + field.slice(1);
            const msgText = Array.isArray(msgs) ? msgs.join(", ") : String(msgs);
            return `${label}: ${msgText}`;
          })
          .join(". ");
        errorMessage = `${errorMessage} (${fieldDetails})`;
      }
    }

    throw new ApiClientError(errorMessage, response.status, errorDetails);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body }),

  put: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
