-- Seed data matching src/lib/mockData.ts, so swapping the storefront onto
-- Supabase reads doesn't change what's on screen. Product prices/stock are
-- placeholder — the Instagram handle and reviews below are real, pulled from
-- the shop's Google Business listing.

update public.site_settings set
  store_name = 'Raghav Mobile Accessories',
  area = 'Vastral, Ahmedabad',
  hours = '10:00 am – 10:00 pm, all days',
  whatsapp_number = '919974713131',
  instagram_handle = '@raghav_mobile_accessories',
  gst_number = '24XXXXX1234X1ZX',
  whatsapp_order_template = E'Hi {{store}}, I want to order:\n{{items}}\nTotal: {{total}}',
  whatsapp_enquiry_template = 'Hi {{store}}, I have a question about {{product}}.',
  free_delivery_threshold = 499,
  hero_eyebrow = 'Vastral, Ahmedabad',
  hero_headline = 'Upgrade your phone. Upgrade your style.',
  hero_subheadline = 'Premium cases, chargers and everyday tech essentials — priced honestly, fitted free at our Vastral counter.'
where id = true;

insert into public.categories (slug, name, icon, sort_order) values
  ('phone-cases', 'Phone Cases', 'smartphone', 1),
  ('screen-protectors', 'Screen Protectors', 'shield-check', 2),
  ('chargers', 'Chargers', 'zap', 3),
  ('cables', 'Cables', 'cable', 4),
  ('power-banks', 'Power Banks', 'battery-charging', 5),
  ('earphones', 'Earphones', 'headphones', 6),
  ('tws-earbuds', 'TWS / Earbuds', 'headphones', 7),
  ('speakers', 'Speakers', 'zap', 8),
  ('mobile-holders', 'Mobile Holders', 'smartphone', 9),
  ('car-accessories', 'Car Accessories', 'truck', 10),
  ('adapters', 'Adapters', 'zap', 11),
  ('smart-gadgets', 'Smart Gadgets', 'zap', 12),
  ('other-accessories', 'Other Accessories', 'package', 13);

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, featured, bestseller, new_arrival, variant_label, compatibility, warranty, delivery_info, tags)
select 'matte-silicone-case', 'Matte Silicone Case', '1.2mm shock corners, soft-touch matte finish', id, 449, 699, 4.6, 128, 40, true, true, false, 'Model',
  array['iPhone 15','iPhone 15 Pro','iPhone 15 Pro Max','Samsung S24','Samsung S24 Ultra','Redmi Note 13 Pro','OnePlus 12'],
  '3 months against manufacturing defects', 'Free delivery in Vastral · ₹40 elsewhere in Ahmedabad', array['case','silicone']
from public.categories where slug = 'phone-cases';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, new_arrival, variant_label, compatibility, tags)
select 'clear-magsafe-case', 'Transparent MagSafe Case', 'Crystal-clear, magnetic ring built in', id, 599, 899, 4.5, 64, 25, true, 'Model',
  array['iPhone 15','iPhone 15 Pro','iPhone 15 Pro Max'], array['case','magsafe']
from public.categories where slug = 'phone-cases';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, bestseller, variant_label, compatibility, tags)
select '9h-tempered-glass', '9H Tempered Glass', 'Edge-to-edge, oleophobic coating', id, 99, 199, 4.4, 212, 80, true, 'Model',
  array['iPhone 15','iPhone 15 Pro','iPhone 15 Pro Max','Samsung S24','Samsung S24 Ultra','Redmi Note 13 Pro','OnePlus 12'], array['glass']
from public.categories where slug = 'screen-protectors';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'privacy-screen-guard', 'Privacy Screen Guard', 'Anti-spy angle filter', id, 349, 599, 4.7, 34, 18, array['glass','privacy']
from public.categories where slug = 'screen-protectors';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, featured, bestseller, specifications, tags)
select 'fast-usb-c-charger', 'Fast USB-C Charger 33W', 'PD + QC fast charging adapter', id, 649, 899, 4.8, 96, 30, true, true,
  '[{"label":"Output","value":"33W PD/QC"},{"label":"Input","value":"100-240V"}]'::jsonb, array['charger']
