# Routes

## Purpose

This document defines the frontend routes for the Sui Dhaga website.

All routes must match the Next.js App Router structure.

Route groups like `(public)` or `(customer)` do not appear in the URL.

---

# Access Labels

```txt
PUBLIC       = Anyone can access
AUTH         = Login/register pages
CUSTOMER     = Authenticated customer only
TAILOR       = Authenticated tailor only
ADMIN        = Admin only
SHARED_AUTH  = Any authenticated user
```

---

# Files and Folder Structure

```txt

sui-dhaga-website/
├── agents/
│   ├── README.md
│   ├── design-guidelines.md
│   ├── frontend-rules.md
│   ├── routes.md
│   ├── architecture.md
│   ├── components.md
│   └── ui-designs/
│       ├── home.png
│       ├── auth-pages.png
│       ├── tailor-marketplace.png
│       ├── customer-pages.png
│       ├── design-studio.png
│       ├── community-messages.png
│       ├── tailor-pages.png
│       └── admin-pages.png
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faqs/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── blog/[slug]/page.tsx
│   │   │   ├── privacy-policy/page.tsx
│   │   │   ├── terms-and-conditions/page.tsx
│   │   │   ├── refund-policy/page.tsx
│   │   │   └── become-a-tailor/page.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   └── auth/
│   │   │       ├── login/page.tsx
│   │   │       ├── register/page.tsx
│   │   │       ├── forgot-password/page.tsx
│   │   │       └── reset-password/page.tsx
│   │   │
│   │   ├── (marketplace)/
│   │   │   ├── layout.tsx
│   │   │   ├── tailors/page.tsx
│   │   │   ├── tailors/map/page.tsx
│   │   │   ├── tailors/[tailorId]/page.tsx
│   │   │   ├── tailors/compare/page.tsx
│   │   │   └── fabrics/page.tsx
│   │   │
│   │   ├── (customer)/
│   │   │   ├── layout.tsx
│   │   │   ├── customer/dashboard/page.tsx
│   │   │   ├── customer/orders/page.tsx
│   │   │   ├── customer/orders/[orderId]/page.tsx
│   │   │   ├── customer/appointments/page.tsx
│   │   │   ├── customer/measurements/page.tsx
│   │   │   ├── customer/saved-designs/page.tsx
│   │   │   ├── customer/wishlist/page.tsx
│   │   │   ├── book/[tailorId]/page.tsx
│   │   │   └── checkout/page.tsx
│   │   │
│   │   ├── (studio)/
│   │   │   ├── layout.tsx
│   │   │   ├── design-studio/page.tsx
│   │   │   ├── design-studio/new/page.tsx
│   │   │   ├── design-studio/text-to-design/page.tsx
│   │   │   ├── design-studio/image-to-design/page.tsx
│   │   │   ├── design-studio/sketch-to-design/page.tsx
│   │   │   ├── design-studio/chat/page.tsx
│   │   │   ├── design-studio/templates/page.tsx
│   │   │   ├── design-studio/my-designs/page.tsx
│   │   │   ├── design-studio/editor/[designId]/page.tsx
│   │   │   └── design-studio/export/[designId]/page.tsx
│   │   │
│   │   ├── (community)/
│   │   │   ├── layout.tsx
│   │   │   ├── community/page.tsx
│   │   │   ├── community/post/[postId]/page.tsx
│   │   │   └── community/create/page.tsx
│   │   │
│   │   ├── (shared-auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── messages/[conversationId]/page.tsx
│   │   │   └── notifications/page.tsx
│   │   │
│   │   ├── (tailor)/
│   │   │   ├── layout.tsx
│   │   │   ├── tailor/onboarding/page.tsx
│   │   │   ├── tailor/dashboard/page.tsx
│   │   │   ├── tailor/profile/page.tsx
│   │   │   ├── tailor/services/page.tsx
│   │   │   ├── tailor/orders/page.tsx
│   │   │   ├── tailor/orders/[orderId]/page.tsx
│   │   │   ├── tailor/appointments/page.tsx
│   │   │   ├── tailor/availability/page.tsx
│   │   │   └── tailor/earnings/page.tsx
│   │   │
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── admin/dashboard/page.tsx
│   │   │   ├── admin/users/page.tsx
│   │   │   ├── admin/tailors/page.tsx
│   │   │   ├── admin/orders/page.tsx
│   │   │   └── admin/payments/page.tsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   ├── forms/
│   │   └── maps/
│   │
│   ├── layouts/
│   │   ├── public-layout.tsx
│   │   ├── auth-layout.tsx
│   │   ├── dashboard-layout.tsx
│   │   └── admin-layout.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── tailors.ts
│   │   │   ├── appointments.ts
│   │   │   ├── orders.ts
│   │   │   ├── messages.ts
│   │   │   ├── designs.ts
│   │   │   ├── measurements.ts
│   │   │   ├── community.ts
│   │   │   ├── fabrics.ts
│   │   │   ├── reviews.ts
│   │   │   ├── wishlist.ts
│   │   │   ├── payments.ts
│   │   │   ├── notifications.ts
│   │   │   ├── uploads.ts
│   │   │   └── admin.ts
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   │
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   ├── tailor.ts
│   │   ├── order.ts
│   │   ├── appointment.ts
│   │   ├── design.ts
│   │   ├── message.ts
│   │   ├── payment.ts
│   │   └── index.ts
│   │
│   └── styles/
│       └── theme.css
│
├── .env.example
├── middleware.ts
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md

```
---

