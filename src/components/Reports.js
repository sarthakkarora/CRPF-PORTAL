import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import './Reports.css';

const initialReportsData = [
  {
    id: 1,
    incidentID: 'INC12345',
    severityDate: '2024-07-29',
    status: 'Reviewed',
    type: 'Security',
    location: 'Sector 12, Mumbai',
    reportedBy: 'Inspector Ramesh Kumar',
    actionTaken: 'Increased patrolling',
    outcome: 'Resolved',
    operationName: 'Operation Suraksha',
    operationalUnit: 'Delta Squad',
    personnelInvolved: '5',
    equipmentUsed: 'Patrol Car, Radio',
    timeOfReport: '14:30',
    timeOfIncident: '14:15',
    attachments: 'link-to-document',
    comments: 'No further actions required.',
  },
  {
    id: 2,
    incidentID: 'INC12346',
    severityDate: '2024-07-28',
    status: 'Pending',
    type: 'Routine',
    location: 'Sector 8, Bangalore',
    reportedBy: 'Inspector Priya Sharma',
    actionTaken: 'Routine check completed',
    outcome: 'No issues found',
    operationName: 'Routine Vigil',
    operationalUnit: 'Bravo Team',
    personnelInvolved: '3',
    equipmentUsed: 'Patrol Car',
    timeOfReport: '09:00',
    timeOfIncident: '08:45',
    attachments: 'link-to-document',
    comments: 'Routine operation with no incidents.',
  },
  {
    id: 3,
    incidentID: 'INC12347',
    severityDate: '2024-07-27',
    status: 'Reviewed',
    type: 'Emergency',
    location: 'Sector 15, Delhi',
    reportedBy: 'Inspector Arjun Singh',
    actionTaken: 'Emergency response deployed',
    outcome: 'Mitigated',
    operationName: 'Operation Raksha',
    operationalUnit: 'Charlie Force',
    personnelInvolved: '8',
    equipmentUsed: 'Medical Kit, Ambulance',
    timeOfReport: '16:00',
    timeOfIncident: '15:45',
    attachments: 'link-to-document',
    comments: 'Quick response averted major issues.',
  },
  {
    id: 4,
    incidentID: 'INC12348',
    severityDate: '2024-07-26',
    status: 'Pending',
    type: 'Security',
    location: 'Sector 10, Hyderabad',
    reportedBy: 'Inspector Neha Patel',
    actionTaken: 'Patrol increased in the area',
    outcome: 'Under investigation',
    operationName: 'Operation Suraksha II',
    operationalUnit: 'Eagle Unit',
    personnelInvolved: '6',
    equipmentUsed: 'Surveillance Cameras',
    timeOfReport: '11:00',
    timeOfIncident: '10:30',
    attachments: 'link-to-document',
    comments: 'Monitoring ongoing.',
  },
  {
    id: 5,
    incidentID: 'INC12349',
    severityDate: '2024-07-25',
    status: 'Reviewed',
    type: 'Routine',
    location: 'Sector 5, Chennai',
    reportedBy: 'Inspector Anil Rao',
    actionTaken: 'Inspection completed',
    outcome: 'No issues found',
    operationName: 'Routine Surveillance',
    operationalUnit: 'Echo Division',
    personnelInvolved: '4',
    equipmentUsed: 'Inspection Tools',
    timeOfReport: '13:00',
    timeOfIncident: '12:50',
    attachments: 'link-to-document',
    comments: 'All routine checks completed successfully.',
  },
  {
    id: 6,
    incidentID: 'INC12350',
    severityDate: '2024-07-24',
    status: 'Reviewed',
    type: 'Emergency',
    location: 'Sector 7, Kolkata',
    reportedBy: 'Inspector Deepak Mehta',
    actionTaken: 'Immediate intervention',
    outcome: 'Resolved',
    operationName: 'Operation Tejas',
    operationalUnit: 'Foxtrot Brigade',
    personnelInvolved: '7',
    equipmentUsed: 'Fire Extinguishers',
    timeOfReport: '18:00',
    timeOfIncident: '17:30',
    attachments: 'link-to-document',
    comments: 'Effective response managed the emergency.',
  },
  {
    id: 7,
    incidentID: 'INC12351',
    severityDate: '2024-07-23',
    status: 'Pending',
    type: 'Routine',
    location: 'Sector 6, Pune',
    reportedBy: 'Inspector Meera Joshi',
    actionTaken: 'Scheduled check',
    outcome: 'Pending review',
    operationName: 'Maintenance Check',
    operationalUnit: 'Golf Team',
    personnelInvolved: '2',
    equipmentUsed: 'Maintenance Tools',
    timeOfReport: '10:00',
    timeOfIncident: '09:45',
    attachments: 'link-to-document',
    comments: 'Maintenance in progress.',
  },
  {
    id: 8,
    incidentID: 'INC12352',
    severityDate: '2024-07-22',
    status: 'Reviewed',
    type: 'Security',
    location: 'Sector 3, Jaipur',
    reportedBy: 'Inspector Sunita Kumar',
    actionTaken: 'Increased security patrols',
    outcome: 'Resolved',
    operationName: 'Operation Shakti',
    operationalUnit: 'Hotel Squad',
    personnelInvolved: '5',
    equipmentUsed: 'Patrol Car',
    timeOfReport: '12:00',
    timeOfIncident: '11:30',
    attachments: 'link-to-document',
    comments: 'Security measures successfully implemented.',
  },
  {
    id: 9,
    incidentID: 'INC12353',
    severityDate: '2024-07-21',
    status: 'Reviewed',
    type: 'Emergency',
    location: 'Sector 2, Ahmedabad',
    reportedBy: 'Inspector Rajesh Patel',
    actionTaken: 'Emergency protocol initiated',
    outcome: 'Resolved',
    operationName: 'Operation Vayu',
    operationalUnit: 'India Team',
    personnelInvolved: '9',
    equipmentUsed: 'Rescue Gear',
    timeOfReport: '15:00',
    timeOfIncident: '14:45',
    attachments: 'link-to-document',
    comments: 'Rescue mission completed successfully.',
  },
  {
    id: 10,
    incidentID: 'INC12354',
    severityDate: '2024-07-20',
    status: 'Pending',
    type: 'Security',
    location: 'Sector 1, Lucknow',
    reportedBy: 'Inspector Aarti Singh',
    actionTaken: 'Investigation underway',
    outcome: 'Under investigation',
    operationName: 'Operation Vishal',
    operationalUnit: 'Juliet Squad',
    personnelInvolved: '4',
    equipmentUsed: 'Surveillance Equipment',
    timeOfReport: '17:00',
    timeOfIncident: '16:30',
    attachments: 'link-to-document',
    comments: 'Further investigation required.',
  },
  {
    id: 11,
    incidentID: 'INC12355',
    severityDate: '2024-07-19',
    status: 'Reviewed',
    type: 'Routine',
    location: 'Sector 4, Surat',
    reportedBy: 'Inspector Neelam Agarwal',
    actionTaken: 'Routine inspection',
    outcome: 'No anomalies',
    operationName: 'Operation Samarth',
    operationalUnit: 'Kilo Team',
    personnelInvolved: '3',
    equipmentUsed: 'Surveillance Cameras',
    timeOfReport: '08:00',
    timeOfIncident: '07:50',
    attachments: 'link-to-document',
    comments: 'All systems operational.',
  },
  {
    id: 12,
    incidentID: 'INC12356',
    severityDate: '2024-07-18',
    status: 'Reviewed',
    type: 'Emergency',
    location: 'Sector 9, Kanpur',
    reportedBy: 'Inspector Ankit Sharma',
    actionTaken: 'Rescue operation executed',
    outcome: 'Resolved',
    operationName: 'Operation Jwala',
    operationalUnit: 'Lima Team',
    personnelInvolved: '6',
    equipmentUsed: 'Rescue Equipment',
    timeOfReport: '19:00',
    timeOfIncident: '18:30',
    attachments: 'link-to-document',
    comments: 'Emergency situation handled effectively.',
  },
  {
    id: 13,
    incidentID: 'INC12357',
    severityDate: '2024-07-17',
    status: 'Pending',
    type: 'Routine',
    location: 'Sector 11, Bhopal',
    reportedBy: 'Inspector Kiran Desai',
    actionTaken: 'Scheduled maintenance',
    outcome: 'Pending review',
    operationName: 'Maintenance Check',
    operationalUnit: 'Mike Squad',
    personnelInvolved: '2',
    equipmentUsed: 'Maintenance Tools',
    timeOfReport: '13:00',
    timeOfIncident: '12:45',
    attachments: 'link-to-document',
    comments: 'Pending further review.',
  },
  {
    id: 14,
    incidentID: 'INC12358',
    severityDate: '2024-07-16',
    status: 'Reviewed',
    type: 'Security',
    location: 'Sector 14, Patna',
    reportedBy: 'Inspector Geeta Mehta',
    actionTaken: 'Enhanced security measures',
    outcome: 'Resolved',
    operationName: 'Operation Shakti II',
    operationalUnit: 'November Team',
    personnelInvolved: '7',
    equipmentUsed: 'Patrol Car, CCTV',
    timeOfReport: '20:00',
    timeOfIncident: '19:30',
    attachments: 'link-to-document',
    comments: 'Security situation managed effectively.',
  },
  {
    id: 15,
    incidentID: 'INC12359',
    severityDate: '2024-07-15',
    status: 'Reviewed',
    type: 'Emergency',
    location: 'Sector 13, Jaipur',
    reportedBy: 'Inspector Rajni Kumari',
    actionTaken: 'Emergency response activated',
    outcome: 'Resolved',
    operationName: 'Operation Phoenix',
    operationalUnit: 'Oscar Squad',
    personnelInvolved: '8',
    equipmentUsed: 'Fire Extinguishers, Rescue Gear',
    timeOfReport: '21:00',
    timeOfIncident: '20:30',
    attachments: 'link-to-document',
    comments: 'Emergency handled with efficiency.',
  },
];

