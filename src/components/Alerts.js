import React from 'react';
import './Alerts.css';

const alertsData = [
  { id: 1, type: 'Emergency', message: 'Immediate assistance required at location XYZ', timestamp: '2024-07-29 10:00' },
  { id: 2, type: 'Notice', message: 'Routine patrol scheduled for 2024-07-30', timestamp: '2024-07-29 09:00' },
  // Add more alerts as needed
];

const Alerts = () => {
  return (
    <div className="alerts-container">
      <h2>Alerts</h2>
      <ul className="alerts-list">
        {alertsData.map(alert => (
          <li key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
            <span className="alert-type">{alert.type}</span>
            <span className="alert-message">{alert.message}</span>
            <span className="alert-timestamp">{alert.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
