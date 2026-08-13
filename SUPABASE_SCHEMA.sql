
-- IEIS.IO IELTS ONLINE BACKEND — SUPABASE SQL
-- Run this whole script in Supabase Dashboard > SQL Editor.
-- IMPORTANT: never put a Supabase service_role key in GitHub.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  role text not null default 'student' check (role in ('student','staff')),
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  score integer,
  band text,
  words1 integer,
  words2 integer,
  answers jsonb,
  task1 text,
  task2 text,
  auto boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists attempts_user_id_idx on public.attempts(user_id);
create index if not exists attempts_created_at_idx on public.attempts(created_at desc);

alter table public.profiles enable row level security;
alter table public.attempts enable row level security;

-- Trigger: every new Auth account gets a student profile.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',''),
    coalesce(new.email,''),
    'student'
  )
  on conflict (id) do update
    set full_name=excluded.full_name, email=excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Secure staff check. Role is stored in profiles, not editable by students.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'staff'
  );
$$;

-- Profiles: students can see their own profile; staff can see all profiles.
drop policy if exists "profiles_select_own_or_staff" on public.profiles;
create policy "profiles_select_own_or_staff"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id or (select public.is_staff()));

-- Students cannot insert/change their own profile directly.
drop policy if exists "profiles_update_staff_only" on public.profiles;
create policy "profiles_update_staff_only"
on public.profiles for update
to authenticated
using ((select public.is_staff()))
with check ((select public.is_staff()));

-- Attempts: student can insert only as themselves.
drop policy if exists "attempts_insert_own" on public.attempts;
create policy "attempts_insert_own"
on public.attempts for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "attempts_select_own_or_staff" on public.attempts;
create policy "attempts_select_own_or_staff"
on public.attempts for select
to authenticated
using ((select auth.uid()) = user_id or (select public.is_staff()));

-- No browser-side deletion/update of attempts.
revoke update, delete on public.attempts from anon, authenticated;