from public.categories where slug = 'chargers';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, new_arrival, tags)
select 'wireless-charger-pad', 'Wireless Charger Pad', '15W fast wireless charging', id, 899, 1299, 4.3, 21, 12, true, array['charger','wireless']
from public.categories where slug = 'chargers';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, bestseller, tags)
select 'braided-type-c-cable', 'Braided Type-C Cable 1.5m', '60W fast charge, nylon braided', id, 199, 349, 4.5, 143, 60, true, array['cable']
from public.categories where slug = 'cables';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'lightning-cable', 'Lightning Cable 1m', 'MFi-style fast charge cable', id, 249, 399, 4.2, 58, 22, array['cable']
from public.categories where slug = 'cables';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, featured, tags)
select 'powerbank-10000mah', '10000mAh Slim Power Bank', '22.5W dual output, pocket slim', id, 1099, 1699, 4.6, 71, 15, true, array['powerbank']
from public.categories where slug = 'power-banks';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'powerbank-20000mah', '20000mAh Power Bank', 'Dual USB-A + USB-C PD', id, 1599, 2299, 4.4, 29, 9, array['powerbank']
from public.categories where slug = 'power-banks';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'wired-earphones', 'Wired Earphones with Mic', 'In-line remote, deep bass', id, 249, 449, 4.1, 88, 35, array['earphones']
from public.categories where slug = 'earphones';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, bestseller, featured, tags)
select 'tws-earbuds-pro', 'TWS Earbuds Pro', '40h playback, ENC mic, touch controls', id, 1299, 2499, 4.2, 163, 20, true, true, array['tws','earbuds']
from public.categories where slug = 'tws-earbuds';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, new_arrival, tags)
select 'anc-earbuds', 'ANC Earbuds', 'Active noise cancellation, 6h battery', id, 1899, 3299, 4.5, 42, 11, true, array['tws','anc']
from public.categories where slug = 'tws-earbuds';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'bluetooth-speaker', 'Portable Bluetooth Speaker', 'IPX5 splash resistant, 10h playback', id, 1499, 2199, 4.3, 37, 14, array['speaker']
from public.categories where slug = 'speakers';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, bestseller, tags)
select 'car-mobile-holder', 'Car Mobile Holder', '360° rotating dashboard mount', id, 349, 599, 4.4, 66, 28, true, array['car','holder']
from public.categories where slug = 'car-accessories';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'car-charger-dual-usb', 'Car Charger Dual USB', '36W fast charge, 2 ports', id, 399, 649, 4.2, 19, 17, array['car','charger']
from public.categories where slug = 'car-accessories';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'desk-mobile-stand', 'Desk Mobile Stand', 'Adjustable angle, foldable aluminium', id, 299, 499, 4.5, 24, 20, array['holder','stand']
from public.categories where slug = 'mobile-holders';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'type-c-to-usb-adapter', 'Type-C to USB-A Adapter', 'OTG-ready, compact', id, 149, 249, 4.0, 12, 40, array['adapter']
from public.categories where slug = 'adapters';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, new_arrival, tags)
select 'smart-watch-band', 'Smart Watch Strap', 'Silicone, sweat resistant', id, 299, 499, 4.1, 15, 26, true, array['gadget','watch']
from public.categories where slug = 'smart-gadgets';

insert into public.products (slug, title, short_description, category_id, price, mrp, rating, review_count, stock, tags)
select 'phone-sanitizer-stand', 'Phone Sanitiser & Charge Stand', 'UV clean + wireless charge', id, 1199, 1899, 3.9, 8, 6, array['other']
from public.categories where slug = 'other-accessories';

