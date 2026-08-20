/**
 * Sui Dhāga Admin Service Layer
 * -----------------------------
 * Decoupled, typed administration service client.
 * Connects seamlessly to backend REST APIs (process.env.NEXT_PUBLIC_API_URL or Next.js /api/admin/*)
 * with robust offline mock fallback and state synchronization.
 */

import { apiClient } from "./client";
import {
  AdminStats,
  RevenueDataPoint,
  AdminActivityItem,
  AdminUser,
  AdminUserFilterParams,
  UpdateUserPayload,
  CreateUserPayload,
  AdminTailor,
  AdminTailorFilterParams,
  VerifyTailorPayload,
  AdminOrder,
  AdminOrderFilterParams,
  UpdateOrderStatusPayload,
  AdminPaymentTransaction,
  AdminPaymentFilterParams,
  AdminPayoutRequest,
  ProcessPayoutPayload,
  ProcessRefundPayload,
  AdminDispute,
  ResolveDisputePayload,
  AdminReview,
  ModerateReviewPayload,
  AdminCMSContent,
  AdminPlatformSettings,
  UpdateSettingsPayload,
  PaginatedResponse,
  ApiResponse
} from "./admin-types";
import { mockAdminStore, simulateDelay } from "../admin-data";

const IS_BACKEND_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL
);

