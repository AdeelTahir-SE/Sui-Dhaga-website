# Design Guidelines

## Purpose

This file defines the UI implementation rules for Sui Dhaga.

The primary design source of truth is:

```txt
agents/ui-designs/
```

Agents must implement designs according to the provided UI mockups.

---

# Design Priority

When implementing any page:

```txt
1. ui-designs/*.png
2. design-guidelines.md
3. components.md
4. frontend-rules.md
```

The UI mockups always have highest priority.

---

# Core Rules

## Follow Existing Mockups

Before implementing a page:

1. Identify the page category.
2. Open the corresponding mockup.
3. Match layout structure.
4. Match component hierarchy.
5. Match spacing patterns.

Do not invent a different layout when a mockup already exists.

---

## Reuse Existing Components

Before creating a component:

1. Check components.md
2. Check existing components
3. Reuse if possible

Avoid duplicate components.

---

## Responsive Design

All pages must work on:

* Mobile
* Tablet
* Desktop

Responsive adaptations are allowed as long as the original layout structure is preserved.

---

## Accessibility

All forms and interactive elements must:

* Have labels
* Be keyboard accessible
* Have visible focus states
* Use proper semantic HTML

---

## Consistency

Maintain consistency for:

* Buttons
* Inputs
* Cards
* Navigation
* Dialogs
* Tables
* Forms

Do not create multiple versions of the same UI pattern.

---

## Forms

Forms should:

* Show validation errors clearly
* Show loading states
* Show success states
* Show error states

Never rely only on placeholders.

---

## Loading States

Pages that fetch data should include:

* Skeletons
* Loading indicators
* Empty states

Avoid blank screens.

---

## Error States

Pages should handle:

* Network failures
* Missing data
* Unauthorized access
* Empty results

Provide meaningful UI feedback.

---

## Allowed Changes

Agents may:

* Improve responsiveness
* Improve accessibility
* Improve performance
* Extract reusable components

Agents must not:

* Replace provided layouts
* Create new design systems
* Ignore mockups
* Change page structure significantly

---

# Final Rule

If there is a conflict between this document and a UI mockup:

The UI mockup wins.
