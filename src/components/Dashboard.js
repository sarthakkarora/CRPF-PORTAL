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
        <div className="logo-title">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/CRPF_Logo.svg" alt="CRPF Logo" />
          <h1>CRPF Dashboard</h1>
        </div>
        <div className="user-profile">
          
          <span>Welcome, Major Shreejesh</span>
          <div className="dropdown" onClick={toggleDropdown}>
          </div>
          <button 
  className="notification-btn" 
  onClick={() => window.location.href = 'http://localhost:5001/alerts'}
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

      {/* Quick Actions */}
      <div className="quick-actions">
      <button 
  className="action-btn" 
  onClick={() => window.location.href = 'http://localhost:5001/reports'}
>
  ➕ Add Incident Report
</button>
<button 
  className="action-btn" 
  onClick={() => window.location.href = 'http://localhost:5001/medical'}
>
  📅 Medical Support
</button>
<button 
  className="action-btn" 
  onClick={() => window.location.href = 'http://localhost:5001/indent'}
>
  📦 Request Equipment
</button>

<button 
  className="action-btn" 
  onClick={() => window.location.href = 'http://localhost:5001/reports'}
>
  📄 View All Reports
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
        <p>CRPF Headquarters, New Delhi, India</p>
        <p>Contact: +91 1122334455 | Emergency: 100</p>
        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Dashboard;