# Public Routes

```txt
/                         PUBLIC
/about                    PUBLIC
/contact                  PUBLIC
/faqs                     PUBLIC
/blog                     PUBLIC
/blog/[slug]              PUBLIC
/privacy-policy           PUBLIC
/terms-and-conditions     PUBLIC
/refund-policy            PUBLIC
/become-a-tailor          PUBLIC
```

---

# Auth Routes

```txt
/auth/login               AUTH
/auth/register            AUTH
/auth/forgot-password     AUTH
/auth/reset-password      AUTH
```

---

# Marketplace Routes

```txt
/tailors                  PUBLIC
/tailors/map              PUBLIC
/tailors/[tailorId]       PUBLIC
/tailors/compare          CUSTOMER
/fabrics                  PUBLIC
```

---

# Customer Routes

```txt
/customer/dashboard       CUSTOMER
/customer/orders          CUSTOMER
/customer/orders/[orderId] CUSTOMER
/customer/appointments    CUSTOMER
/customer/measurements    CUSTOMER
/customer/saved-designs   CUSTOMER
/customer/wishlist        CUSTOMER
/book/[tailorId]          CUSTOMER
/checkout                 CUSTOMER
```

---

# Design Studio Routes

```txt
/design-studio                         CUSTOMER
/design-studio/new                     CUSTOMER
/design-studio/text-to-design          CUSTOMER
/design-studio/image-to-design         CUSTOMER
/design-studio/sketch-to-design        CUSTOMER
/design-studio/chat                    CUSTOMER
/design-studio/templates               CUSTOMER
/design-studio/my-designs              CUSTOMER
/design-studio/editor/[designId]       CUSTOMER
/design-studio/export/[designId]       CUSTOMER
```

---

# Community Routes

```txt
/community                 PUBLIC
/community/post/[postId]   PUBLIC
/community/create          SHARED_AUTH
```

---

# Shared Auth Routes

```txt
/messages                  SHARED_AUTH
/messages/[conversationId] SHARED_AUTH
/notifications             SHARED_AUTH
```

---

# Tailor Routes

```txt
/tailor/onboarding         TAILOR
/tailor/dashboard          TAILOR
/tailor/profile            TAILOR
/tailor/services           TAILOR
/tailor/orders             TAILOR
/tailor/orders/[orderId]   TAILOR
/tailor/appointments       TAILOR
/tailor/availability       TAILOR
/tailor/earnings           TAILOR
```

