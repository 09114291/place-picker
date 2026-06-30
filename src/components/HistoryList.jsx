import { useState } from 'react';
import { historyData } from '../data/history';
import { placesData } from '../data/places';
import HistoryCard from './HistoryCard';
import Modal from './Modal';
import './HistoryList.css';

function HistoryList({ incrementStreak, currentStreak, selectionStats }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleRepeatClick = (item) => {
    setSelectedItem(item);
    // Find the corresponding place in placesData
    const place = placesData.find(p => p.name === item.title);
    setSelectedPlace(place || null);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedPlace(null);
  };

  const handleRepeatSelection = () => {
    const wasIncremented = incrementStreak(selectedPlace?.id);
    if (wasIncremented) {
      // Keep selected item to trigger animation in cards
      // Clear it after animation
      setTimeout(() => {
        setSelectedItem(null);
        setSelectedPlace(null);
      }, 500);
    } else {
      handleCloseModal();
    }
  };

  return (
    <div className="history-list">
      <div className="history-header">
        <h2 className="history-title">Мої попередні вибори</h2>
        <div className="history-actions">
          <button className="filter-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <path d="M22 6l-10 7L2 6"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="history-cards">
        {historyData.map((item) => (
          <HistoryCard 
            key={item.id} 
            item={item} 
            onRepeatClick={handleRepeatClick} 
            currentStreak={currentStreak}
            selectedItemId={selectedItem?.id}
          />
        ))}
      </div>

      <Modal
        isOpen={selectedItem !== null}
        onClose={handleCloseModal}
        title={selectedItem?.title}
      >
        {selectedItem && selectedPlace && (
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
              <div className="modal-history-streak">
                <svg className="streak-icon-small" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
                  <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
                  <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
                </svg>
                <span className="streak-number-small">{currentStreak} днів поспіль</span>
              </div>
              <button className="modal-place-button" onClick={handleRepeatSelection}>Обрати це місце</button>
              
              {selectionStats[selectedPlace?.id] > 0 && (
                <div className="selection-stats">
                  <p className="stats-text">Це місце обирали {selectionStats[selectedPlace.id]} разів</p>
                </div>
              )}
            </div>
          </div>
        )}
        {selectedItem && !selectedPlace && (
          <div className="repeat-modal-content">
            <img src={selectedItem.imgUrl} alt={selectedItem.title} className="modal-history-image" />
            <div className="modal-history-info">
              <div className="modal-history-badges">
                <span className="badge badge-type">{selectedItem.type}</span>
                <span className="badge badge-cuisine">{selectedItem.cuisine}</span>
              </div>
              <p className="modal-history-date">{selectedItem.date} • {selectedItem.time}</p>
              <div className="modal-history-streak">
                <svg className="streak-icon-small" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
                  <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
                  <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
                </svg>
                <span className="streak-number-small">{currentStreak} днів поспіль</span>
              </div>
              <button className="modal-history-button" onClick={handleRepeatSelection}>Повторити вибір</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default HistoryList;
