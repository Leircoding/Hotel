import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import BottomNavigation from './components/BottomNavigation';
import CheckIn from './pages/CheckIn';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Maintenance from './pages/Maintenance';
import StaffReservations from './pages/StaffReservations';
import './App.css';

function App() {
  const location = useLocation();
  const isStaffRoute = location.pathname === '/staff';
  const [guestName, setGuestName] = useState('Gabriel');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [stay, setStay] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('guestName');
    if (saved) setGuestName(saved);
    setIsCheckedIn(localStorage.getItem('checkedIn') === 'true');
    const savedStay = localStorage.getItem('guestStay');
    if (savedStay) {
      try {
        setStay(JSON.parse(savedStay));
      } catch {
        localStorage.removeItem('guestStay');
      }
    }
  }, []);

  const handleCheckIn = (name, reservation) => {
    localStorage.setItem('guestName', name);
    localStorage.setItem('checkedIn', 'true');
    localStorage.setItem('guestStay', JSON.stringify(reservation));
    setGuestName(name);
    setStay(reservation);
    setIsCheckedIn(true);
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <AppHeader simple={!isCheckedIn || isStaffRoute} />
        <main className="app-main">
          <Routes>
            <Route path="/staff" element={<StaffReservations />} />
            <Route
              path="/"
              element={isCheckedIn ? <Home guestName={guestName} stay={stay} /> : <CheckIn onCheckIn={handleCheckIn} />}
            />
            <Route
              path="/chat"
              element={isCheckedIn ? <Chat guestName={guestName} /> : <CheckIn onCheckIn={handleCheckIn} />}
            />
            <Route
              path="/maintenance"
              element={isCheckedIn ? <Maintenance /> : <CheckIn onCheckIn={handleCheckIn} />}
            />
          </Routes>
        </main>
        {isCheckedIn && !isStaffRoute && <BottomNavigation currentPath={location.pathname} />}
      </div>
    </div>
  );
}

export default App;
