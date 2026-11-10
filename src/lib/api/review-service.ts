/**
 * Reviews and Ratings Service
 * Endpoints: /tailors/{tailorId}/reviews, /orders/{orderId}/review
 */

import { apiClient } from "./client";
import { fetchWithCache, invalidateCacheDomain } from "./data-cache";
import { ApiResponse, TailorReview } from "./types";

export const reviewService = {
  /**
   * Get reviews for a tailor profile
   */
  getTailorReviews: async (tailorId: string): Promise<ApiResponse<TailorReview[]>> => {
    return fetchWithCache(
      "tailors",
      `reviews:${tailorId}`,
      () => apiClient.get<ApiResponse<TailorReview[]>>(`/tailors/${tailorId}/reviews`),
      {
        scope: "public",
        shouldCache: (res) => Boolean(Array.isArray(res?.data)),
      }
    );
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
    const res = await apiClient.post<ApiResponse<TailorReview>>(`/orders/${orderId}/review`, review);
    invalidateCacheDomain("tailors");
    invalidateCacheDomain("orders");
    return res;
  },
};
