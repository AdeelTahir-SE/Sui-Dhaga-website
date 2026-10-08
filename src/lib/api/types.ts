/**
 * Sui Dhāga Universal TypeScript DTOs & API Contracts
 * Based on OpenAPI Schema v1.0.0
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: PaginationMeta;
  error?: {
    code?: string;
    message: string;
    details?: any;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code?: string;
    message: string;
    details?: any;
  };
}

// -------------------------------------------------------------
// 1. Auth & User Types
// -------------------------------------------------------------
export type UserRole = "customer" | "tailor" | "admin" | "moderator";

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  full_name?: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  avatar?: string;
  address?: string;
  bio?: string;
  city?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthSessionData {
  user?: UserProfile;
  session?: {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  } | null;
  accessToken?: string;
  refreshToken?: string;
  token?: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  role?: UserRole;
  name?: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface CompleteProfilePayload {
  role: "customer" | "tailor";
  phone?: string;
  name?: string;
  shopName?: string;
  city?: string;
  address?: string;
}

// -------------------------------------------------------------
// 2. Tailor Types
// -------------------------------------------------------------
export interface TailorService {
  id: string;
  tailor_id?: string;
  title: string;
  name?: string;
  service_name?: string;
  price: number;
  description?: string;
  category?: string;
  delivery_time_days?: number;
  created_at?: string;
}

export interface AvailabilitySlot {
  id: string;
  tailor_id?: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
  day_of_week?: string;
  start_time?: string;
  end_time?: string;
}

export interface TailorProfile {
  id: string;
  user_id?: string;
  userId?: string;
  shopName: string;
  shop_name?: string;
  name?: string;
  specialties: string[];
  city: string;
  address?: string;
  experienceYears?: number;
  experience_years?: number;
  bio?: string;
  rating?: number;
  review_count?: number;
  reviewsCount?: number;
  avatar_url?: string;
  banner_url?: string;
  bannerUrl?: string;
  is_verified?: boolean;
  isVerified?: boolean;
  is_featured?: boolean;
  isFeatured?: boolean;
  lat?: number;
  lng?: number;
  services?: TailorService[];
  availability?: AvailabilitySlot[];
  reviews?: TailorReview[];
  created_at?: string;
}

export interface TailorMapPin {
  id: string;
  shopName: string;
  name?: string;
  city: string;
  lat: number;
  lng: number;
  rating?: number;
  avatar_url?: string;
  specialties?: string[];
}

// -------------------------------------------------------------
// 3. Appointment Types
// -------------------------------------------------------------
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  customer_id?: string;
  customerId?: string;
  tailor_id?: string;
  tailorId?: string;
  service_id?: string;
  serviceId?: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  notes?: string;
  tailor?: Partial<TailorProfile>;
  customer?: Partial<UserProfile>;
  service?: Partial<TailorService>;
  created_at?: string;
  updated_at?: string;
}

export interface BookAppointmentPayload {
  tailorId: string;
  serviceId?: string;
  date?: string;
  time?: string;
  appointment_date?: string;
  appointment_time?: string;
  notes?: string;
}

// -------------------------------------------------------------
// 4. Order Types
// -------------------------------------------------------------
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "cutting"
  | "stitching"
  | "quality_check"
  | "ready"
  | "shipped"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  customer_id?: string;
  customerId?: string;
  tailor_id: string;
  tailorId?: string;
  service_id?: string;
  serviceId?: string;
  design_id?: string;
  designId?: string;
  measurement_id?: string;
  measurementId?: string;
  status: OrderStatus;
  amount: number;
  total_price?: number;
  totalPrice?: number;
  total_amount?: number;
  estimated_delivery_date?: string;
  delivery_date?: string;
  notes?: string;
  tracking_number?: string;
  trackingNumber?: string;
  tailor?: Partial<TailorProfile>;
  customer?: Partial<UserProfile>;
  design?: Partial<Design>;
  measurements?: Partial<MeasurementProfile>;
  service?: Partial<TailorService>;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderPayload {
  tailorId: string;
  serviceId?: string;
  designId?: string;
  measurementId?: string;
  notes?: string;
  amount?: number;
}

// -------------------------------------------------------------
// 5. Measurement Types
// -------------------------------------------------------------
export interface MeasurementProfile {
  id: string;
  user_id?: string;
  title: string;
  profile_name?: string;
  profileName?: string;
  unit: "in" | "cm";
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  sleeveLength?: number;
  sleeve_length?: number;
  inseam?: number;
  neck?: number;
  height?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// -------------------------------------------------------------
// 6. Design Types
// -------------------------------------------------------------
export interface Design {
  id: string;
  user_id?: string;
  title: string;
  prompt?: string;
  preview_url?: string;
  previewUrl?: string;
  image_url?: string;
  category?: string;
  fabric_type?: string;
  color?: string;
  customization_options?: Record<string, any>;
  tags?: string[];
  created_at?: string;
}

// -------------------------------------------------------------
// 7. Conversation & Message Types
// -------------------------------------------------------------
export interface MessageAttachment {
  id?: string;
  url: string;
  fileType?: string;
  fileName?: string;
  size?: number;
}

export interface ChatMessage {
  id: string;
  conversation_id?: string;
  conversationId?: string;
  sender_id?: string;
  senderId?: string;
  text?: string;
  message?: string;
  attachments?: string[] | MessageAttachment[];
  is_read?: boolean;
  read_status?: boolean;
  isRead?: boolean;
  created_at?: string;
}

export interface Conversation {
  id: string;
  tailor_id: string;
  tailorId?: string;
  client_id: string;
  clientId?: string;
  last_message?: string | { text?: string; message?: string };
  lastMessage?: string | { text?: string; message?: string };
  unread_count?: number;
  unreadCount?: number;
  updated_at?: string;
  tailor?: Partial<TailorProfile>;
  client?: Partial<UserProfile>;
  customer?: Partial<UserProfile>;
  participant?: Partial<UserProfile>;
  messages?: ChatMessage[];
}

// -------------------------------------------------------------
// 8. Community Types
// -------------------------------------------------------------
export interface CommunityComment {
  id: string;
  post_id?: string;
  user_id?: string;
  author_name?: string;
  author_avatar?: string;
  user?: Partial<UserProfile>;
  content: string;
  created_at?: string;
}

export interface CommunityPost {
  id: string;
  user_id?: string;
  author_name?: string;
  author_avatar?: string;
  author?: Partial<UserProfile>;
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
  likes_count?: number;
  likesCount?: number;
  comments_count?: number;
  commentsCount?: number;
  saves_count?: number;
  savesCount?: number;
  is_liked?: boolean;
  isLiked?: boolean;
  is_saved?: boolean;
  isSaved?: boolean;
  comments?: CommunityComment[];
  created_at?: string;
}

// -------------------------------------------------------------
// 9. Review Types
// -------------------------------------------------------------
export interface TailorReview {
  id: string;
  tailor_id?: string;
  order_id?: string;
  user_id?: string;
  author_name?: string;
  author_avatar?: string;
  rating: number;
  comment?: string;
  images?: string[];
  created_at?: string;
}

// -------------------------------------------------------------
// 10. Notification Types
// -------------------------------------------------------------
export interface AppNotification {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  type?: string;
  link_url?: string;
  linkUrl?: string;
  is_read: boolean;
  isRead?: boolean;
  created_at?: string;
}
