# UI kit — Storefront website

A click-through recreation of the proposed Raghav Mobile Accessories shop website. Four screens in one page:

| Screen | File | Notes |
|---|---|---|
| Home | `HomeScreen.jsx` | Navy hero, category tiles, model picker, two product rails, offer banner, service cards |
| Category / listing | `CategoryScreen.jsx` | Sticky filter rail (brand, type, price, availability) + 3-up grid |
| Product detail | `ProductScreen.jsx` | Gallery slots, price block, colour tags, quantity, tabs, delivery promises |
| Cart & checkout | `CartScreen.jsx` | Line items, delivery vs pickup, contact fields, summary, confirmation |

Shared chrome (`Shell.jsx`): `TopStrip`, `Header`, `Footer`, `Section`. Fake data in `data.js`.

Everything visual comes from the design-system components (`Button`, `ProductCard`, `Price`, `Tabs`, …) and CSS tokens — nothing is restyled locally.

**Photography:** no product photography was supplied, so every image area is an explicit labelled slot. Drop real shop photos in rather than substituting stock imagery.
