import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Maintenance from './pages/Maintenance';
import './App.css';

function App() {
  const location = useLocation();
  const [guestName, setGuestName] = useState('Gabriel');

  useEffect(() => {
    const saved = localStorage.getItem('guestName');
    if (saved) setGuestName(saved);
  }, []);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <AppHeader />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home guestName={guestName} />} />
            <Route path="/chat" element={<Chat guestName={guestName} />} />
            <Route path="/maintenance" element={<Maintenance />} />
          </Routes>
        </main>
        <BottomNavigation currentPath={location.pathname} />
      </div>
    </div>
  );
}

export default App;
