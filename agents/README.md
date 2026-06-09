# Sui Dhaga Website Agent Documentation

## Project Overview

Sui Dhaga is an AI-powered tailoring marketplace and clothing design platform.

The platform connects customers with professional tailors while providing AI tools to generate, customize, and share clothing designs.

The system consists of two major modules:

### 1. Tailor Marketplace

A marketplace similar to Uber, Foodpanda, or Zomato but built specifically for tailoring services.

Customers can:

* Discover nearby tailors
* Search and filter tailors
* View tailor profiles
* Compare tailors
* Book appointments
* Place stitching orders
* Track orders
* Save favorite tailors
* Chat with tailors
* Leave reviews

Tailors can:

* Create professional profiles
* Manage services
* Manage availability
* Manage appointments
* Manage orders
* Upload portfolio work
* Communicate with customers
* Receive payments

---

### 2. AI Design Studio

An AI-powered clothing design generation platform.

Users can create clothing designs through:

* Text to Design
* Image to Design
* Sketch to Design
* AI Design Chat

Users can:

* Save designs
* Edit designs
* Export designs
* Customize fabrics
* Customize embroidery
* Add notes
* Add measurements
* Share designs with tailors
* Export design PDFs

---

## Technology Stack

### Frontend

* Next.js 16 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Server Components
* Server Actions

### Backend

* Node.js
* Express.js
* PostgreSQL

### Authentication

* Supabase Auth

### File Storage

* Supabase Storage

### Artificial Intelligence

* OpenAI

### Maps

* Google Maps

### Payments

* SafePay
* Stripe

### Deployment

* Vercel

---

# Project Architecture

```txt
Customer Browser
        |
        v
Next.js Website
        |
        v
Backend API (/api/v1)
        |
        +------ PostgreSQL
        |
        +------ Supabase Auth
        |
        +------ Supabase Storage
        |
        +------ OpenAI
        |
        +------ Google Maps
        |
        +------ SafePay
        |
        +------ Stripe
```

---

# Critical Development Rules

## Rule 1

Frontend MUST communicate only with backend endpoints.

Frontend MUST NEVER directly access database tables.

### Correct

```ts
GET /api/v1/tailors
```

### Incorrect

```ts
supabase
  .from("tailors")
  .select("*")
```

---

## Rule 2

Backend endpoints are the source of truth.

Always use endpoints defined in:

```txt
agents/routes.md
```

Never invent new endpoints without updating documentation.

---

## Rule 3

Reuse existing components before creating new ones.

Always check:

```txt
agents/components.md
```

before creating UI.

---

## Rule 4

Follow design system.

Always check:

```txt
agents/design-guidelines.md
```

before designing pages.

---

## Rule 5

Keep pages responsive.

Required breakpoints:

* Mobile
* Tablet
* Desktop
* Large Desktop

---

## Rule 6

Prefer Server Components.

Use Client Components only when needed.

Examples:

### Server Component

* Marketing pages
* Tailor listing pages
* Blog pages
* Public content

### Client Component

* Forms
* Maps
* Design Editor
* Interactive dashboards

---

## Rule 7

Maintain feature-based architecture.

Do not place unrelated files together.

---

# User Roles

## Public User

Can access:

* Homepage
* Tailor Marketplace
* Tailor Profiles
* Community Feed
* Blog
* Legal Pages

---

## Authenticated Customer

Can access:

* Dashboard
* Orders
* Appointments
* Measurements
* Wishlist
* Design Studio
* Messages
* Notifications

---

## Tailor

Can access:

* Tailor Dashboard
* Profile Management
* Services
* Availability
* Orders
* Appointments
* Earnings

---

## Admin

Can access:

* User Management
* Tailor Verification
* Orders
* Payments
* Reports
* Community Moderation

---

# Documentation Files

## design-guidelines.md

Contains:

* Visual identity
* Color system
* Typography
* Layout rules
* UI principles
* Fashion branding guidelines

Agents MUST follow these guidelines when creating UI.

---

## frontend-rules.md

Contains:

