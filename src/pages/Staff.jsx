import { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import StaffLogin from './StaffLogin';
import StaffReservations from './StaffReservations';
import StaffManageReservations from './StaffManageReservations';
import './Staff.css';

function Staff() {
  const [session, setSession] = useState(undefined);
  const [view, setView] = useState('create');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  if (session === undefined) return null;

  if (!session) {
    return <StaffLogin onSignedIn={setSession} />;
  }

  return (
    <div className="staff-shell">
      <div className="staff-tabs">
        <button
          className={`staff-tab ${view === 'create' ? 'active' : ''}`}
          onClick={() => setView('create')}
        >
          New Reservation
        </button>
        <button
          className={`staff-tab ${view === 'manage' ? 'active' : ''}`}
          onClick={() => setView('manage')}
        >
          Manage Reservations
        </button>
        <button className="staff-signout" onClick={handleSignOut}>
          <LogOut size={16} /> Sign out
        </button>
      </div>
      {view === 'create' ? <StaffReservations /> : <StaffManageReservations />}
    </div>
  );
}

export default Staff;
