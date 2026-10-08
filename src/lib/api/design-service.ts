/**
 * AI Designs & Design Studio Service
 * Endpoints: /designs/*
 */

import { apiClient } from "./client";
import { ApiResponse, Design } from "./types";

export const designService = {
  /**
   * List user designs
   */
  getDesigns: async (): Promise<ApiResponse<Design[]>> => {
    return apiClient.get<ApiResponse<Design[]>>("/designs");
  },

  /**
   * Get design details by ID
   */
  getDesignById: async (designId: string): Promise<ApiResponse<Design>> => {
    return apiClient.get<ApiResponse<Design>>(`/designs/${designId}`);
  },
};
