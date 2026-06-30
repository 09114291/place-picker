import { useState, useEffect } from 'react';
import { placesData } from '../data/places';
import PlaceCard from '../components/PlaceCard';
import Modal from '../components/Modal';
import './Places.css';

function Places({ incrementStreak, selectionStats }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState({});
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save reviews to localStorage when they change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteToggle = (placeId) => {
    setFavorites(prev => {
      if (prev.includes(placeId)) {
        return prev.filter(id => id !== placeId);
      } else {
        return [...prev, placeId];
      }
    });
  };

  const handleAddReview = () => {
    if (!selectedPlace || !newReview.comment.trim()) return;
    
    const placeReviews = reviews[selectedPlace.id] || [];
    const review = {
      id: Date.now(),
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews(prev => ({
      ...prev,
      [selectedPlace.id]: [...placeReviews, review]
    }));
    
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const handleDeleteReview = (reviewId) => {
    if (!selectedPlace) return;
    
    setReviews(prev => ({
      ...prev,
      [selectedPlace.id]: prev[selectedPlace.id].filter(r => r.id !== reviewId)
    }));
  };
  
  const categories = ['All', 'restaurant', 'cafe'];
  const cuisines = ['All', 'Українська', 'Італійська', 'Європейська', 'Стейки', 'Кафе', 'Американська', 'Піца', 'Японська', 'Кав\'ярня', 'Вегетаріанська', 'Веганська', 'Здорове харчування', 'Бургери', 'Гриль', 'Ресторан', 'Фастфуд', 'Турецька', 'Морепродукти', 'Паб'];
  const ratings = ['All', '4.5+', '4.0+', '3.5+'];
  const distances = ['All', 'до 1 км', '1-3 км', '3+ км'];
  const sortOptions = [
    { value: 'default', label: 'За замовчуванням' },
    { value: 'rating-desc', label: 'Рейтинг (високий)' },
    { value: 'rating-asc', label: 'Рейтинг (низький)' },
    { value: 'price-asc', label: 'Ціна (дешевше)' },
    { value: 'price-desc', label: 'Ціна (дорожче)' },
    { value: 'distance-asc', label: 'Відстань (ближче)' },
    { value: 'distance-desc', label: 'Відстань (далі)' }
  ];
  
  const filteredPlaces = placesData.filter(place => {
    const categoryMatch = activeCategory === 'All' || place.category === activeCategory;
    const cuisineMatch = selectedCuisine === 'All' || place.cuisine === selectedCuisine;
    const ratingMatch = selectedRating === 'All' || 
      (selectedRating === '4.5+' && place.rating >= 4.5) ||
      (selectedRating === '4.0+' && place.rating >= 4.0) ||
      (selectedRating === '3.5+' && place.rating >= 3.5);
    const searchMatch = searchQuery === '' || place.name.toLowerCase().includes(searchQuery.toLowerCase());
    const distanceValue = parseFloat(place.distance);
    const distanceMatch = selectedDistance === 'All' ||
      (selectedDistance === 'до 1 км' && distanceValue < 1) ||
      (selectedDistance === '1-3 км' && distanceValue >= 1 && distanceValue <= 3) ||
      (selectedDistance === '3+ км' && distanceValue > 3);
    
    return categoryMatch && cuisineMatch && ratingMatch && searchMatch && distanceMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating-desc':
        return b.rating - a.rating;
      case 'rating-asc':
        return a.rating - b.rating;
      case 'price-asc':
        return a.priceRange.length - b.priceRange.length;
      case 'price-desc':
        return b.priceRange.length - a.priceRange.length;
      case 'distance-asc':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'distance-desc':
        return parseFloat(b.distance) - parseFloat(a.distance);
      default:
        return 0;
    }
  });

  // Generate recommendations based on selection stats and favorites
  const getRecommendations = () => {
    const recommended = [];
    
    // Add frequently selected places
    Object.entries(selectionStats).forEach(([placeId, count]) => {
      if (count >= 2) {
        const place = placesData.find(p => p.id === parseInt(placeId));
        if (place && !recommended.includes(place)) {
          recommended.push({ ...place, reason: 'Часто обираєте' });
        }
      }
    });
    
    // Add favorite places
    favorites.forEach(favId => {
      const place = placesData.find(p => p.id === favId);
      if (place && !recommended.find(r => r.id === place.id)) {
        recommended.push({ ...place, reason: 'У закладках' });
      }
    });
    
    // Add similar cuisine places
    const frequentlySelectedCuisines = Object.entries(selectionStats)
      .filter(([_, count]) => count >= 2)
      .map(([placeId]) => {
        const place = placesData.find(p => p.id === parseInt(placeId));
        return place?.cuisine;
      })
      .filter(Boolean);
    
    const uniqueCuisines = [...new Set(frequentlySelectedCuisines)];
    uniqueCuisines.forEach(cuisine => {
      const similarPlaces = placesData.filter(p => 
        p.cuisine === cuisine && 
        !recommended.find(r => r.id === p.id) &&
        !Object.keys(selectionStats).includes(p.id.toString())
      ).slice(0, 2);
      similarPlaces.forEach(place => {
        recommended.push({ ...place, reason: `Схожа кухня: ${cuisine}` });
      });
    });
    
    return recommended.slice(0, 6);
  };

  const recommendations = getRecommendations();

  const handleDetailsClick = (place) => {
    setSelectedPlace(place);
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const handleSelectPlace = () => {
    incrementStreak(selectedPlace.id);
    handleCloseModal();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Заклади</h1>
      </div>
      
      <div className="places-content">
        {recommendations.length > 0 && searchQuery === '' && activeCategory === 'All' && selectedCuisine === 'All' && selectedRating === 'All' && selectedDistance === 'All' && sortBy === 'default' && (
          <div className="recommendations-section">
            <h3 className="recommendations-title">Рекомендовані для вас</h3>
            <div className="recommendations-grid">
              {recommendations.map(place => (
                <div key={place.id} className="recommendation-card">
                  <PlaceCard 
                    place={place} 
                    onDetailsClick={handleDetailsClick}
                    isFavorite={favorites.includes(place.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                  <div className="recommendation-reason">
                    <span className="reason-badge">{place.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="search-panel">
          <input
            type="text"
            className="search-input"
            placeholder="Пошук за назвою..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
          
          <div className="filter-group">
            <label className="filter-label">Відстань</label>
            <select 
              className="filter-select"
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(e.target.value)}
            >
              {distances.map(distance => (
                <option key={distance} value={distance}>
                  {distance === 'All' ? 'Всі відстані' : distance}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Сортування</label>
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="places-grid">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                onDetailsClick={handleDetailsClick}
                isFavorite={favorites.includes(place.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))
          ) : (
            <div className="no-results">
              <p className="no-results-text">Нічого не знайдено</p>
              <p className="no-results-subtext">Спробуйте змінити параметри пошуку</p>
            </div>
          )}
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
              
              {selectionStats[selectedPlace?.id] > 0 && (
                <div className="selection-stats">
                  <p className="stats-text">Це місце обирали {selectionStats[selectedPlace.id]} разів</p>
                </div>
              )}
              
              <div className="modal-reviews-section">
                <div className="reviews-header">
                  <h4 className="reviews-title">Відгуки</h4>
                  <button 
                    className="add-review-button"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Скасувати' : '+ Додати відгук'}
                  </button>
                </div>
                
                {showReviewForm && (
                  <div className="review-form">
                    <div className="rating-selector">
                      <span className="rating-label">Оцінка:</span>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          className={`star-button ${star <= newReview.rating ? 'active' : ''}`}
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="review-input"
                      placeholder="Напишіть ваш відгук..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={3}
                    />
                    <button className="submit-review-button" onClick={handleAddReview}>
                      Опублікувати
                    </button>
                  </div>
                )}
                
                <div className="reviews-list">
                  {reviews[selectedPlace?.id]?.length > 0 ? (
                    reviews[selectedPlace.id].map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                          <span className="review-date">{review.date}</span>
                          <button 
                            className="delete-review-button"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-reviews">Поки що немає відгуків</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Places;
