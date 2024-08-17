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
  FaComments,
  FaHandHoldingUsd,
  FaMedkit,
  FaTruck,
  FaClipboardList
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [user, setUser] = useState(null);

  const sidebarRef = useRef(null);

  useEffect(() => {
    setUser({
      name: 'Major Shreejesh',
      profilePicture: 'https://crpf.gov.in/Upload/Employees/dgcrpf-832.jpg'
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
    const content = document.querySelector('.main-content');
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
        {!collapsed && <div className="sidebar-title">CRPF Panel</div>}
      </div>
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-link" aria-label="Dashboard">
          <FaTachometerAlt className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Dashboard</span>}
        </Link>
        <Link to="/mission-profile" className="sidebar-link" aria-label="Mission Profile">
          <FaClipboardList className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Mission Profile</span>}
        </Link>
        <Link to="/indent" className="sidebar-link" aria-label="Indent Resource/Equipment">
          <FaTruck className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Indent Resource/Equipment</span>}
        </Link>
        <Link to="/medical" className="sidebar-link" aria-label="Medical Support">
          <FaMedkit className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Medical Support</span>}
        </Link>
        <Link to="/chat" className="sidebar-link" aria-label="Chat">
          <FaComments className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Field Chat</span>}
        </Link>
        <Link to="/fund-request" className="sidebar-link" aria-label="Fund Request">
          <FaHandHoldingUsd className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Fund Request</span>}
        </Link>
        <Link to="/personnel" className="sidebar-link" aria-label="Personnel">
          <FaUsers className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Personnel Management</span>}
        </Link>
        <Link to="/inventory" className="sidebar-link" aria-label="Inventory">
          <FaBox className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Inventory Management</span>}
        </Link>
        <Link to="/reports" className="sidebar-link" aria-label="Reports">
          <FaFileAlt className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Reports</span>}
        </Link>
        <Link to="/alerts" className="sidebar-link" aria-label="Alerts">
          <FaBell className="sidebar-icon" />
          {!collapsed && <span className="sidebar-text">Alerts</span>}
          {notifications > 0 && (
            <span className="notification-badge" aria-label="New Notifications">{notifications}</span>
          )}
        </Link>
      </div>
      <div className="sidebar-footer">
        <div className="profile-section" onClick={() => setShowDropdown(!showDropdown)} aria-label="Profile">
          {user && (
            <>
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="profile-picture" 
                onError={(e) => e.target.src = 'https://via.placeholder.com/50'} // Fallback image
              />
              {!collapsed && <span className="profile-text">{user.name}</span>}
            </>
          )}
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="#" className="dropdown-item" aria-label="Profile"><FaUserCircle /> Profile</Link>
              <Link to="#" className="dropdown-item" aria-label="Settings"><FaCog /> Settings</Link>
              <Link to="#" className="dropdown-item" aria-label="Logout"><FaSignOutAlt /> Logout</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
