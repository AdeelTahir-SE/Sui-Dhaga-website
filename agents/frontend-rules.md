# Frontend Rules

## Purpose

This document defines frontend development rules for the Sui Dhaga website.

All agents must follow these rules when implementing frontend features.

---

# Tech Stack

* Next.js 16 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui

---

# Folder Rules

Use the existing project structure:

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

Do not create a `features/` folder unless the project structure is officially changed.

---

# App Router Rules

Use Next.js App Router only.

Do not use Pages Router.

Pages must be created inside:

```txt
src/app/
```

Routes must match:

```txt
agents/routes.md
```

Do not create undocumented routes.

---

# Component Rules

Reusable components go inside:

```txt
src/components/
```

Route-specific components go inside the route folder:

```txt
src/app/.../_components/
```

Rules:

* Reuse existing components first.
* Avoid duplicate components.
* Use kebab-case filenames.
* Keep components small and focused.

Examples:

```txt
tailor-card.tsx
booking-form.tsx
design-preview.tsx
```

---

# API Rules

The backend API is the source of truth.

Base URL:

```txt
/api/v1
```

Frontend must not directly access database tables.

Create API helper functions inside:

```txt
src/lib/api/
```

Example:

```txt
src/lib/api/
├── auth.ts
├── users.ts
├── tailors.ts
├── orders.ts
├── designs.ts
└── payments.ts
```

Example:

```ts
export async function getTailors() {
  return fetch("/api/v1/tailors");
}
```

---

# Server Components First

Pages should be Server Components by default.

Use Client Components only when needed, such as:

* Forms
* Maps
* Editors
* Browser APIs
* Interactive UI

---

# Forms

Forms must include:

* Validation
* Loading state
* Error state
* Success state

Use Server Actions where suitable.

---

# Styling

Use Tailwind CSS.

Avoid inline styles unless absolutely necessary.

---

# Images

Use `next/image` for images.

Avoid regular `<img>` unless required.

---

# Authentication

Protected route groups:

```txt
(customer)
(studio)
(shared-auth)
(tailor)
(admin)
```

Protected pages must verify authentication and role access.

---

# File Uploads

All uploads must use backend endpoints:

```txt
POST /api/v1/uploads/image
POST /api/v1/uploads/images
POST /api/v1/uploads/file
```

Do not upload directly to Supabase Storage from the frontend.

---

# UI Implementation

All UI must follow the mockups inside:

```txt
agents/ui-designs/
```

Agents must not invent new page designs when a mockup exists.

---

# Loading and Error States

Pages that fetch data must handle:

* Loading state
* Empty state
* Error state
* Unauthorized state

Avoid blank screens.

---

# Final Rule

Before implementing a frontend feature:

1. Check `agents/routes.md`
2. Check `agents/components.md`
3. Check `agents/design-guidelines.md`
4. Follow the matching UI mockup
5. Reuse existing components
