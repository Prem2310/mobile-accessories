# Raghav Mobile Accessories — Design System

## 1. Context

**Raghav Mobile Accessories** is a neighbourhood mobile-accessories shop in **Vastral, Ahmedabad**. It sells back covers and cases, tempered glass / screen guards, chargers and adapters, cables, earphones and power banks, and it fits screen guards at the counter. Today the shop sells through **Instagram posts and WhatsApp chats** to local customers; the goal of this system is a website that scales that — searchable stock by phone model, transparent prices, local delivery / store pickup, and WhatsApp still available as the closing channel.

### Sources given
- `uploads/WhatsApp Image 2026-09-11 at 1.48.47 AM.jpeg` — a JPEG of the shop signage logo (navy ground, orange + white wordmark, "MOBILE ACCESSORIES" rule-line lockup). Copied to `assets/logo-raghav.jpg`.
- A written brief describing the shop, its catalogue and its Instagram/WhatsApp sales channels.
- **No codebase, no Figma file, no existing website, no product photography, no font files** were provided. Everything below is derived from the logo plus the brief; anything invented is flagged.

## 2. Content fundamentals

**Voice: the shopkeeper who knows phones, talking to a neighbour.** Practical, warm, never salesy. Hindi/Gujarati-inflected directness in English — short sentences, concrete promises.

- **Person:** "you" for the customer, "we" for the shop. Never "the user", never third-person "Raghav Mobile Accessories offers…".
- **Casing:** Sentence case for headings and buttons ("Add to cart", "Shop by model"). UPPERCASE only for micro-labels, eyebrows and badges ("JUST IN", "50% OFF").
- **Length:** headlines ≤ 6 words; body paragraphs ≤ 2 sentences. Most reading happens on a phone on mobile data.
- **Specifics over adjectives.** Not "premium quality cases" → "1.2mm shock corners, checked on the actual handset". Not "fast delivery" → "collect in 10 minutes".
- **Local proof is the differentiator.** Mention Vastral, the store, the counter, fitting, cash on delivery. Examples: "Free screen-guard fitting, every day", "Available at Vastral store today — collect in 10 min", "Free delivery in Vastral · ₹40 elsewhere in Ahmedabad".
- **Prices:** always ₹ prefixed, Indian digit grouping (₹1,29,900). MRP struck through, savings in green as "35% off". Never write the discount by hand — compute it.
- **Emoji: no.** Instagram captions may use them; the website and product UI never do. Icons are Lucide glyphs.
- **No jargon, no marketing abstractions** ("ecosystem", "curated", "elevate"). No fake urgency ("Hurry! Only 2 left!") unless the count is real.
- **Buttons** name the action: "Add to cart", "Order on WhatsApp", "Get directions", "Load more". Never "Submit", "Click here", "Learn more".

## 3. Visual foundations

**Motif: the signage.** Deep navy ground, one hot orange, clean white type, generous rounding. The site should feel like the shop's board — bold, high-contrast, unfussy.

- **Colour.** Navy `--navy-800 #0a2153` is the brand ground (header, footer, hero, dark cards). Orange `--orange-500 #f26a00` is the *action* colour only: primary buttons, eyebrows, active indicators, badges — roughly 5–10% of any screen. Everything else is white cards on a `--gray-50` page. Green `--green-600` for savings/stock, red for errors, amber for warnings. WhatsApp green `#25d366` and Instagram magenta `#c13584` are channel colours, used only for those channels and never restyled. **Two background colours per screen max** (page grey + navy).
- **Type.** Display = **Baloo 2** (heavy, rounded, geometric — matches the wordmark; carries Devanagari + Gujarati). UI/body = **Manrope**. Numerals/SKUs = **DM Mono**. Scale: 44 / 34 / 26 / 20 / 17 / 15 / 13 / 11.5px. Headings tighten to −0.02em; eyebrows track out to +0.12em uppercase.
- **Spacing & layout.** 4px base step (4→80). 1200px container, 24px gutter (16px on mobile), 48–80px between sections. Product grids: 4-up desktop, 3-up with a filter rail, 2-up mobile. The header is sticky; filter rails and cart summaries are sticky at `top:110px`. A floating WhatsApp button is fixed bottom-right on every page.
- **Corner radii.** xs 4 (badges) · sm 8 · md 12 (inputs, thumbnails) · lg 18 (cards) · xl 26 (hero panels) · pill 999 (every button, tag and chip). Nothing is square except badges.
- **Cards.** White, 18px radius, 1px `--gray-200` hairline border, soft navy-tinted shadow `0 1px 2px / 0 6px 18px rgba(10,33,83,.06–.07)`. Never a card inside a card. Interactive cards lift 2px and deepen the shadow on hover.
- **Shadows.** Always navy-tinted, never neutral black. Four roles: card, hover, sticky bar, and `--shadow-brand` (orange glow under primary CTAs). Inner shadow only for the pressed state.
- **Borders.** Hairline `--gray-200` for structure, 1.5px `--gray-300` for controls, 1.5px orange for focus/selected, 3px orange underline for active tabs. Dashed navy borders mark *placeholder* areas (missing photography) — a deliberate, visible "content goes here" signal.
- **Motion.** 120ms for control feedback, 200ms for card/hover, 320ms for larger transitions; `--ease-out cubic-bezier(.2,.8,.3,1)`. Fades and 2px lifts only — no bounces, no spring, no parallax, no scroll-jacking.
- **Hover.** Buttons darken one step (500→600) and lift 2px; ghost/outline buttons fill with a tint (`--gray-100` / `--navy-50`); cards lift + deepen shadow; product cards reveal the wishlist button. **Press:** scale to .975 with an inset shadow, one step darker again (600→700). **Disabled:** opacity .45, pointer-events off. **Focus:** 3px `rgba(242,106,0,.30)` ring plus an orange border.
- **Transparency & blur.** Used sparingly and only on navy: `rgba(255,255,255,.06–.16)` for chips, social buttons and image slots inside the hero. No frosted glass, no backdrop blur, no gradient overlays. Flat colour is the house style — the only "gradient" allowed is the orange CTA shadow.
- **Imagery.** Product shots are square (1:1), centred, on white or light grey — catalogue-style, warm neutral, no heavy filters or grain. Lifestyle/shop photos are warm daylight, shot in the store. **None were supplied**, so every image area in this system renders a labelled placeholder slot instead. Do not substitute stock photography.
- **Fixed elements.** Sticky header, sticky filter/summary rails, floating WhatsApp CTA. Nothing else pins.

