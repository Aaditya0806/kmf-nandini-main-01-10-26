-- KMF website forms: Supabase setup (run once in the Supabase SQL editor, after
-- docs/ask-nandini-supabase.sql). Same project (Mumbai region) as Ask Nandini.
-- Row Level Security is ON with no policies: only the server's service-role key
-- can read or write. These tables hold personal details that visitors submitted
-- on purpose (applications, complaints, notify-me requests); see docs/FORMS.md
-- for retention.

create extension if not exists pgcrypto;

-- 1. Dealer / parlour / agency / distributor applications --------------------
create table if not exists dealer_applications (
  id            uuid primary key default gen_random_uuid(),
  ticket        text not null unique,              -- KMF-D-XXXXXX, shown to the applicant
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  type          text not null,                     -- parlour | agency | distributor | franchise
  name          text not null,
  mobile        text not null,
  email         text,
  organisation  text,
  city          text not null,
  district      text,
  state         text not null,
  pincode       text not null,
  has_shop      boolean,
  shop_details  text,                              -- existing shop / space / experience
  investment    text,                              -- budget range picked from a list
  message       text,
  lang          text,
  page          text,
  status        text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  admin_note    text
);
create index if not exists dealer_applications_created_idx on dealer_applications (created_at desc);
alter table dealer_applications enable row level security;

-- 2. "Notify me when available" demand requests ------------------------------
create table if not exists demand_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  pincode       text not null,
  city          text not null,
  state         text not null,                     -- from the PIN code (approximate) or chosen
  in_karnataka  boolean not null default false,
  products      text[] not null default '{}',
  other_product text,
  name          text,
  mobile        text,
  email         text,
  note          text,
  lang          text,
  page          text,
  notified_at   timestamptz                        -- set by KMF when the visitor was told
);
create index if not exists demand_requests_created_idx on demand_requests (created_at desc);
create index if not exists demand_requests_state_city_idx on demand_requests (state, city);
alter table demand_requests enable row level security;

-- Weekly report history (what was emailed to KMF, and whether it was sent).
create table if not exists demand_reports (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  period_start  timestamptz not null,
  period_end    timestamptz not null,
  trigger       text not null,                     -- cron | admin
  new_requests  integer not null default 0,
  total_requests integer not null default 0,
  sent_to       text,
  sent          boolean not null default false,
  error         text,
  summary       jsonb                              -- by state / city / product
);
create index if not exists demand_reports_created_idx on demand_reports (created_at desc);
alter table demand_reports enable row level security;

-- 3. Complaint tickets ---------------------------------------------------------
create table if not exists complaints (
  id            uuid primary key default gen_random_uuid(),
  ticket        text not null unique,              -- KMF-C-XXXXXX, shown to the visitor
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  category      text not null,                     -- expired | quality | overcharge | availability | service | other
  product       text,
  purchased_from text,                             -- shop / outlet name and place
  purchase_date date,
  batch         text,                              -- batch code / pack date printed on the pack
  pincode       text,
  city          text,
  description   text not null,
  photo_path    text,                              -- object path in the complaint-photos bucket
  name          text not null,
  mobile        text not null,
  email         text,
  lang          text,
  page          text,
  status        text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'rejected')),
  status_note   text,                              -- shown to the visitor when they check the ticket
  admin_note    text                               -- internal
);
create index if not exists complaints_created_idx on complaints (created_at desc);
alter table complaints enable row level security;

-- Private bucket for complaint photos (served to admins through the website).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('complaint-photos', 'complaint-photos', false, 4194304, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- 4. Housekeeping ----------------------------------------------------------------
-- Resolved/rejected complaints and closed applications older than a year, and
-- notify-me requests older than two years. Schedule with pg_cron if wanted:
--   select cron.schedule('kmf-forms-cleanup', '45 3 * * *', 'select kmf_forms_cleanup()');
create or replace function kmf_forms_cleanup() returns void
language sql security definer set search_path = public as $$
  delete from complaints where status in ('resolved', 'rejected') and updated_at < now() - interval '365 days';
  delete from dealer_applications where status = 'closed' and updated_at < now() - interval '365 days';
  delete from demand_requests where created_at < now() - interval '730 days';
$$;
