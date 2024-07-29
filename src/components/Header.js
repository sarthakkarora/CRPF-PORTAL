import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo">CRPF Admin</div>
      <nav className="nav-links">
        <a href="#dashboard">Dashboard</a>
        <a href="#personnel">Personnel</a>
        <a href="#reports">Reports</a>
        <a href="#alerts">Alerts</a>
        <a href="#inventory">Inventory</a>
      </nav>
      <div className="user-profile">
        <span>Admin</span>
        <img src="profile-pic-url" alt="Profile" className="profile-pic"/>
      </div>
    </header>
  );
};

export default Header;
