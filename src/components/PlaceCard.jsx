import './PlaceCard.css';

function PlaceCard({ place, onDetailsClick, isFavorite, onFavoriteToggle }) {
  return (
    <div className="place-card">
      <div className="place-image-container">
        <img src={place.imgUrl} alt={place.name} className="place-image" />
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle && onFavoriteToggle(place.id);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        {place.isOpen ? (
          <div className="place-status open">Відкрито</div>
        ) : (
          <div className="place-status closed">Закрито</div>
        )}
      </div>
      
      <div className="place-content">
        <div className="place-header">
          <h3 className="place-name">{place.name}</h3>
          <div className="place-rating">
            <span className="stars">{'⭐'.repeat(Math.floor(place.rating))}</span>
            <span className="rating-number">{place.rating}</span>
          </div>
        </div>
        
        <p className="place-cuisine">{place.cuisine} кухня</p>
        
        <div className="place-details">
          <span className="place-price">{place.priceRange}</span>
          <span className="place-distance">{place.distance}</span>
        </div>
        
        <button className="place-details-button" onClick={() => onDetailsClick && onDetailsClick(place)}>
          Детальніше
        </button>
      </div>
    </div>
  );
}

export default PlaceCard;