---

# Admin Routes

```txt
/admin/dashboard           ADMIN
/admin/users               ADMIN
/admin/tailors             ADMIN
/admin/orders              ADMIN
/admin/payments            ADMIN
```

---

# Backend API Base URL

```txt
/api/v1
```

Frontend must use backend endpoints from this base URL.

---

# Endpoint Groups

```txt
/auth
/users
/tailors
/appointments
/orders
/conversations
/messages
/designs
/measurements
/community
/fabrics
/reviews
/wishlist
/payments
/notifications
/uploads
/admin
```

# Sui Dhaga Backend Endpoints

This document is the source of truth for all backend endpoints.

Base URL:

```txt
/api/v1
```

---

# Auth

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /auth/register        |
| POST   | /auth/login           |
| POST   | /auth/logout          |
| GET    | /auth/me              |
| POST   | /auth/refresh-token   |
| POST   | /auth/forgot-password |
| POST   | /auth/reset-password  |
| POST   | /auth/verify-email    |

---

# Users

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /users/me        |
| PATCH  | /users/me        |
| PATCH  | /users/me/avatar |
| DELETE | /users/me        |
| GET    | /users/[userId]  |

---

# Tailors

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | /tailors                              |
| POST   | /tailors                              |
| GET    | /tailors/nearby                       |
| GET    | /tailors/map                          |
| GET    | /tailors/[tailorId]                   |
| PATCH  | /tailors/[tailorId]                   |
| DELETE | /tailors/[tailorId]                   |
| POST   | /tailors/[tailorId]/gallery           |
| DELETE | /tailors/[tailorId]/gallery/[imageId] |
| POST   | /tailors/[tailorId]/verify            |
| POST   | /tailors/compare                      |

---

# Tailor Services

| Method | Endpoint                                 |
| ------ | ---------------------------------------- |
| GET    | /tailors/[tailorId]/services             |
| POST   | /tailors/[tailorId]/services             |
| PATCH  | /tailors/[tailorId]/services/[serviceId] |
| DELETE | /tailors/[tailorId]/services/[serviceId] |

---

# Tailor Availability

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | /tailors/[tailorId]/availability |
| POST   | /tailors/[tailorId]/availability |
| PATCH  | /availability/[slotId]           |
| DELETE | /availability/[slotId]           |

---

# Appointments

| Method | Endpoint                                 |
| ------ | ---------------------------------------- |
| GET    | /appointments                            |
| POST   | /appointments                            |
| GET    | /appointments/[appointmentId]            |
| PATCH  | /appointments/[appointmentId]/status     |
| PATCH  | /appointments/[appointmentId]/reschedule |
| DELETE | /appointments/[appointmentId]            |

---

# Orders

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /orders                   |
| POST   | /orders                   |
| GET    | /orders/[orderId]         |
| PATCH  | /orders/[orderId]/status  |
| POST   | /orders/[orderId]/cancel  |
| GET    | /orders/[orderId]/invoice |

---

# Order Tracking

| Method | Endpoint                                |
| ------ | --------------------------------------- |
| GET    | /orders/[orderId]/tracking              |
| POST   | /orders/[orderId]/tracking              |
| PATCH  | /orders/[orderId]/tracking/[trackingId] |

---

# Conversations & Messages

| Method | Endpoint                                 |
| ------ | ---------------------------------------- |
| GET    | /conversations                           |
| POST   | /conversations                           |
| GET    | /conversations/[conversationId]          |
| GET    | /conversations/[conversationId]/messages |
| POST   | /conversations/[conversationId]/messages |
| PATCH  | /messages/[messageId]/read               |
| POST   | /messages/[messageId]/attachments        |

---

# Designs

