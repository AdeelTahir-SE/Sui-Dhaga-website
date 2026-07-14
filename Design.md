# UI Design System: Sui Dhāga Online Tailoring & AI Design Studio Platform

## 1. Visual Theme & Atmosphere

The user experience of Sui Dhāga is designed to merge the time-honored artistry of traditional tailoring with the forward-looking capabilities of artificial intelligence. The interface evokes an elegant, premium, yet highly accessible boutique environment. Rather than utilizing stark tech-centric dark modes or uninspired corporate white spaces, the system relies on a warm, inviting light ivory base canvas paired with a sophisticated deep teal primary accent and playful, flowing coral organic geometry. 

The aesthetic strikes a balance between professional utility and creative inspiration. Visual layouts across `home1.png`, `home2.png`, and user portals are softened by organic background waves, elegant line illustrations, and friendly, fashionable vector artwork. Elements are clean, highly approachable, and meticulously structured to guide customers, tailors, and admins alike through a seamless custom clothing journey.

**Key Characteristics:**
- Warm Ivory/Cream base canvas to establish a premium, welcoming, and high-craft boutique atmosphere.
- Deep Teal as the core brand color, anchoring primary call-to-actions, navigation headers, and interactive states.
- Fluid Coral/Orange abstract organic shapes flowing along the margins to give a hand-crafted, creative textile feel.
- Soft, approachable rounded corners (8px - 16px) on cards, containers, and action items to ensure user friendliness.
- Highly organized, clean multi-column layouts across comprehensive dashboards (tailor, customer, and admin panels).
- Crisp vector icon treatments paired with expressive fashion imagery and realistic clothing rendering profiles.

---

## 2. Color Palette & Roles

### Primary & Status
- **Ivory Base** (`#FFFDF9`): Global background canvas. Provides a soft, warm, premium backdrop that minimizes eye strain compared to pure white.
- **Deep Teal** (`#007A7A`): Core brand action color. Applied to primary buttons, active sidebar tabs, headers, and major interaction focuses.
- **Creative Coral** (`#FF5B52`): Accent brand color. Used for background organic waves, secondary decorative motifs, and celebratory highlights.
- **Pure White** (`#FFFFFF`): Surface color for inner cards, dashboard panels, white input fields, and block containers to establish visual contrast against the ivory canvas.

### Secondary & Status Signals
- **Charcoal Text** (`#1E1E1E`): Primary typography text value for maximum legibility and polished structural hierarchy.
- **Muted Slate** (`#6B7280`): Secondary text, field placeholders, subheadings, and inactive navigational states.
- **Status Green** (`#22C55E`): Used for "Active" states, "Verified" badges, successful payment rows, and "In Progress" tracking indicators.
- **Status Orange** (`#F97316`): Used for "Pending" tailors, "Pending Verification" counts, and active queue alerts.
- **Status Blue** (`#3B82F6`): Used for "Delivered" flags, messaging notifications, or informational chat updates.

---

## 3. Typography Rules

### Font Family
- **Headings & Brand Display**: Modern, approachable geometric sans-serif with slight organic curves (e.g., `Plus Jakarta Sans`, `Poppins`, or `Outfit`). It must project a fashion-forward, friendly premium voice.
- **Body & Functional Data**: Highly legible structural sans-serif (e.g., `Inter` or `DM Sans`) optimized for text blocks, extensive tables, configuration settings, and detailed form structures.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Case | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Huge Title** | Display | 3.5rem–4.5rem | 800 | 1.15 | -0.02em | Sentence | Prominent headers like "Grow with Sui Dhāga" |
| **Section Header** | Display | 2.0rem–2.5rem | 700 | 1.25 | Normal | Sentence | Section identification, e.g., "Manage Orders" |
| **Card / Item Title** | Body | 1.25rem | 600 | 1.30 | Normal | Sentence | Tailor names, service names, template items |
| **Primary Button** | Body | 1.0rem | 600 | 1.00 | +0.02em | Sentence | High-contrast actions ("Book Appointment") |
| **Data Row Text** | Body | 0.95rem | 500 | 1.40 | Normal | Mixed | Customer rows, order IDs, analytics metrics |
| **Metadata Label** | Body | 0.8rem | 500 | 1.20 | +0.05em | Uppercase | Small badges, time-stamps, status text |

### Principles
- **Polished Data Grid Balance**: In heavy analytical views seen in `admin-pages.png` and `tailor-pages.png`, layout densities must strike a fine balance between clean separation and rapid data parsing.
- **Consistent Rounding & Weight**: Pair medium-to-bold weights with high-contrast text styling to guarantee complete accessibility across customer mobile screens and admin desktop monitors.

---

## 4. Component Stylings

