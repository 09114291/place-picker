import { useRef } from 'react';
import StreakBanner from '../components/StreakBanner';
import HistoryList from '../components/HistoryList';
import StreakCalendar from '../components/StreakCalendar';
import RewardsBox from '../components/RewardsBox';
import './Streak.css';

function Streak({ streak, setStreak, activeDates }) {
  const rewardsRef = useRef(null);
  
  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };
  
  const handleViewRewards = () => {
    if (rewardsRef.current) {
      rewardsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Твоя історія</h1>
      </div>
      <StreakBanner streak={streak} onViewRewards={handleViewRewards} />
      <div className="streak-content">
        <div className="streak-left">
          <HistoryList incrementStreak={incrementStreak} currentStreak={streak} />
        </div>
        <div className="streak-right">
          <StreakCalendar streak={streak} activeDates={activeDates} />
          <div ref={rewardsRef}>
            <RewardsBox streak={streak} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Streak;
