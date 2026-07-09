-- Adds real staff auth boundaries, room-conflict checks, and
-- reservation management (list/edit/checkout). Run after the two
-- previous setup files.
--
-- Before running: create at least one staff user in the Supabase
-- dashboard under Authentication -> Users -> Add user (email +
-- password). That account is what staff will log in with in the app.

-- 1. A reservation now has a start date too, so room conflicts can be
-- checked against a real date range, not just the checkout date.
alter table reservations add column if not exists check_in_date date not null default current_date;

-- 2. create_reservation now requires a logged-in (authenticated) staff
-- session instead of the anon key, takes a check-in date, and rejects
-- overlapping bookings for the same room.
drop function if exists create_reservation(text, text, text, date, text);

create or replace function create_reservation(
  p_name text,
  p_email text,
  p_room text,
  p_check_in_date date,
  p_check_out_date date,
  p_hotel text default 'The Grand Dallas'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r reservations%rowtype;
  conflict_count int;
begin
  select count(*) into conflict_count
  from reservations
  where room = p_room
    and checked_out = false
    and check_in_date < p_check_out_date
    and check_out_date > p_check_in_date;

  if conflict_count > 0 then
    raise exception 'Room "%" is already booked for an overlapping date range.', p_room;
  end if;

  begin
    insert into reservations (name, email, room, hotel, check_in_date, check_out_date)
    values (p_name, p_email, p_room, p_hotel, p_check_in_date, p_check_out_date)
    returning * into r;
  exception when unique_violation then
    raise exception 'A reservation already exists for this email address.';
  end;

  return jsonb_build_object(
    'id', r.id,
    'name', r.name,
    'email', r.email,
    'room', r.room,
    'hotel', r.hotel,
    'check_in_date', r.check_in_date,
    'check_out_date', r.check_out_date
  );
end;
$$;

grant execute on function create_reservation(text, text, text, date, date, text) to authenticated;

-- 3. Staff-only visibility into all reservations.
create or replace function list_reservations()
returns setof reservations
language sql
security definer
set search_path = public
as $$
  select * from reservations order by check_in_date desc, created_at desc;
$$;

grant execute on function list_reservations() to authenticated;

-- 4. Edit an existing reservation, same conflict check excluding itself.
create or replace function update_reservation(
  p_id uuid,
  p_name text,
  p_email text,
  p_room text,
  p_check_in_date date,
  p_check_out_date date
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  r reservations%rowtype;
  conflict_count int;
begin
  select count(*) into conflict_count
  from reservations
  where room = p_room
    and id != p_id
    and checked_out = false
    and check_in_date < p_check_out_date
    and check_out_date > p_check_in_date;

  if conflict_count > 0 then
    raise exception 'Room "%" is already booked for an overlapping date range.', p_room;
  end if;

  update reservations
  set name = p_name,
      email = p_email,
      room = p_room,
      check_in_date = p_check_in_date,
      check_out_date = p_check_out_date
  where id = p_id
  returning * into r;

  if not found then
    raise exception 'Reservation not found.';
  end if;

  return jsonb_build_object(
    'id', r.id,
    'name', r.name,
    'email', r.email,
    'room', r.room,
    'hotel', r.hotel,
    'check_in_date', r.check_in_date,
    'check_out_date', r.check_out_date
  );
end;
$$;

grant execute on function update_reservation(uuid, text, text, text, date, date) to authenticated;

-- 5. Mark a guest checked out.
create or replace function checkout_reservation(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update reservations set checked_out = true where id = p_id;
  if not found then
    raise exception 'Reservation not found.';
  end if;
end;
$$;

grant execute on function checkout_reservation(uuid) to authenticated;
