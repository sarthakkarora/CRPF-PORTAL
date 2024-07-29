import React from 'react';
import './Dashboard.css';
import Alerts from './Alerts';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-overview">
        <div className="overview-card">
          <h3>Active Personnel</h3>
          <p>120</p>
        </div>
        <div className="overview-card">
          <h3>Pending Tasks</h3>
          <p>5</p>
        </div>
        <div className="overview-card">
          <h3>Recent Incidents</h3>
          <p>3</p>
        </div>
      </div>
      <Alerts />
    </div>
  );
};

export default Dashboard;
