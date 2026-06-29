import { useState, useEffect } from 'react';
import './HistoryCard.css';

function HistoryCard({ item, onRepeatClick, currentStreak, selectedItemId }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (selectedItemId === item.id) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [selectedItemId, item.id]);
  
  const handleCardClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <div className="history-card" onClick={handleCardClick}>
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
            <svg className={`streak-icon-small ${isAnimating ? 'animate' : ''}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
              <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
              <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
            </svg>
            <span className={`streak-number-small ${isAnimating ? 'animate' : ''}`}>{currentStreak}</span>
          </div>
        </div>
      </div>
      
      <button className="repeat-button" onClick={(e) => {
        e.stopPropagation();
        onRepeatClick && onRepeatClick(item);
      }}>
        Повторити
      </button>
    </div>
  );
}

export default HistoryCard;
