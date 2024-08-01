import React, { useState } from 'react';
import './Alerts.css';

const alertsData = [
  { id: 1, type: 'Emergency', message: 'Immediate assistance required at location XYZ', timestamp: '2024-07-29 10:00' },
  { id: 2, type: 'Notice', message: 'Routine patrol scheduled for 2024-07-30', timestamp: '2024-07-29 09:00' },
  { id: 3, type: 'Update', message: 'New security protocols implemented', timestamp: '2024-07-28 14:00' },
  { id: 4, type: 'Information', message: 'Training session on 2024-08-01', timestamp: '2024-07-27 12:00' },
  { id: 5, type: 'Emergency', message: 'Urgent medical evacuation needed', timestamp: '2024-07-26 18:00' },
  { id: 6, type: 'Notice', message: 'Maintenance work scheduled for 2024-08-02', timestamp: '2024-07-25 10:00' },
  { id: 7, type: 'Update', message: 'New base camp established at location ABC', timestamp: '2024-07-24 15:00' },
  { id: 8, type: 'Information', message: 'New equipment arrived at depot XYZ', timestamp: '2024-07-23 09:00' },
  { id: 9, type: 'Emergency', message: 'Rescue operation underway at site DEF', timestamp: '2024-07-22 13:00' },
  { id: 10, type: 'Notice', message: 'Upcoming drill on 2024-08-03', timestamp: '2024-07-21 11:00' },
  { id: 11, type: 'Update', message: 'Protocol review completed', timestamp: '2024-07-20 16:00' },
  { id: 12, type: 'Information', message: 'New software update available', timestamp: '2024-07-19 08:00' },
  { id: 13, type: 'Emergency', message: 'Critical situation in region GHI', timestamp: '2024-07-18 14:00' },
  { id: 14, type: 'Notice', message: 'New policy guidelines issued', timestamp: '2024-07-17 10:00' },
  { id: 15, type: 'Update', message: 'New uniforms distributed', timestamp: '2024-07-16 12:00' },
  { id: 16, type: 'Information', message: 'Operational briefing scheduled', timestamp: '2024-07-15 09:00' },
  { id: 17, type: 'Emergency', message: 'Immediate response needed at location JKL', timestamp: '2024-07-14 15:00' },
  { id: 18, type: 'Notice', message: 'Safety drills planned for next week', timestamp: '2024-07-13 11:00' },
  { id: 19, type: 'Update', message: 'New tactical training module released', timestamp: '2024-07-12 13:00' },
  { id: 20, type: 'Information', message: 'Operational status report available', timestamp: '2024-07-11 10:00' },
];

const Alerts = () => {
  const [sortOption, setSortOption] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePagination = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next') {
        return prevPage + 1;
      } else if (direction === 'prev' && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  const sortedAlerts = [...alertsData].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortOption === 'oldest') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortOption === 'high-priority') {
      const priority = { 'Emergency': 1, 'Update': 2, 'Notice': 3, 'Information': 4 };
      return priority[a.type] - priority[b.type];
    }
    return 0;
  });

  const filteredAlerts = sortedAlerts.filter(alert =>
    alert.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="alerts-container">
      <h1>Alerts</h1>
      <div className="alerts-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-box"
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
          <option value="high-priority">High Priority</option>
        </select>
      </div>
      <ul className="alerts-list">
        {paginatedAlerts.map(alert => (
          <li key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
            <span className="alert-type">{alert.type}</span>
            <span className="alert-message">{alert.message}</span>
            <span className="alert-timestamp">{alert.timestamp}</span>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          className="prev-button"
          onClick={() => handlePagination('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={() => handlePagination('next')}
          disabled={(currentPage * itemsPerPage) >= filteredAlerts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Alerts;
