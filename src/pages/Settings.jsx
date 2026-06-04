import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [profile, setProfile] = useState({
    name: 'Олексій',
    email: 'oleksiy@example.com',
    password: ''
  });

  const [preferences, setPreferences] = useState([
    { id: 1, name: 'Українська кухня', selected: true },
    { id: 2, name: 'Італійська кухня', selected: true },
    { id: 3, name: 'Японська кухня', selected: false },
    { id: 4, name: 'Грузинська кухня', selected: false },
    { id: 5, name: 'Європейська кухня', selected: true },
    { id: 6, name: 'Американська кухня', selected: false },
    { id: 7, name: 'Вегетаріанська', selected: false },
    { id: 8, name: 'Морепродукти', selected: false }
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    promotions: false
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const togglePreference = (id) => {
    setPreferences(preferences.map(pref =>
      pref.id === id ? { ...pref, selected: !pref.selected } : pref
    ));
  };

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSave = () => {
    console.log('Saving settings:', { profile, preferences, notifications });
    alert('Налаштування збережено!');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Налаштування</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">Профіль</h2>
          <div className="form-group">
            <label className="form-label">Ім'я</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="form-input"
              placeholder="Введіть ваше ім'я"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="form-input"
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              className="form-input"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Гастрономічні вподобання</h2>
          <div className="preferences-grid">
            {preferences.map(pref => (
              <button
                key={pref.id}
                className={`preference-tag ${pref.selected ? 'selected' : ''}`}
                onClick={() => togglePreference(pref.id)}
              >
                {pref.name}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Сповіщення</h2>
          <div className="notifications-list">
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Email сповіщення</span>
                <span className="notification-description">Отримувати новини на пошту</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="email"
                  checked={notifications.email}
                  onChange={() => toggleNotification('email')}
                  className="toggle-input"
                />
                <label htmlFor="email" className="toggle-label"></label>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Push сповіщення</span>
                <span className="notification-description">Сповіщення в браузері</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="push"
                  checked={notifications.push}
                  onChange={() => toggleNotification('push')}
                  className="toggle-input"
                />
                <label htmlFor="push" className="toggle-label"></label>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Тижневий дайджест</span>
                <span className="notification-description">Підбірка нових місць</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="weekly"
                  checked={notifications.weekly}
                  onChange={() => toggleNotification('weekly')}
                  className="toggle-input"
                />
                <label htmlFor="weekly" className="toggle-label"></label>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Акції та знижки</span>
                <span className="notification-description">Спеціальні пропозиції</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="promotions"
                  checked={notifications.promotions}
                  onChange={() => toggleNotification('promotions')}
                  className="toggle-input"
                />
                <label htmlFor="promotions" className="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>

        <button className="save-button" onClick={handleSave}>
          Зберегти зміни
        </button>
      </div>
    </div>
  );
}

export default Settings;