* Next.js standards
* Component rules
* Data fetching rules
* Folder structure
* State management rules
* Form patterns

Agents MUST follow these standards when writing code.

---

## routes.md

Contains:

* Complete route structure
* Route permissions
* Route ownership
* Backend endpoint mappings

Agents MUST use documented routes.

---

## architecture.md

Contains:

* System architecture
* Feature architecture
* Module organization
* Data flow

Agents MUST review before adding new features.

---

## components.md

Contains:

* Shared components
* Naming conventions
* UI patterns
* Reusable layouts

Agents MUST reuse existing components.

---

# Development Workflow

Before implementing any feature:

1. Read README.md
2. Read architecture.md
3. Read routes.md
4. Read components.md
5. Read design-guidelines.md
6. Implement feature
7. Reuse existing patterns
8. Verify responsiveness
9. Verify accessibility

This workflow is mandatory.

---

# Platform Goals

The platform should feel:

* Premium
* Elegant
* Fashion-focused
* Modern
* AI-powered
* Trustworthy
* Professional
* Mobile-first

The experience should combine:

* Luxury tailoring
* Modern marketplace UX
* Advanced AI design generation

into a single cohesive platform.

---

# UI Design Source of Truth

The UI designs inside the following folder are the primary source of truth for all frontend implementation:

```txt
agents/ui-designs/
```

Contents:

```txt
agents/ui-designs/
├── home1.png
├── home2.png (rest of designs who did not completely appear in home1.png)
├── auth-pages.png
├── tailor-marketplace.png
├── customer-pages.png
├── design-studio.png
├── community-messages.png
├── tailor-pages.png
└── admin-pages.png
```

## Critical Rule

Agents MUST implement pages according to the provided UI designs.

Before implementing any page:

1. Identify the page category.
2. Locate the matching design image.
3. Follow the design closely.
4. Reuse existing components where possible.

---

## Examples

### Homepage

Use:

```txt
ui-designs/home.png
```

Pages:

```txt
/
```

---

### Authentication Pages

Use:

```txt
ui-designs/auth-pages.png
```

Pages:

```txt
/auth/login
/auth/register
/auth/forgot-password
/auth/reset-password
```

---

### Tailor Marketplace

Use:

```txt
ui-designs/tailor-marketplace.png
```

Pages:

```txt
/tailors
/tailors/map
/tailors/[tailorId]
/tailors/compare
/fabrics
```

---

### Customer Dashboard Pages

Use:

```txt
ui-designs/customer-pages.png
```

Pages:

```txt
/customer/*
/book/*
/checkout
```

---

### Design Studio

Use:

```txt
ui-designs/design-studio.png
```

Pages:

```txt
/design-studio/*
```

---

### Community & Messaging

Use:

```txt
ui-designs/community-messages.png
```

Pages:

```txt
/community/*
/messages/*
/notifications
```

---

### Tailor Dashboard

Use:

```txt
ui-designs/tailor-pages.png
```

Pages:

```txt
/tailor/*
```

---

### Admin Dashboard

Use:

```txt
ui-designs/admin-pages.png
```

Pages:

```txt
/admin/*
```

---

## Never Do These

❌ Create completely new design styles.

❌ Ignore provided UI mockups.

❌ Mix design systems from different design files.

❌ Invent layouts when a design already exists.

❌ Use random colors, spacing, or typography.

---

## Allowed Changes

The following changes are allowed:

* Responsive adaptations
* Accessibility improvements
* Performance optimizations
* Component extraction
* Minor UX improvements

These changes must preserve the original design language.

---

## Design Priority Order

When conflicts occur, use this priority:

```txt
1. ui-designs/*.png
2. design-guidelines.md
3. components.md
4. frontend-rules.md
```

The UI design images are the highest-priority visual reference in the project.

---


# Success Criteria

Every page should satisfy the following:

* Beautiful UI
* Responsive Design
* Accessible
* Fast Loading
* Consistent Branding
* Reusable Components
* Clear User Flows
* Production Ready

If a feature does not satisfy these requirements, it is not considered complete.
