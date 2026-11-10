/**
 * Body Measurements Profile Management Service
 * Endpoints: /measurements/*
 */

import { apiClient } from "./client";
import { fetchWithCache, invalidateCacheDomain } from "./data-cache";
import { ApiResponse, MeasurementProfile } from "./types";

export const measurementService = {
  /**
   * List user body measurement profiles
   */
  getMeasurements: async (): Promise<ApiResponse<MeasurementProfile[]>> => {
    return fetchWithCache(
      "measurements",
      "list",
      () => apiClient.get<ApiResponse<MeasurementProfile[]>>("/measurements"),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.success && Array.isArray(res.data)),
      }
    );
  },

  /**
   * Create a new body measurement profile
   */
  createMeasurement: async (
    payload: Omit<MeasurementProfile, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<MeasurementProfile>> => {
    const res = await apiClient.post<ApiResponse<MeasurementProfile>>("/measurements", payload);
    invalidateCacheDomain("measurements");
    invalidateCacheDomain("designs");
    return res;
  },

  /**
   * Get measurement profile by ID
   */
  getMeasurementById: async (measurementId: string): Promise<ApiResponse<MeasurementProfile>> => {
    return fetchWithCache(
      "measurements",
      `detail:${measurementId}`,
      () => apiClient.get<ApiResponse<MeasurementProfile>>(`/measurements/${measurementId}`),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.data),
      }
    );
  },

  /**
   * Update measurement profile
   */
  updateMeasurement: async (
    measurementId: string,
    updates: Partial<MeasurementProfile>
  ): Promise<ApiResponse<MeasurementProfile>> => {
    const res = await apiClient.patch<ApiResponse<MeasurementProfile>>(
      `/measurements/${measurementId}`,
      updates
    );
    invalidateCacheDomain("measurements");
    invalidateCacheDomain("designs");
    return res;
  },

  /**
   * Delete measurement profile
   */
  deleteMeasurement: async (measurementId: string): Promise<ApiResponse<null>> => {
    const res = await apiClient.delete<ApiResponse<null>>(`/measurements/${measurementId}`);
    invalidateCacheDomain("measurements");
    invalidateCacheDomain("designs");
    return res;
  },
};
