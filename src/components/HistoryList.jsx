import { historyData } from '../data/history';
import HistoryCard from './HistoryCard';
import './HistoryList.css';

function HistoryList() {
  return (
    <div className="history-list">
      <div className="history-header">
        <h2 className="history-title">Мої попередні вибори</h2>
        <div className="history-actions">
          <button className="filter-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <path d="M22 6l-10 7L2 6"/>
            </svg>
          </button>
          <button className="repeat-selection-btn">Повторити вибір</button>
        </div>
      </div>
      <div className="history-cards">
        {historyData.map((item) => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
