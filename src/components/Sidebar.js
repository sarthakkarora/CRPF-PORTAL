import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/inventory">Inventory</NavLink></li>
        <li><NavLink to="/personnel">Personnel</NavLink></li>
        <li><NavLink to="/reports">Reports</NavLink></li>
        <li><NavLink to="/alerts">Alerts</NavLink></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