## 4. Iconography

- **Set: [Lucide](https://lucide.dev) v0.454, loaded from CDN** (`https://unpkg.com/lucide@0.454.0/dist/umd/lucide.js`). The brand had no icon set of its own, so this is a **flagged substitution** — chosen for its 2px rounded-cap stroke, which matches the rounded wordmark.
- Access it only through the `Icon` component (`<Icon name="shopping-bag" size={20} />`). 2px stroke, `currentColor`, 16/18/20/22px sizes.
- Common glyphs: `smartphone`, `shield-check`, `zap`, `cable`, `headphones`, `battery-charging`, `shopping-bag`, `heart`, `search`, `map-pin`, `truck`, `store`, `message-circle`, `instagram`, `star`, `trash-2`.
- **No emoji anywhere in product UI. No hand-drawn SVG icons. No unicode symbols as icons** — the only non-Lucide glyphs are the ₹ sign, the − / + in the quantity stepper, and the / breadcrumb separator.
- **Logo:** `assets/logo-raghav.jpg` is the only brand asset supplied — a raster of the signage. There is **no vector logo and no transparent version**, so where a mark is needed on light surfaces the wordmark is set in plain type (Baloo 2 800, navy, with the "a" in orange). Nothing was drawn or reconstructed. Please send an SVG/PNG.

## 5. Index

**Root**
- `styles.css` — the single entry point consumers link (import list only)
- `readme.md` (this file) · `SKILL.md` · `thumbnail.html`
- `assets/logo-raghav.jpg`

**Tokens** — `tokens/`: `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `base.css`

**Guidelines / specimen cards** — `guidelines/`: colour (brand navy, brand orange, neutrals, status & channel, semantic aliases), type (display, body, mono & numerals, scale), spacing (scale, radii, layout rhythm), brand (shadows, motion & states, logo, channels)

**Components**
- `components/core/` — **Button**, **IconButton**, **Badge**, **Tag**, **Card**, **SectionHeading**, **Icon**
- `components/forms/` — **Input**, **SearchBar**, **Select**, **Checkbox**, **QuantityStepper**
- `components/commerce/` — **Price**, **Rating**, **ProductCard**, **OfferBanner**, **WhatsAppCTA**
- `components/navigation/` — **Tabs**, **Breadcrumbs**

Each directory has a `*.card.html` specimen; each component has `.jsx`, `.d.ts` and `.prompt.md`.

**UI kits** — `ui_kits/storefront/`: home, category, product detail, cart & checkout (see its README).

### Intentional additions
No source defined a component inventory, so this is an authored set sized to a small retail storefront. Two entries deserve a note:
- **Icon** — a thin wrapper over Lucide, so consumers never hand-roll SVG.
- **WhatsAppCTA** — not a generic primitive, but WhatsApp *is* this shop's checkout; it earns component status.

### Open questions / substitutions to confirm
1. Fonts — Baloo 2 + Manrope are Google-Font stand-ins for the signage lettering. Send the original font files if the signwriter used a licensed face.
2. Logo — raster only; a vector or transparent PNG is needed.
3. Photography — none supplied; all image areas are placeholders.
4. Phone number, GST number and Instagram handle in the UI kit are placeholders.
