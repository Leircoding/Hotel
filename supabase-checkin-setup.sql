-- Reservations table
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  room text not null,
  hotel text not null default 'The Grand Dallas',
  check_out_date date not null,
  checked_in boolean not null default false,
  checked_in_at timestamptz,
  checked_out boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists reservations_email_idx on reservations (lower(email));

-- Lock the table down: no direct anon select/update. All access goes
-- through check_in_guest() below, which only exposes what check-in needs.
alter table reservations enable row level security;

create or replace function check_in_guest(p_name text, p_email text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r reservations%rowtype;
begin
  select * into r from reservations where lower(email) = lower(p_email) limit 1;

  if not found then
    raise exception 'No reservation found for this email address.';
  end if;

  if r.checked_out then
    raise exception 'This reservation has already been checked out.';
  end if;

  update reservations
  set checked_in = true, checked_in_at = now(), name = p_name
  where id = r.id;

  return jsonb_build_object(
    'room', r.room,
    'hotel', r.hotel,
    'check_out_date', r.check_out_date
  );
end;
$$;

grant execute on function check_in_guest(text, text) to anon;

-- Seed data for testing the check-in flow
insert into reservations (name, email, room, check_out_date, checked_out)
values
  ('Jane Doe', 'jane@example.com', '417 · Deluxe King', current_date + 3, false),
  ('Sam Carter', 'checkedout@example.com', '203 · Standard Queen', current_date - 1, true)
on conflict (lower(email)) do nothing;
