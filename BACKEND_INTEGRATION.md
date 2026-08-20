# Sui Dhāga - Admin API Backend Integration Guide

This document provides the complete technical specification for integrating the **Sui Dhāga Admin Dashboard and Platform Management Suite** with your backend server (Node.js/Express, NestJS, Python Django/FastAPI, PHP Laravel, Go, etc.).

---

## 1. Architectural Overview

The Sui Dhāga frontend employs a **strictly typed, decoupled service architecture**:

```
+-------------------------------------------------------------------------+
|                  Admin UI Components (Next.js / React 19)               |
|  [Dashboard] [Users] [Tailors] [Orders] [Payments] [Disputes] [Settings]|
+-------------------------------------------------------------------------+
                                    │
                                    ▼
+-------------------------------------------------------------------------+
|             adminService (src/lib/api/admin-service.ts)                 |
|   Strict TypeScript domain methods (users, tailors, orders, payments...) |
+-------------------------------------------------------------------------+
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
+-----------------------------------+   +---------------------------------+
|      Real Backend API Client      |   |   Mock Store / Fallback Engine  |
| (process.env.NEXT_PUBLIC_API_URL) |   |    (src/lib/admin-data.ts)      |
|   - Automatic Bearer JWT Injection|   |   - Persistent local storage    |
|   - Query parameter serialization |   |   - Realistic latency & CRUD    |
|   - Standardized error parsing    |   |   - Zero-backend development    |
+-----------------------------------+   +---------------------------------+
```

### Key Integration Benefit:
> **Zero Frontend Code Rewrites**: The entire frontend is already configured to consume these exact REST endpoints. When your backend API is ready, you only need to define `NEXT_PUBLIC_API_URL` in `.env.local`.

---

## 2. Environment Configuration

Create or update `.env.local` in the project root:

```env
# URL of your live backend API (omit trailing slash)
NEXT_PUBLIC_API_URL=https://api.suidhaga.pk

# Optional: Specific backend auth endpoints
NEXT_PUBLIC_AUTH_URL=https://api.suidhaga.pk/api/auth
```

---

## 3. Authentication & Security

### Authorization Header
Every request made to `/api/admin/*` automatically includes the Bearer token stored in browser session:

```http
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json
Accept: application/json
```

### Standard Response Envelope
All API endpoints should adhere to the following JSON structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional human-readable feedback",
  "timestamp": "2024-05-26T15:30:00Z"
}
```

### Standard Paginated Envelope
For list endpoints (`/api/admin/users`, `/api/admin/tailors`, `/api/admin/orders`):

```json
{
  "success": true,
  "data": [ ... ],
  "total": 12845,
  "page": 1,
  "limit": 10,
  "totalPages": 1285
}
```

### Standard Error Format
When returning HTTP error codes (`400`, `401`, `403`, `404`, `500`):

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED_ADMIN_ROLE",
    "message": "Only Super Administrators can perform this action.",
    "details": null
  }
}
```

---

## 4. REST Endpoints Specification

### 4.1 Dashboard & Platform Analytics

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/dashboard/stats` | Returns aggregate metrics (Users, Tailors, Orders, Revenue, Escrow). |
| `GET` | `/api/admin/dashboard/revenue?range=7days` | Returns timeseries data points for SVG line chart. |
| `GET` | `/api/admin/dashboard/activities` | Returns the recent audit activity log. |

#### Sample `GET /api/admin/dashboard/stats` Response:
```json
{
  "success": true,
  "data": {
    "totalUsers": 12845,
    "usersGrowth": "↑ 12.5% vs last week",
    "totalTailors": 2341,
    "tailorsGrowth": "↑ 8.4% vs last week",
    "totalOrders": 5672,
    "ordersGrowth": "↑ 15.6% vs last week",
    "totalRevenue": 45788320,
    "revenueFormatted": "Rs 45,78,320",
    "revenueGrowth": "↑ 18.3% vs last week",
    "activeUsers": 8512,
    "ordersInProgress": 1243,
    "pendingVerifications": 34,
    "openDisputes": 12,
    "escrowBalance": 2450000,
    "monthlyCommission": 549398
  }
}
```

---

### 4.2 User Management (`/api/admin/users`)

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/users` | `search`, `role` (`customer`\|`tailor`\|`admin`), `status` (`active`\|`suspended`\|`pending`), `page`, `limit` | Paginated users list. |
| `GET` | `/api/admin/users/:id` | - | Get specific user profile and history. |
| `POST` | `/api/admin/users` | - | Create / Invite a new administrator or user. |
| `PATCH`| `/api/admin/users/:id` | - | Update user status (`active`/`suspended`) or roles. |
| `DELETE`| `/api/admin/users/:id` | - | Delete user account. |

