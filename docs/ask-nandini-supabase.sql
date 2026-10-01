-- Ask Nandini: Supabase setup (run once in the Supabase SQL editor).
-- Create the project in region "South Asia (Mumbai) ap-south-1" so logs stay in India.
-- Row Level Security is ON with no policies: only the server's service-role key
-- (SUPABASE_SERVICE_ROLE_KEY, never exposed to browsers) can read or write.

create extension if not exists pgcrypto;

-- 1. Anonymised question log (kept 90 days) ------------------------------
create table if not exists ask_nandini_log (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  question    text not null,          -- PII-scrubbed, max 1000 chars
  answer      text,                   -- PII-scrubbed, max 2000 chars
  lang        text,                   -- detected language of the question
  page        text,                   -- page the chat was opened on
  tools       text[] default '{}',
  answered    boolean not null default true,
  missing     text,                   -- what the assistant said was missing
  fallback    text,                   -- rate_limited | daily_cap | error
  model       text,
  tokens_in   integer,
  tokens_out  integer,
  cost_usd    numeric(10, 6),         -- estimated at list price
  feedback    text check (feedback in ('up', 'down'))
);
create index if not exists ask_nandini_log_created_idx on ask_nandini_log (created_at desc);
alter table ask_nandini_log enable row level security;

-- 2. Rate limits and daily cap -------------------------------------------
create table if not exists ask_nandini_limits (
  key         text primary key,
  count       integer not null default 0,
  expires_at  timestamptz not null
);
alter table ask_nandini_limits enable row level security;

-- Counts one visitor message. Returns 'ok', 'rate_limited' or 'daily_cap'.
-- Fixed windows: p_window_min-minute buckets per visitor, a daily bucket per
-- visitor, and a global daily bucket (IST date passed in by the app).
create or replace function ask_nandini_take(
  p_visitor text, p_window_min int, p_per_window int, p_per_day int, p_daily_cap int, p_today text
) returns text
language plpgsql security definer set search_path = public as $$
declare
  w_key text := 'w:' || p_visitor || ':' || floor(extract(epoch from now()) / (p_window_min * 60))::bigint;
  d_key text := 'd:' || p_visitor || ':' || p_today;
  g_key text := 'g:' || p_today;
  g int; w int; d int;
begin
  select count into g from ask_nandini_limits where key = g_key;
  if coalesce(g, 0) >= p_daily_cap then return 'daily_cap'; end if;
  select count into w from ask_nandini_limits where key = w_key;
  select count into d from ask_nandini_limits where key = d_key;
  if coalesce(w, 0) >= p_per_window or coalesce(d, 0) >= p_per_day then return 'rate_limited'; end if;

  insert into ask_nandini_limits (key, count, expires_at) values (w_key, 1, now() + make_interval(mins => p_window_min))
    on conflict (key) do update set count = ask_nandini_limits.count + 1;
  insert into ask_nandini_limits (key, count, expires_at) values (d_key, 1, now() + interval '2 days')
    on conflict (key) do update set count = ask_nandini_limits.count + 1;
  insert into ask_nandini_limits (key, count, expires_at) values (g_key, 1, now() + interval '2 days')
    on conflict (key) do update set count = ask_nandini_limits.count + 1;
  return 'ok';
end $$;

-- 2b. Site click counts for the admin page ---------------------------------
-- Velozity credit clicks and "What brings you here today?" choices. One row per
-- visitor per event/value per day; the visitor key is a salted hash of IP + date,
-- so it changes daily and can't be linked across days.
create table if not exists site_events (
  day         date not null,
  event       text not null,          -- credit_click | intent_selected | intent_dismissed
  value       text not null default '',
  visitor     text not null,
  created_at  timestamptz not null default now(),
  primary key (day, event, value, visitor)
);
alter table site_events enable row level security;

create or replace function site_event_counts(p_days int)
returns table (event text, value text, clicks bigint)
language sql stable security definer set search_path = public as $$
  select event, value, count(*) as clicks from site_events
  where day > (now() at time zone 'Asia/Kolkata')::date - p_days
  group by 1, 2 order by 3 desc;
$$;
revoke all on function site_event_counts(int) from public, anon, authenticated;

-- 3. Housekeeping: 90-day log retention, expired limit counters ----------
-- The app calls this about once per 200 logged questions. You can also
-- schedule it daily with pg_cron (Database -> Extensions -> pg_cron):
--   select cron.schedule('ask-nandini-cleanup', '15 3 * * *', 'select ask_nandini_cleanup()');
create or replace function ask_nandini_cleanup() returns void
language sql security definer set search_path = public as $$
  delete from ask_nandini_log where created_at < now() - interval '90 days';
  delete from ask_nandini_limits where expires_at < now();
  delete from site_events where day < (now() at time zone 'Asia/Kolkata')::date - 90;
$$;

-- 4. Admin page queries ----------------------------------------------------
create or replace function ask_nandini_summary(p_days int) returns json
language sql stable security definer set search_path = public as $$
  select json_build_object(
    'total', count(*),
    'answered', count(*) filter (where answered and fallback is null),
    'unanswered', count(*) filter (where not answered and fallback is null),
    'fallbacks', json_build_object(
      'rate_limited', count(*) filter (where fallback = 'rate_limited'),
      'daily_cap', count(*) filter (where fallback = 'daily_cap'),
      'error', count(*) filter (where fallback = 'error')),
    'stored', count(*) filter (where model = 'stored'),
    'up', count(*) filter (where feedback = 'up'),
    'down', count(*) filter (where feedback = 'down'),
    'tokens_in', coalesce(sum(tokens_in), 0),
    'tokens_out', coalesce(sum(tokens_out), 0),
    'cost_usd', coalesce(sum(cost_usd), 0),
    'langs', (select coalesce(json_object_agg(lang, n), '{}'::json) from (
       select coalesce(lang, 'unknown') as lang, count(*) as n from ask_nandini_log
       where created_at > now() - make_interval(days => p_days) group by 1) l)
  )
  from ask_nandini_log where created_at > now() - make_interval(days => p_days);
$$;

create or replace function ask_nandini_top_questions(p_days int, p_limit int)
returns table (question text, n bigint)
language sql stable security definer set search_path = public as $$
  select lower(trim(regexp_replace(question, '\s+', ' ', 'g'))) as question, count(*) as n
  from ask_nandini_log
  where created_at > now() - make_interval(days => p_days) and fallback is null
  group by 1 order by 2 desc limit p_limit;
$$;

-- Only the server (service role) may call these.
revoke all on function ask_nandini_take(text, int, int, int, int, text) from public, anon, authenticated;
revoke all on function ask_nandini_cleanup() from public, anon, authenticated;
revoke all on function ask_nandini_summary(int) from public, anon, authenticated;
revoke all on function ask_nandini_top_questions(int, int) from public, anon, authenticated;
