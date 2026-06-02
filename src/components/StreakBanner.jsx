import './StreakBanner.css';

function StreakBanner() {
  return (
    <div className="streak-banner">
      <div className="streak-content">
        <div className="streak-number">14</div>
        <svg 
          className="fire-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" 
            fill="#FF6B00"
            fillOpacity="0.2"
          />
          <path 
            d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" 
            fill="#FF6B00"
            fillOpacity="0.4"
          />
          <path 
            d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" 
            fill="#FF6B00"
          />
          <path 
            d="M12 2C12 2 13.5 5.5 13.5 8C13.5 10.5 12 12 12 12C12 12 10.5 10.5 10.5 8C10.5 5.5 12 2 12 2Z" 
            fill="#FF6B00"
          />
          <path 
            d="M8 4C8 4 9 6.5 9 8C9 9.5 8 10.5 8 10.5C8 10.5 7 9.5 7 8C7 6.5 8 4 8 4Z" 
            fill="#FF6B00"
          />
          <path 
            d="M16 4C16 4 17 6.5 17 8C17 9.5 16 10.5 16 10.5C16 10.5 15 9.5 15 8C15 6.5 16 4 16 4Z" 
            fill="#FF6B00"
          />
        </svg>
      </div>
      
      <div className="streak-progress">
        <div className="progress-label">Наступна нагорода</div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '66.67%' }}></div>
          </div>
          <div className="progress-text">14/21</div>
        </div>
      </div>
    </div>
  );
}

export default StreakBanner;
