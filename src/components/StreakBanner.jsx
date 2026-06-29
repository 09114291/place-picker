import { useState } from 'react';
import './StreakBanner.css';

function StreakBanner({ streak, onViewRewards }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const nextReward = 21 - streak;
  const progressPercent = Math.min((streak / 21) * 100, 100);
  
  const handleStreakClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <div className="streak-banner">
      <div className="streak-header">
        <div className="streak-info">
          <h2 className="streak-title">Твій streak</h2>
          <div className="streak-days" onClick={handleStreakClick}>
            <span className={`streak-number ${isAnimating ? 'animate' : ''}`}>{streak}</span>
            <span className="streak-text">днів поспіль</span>
            <svg className={`fire-icon ${isAnimating ? 'animate' : ''}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
              <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
              <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
            </svg>
          </div>
          <p className="streak-record">Рекорд: 21 день</p>
        </div>
      </div>
      
      <div className="streak-progress">
        <div className="progress-header">
          <span className="progress-label">Наступна нагорода</span>
          <span className="progress-days">{nextReward} днів до нової нагороди</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="progress-text">{streak}/21</div>
        </div>
        <button className="view-rewards-btn" onClick={onViewRewards}>Переглянути нагороди</button>
      </div>
    </div>
  );
}

export default StreakBanner;
