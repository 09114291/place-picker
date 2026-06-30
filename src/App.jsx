import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Places from './pages/Places';
import Map from './pages/Map';
import Streak from './pages/Streak';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [streak, setStreak] = useState(0);
  const [activeDates, setActiveDates] = useState([]);
  const [selectionStats, setSelectionStats] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate consecutive streak from dates
  const calculateStreak = (dates) => {
    if (dates.length === 0) return 0;
    
    // Sort dates in descending order (newest first)
    const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
    
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < sortedDates.length; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      if (sortedDates.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // Break if date is missing
        break;
      }
    }
    
    return streak;
  };

  // Load streak from localStorage on mount
  useEffect(() => {
    // Try to load from localStorage first
    const storedDates = localStorage.getItem('activeDates');
    if (storedDates) {
      const parsedDates = JSON.parse(storedDates);
      setActiveDates(parsedDates);
      setStreak(calculateStreak(parsedDates));
    } else {
      // Initialize with sample data for current month (including today)
      const today = new Date();
      const sampleDates = [];
      // Add today
      sampleDates.push(today.toISOString().split('T')[0]);
      // Add previous 13 days
      for (let i = 1; i < 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        sampleDates.push(date.toISOString().split('T')[0]);
      }
      setActiveDates(sampleDates);
      setStreak(calculateStreak(sampleDates));
      localStorage.setItem('activeDates', JSON.stringify(sampleDates));
    }

    // Load selection statistics
    const storedStats = localStorage.getItem('selectionStats');
    if (storedStats) {
      setSelectionStats(JSON.parse(storedStats));
    }
  }, []);
  
  const incrementStreak = (placeId = null) => {
    // Read current state from localStorage
    const storedDates = localStorage.getItem('activeDates');
    const currentActiveDates = storedDates ? JSON.parse(storedDates) : [];
    
    const today = new Date().toISOString().split('T')[0];
    
    // Check if today is already in the list
    if (currentActiveDates.includes(today)) {
      // Don't increment - today already counted
      return false;
    }
    
    // Add new date
    const newActiveDates = [...currentActiveDates, today];
    localStorage.setItem('activeDates', JSON.stringify(newActiveDates));
    setActiveDates(newActiveDates);
    setStreak(calculateStreak(newActiveDates));

    // Track selection statistics if placeId is provided
    if (placeId) {
      setSelectionStats(prev => {
        const newStats = {
          ...prev,
          [placeId]: (prev[placeId] || 0) + 1
        };
        localStorage.setItem('selectionStats', JSON.stringify(newStats));
        return newStats;
      });
    }

    return true;
  };

  
  return (
    <HashRouter>
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className={`sidebar-overlay ${sidebarOpen && isMobile ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>
        <main className={`main-content ${sidebarOpen && isMobile ? 'hidden' : ''}`}>
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places incrementStreak={incrementStreak} selectionStats={selectionStats} />} />
            <Route path="/map" element={<Map incrementStreak={incrementStreak} selectionStats={selectionStats} />} />
            <Route path="/streak" element={<Streak streak={streak} setStreak={setStreak} activeDates={activeDates} selectionStats={selectionStats} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
