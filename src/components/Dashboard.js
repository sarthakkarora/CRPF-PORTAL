import React, { useState, useEffect } from 'react'; // Added useEffect import
import './Dashboard.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const OperationsMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([28.6139, 77.2090], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([28.6139, 77.2090]).addTo(map)
      .bindPopup('Operation Shakti')
      .openPopup();
  }, []);

  return <div id="map" style={{ height: '400px' }}></div>; // Ensure the map div is returned
};

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
      <a href="https://crpf.gov.in" className="logo-title" target="_blank" rel="noopener noreferrer">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/f/f9/CRPF_Logo.svg"
    alt="CRPF Logo"
  />
  <h1>CRPF Dashboard</h1>
</a>

        <div className="user-profile">
          
          <span>Welcome, Major Shreejesh</span>
          <div className="dropdown" onClick={toggleDropdown}>
          </div>
          <button 
  className="notification-btn" 
  onClick={() => window.location.href = '/alerts'}
>
  🔔
</button>

        </div>
      </header>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="card">
          <h2>Personnel Deployed</h2>
          <p>1,245</p>
          <div className="card-icon"> 👮‍♂️</div>
        </div>
        <div className="card">
          <h2>Active Operations</h2>
          <p>32</p>
          <div className="card-icon"> 🚔</div>
        </div>
        <div className="card">
          <h2>Incident Reports</h2>
          <p>87</p>
          <div className="card-icon"> 📝</div>
        </div>
        <div className="card">
          <h2>Equipment Status</h2>
          <p> 70% Unused</p>
          <div className="card-icon"> 📦</div>
        </div>
      </div>

      {/* Recent Activities & Alerts */}
      <div className="recent-activities">
        <div className="activities">
          <h3>Recent Activities</h3>
          <ul>
            <li><span className="activity-dot"></span>Operation Vanguard initiated in Sector 3</li>
            <li><span className="activity-dot"></span>Incident report filed: Fire at Depot 7</li>
            <li><span className="activity-dot"></span>Training session completed: Urban Warfare</li>
          </ul>
        </div>
        <div className="alerts">
          <h3>Urgent Alerts</h3>
          <ul>
            <li><span className="alert-dot"></span>Equipment shortage in Unit 12</li>
            <li><span className="alert-dot"></span>Security breach detected in Zone 4</li>
            <li><span className="alert-dot"></span>Evacuation drill scheduled for tomorrow</li>
          </ul>
        </div>
      </div>

      {/* Operations Map */}
      <div className="operations-map">
        <h3>Operations Map</h3>
        <OperationsMap />
      </div>

      {/* Enhanced Quick Actions */}
      <div className="quick-actions">
        <button 
          className="action-btn primary" 
          onClick={() => window.location.href = '/reports'}
        >
          <span className="action-icon">➕</span>
          <span className="action-text">Add Incident Report</span>
         
        </button>
        <button 
          className="action-btn secondary" 
          onClick={() => window.location.href = '/medical'}
        >
          <span className="action-icon">🏥</span>
          <span className="action-text">Medical Support</span>
       
        </button>
        <button 
          className="action-btn tertiary" 
          onClick={() => window.location.href = '/inventory'}
        >
          <span className="action-icon">📦</span>
          <span className="action-text">Request Equipment</span>
        
        </button>
        <button 
          className="action-btn quaternary" 
          onClick={() => window.location.href = '/reports'}
        >
          <span className="action-icon">📄</span>
          <span className="action-text">View All Reports</span>
       
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events">
        <h3>Upcoming Events</h3>
        <ul>
          <li><span className="event-dot"></span>Urban Warfare Training - 2024-08-20</li>
          <li><span className="event-dot"></span>Annual Equipment Inspection - 2024-08-25</li>
          <li><span className="event-dot"></span>Meeting with State Officials - 2024-08-30</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-content">
    {/* CRPF Headquarters Section */}
    <div className="footer-section">
      <h4>CRPF Headquarters</h4>
      <div className="contact-info">
        <p>New Delhi, India</p>
        <p>Contact: +91 1122334455</p>
        <p>Emergency: 100</p>
        <p>Email: <a href="mailto:headquarters@crpf.gov.in">headquarters@crpf.gov.in</a></p>
      </div>
    </div>

    {/* Quick Links Section */}
    <div className="footer-section">
      <h4>Quick Links</h4>
      <div className="footer-links">
        <a href="https://crpf.gov.in/">About Us</a>
        <a href="https://crpf.gov.in/E-Service-Book">Services</a>
        <a href="https://crpf.gov.in/welfare-Activities">Resources</a>
        <a href="https://crpf.gov.in/Contact-Us/Helpline-Numbers">Help Center</a>
        <a href="https://crpf.gov.in/Privacy-Policy">Privacy Policy</a>
        <a href="https://crpf.gov.in/Terms-&-Conditions">Terms of Service</a>
      </div>
    </div>

    {/* Related Services Section */}
    <div className="footer-section">
      <h4>Related Services</h4>
      <div className="footer-links">
        <a href="https://www.india.gov.in/">National Portal of India</a>
        <a href="https://www.mha.gov.in/">Ministry of Home Affairs</a>
        <a href="https://pgportal.gov.in/">Public Grievances Portal</a>
        <a href="https://www.nidm.gov.in/">Disaster Management (NIDM)</a>
        <a href="https://digitalindia.gov.in/">Digital India Initiative</a>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="footer-bottom">
    <p>© 2024 CRPF. All rights reserved.</p>
    <div className="footer-bottom-links">
      <a href="https://crpf.gov.in/Sitemap">Sitemap</a>
      <a href="https://crpf.gov.in/Accessibility-Statement">Accessibility</a>
      <a href="https://crpf.gov.in/Feedback">Feedback</a>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Dashboard;
