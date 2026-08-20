/**
 * Sui Dhāga Admin Portal - Mock Data Store & Persistence Engine
 * -------------------------------------------------------------
 * Provides realistic Pakistani tailoring datasets, localStorage persistence,
 * and CRUD operations for all administration domains.
 */

import {
  AdminStats,
  RevenueDataPoint,
  AdminActivityItem,
  AdminUser,
  AdminTailor,
  AdminOrder,
  AdminPaymentTransaction,
  AdminPayoutRequest,
  AdminDispute,
  AdminReview,
  AdminCMSContent,
  AdminPlatformSettings
} from "./api/admin-types";

// Storage Keys
const STORAGE_PREFIX = "sui_dhaga_admin_";
const KEY_STATS = `${STORAGE_PREFIX}stats`;
const KEY_REVENUE = `${STORAGE_PREFIX}revenue`;
const KEY_ACTIVITIES = `${STORAGE_PREFIX}activities`;
const KEY_USERS = `${STORAGE_PREFIX}users`;
const KEY_TAILORS = `${STORAGE_PREFIX}tailors`;
const KEY_ORDERS = `${STORAGE_PREFIX}orders`;
const KEY_PAYMENTS = `${STORAGE_PREFIX}payments`;
const KEY_PAYOUTS = `${STORAGE_PREFIX}payouts`;
const KEY_DISPUTES = `${STORAGE_PREFIX}disputes`;
const KEY_REVIEWS = `${STORAGE_PREFIX}reviews`;
const KEY_CMS = `${STORAGE_PREFIX}cms`;
const KEY_SETTINGS = `${STORAGE_PREFIX}settings`;

// ---------------------------------------------------------------------------
// Initial Seed Data
// ---------------------------------------------------------------------------

export const initialAdminStats: AdminStats = {
  totalUsers: 12845,
  usersGrowth: "↑ 12.5% vs last week",
  totalTailors: 2341,
  tailorsGrowth: "↑ 8.4% vs last week",
  totalOrders: 5672,
  ordersGrowth: "↑ 15.6% vs last week",
  totalRevenue: 45788320,
  revenueFormatted: "Rs 45,78,320",
  revenueGrowth: "↑ 18.3% vs last week",
  activeUsers: 8512,
  ordersInProgress: 1243,
  pendingVerifications: 34,
  openDisputes: 12,
  escrowBalance: 2450000,
  monthlyCommission: 549398
};

export const initialRevenueChartData: RevenueDataPoint[] = [
  { date: "2024-05-20", label: "20 May", revenue: 120000, ordersCount: 142, commission: 14400 },
  { date: "2024-05-21", label: "21 May", revenue: 280000, ordersCount: 210, commission: 33600 },
  { date: "2024-05-22", label: "22 May", revenue: 640000, ordersCount: 380, commission: 76800 },
  { date: "2024-05-23", label: "23 May", revenue: 580000, ordersCount: 340, commission: 69600 },
  { date: "2024-05-24", label: "24 May", revenue: 760000, ordersCount: 450, commission: 91200 },
  { date: "2024-05-25", label: "25 May", revenue: 740000, ordersCount: 430, commission: 88800 },
  { date: "2024-05-26", label: "26 May", revenue: 1180000, ordersCount: 680, commission: 141600 }
];

export const initialRecentActivities: AdminActivityItem[] = [
  {
    id: "act-1",
    type: "user",
    title: "New customer registered",
    description: "Ayesha Khan joined from Lahore, Punjab",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    timeAgo: "2 mins ago"
  },
  {
    id: "act-2",
    type: "tailor",
    title: "Tailor application submitted",
    description: "Master Aslam (Anarkali Lahore) uploaded CNIC & Shop license",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    timeAgo: "15 mins ago"
  },
  {
    id: "act-3",
    type: "order",
    title: "New bridal order placed",
    description: "Order #SD-5124 placed for Rs 85,000 (Bridal Lehenga)",
    timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    timeAgo: "28 mins ago"
  },
  {
    id: "act-4",
    type: "payment",
    title: "Payment secured in escrow",
    description: "Rs 85,000 received via JazzCash for Order #SD-5124",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    timeAgo: "45 mins ago"
  },
  {
    id: "act-5",
    type: "dispute",
    title: "New dispute opened",
    description: "Order #SD-4981: Customer reported fitting issue on Sherwani",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    timeAgo: "1 hr ago"
  },
  {
    id: "act-6",
    type: "review",
    title: "5-Star Review received",
    description: "Zainab R. reviewed Rekha Couture: 'Flawless stitching!'",
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    timeAgo: "1.5 hrs ago"
  }
];

