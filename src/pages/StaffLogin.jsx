import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import '../components/MaintenanceForm.css';
import './StaffReservations.css';

function StaffLogin({ onSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    onSignedIn(data.session);
  };

  return (
    <div className="staff-page">
      <div className="staff-welcome">
        <h1>Staff Sign In</h1>
        <p>Sign in with your staff account to manage reservations</p>
      </div>

      {error && (
        <p className="error-message staff-banner">
          <AlertCircle size={16} /> {error}
        </p>
      )}

      <div className="staff-card">
        <form className="maintenance-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="form-label" htmlFor="staff-login-email">
              Email
            </label>
            <input
              id="staff-login-email"
              type="email"
              className="form-textarea"
              placeholder="Staff email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-section">
            <label className="form-label" htmlFor="staff-login-password">
              Password
            </label>
            <input
              id="staff-login-password"
              type="password"
              className="form-textarea"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span className="btn-spinner" aria-label="Signing in" /> : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;
