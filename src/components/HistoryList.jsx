import { useState } from 'react';
import { historyData } from '../data/history';
import HistoryCard from './HistoryCard';
import Modal from './Modal';
import './HistoryList.css';

function HistoryList() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRepeatClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
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
          <button className="repeat-selection-btn">Повторити вибір</button>
        </div>
      </div>
      <div className="history-cards">
        {historyData.map((item) => (
          <HistoryCard key={item.id} item={item} onRepeatClick={handleRepeatClick} />
        ))}
      </div>

      <Modal
        isOpen={selectedItem !== null}
        onClose={handleCloseModal}
        title={selectedItem?.title}
      >
        {selectedItem && (
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
                  <path d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" fill="#FF6B00" fillOpacity="0.2"/>
                  <path d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" fill="#FF6B00" fillOpacity="0.4"/>
                  <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" fill="#FF6B00"/>
                </svg>
                <span className="streak-number-small">{selectedItem.streakDays} днів поспіль</span>
              </div>
              <button className="modal-history-button">Повторити вибір</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default HistoryList;
