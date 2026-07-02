import { UtensilsCrossed, MapPin, DoorOpen } from 'lucide-react';
import './CategoryNavigation.css';

function CategoryNavigation({ onCategorySelect, activeCategory }) {
  const categories = [
    { id: 'dining', label: 'Dining', icon: UtensilsCrossed },
    { id: 'local', label: 'Local', icon: MapPin },
    { id: 'room', label: 'Room', icon: DoorOpen },
  ];

  return (
    <nav className="category-nav">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`category-btn ${activeCategory === id ? 'active' : ''}`}
          onClick={() => onCategorySelect(id)}
          aria-label={label}
        >
          <Icon size={24} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default CategoryNavigation;
