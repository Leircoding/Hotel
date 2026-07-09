-- Lets staff create a reservation row without direct table access.
-- Same pattern as check_in_guest: RLS stays locked, anon can only
-- call this function, not read/write the table directly.
create or replace function create_reservation(
  p_name text,
  p_email text,
  p_room text,
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
begin
  begin
    insert into reservations (name, email, room, hotel, check_out_date)
    values (p_name, p_email, p_room, p_hotel, p_check_out_date)
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
    'check_out_date', r.check_out_date
  );
end;
$$;

grant execute on function create_reservation(text, text, text, date, text) to anon;
