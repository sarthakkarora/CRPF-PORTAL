import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
  FaCommentAlt,
  FaTimes
} from 'react-icons/fa';

const Header = React.memo(() => {
  const [theme, setTheme] = useState('light');
  const [time, setTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New report available', timestamp: '2024-07-31T10:00:00Z' },
    { id: 2, text: 'Personnel update', timestamp: '2024-07-31T11:00:00Z' }
  ]);
  const [messages] = useState([
    { id: 1, text: 'Message from John', timestamp: '2024-07-31T09:00:00Z' },
    { id: 2, text: 'Reminder: Meeting at 3 PM', timestamp: '2024-07-31T10:30:00Z' }
  ]);
  const [user, setUser] = useState({
    name: 'John Doe',
    profilePicture: 'https://via.placeholder.com/50',
    online: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([
    'Dashboard',
    'Personnel',
    'Reports',
    'Alerts',
    'Inventory'
  ]);
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.body.className = newTheme === 'light' ? 'light-theme' : 'dark-theme';
      return newTheme;
    });
  }, []);
  
  const handleUserMenuToggle = useCallback(() => {
    setShowUserMenu(prev => !prev);
    setShowNotifications(false);
    setShowMessages(false);
  }, []);
  
  const handleNotificationsToggle = useCallback(() => {
    setShowNotifications(prev => !prev);
    setShowUserMenu(false);
    setShowMessages(false);
  }, []);
  
  const handleMessagesToggle = useCallback(() => {
    setShowMessages(prev => !prev);
    setShowUserMenu(false);
    setShowNotifications(false);
  }, []);
  
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);
  
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);
  
  const formatDate = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, options);
  };
  
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.user-profile') && !e.target.closest('.notifications') && !e.target.closest('.messages')) {
      setShowUserMenu(false);
      setShowNotifications(false);
      setShowMessages(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);
  
  return (
    <header className="header-container">
      <div className="logo">CRPF Admin</div>
      <div className="header-search">
        <input 
          type="text" 
          placeholder="Search..." 
          aria-label="Search" 
          value={searchQuery}
          onChange={handleSearchChange}
          aria-expanded={searchQuery.length > 0}
          autoFocus
        />
        {searchQuery && (
          <FaTimes className="clear-search-icon" onClick={clearSearch} title="Clear Search" />
        )}
        <FaSearch className="search-icon" />
        {searchQuery && (
          <div className="search-suggestions" role="listbox">
            {searchSuggestions.filter(suggestion => suggestion.toLowerCase().includes(searchQuery.toLowerCase())).map((suggestion, index) => (
              <div key={index} className="suggestion-item" role="option" aria-selected="false">
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="header-actions">
        <div className="theme-switcher" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </div>
        <div className="clock">
          {time.toLocaleTimeString()} - {time.toLocaleDateString()}
        </div>
        <div className="notifications" onClick={handleNotificationsToggle}>
          <FaBell title="Notifications" />
          <span className="badge">{notifications.length}</span>
          {showNotifications && (
            <div className="dropdown-menu notifications-menu" role="menu">
              {notifications.map(notification => (
                <div key={notification.id} className="dropdown-item">
                  <span>{notification.text}</span>
                  <span className="timestamp">{formatDate(notification.timestamp)}</span>
                </div>
              ))}
              <div className="dropdown-footer">
                <a href="#view-all-notifications">View All</a>
              </div>
            </div>
          )}
        </div>
        <div className="messages" onClick={handleMessagesToggle}>
          <FaEnvelope title="Messages" />
          <span className="badge">{messages.length}</span>
          {showMessages && (
            <div className="dropdown-menu messages-menu" role="menu">
              {messages.map(message => (
                <div key={message.id} className="dropdown-item">
                  <span>{message.text}</span>
                  <span className="timestamp">{formatDate(message.timestamp)}</span>
                </div>
              ))}
              <div className="dropdown-footer">
                <a href="#view-all-messages">View All</a>
              </div>
            </div>
          )}
        </div>
        <div className="user-profile" onClick={handleUserMenuToggle}>
          <img src={user.profilePicture} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <span className="user-name">{user.name}</span>
            <span className={`user-status ${user.online ? 'online' : 'offline'}`} />
          </div>
          {showUserMenu && (
            <div className="user-dropdown">
              <a href="#profile" className="dropdown-item"><FaUserCircle /> Profile</a>
              <a href="#settings" className="dropdown-item"><FaCog /> Settings</a>
              <a href="#help" className="dropdown-item"><FaQuestionCircle /> Help</a>
              <a href="#feedback" className="dropdown-item"><FaCommentAlt /> Feedback</a>
              <a href="#logout" className="dropdown-item"><FaSignOutAlt /> Logout</a>
            </div>
          )}
        </div>
      </div>
      <div className="menu-toggle" onClick={() => document.querySelector('.header-container').classList.toggle('menu-open')}>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>
    </header>
  );
});

export default Header;