export const adminService = {
  // =========================================================================
  // 1. Dashboard & Analytics
  // =========================================================================
  dashboard: {
    getStats: async (): Promise<AdminStats> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminStats>>("/api/admin/dashboard/stats");
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, falling back to local store for stats:", e);
        }
      }
      await simulateDelay(120);
      return mockAdminStore.getStats();
    },

    getRevenueChart: async (range: string = "7days"): Promise<RevenueDataPoint[]> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<RevenueDataPoint[]>>(
            "/api/admin/dashboard/revenue",
            { params: { range } }
          );
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, falling back to local store for revenue chart:", e);
        }
      }
      await simulateDelay(140);
      return mockAdminStore.getRevenue(range);
    },

    getRecentActivities: async (): Promise<AdminActivityItem[]> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminActivityItem[]>>(
            "/api/admin/dashboard/activities"
          );
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, falling back to local store for activities:", e);
        }
      }
      await simulateDelay(100);
      return mockAdminStore.getActivities();
    }
  },

  // =========================================================================
  // 2. User Management
  // =========================================================================
  users: {
    getUsers: async (
      params?: AdminUserFilterParams
    ): Promise<PaginatedResponse<AdminUser>> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          return await apiClient.get<PaginatedResponse<AdminUser>>("/api/admin/users", {
            params: params as any
          });
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for users:", e);
        }
      }

      await simulateDelay(160);
      let list = mockAdminStore.getUsers();

      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.phone.toLowerCase().includes(q) ||
            u.city.toLowerCase().includes(q)
        );
      }

      if (params?.role && params.role !== "all") {
        list = list.filter((u) => u.role === params.role);
      }

      if (params?.status && params.status !== "all") {
        list = list.filter((u) => u.status === params.status);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const total = list.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = list.slice((page - 1) * limit, page * limit);

      return {
        success: true,
        data: paginated,
        total,
        page,
        limit,
        totalPages
      };
    },

    getUserById: async (id: string): Promise<AdminUser | null> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminUser>>(`/api/admin/users/${id}`);
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to fetch user ${id} from API:`, e);
        }
      }
      await simulateDelay(80);
      const user = mockAdminStore.getUsers().find((u) => u.id === id);
      return user || null;
    },

    updateUser: async (id: string, payload: UpdateUserPayload): Promise<AdminUser> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.patch<ApiResponse<AdminUser>>(
            `/api/admin/users/${id}`,
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to patch user ${id} to backend API:`, e);
        }
      }

      await simulateDelay(150);
      const updated = mockAdminStore.updateUser(id, payload);
      if (!updated) throw new Error(`User with ID ${id} not found.`);

      mockAdminStore.addActivity({
        type: "user",
        title: `User updated: ${updated.name}`,
        description: `Status changed to ${updated.status} (${updated.role})`,
        timestamp: new Date().toISOString()
      });

      return updated;
    },

    createUser: async (payload: CreateUserPayload): Promise<AdminUser> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.post<ApiResponse<AdminUser>>("/api/admin/users", payload);
          return res.data || res;
        } catch (e) {
          console.warn("Failed to create user on API:", e);
        }
      }

      await simulateDelay(180);
      const created = mockAdminStore.addUser({
        ...payload,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        status: "active",
        ordersCount: 0,
        totalSpent: 0,
        lastActive: "Just now",
        isEmailVerified: true
      });

      mockAdminStore.addActivity({
        type: "user",
        title: `New user added: ${created.name}`,
        description: `Created with role: ${created.role}`,
        timestamp: new Date().toISOString()
      });

      return created;
    },

    deleteUser: async (id: string): Promise<boolean> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          await apiClient.delete(`/api/admin/users/${id}`);
          return true;
        } catch (e) {
          console.warn(`Failed to delete user ${id} on API:`, e);
        }
      }
      await simulateDelay(120);
      const users = mockAdminStore.getUsers().filter((u) => u.id !== id);
      mockAdminStore.saveUsers(users);
      return true;
    }
  },

  // =========================================================================
  // 3. Tailor Management & Verification Desk
  // =========================================================================
  tailors: {
    getTailors: async (
      params?: AdminTailorFilterParams
    ): Promise<PaginatedResponse<AdminTailor>> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          return await apiClient.get<PaginatedResponse<AdminTailor>>("/api/admin/tailors", {
            params: params as any
          });
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for tailors:", e);
        }
      }

      await simulateDelay(150);
      let list = mockAdminStore.getTailors();

      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (t) =>
            t.shopName.toLowerCase().includes(q) ||
            t.ownerName.toLowerCase().includes(q) ||
            t.email.toLowerCase().includes(q) ||
            t.city.toLowerCase().includes(q) ||
            t.specialties.some((s) => s.toLowerCase().includes(q))
        );
      }

      if (params?.verificationStatus && params.verificationStatus !== "all") {
        list = list.filter((t) => t.verificationStatus === params.verificationStatus);
      }

      if (params?.accountStatus && params.accountStatus !== "all") {
        list = list.filter((t) => t.accountStatus === params.accountStatus);
      }

      if (params?.city) {
        list = list.filter((t) => t.city.toLowerCase() === params.city?.toLowerCase());
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const total = list.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = list.slice((page - 1) * limit, page * limit);

      return {
        success: true,
        data: paginated,
        total,
        page,
        limit,
        totalPages
      };
    },

    getTailorById: async (id: string): Promise<AdminTailor | null> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminTailor>>(`/api/admin/tailors/${id}`);
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to fetch tailor ${id} from API:`, e);
        }
      }
      await simulateDelay(80);
      return mockAdminStore.getTailors().find((t) => t.id === id) || null;
    },

    verifyTailor: async (id: string, payload: VerifyTailorPayload): Promise<AdminTailor> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.post<ApiResponse<AdminTailor>>(
            `/api/admin/tailors/${id}/verify`,
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to verify tailor ${id} on API:`, e);
        }
      }

      await simulateDelay(200);
      const updated = mockAdminStore.updateTailor(id, {
        verificationStatus: payload.status,
        verificationNotes: payload.notes,
        commissionRate: payload.commissionRate || 12
      });

      if (!updated) throw new Error(`Tailor with ID ${id} not found.`);

      mockAdminStore.addActivity({
        type: "tailor",
        title: `Tailor status updated: ${updated.shopName}`,
        description: `Verification status set to ${payload.status.toUpperCase()}`,
        timestamp: new Date().toISOString()
      });

      return updated;
    },

    toggleFeatured: async (id: string): Promise<AdminTailor> => {
      const tailor = mockAdminStore.getTailors().find((t) => t.id === id);
      if (!tailor) throw new Error(`Tailor ${id} not found.`);
      const updated = mockAdminStore.updateTailor(id, { isFeatured: !tailor.isFeatured });
      return updated!;
    }
  },

  // =========================================================================
  // 4. Order Management
  // =========================================================================
  orders: {
    getOrders: async (
      params?: AdminOrderFilterParams
    ): Promise<PaginatedResponse<AdminOrder>> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          return await apiClient.get<PaginatedResponse<AdminOrder>>("/api/admin/orders", {
            params: params as any
          });
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for orders:", e);
        }
      }

      await simulateDelay(150);
      let list = mockAdminStore.getOrders();

      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q) ||
            o.tailorShop.toLowerCase().includes(q) ||
            o.itemTitle.toLowerCase().includes(q)
        );
      }

      if (params?.status && params.status !== "all") {
        if (params.status === "in_progress" as any) {
          list = list.filter((o) =>
            ["stitching", "cutting", "measuring", "fabric_sourcing", "quality_check"].includes(o.status)
          );
        } else if (params.status === "completed" as any) {
          list = list.filter((o) => ["completed", "delivered"].includes(o.status));
        } else if (params.status === "pending" as any) {
          list = list.filter((o) => ["pending_approval", "pending"].includes(o.status));
        } else {
          list = list.filter((o) => o.status === params.status);
        }
      }

      if (params?.paymentStatus && params.paymentStatus !== "all") {
        list = list.filter((o) => o.paymentStatus === params.paymentStatus);
      }

      if (params?.disputeStatus && params.disputeStatus !== "all") {
        list = list.filter((o) => (o.disputeStatus || "none") === params.disputeStatus);
      }

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const total = list.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const paginated = list.slice((page - 1) * limit, page * limit);

      return {
        success: true,
        data: paginated,
        total,
        page,
        limit,
        totalPages
      };
    },

    getOrderById: async (id: string): Promise<AdminOrder | null> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminOrder>>(`/api/admin/orders/${id}`);
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to fetch order ${id} from API:`, e);
        }
      }
      await simulateDelay(80);
      return mockAdminStore.getOrders().find((o) => o.id === id) || null;
    },

    updateOrderStatus: async (
      id: string,
      payload: UpdateOrderStatusPayload
    ): Promise<AdminOrder> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.patch<ApiResponse<AdminOrder>>(
            `/api/admin/orders/${id}/status`,
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to update order ${id} status on API:`, e);
        }
      }

      await simulateDelay(180);
      const existing = mockAdminStore.getOrders().find((o) => o.id === id);
      if (!existing) throw new Error(`Order ${id} not found.`);

      const updatedTimeline = [
        ...existing.timeline,
        {
          step: `Status updated to ${payload.status.replace("_", " ").toUpperCase()}`,
          completed: true,
          date: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          note: payload.note || "Updated by platform administrator"
        }
      ];

      const updated = mockAdminStore.updateOrder(id, {
        status: payload.status,
        expectedDeliveryDate: payload.expectedDeliveryDate || existing.expectedDeliveryDate,
        timeline: updatedTimeline
      });

      mockAdminStore.addActivity({
        type: "order",
        title: `Order ${existing.orderNumber} Status Updated`,
        description: `Now at ${payload.status.replace("_", " ")}`,
        timestamp: new Date().toISOString()
      });

      return updated!;
    }
  },

  // =========================================================================
  // 5. Payments, Escrow & Payouts
  // =========================================================================
  payments: {
    getTransactions: async (
      params?: AdminPaymentFilterParams
    ): Promise<AdminPaymentTransaction[]> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminPaymentTransaction[]>>(
            "/api/admin/payments/transactions",
            { params: params as any }
          );
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for transactions:", e);
        }
      }
      await simulateDelay(130);
      let list = mockAdminStore.getTransactions();

      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (t) =>
            t.transactionId.toLowerCase().includes(q) ||
            t.orderNumber.toLowerCase().includes(q) ||
            t.customerName.toLowerCase().includes(q) ||
            t.tailorName.toLowerCase().includes(q)
        );
      }

      if (params?.method && params.method !== "all") {
        list = list.filter((t) => t.method === params.method);
      }

      if (params?.status && params.status !== "all") {
        list = list.filter((t) => t.status === params.status);
      }

      if (params?.type && params.type !== "all") {
        if (params.type === "refunds") {
          list = list.filter((t) => ["refund_requested", "refunded"].includes(t.status));
        } else if (params.type === "payments") {
          list = list.filter((t) => ["completed", "pending", "in_escrow"].includes(t.status));
        }
      }

      return list;
    },

    getPayoutRequests: async (): Promise<AdminPayoutRequest[]> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminPayoutRequest[]>>(
            "/api/admin/payments/payouts"
          );
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for payouts:", e);
        }
      }
      await simulateDelay(130);
      return mockAdminStore.getPayouts();
    },

    processPayout: async (
      id: string,
      payload: ProcessPayoutPayload
    ): Promise<AdminPayoutRequest> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.post<ApiResponse<AdminPayoutRequest>>(
            `/api/admin/payments/payouts/${id}`,
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to process payout ${id} on API:`, e);
        }
      }

      await simulateDelay(220);
      const status = payload.action === "approve" ? "processed" : "rejected";
      const updated = mockAdminStore.updatePayout(id, {
        status,
        processedDate: new Date().toISOString().split("T")[0],
        notes: payload.notes
      });

      if (!updated) throw new Error(`Payout request ${id} not found.`);

      mockAdminStore.addActivity({
        type: "payment",
        title: `Payout ${updated.payoutNumber} ${payload.action === "approve" ? "Approved" : "Rejected"}`,
        description: `Rs ${updated.amount.toLocaleString()} for ${updated.shopName}`,
        timestamp: new Date().toISOString()
      });

      return updated;
    },

    processRefund: async (payload: ProcessRefundPayload): Promise<boolean> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          await apiClient.post("/api/admin/payments/refund", payload);
          return true;
        } catch (e) {
          console.warn("Failed to process refund on API:", e);
        }
      }

      await simulateDelay(200);
      mockAdminStore.addActivity({
        type: "payment",
        title: `Refund Processed for Order`,
        description: `Rs ${payload.amount.toLocaleString()} refunded: ${payload.reason}`,
        timestamp: new Date().toISOString()
      });

      return true;
    }
  },

  // =========================================================================
  // 6. Dispute Resolution Desk
  // =========================================================================
  disputes: {
    getDisputes: async (): Promise<AdminDispute[]> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminDispute[]>>("/api/admin/disputes");
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for disputes:", e);
        }
      }
      await simulateDelay(140);
      return mockAdminStore.getDisputes();
    },

    resolveDispute: async (id: string, payload: ResolveDisputePayload): Promise<AdminDispute> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.post<ApiResponse<AdminDispute>>(
            `/api/admin/disputes/${id}/resolve`,
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to resolve dispute ${id} on API:`, e);
        }
      }

      await simulateDelay(200);
      let status: AdminDispute["status"] = "dismissed";
      if (payload.resolution === "refund_full" || payload.resolution === "refund_partial") {
        status = "resolved_refund";
      } else if (payload.resolution === "release_to_tailor") {
        status = "resolved_payout";
      }

      const updated = mockAdminStore.updateDispute(id, {
        status,
        resolvedDate: new Date().toISOString().split("T")[0],
        adminDecisionNotes: payload.decisionNotes,
        refundAmount: payload.refundAmount
      });

      if (!updated) throw new Error(`Dispute ${id} not found.`);

      mockAdminStore.addActivity({
        type: "dispute",
        title: `Dispute ${updated.disputeNumber} Resolved`,
        description: `Decision: ${payload.resolution.replace("_", " ")}`,
        timestamp: new Date().toISOString()
      });

      return updated;
    }
  },

  // =========================================================================
  // 7. Review Moderation
  // =========================================================================
  reviews: {
    getReviews: async (): Promise<AdminReview[]> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminReview[]>>("/api/admin/reviews");
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for reviews:", e);
        }
      }
      await simulateDelay(120);
      return mockAdminStore.getReviews();
    },

    moderateReview: async (id: string, payload: ModerateReviewPayload): Promise<AdminReview> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.post<ApiResponse<AdminReview>>(
            `/api/admin/reviews/${id}/moderate`,
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn(`Failed to moderate review ${id} on API:`, e);
        }
      }

      await simulateDelay(150);
      const updated = mockAdminStore.updateReview(id, { status: payload.status });
      if (!updated) throw new Error(`Review ${id} not found.`);
      return updated;
    }
  },

  // =========================================================================
  // 8. CMS & Content Management
  // =========================================================================
  cms: {
    getContent: async (): Promise<AdminCMSContent> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminCMSContent>>("/api/admin/cms");
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for CMS:", e);
        }
      }
      await simulateDelay(120);
      return mockAdminStore.getCMS();
    },

    saveContent: async (content: AdminCMSContent): Promise<AdminCMSContent> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.put<ApiResponse<AdminCMSContent>>("/api/admin/cms", content);
          return res.data || res;
        } catch (e) {
          console.warn("Failed to save CMS content on API:", e);
        }
      }
      await simulateDelay(180);
      mockAdminStore.saveCMS(content);
      return content;
    }
  },

  // =========================================================================
  // 9. Platform Configuration & Settings
  // =========================================================================
  settings: {
    getSettings: async (): Promise<AdminPlatformSettings> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.get<ApiResponse<AdminPlatformSettings>>(
            "/api/admin/settings"
          );
          return res.data || res;
        } catch (e) {
          console.warn("Backend API unavailable, using local mock for settings:", e);
        }
      }
      await simulateDelay(100);
      return mockAdminStore.getSettings();
    },

    updateSettings: async (
      payload: UpdateSettingsPayload
    ): Promise<AdminPlatformSettings> => {
      if (IS_BACKEND_CONFIGURED) {
        try {
          const res = await apiClient.put<ApiResponse<AdminPlatformSettings>>(
            "/api/admin/settings",
            payload
          );
          return res.data || res;
        } catch (e) {
          console.warn("Failed to save settings on API:", e);
        }
      }

      await simulateDelay(200);
      const current = mockAdminStore.getSettings();
      const merged: AdminPlatformSettings = {
        general: { ...current.general, ...payload.general },
        commission: { ...current.commission, ...payload.commission },
        payouts: { ...current.payouts, ...payload.payouts },
        verification: { ...current.verification, ...payload.verification },
        notifications: { ...current.notifications, ...payload.notifications }
      };

      mockAdminStore.saveSettings(merged);
      return merged;
    }
  }
};
