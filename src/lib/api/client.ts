/**
 * Sui Dhāga Admin API Client
 * --------------------------
 * Universal HTTP client for communicating with backend REST APIs.
 * Supports configurable base URL, authentication headers, error wrapping,
 * and JSON serialization.
 */

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: any;
  token?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "";

/**
 * Retrieves the currently active auth token from memory / localStorage / cookie.
 */
export function getAdminAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("sui_dhaga_admin_token") ||
    localStorage.getItem("sui_dhaga_auth_token") ||
    null
  );
}

/**
 * Sets the active auth token.
 */
export function setAdminAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("sui_dhaga_admin_token", token);
  }
}

/**
 * Clears the active auth token.
 */
export function clearAdminAuthToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sui_dhaga_admin_token");
  }
}

/**
 * Builds a query string from key-value parameters.
 */
function buildQueryString(params?: Record<string, string | number | boolean | undefined | null>): string {
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

  const authToken = token || getAdminAuthToken();
  const queryString = buildQueryString(params);

  // If endpoint is already a full URL or relative to same domain
  const url = endpoint.startsWith("http")
    ? `${endpoint}${queryString}`
    : `${API_BASE_URL}${endpoint}${queryString}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  if (authToken) {
    defaultHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    ...customConfig
  };

  if (body !== undefined) {
    config.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorDetails: any = null;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = { message: response.statusText };
    }

    const error = new Error(
      errorDetails?.error?.message ||
        errorDetails?.message ||
        `API request failed with status ${response.status}`
    );
    (error as any).status = response.status;
    (error as any).details = errorDetails;
    throw error;
  }

  // If 204 No Content
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
    apiRequest<T>(endpoint, { ...options, method: "DELETE" })
};
