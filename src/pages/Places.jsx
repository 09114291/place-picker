import { useState } from 'react';
import { placesData } from '../data/places';
import PlaceCard from '../components/PlaceCard';
import Modal from '../components/Modal';
import './Places.css';

function Places({ incrementStreak }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  const categories = ['All', 'restaurant', 'cafe'];
  const cuisines = ['All', 'Українська', 'Італійська', 'Європейська', 'Стейки', 'Кафе', 'Американська', 'Піца', 'Японська', 'Кав\'ярня', 'Вегетаріанська', 'Веганська', 'Здорове харчування', 'Бургери', 'Гриль', 'Ресторан', 'Фастфуд', 'Турецька', 'Морепродукти', 'Паб'];
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

  const handleDetailsClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const handleSelectPlace = () => {
    incrementStreak();
    handleCloseModal();
  };

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
            <PlaceCard key={place.id} place={place} onDetailsClick={handleDetailsClick} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={selectedPlace !== null}
        onClose={handleCloseModal}
        title={selectedPlace?.name}
      >
        {selectedPlace && (
          <div className="place-details-modal">
            <img src={selectedPlace.imgUrl} alt={selectedPlace.name} className="modal-place-image" />
            <div className="modal-place-info">
              <p className="modal-place-description">{selectedPlace.description}</p>
              <p className="modal-place-cuisine">{selectedPlace.cuisine} кухня</p>
              <p className="modal-place-address">{selectedPlace.address}</p>
              <div className="modal-place-meta">
                <span className="modal-place-rating">⭐ {selectedPlace.rating}</span>
                <span className="modal-place-price">{selectedPlace.priceRange}</span>
                <span className="modal-place-distance">{selectedPlace.distance}</span>
              </div>
              {selectedPlace.menu && (
                <div className="modal-place-menu">
                  <h4 className="menu-title">Меню:</h4>
                  <ul className="menu-list">
                    {selectedPlace.menu.map((item, index) => (
                      <li key={index} className="menu-item">
                        <span className="menu-item-name">{item.name}</span>
                        <span className="menu-item-price">{item.price} грн</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button className="modal-place-button" onClick={handleSelectPlace}>Обрати це місце</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Places;