export const initialUsers: AdminUser[] = [
  {
    id: "usr-1",
    name: "Ayesha Khan",
    username: "@ayeshakhan",
    email: "ayesha.khan@email.com",
    phone: "+92 98765 43210",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "active",
    city: "Lahore",
    address: "Gulberg III, Main Boulevard, Lahore",
    joinedDate: "20 May 2024",
    ordersCount: 8,
    totalSpent: 142500,
    lastActive: "10 mins ago",
    isEmailVerified: true,
    notes: "VIP Customer. Prefers premium silk fabrics."
  },
  {
    id: "usr-2",
    name: "Rahul Verma",
    username: "@rahulverma",
    email: "rahul.verma@email.com",
    phone: "+92 91234 56789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "active",
    city: "Karachi",
    address: "DHA Phase 5, Karachi",
    joinedDate: "19 May 2024",
    ordersCount: 4,
    totalSpent: 48000,
    lastActive: "1 hour ago",
    isEmailVerified: true
  },
  {
    id: "usr-3",
    name: "Stitch Craft",
    username: "@stitchcraft",
    email: "stitchcraft@email.com",
    phone: "+92 99887 66554",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    role: "tailor",
    status: "active",
    city: "Faisalabad",
    address: "Katchery Bazaar, Faisalabad",
    joinedDate: "18 May 2024",
    ordersCount: 92,
    totalSpent: 0,
    lastActive: "2 hours ago",
    isEmailVerified: true,
    notes: "Verified master tailor studio."
  },
  {
    id: "usr-4",
    name: "Neha Sharma",
    username: "@nehasharma",
    email: "neha.sharma@email.com",
    phone: "+92 97654 32109",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "blocked",
    city: "Islamabad",
    address: "F-10 Markaz, Islamabad",
    joinedDate: "18 May 2024",
    ordersCount: 2,
    totalSpent: 16000,
    lastActive: "2 days ago",
    isEmailVerified: true,
    notes: "Temporarily blocked due to repeated order disputes."
  },
  {
    id: "usr-5",
    name: "Arjun Tailors",
    username: "@arjuntailors",
    email: "arjun.tailors@email.com",
    phone: "+92 90001 23456",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    role: "tailor",
    status: "active",
    city: "Lahore",
    address: "Shop 14, Anarkali Bazaar, Lahore",
    joinedDate: "17 May 2024",
    ordersCount: 148,
    totalSpent: 0,
    lastActive: "30 mins ago",
    isEmailVerified: true,
    notes: "Gold tier artisan boutique."
  },
  {
    id: "usr-6",
    name: "Meera Iyer",
    username: "@meeraiyer",
    email: "meera.iyer@email.com",
    phone: "+92 88090 11223",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "active",
    city: "Rawalpindi",
    address: "Bahria Town Phase 4, Rawalpindi",
    joinedDate: "17 May 2024",
    ordersCount: 5,
    totalSpent: 62000,
    lastActive: "Yesterday",
    isEmailVerified: true
  },
  {
    id: "usr-7",
    name: "Design Lover",
    username: "@designlover",
    email: "design.lover@email.com",
    phone: "+92 77665 44321",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "blocked",
    city: "Peshawar",
    address: "University Town, Peshawar",
    joinedDate: "16 May 2024",
    ordersCount: 1,
    totalSpent: 8500,
    lastActive: "4 days ago",
    isEmailVerified: false,
    notes: "Blocked due to policy violation."
  },
  {
    id: "usr-8",
    name: "Tailor Pro",
    username: "@tailorpro",
    email: "tailorpro@email.com",
    phone: "+92 86543 21098",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    role: "tailor",
    status: "active",
    city: "Multan",
    address: "Hussain Agahi Bazaar, Multan",
    joinedDate: "15 May 2024",
    ordersCount: 64,
    totalSpent: 0,
    lastActive: "4 hours ago",
    isEmailVerified: true
  },
  {
    id: "usr-9",
    name: "Fatima Noor",
    username: "@fatimanoor",
    email: "fatima.noor@email.com",
    phone: "+92 333 9876543",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "active",
    city: "Karachi",
    address: "Clifton Block 4, Karachi",
    joinedDate: "14 May 2024",
    ordersCount: 4,
    totalSpent: 68000,
    lastActive: "2 hours ago",
    isEmailVerified: true
  },
  {
    id: "usr-10",
    name: "Adeel Tahir",
    username: "@adeeltahir",
    email: "admin@suidhaga.pk",
    phone: "+92 301 0000000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    role: "admin",
    status: "active",
    city: "Islamabad",
    address: "F-7 Markaz, Islamabad",
    joinedDate: "01 Jan 2024",
    ordersCount: 0,
    totalSpent: 0,
    lastActive: "Just now",
    isEmailVerified: true,
    notes: "Super Administrator"
  },
  {
    id: "usr-11",
    name: "Sana Javed",
    username: "@sanajaved",
    email: "sana.javed@email.com",
    phone: "+92 302 1122334",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "active",
    city: "Lahore",
    address: "Model Town, Lahore",
    joinedDate: "12 May 2024",
    ordersCount: 6,
    totalSpent: 92000,
    lastActive: "3 hours ago",
    isEmailVerified: true
  },
  {
    id: "usr-12",
    name: "Zoya Ali",
    username: "@zoyaali",
    email: "zoya.ali@email.com",
    phone: "+92 311 9988776",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "active",
    city: "Karachi",
    address: "PECHS Block 2, Karachi",
    joinedDate: "10 May 2024",
    ordersCount: 3,
    totalSpent: 34000,
    lastActive: "5 hours ago",
    isEmailVerified: true
  },
  {
    id: "usr-13",
    name: "Master Muhammad Aslam",
    username: "@masteraslam",
    email: "aslam.tailors@email.com",
    phone: "+92 321 7654321",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    role: "tailor",
    status: "active",
    city: "Lahore",
    address: "Shop 42, Anarkali Bazaar, Lahore",
    joinedDate: "08 May 2024",
    ordersCount: 142,
    totalSpent: 0,
    lastActive: "10 mins ago",
    isEmailVerified: true
  },
  {
    id: "usr-14",
    name: "Rekha Jamil",
    username: "@rekhajamil",
    email: "rekha.bridal@email.com",
    phone: "+92 300 8765432",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    role: "tailor",
    status: "active",
    city: "Karachi",
    address: "Zamzama Lane 5, DHA, Karachi",
    joinedDate: "05 May 2024",
    ordersCount: 310,
    totalSpent: 0,
    lastActive: "15 mins ago",
    isEmailVerified: true
  },
  {
    id: "usr-15",
    name: "Bilal Tariq",
    username: "@bilaltariq",
    email: "bilal.tariq@email.com",
    phone: "+92 312 4567890",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    role: "tailor",
    status: "pending",
    city: "Faisalabad",
    address: "Katchery Bazaar, Faisalabad",
    joinedDate: "03 May 2024",
    ordersCount: 0,
    totalSpent: 0,
    lastActive: "1 day ago",
    isEmailVerified: true
  },
  {
    id: "usr-16",
    name: "Usman Ghani",
    username: "@usmanghani",
    email: "usman.ghani@email.com",
    phone: "+92 302 9988776",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    role: "customer",
    status: "blocked",
    city: "Peshawar",
    address: "University Road, Peshawar",
    joinedDate: "01 May 2024",
    ordersCount: 1,
    totalSpent: 12000,
    lastActive: "3 days ago",
    isEmailVerified: false,
    notes: "Blocked due to fraudulent chargeback attempts."
  }
];

