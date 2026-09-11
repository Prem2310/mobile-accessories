-- Anon can't SELECT the RLS-protected admins table to check "does any admin exist" —
-- this SECURITY DEFINER function exposes just that boolean, nothing else.
create or replace function public.admins_exist()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins);
$$;

grant execute on function public.admins_exist() to anon, authenticated;
