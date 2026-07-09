import { Menu } from 'lucide-react';
import logo from '../assets/Suite_logo.jpg';
import './AppHeader.css';

function AppHeader({ simple = false }) {
  const handleMenuClick = () => {
    alert('Menu options not yet implemented');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <img src={logo} alt="Suite logo" className="logo-icon" />
          </div>
          <div className="header-text">
            <h1 className="app-title">Suite</h1>
            {!simple && <p className="room-info">Room 417 · The Grand Dallas Hotel</p>}
          </div>
        </div>
        {!simple && (
          <button className="menu-button" onClick={handleMenuClick} aria-label="Menu">
            <Menu size={24} />
          </button>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