| Method | Endpoint                              |
| ------ | ------------------------------------- |
| GET    | /designs                              |
| GET    | /designs/[designId]                   |
| POST   | /designs/text-to-design               |
| POST   | /designs/image-to-design              |
| POST   | /designs/sketch-to-design             |
| POST   | /designs/chat                         |
| PATCH  | /designs/[designId]                   |
| DELETE | /designs/[designId]                   |
| POST   | /designs/[designId]/duplicate         |
| POST   | /designs/[designId]/share-with-tailor |

---

# Design Customization

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | /designs/[designId]/chat         |
| POST   | /designs/[designId]/chat         |
| PATCH  | /designs/[designId]/colors       |
| PATCH  | /designs/[designId]/fabric       |
| PATCH  | /designs/[designId]/embroidery   |
| PATCH  | /designs/[designId]/measurements |
| PATCH  | /designs/[designId]/notes        |

---

# PDF Export

| Method | Endpoint                       |
| ------ | ------------------------------ |
| POST   | /designs/[designId]/export-pdf |
| GET    | /designs/[designId]/pdf        |
| GET    | /exports                       |

---

# Measurements

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | /measurements                 |
| POST   | /measurements                 |
| GET    | /measurements/[measurementId] |
| PATCH  | /measurements/[measurementId] |
| DELETE | /measurements/[measurementId] |

---

# Community

| Method | Endpoint                           |
| ------ | ---------------------------------- |
| GET    | /community/posts                   |
| POST   | /community/posts                   |
| GET    | /community/posts/[postId]          |
| PATCH  | /community/posts/[postId]          |
| DELETE | /community/posts/[postId]          |
| POST   | /community/posts/[postId]/like     |
| POST   | /community/posts/[postId]/save     |
| GET    | /community/posts/[postId]/comments |
| POST   | /community/posts/[postId]/comments |

---

# Fabrics

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /fabrics            |
| POST   | /fabrics            |
| GET    | /fabrics/[fabricId] |
| PATCH  | /fabrics/[fabricId] |
| DELETE | /fabrics/[fabricId] |

---

# Reviews

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /tailors/[tailorId]/reviews |
| POST   | /orders/[orderId]/review    |
| PATCH  | /reviews/[reviewId]         |
| DELETE | /reviews/[reviewId]         |

---

# Wishlist

| Method | Endpoint                     |
| ------ | ---------------------------- |
| GET    | /wishlist                    |
| POST   | /wishlist/tailors/[tailorId] |
| DELETE | /wishlist/tailors/[tailorId] |
| POST   | /wishlist/designs/[designId] |
| DELETE | /wishlist/designs/[designId] |

---

# Payments

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /payments/create-checkout |
| POST   | /payments/confirm         |
| GET    | /payments/history         |
| GET    | /payments/[paymentId]     |
| POST   | /payments/webhook         |

---

# Notifications

| Method | Endpoint                             |
| ------ | ------------------------------------ |
| GET    | /notifications                       |
| PATCH  | /notifications/[notificationId]/read |
| PATCH  | /notifications/read-all              |
| DELETE | /notifications/[notificationId]      |

---

# Uploads

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /uploads/image    |
| POST   | /uploads/images   |
| POST   | /uploads/file     |
| DELETE | /uploads/[fileId] |

---

# Admin

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | /admin/dashboard/stats           |
| GET    | /admin/users                     |
| PATCH  | /admin/users/[userId]/block      |
| PATCH  | /admin/users/[userId]/unblock    |
| GET    | /admin/tailors                   |
| PATCH  | /admin/tailors/[tailorId]/verify |
| PATCH  | /admin/tailors/[tailorId]/reject |
| GET    | /admin/orders                    |
| GET    | /admin/payments                  |
| GET    | /admin/reports                   |
| DELETE | /admin/community/posts/[postId]  |

---


---



# Rules

* Do not create undocumented routes.
* Do not change route access without updating this file.
* Do not call database tables directly from frontend.
* Public pages must not require authentication.
* Protected pages must verify authentication.
* Role-based pages must verify user role.
* UI must follow matching mockup from `agents/ui-designs/`.