-- Variants for the two variant-bearing seed products (Model attribute, matching mockData's variantsFor helper)
with v(product_slug, model, price_delta) as (
  values
    ('matte-silicone-case', 'iPhone 15', 0), ('matte-silicone-case', 'iPhone 15 Pro', 20), ('matte-silicone-case', 'iPhone 15 Pro Max', 40), ('matte-silicone-case', 'Samsung S24', 60),
    ('clear-magsafe-case', 'iPhone 15', 0), ('clear-magsafe-case', 'iPhone 15 Pro', 20), ('clear-magsafe-case', 'iPhone 15 Pro Max', 40), ('clear-magsafe-case', 'Samsung S24', 60),
    ('9h-tempered-glass', 'iPhone 15', 0), ('9h-tempered-glass', 'iPhone 15 Pro', 20), ('9h-tempered-glass', 'iPhone 15 Pro Max', 40), ('9h-tempered-glass', 'Samsung S24', 60)
)
insert into public.product_variants (product_id, sku, attributes, price, mrp, stock)
select p.id, upper(p.slug) || '-' || row_number() over (partition by p.slug order by v.model),
  jsonb_build_object('Model', v.model), p.price + v.price_delta, p.mrp + v.price_delta,
  case row_number() over (partition by p.slug order by v.model) when 4 then 0 else 12 - (row_number() over (partition by p.slug order by v.model) - 1) * 3 end
from v join public.products p on p.slug = v.product_slug;

-- Real Google reviews for Raghav Mobile Accessories (Vastral, Ahmedabad), attached to
-- seed products since reviews are product-scoped in this schema.
insert into public.reviews (product_id, author, rating, comment, verified, approved)
select id, 'Darsh ._.s', 5, 'Excellent service at Raghav Mobile! The staff is very helpful, knowledgeable, and polite. They offer genuine products at reasonable prices and explain everything clearly. My issue was resolved quickly and professionally. Highly recommended for anyone looking for mobile phones, accessories, or repairs. Will definitely visit again!', true, true from public.products where slug = 'matte-silicone-case'
union all
select id, 'Shree RAGHAV', 5, 'Really happy with my experience! I just went for a mobile cover but ended up buying handsfree and also got a beautiful back wrap done. The finishing was so clean and perfect that my phone looks brand new now. Very good customer service, humble staff, and genuine products. This shop truly deserves 5 stars!', true, true from public.products where slug = 'clear-magsafe-case'
union all
select id, 'Mayur Chauhan', 5, 'Loved the service and product quality here! They handled my phone carefully while doing the back wrapping and even helped me choose the best design. The cover fits perfectly and the handsfree works great. One of the best shops for accessories.', true, true from public.products where slug = '9h-tempered-glass'
union all
select id, 'Shree Raghav Wirecut', 5, 'Excellent experience! I bought a mobile cover, handsfree, and back wrapping — superb quality and perfect fitting. Great service and reasonable prices. Highly recommended!', true, true from public.products where slug = 'fast-usb-c-charger'
union all
select id, 'Mo Azaz', 5, 'Most affordable price. Exceptional service and quality! I had an absolutely fantastic experience at Raghav Mobile Accessories.', true, true from public.products where slug = 'braided-type-c-cable'
union all
select id, 'Jemin Acharya', 5, 'Very satisfied with my purchase. The mobile accessories are premium quality, and the back wrapping was done neatly. Great shop for all mobile needs!', true, true from public.products where slug = 'powerbank-10000mah'
union all
select id, 'Rahul Prajapati', 5, 'The quality of the skin and tempered glass is very good, and the prices are reasonable.', true, true from public.products where slug = 'wired-earphones'
union all
select id, 'Shrey Patel', 5, 'I buy all the covers from this shop and all the covers are excellent.', true, true from public.products where slug = 'tws-earbuds-pro'
union all
select id, 'Rajvirsinh Sisodiya', 5, 'I have bought a phone cover. So good quality cases.', true, true from public.products where slug = 'car-mobile-holder'
union all
select id, 'Ajay Pariya', 5, 'Good service and excellent product quality, must visit and buy stuff.', true, true from public.products where slug = 'desk-mobile-stand';

insert into public.offers (title, subtitle, tone, cta_label, cta_href, sort_order) values
  ('Free screen-guard fitting, every day', 'Bring your phone to the Vastral store.', 'navy', 'Get directions', null, 1),
  ('Flat 20% off on TWS earbuds', 'This week only, while stocks last.', 'orange', 'Shop earbuds', '/shop?category=tws-earbuds', 2);
