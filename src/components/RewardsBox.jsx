import './RewardsBox.css';

function RewardsBox() {
  const rewards = [
    { 
      id: 1, 
      title: 'Новачок', 
      description: 'Зроби перший вибір', 
      status: 'completed',
      icon: 'star'
    },
    { 
      id: 2, 
      title: 'Постійний вибір', 
      description: '7 днів поспіль', 
      status: 'completed',
      icon: 'fire'
    },
    { 
      id: 3, 
      title: 'Вогняний вибір', 
      description: '14 днів поспіль', 
      status: 'in-progress',
      progress: 14,
      total: 21,
      icon: 'fire-double'
    },
    { 
      id: 4, 
      title: 'Легенда', 
      description: '21 день поспіль', 
      status: 'locked',
      icon: 'crown'
    }
  ];

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
            <path d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" fillOpacity="0.2"/>
            <path d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" fillOpacity="0.4"/>
            <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"/>
          </svg>
        );
      case 'fire-double':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" fillOpacity="0.2"/>
            <path d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" fillOpacity="0.4"/>
            <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"/>
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
        {rewards.map(reward => (
          <div key={reward.id} className={`reward-card ${reward.status}`}>
            <div className="reward-card-icon">
              {getIcon(reward.icon)}
            </div>
            <div className="reward-card-content">
              <div className="reward-card-header">
                <span className="reward-card-title">{reward.title}</span>
                {reward.status === 'completed' && (
                  <div className="reward-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17L4 12"/>
                    </svg>
                  </div>
                )}
                {reward.status === 'locked' && (
                  <div className="reward-lock">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </div>
                )}
              </div>
              <p className="reward-card-description">{reward.description}</p>
              {reward.status === 'in-progress' && (
                <div className="reward-progress">
                  <div className="reward-progress-bar">
                    <div 
                      className="reward-progress-fill" 
                      style={{ width: `${(reward.progress / reward.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="reward-progress-text">{reward.progress}/{reward.total}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardsBox;