### Action Components & Input Fields
- **Primary Buttons**: Solid Deep Teal (`#007A7A`) background with Pure White (`#FFFFFF`) text, featuring rounded corners (8px - 12px). Active hover states intensify slightly or introduce a minor glow.
- **Secondary Buttons**: Outlined Deep Teal with a clear background or soft warm tint. 
- **Form Text Fields**: Clean white surfaces with light slate borders (`1px solid #E5E7EB`). When a text box receives active focus, its border transforms instantly to a solid Deep Teal outline.

### Cards & Container Panels
- **Content Block Surfaces**: Built on flat white cards with subtle, soft rounded corners (12px - 16px). 
- **Shadow Treatment**: Minimalist elevation drop-shadows are used to create smooth layering: `box-shadow: 0 4px 24px rgba(0, 0, 0, 0.03);`.
- **Active Navigation Highlights**: Within sidebars (`customer-pages.png`, `tailor-pages.png`), the active item features a solid Deep Teal fill or text color accompanied by an explicit active marker.

---

## 5. Layout Principles

### Spacing System
- **Base Grid**: Clean `4px` / `8px` geometric system.
- **Dashboard Structure**: Side navigation bars occupy a fixed left lane, leaving the primary center-right viewport open to host dynamic modular grids, data visualizations, or multi-step form panels.
- **Footer & Margin Accent Placement**: Elegant, flowing Coral and Deep Teal wave vector forms line the screen bottom or corner edges, adding creative flare without obscuring primary functional fields.

### Structural Blueprints

```
+-------------------------------------------------------------------------+
|  [Sui Dhāga Logo]     Find a Tailor   AI Design Studio   Community  (O) |
+-------------------------------------------------------------------------+
|  +------------------------+  +---------------------------------------+  |
|  |  (D) Dashboard         |  | Welcome back, Arjun!                  |  |
|  |  (P) Profile           |  +---------------------------------------+  |
|  |  (S) Services          |  | [12 New Orders]   [5 Appointments]    |  |
|  | >(O) Orders            |  | [18 In Progress]  [₹24,860 Earnings]  |  |
|  |  (A) Appointments      |  +---------------------------------------+  |
|  |  (M) Messages          |  |  MANAGE ORDERS                        |  |
|  |  (E) Earnings          |  |  Order #SD1256   Anarkali Suit   [IP] |  |
|  |  (L) Logout            |  |  Order #SD1257   Lehenga Set     [New]|  |
|  +------------------------+  +---------------------------------------+  |
+-------------------------------------------------------------------------+
```

---

## 6. Depth & Elevation

The user interface feels flat, clean, and modern, using layering and crisp line divisions rather than aggressive physical depths.

| Level | Background | Border/Shadow Treatment | System Use Case |
| :--- | :--- | :--- | :--- |
| **Level 0** | `#FFFDF9` | None | Outer page foundation canvas, landing backgrounds. |
| **Level 1** | `#FFFFFF` | `1px solid #E5E7EB` | Dashboard content blocks, filter bars, profile cards. |
| **Level 2** | `#FFFFFF` | Shadow: `0 8px 30px rgba(0,0,0,0.04)` | Dropdowns, popups, messaging bubbles, hover states. |
| **Level 3** | `#007A7A` | None | Main high-contrast focus elements, execution CTAs. |

---

## 7. Do's and Don'ts

### Do
- Maintain the warm Ivory (`#FFFDF9`) background as the base canvas for the core landing and portal interfaces.
- Apply high-contrast Deep Teal (`#007A7A`) to primary call-to-actions to direct user navigation pathways.
- Ensure all interactive cards and content surfaces have rounded corners (8px - 16px) to keep the boutique atmosphere approachable.
- Utilize clear, colored status badges (Green for active, Orange for pending) to make analytics tables highly scannable.
- Support both detailed measurement forms (as seen in `customer-pages.png`) and clean multi-column layouts for quick item comparison.

### Don't
- Use harsh pure blacks (`#000000`) or glowing high-intensity neons as backgrounds or primary accents.
- Implement sharp, jagged zero-radius corners on dashboard modules or primary call-to-action buttons.
- Overcrowd functional data rows—always leave breathing room on the 8px grid scale.
- Substitute the sophisticated Deep Teal with default lifestyle corporate blues or violets.

---

## 8. Agent Prompt Guide

### Quick Color Reference
- **Boutique Base Canvas**: `#FFFDF9`
- **Core Deep Teal Action**: `#007A7A`
- **Creative Accent Coral**: `#FF5B52`
- **Inner Surface Card**: `#FFFFFF`
- **Primary Text Charcoal**: `#1E1E1E`

### Example Component Prompts
- `"Generate an elegant profile setup overview tile component over a flat #FFFFFF card surface, featuring soft 12px rounded corners, deep teal text headers, and clean measurement input fields utilizing subtle 1px slate borders."`
- `"Design a responsive user management grid view for an admin page on an ivory #FFFDF9 background, displaying structured rows with clear green active badges and standard teal pagination buttons."`
- `"Construct an AI design template selection display card containing beautiful custom apparel images, soft drop-shadows, and an interactive teal 'Use as Reference' execution action."`