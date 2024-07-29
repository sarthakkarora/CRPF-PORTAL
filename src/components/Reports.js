import React from 'react';
import './Reports.css';

const reportsData = [
  { id: 1, title: 'Incident Report #001', date: '2024-07-29', status: 'Reviewed' },
  { id: 2, title: 'Routine Check Report', date: '2024-07-28', status: 'Pending' },
  // Add more reports as needed
];

const Reports = () => {
  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report) => (
            <tr key={report.id}>
              <td>{report.title}</td>
              <td>{report.date}</td>
              <td className={`status ${report.status.toLowerCase()}`}>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
