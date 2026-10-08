/**
 * Body Measurements Profile Management Service
 * Endpoints: /measurements/*
 */

import { apiClient } from "./client";
import { ApiResponse, MeasurementProfile } from "./types";

export const measurementService = {
  /**
   * List user body measurement profiles
   */
  getMeasurements: async (): Promise<ApiResponse<MeasurementProfile[]>> => {
    return apiClient.get<ApiResponse<MeasurementProfile[]>>("/measurements");
  },

  /**
   * Create a new body measurement profile
   */
  createMeasurement: async (
    payload: Omit<MeasurementProfile, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<MeasurementProfile>> => {
    return apiClient.post<ApiResponse<MeasurementProfile>>("/measurements", payload);
  },

  /**
   * Get measurement profile by ID
   */
  getMeasurementById: async (measurementId: string): Promise<ApiResponse<MeasurementProfile>> => {
    return apiClient.get<ApiResponse<MeasurementProfile>>(`/measurements/${measurementId}`);
  },

  /**
   * Update measurement profile
   */
  updateMeasurement: async (
    measurementId: string,
    updates: Partial<MeasurementProfile>
  ): Promise<ApiResponse<MeasurementProfile>> => {
    return apiClient.patch<ApiResponse<MeasurementProfile>>(`/measurements/${measurementId}`, updates);
  },

  /**
   * Delete measurement profile
   */
  deleteMeasurement: async (measurementId: string): Promise<ApiResponse<null>> => {
    return apiClient.delete<ApiResponse<null>>(`/measurements/${measurementId}`);
  },
};
