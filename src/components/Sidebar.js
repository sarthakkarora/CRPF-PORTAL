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
  const [collapsed, setCollapsed] = useState(false); // Start expanded by default
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate user data fetch
    setUser({
      name: 'Major Shreejesh',
      profilePicture: 'https://crpf.gov.in/Upload/Employees/dgcrpf-832.jpg'
    });
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="toggle-btn" 
          onClick={toggleSidebar} 
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        {!collapsed && <div className="sidebar-title">CRPF Panel</div>}
      </div>

      <div className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link" aria-label="Dashboard">
          <FaTachometerAlt className="sidebar-icon" />
          <span className="sidebar-text">Dashboard</span>
        </Link>
        
        <Link to="/mission-profile" className="sidebar-link" aria-label="Mission Profile">
          <FaClipboardList className="sidebar-icon" />
          <span className="sidebar-text">Mission Profile</span>
        </Link>
        
        <Link to="/indent" className="sidebar-link" aria-label="Indent Resource/Equipment">
          <FaTruck className="sidebar-icon" />
          <span className="sidebar-text">Indent Resource/Equipment</span>
        </Link>
        
        <Link to="/medical" className="sidebar-link" aria-label="Medical Support">
          <FaMedkit className="sidebar-icon" />
          <span className="sidebar-text">Medical Support</span>
        </Link>
        
        <Link to="/chat" className="sidebar-link" aria-label="Chat">
          <FaComments className="sidebar-icon" />
          <span className="sidebar-text">Field Chat</span>
        </Link>
        
        <Link to="/fund-request" className="sidebar-link" aria-label="Fund Request">
          <FaHandHoldingUsd className="sidebar-icon" />
          <span className="sidebar-text">Fund Request</span>
        </Link>
        
        <Link to="/personnel" className="sidebar-link" aria-label="Personnel">
          <FaUsers className="sidebar-icon" />
          <span className="sidebar-text">Personnel Management</span>
        </Link>
        
        <Link to="/inventory" className="sidebar-link" aria-label="Inventory">
          <FaBox className="sidebar-icon" />
          <span className="sidebar-text">Inventory Management</span>
        </Link>
        
        <Link to="/reports" className="sidebar-link" aria-label="Reports">
          <FaFileAlt className="sidebar-icon" />
          <span className="sidebar-text">Reports</span>
        </Link>
        
        <Link to="/alerts" className="sidebar-link" aria-label="Alerts">
          <FaBell className="sidebar-icon" />
          <span className="sidebar-text">Alerts</span>
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </Link>
      </div>

      <div className="sidebar-footer">
  <div 
    className="profile-section" 
    onClick={() => setShowDropdown(!showDropdown)} 
    aria-label="Profile" 
    role="button" 
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && setShowDropdown(!showDropdown)}
  >
    {user && (
      <>
        <img 
          src={user.profilePicture} 
          alt={`${user.name}'s Profile`} 
          className="profile-picture" 
          onError={(e) => e.target.src = 'https://scontent.fpnq2-1.fna.fbcdn.net/v/t39.30808-6/473222897_2949247435225543_2093783961168903909_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=EKyiYvLCx5sQ7kNvwEPunsU&_nc_oc=AdloUkWBqbvrfZYioxJh_7-kqIdIFITPAEGw5G5lW9_O7Hm6vxi-MhO8eQtTfzJ1xQo&_nc_zt=23&_nc_ht=scontent.fpnq2-1.fna&_nc_gid=mWWNwYT11jxEloscV3PSXA&oh=00_AfFbNmg4W3jpAYK4w_lfnu2yFYB_ddd7apbHZk-ACALVAw&oe=68001DC1'}
        />
        {!collapsed && <span className="profile-text">{user.name}</span>}
        <span className={`dropdown-arrow ${showDropdown ? 'rotate' : ''}`}>▾</span>
      </>
    )}
  </div>

  <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
    <Link to="#" className="dropdown-item" aria-label="Profile">
      <FaUserCircle /> {!collapsed && <span className="label">Profile</span>}
    </Link>
    <Link to="#" className="dropdown-item" aria-label="Settings">
      <FaCog /> {!collapsed && <span className="label">Settings</span>}
    </Link>
    <Link to="#" className="dropdown-item" aria-label="Logout">
      <FaSignOutAlt /> {!collapsed && <span className="label">Logout</span>}
    </Link>
  </div>
</div>

    </div>
  );
};

export default Sidebar;
