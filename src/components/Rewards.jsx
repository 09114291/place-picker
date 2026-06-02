import './Rewards.css';

function Rewards() {
  const rewards = [
    { id: 1, title: 'Новачок', description: 'Зроби перший вибір', status: 'achieved', progress: 100 },
    { id: 2, title: 'Постійний вибір', description: '7 днів поспіль', status: 'achieved', progress: 100 },
    { id: 3, title: 'Вогняний вибір', description: '14 днів поспіль', status: 'achieved', progress: 100 },
    { id: 4, title: 'Легенда', description: '21 день поспіль', status: 'locked', progress: 67 }
  ];

  return (
    <div className="rewards">
      <h3 className="rewards-title">Твої нагороди</h3>
      <div className="rewards-list">
        {rewards.map(reward => (
          <div key={reward.id} className={`reward-item ${reward.status}`}>
            <div className="reward-icon">
              {reward.status === 'achieved' ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF6B00"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(255,255,255,0.2)"/>
                </svg>
              )}
            </div>
            <div className="reward-content">
              <div className="reward-header">
                <span className="reward-title">{reward.title}</span>
                <span className={`reward-status ${reward.status}`}>
                  {reward.status === 'achieved' ? 'Досягнуто' : 'Заблоковано'}
                </span>
              </div>
              <p className="reward-description">{reward.description}</p>
              {reward.status === 'locked' && (
                <div className="reward-progress">
                  <div className="progress-bar-small">
                    <div className="progress-fill-small" style={{ width: `${reward.progress}%` }}></div>
                  </div>
                  <span className="progress-text-small">{reward.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rewards;
