/**
 * Custom Tailoring Orders and Lifecycle Tracking Service
 * Endpoints: /orders/*
 */

import { apiClient } from "./client";
import { fetchWithCache, invalidateCacheDomain, stableCacheKey } from "./data-cache";
import { ApiResponse, Order, CreateOrderPayload, OrderStatus } from "./types";

export const orderService = {
  /**
   * List orders for current user or tailor
   */
  getOrders: async (params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<Order[]>> => {
    const key = `list:${stableCacheKey(params as Record<string, unknown> | undefined)}`;
    return fetchWithCache(
      "orders",
      key,
      () => apiClient.get<ApiResponse<Order[]>>("/orders", { params }),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(Array.isArray(res?.data)),
      }
    );
  },

  /**
   * Place a new custom tailoring order
   */
  createOrder: async (payload: CreateOrderPayload): Promise<ApiResponse<Order>> => {
    const res = await apiClient.post<ApiResponse<Order>>("/orders", payload);
    invalidateCacheDomain("orders");
    invalidateCacheDomain("dashboard");
    return res;
  },

  /**
   * Get complete order details with designs, measurements, and tracking
   */
  getOrderById: async (orderId: string): Promise<ApiResponse<Order>> => {
    return fetchWithCache(
      "orders",
      `detail:${orderId}`,
      () => apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`),
      {
        scope: "auth",
        shouldCache: (res) => Boolean(res?.data),
      }
    );
  },

  /**
   * Update order lifecycle status (e.g. cutting, stitching, quality_check, completed)
   */
  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus,
    note?: string
  ): Promise<ApiResponse<Order>> => {
    const res = await apiClient.patch<ApiResponse<Order>>(`/orders/${orderId}/status`, { status, note });
    invalidateCacheDomain("orders");
    invalidateCacheDomain("dashboard");
    return res;
  },
};
