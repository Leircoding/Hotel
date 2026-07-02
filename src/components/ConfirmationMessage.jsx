import { CheckCircle } from 'lucide-react';
import './ConfirmationMessage.css';

function ConfirmationMessage({ requestNumber, onClose, onHome }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <CheckCircle size={48} />
        </div>
        <h2 className="confirmation-title">Request Submitted</h2>
        <p className="confirmation-text">
          Your maintenance request has been received.
        </p>
        <div className="request-number">
          <p className="request-label">Request Number</p>
          <p className="request-id">{requestNumber}</p>
        </div>
        <p className="confirmation-subtext">
          Our team will contact you shortly. You can check the status in your chat.
        </p>
        <div className="confirmation-actions">
          <button className="btn-home" onClick={onHome}>
            Back to Home
          </button>
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationMessage;
