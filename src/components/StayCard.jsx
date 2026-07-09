import './StayCard.css';

function StayCard({ room = '417 · Deluxe King', hotel = 'The Grand Dallas', checkOutDate }) {
  const checkOut = checkOutDate ? new Date(`${checkOutDate}T00:00:00`) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nightsLeft = checkOut
    ? Math.max(0, Math.round((checkOut - today) / (1000 * 60 * 60 * 24)))
    : 3;
  const checkOutLabel = checkOut
    ? checkOut.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : 'Thu, Jul 2';

  return (
    <div className="stay-card">
      <h2 className="section-title">Your Stay</h2>
      <div className="card-grid">
        <div className="card-item">
          <p className="card-label">Room</p>
          <p className="card-value">{room}</p>
        </div>
        <div className="card-item">
          <p className="card-label">Hotel</p>
          <p className="card-value">{hotel}</p>
        </div>
      </div>
      <div className="card-grid">
        <div className="card-item">
          <p className="card-label">Check-out</p>
          <p className="card-value">{checkOutLabel}</p>
        </div>
        <div className="card-item">
          <p className="card-label">Nights left</p>
          <p className="card-value accent">
            {nightsLeft} {nightsLeft === 1 ? 'night' : 'nights'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StayCard;
