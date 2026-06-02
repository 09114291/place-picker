import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Places from './pages/Places';
import Map from './pages/Map';
import Streak from './pages/Streak';
import Settings from './pages/Settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/map" element={<Map />} />
            <Route path="/streak" element={<Streak />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
