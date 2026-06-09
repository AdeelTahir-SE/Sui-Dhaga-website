# Components

## Purpose

This document defines how components should be organized and reused in the Sui Dhaga website.

---

# Component Locations

## Shared Components

Reusable components used across multiple pages must go inside:

```txt
src/components/
```

Example:

```txt
src/components/
├── ui/
├── common/
├── forms/
└── maps/
```

---

## Route-Specific Components

Components used by only one route group should go inside:

```txt
src/app/.../_components/
```

Example:

```txt
src/app/(marketplace)/tailors/_components/
├── tailor-card.tsx
├── tailor-filters.tsx
└── tailor-map.tsx
```

---

# Shared Component Folders

## ui

Base shadcn/ui components.

```txt
src/components/ui/
```

Examples:

```txt
button.tsx
input.tsx
dialog.tsx
card.tsx
badge.tsx
tabs.tsx
dropdown-menu.tsx
```

---

## common

Shared layout and general components.

```txt
src/components/common/
```

Examples:

```txt
navbar.tsx
footer.tsx
page-header.tsx
empty-state.tsx
loading-state.tsx
error-state.tsx
section-wrapper.tsx
```

---

## forms

Reusable form components.

```txt
src/components/forms/
```

Examples:

```txt
form-field.tsx
image-upload.tsx
search-input.tsx
date-picker.tsx
```

---

## maps

Shared map components.

```txt
src/components/maps/
```

Examples:

```txt
google-map.tsx
map-marker.tsx
location-picker.tsx
```

---

# Naming Rules

Use kebab-case for component files.

Correct:

```txt
tailor-card.tsx
booking-form.tsx
design-preview.tsx
```

Incorrect:

```txt
TailorCard.tsx
bookingForm.tsx
DesignPreview.tsx
```

---

# Reuse Rule

Before creating a new component:

1. Check `src/components/`
2. Check route `_components/`
3. Check `components.md`
4. Reuse or extend existing components when possible

Avoid duplicate components.

---

# Component Rules

Components should be:

* Small
* Reusable
* Typed with TypeScript
* Easy to read
* Consistent with UI mockups

---

# Client Components

Use `"use client"` only when needed.

Examples:

* Forms
* Dialogs
* Dropdowns
* Maps
* Editors
* Browser APIs
* Interactive state

Do not make every component a Client Component.

---

# UI Source

All components must match the UI direction from:

```txt
agents/ui-designs/
```

Do not invent new component styles when mockups already show the expected UI.
