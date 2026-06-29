import { useState } from 'react';
import './StreakCalendar.css';

function StreakCalendar({ streak, activeDates }) {
  const [currentDate] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  
  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const totalDays = lastDay.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, isActive: false });
    }
    
    // Add days of the month with real streak data
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isActive = activeDates.includes(dateStr);
      const isCurrentDay = i === currentDate.getDate();
      days.push({ day: i, isActive, isCurrentDay, dateStr });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="streak-calendar">
      <h3 className="calendar-title">Мій календар streak</h3>
      
      <div className="calendar-header">
        {days.map(day => (
          <div key={day} className="calendar-day-label">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {calendarDays.map((item, index) => (
          <div 
            key={index} 
            className={`calendar-day ${item.isCurrentDay ? 'current-day' : ''} ${!item.day ? 'empty-day' : ''}`}
          >
            {item.day && (
              <>
                {item.isActive ? (
                  <div className="active-day">
                    <svg className={`fire-icon-small ${isAnimating ? 'animate' : ''}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z" fill="#FF4500"/>
                      <path d="M12 19c3.31 0 6-2.69 6-6 0-3.31-6-9-6-9S6 9.69 6 13c0 3.31 2.69 6 6 6z" fill="#FF6B00"/>
                      <path d="M12 16c1.66 0 3-1.34 3-3 0-1.66-3-5-3-5s-3 3.34-3 5c0 1.66 1.34 3 3 3z" fill="#FF8C00"/>
                    </svg>
                  </div>
                ) : (
                  <div className="inactive-day">
                    <span className="day-number">{item.day}</span>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-icon inactive">
            <span className="legend-number">—</span>
          </div>
          <span className="legend-text">День без вибору</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon active">
            <svg className="fire-icon-legend" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23Z" fill="#FF6B00" fillOpacity="0.2"/>
              <path d="M12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20Z" fill="#FF6B00" fillOpacity="0.4"/>
              <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" fill="#FF6B00"/>
            </svg>
          </div>
          <span className="legend-text">День з вибором</span>
        </div>
      </div>
    </div>
  );
}

export default StreakCalendar;
