import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { placesData } from '../data/places';
import Modal from '../components/Modal';
import './Map.css';

function Map({ incrementStreak }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

  const handleSelectPlace = () => {
    incrementStreak();
    handleCloseModal();
  };

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Initialize map centered on Ivano-Frankivsk
      mapInstanceRef.current = L.map(mapRef.current).setView([48.9229, 24.7111], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Add markers for places
      placesData.forEach((place, index) => {
        // Use actual coordinates from place data or generate random if not available
        const lat = place.coordinates ? place.coordinates[0] : 48.9229 + (Math.random() - 0.5) * 0.05;
        const lng = place.coordinates ? place.coordinates[1] : 24.7111 + (Math.random() - 0.5) * 0.05;

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);
        
        marker.bindPopup(`
          <div class="popup-content">
            <strong>${place.name}</strong><br>
            ⭐ ${place.rating}<br>
            ${place.cuisine} кухня
          </div>
        `);

        // Add click event to open modal
        marker.on('click', () => {
          setSelectedPlace(place);
        });
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Карта міста</h1>
      </div>
      
      <div className="map-container">
        <div ref={mapRef} className="map-leaflet"></div>
        
        <div className="map-legend">
          <div className="legend-item">
            <div className="legend-marker"></div>
            <span className="legend-text">Заклади</span>
          </div>
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

export default Map;
