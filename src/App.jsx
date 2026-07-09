import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import BottomNavigation from './components/BottomNavigation';
import CheckIn from './pages/CheckIn';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Maintenance from './pages/Maintenance';
import './App.css';

function App() {
  const location = useLocation();
  const [guestName, setGuestName] = useState('Gabriel');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('guestName');
    if (saved) setGuestName(saved);
    setIsCheckedIn(localStorage.getItem('checkedIn') === 'true');
  }, []);

  const handleCheckIn = (name) => {
    localStorage.setItem('guestName', name);
    localStorage.setItem('checkedIn', 'true');
    setGuestName(name);
    setIsCheckedIn(true);
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <AppHeader simple={!isCheckedIn} />
        <main className="app-main">
          {isCheckedIn ? (
            <Routes>
              <Route path="/" element={<Home guestName={guestName} />} />
              <Route path="/chat" element={<Chat guestName={guestName} />} />
              <Route path="/maintenance" element={<Maintenance />} />
            </Routes>
          ) : (
            <CheckIn onCheckIn={handleCheckIn} />
          )}
        </main>
        {isCheckedIn && <BottomNavigation currentPath={location.pathname} />}
      </div>
    </div>
  );
}

export default App;
