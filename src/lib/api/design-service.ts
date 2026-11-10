/**
 * AI Designs & Design Studio Service
 * Endpoints: /designs/*
 */

import { apiClient } from "./client";
import { fetchWithCache } from "./data-cache";
import { ApiResponse, Design } from "./types";

export const designService = {
  /**
   * List user designs (cached until invalidated or auth changes)
   */
  getDesigns: async (): Promise<ApiResponse<Design[]>> => {
    return fetchWithCache(
      "designs",
      "raw-list",
      () => apiClient.get<ApiResponse<Design[]>>("/designs"),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.success && Array.isArray(res.data)),
      }
    );
  },

  /**
   * Get design details by ID (reuses raw list cache if available before hitting network)
   */
  getDesignById: async (designId: string): Promise<ApiResponse<Design>> => {
    return fetchWithCache(
      "designs",
      `raw-detail:${designId}`,
      () => apiClient.get<ApiResponse<Design>>(`/designs/${designId}`),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.success && res.data),
      }
    );
  },
};
