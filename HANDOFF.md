# Handoff — Raghav Mobile Accessories

Built overnight, autonomously, per your "continue without me" instruction. Read this first.

## Run it

```bash
npm install
cp .env.example .env
npm run dev
```

`.env.example` already has the real project URL + publishable (anon) key — those are safe to be public, RLS protects the data. `.env` itself is gitignored and was never committed.

## Admin login

`/admin` — sign in with:

- Email: `patelprem7736@gmail.com`
- Password: `RaghavOwner#2026`

**Change this password** (or create your own owner account) once you're in — this was a bootstrap credential typed straight into the plan. Supabase project ref: `obsgnvdgpblnlsndygdx`.

One gotcha if you ever add a second admin/staff account: this Supabase project has "Confirm email" ON by default, and there's no API to turn it off — a new `signUp()` won't get a session until the email is confirmed. `AdminLogin.tsx` surfaces this as a message when it happens; if it blocks you, either confirm the email or ask me to flip that setting off in the Supabase dashboard (Auth → Providers → Email).

## What's built

- **Storefront**: home (light hero — banner carousel or text fallback, no 3D), shop/category/product pages, cart drawer, wishlist — all `localStorage`, no login for customers.
- **Hero banners**: `/admin/banners` → "Hero banners" — upload desktop + mobile images per banner, with title/description/CTA. Homepage shows them as a full-bleed carousel (arrows + dots, no autoplay). With zero banners uploaded, the homepage falls back to a clean text-only hero instead of a placeholder — upload at least one banner image to get the photography-led look you asked for; nothing to configure beyond that.
- **Shop filters**: in-stock, on-discount, price range, rating, brand, and "Compatible with" (phone model — derived from `products.compatibility`, e.g. filtering "iPhone 15" shows every case/glass listed for it). All state lives in the URL (`?model=iPhone+15`), so filtered views are shareable and back-button-safe. Desktop shows a sticky sidebar; mobile gets a "Filters" button opening a bottom sheet (there was no way to filter on mobile before today).
- **Admin products filtering**: search by title/slug, filter by category, stock level (low/out), and visibility, above the products table — this was the "manage products is hard, no filter" gap.
- **Product gallery**: PDP shows a main photo + thumbnail strip for products with multiple images; thumbnails swap the main image on click.
- **WhatsApp-only ordering**: "Order on WhatsApp" and "Send cart to WhatsApp" build a pre-filled `wa.me` message. If a product has an uploaded photo, the message links straight to it (Supabase Storage URL); otherwise it links to the product page.
- **Admin dashboard** (`/admin`, code-split from the storefront bundle):
  - Products table: inline price/stock/publish edit for simple products, thumbnail preview, add/delete.
  - **Full product editor** (click any product row or the pencil icon): title, slug (read-only), category, brand, compatibility, descriptions, pricing/stock, publish/featured/bestseller/new-arrival flags, a multi-photo gallery manager (upload several at once, delete, reorder with arrows), variants (add/edit/delete rows with a single label+value attribute, e.g. "Model" → "iPhone 15", plus per-variant price/MRP/stock), specifications (label/value rows), warranty, delivery info, tags, SEO title/description.
  - Categories, banners, site settings (store name, WhatsApp number, hero copy) — unchanged from this morning.
- **Backend**: Supabase Postgres + RLS on every table (public reads published/enabled rows, only `is_admin()` can write), Supabase Storage bucket `product-images` (public-read, admin-only write). All migrations live in `supabase/migrations/` and match the live project 1:1 (`0001`–`0005`).

## Fixed today

- **Hero rebuilt twice today.** First pass kept the 3D product-cluster idea but you didn't like it and asked for a photography-led carousel like an Awwwards/Dribbble/21st.dev reference (light background, real product images, arrow-nav carousel, trust-badge strip underneath) — no 3D at all. Rebuilt as `HeroCarousel.tsx`: reads from the `banners` table (schema already had it, nothing was wired to it — `AdminBannersPage` only ever managed `offers`, the text strips). Removed the 3D scene entirely (`src/features/3d/`, `@react-three/fiber`, `@react-three/drei`, `three` — ~900KB off the bundle) since there was no live use of it left and no reason to keep the dependency around unused.
- **PDP layout bug** (`localhost:5173/products/dulero-matel-case-for-iphone` and any product with a portrait photo): the image frame had a circular width/aspect-ratio sizing dependency that made the box balloon to ~3x its column width whenever a non-square photo was uploaded. Fixed by giving the frame an explicit `width: 100%` and switching to `object-fit: contain` so portrait/landscape phone photos aren't cropped.
- **Admin editor clobbering unsaved edits**: uploading a photo, adding a variant, or editing a variant field used to re-fetch the whole product row and silently wipe out anything typed into Basic/Pricing/Flags that hadn't been saved yet. Variant/image actions now only refresh those two lists, not the rest of the form.
- **Editor panel horizontal scroll**: fixed-width grids in the variant row and pricing row could force the whole slide-over to scroll sideways on narrow widths, hiding fields. Now responsive (`auto-fit`) and the scroll container clips horizontal overflow.
- **Variant price display**: products with variants (3 seeded ones) now show "Edit variants (N)" instead of a price/MRP input that silently did nothing — click it to open the full editor.

## On category hierarchy (cases → iPhone → model)

You asked for nested categories like Cases → iPhone → model. The schema already supports one level of nesting (`categories.parent_id`, unused), but modeling *model-level* filtering as categories would mean one product needs to live in several categories at once (one case fits 4+ iPhone models) — the schema is one category per product, so that breaks. Instead this is now a **filter facet**: `compatibility` on each product (already existed, now surfaced as "Compatible with" checkboxes in Shop filters, sourced live from what's on real products — no separate taxonomy to maintain). Category stays flat (Phone Cases, Screen Protectors, …); model/brand narrow within it. If the flat category list ever gets long enough to need visual grouping (not filtering), `parent_id` is there for that — a separate, smaller change.

## Known gaps (not started)

- **Coupons UI / reviews moderation** — tables + RLS exist, no admin screens yet.
- **No real product or banner photography yet.** The catalog/hero infrastructure is fully built (multi-photo gallery, banner carousel), but almost every product still shows a placeholder and there are no hero banners uploaded — the site will look empty/generic until real photos go in via the admin panel. This is the single biggest thing standing between the current build and looking like the reference you shared.
- **SEO** — no sitemap.xml, robots.txt, or JSON-LD yet.
- **Analytics** — nothing to show; there's no `orders` table since checkout is WhatsApp-only. Would need a lightweight "order intent" log if you want numbers.
- **Mobile admin layout** — the sidebar is a fixed 220px column and the products table scrolls horizontally past ~800px. Usable on desktop/tablet; a shop owner managing stock from their phone will find it cramped. The product editor panel itself is full-width on mobile already, just the table/sidebar around it aren't.
- **PDP gallery** has no lightbox/zoom/swipe — just click-to-swap thumbnails, deliberately kept simple.

## Where things are

- Plan: `C:\Users\premr\.claude\plans\melodic-watching-pony.md`
- Commits on `master`: Phase 0, Phase 1–3, Phase 5–6, admin photo/variant fixes + this editor rebuild.
