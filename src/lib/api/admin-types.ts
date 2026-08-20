/**
 * Sui Dhāga Admin Portal - Domain Models & API Types
 * --------------------------------------------------
 * Strict TypeScript contracts for real backend integration.
 * Matches standard REST/JSON APIs for all administration modules.
 */

// Generic API Response Wrappers
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// ---------------------------------------------------------------------------
// 1. Dashboard & Analytics Types
// ---------------------------------------------------------------------------
export interface AdminStats {
  totalUsers: number;
  usersGrowth: string;
  totalTailors: number;
  tailorsGrowth: string;
  totalOrders: number;
  ordersGrowth: string;
  totalRevenue: number;
  revenueFormatted: string;
  revenueGrowth: string;
  activeUsers: number;
  ordersInProgress: number;
  pendingVerifications: number;
  openDisputes: number;
  escrowBalance: number;
  monthlyCommission: number;
}

export interface RevenueDataPoint {
  date: string;
  label: string;
  revenue: number; // in PKR/Rs
  ordersCount: number;
  commission: number;
}

export interface AdminActivityItem {
  id: string;
  type: "user" | "tailor" | "order" | "payment" | "review" | "dispute" | "system";
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  metadata?: Record<string, any>;
}

// ---------------------------------------------------------------------------
// 2. User Management Types
// ---------------------------------------------------------------------------
export type UserRole = "customer" | "tailor" | "admin" | "moderator";
export type UserStatus = "active" | "blocked" | "suspended" | "pending" | "banned";

export interface AdminUser {
  id: string;
  name: string;
  username?: string; // e.g. "@ayeshakhan"
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  city: string;
  address?: string;
  joinedDate: string;
  ordersCount: number;
  totalSpent: number; // In PKR
  lastActive: string;
  isEmailVerified: boolean;
  notes?: string;
}

export interface AdminUserFilterParams {
  search?: string;
  role?: UserRole | "all";
  status?: UserStatus | "all";
  city?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "joinedDate" | "totalSpent" | "ordersCount";
  sortOrder?: "asc" | "desc";
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  city?: string;
  notes?: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city: string;
  password?: string;
}

// ---------------------------------------------------------------------------
// 3. Tailor Management Types
// ---------------------------------------------------------------------------
export type TailorVerificationStatus = "verified" | "pending" | "rejected" | "suspended";

export interface TailorDocument {
  id: string;
  title: string;
  type: "cnic_front" | "cnic_back" | "shop_registration" | "utility_bill" | "portfolio_sample";
  url: string;
  verified: boolean;
}

export interface AdminTailor {
  id: string;
  userId: string;
  username?: string;         // e.g. "@stitchcraft"
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  province: string;          // e.g. "Punjab", "Sindh"
  address: string;
  experienceYears: number;
  specialties: string[];
  verificationStatus: TailorVerificationStatus;
  accountStatus: "active" | "inactive" | "suspended"; // separate from verification
  verificationNotes?: string;
  documents: TailorDocument[];
  rating: number;
  reviewsCount: number;
  completedOrders: number;
  activeOrders: number;
  totalEarnings: number; // In PKR
  commissionTier: "standard" | "gold" | "platinum";
  commissionRate: number; // e.g. 12%
  isFeatured: boolean;
  joinedDate: string;
  bankDetails?: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
  };
}

export interface AdminTailorFilterParams {
  search?: string;
  verificationStatus?: TailorVerificationStatus | "all";
  accountStatus?: "active" | "inactive" | "all";
  city?: string;
  isFeatured?: boolean;
  page?: number;
  limit?: number;
}

export interface VerifyTailorPayload {
  status: "verified" | "rejected" | "suspended";
  notes?: string;
  commissionRate?: number;
}

// ---------------------------------------------------------------------------
// 4. Order Management Types
// ---------------------------------------------------------------------------
export type AdminOrderStatus =
  | "pending_approval"
  | "measuring"
  | "fabric_sourcing"
  | "cutting"
  | "stitching"
  | "quality_check"
  | "ready_for_dispatch"
  | "out_for_delivery"
  | "delivered"
  | "completed"
  | "disputed"
  | "cancelled";

export interface AdminOrderMeasurementItem {
  key: string;
  label: string;
  value: number;
  unit: "inches" | "cm";
}

export interface AdminOrder {
  id: string;
  orderNumber: string; // e.g. "SD-5124"
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAvatar: string;
  customerCity: string;
  tailorId: string;
  tailorName: string;
  tailorShop: string;
  itemTitle: string; // e.g. "Bridal Hand-Embroidered Lehenga"
  category: "Bridal" | "Formal" | "Casual" | "Festive" | "Kids" | "Alterations";
  fabricDetails: {
    providedBy: "customer" | "tailor" | "platform";
    fabricType: string;
    color: string;
    lengthMeters?: number;
  };
  measurements: AdminOrderMeasurementItem[];
  referenceImageUrl?: string;
  status: AdminOrderStatus;
  paymentStatus: "paid_escrow" | "released_to_tailor" | "refunded" | "pending_payment";
  disputeStatus?: "none" | "open" | "resolved";
  orderAmount: number; // PKR
  platformCommission: number; // PKR
  tailorPayout: number; // PKR
  placedDate: string;
  expectedDeliveryDate: string;
  deliveredDate?: string;
  specialInstructions?: string;
  timeline: {
    step: string;
    completed: boolean;
    date?: string;
    note?: string;
  }[];
}

export interface AdminOrderFilterParams {
  search?: string;
  status?: AdminOrderStatus | "all";
  paymentStatus?: string;
  disputeStatus?: string;
  tailorId?: string;
  customerId?: string;
  page?: number;
  limit?: number;
}

