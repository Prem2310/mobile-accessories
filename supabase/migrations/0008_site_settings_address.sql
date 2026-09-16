alter table public.site_settings add column address text not null default '';

-- Real street address from the shop's Google Business listing.
update public.site_settings set
  address = '1st Floor, Shop No. 104, Pushkar Sky, near Satva Icon, Vastral, Ahmedabad, Gujarat 382418'
where id = true;
