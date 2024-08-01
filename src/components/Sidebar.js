import React, { useState, useRef, useEffect } from 'react';
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaFileAlt,
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaMapMarkedAlt,
  FaComments,
  FaClipboardList,
  FaMedkit,
  FaHandHoldingUsd,
  FaShieldAlt,
  FaTruck,
  FaLock,
  FaUserCog,
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [user, setUser] = useState(null);

  const sidebarRef = useRef(null);

  useEffect(() => {
    setUser({
      name: 'John Doe',
      profilePicture: 'https://via.placeholder.com/50'
    });

    const handleMouseMove = (e) => {
      if (e.clientX < 150) {
        setCollapsed(false);
      } else if (!sidebarRef.current.contains(e.target) && !collapsed) {
        setCollapsed(true);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [collapsed]);

  useEffect(() => {
    const content = document.querySelector('.content');
    if (collapsed) {
      document.querySelector('.sidebar-container').classList.remove('expanded');
      document.querySelector('.sidebar-container').classList.add('collapsed');
      content.style.marginLeft = '10px';
    } else {
      document.querySelector('.sidebar-container').classList.remove('collapsed');
      document.querySelector('.sidebar-container').classList.add('expanded');
      content.style.marginLeft = '180px'; 
    }
  }, [collapsed]);

  return (
    <div className={`sidebar-container ${collapsed ? 'collapsed' : 'expanded'}`} ref={sidebarRef}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle Sidebar">
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        {!collapsed && <div className="sidebar-title">Admin Panel</div>}
      </div>
      <div className="sidebar-links">
        <a href="http://localhost:5001/dashboard" className="sidebar-link" aria-label="Dashboard">
          <FaTachometerAlt className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Dashboard</span>}
        </a>
        <a href="http://localhost:5001/mission-profile" className="sidebar-link" aria-label="Mission Profile">
          <FaClipboardList className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Mission Profile</span>}
        </a>
        <a href="http://localhost:5001/indent" className="sidebar-link" aria-label="Indent Resource/Equipment">
          <FaTruck className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Indent Resource/Equipment</span>}
        </a>
        <a href="http://localhost:5001/medical" className="sidebar-link" aria-label="Medical Support">
          <FaMedkit className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Medical Support</span>}
        </a>
        <a href="http://localhost:5001/chat" className="sidebar-link" aria-label="Field Chat">
          <FaComments className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Field Chat</span>}
        </a>
        <a href="/fund-request" className="sidebar-link" aria-label="Fund Request">
          <FaHandHoldingUsd className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Fund Request</span>}
        </a>
        <a href="http://localhost:5001/personnel" className="sidebar-link" aria-label="Personnel">
          <FaUsers className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Personnel Management</span>}
        </a>
        <a href="http://localhost:5001/inventory" className="sidebar-link" aria-label="Inventory">
          <FaBox className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Inventory Management</span>}
        </a>
       
        <a href="http://localhost:5001/reports" className="sidebar-link" aria-label="Reports">
          <FaFileAlt className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Reports</span>}
        </a>
        <a href="http://localhost:5001/alerts" className="sidebar-link" aria-label="Alerts">
          <FaBell className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Alerts</span>}
          {notifications > 0 && (
            <span className="notification-badge" aria-label="New Notifications">{notifications}</span>
          )}
        </a>
      </div>
      <div className="sidebar-footer">
        <div className="profile-section" onClick={() => setShowDropdown(!showDropdown)} aria-label="Profile">
          {user && (
            <>
              <img src={user.profilePicture} alt="Profile" className="profile-picture" />
              {!collapsed && <span className="profile-text">{user.name}</span>}
            </>
          )}
          {showDropdown && (
            <div className="dropdown-menu">
              <a href="http://localhost:5001/profile" className="dropdown-item" aria-label="Profile"><FaUserCircle /> Profile</a>
              <a href="http://localhost:5001/settings" className="dropdown-item" aria-label="Settings"><FaCog /> Settings</a>
              <a href="http://localhost:5001/logout" className="dropdown-item" aria-label="Logout"><FaSignOutAlt /> Logout</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
