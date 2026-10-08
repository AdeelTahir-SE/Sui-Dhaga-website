/**
 * Reviews and Ratings Service
 * Endpoints: /tailors/{tailorId}/reviews, /orders/{orderId}/review
 */

import { apiClient } from "./client";
import { ApiResponse, TailorReview } from "./types";

export const reviewService = {
  /**
   * Get reviews for a tailor profile
   */
  getTailorReviews: async (tailorId: string): Promise<ApiResponse<TailorReview[]>> => {
    return apiClient.get<ApiResponse<TailorReview[]>>(`/tailors/${tailorId}/reviews`);
  },

  /**
   * Leave a review and rating for a completed order
   */
  submitOrderReview: async (
    orderId: string,
    review: {
      rating: number;
      comment?: string;
      images?: string[];
    }
  ): Promise<ApiResponse<TailorReview>> => {
    return apiClient.post<ApiResponse<TailorReview>>(`/orders/${orderId}/review`, review);
  },
};
