import React from 'react';
import './Personnel.css';

const personnelData = [
  { id: 1, name: 'John Doe', rank: 'Lieutenant', status: 'Active' },
  { id: 2, name: 'Jane Smith', rank: 'Captain', status: 'On Leave' },
  // Add more personnel data as needed
];

const Personnel = () => {
  return (
    <div className="personnel-container">
      <h2>Personnel</h2>
      <table className="personnel-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {personnelData.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.rank}</td>
              <td className={`status ${person.status.toLowerCase().replace(' ', '-')}`}>{person.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Personnel;
