import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import '../components/MaintenanceForm.css';
import './CheckIn.css';

async function checkInGuest({ name, email }) {
  const { data, error } = await supabase.rpc('check_in_guest', {
    p_name: name,
    p_email: email,
  });

  if (error) throw new Error(error.message);
  return data;
}

function CheckIn({ onCheckIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your full name';
    if (!email.trim()) newErrors.email = 'Please enter your email address';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email address';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServerError('');
    setLoading(true);

    try {
      const reservation = await checkInGuest({ name, email });
      onCheckIn(name, reservation);
    } catch (err) {
      setServerError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="checkin-page">
      <div className="checkin-welcome">
        <h1>Welcome to The Grand Dallas</h1>
        <p>Enter your details to check in</p>
      </div>

      {serverError && (
        <p className="error-message checkin-server-error">
          <AlertCircle size={16} /> {serverError}
        </p>
      )}

      <div className="checkin-card">
        <form className="maintenance-form checkin-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="form-label" htmlFor="checkin-name">
              Name
            </label>
            <input
              id="checkin-name"
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
            <label className="form-label" htmlFor="checkin-email">
              Email
            </label>
            <input
              id="checkin-email"
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

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span className="btn-spinner" aria-label="Checking in" /> : 'Check In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckIn;
