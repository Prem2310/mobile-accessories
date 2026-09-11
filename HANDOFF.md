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

- **Storefront**: home (3D hero + fallback), shop/category/product pages with filters, cart drawer, wishlist — all `localStorage`, no login for customers.
- **WhatsApp-only ordering**: "Order on WhatsApp" and "Send cart to WhatsApp" build a pre-filled `wa.me` message. If a product has an uploaded photo, the message links straight to it (Supabase Storage URL); otherwise it links to the product page.
- **Admin dashboard** (`/admin`, code-split from the storefront bundle): products (inline price/stock/publish edit, photo upload, add/delete), categories, banners, site settings (store name, WhatsApp number, hero copy).
- **Backend**: Supabase Postgres + RLS on every table (public reads published/enabled rows, only `is_admin()` can write), Supabase Storage bucket `product-images` (public-read, admin-only write). All migrations live in `supabase/migrations/` and match the live project 1:1 (`0001`–`0005`).

## Known gaps (not started)

- **Coupons UI / reviews moderation** — tables + RLS exist, no admin screens yet.
- **Banner image upload** — `AdminBannersPage` is text/link fields only; no file picker wired.
- **SEO** — no sitemap.xml, robots.txt, or JSON-LD yet.
- **Analytics** — nothing to show; there's no `orders` table since checkout is WhatsApp-only. Would need a lightweight "order intent" log if you want numbers.
- **Mobile admin layout** — the sidebar is a fixed 220px column; it will crush on a phone screen. Fine on desktop/tablet, not yet tested/fixed for a shop owner managing stock from their phone.
- **Products table on desktop** already scrolls horizontally past ~800px — acceptable but not pretty.
- **Variant pricing** — 3 seeded products (`matte-silicone-case`, `clear-magsafe-case`, `9h-tempered-glass`) have per-variant prices. The admin products table shows "per variant (N)" instead of a broken editable field for these — there's no variant price editor yet, so change those prices directly in Supabase (`product_variants` table) until one exists.

## Where things are

- Plan: `C:\Users\premr\.claude\plans\melodic-watching-pony.md`
- 3 clean commits on `master`: Phase 0, Phase 1–3, Phase 5–6.
- This file (`HANDOFF.md`) and today's admin-usability fixes (variant-price display, photo upload, missing migrations) are **not yet committed** — do that once you've looked it over.
