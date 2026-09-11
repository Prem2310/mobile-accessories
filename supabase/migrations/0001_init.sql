-- Raghav Mobile Accessories — initial schema
-- No customer accounts: WhatsApp is the ordering channel, so there are no
-- profiles/customers/orders/cart/wishlist tables. Only `admins` need auth.
-- Categories are self-referential (parent_id) so subcategories don't need a
-- separate table. Stock lives on products/variants directly; inventory_movements
-- is just the audit log of adjustments, not a separate live-stock table.

create table public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('owner', 'admin', 'staff')),
  name text,
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  image_url text,
  icon text,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order int not null default 0,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  brand text,
  compatibility text[] not null default '{}',
  price numeric(10, 2) not null,
  mrp numeric(10, 2),
  stock int not null default 0,
  rating numeric(2, 1),
  review_count int not null default 0,
  featured boolean not null default false,
  bestseller boolean not null default false,
  new_arrival boolean not null default false,
  variant_label text,
  specifications jsonb not null default '[]',
  warranty text,
  delivery_info text,
  tags text[] not null default '{}',
  seo_title text,
  seo_description text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_id_idx on public.products(category_id);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null,
  attributes jsonb not null default '{}',
  price numeric(10, 2) not null,
  mrp numeric(10, 2),
  stock int not null default 0,
  created_at timestamptz not null default now(),
  unique (product_id, sku)
);
create index product_variants_product_id_idx on public.product_variants(product_id);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  public_url text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);
create index product_images_product_id_idx on public.product_images(product_id);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  change int not null,
  reason text not null,
  created_by uuid references public.admins(id) on delete set null,
  created_at timestamptz not null default now()
);
create index inventory_movements_product_id_idx on public.inventory_movements(product_id);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  author text not null,
  rating int not null check (rating between 1 and 5),
  comment text,
  image_url text,
  verified boolean not null default false,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index reviews_product_id_idx on public.reviews(product_id);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  type text not null check (type in ('percentage', 'fixed')),
  value numeric(10, 2) not null,
  min_order numeric(10, 2),
  max_discount numeric(10, 2),
  starts_at timestamptz,
  expires_at timestamptz,
  usage_limit int,
  per_customer_limit int,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  tone text not null default 'navy' check (tone in ('navy', 'orange')),
  cta_label text,
  cta_href text,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cta_label text,
  cta_href text,
  image_desktop_url text,
  image_mobile_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  enabled boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Singleton settings row: store info, WhatsApp config, hero copy. Homepage
-- featured/bestseller/new-arrival lists are computed from product flags
-- above rather than a separate curated-list table (YAGNI until an admin
-- actually needs manual overrides beyond those flags).
create table public.site_settings (
  id boolean primary key default true constraint site_settings_singleton check (id),
  store_name text not null default 'Raghav Mobile Accessories',
  area text not null default '',
  hours text not null default '',
  whatsapp_number text not null default '',
  instagram_handle text not null default '',
  gst_number text,
  whatsapp_order_template text not null default 'Hi {{store}}, I want to order:\n{{items}}\nTotal: {{total}}',
  whatsapp_enquiry_template text not null default 'Hi {{store}}, I have a question about {{product}}.',
  free_delivery_threshold numeric(10, 2) not null default 0,
  hero_eyebrow text not null default '',
  hero_headline text not null default '',
  hero_subheadline text not null default '',
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id) values (true);

alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.reviews enable row level security;
alter table public.coupons enable row level security;
alter table public.offers enable row level security;
alter table public.banners enable row level security;
alter table public.site_settings enable row level security;

-- Helper: is the current user an admin (any role)?
create function public.is_admin() returns boolean
  language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.admins where id = auth.uid());
$$;

-- Helper: is the current user the owner?
create function public.is_owner() returns boolean
  language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.admins where id = auth.uid() and role = 'owner');
$$;

-- admins: admins can see the roster; only the owner manages it.
create policy admins_select on public.admins for select using (public.is_admin());
create policy admins_write on public.admins for all using (public.is_owner()) with check (public.is_owner());

-- categories: public reads enabled rows, admins read/write everything.
create policy categories_public_select on public.categories for select using (enabled = true or public.is_admin());
create policy categories_admin_write on public.categories for insert with check (public.is_admin());
create policy categories_admin_update on public.categories for update using (public.is_admin()) with check (public.is_admin());
create policy categories_admin_delete on public.categories for delete using (public.is_admin());

-- products
create policy products_public_select on public.products for select using (published = true or public.is_admin());
create policy products_admin_write on public.products for insert with check (public.is_admin());
create policy products_admin_update on public.products for update using (public.is_admin()) with check (public.is_admin());
create policy products_admin_delete on public.products for delete using (public.is_admin());

-- product_variants (visibility follows parent product)
create policy product_variants_public_select on public.product_variants for select using (
  public.is_admin() or exists (select 1 from public.products p where p.id = product_id and p.published = true)
);
create policy product_variants_admin_write on public.product_variants for insert with check (public.is_admin());
create policy product_variants_admin_update on public.product_variants for update using (public.is_admin()) with check (public.is_admin());
create policy product_variants_admin_delete on public.product_variants for delete using (public.is_admin());

-- product_images
create policy product_images_public_select on public.product_images for select using (
  public.is_admin() or exists (select 1 from public.products p where p.id = product_id and p.published = true)
);
create policy product_images_admin_write on public.product_images for insert with check (public.is_admin());
create policy product_images_admin_update on public.product_images for update using (public.is_admin()) with check (public.is_admin());
create policy product_images_admin_delete on public.product_images for delete using (public.is_admin());

-- inventory_movements: admin-only, both read and write (internal audit log)
create policy inventory_movements_admin_all on public.inventory_movements for all using (public.is_admin()) with check (public.is_admin());

-- reviews: public can read approved reviews and submit new ones (pending approval); only admins moderate.
create policy reviews_public_select on public.reviews for select using (approved = true or public.is_admin());
create policy reviews_public_insert on public.reviews for insert with check (approved = false);
create policy reviews_admin_update on public.reviews for update using (public.is_admin()) with check (public.is_admin());
create policy reviews_admin_delete on public.reviews for delete using (public.is_admin());

-- coupons/offers/banners: admin-manages; offers & banners are also readable by the public (storefront displays them), coupons are admin-only (no public code-lookup surface yet).
create policy coupons_admin_all on public.coupons for all using (public.is_admin()) with check (public.is_admin());
create policy offers_public_select on public.offers for select using (active = true or public.is_admin());
create policy offers_admin_write on public.offers for insert with check (public.is_admin());
create policy offers_admin_update on public.offers for update using (public.is_admin()) with check (public.is_admin());
create policy offers_admin_delete on public.offers for delete using (public.is_admin());
create policy banners_public_select on public.banners for select using (enabled = true or public.is_admin());
create policy banners_admin_write on public.banners for insert with check (public.is_admin());
create policy banners_admin_update on public.banners for update using (public.is_admin()) with check (public.is_admin());
create policy banners_admin_delete on public.banners for delete using (public.is_admin());

-- site_settings: public read (storefront needs WhatsApp number etc.), admin write.
create policy site_settings_public_select on public.site_settings for select using (true);
create policy site_settings_admin_update on public.site_settings for update using (public.is_admin()) with check (public.is_admin());
