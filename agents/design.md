# Sui Dhaga Design Brief

This brief condenses the visual references in `agents/ui-designs/` so implementation can proceed without reopening the PNGs for every page.

## Brand Language

- Premium tailoring marketplace with an AI design studio.
- Background is warm ivory/cream, not pure white.
- Primary brand color is deep teal for CTAs, active sidebar items, pins, progress, and key controls.
- Accent colors are coral/red and mustard yellow, used sparingly for highlighted words, status chips, decorative corners, and small fashion motifs.
- Typography is bold, rounded, modern, and high contrast. Headlines use heavy black with coral emphasis on important words.
- Cards use thin warm borders, very light shadows, and 8px radius. Avoid oversized soft cards inside other cards.

## Shared Page Structure

- Top public navigation appears across public, auth, marketplace, customer, studio, community, and tailor pages.
- Admin pages use a dark left sidebar and a cleaner enterprise top bar.
- Decorative abstract corner shapes appear on most non-admin screens: teal, coral, and yellow fabric-like blocks with dotted/stitched texture.
- Use breadcrumbs at the top of detail and utility pages.
- Keep spacing airy on marketing/public pages and denser on dashboards.

## Public And Marketing Pages

- Homepage first viewport: left copy, right fashion/tailoring illustration, feature cards below.
- Home sections include two main creation paths, community inspiration, how-it-works steps, mobile preview, and dark footer.
- About/contact/blog/legal pages share the same public header/footer and large split hero layouts.
- Blog cards use fashion imagery blocks, category badges, author/date/read-time metadata.
- Legal pages use a two-column grid of numbered cards and a broad reassurance CTA.

## Auth Pages

- Split-screen composition: expressive illustration/story panel on the left, bordered form card on the right.
- Login, register, forgot password, and reset password share the same nav and decorative shapes.
- Inputs are full width with labels, thin borders, and teal primary buttons.
- Register includes role choice cards for customer and tailor.

## Marketplace Pages

- Tailor listing: search/filter bar above a two-column layout with tailor list on left and map on right.
- Map page: filters sidebar, large map canvas with pins, floating tailor card, bottom horizontal nearby carousel.
- Tailor profile: gallery on left, profile summary/actions/stats on right, services, availability, and reviews below.
- Compare page: selected tailor sidebar plus wide comparison table and per-tailor booking buttons.
- Fabrics page should reuse marketplace cards and filtering.

## Customer Pages

- Customer authenticated pages use a slim left sidebar with teal active item.
- Dashboard has welcome hero, quick overview stat cards, recent orders, upcoming appointments, saved designs, assistant CTA, recommendations.
- Orders and appointments are list/table pages with tabs, status chips, and view actions.
- Order detail uses horizontal tracking progress plus item, tailor, and payment summary cards.
- Measurements pages use a body diagram/card layout and editable measurement form.
- Wishlist/saved designs use tabs and compact card/list grids.
- Booking flow uses a multi-column form: selected tailor, service, calendar, times, notes/uploads, summary.

## AI Design Studio

- Studio home uses left studio sidebar, quick action cards, recent design gallery, AI suggestions, and an assistant CTA.
- New design page shows four method cards: text, image, sketch, chat.
- Generation pages are two-column: inputs/uploads/chat on left, generated result and variations on right.
- Editor is a full workspace: left tool rail, central garment canvas, right AI/style controls, top save/export actions.
- Export page is a clean tech pack with tabs, garment preview, size chart, color palette, fabric/embroidery details, and share/download buttons.

## Community And Messages

- Community feed uses authenticated-style sidebar, central post cards, right rail with trending designs/following.
- Create post page uses upload drop zone, selected thumbnails, caption, tags, visibility, and publish button.
- Post detail uses large image gallery and right engagement/comment panel.
- Messages use a left conversation list and large chat thread with teal outgoing bubbles and attachment/order summary.

## Tailor Pages

- Tailor landing is marketing-like with application CTA, benefits, process, requirements, and earning chart.
- Tailor dashboard pages use left sidebar, metric cards, appointment/order lists, earnings/profile completion widgets.
- Profile/services/orders/appointments/availability/earnings follow compact dashboard patterns with teal actions.

## Admin Pages

- Admin pages are visually distinct: dark navy sidebar, white content canvas, tables, search, filters, export buttons.
- Dashboard has KPI cards, revenue chart, recent activity, and operational status cards.
- Users/tailors/orders/payments pages are table-heavy with filters, status pills, pagination, and quick actions.

## Responsive Rules

- Mobile stacks hero and dashboard grids into one column.
- Sidebars become horizontal scroll/nav strips on smaller screens where needed.
- Tables can horizontally scroll inside a bordered panel.
- Preserve real controls and labels; do not rely on placeholder text alone.
