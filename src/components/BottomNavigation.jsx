import { Link } from 'react-router-dom';
import { Home, MessageCircle, Wrench } from 'lucide-react';
import './BottomNavigation.css';

function BottomNavigation({ currentPath }) {
  return (
    <nav className="bottom-nav">
      <Link
        to="/"
        className={`nav-item ${currentPath === '/' ? 'active' : ''}`}
        aria-label="Home"
      >
        <Home size={24} />
        <span className="nav-label">Home</span>
      </Link>
      <Link
        to="/chat"
        className={`nav-item ${currentPath === '/chat' ? 'active' : ''}`}
        aria-label="Chat"
      >
        <MessageCircle size={24} />
        <span className="nav-label">Chat</span>
      </Link>
      <Link
        to="/maintenance"
        className={`nav-item ${currentPath === '/maintenance' ? 'active' : ''}`}
        aria-label="Maintenance"
      >
        <Wrench size={24} />
        <span className="nav-label">Maintenance</span>
      </Link>
    </nav>
  );
}

export default BottomNavigation;
