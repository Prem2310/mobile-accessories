-- Public-read bucket for hero/banner images; only admins can write.
insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

create policy "banners public read" on storage.objects
  for select using (bucket_id = 'banners');

create policy "banners admin write" on storage.objects
  for insert with check (bucket_id = 'banners' and public.is_admin());

create policy "banners admin update" on storage.objects
  for update using (bucket_id = 'banners' and public.is_admin());

create policy "banners admin delete" on storage.objects
  for delete using (bucket_id = 'banners' and public.is_admin());