const Reports = () => {
  const [reportsData, setReportsData] = useState(initialReportsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('incidentID');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isAdding, setIsAdding] = useState(false);
  const [editReport, setEditReport] = useState(null);
  const [newReport, setNewReport] = useState({
    incidentID: '',
    severityDate: '',
    status: '',
    type: '',
    location: '',
    reportedBy: '',
    actionTaken: '',
    outcome: '',
    operationName: '',
    operationalUnit: '',
    personnelInvolved: '',
    equipmentUsed: '',
    timeOfReport: '',
    timeOfIncident: '',
    attachments: '',
    comments: '',
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reports');
    XLSX.writeFile(wb, 'reports.xlsx');
  };

  const filteredReports = reportsData.filter((report) =>
    Object.values(report).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedReports = filteredReports.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleAddReport = () => {
    setReportsData([...reportsData, { ...newReport, id: reportsData.length + 1 }]);
    setNewReport({
      incidentID: '',
      severityDate: '',
      status: '',
      type: '',
      location: '',
      reportedBy: '',
      actionTaken: '',
      outcome: '',
      operationName: '',
      operationalUnit: '',
      personnelInvolved: '',
      equipmentUsed: '',
      timeOfReport: '',
      timeOfIncident: '',
      attachments: '',
      comments: '',
    });
    setIsAdding(false);
  };

  const handleEditReport = (report) => setEditReport(report);

  const handleSaveEdit = () => {
    setReportsData(
      reportsData.map((report) => (report.id === editReport.id ? editReport : report))
    );
    setEditReport(null);
  };

  const handleDeleteReport = (id) => setReportsData(reportsData.filter((report) => report.id !== id));

  const handleChange = (e) => setNewReport({ ...newReport, [e.target.name]: e.target.value });

  const handleEditChange = (e) => setEditReport({ ...editReport, [e.target.name]: e.target.value });

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      <div className="search-export-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button onClick={handleExportExcel} className="export-button">Export to Excel</button>
        <CSVLink data={reportsData} filename="reports.csv" className="export-button">
          Export to CSV
        </CSVLink>
      </div>
      <div className="add-edit-container">
        <button onClick={() => setIsAdding(true)} className="add-button">Add Report</button>
        {isAdding && (
          <ReportForm
            report={newReport}
            handleChange={handleChange}
            handleSubmit={handleAddReport}
            handleCancel={() => setIsAdding(false)}
            isEdit={false}
          />
        )}
        {editReport && (
          <ReportForm
            report={editReport}
            handleChange={handleEditChange}
            handleSubmit={handleSaveEdit}
            handleCancel={() => setEditReport(null)}
            isEdit={true}
          />
        )}
      </div>
      <table className="reports-table">
        <thead>
          <tr>
            {[
              'incidentID',
              'severityDate',
              'status',
              'type',
              'location',
              'reportedBy',
              'actionTaken',
              'outcome',
              'operationName',
              'operationalUnit',
              'personnelInvolved',
              'equipmentUsed',
              'timeOfReport',
              'timeOfIncident',
              'attachments',
              'comments',
            ].map((header) => (
              <th key={header} onClick={() => handleSort(header)}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
                {sortField === header && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.map((report) => (
            <ReportRow
              key={report.id}
              report={report}
              handleEdit={handleEditReport}
              handleDelete={handleDeleteReport}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReportForm = ({ report, handleChange, handleSubmit, handleCancel, isEdit }) => {
  return (
    <div className="form-container">
      <h3>{isEdit ? 'Edit Report' : 'Add New Report'}</h3>
      <input type="text" name="incidentID" value={report.incidentID} onChange={handleChange} placeholder="Incident ID" />
      <input type="date" name="severityDate" value={report.severityDate} onChange={handleChange} />
      <input type="text" name="status" value={report.status} onChange={handleChange} placeholder="Status" />
      <input type="text" name="type" value={report.type} onChange={handleChange} placeholder="Type" />
      <input type="text" name="location" value={report.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="reportedBy" value={report.reportedBy} onChange={handleChange} placeholder="Reported By" />
      <input type="text" name="actionTaken" value={report.actionTaken} onChange={handleChange} placeholder="Action Taken" />
      <input type="text" name="outcome" value={report.outcome} onChange={handleChange} placeholder="Outcome" />
      <input type="text" name="operationName" value={report.operationName} onChange={handleChange} placeholder="Operation Name" />
      <input type="text" name="operationalUnit" value={report.operationalUnit} onChange={handleChange} placeholder="Operational Unit" />
      <input type="number" name="personnelInvolved" value={report.personnelInvolved} onChange={handleChange} placeholder="Personnel Involved" />
      <input type="text" name="equipmentUsed" value={report.equipmentUsed} onChange={handleChange} placeholder="Equipment Used" />
      <input type="time" name="timeOfReport" value={report.timeOfReport} onChange={handleChange} />
      <input type="time" name="timeOfIncident" value={report.timeOfIncident} onChange={handleChange} />
      <input type="text" name="attachments" value={report.attachments} onChange={handleChange} placeholder="Attachments" />
      <textarea name="comments" value={report.comments} onChange={handleChange} placeholder="Comments"></textarea>
      <button onClick={handleSubmit} className="save-button">{isEdit ? 'Save Changes' : 'Save'}</button>
      <button onClick={handleCancel} className="cancel-button">Cancel</button>
    </div>
  );
};

const ReportRow = ({ report, handleEdit, handleDelete }) => {

  const rowClass = report.type.toLowerCase() === 'security' ? 'security-row' : 
                   report.type.toLowerCase() === 'emergency' ? 'emergency-row' :
                   report.type.toLowerCase() === 'routine' ? 'routine-row' : '';

  return (
    <tr className={rowClass}> {}
      <td>{report.incidentID}</td>
      <td>{report.severityDate}</td>
      <td className={`status ${report.status.toLowerCase()}`}>{report.status}</td>
      <td>{report.type}</td>
      <td>{report.location}</td>
      <td>{report.reportedBy}</td>
      <td>{report.actionTaken}</td>
      <td className={`outcome ${report.outcome.toLowerCase()}`}>{report.outcome}</td>
      <td>{report.operationName}</td>
      <td>{report.operationalUnit}</td>
      <td>{report.personnelInvolved}</td>
      <td>{report.equipmentUsed}</td>
      <td>{report.timeOfReport}</td>
      <td>{report.timeOfIncident}</td>
      <td>
        <a href={report.attachments} target="_blank" rel="noopener noreferrer" className="view-link">
          View
        </a>
      </td>
      <td>{report.comments}</td>
      <td>
        <button onClick={() => handleEdit(report)} className="edit-button">Edit</button>
        <button onClick={() => handleDelete(report.id)} className="delete-button">Delete</button>
      </td>
    </tr>
  );
};


export default Reports;
