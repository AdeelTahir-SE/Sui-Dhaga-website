# Architecture

## Purpose

This document defines the frontend architecture for the Sui Dhaga website.

---

# Stack

```txt
Next.js 16 App Router
TypeScript
Tailwind CSS
shadcn/ui
```

---

# System Flow

```txt
Next.js Website
      |
      v
Backend API
/api/v1
      |
      v
PostgreSQL
Supabase Auth
Supabase Storage
OpenAI
Google Maps
SafePay
Stripe
```

---

# Frontend Structure

```txt
src/
├── app/
├── components/
├── layouts/
├── lib/
├── hooks/
├── types/
└── styles/
```

---

# Routing

All pages live inside:

```txt
src/app/
```

Routes must follow:

```txt
agents/routes.md
```

Route groups are used only for organization and do not affect URLs.

---

# Components

Reusable components:

```txt
src/components/
```

Route-specific components:

```txt
src/app/.../_components/
```

Use route-specific components when the component is only used by one page group.

---

# API Layer

Frontend API helpers live in:

```txt
src/lib/api/
```

Example:

```txt
src/lib/api/tailors.ts
src/lib/api/orders.ts
src/lib/api/designs.ts
src/lib/api/payments.ts
```

All API calls must use:

```txt
/api/v1
```

Do not call PostgreSQL or Supabase database tables directly from the frontend.

---

# Authentication

Authentication is handled through backend APIs and Supabase Auth.

Protected route groups:

```txt
(customer)
(studio)
(shared-auth)
(tailor)
(admin)
```

Each protected page must verify:

* Logged-in user
* Correct role when required

---

# File Uploads

Uploads must use backend upload endpoints:

```txt
POST /api/v1/uploads/image
POST /api/v1/uploads/images
POST /api/v1/uploads/file
```

Frontend must not upload directly to storage.

---

# Payments

Payments are handled by backend APIs.

Supported providers:

```txt
SafePay
Stripe
```

Frontend should only start or confirm payments through backend payment endpoints.

---

# AI Design Generation

AI features must use backend design endpoints.

Examples:

```txt
POST /api/v1/designs/text-to-design
POST /api/v1/designs/image-to-design
POST /api/v1/designs/sketch-to-design
POST /api/v1/designs/chat
```

Frontend must not call OpenAI directly.

---

# Maps

Map UI may use Google Maps on the frontend.

Tailor data must still come from backend endpoints.

Examples:

```txt
GET /api/v1/tailors/map
GET /api/v1/tailors/nearby
```

---

# UI Source of Truth

All frontend implementation must follow:

```txt
agents/ui-designs/
```

Design mockups have priority over written design notes.

---

# Final Rules

* Keep architecture simple.
* Do not create a `features/` folder.
* Do not create undocumented routes.
* Do not invent backend endpoints.
* Reuse components before creating new ones.
* Keep frontend connected only to `/api/v1`.
