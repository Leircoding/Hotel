-- Security fix: Postgres grants EXECUTE to PUBLIC by default when a
-- function is created, which silently overrides the intended
-- "authenticated only" restriction on the staff RPCs below (the
-- anon key was able to call them anyway via the PUBLIC grant).
-- Revoke PUBLIC explicitly so only the intended role can call each one.

revoke execute on function create_reservation(text, text, text, date, date, text) from public;
revoke execute on function list_reservations() from public;
revoke execute on function update_reservation(uuid, text, text, text, date, date) from public;
revoke execute on function checkout_reservation(uuid) from public;

-- Re-affirm the intended grants (idempotent, safe to re-run).
grant execute on function create_reservation(text, text, text, date, date, text) to authenticated;
grant execute on function list_reservations() to authenticated;
grant execute on function update_reservation(uuid, text, text, text, date, date) to authenticated;
grant execute on function checkout_reservation(uuid) to authenticated;

-- check_in_guest is meant to stay anon-accessible (guest self-service),
-- but revoke PUBLIC and grant anon explicitly for hygiene/clarity.
revoke execute on function check_in_guest(text, text) from public;
grant execute on function check_in_guest(text, text) to anon;
