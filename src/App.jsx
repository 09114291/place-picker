import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  }, []);
  
  const incrementStreak = () => {
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
    return true;
  };
  
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places incrementStreak={incrementStreak} />} />
            <Route path="/map" element={<Map incrementStreak={incrementStreak} />} />
            <Route path="/streak" element={<Streak streak={streak} setStreak={setStreak} activeDates={activeDates} />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
