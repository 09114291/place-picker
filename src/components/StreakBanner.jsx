import './StreakBanner.css';

function StreakBanner() {
  return (
    <div className="streak-banner">
      <div className="streak-header">
        <div className="streak-info">
          <h2 className="streak-title">Твій streak</h2>
          <div className="streak-days">
            <span className="streak-number">14</span>
            <span className="streak-text">днів поспіль</span>
            <svg className="fire-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" fill="#FF6B00" fillOpacity="0.2"/>
              <path d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" fill="#FF6B00" fillOpacity="0.4"/>
              <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" fill="#FF6B00"/>
            </svg>
          </div>
          <p className="streak-record">Рекорд: 21 день</p>
        </div>
      </div>
      
      <div className="streak-progress">
        <div className="progress-header">
          <span className="progress-label">Наступна нагорода</span>
          <span className="progress-days">7 днів до нової нагороди</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '66.67%' }}></div>
          </div>
          <div className="progress-text">14/21</div>
        </div>
        <button className="view-rewards-btn">Переглянути нагороди</button>
      </div>
    </div>
  );
}

export default StreakBanner;