#### Sample `PATCH /api/admin/users/:id` Request Body:
```json
{
  "status": "suspended",
  "notes": "Suspended due to fraudulent chargeback attempt."
}
```

---

### 4.3 Tailor Partners & Verification Desk (`/api/admin/tailors`)

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/tailors` | `search`, `status` (`verified`\|`pending`\|`rejected`), `city`, `isFeatured`, `page`, `limit` | Paginated tailors list. |
| `GET` | `/api/admin/tailors/:id` | - | Get tailor shop details, documents & bank info. |
| `POST`| `/api/admin/tailors/:id/verify` | - | Approve or reject tailor application with notes and commission rate. |
| `POST`| `/api/admin/tailors/:id/feature` | - | Toggle featured partner status. |

#### Sample `POST /api/admin/tailors/:id/verify` Request Body:
```json
{
  "status": "verified",
  "notes": "CNIC and physical workshop in Anarkali verified by field agent.",
  "commissionRate": 10
}
```

---

### 4.4 Orders & Stitching Pipeline (`/api/admin/orders`)

| Method | Endpoint | Query Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/orders` | `search`, `status`, `paymentStatus`, `tailorId`, `customerId`, `page`, `limit` | Paginated orders list. |
| `GET` | `/api/admin/orders/:id` | - | Order details, 3D measurements, fabric specs and timeline. |
| `PATCH`| `/api/admin/orders/:id/status` | - | Advance milestone (Cutting, Stitching, QC, Out for Delivery, Delivered). |

#### Sample `PATCH /api/admin/orders/:id/status` Request Body:
```json
{
  "status": "quality_check",
  "note": "Hand embroidery passed quality inspection. Ready for packaging."
}
```

---

### 4.5 Payments & Artisan Payouts (`/api/admin/payments`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/payments/transactions` | Full customer payment gateway log (JazzCash, EasyPaisa, Bank Transfer). |
| `GET` | `/api/admin/payments/payouts` | Artisan withdrawal settlement requests. |
| `POST`| `/api/admin/payments/payouts/:id` | Approve or reject tailor payout with 1Link reference. |
| `POST`| `/api/admin/payments/refund` | Execute order refund to customer wallet or source gateway. |

#### Sample `POST /api/admin/payments/payouts/:id` Request Body:
```json
{
  "action": "approve",
  "referenceNumber": "IBFT-908214981",
  "notes": "Settled via Meezan Bank 1Link IBFT."
}
```

---

### 4.6 Dispute Resolution Desk (`/api/admin/disputes`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/disputes` | List all open and resolved dispute cases. |
| `GET` | `/api/admin/disputes/:id` | Get customer vs tailor claim statements and photo evidence. |
| `POST`| `/api/admin/disputes/:id/resolve` | Execute administrative ruling (`refund_full`, `refund_partial`, `release_to_tailor`, `dismiss`). |

#### Sample `POST /api/admin/disputes/:id/resolve` Request Body:
```json
{
  "resolution": "refund_partial",
  "refundAmount": 3750,
  "decisionNotes": "Alteration allowance of Rs 3,750 credited to customer wallet."
}
```

---

### 4.7 Platform Configuration & Rules (`/api/admin/settings`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/settings` | Retrieve global commission tiers, escrow hold days, and notification flags. |
| `PUT` | `/api/admin/settings` | Update platform configuration. |

#### Sample `PUT /api/admin/settings` Request Body:
```json
{
  "general": {
    "platformName": "Sui Dhāga",
    "supportEmail": "support@suidhaga.pk",
    "supportPhone": "+92 42 111 784 784"
  },
  "commission": {
    "defaultRatePercent": 12,
    "goldTierRatePercent": 10,
    "platinumTierRatePercent": 8,
    "minimumOrderAmount": 1500
  },
  "payouts": {
    "escrowHoldDays": 3,
    "minPayoutThreshold": 5000,
    "payoutCycle": "weekly"
  },
  "notifications": {
    "emailAlertsOnDispute": true,
    "smsAlertsOnHighValueOrder": true
  }
}
```

---

## 5. TypeScript Contract Reference

All TypeScript data transfer object (DTO) interfaces are located at:
`src/lib/api/admin-types.ts`

You can import or copy these types into your backend repository (NestJS, Express TypeScript, etc.) to guarantee 100% contract synchronization!
