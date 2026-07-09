import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import '../components/MaintenanceForm.css';
import './StaffReservations.css';

async function createReservation({ name, email, room, checkInDate, checkOutDate }) {
  const { data, error } = await supabase.rpc('create_reservation', {
    p_name: name,
    p_email: email,
    p_room: room,
    p_check_in_date: checkInDate,
    p_check_out_date: checkOutDate,
  });

  if (error) throw new Error(error.message);
  return data;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

function StaffReservations() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');
  const [checkInDate, setCheckInDate] = useState(todayISO());
  const [checkOutDate, setCheckOutDate] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Enter the guest's full name";
    if (!email.trim()) newErrors.email = "Enter the guest's email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Enter a valid email address';
    if (!room.trim()) newErrors.room = 'Enter a room number/type';
    if (!checkInDate) newErrors.checkInDate = 'Select a check-in date';
    if (!checkOutDate) newErrors.checkOutDate = 'Select a checkout date';
    else if (checkInDate && checkOutDate <= checkInDate)
      newErrors.checkOutDate = 'Checkout must be after check-in';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setSuccess('');
    setLoading(true);

    try {
      await createReservation({ name, email, room, checkInDate, checkOutDate });
      setSuccess(`Reservation created for ${name}.`);
      setName('');
      setEmail('');
      setRoom('');
      setCheckInDate(todayISO());
      setCheckOutDate('');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-page">
      <div className="staff-welcome">
        <h1>New Reservation</h1>
        <p>Add a guest reservation so they can check in</p>
      </div>

      {serverError && (
        <p className="error-message staff-banner">
          <AlertCircle size={16} /> {serverError}
        </p>
      )}
      {success && (
        <p className="staff-success-banner">
          <CheckCircle size={16} /> {success}
        </p>
      )}

      <div className="staff-card">
        <form className="maintenance-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="form-label" htmlFor="staff-name">
              Guest name
            </label>
            <input
              id="staff-name"
              type="text"
              className="form-textarea"
              placeholder="Full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: '' });
              }}
            />
            {errors.name && (
              <p className="error-message">
                <AlertCircle size={16} /> {errors.name}
              </p>
            )}
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="staff-email">
              Guest email
            </label>
            <input
              id="staff-email"
              type="email"
              className="form-textarea"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: '' });
              }}
            />
            {errors.email && (
              <p className="error-message">
                <AlertCircle size={16} /> {errors.email}
              </p>
            )}
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="staff-room">
              Room
            </label>
            <input
              id="staff-room"
              type="text"
              className="form-textarea"
              placeholder="e.g. 417 · Deluxe King"
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
                setErrors({ ...errors, room: '' });
              }}
            />
            {errors.room && (
              <p className="error-message">
                <AlertCircle size={16} /> {errors.room}
              </p>
            )}
          </div>

          <div className="staff-date-row">
            <div className="form-section">
              <label className="form-label" htmlFor="staff-checkin">
                Check-in date
              </label>
              <input
                id="staff-checkin"
                type="date"
                className="form-textarea"
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                  setErrors({ ...errors, checkInDate: '' });
                }}
              />
              {errors.checkInDate && (
                <p className="error-message">
                  <AlertCircle size={16} /> {errors.checkInDate}
                </p>
              )}
            </div>

            <div className="form-section">
              <label className="form-label" htmlFor="staff-checkout">
                Checkout date
              </label>
              <input
                id="staff-checkout"
                type="date"
                className="form-textarea"
                value={checkOutDate}
                onChange={(e) => {
                  setCheckOutDate(e.target.value);
                  setErrors({ ...errors, checkOutDate: '' });
                }}
              />
              {errors.checkOutDate && (
                <p className="error-message">
                  <AlertCircle size={16} /> {errors.checkOutDate}
                </p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span className="btn-spinner" aria-label="Saving" /> : 'Create Reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffReservations;
