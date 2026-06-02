import StreakBanner from '../components/StreakBanner';
import HistoryList from '../components/HistoryList';
import StreakCalendar from '../components/StreakCalendar';
import RewardsBox from '../components/RewardsBox';
import './Streak.css';

function Streak() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Твоя історія</h1>
      </div>
      <StreakBanner />
      <div className="streak-content">
        <div className="streak-left">
          <HistoryList />
        </div>
        <div className="streak-right">
          <StreakCalendar />
          <RewardsBox />
        </div>
      </div>
    </div>
  );
}

export default Streak;