export const initialTailors: AdminTailor[] = [
  {
    id: "tlr-1",
    userId: "usr-3",
    username: "@stitchcraft",
    shopName: "Stitch Craft Studio",
    ownerName: "Stitch Craft",
    email: "stitchcraft@email.com",
    phone: "+91 99887 66554",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    city: "Jaipur",
    province: "Rajasthan",
    address: "Johari Bazaar, Jaipur, Rajasthan",
    experienceYears: 12,
    specialties: ["Lehengas", "Anarkali Suits", "Bridal Wear"],
    verificationStatus: "verified",
    accountStatus: "active",
    verificationNotes: "Verified via GSTIN and shop registration certificate.",
    documents: [
      { id: "doc-1", title: "GSTIN Certificate", type: "shop_registration", url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80", verified: true },
      { id: "doc-2", title: "Aadhaar Card Front", type: "cnic_front", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80", verified: true }
    ],
    rating: 4.8,
    reviewsCount: 94,
    completedOrders: 220,
    activeOrders: 8,
    totalEarnings: 1240000,
    commissionTier: "gold",
    commissionRate: 10,
    isFeatured: true,
    joinedDate: "18 May 2024",
    bankDetails: { bankName: "HDFC Bank", accountTitle: "Stitch Craft Studio", accountNumber: "50200012345678", iban: "IN89604700040912345678" }
  },
  {
    id: "tlr-2",
    userId: "usr-14",
    username: "@rekhatailors",
    shopName: "Rekha Tailors",
    ownerName: "Rekha Jamil",
    email: "rekha.tailors@email.com",
    phone: "+91 98765 11223",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    city: "Mumbai",
    province: "Maharashtra",
    address: "Colaba Causeway, Mumbai, Maharashtra",
    experienceYears: 18,
    specialties: ["Bridal Lehengas", "Saree Blouses", "Designer Gowns"],
    verificationStatus: "pending",
    accountStatus: "active",
    verificationNotes: "Business utility bill document under review.",
    documents: [
      { id: "doc-3", title: "Aadhaar Card Copy", type: "cnic_front", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80", verified: false }
    ],
    rating: 4.6,
    reviewsCount: 68,
    completedOrders: 185,
    activeOrders: 12,
    totalEarnings: 2380000,
    commissionTier: "platinum",
    commissionRate: 8,
    isFeatured: true,
    joinedDate: "19 May 2024"
  },
  {
    id: "tlr-3",
    userId: "usr-5",
    username: "@arjuntailors",
    shopName: "Arjun Tailors",
    ownerName: "Arjun Tailors",
    email: "arjun.tailors@email.com",
    phone: "+91 90001 23456",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    city: "Bengaluru",
    province: "Karnataka",
    address: "Chickpet, Bengaluru, Karnataka",
    experienceYears: 9,
    specialties: ["Kurta Pajamas", "Formal Sherwanis", "Wedding Wear"],
    verificationStatus: "pending",
    accountStatus: "active",
    verificationNotes: "GST documents under administrative verification.",
    documents: [
      { id: "doc-5", title: "GST Registration", type: "shop_registration", url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80", verified: false }
    ],
    rating: 4.4,
    reviewsCount: 42,
    completedOrders: 98,
    activeOrders: 5,
    totalEarnings: 640000,
    commissionTier: "gold",
    commissionRate: 10,
    isFeatured: false,
    joinedDate: "17 May 2024"
  },
  {
    id: "tlr-4",
    userId: "usr-13",
    username: "@needleandthread",
    shopName: "Needle & Thread",
    ownerName: "Kavita Mehta",
    email: "needle.thread@email.com",
    phone: "+91 98112 44556",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
    city: "Delhi",
    province: "Delhi",
    address: "Lajpat Nagar Market, New Delhi",
    experienceYears: 14,
    specialties: ["Salwar Kameez", "Kurti Designs", "Embroidery Work"],
    verificationStatus: "verified",
    accountStatus: "active",
    verificationNotes: "Fully verified. Long-standing partner boutique.",
    documents: [
      { id: "doc-6", title: "GSTIN & PAN Card", type: "shop_registration", url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80", verified: true },
      { id: "doc-7", title: "Aadhaar Front", type: "cnic_front", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80", verified: true }
    ],
    rating: 4.9,
    reviewsCount: 130,
    completedOrders: 312,
    activeOrders: 10,
    totalEarnings: 3150000,
    commissionTier: "platinum",
    commissionRate: 8,
    isFeatured: true,
    joinedDate: "16 May 2024",
    bankDetails: { bankName: "State Bank of India", accountTitle: "Needle & Thread", accountNumber: "10002345678901", iban: "IN89SBI0012345678901" }
  },
  {
    id: "tlr-5",
    userId: "usr-8",
    username: "@perfectfit",
    shopName: "Perfect Fit Studio",
    ownerName: "Priya Iyer",
    email: "perfectfit.studio@email.com",
    phone: "+91 88076 33221",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    city: "Chennai",
    province: "Tamil Nadu",
    address: "T. Nagar, Chennai, Tamil Nadu",
    experienceYears: 7,
    specialties: ["Churidars", "Pattu Sarees", "Modern Fusion Wear"],
    verificationStatus: "rejected",
    accountStatus: "inactive",
    verificationNotes: "Documents submitted were expired. Requested resubmission.",
    documents: [
      { id: "doc-8", title: "Driving License (Expired)", type: "cnic_front", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80", verified: false }
    ],
    rating: 3.8,
    reviewsCount: 22,
    completedOrders: 45,
    activeOrders: 0,
    totalEarnings: 280000,
    commissionTier: "standard",
    commissionRate: 12,
    isFeatured: false,
    joinedDate: "15 May 2024"
  },
  {
    id: "tlr-6",
    userId: "usr-11",
    username: "@stylemakers",
    shopName: "Style Makers",
    ownerName: "Sneha Das",
    email: "stylemakers.wb@email.com",
    phone: "+91 77012 88990",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&auto=format&fit=crop&q=80",
    city: "Kolkata",
    province: "West Bengal",
    address: "New Market, Kolkata, West Bengal",
    experienceYears: 11,
    specialties: ["Bengali Sarees", "Blouse Designs", "Party Wear"],
    verificationStatus: "verified",
    accountStatus: "active",
    verificationNotes: "Verified via Udyam registration.",
    documents: [
      { id: "doc-9", title: "Udyam Registration", type: "shop_registration", url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80", verified: true }
    ],
    rating: 4.7,
    reviewsCount: 86,
    completedOrders: 175,
    activeOrders: 7,
    totalEarnings: 980000,
    commissionTier: "gold",
    commissionRate: 10,
    isFeatured: false,
    joinedDate: "14 May 2024"
  },
  {
    id: "tlr-7",
    userId: "usr-12",
    username: "@ethnicstitches",
    shopName: "Ethnic Stitches",
    ownerName: "Nafisa Begum",
    email: "ethnic.stitches@email.com",
    phone: "+91 93451 77889",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    city: "Lucknow",
    province: "Uttar Pradesh",
    address: "Hazratganj, Lucknow, Uttar Pradesh",
    experienceYears: 16,
    specialties: ["Chikankari Kurtas", "Lucknowi Suits", "Zardozi Work"],
    verificationStatus: "pending",
    accountStatus: "active",
    verificationNotes: "Awaiting Chikankari artisan certification.",
    documents: [
      { id: "doc-10", title: "Artisan Certificate (pending)", type: "cnic_front", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80", verified: false }
    ],
    rating: 4.5,
    reviewsCount: 58,
    completedOrders: 130,
    activeOrders: 9,
    totalEarnings: 760000,
    commissionTier: "gold",
    commissionRate: 10,
    isFeatured: false,
    joinedDate: "13 May 2024"
  }
];


export const initialOrders: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "SD5124",
    customerId: "usr-1",
    customerName: "Ayesha Khan",
    customerEmail: "ayesha.khan@email.com",
    customerPhone: "+91 98765 43210",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    customerCity: "Jaipur",
    tailorId: "tlr-1",
    tailorName: "Stitch Craft",
    tailorShop: "Stitch Craft",
    itemTitle: "Hand-Embroidered Velvet Anarkali Suit",
    category: "Bridal",
    fabricDetails: {
      providedBy: "tailor",
      fabricType: "Pure Micro-Velvet with Resham Work",
      color: "Deep Crimson Red",
      lengthMeters: 5.5
    },
    measurements: [
      { key: "bust", label: "Chest / Bust", value: 36, unit: "inches" },
      { key: "waist", label: "Waist", value: 28, unit: "inches" },
      { key: "hips", label: "Hips", value: 39, unit: "inches" },
      { key: "shoulder", label: "Shoulder Width", value: 15, unit: "inches" },
      { key: "length", label: "Suit Length", value: 48, unit: "inches" }
    ],
    referenceImageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    status: "stitching",
    paymentStatus: "paid_escrow",
    disputeStatus: "none",
    orderAmount: 12500,
    platformCommission: 1250, // 10%
    tailorPayout: 11250,
    placedDate: "20 May 2024",
    expectedDeliveryDate: "05 Jun 2024",
    specialInstructions: "Double inner lining required for heavy embroidery.",
    timeline: [
      { step: "Order Placed & Escrow Secured", completed: true, date: "20 May 2024", note: "₹12,500 held in platform escrow" },
      { step: "Measurements Confirmed", completed: true, date: "21 May 2024", note: "3D Scan verified" },
      { step: "Fabric & Work Sourcing", completed: true, date: "22 May 2024" },
      { step: "Hand Stitching & Embroidery", completed: true, date: "24 May 2024", note: "In progress at boutique workshop" },
      { step: "Quality Inspection (QC)", completed: false },
      { step: "Dispatched / Delivery", completed: false }
    ]
  },
  {
    id: "ord-2",
    orderNumber: "SD5123",
    customerId: "usr-2",
    customerName: "Rahul Verma",
    customerEmail: "rahul.verma@email.com",
    customerPhone: "+91 91234 56789",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    customerCity: "Mumbai",
    tailorId: "tlr-2",
    tailorName: "Rekha Jamil",
    tailorShop: "Rekha Tailors",
    itemTitle: "Silk Kurta & Pajama with Nehru Collar",
    category: "Formal",
    fabricDetails: {
      providedBy: "customer",
      fabricType: "Raw Mulberry Silk",
      color: "Pistachio Sage",
      lengthMeters: 4.5
    },
    measurements: [
      { key: "chest", label: "Chest", value: 40, unit: "inches" },
      { key: "waist", label: "Waist", value: 34, unit: "inches" },
      { key: "length", label: "Kurta Length", value: 42, unit: "inches" }
    ],
    referenceImageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    status: "completed",
    paymentStatus: "released_to_tailor",
    disputeStatus: "none",
    orderAmount: 8700,
    platformCommission: 696,
    tailorPayout: 8004,
    placedDate: "20 May 2024",
    expectedDeliveryDate: "28 May 2024",
    deliveredDate: "27 May 2024",
    timeline: [
      { step: "Order Placed", completed: true, date: "20 May 2024" },
      { step: "Fabric Received", completed: true, date: "21 May 2024" },
      { step: "Stitching Completed", completed: true, date: "25 May 2024" },
      { step: "Delivered Successfully", completed: true, date: "27 May 2024" },
      { step: "Funds Released", completed: true, date: "28 May 2024" }
    ]
  },
  {
    id: "ord-3",
    orderNumber: "SD5122",
    customerId: "usr-4",
    customerName: "Neha Sharma",
    customerEmail: "neha.sharma@email.com",
    customerPhone: "+91 97654 32109",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    customerCity: "Bengaluru",
    tailorId: "tlr-3",
    tailorName: "Arjun Tailors",
    tailorShop: "Arjun Tailors",
    itemTitle: "Zardozi Embroidered Bridal Lehenga",
    category: "Bridal",
    fabricDetails: {
      providedBy: "tailor",
      fabricType: "Silk Organza & Brocade",
      color: "Rose Gold & Ruby",
      lengthMeters: 6.0
    },
    measurements: [
      { key: "bust", label: "Bust", value: 34, unit: "inches" },
      { key: "waist", label: "Waist", value: 27, unit: "inches" },
      { key: "lehengaLength", label: "Lehenga Length", value: 42, unit: "inches" }
    ],
    referenceImageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    status: "pending_approval",
    paymentStatus: "paid_escrow",
    disputeStatus: "open",
    orderAmount: 15000,
    platformCommission: 1500,
    tailorPayout: 13500,
    placedDate: "19 May 2024",
    expectedDeliveryDate: "10 Jun 2024",
    specialInstructions: "Customer raised dispute regarding fabric shade mismatch before cutting.",
    timeline: [
      { step: "Order Placed", completed: true, date: "19 May 2024" },
      { step: "Dispute Opened by Customer", completed: true, date: "20 May 2024", note: "Awaiting admin arbitration" },
      { step: "Production On Hold", completed: true, date: "20 May 2024" }
    ]
  },
  {
    id: "ord-4",
    orderNumber: "SD5121",
    customerId: "usr-6",
    customerName: "Meera Iyer",
    customerEmail: "meera.iyer@email.com",
    customerPhone: "+91 88090 11223",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    customerCity: "Delhi",
    tailorId: "tlr-4",
    tailorName: "Needle & Thread",
    tailorShop: "Needle & Thread",
    itemTitle: "Cotton Salwar Suit with Chikankari Dupatta",
    category: "Casual",
    fabricDetails: {
      providedBy: "tailor",
      fabricType: "Pure Chanderi Cotton",
      color: "Pastel Lavender",
      lengthMeters: 4.5
    },
    measurements: [
      { key: "bust", label: "Bust", value: 35, unit: "inches" },
      { key: "waist", label: "Waist", value: 29, unit: "inches" },
      { key: "length", label: "Length", value: 44, unit: "inches" }
    ],
    status: "completed",
    paymentStatus: "released_to_tailor",
    disputeStatus: "none",
    orderAmount: 6300,
    platformCommission: 504,
    tailorPayout: 5796,
    placedDate: "19 May 2024",
    expectedDeliveryDate: "27 May 2024",
    deliveredDate: "26 May 2024",
    timeline: [
      { step: "Order Placed", completed: true, date: "19 May 2024" },
      { step: "Stitching & Finishing", completed: true, date: "23 May 2024" },
      { step: "Delivered", completed: true, date: "26 May 2024" },
      { step: "Escrow Released", completed: true, date: "27 May 2024" }
    ]
  },
  {
    id: "ord-5",
    orderNumber: "SD5120",
    customerId: "usr-7",
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@email.com",
    customerPhone: "+91 99112 33445",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    customerCity: "Kolkata",
    tailorId: "tlr-6",
    tailorName: "Style Makers",
    tailorShop: "Style Makers",
    itemTitle: "Tailored Nehru Jacket with Hand-Crafted Buttons",
    category: "Formal",
    fabricDetails: {
      providedBy: "tailor",
      fabricType: "Raw Tussar Silk",
      color: "Midnight Blue",
      lengthMeters: 2.5
    },
    measurements: [
      { key: "chest", label: "Chest", value: 42, unit: "inches" },
      { key: "waist", label: "Waist", value: 36, unit: "inches" },
      { key: "jacketLength", label: "Jacket Length", value: 29, unit: "inches" }
    ],
    status: "cutting",
    paymentStatus: "paid_escrow",
    disputeStatus: "none",
    orderAmount: 9800,
    platformCommission: 980,
    tailorPayout: 8820,
    placedDate: "18 May 2024",
    expectedDeliveryDate: "02 Jun 2024",
    timeline: [
      { step: "Order Placed", completed: true, date: "18 May 2024" },
      { step: "Measurements Confirmed", completed: true, date: "19 May 2024" },
      { step: "Pattern Cutting", completed: true, date: "21 May 2024" },
      { step: "Stitching", completed: false }
    ]
  },
  {
    id: "ord-6",
    orderNumber: "SD5119",
    customerId: "usr-8",
    customerName: "Pooja Mehta",
    customerEmail: "pooja.mehta@email.com",
    customerPhone: "+91 98334 55667",
    customerAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80",
    customerCity: "Jaipur",
    tailorId: "tlr-1",
    tailorName: "Stitch Craft",
    tailorShop: "Stitch Craft",
    itemTitle: "Festive Organza Sharara Set with Gota Patti",
    category: "Festive",
    fabricDetails: {
      providedBy: "tailor",
      fabricType: "Pure Silk Organza & Satin",
      color: "Mustard Yellow & Gold",
      lengthMeters: 5.0
    },
    measurements: [
      { key: "bust", label: "Bust", value: 36, unit: "inches" },
      { key: "waist", label: "Waist", value: 30, unit: "inches" },
      { key: "shararaLength", label: "Sharara Length", value: 40, unit: "inches" }
    ],
    status: "pending_approval",
    paymentStatus: "paid_escrow",
    disputeStatus: "none",
    orderAmount: 10200,
    platformCommission: 1020,
    tailorPayout: 9180,
    placedDate: "18 May 2024",
    expectedDeliveryDate: "04 Jun 2024",
    timeline: [
      { step: "Order Placed", completed: true, date: "18 May 2024" },
      { step: "Awaiting Tailor Confirmation", completed: false }
    ]
  },
  {
    id: "ord-7",
    orderNumber: "SD5118",
    customerId: "usr-9",
    customerName: "Karan Malhotra",
    customerEmail: "karan.malhotra@email.com",
    customerPhone: "+91 98450 11223",
    customerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    customerCity: "Chennai",
    tailorId: "tlr-5",
    tailorName: "Perfect Fit Studio",
    tailorShop: "Perfect Fit Studio",
    itemTitle: "Linen Tuxedo Waistcoat & Trousers",
    category: "Formal",
    fabricDetails: {
      providedBy: "customer",
      fabricType: "Pure Irish Linen",
      color: "Ivory Cream",
      lengthMeters: 3.5
    },
    measurements: [
      { key: "chest", label: "Chest", value: 38, unit: "inches" },
      { key: "waist", label: "Waist", value: 32, unit: "inches" }
    ],
    status: "cancelled",
    paymentStatus: "refunded",
    disputeStatus: "none",
    orderAmount: 7600,
    platformCommission: 0,
    tailorPayout: 0,
    placedDate: "17 May 2024",
    expectedDeliveryDate: "28 May 2024",
    timeline: [
      { step: "Order Placed", completed: true, date: "17 May 2024" },
      { step: "Order Cancelled by Customer", completed: true, date: "18 May 2024", note: "100% refund credited" }
    ]
  },
  {
    id: "ord-8",
    orderNumber: "SD5117",
    customerId: "usr-10",
    customerName: "Ananya Das",
    customerEmail: "ananya.das@email.com",
    customerPhone: "+91 97480 99887",
    customerAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&auto=format&fit=crop&q=80",
    customerCity: "Mumbai",
    tailorId: "tlr-2",
    tailorName: "Rekha Jamil",
    tailorShop: "Rekha Tailors",
    itemTitle: "Banarasi Silk Saree Designer Blouse with Latkans",
    category: "Bridal",
    fabricDetails: {
      providedBy: "tailor",
      fabricType: "Banarasi Katan Silk with Zari",
      color: "Emerald Green",
      lengthMeters: 1.5
    },
    measurements: [
      { key: "bust", label: "Bust", value: 34, unit: "inches" },
      { key: "underbust", label: "Underbust", value: 29, unit: "inches" },
      { key: "blouseLength", label: "Blouse Length", value: 14.5, unit: "inches" },
      { key: "sleeveLength", label: "Sleeve Length", value: 10.5, unit: "inches" }
    ],
    status: "stitching",
    paymentStatus: "paid_escrow",
    disputeStatus: "open",
    orderAmount: 11400,
    platformCommission: 912,
    tailorPayout: 10488,
    placedDate: "17 May 2024",
    expectedDeliveryDate: "01 Jun 2024",
    specialInstructions: "Customer disputed neck depth cut. Tailor providing replacement fabric.",
    timeline: [
      { step: "Order Placed", completed: true, date: "17 May 2024" },
      { step: "Stitching Initiated", completed: true, date: "19 May 2024" },
      { step: "Dispute Opened by Customer", completed: true, date: "21 May 2024", note: "Neck cut alteration requested" }
    ]
  }
];

export const initialTransactions: AdminPaymentTransaction[] = [
  {
    id: "txn-1",
    transactionId: "TXN123456",
    orderId: "ord-1",
    orderNumber: "SD5124",
    customerId: "usr-1",
    customerName: "Ayesha Khan",
    tailorId: "tlr-1",
    tailorName: "Stitch Craft",
    method: "upi",
    amount: 12500,
    platformFee: 1250,
    taxAmount: 225,
    netPayout: 11025,
    status: "completed",
    gatewayResponseCode: "UPI_SUCCESS_00",
    createdAt: "20 May 2024, 10:30 AM"
  },
  {
    id: "txn-2",
    transactionId: "TXN123455",
    orderId: "ord-2",
    orderNumber: "SD5123",
    customerId: "usr-2",
    customerName: "Rahul Verma",
    tailorId: "tlr-2",
    tailorName: "Rekha Tailors",
    method: "cards",
    amount: 8700,
    platformFee: 696,
    taxAmount: 156,
    netPayout: 7848,
    status: "completed",
    gatewayResponseCode: "CARD_AUTH_OK",
    createdAt: "20 May 2024, 08:45 AM"
  },
  {
    id: "txn-3",
    transactionId: "TXN123454",
    orderId: "ord-3",
    orderNumber: "SD5122",
    customerId: "usr-4",
    customerName: "Neha Sharma",
    tailorId: "tlr-3",
    tailorName: "Arjun Tailors",
    method: "upi",
    amount: 15000,
    platformFee: 1500,
    taxAmount: 270,
    netPayout: 13230,
    status: "completed",
    gatewayResponseCode: "UPI_SUCCESS_00",
    createdAt: "19 May 2024, 08:15 PM"
  },
  {
    id: "txn-4",
    transactionId: "TXN123453",
    orderId: "ord-4",
    orderNumber: "SD5121",
    customerId: "usr-6",
    customerName: "Meera Iyer",
    tailorId: "tlr-4",
    tailorName: "Needle & Thread",
    method: "net_banking",
    amount: 6300,
    platformFee: 504,
    taxAmount: 113,
    netPayout: 5683,
    status: "refund_requested",
    gatewayResponseCode: "REFUND_INITIATED",
    createdAt: "19 May 2024, 06:05 PM"
  },
  {
    id: "txn-5",
    transactionId: "TXN123452",
    orderId: "ord-5",
    orderNumber: "SD5120",
    customerId: "usr-7",
    customerName: "Vikram Singh",
    tailorId: "tlr-6",
    tailorName: "Style Makers",
    method: "wallet",
    amount: 9800,
    platformFee: 980,
    taxAmount: 176,
    netPayout: 8644,
    status: "completed",
    gatewayResponseCode: "WALLET_DEBIT_OK",
    createdAt: "18 May 2024, 04:20 PM"
  },
  {
    id: "txn-6",
    transactionId: "TXN123451",
    orderId: "ord-6",
    orderNumber: "SD5119",
    customerId: "usr-8",
    customerName: "Pooja Mehta",
    tailorId: "tlr-1",
    tailorName: "Stitch Craft",
    method: "cards",
    amount: 10200,
    platformFee: 1020,
    taxAmount: 183,
    netPayout: 8997,
    status: "pending",
    gatewayResponseCode: "3DS_VERIFY_PENDING",
    createdAt: "18 May 2024, 02:10 PM"
  },
  {
    id: "txn-7",
    transactionId: "TXN123450",
    orderId: "ord-7",
    orderNumber: "SD5118",
    customerId: "usr-9",
    customerName: "Karan Malhotra",
    tailorId: "tlr-5",
    tailorName: "Perfect Fit Studio",
    method: "upi",
    amount: 7600,
    platformFee: 0,
    taxAmount: 0,
    netPayout: 0,
    status: "refunded",
    gatewayResponseCode: "REFUND_PROCESSED_FULL",
    createdAt: "17 May 2024, 02:00 PM"
  }
];

export const initialPayoutRequests: AdminPayoutRequest[] = [
  {
    id: "po-1",
    payoutNumber: "PO-801",
    tailorId: "tlr-1",
    tailorName: "Master Muhammad Aslam",
    shopName: "Master Aslam Bespoke",
    bankName: "Meezan Bank Ltd",
    accountNumber: "PK78MEZN0002010103492817",
    amount: 95000,
    fee: 0,
    netAmount: 95000,
    status: "pending",
    requestedDate: "2024-05-25",
    notes: "Bi-weekly earnings payout."
  },
  {
    id: "po-2",
    payoutNumber: "PO-800",
    tailorId: "tlr-3",
    tailorName: "Rekha Jamil",
    shopName: "Rekha Bridal Haute Couture",
    bankName: "Habib Bank Limited",
    accountNumber: "PK36HABB0000427901849203",
    amount: 240000,
    fee: 0,
    netAmount: 240000,
    status: "processed",
    requestedDate: "2024-05-20",
    processedDate: "2024-05-21",
    notes: "Settled via 1Link IBFT."
  }
];

export const initialDisputes: AdminDispute[] = [
  {
    id: "dsp-1",
    disputeNumber: "DSP-108",
    orderId: "ord-9",
    orderNumber: "SD-4981",
    customerId: "usr-7",
    customerName: "Usman Ghani",
    customerAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    tailorId: "tlr-4",
    tailorName: "Kamran Shah",
    reason: "fitting_issue",
    title: "Sherwani shoulder fit is 2 inches tighter than submitted scan",
    customerStatement:
      "I ordered a custom velvet Sherwani for my brother's wedding. The shoulder measurements were given as 18.5 inches, but the delivered piece measures only 16.5 inches. It does not fit at all and the tailor refused to adjust it without extra charges.",
    tailorStatement:
      "We cut according to the standard margin. The customer requested a slim Italian cut in their special note which reduces seam allowance.",
    customerEvidencePhotos: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80"
    ],
    tailorEvidencePhotos: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
    ],
    disputedAmount: 28000,
    status: "under_review",
    priority: "high",
    openedDate: "2024-05-25"
  },
  {
    id: "dsp-2",
    disputeNumber: "DSP-107",
    orderId: "ord-8",
    orderNumber: "SD-4890",
    customerId: "usr-3",
    customerName: "Fatima Noor",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    tailorId: "tlr-1",
    tailorName: "Master Muhammad Aslam",
    reason: "delayed_delivery",
    title: "Eid Order delayed by 6 days past guaranteed date",
    customerStatement: "The dress arrived after the event date. I requested a partial compensation.",
    tailorStatement: "Logistics courier experienced heavy rain disruption in Lahore.",
    customerEvidencePhotos: [],
    tailorEvidencePhotos: [],
    disputedAmount: 15000,
    status: "resolved_refund",
    priority: "medium",
    openedDate: "2024-05-15",
    resolvedDate: "2024-05-18",
    adminDecisionNotes: "Issued 25% courtesy refund (Rs 3,750) credited to customer wallet.",
    refundAmount: 3750
  }
];

export const initialReviews: AdminReview[] = [
  {
    id: "rev-1",
    orderId: "ord-3",
    orderNumber: "SD-5120",
    customerId: "usr-6",
    customerName: "Zainab Rashid",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    tailorId: "tlr-1",
    tailorName: "Master Aslam Bespoke",
    rating: 5,
    reviewTitle: "Absolute masterclass tailoring!",
    comment:
      "The Jamawar Prince Coat fits like a glove. The collar finishing and inner silk lining are exceptionally neat. Delivered right on time for our wedding event. Highly recommended!",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
    ],
    isVerifiedPurchase: true,
    status: "published",
    createdAt: "2024-05-24T18:00:00Z"
  },
  {
    id: "rev-2",
    orderId: "ord-20",
    orderNumber: "SD-4320",
    customerId: "usr-1",
    customerName: "Ayesha Khan",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    tailorId: "tlr-3",
    tailorName: "Rekha Bridal Haute Couture",
    rating: 5,
    reviewTitle: "Stunning hand embroidery work",
    comment:
      "Rekha Couture did an unbelievable job with my velvet bridal outfit. The stones and dabka work are 100% true to the AI Studio preview.",
    images: [],
    isVerifiedPurchase: true,
    status: "published",
    createdAt: "2024-05-21T12:30:00Z"
  }
];

export const initialCMSContent: AdminCMSContent = {
  banners: [
    {
      id: "ban-1",
      title: "Bridal Haute Couture Festival 2024",
      subtitle: "Custom designer stitching starting from Rs 25,000 with 3D Studio Preview",
      ctaText: "Explore Bridal Tailors",
      ctaLink: "/tailors?category=Bridal",
      imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80",
      backgroundColor: "#078B87",
      isActive: true,
      position: "home_hero"
    },
    {
      id: "ban-2",
      title: "Guaranteed 7-Day Express Stitching",
      subtitle: "Verified top-rated tailors in Lahore, Karachi & Islamabad",
      ctaText: "Book Appointment",
      ctaLink: "/book",
      imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80",
      backgroundColor: "#FF5B52",
      isActive: true,
      position: "announcement_top"
    }
  ],
  announcements: [
    {
      id: "anc-1",
      title: "Eid Orders Cutoff Date",
      message: "Standard stitching orders for Eid-ul-Adha close on 5th June. Express queues available.",
      type: "info",
      targetAudience: "all",
      isActive: true,
      createdAt: "2024-05-20"
    },
    {
      id: "anc-2",
      title: "New Automated Payout Cycle for Tailors",
      message: "Weekly payouts will now be processed every Tuesday directly via 1Link IBFT.",
      type: "success",
      targetAudience: "tailors",
      isActive: true,
      createdAt: "2024-05-22"
    }
  ],
  featuredTailorIds: ["tlr-1", "tlr-3"]
};

export const initialPlatformSettings: AdminPlatformSettings = {
  general: {
    platformName: "Sui Dhāga",
    supportEmail: "support@suidhaga.pk",
    supportPhone: "+92 42 111 784 784",
    currency: "PKR",
    currencySymbol: "Rs",
    maintenanceMode: false
  },
  commission: {
    defaultRatePercent: 12,
    goldTierRatePercent: 10,
    platinumTierRatePercent: 8,
    minimumOrderAmount: 1500
  },
  payouts: {
    escrowHoldDays: 3,
    minPayoutThreshold: 5000,
    payoutCycle: "weekly",
    autoApprovePayoutsUnder: 50000
  },
  verification: {
    autoVerifyWithCNIC: false,
    requireShopRegistration: true,
    minPortfolioItems: 4
  },
  notifications: {
    emailAlertsOnDispute: true,
    smsAlertsOnHighValueOrder: true,
    dailyDigestEmail: true,
    notifyAdminOnNewTailor: true
  }
};

// ---------------------------------------------------------------------------
// LocalStorage Persistence & CRUD Helpers
// ---------------------------------------------------------------------------

function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to save to localStorage key: ${key}`, err);
  }
}

/**
 * Simulates network delay (100ms - 250ms) for realistic offline UX
 */
export async function simulateDelay(ms: number = 180): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Mock Store Repository Accessors
// ---------------------------------------------------------------------------

export const mockAdminStore = {
  // Stats
  getStats: (): AdminStats => loadFromStorage(KEY_STATS, initialAdminStats),
  saveStats: (stats: AdminStats) => saveToStorage(KEY_STATS, stats),

  // Revenue Timeseries
  getRevenue: (range: string = "7days"): RevenueDataPoint[] =>
    loadFromStorage(KEY_REVENUE, initialRevenueChartData),

  // Activities
  getActivities: (): AdminActivityItem[] =>
    loadFromStorage(KEY_ACTIVITIES, initialRecentActivities),
  addActivity: (activity: Omit<AdminActivityItem, "id" | "timeAgo">) => {
    const list = loadFromStorage(KEY_ACTIVITIES, initialRecentActivities);
    const newItem: AdminActivityItem = {
      id: `act-${Date.now()}`,
      timeAgo: "Just now",
      ...activity
    };
    const updated = [newItem, ...list].slice(0, 20);
    saveToStorage(KEY_ACTIVITIES, updated);
    return newItem;
  },

  // Users
  getUsers: (): AdminUser[] => loadFromStorage(KEY_USERS, initialUsers),
  saveUsers: (users: AdminUser[]) => saveToStorage(KEY_USERS, users),
  updateUser: (id: string, updates: Partial<AdminUser>): AdminUser | null => {
    const users = loadFromStorage(KEY_USERS, initialUsers);
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    saveToStorage(KEY_USERS, users);
    return users[index];
  },
  addUser: (user: Omit<AdminUser, "id" | "joinedDate">): AdminUser => {
    const users = loadFromStorage(KEY_USERS, initialUsers);
    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      joinedDate: new Date().toISOString().split("T")[0],
      ...user
    };
    users.unshift(newUser);
    saveToStorage(KEY_USERS, users);
    return newUser;
  },

  // Tailors
  getTailors: (): AdminTailor[] => loadFromStorage(KEY_TAILORS, initialTailors),
  saveTailors: (tailors: AdminTailor[]) => saveToStorage(KEY_TAILORS, tailors),
  updateTailor: (id: string, updates: Partial<AdminTailor>): AdminTailor | null => {
    const tailors = loadFromStorage(KEY_TAILORS, initialTailors);
    const index = tailors.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tailors[index] = { ...tailors[index], ...updates };
    saveToStorage(KEY_TAILORS, tailors);
    return tailors[index];
  },

  // Orders
  getOrders: (): AdminOrder[] => loadFromStorage(KEY_ORDERS, initialOrders),
  saveOrders: (orders: AdminOrder[]) => saveToStorage(KEY_ORDERS, orders),
  updateOrder: (id: string, updates: Partial<AdminOrder>): AdminOrder | null => {
    const orders = loadFromStorage(KEY_ORDERS, initialOrders);
    const index = orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    orders[index] = { ...orders[index], ...updates };
    saveToStorage(KEY_ORDERS, orders);
    return orders[index];
  },

  // Payments & Payouts
  getTransactions: (): AdminPaymentTransaction[] =>
    loadFromStorage(KEY_PAYMENTS, initialTransactions),
  getPayouts: (): AdminPayoutRequest[] =>
    loadFromStorage(KEY_PAYOUTS, initialPayoutRequests),
  updatePayout: (id: string, updates: Partial<AdminPayoutRequest>): AdminPayoutRequest | null => {
    const payouts = loadFromStorage(KEY_PAYOUTS, initialPayoutRequests);
    const index = payouts.findIndex((p) => p.id === id);
    if (index === -1) return null;
    payouts[index] = { ...payouts[index], ...updates };
    saveToStorage(KEY_PAYOUTS, payouts);
    return payouts[index];
  },

  // Disputes
  getDisputes: (): AdminDispute[] => loadFromStorage(KEY_DISPUTES, initialDisputes),
  saveDisputes: (disputes: AdminDispute[]) => saveToStorage(KEY_DISPUTES, disputes),
  updateDispute: (id: string, updates: Partial<AdminDispute>): AdminDispute | null => {
    const disputes = loadFromStorage(KEY_DISPUTES, initialDisputes);
    const index = disputes.findIndex((d) => d.id === id);
    if (index === -1) return null;
    disputes[index] = { ...disputes[index], ...updates };
    saveToStorage(KEY_DISPUTES, disputes);
    return disputes[index];
  },

  // Reviews
  getReviews: (): AdminReview[] => loadFromStorage(KEY_REVIEWS, initialReviews),
  updateReview: (id: string, updates: Partial<AdminReview>): AdminReview | null => {
    const reviews = loadFromStorage(KEY_REVIEWS, initialReviews);
    const index = reviews.findIndex((r) => r.id === id);
    if (index === -1) return null;
    reviews[index] = { ...reviews[index], ...updates };
    saveToStorage(KEY_REVIEWS, reviews);
    return reviews[index];
  },

  // CMS
  getCMS: (): AdminCMSContent => loadFromStorage(KEY_CMS, initialCMSContent),
  saveCMS: (cms: AdminCMSContent) => saveToStorage(KEY_CMS, cms),

  // Settings
  getSettings: (): AdminPlatformSettings =>
    loadFromStorage(KEY_SETTINGS, initialPlatformSettings),
  saveSettings: (settings: AdminPlatformSettings) =>
    saveToStorage(KEY_SETTINGS, settings)
};
