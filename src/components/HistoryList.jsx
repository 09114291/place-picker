import { historyData } from '../data/history';
import HistoryCard from './HistoryCard';
import './HistoryList.css';

function HistoryList() {
  return (
    <div className="history-list">
      <h2 className="history-title">Історія виборів</h2>
      <div className="history-cards">
        {historyData.map((item) => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HistoryList;
