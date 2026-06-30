import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <h2>Place Picker</h2>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className="nav-link" onClick={handleLinkClick}>Home</Link>
        <Link to="/places" className="nav-link" onClick={handleLinkClick}>Places</Link>
        <Link to="/map" className="nav-link" onClick={handleLinkClick}>Map</Link>
        <Link to="/streak" className="nav-link" onClick={handleLinkClick}>Streak</Link>
        <Link to="/settings" className="nav-link" onClick={handleLinkClick}>Settings</Link>
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
