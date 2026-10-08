/**
 * Tailors Directory, Profiles, Services, Availability & Map Service
 * Endpoints: /tailors/*, /availability/*
 */

import { apiClient } from "./client";
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
    return apiClient.get<ApiResponse<TailorProfile[]>>("/tailors", {
      params: filters as Record<string, any>,
    });
  },

  /**
   * Get nearby tailors based on geolocation
   */
  getNearbyTailors: async (lat: number, lng: number): Promise<ApiResponse<TailorProfile[]>> => {
    return apiClient.get<ApiResponse<TailorProfile[]>>("/tailors/nearby", {
      params: { lat, lng },
    });
  },

  /**
   * Get tailors map coordinates and map pin list
   */
  getTailorsMap: async (): Promise<ApiResponse<TailorMapPin[]>> => {
    return apiClient.get<ApiResponse<TailorMapPin[]>>("/tailors/map");
  },

  /**
   * Get full tailor profile, services, availability, gallery, and reviews
   */
  getTailorById: async (tailorId: string): Promise<ApiResponse<TailorProfile>> => {
    return apiClient.get<ApiResponse<TailorProfile>>(`/tailors/${tailorId}`);
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
    return apiClient.post<ApiResponse<TailorProfile>>("/tailors", payload);
  },

  /**
   * Update tailor profile
   */
  updateTailorProfile: async (
    tailorId: string,
    updates: Partial<TailorProfile>
  ): Promise<ApiResponse<TailorProfile>> => {
    return apiClient.patch<ApiResponse<TailorProfile>>(`/tailors/${tailorId}`, updates);
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
    return apiClient.post<ApiResponse<TailorService>>(`/tailors/${tailorId}/services`, service);
  },

  /**
   * Get tailor weekly availability schedule
   */
  getAvailability: async (tailorId: string): Promise<ApiResponse<AvailabilitySlot[]>> => {
    return apiClient.get<ApiResponse<AvailabilitySlot[]>>(`/tailors/${tailorId}/availability`);
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
    return apiClient.post<ApiResponse<AvailabilitySlot>>(`/tailors/${tailorId}/availability`, slot);
  },

  /**
   * Update an availability slot
   */
  updateAvailabilitySlot: async (
    slotId: string,
    updates: Partial<AvailabilitySlot>
  ): Promise<ApiResponse<AvailabilitySlot>> => {
    return apiClient.patch<ApiResponse<AvailabilitySlot>>(`/availability/${slotId}`, updates);
  },

  /**
   * Delete an availability slot
   */
  deleteAvailabilitySlot: async (slotId: string): Promise<ApiResponse<null>> => {
    return apiClient.delete<ApiResponse<null>>(`/availability/${slotId}`);
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
    return apiClient.post<ApiResponse<{ bannerUrl: string }>>(`/tailors/${tailorId}/banner`, formData);
  },
};
