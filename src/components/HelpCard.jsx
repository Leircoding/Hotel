import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, UtensilsCrossed } from 'lucide-react';
import './HelpCard.css';

function HelpCard() {
  const navigate = useNavigate();

  return (
    <div className="help-section">
      <h2 className="section-title">How can I help?</h2>

      <button
        className="help-card maintenance-card"
        onClick={() => navigate('/maintenance')}
      >
        <div className="card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M6 9l6-7 8 8M5 20h14M7 20v-6h10v6" />
          </svg>
        </div>
        <div className="card-content">
          <h3>Maintenance</h3>
          <p>Report a room issue — AC, plumbing, TV, Wi-Fi</p>
          <span className="card-action">→ Opens chat: "I have an issue with..."</span>
        </div>
      </button>

      <div className="help-card-row">
        <button
          className="help-card contact-card"
          onClick={() => navigate('/chat', { state: { type: 'contact-staff' } })}
        >
          <Users size={24} className="card-icon-small" />
          <h3>Contact staff</h3>
          <p>Any question or request</p>
          <span className="chat-action">→ Opens chat empty</span>
        </button>

        <button
          className="help-card dining-card"
          onClick={() => navigate('/chat', { state: { type: 'dining' } })}
        >
          <UtensilsCrossed size={24} className="card-icon-small" />
          <h3>Dining</h3>
          <p>Restaurant picks near the hotel</p>
          <span className="chat-action">→ Opens chat empty</span>
        </button>
      </div>
    </div>
  );
}

export default HelpCard;
