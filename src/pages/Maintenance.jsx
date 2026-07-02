import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import MaintenanceForm from '../components/MaintenanceForm';
import ConfirmationMessage from '../components/ConfirmationMessage';
import './Maintenance.css';

function Maintenance() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [requestNumber, setRequestNumber] = useState('');

  const handleSubmit = (request) => {
    const existing = JSON.parse(localStorage.getItem('maintenanceRequests') || '[]');
    const all = [...existing, request];
    localStorage.setItem('maintenanceRequests', JSON.stringify(all));
    setRequestNumber(request.id);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
  };

  const handleHome = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  const handleOpenChat = () => {
    navigate('/chat');
  };

  const handleBackToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-info">
        <div className="info-banner">
          <div className="info-icon">
            <MessageCircle size={20} />
          </div>
          <div className="info-content">
            <p className="info-text">Chat is faster</p>
            <p className="info-description">Suite handles most requests via chat</p>
          </div>
          <button className="info-button" onClick={handleOpenChat}>
            Open Chat
          </button>
        </div>
      </div>

      <MaintenanceForm onSubmit={handleSubmit} />

      <div className="form-footer">
        <button className="btn-back" onClick={handleBackToChat}>
          ← Back to chat
        </button>
      </div>

      {showConfirmation && (
        <ConfirmationMessage
          requestNumber={requestNumber}
          onClose={handleClose}
          onHome={handleHome}
        />
      )}
    </div>
  );
}

export default Maintenance;
