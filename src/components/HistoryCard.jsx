import { useState } from 'react';
import './HistoryCard.css';

function HistoryCard({ item, onRepeatClick }) {
  const [isFireClicked, setIsFireClicked] = useState(false);

  const handleFireClick = () => {
    setIsFireClicked(true);
    setTimeout(() => setIsFireClicked(false), 300);
  };

  return (
    <div className="history-card">
      <img src={item.imgUrl} alt={item.title} className="card-image" />

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{item.title}</h3>
          <div className="card-badges">
            <span className="badge badge-type">{item.type}</span>
            <span className="badge badge-cuisine">{item.cuisine}</span>
            {item.recommended && (
              <span className="badge badge-recommended">Рекомендовано</span>
            )}
          </div>
        </div>

        <div className="card-footer">
          <span className="card-date">{item.date} • {item.time}</span>
          <div className="card-streak">
            <svg
              className={`streak-icon-small ${isFireClicked ? 'fire-icon-clicked' : ''}`}
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={handleFireClick}
              style={{ cursor: 'pointer' }}
            >
              <path d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" fill="#FF6B00" fillOpacity="0.2"/>
              <path d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" fill="#FF6B00" fillOpacity="0.4"/>
              <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" fill="#FF6B00"/>
            </svg>
            <span className="streak-number-small">{item.streakDays}</span>
          </div>
        </div>
      </div>

      <button className="repeat-button" onClick={() => onRepeatClick && onRepeatClick(item)}>
        Повторити
      </button>
    </div>
  );
}

export default HistoryCard;
