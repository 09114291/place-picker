import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { placesData } from '../data/places';
import Modal from '../components/Modal';
import './Map.css';

function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Initialize map centered on Ivano-Frankivsk
      mapInstanceRef.current = L.map(mapRef.current).setView([48.9229, 24.7111], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Add markers for places
      placesData.slice(0, 15).forEach((place, index) => {
        // Generate random coordinates around Ivano-Frankivsk center
        const lat = 48.9229 + (Math.random() - 0.5) * 0.05;
        const lng = 24.7111 + (Math.random() - 0.5) * 0.05;

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

  const handleCloseModal = () => {
    setSelectedPlace(null);
  };

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
              <p className="modal-place-cuisine">{selectedPlace.cuisine} кухня</p>
              <p className="modal-place-address">{selectedPlace.address}</p>
              <div className="modal-place-meta">
                <span className="modal-place-rating">⭐ {selectedPlace.rating}</span>
                <span className="modal-place-price">{selectedPlace.priceRange}</span>
                <span className="modal-place-distance">{selectedPlace.distance}</span>
              </div>
              <button className="modal-place-button">Обрати це місце</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Map;
