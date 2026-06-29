import './RewardsBox.css';

function RewardsBox({ streak }) {
  const rewards = [
    { 
      id: 1, 
      title: 'Новачок', 
      description: 'Зроби перший вибір', 
      required: 1,
      icon: 'star'
    },
    { 
      id: 2, 
      title: 'Постійний вибір', 
      description: '7 днів поспіль', 
      required: 7,
      icon: 'fire'
    },
    { 
      id: 3, 
      title: 'Вогняний вибір', 
      description: '14 днів поспіль', 
      required: 14,
      icon: 'fire-double'
    },
    { 
      id: 4, 
      title: 'Легенда', 
      description: '21 день поспіль', 
      required: 21,
      icon: 'crown'
    }
  ];

  const getRewardStatus = (required) => {
    if (streak >= required) return 'completed';
    if (streak >= required - 7) return 'in-progress';
    return 'locked';
  };

  const getProgress = (required) => {
    const currentProgress = Math.min(streak, required);
    return currentProgress;
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'star':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        );
      case 'fire':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
            <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
            <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
          </svg>
        );
      case 'fire-double':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
            <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
            <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
          </svg>
        );
      case 'crown':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V18H19V19Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rewards-box">
      <h3 className="rewards-box-title">Твої нагороди</h3>
      <div className="rewards-box-list">
        {rewards.map(reward => {
          const status = getRewardStatus(reward.required);
          const progress = getProgress(reward.required);
          return (
            <div key={reward.id} className={`reward-card ${status}`}>
              <div className="reward-card-icon">
                {getIcon(reward.icon)}
              </div>
              <div className="reward-card-content">
                <div className="reward-card-header">
                  <span className="reward-card-title">{reward.title}</span>
                  {status === 'completed' && (
                    <div className="reward-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17L4 12"/>
                      </svg>
                    </div>
                  )}
                  {status === 'locked' && (
                    <div className="reward-lock">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    </div>
                  )}
                </div>
                <p className="reward-card-description">{reward.description}</p>
                {status === 'in-progress' && (
                  <div className="reward-progress">
                    <div className="reward-progress-bar">
                      <div 
                        className="reward-progress-fill" 
                        style={{ width: `${(progress / reward.required) * 100}%` }}
                      ></div>
                    </div>
                    <span className="reward-progress-text">{progress}/{reward.required}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RewardsBox;
