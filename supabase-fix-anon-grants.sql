-- Real fix (previous fix only revoked from PUBLIC, which didn't matter
-- because Supabase's default privileges grant EXECUTE directly to anon,
-- authenticated, and service_role on every new function in the public
-- schema — a separate, direct grant that REVOKE ... FROM PUBLIC doesn't
-- touch). This revokes anon's direct grant on the staff-only functions.

revoke execute on function create_reservation(text, text, text, date, date, text) from anon;
revoke execute on function list_reservations() from anon;
revoke execute on function update_reservation(uuid, text, text, text, date, date) from anon;
revoke execute on function checkout_reservation(uuid) from anon;

-- Re-affirm authenticated still has access (idempotent, safe to re-run).
grant execute on function create_reservation(text, text, text, date, date, text) to authenticated;
grant execute on function list_reservations() to authenticated;
grant execute on function update_reservation(uuid, text, text, text, date, date) to authenticated;
grant execute on function checkout_reservation(uuid) to authenticated;

-- Verify: this should show NO anon=X entry for the 4 functions above,
-- but SHOULD still show anon=X for check_in_guest (that one stays public).
select p.proname, p.proacl
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'list_reservations', 'create_reservation',
    'update_reservation', 'checkout_reservation', 'check_in_guest'
  );
