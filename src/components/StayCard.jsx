import './StayCard.css';

function StayCard() {
  return (
    <div className="stay-card">
      <h2 className="section-title">Your Stay</h2>
      <div className="card-grid">
        <div className="card-item">
          <p className="card-label">Room</p>
          <p className="card-value">417 · Deluxe King</p>
        </div>
        <div className="card-item">
          <p className="card-label">Hotel</p>
          <p className="card-value">The Grand Dallas</p>
        </div>
      </div>
      <div className="card-grid">
        <div className="card-item">
          <p className="card-label">Check-out</p>
          <p className="card-value">Thu, Jul 2</p>
        </div>
        <div className="card-item">
          <p className="card-label">Nights left</p>
          <p className="card-value accent">3 nights</p>
        </div>
      </div>
    </div>
  );
}

export default StayCard;
