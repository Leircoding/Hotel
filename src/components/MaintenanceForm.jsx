import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './MaintenanceForm.css';

function MaintenanceForm({ onSubmit }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    'AC / Heating',
    'Plumbing',
    'Electrical',
    'TV',
    'Wi-Fi',
    'Door / Lock',
    'Bathroom',
    'Other',
  ];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!category) newErrors.category = 'Please select a category';
    if (!description.trim()) newErrors.description = 'Please describe the issue';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const requestNumber = `MR-${Date.now().toString().slice(-6).toUpperCase()}`;
    const request = {
      id: requestNumber,
      category,
      description,
      urgency,
      image,
      timestamp: new Date().toISOString(),
    };

    onSubmit(request);
  };

  return (
    <form className="maintenance-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <label className="form-label">Category</label>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-option ${category === cat ? 'selected' : ''}`}
              onClick={() => {
                setCategory(cat);
                setErrors({ ...errors, category: '' });
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {errors.category && (
          <p className="error-message">
            <AlertCircle size={16} /> {errors.category}
          </p>
        )}
      </div>

      <div className="form-section">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Tell us what's wrong..."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors({ ...errors, description: '' });
          }}
          rows="4"
        />
        {errors.description && (
          <p className="error-message">
            <AlertCircle size={16} /> {errors.description}
          </p>
        )}
      </div>

      <div className="form-section">
        <label className="form-label">Urgency</label>
        <div className="urgency-buttons">
          {['normal', 'important', 'emergency'].map((level) => (
            <button
              key={level}
              type="button"
              className={`urgency-option ${urgency === level ? 'selected' : ''}`}
              onClick={() => setUrgency(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="form-section">
        <label className="form-label" htmlFor="photo">Photo</label>
        <label htmlFor="photo" className="photo-upload">
          {image ? (
            <div className="photo-preview">
              <img src={image} alt="Preview" />
              <button
                type="button"
                className="remove-photo"
                onClick={(e) => {
                  e.preventDefault();
                  setImage(null);
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="photo-placeholder">
              📷
              <p>Attach a photo</p>
              <span>Photo upload — available in next release</span>
            </div>
          )}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Submit maintenance request
        </button>
      </div>
    </form>
  );
}

export default MaintenanceForm;
