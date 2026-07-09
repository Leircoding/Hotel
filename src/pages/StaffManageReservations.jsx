import { useState, useEffect } from 'react';
import { AlertCircle, Pencil, X, Check } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import '../components/MaintenanceForm.css';
import './StaffReservations.css';

async function fetchReservations() {
  const { data, error } = await supabase.rpc('list_reservations');
  if (error) throw new Error(error.message);
  return data;
}

async function saveReservation(id, fields) {
  const { data, error } = await supabase.rpc('update_reservation', {
    p_id: id,
    p_name: fields.name,
    p_email: fields.email,
    p_room: fields.room,
    p_check_in_date: fields.checkInDate,
    p_check_out_date: fields.checkOutDate,
  });
  if (error) throw new Error(error.message);
  return data;
}

async function checkOutReservation(id) {
  const { error } = await supabase.rpc('checkout_reservation', { p_id: id });
  if (error) throw new Error(error.message);
}

function StaffManageReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [rowError, setRowError] = useState('');
  const [savingId, setSavingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (r) => {
    setEditingId(r.id);
    setRowError('');
    setEditFields({
      name: r.name,
      email: r.email,
      room: r.room,
      checkInDate: r.check_in_date,
      checkOutDate: r.check_out_date,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setRowError('');
  };

  const saveEdit = async (id) => {
    setSavingId(id);
    setRowError('');
    try {
      await saveReservation(id, editFields);
      setEditingId(null);
      await load();
    } catch (err) {
      setRowError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const handleCheckOut = async (id) => {
    setSavingId(id);
    setRowError('');
    try {
      await checkOutReservation(id);
      await load();
    } catch (err) {
      setRowError(err.message);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="staff-page">
        <div className="staff-welcome">
          <h1>Manage Reservations</h1>
          <p>Loading reservations…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-page">
      <div className="staff-welcome">
        <h1>Manage Reservations</h1>
        <p>{reservations.length} total</p>
      </div>

      {loadError && (
        <p className="error-message staff-banner">
          <AlertCircle size={16} /> {loadError}
        </p>
      )}
      {rowError && (
        <p className="error-message staff-banner">
          <AlertCircle size={16} /> {rowError}
        </p>
      )}

      <div className="reservations-list">
        {reservations.map((r) => (
          <div className="reservation-row" key={r.id}>
            {editingId === r.id ? (
              <div className="reservation-edit">
                <input
                  className="form-textarea"
                  value={editFields.name}
                  onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
                  placeholder="Full name"
                />
                <input
                  className="form-textarea"
                  value={editFields.email}
                  onChange={(e) => setEditFields({ ...editFields, email: e.target.value })}
                  placeholder="Email address"
                />
                <input
                  className="form-textarea"
                  value={editFields.room}
                  onChange={(e) => setEditFields({ ...editFields, room: e.target.value })}
                  placeholder="Room"
                />
                <div className="staff-date-row">
                  <input
                    className="form-textarea"
                    type="date"
                    value={editFields.checkInDate}
                    onChange={(e) => setEditFields({ ...editFields, checkInDate: e.target.value })}
                  />
                  <input
                    className="form-textarea"
                    type="date"
                    value={editFields.checkOutDate}
                    onChange={(e) => setEditFields({ ...editFields, checkOutDate: e.target.value })}
                  />
                </div>
                <div className="reservation-row-actions">
                  <button
                    type="button"
                    className="row-action-btn confirm"
                    onClick={() => saveEdit(r.id)}
                    disabled={savingId === r.id}
                  >
                    <Check size={16} /> Save
                  </button>
                  <button type="button" className="row-action-btn" onClick={cancelEdit}>
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="reservation-info">
                  <p className="reservation-name">
                    {r.name}
                    {r.checked_out && <span className="reservation-badge">Checked out</span>}
                    {!r.checked_out && r.checked_in && (
                      <span className="reservation-badge active">Checked in</span>
                    )}
                  </p>
                  <p className="reservation-detail">{r.email}</p>
                  <p className="reservation-detail">
                    {r.room} · {r.check_in_date} → {r.check_out_date}
                  </p>
                </div>
                <div className="reservation-row-actions">
                  <button type="button" className="row-action-btn" onClick={() => startEdit(r)}>
                    <Pencil size={16} /> Edit
                  </button>
                  {!r.checked_out && (
                    <button
                      type="button"
                      className="row-action-btn"
                      onClick={() => handleCheckOut(r.id)}
                      disabled={savingId === r.id}
                    >
                      Check out
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffManageReservations;
