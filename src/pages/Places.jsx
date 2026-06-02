import { useState } from 'react';
import { placesData } from '../data/places';
import PlaceCard from '../components/PlaceCard';
import './Places.css';

function Places() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  
  const categories = ['All', 'restaurant', 'cafe', 'cafeteria', 'fast_food', 'grocery'];
  const cuisines = ['All', 'Ukrainian', 'Italian', 'Japanese', 'Vegetarian', 'Seafood', 'International'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];
  
  const filteredPlaces = placesData.filter(place => {
    const categoryMatch = activeCategory === 'All' || place.category === activeCategory;
    const cuisineMatch = selectedCuisine === 'All' || place.cuisine === selectedCuisine;
    const ratingMatch = selectedRating === 'All' || 
      (selectedRating === '4.5+' && place.rating >= 4.5) ||
      (selectedRating === '4.0+' && place.rating >= 4.0) ||
      (selectedRating === '3.5+' && place.rating >= 3.5);
    
    return categoryMatch && cuisineMatch && ratingMatch;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Заклади</h1>
      </div>
      
      <div className="places-content">
        <div className="filters-panel">
          <div className="filter-group">
            <label className="filter-label">Фільтр</label>
            <select 
              className="filter-select"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'All' ? 'Всі типи' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Кухня</label>
            <select 
              className="filter-select"
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'All' ? 'Всі кухні' : cuisine}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Рейтинг</label>
            <select 
              className="filter-select"
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
            >
              {ratings.map(rating => (
                <option key={rating} value={rating}>
                  {rating === 'All' ? 'Всі рейтинги' : rating}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="places-grid">
          {filteredPlaces.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Places;
