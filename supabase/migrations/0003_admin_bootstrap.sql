-- Lets the very first signed-in user claim the owner role when no admin exists yet.
-- After that one row exists, this policy's WHERE clause is never true again, so only
-- existing owners (via admins_write) can add more admins.
create policy admins_bootstrap on public.admins for insert
  with check (auth.uid() = id and not exists (select 1 from public.admins));
