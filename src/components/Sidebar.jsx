import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Place Picker</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/places" className="nav-link">Places</Link>
        <Link to="/map" className="nav-link">Map</Link>
        <Link to="/streak" className="nav-link">Streak</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </nav>

      <div className="sidebar-profile">
        <div className="profile-info">
          <span className="profile-name">Олександра</span>
          <span className="profile-level">Level 7</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