export interface UpdateOrderStatusPayload {
  status: AdminOrderStatus;
  note?: string;
  expectedDeliveryDate?: string;
  tailorId?: string;
}

export type PaymentMethod =
  | "upi"
  | "cards"
  | "net_banking"
  | "wallet"
  | "jazzcash"
  | "easypaisa"
  | "bank_transfer"
  | "credit_card"
  | "cod";

export type PaymentTransactionStatus =
  | "completed"
  | "pending"
  | "refund_requested"
  | "refunded"
  | "in_escrow"
  | "failed";

export interface AdminPaymentTransaction {
  id: string;
  transactionId: string; // e.g. "TXN123456"
  orderId: string;
  orderNumber: string; // e.g. "SD5124"
  customerId: string;
  customerName: string;
  tailorId: string;
  tailorName: string;
  method: PaymentMethod;
  amount: number; // PKR / INR
  platformFee: number;
  taxAmount: number;
  netPayout: number;
  status: PaymentTransactionStatus;
  gatewayResponseCode?: string;
  createdAt: string;
}

export interface AdminPaymentFilterParams {
  search?: string;
  type?: "all" | "payments" | "refunds" | "payouts";
  method?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface AdminPayoutRequest {
  id: string;
  payoutNumber: string;
  tailorId: string;
  tailorName: string;
  shopName: string;
  bankName: string;
  accountNumber: string;
  amount: number; // PKR
  fee: number; // PKR
  netAmount: number; // PKR
  status: "pending" | "approved" | "processed" | "rejected";
  requestedDate: string;
  processedDate?: string;
  notes?: string;
}

export interface ProcessPayoutPayload {
  action: "approve" | "reject";
  referenceNumber?: string;
  notes?: string;
}

export interface ProcessRefundPayload {
  orderId: string;
  amount: number;
  reason: string;
  refundMethod: "original_source" | "platform_credit";
}

// ---------------------------------------------------------------------------
// 6. Dispute Resolution Types
// ---------------------------------------------------------------------------
export type DisputeStatus = "open" | "under_review" | "resolved_refund" | "resolved_payout" | "dismissed";
export type DisputeReason =
  | "fitting_issue"
  | "delayed_delivery"
  | "wrong_fabric"
  | "damaged_garment"
  | "communication_failure"
  | "unresponsive_tailor";

export interface AdminDispute {
  id: string;
  disputeNumber: string; // e.g. "DSP-108"
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  tailorId: string;
  tailorName: string;
  reason: DisputeReason;
  title: string;
  customerStatement: string;
  tailorStatement?: string;
  customerEvidencePhotos: string[];
  tailorEvidencePhotos: string[];
  disputedAmount: number; // PKR
  status: DisputeStatus;
  priority: "high" | "medium" | "low";
  openedDate: string;
  resolvedDate?: string;
  adminDecisionNotes?: string;
  refundAmount?: number;
}

export interface ResolveDisputePayload {
  resolution: "refund_full" | "refund_partial" | "release_to_tailor" | "alteration_voucher" | "dismiss";
  refundAmount?: number;
  decisionNotes: string;
}

// ---------------------------------------------------------------------------
// 7. Review Moderation Types
// ---------------------------------------------------------------------------
export interface AdminReview {
  id: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  tailorId: string;
  tailorName: string;
  rating: number; // 1 to 5
  reviewTitle: string;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  status: "published" | "hidden" | "flagged";
  flagReason?: string;
  createdAt: string;
}

export interface ModerateReviewPayload {
  status: "published" | "hidden";
  moderationNotes?: string;
}

// ---------------------------------------------------------------------------
// 8. CMS & Platform Content Types
// ---------------------------------------------------------------------------
export interface AdminCMSBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  backgroundColor: string;
  isActive: boolean;
  position: "home_hero" | "announcement_top" | "tailor_promo";
  startDate?: string;
  endDate?: string;
}

export interface AdminCMSAnnouncement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "promo";
  targetAudience: "all" | "customers" | "tailors";
  isActive: boolean;
  createdAt: string;
}

export interface AdminCMSContent {
  banners: AdminCMSBanner[];
  announcements: AdminCMSAnnouncement[];
  featuredTailorIds: string[];
}

// ---------------------------------------------------------------------------
// 9. Platform Configuration & Settings Types
// ---------------------------------------------------------------------------
export interface AdminPlatformSettings {
  general: {
    platformName: string;
    supportEmail: string;
    supportPhone: string;
    currency: string;
    currencySymbol: string;
    maintenanceMode: boolean;
  };
  commission: {
    defaultRatePercent: number; // e.g. 12%
    goldTierRatePercent: number; // e.g. 9%
    platinumTierRatePercent: number; // e.g. 7%
    minimumOrderAmount: number; // PKR
  };
  payouts: {
    escrowHoldDays: number; // e.g. 3 days
    minPayoutThreshold: number; // PKR 5,000
    payoutCycle: "daily" | "weekly" | "bi_weekly" | "monthly";
    autoApprovePayoutsUnder: number; // PKR
  };
  verification: {
    autoVerifyWithCNIC: boolean;
    requireShopRegistration: boolean;
    minPortfolioItems: number;
  };
  notifications: {
    emailAlertsOnDispute: boolean;
    smsAlertsOnHighValueOrder: boolean;
    dailyDigestEmail: boolean;
    notifyAdminOnNewTailor: boolean;
  };
}

export type UpdateSettingsPayload = Partial<AdminPlatformSettings>;
