import { useNavigate } from 'react-router-dom';
import { placesData } from '../data/places';
import PlaceCard from '../components/PlaceCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const popularPlaces = placesData.slice(0, 3);

  const handleChoosePlace = () => {
    navigate('/places');
  };

  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Знайди своє ідеальне місце</h1>
          <p className="hero-subtitle">
            Відкрийте найкращі ресторани, кафе та заклади в Івано-Франківську
          </p>
          <div className="hero-actions">
            <button className="hero-cta-button" onClick={handleChoosePlace}>
              Обрати місце
            </button>
          </div>
        </div>
      </div>

      <div className="popular-section">
        <h2 className="section-title">Популярні заклади</h2>
        <div className="popular-grid">
          {popularPlaces.map(place => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
