/**
 * Tailors Directory, Profiles, Services, Availability & Map Service
 * Endpoints: /tailors/*, /availability/*
 */

import { apiClient } from "./client";
import { fetchWithCache, invalidateCacheDomain, stableCacheKey } from "./data-cache";
import {
  ApiResponse,
  TailorProfile,
  TailorService,
  AvailabilitySlot,
  TailorMapPin,
} from "./types";

export interface TailorFilters {
  page?: number;
  limit?: number;
  city?: string;
  specialty?: string;
  search?: string;
  isFeatured?: boolean;
}

export const tailorService = {
  /**
   * List all tailors with pagination and ratings
   */
  getTailors: async (filters: TailorFilters = {}): Promise<ApiResponse<TailorProfile[]>> => {
    const key = `list:${stableCacheKey(filters as Record<string, unknown>)}`;
    return fetchWithCache(
      "tailors",
      key,
      () =>
        apiClient.get<ApiResponse<TailorProfile[]>>("/tailors", {
          params: { ...filters },
        }),
      {
        scope: "public",
        shouldCache: (res) => Boolean(res?.success && Array.isArray(res.data)),
      }
    );
  },

  /**
   * Get nearby tailors based on geolocation
   */
  getNearbyTailors: async (lat: number, lng: number): Promise<ApiResponse<TailorProfile[]>> => {
    const key = `nearby:${lat.toFixed(3)}:${lng.toFixed(3)}`;
    return fetchWithCache(
      "tailors",
      key,
      () =>
        apiClient.get<ApiResponse<TailorProfile[]>>("/tailors/nearby", {
          params: { lat, lng },
        }),
      {
        scope: "public",
        shouldCache: (res) => Boolean(res?.success && Array.isArray(res.data)),
      }
    );
  },

  /**
   * Get tailors map coordinates and map pin list
   */
  getTailorsMap: async (): Promise<ApiResponse<TailorMapPin[]>> => {
    return fetchWithCache(
      "tailors",
      "map-pins",
      () => apiClient.get<ApiResponse<TailorMapPin[]>>("/tailors/map"),
      {
        scope: "public",
        shouldCache: (res) => Boolean(res?.success && Array.isArray(res.data)),
      }
    );
  },

  /**
   * Get full tailor profile, services, availability, gallery, and reviews
   */
  getTailorById: async (tailorId: string): Promise<ApiResponse<TailorProfile>> => {
    return fetchWithCache(
      "tailors",
      `detail:${tailorId}`,
      () => apiClient.get<ApiResponse<TailorProfile>>(`/tailors/${tailorId}`),
      {
        scope: "public",
        shouldCache: (res) => Boolean(res?.success && res.data),
      }
    );
  },

  /**
   * Create a new tailor profile for currently authenticated user
   */
  createTailorProfile: async (payload: {
    shopName: string;
    specialties: string[];
    city: string;
    address?: string;
    experienceYears?: number;
    bio?: string;
  }): Promise<ApiResponse<TailorProfile>> => {
    const res = await apiClient.post<ApiResponse<TailorProfile>>("/tailors", payload);
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Update tailor profile
   */
  updateTailorProfile: async (
    tailorId: string,
    updates: Partial<TailorProfile>
  ): Promise<ApiResponse<TailorProfile>> => {
    const res = await apiClient.patch<ApiResponse<TailorProfile>>(`/tailors/${tailorId}`, updates);
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Add a new service to tailor catalog
   */
  addService: async (
    tailorId: string,
    service: {
      title: string;
      price: number;
      description?: string;
      category?: string;
    }
  ): Promise<ApiResponse<TailorService>> => {
    const res = await apiClient.post<ApiResponse<TailorService>>(`/tailors/${tailorId}/services`, service);
    invalidateCacheDomain("tailors");
    return res;
  },

  /**
   * Get tailor weekly availability schedule
   */
  getAvailability: async (tailorId: string): Promise<ApiResponse<AvailabilitySlot[]>> => {
    return fetchWithCache(
      "tailors",
      `availability:${tailorId}`,
      () => apiClient.get<ApiResponse<AvailabilitySlot[]>>(`/tailors/${tailorId}/availability`),
      {
        scope: "public",
        shouldCache: (res) => Boolean(res?.data && Array.isArray(res.data)),
      }
    );
  },

  /**
   * Add availability schedule slot
   */
  addAvailabilitySlot: async (
    tailorId: string,
    slot: {
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      isAvailable?: boolean;
    }
  ): Promise<ApiResponse<AvailabilitySlot>> => {
    const res = await apiClient.post<ApiResponse<AvailabilitySlot>>(`/tailors/${tailorId}/availability`, slot);
    invalidateCacheDomain("tailors");
    return res;
  },

  /**
   * Update an availability slot
   */
  updateAvailabilitySlot: async (
    slotId: string,
    updates: Partial<AvailabilitySlot>
  ): Promise<ApiResponse<AvailabilitySlot>> => {
    const res = await apiClient.patch<ApiResponse<AvailabilitySlot>>(`/availability/${slotId}`, updates);
    invalidateCacheDomain("tailors");
    return res;
  },

  /**
   * Delete an availability slot
   */
  deleteAvailabilitySlot: async (slotId: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/availability/${slotId}`);
    invalidateCacheDomain("tailors");
    return res;
  },

  /**
   * Upload shop banner image for tailor
   */
  uploadBanner: async (
    tailorId: string,
    bannerFile: File | Blob
  ): Promise<ApiResponse<{ bannerUrl: string }>> => {
    const formData = new FormData();
    formData.append("banner", bannerFile);
    const res = await apiClient.post<ApiResponse<{ bannerUrl: string }>>(`/tailors/${tailorId}/banner`, formData);
    invalidateCacheDomain("tailors");
    return res;
  },
};
