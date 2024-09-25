import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [category, setCategory] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalCost, setTotalCost] = useState(null);

  const categories = {
    'E-commerce': ['Product Listing', 'Payment Integration'],
    'Social Media': ['User Profiles', 'Chat System'],
    'Cloud Kitchen': ['Menu Display', 'Online Ordering'],
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSelectedFeatures([]);
    setTotalCost(null);
  };

  const handleFeatureChange = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const calculateCost = async () => {
    if (!category || selectedFeatures.length === 0) {
      alert('Please select a category and at least one feature.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/calculate-cost', {
        category,
        features: selectedFeatures,
      });
      setTotalCost(response.data.totalCost);
    } catch (error) {
      console.error('Error calculating cost:', error);
      alert('Failed to calculate cost. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>App Cost Calculator</h1>

      <div className="form-group">
        <label htmlFor="category">App Category:</label>
        <select
          id="category"
          className="form-control"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {category && (
        <div className="form-group">
          <label>App Features:</label>
          {categories[category].map((feature) => (
            <div key={feature} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={feature}
                checked={selectedFeatures.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
              />
              <label className="form-check-label" htmlFor={feature}>
                {feature}
              </label>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" onClick={calculateCost}>
        Calculate Cost
      </button>

      {totalCost !== null && (
        <div className="result">
          <h2>Total Cost: ${totalCost}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
