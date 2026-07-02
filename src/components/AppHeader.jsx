import { Menu } from 'lucide-react';
import './AppHeader.css';

function AppHeader() {
  const handleMenuClick = () => {
    alert('Menu options not yet implemented');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <svg viewBox="0 0 32 32" className="logo-icon">
              <rect x="6" y="4" width="20" height="24" rx="2" fill="#d96e45" />
              <rect x="10" y="8" width="4" height="3" fill="white" />
              <rect x="18" y="8" width="4" height="3" fill="white" />
              <rect x="10" y="14" width="4" height="3" fill="white" />
              <rect x="18" y="14" width="4" height="3" fill="white" />
              <rect x="8" y="22" width="16" height="2" fill="#d96e45" />
            </svg>
          </div>
          <div className="header-text">
            <h1 className="app-title">Suite</h1>
            <p className="room-info">Room 417 · The Grand Dallas Hotel</p>
          </div>
        </div>
        <button className="menu-button" onClick={handleMenuClick} aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
