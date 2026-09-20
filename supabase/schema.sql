-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists public.enrolments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  programme_slug text not null,
  paystack_reference text not null unique,
  created_at timestamptz not null default now()
);

alter table public.enrolments enable row level security;

-- Students can only ever read their own enrolments. There is deliberately no
-- insert/update/delete policy: only the service-role key (used by the Paystack
-- webhook) can write rows, so a student can never grant themselves a programme.
create policy "Students can read their own enrolments"
  on public.enrolments for select
  using (auth.uid() = student_id);
