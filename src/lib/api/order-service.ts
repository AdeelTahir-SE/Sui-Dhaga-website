/**
 * Custom Tailoring Orders and Lifecycle Tracking Service
 * Endpoints: /orders/*
 */

import { apiClient } from "./client";
import { ApiResponse, Order, CreateOrderPayload, OrderStatus } from "./types";

export const orderService = {
  /**
   * List orders for current user or tailor
   */
  getOrders: async (params?: { page?: number; limit?: number; status?: string }): Promise<ApiResponse<Order[]>> => {
    return apiClient.get<ApiResponse<Order[]>>("/orders", { params });
  },

  /**
   * Place a new custom tailoring order
   */
  createOrder: async (payload: CreateOrderPayload): Promise<ApiResponse<Order>> => {
    return apiClient.post<ApiResponse<Order>>("/orders", payload);
  },

  /**
   * Get complete order details with designs, measurements, and tracking
   */
  getOrderById: async (orderId: string): Promise<ApiResponse<Order>> => {
    return apiClient.get<ApiResponse<Order>>(`/orders/${orderId}`);
  },

  /**
   * Update order lifecycle status (e.g. cutting, stitching, quality_check, completed)
   */
  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus,
    note?: string
  ): Promise<ApiResponse<Order>> => {
    return apiClient.patch<ApiResponse<Order>>(`/orders/${orderId}/status`, { status, note });
  },
};
