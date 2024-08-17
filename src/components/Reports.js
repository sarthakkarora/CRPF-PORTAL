import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './ReportsPage.css';

const initialData = [
  { ID: '001', Date: '2024-08-15', Status: 'Resolved', Type: 'Fire', LOC: 'Sector 12, Delhi', Reporter: 'Ravi Kumar', Action: 'Evacuated Building', Outcome: 'No Injuries', Unit: 'Delhi Fire Brigade', Personnels: '6', Equipments: 'Fire Extinguishers', Comments: 'All clear' },
  { ID: '002', Date: '2024-08-16', Status: 'Pending', Type: 'Flood', LOC: 'Kolkata, West Bengal', Reporter: 'Anjali Sharma', Action: 'Conducted Rescue Operations', Outcome: '2 Injuries', Unit: 'Kolkata Rescue Team', Personnels: '8', Equipments: 'Rescue Boats', Comments: 'Partial success' },
  { ID: '003', Date: '2024-08-17', Status: 'Resolved', Type: 'Earthquake', LOC: 'Guwahati, Assam', Reporter: 'Vikram Singh', Action: 'Distributed Relief Materials', Outcome: 'No Casualties', Unit: 'Assam Relief Squad', Personnels: '5', Equipments: 'Relief Kits', Comments: 'Efficient Response' },
  { ID: '004', Date: '2024-08-18', Status: 'Resolved', Type: 'Terrorist Attack', LOC: 'Srinagar, Jammu & Kashmir', Reporter: 'Aarti Patel', Action: 'Secured Area', Outcome: '1 Casualty', Unit: 'J&K Security Forces', Personnels: '10', Equipments: 'Security Gear', Comments: 'Situation under control' },
  { ID: '005', Date: '2024-08-19', Status: 'Ongoing', Type: 'Road Accident', LOC: 'Mumbai, Maharashtra', Reporter: 'Amit Joshi', Action: 'Provided First Aid', Outcome: '3 Injuries', Unit: 'Mumbai Ambulance Service', Personnels: '4', Equipments: 'First Aid Kits', Comments: 'Emergency care provided' },
  { ID: '006', Date: '2024-08-20', Status: 'Resolved', Type: 'Cyclone', LOC: 'Chennai, Tamil Nadu', Reporter: 'Sita Rani', Action: 'Evacuated Coastal Areas', Outcome: 'No Injuries', Unit: 'TN Disaster Management', Personnels: '7', Equipments: 'Evacuation Vehicles', Comments: 'Operation successful' },
   ];


const ReportsPage = () => {
    const [reports, setReports] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [currentReport, setCurrentReport] = useState({});
    const [showForm, setShowForm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentReport({
            ...currentReport,
            [name]: value,
        });
    };

    const handleAdd = () => {
        setReports([...reports, currentReport]);
        setCurrentReport({});
        setShowForm(false); // Hide form after adding record
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setCurrentReport(reports[index]);
        setShowForm(true); // Show form when editing a record
    };

    const handleUpdate = () => {
        const updatedReports = reports.map((report, index) =>
            index === editIndex ? currentReport : report
        );
        setReports(updatedReports);
        setEditIndex(null);
        setCurrentReport({});
        setShowForm(false); // Hide form after updating record
    };

    const handleDelete = (index) => {
        const updatedReports = reports.filter((_, i) => i !== index);
        setReports(updatedReports);
    };

    const handleExportCSV = () => {
        const csvContent = [
            ["ID", "Date", "Status", "Type", "LOC", "Reporter", "Action", "Outcome", "Unit", "Personnels", "Equipments"],
            ...reports.map(report => [
                report.ID, report.Date, report.Status, report.Type, report.LOC, report.Reporter, report.Action, report.Outcome, report.Unit, report.Personnels, report.Equipments
            ])
        ]
        .map(e => e.join(","))
        .join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = 'reports.csv';
        link.click();
    };

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(reports);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reports");
        XLSX.writeFile(wb, "reports.xlsx");
    };

    const filteredReports = reports.filter(report =>
        Object.values(report).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const toggleForm = () => {
        setShowForm(prevState => !prevState);
        setCurrentReport({});
        setEditIndex(null);
    };

    return (
        <div className="reports-container">
            <h2> Reports</h2>
            <div className="actions">
                <button onClick={toggleForm} className="add-btn">
                    {showForm ? 'Cancel' : 'Add New Record'}
                </button>
                <button onClick={handleExportCSV} className="export-btn">Export CSV</button>
                <button onClick={handleExportExcel} className="export-btn">Export Excel</button>
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={`form ${showForm ? '' : 'hidden'}`}>
                <input
                    type="text"
                    name="ID"
                    placeholder="ID"
                    value={currentReport.ID || ''}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="Date"
                    placeholder="Date"
                    value={currentReport.Date || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Status"
                    placeholder="Status"
                    value={currentReport.Status || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Type"
                    placeholder="Type"
                    value={currentReport.Type || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="LOC"
                    placeholder="LOC"
                    value={currentReport.LOC || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Reporter"
                    placeholder="Reported By"
                    value={currentReport.Reporter || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Action"
                    placeholder="Action Taken"
                    value={currentReport.Action || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Outcome"
                    placeholder="Outcome"
                    value={currentReport.Outcome || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Unit"
                    placeholder="Operational Unit"
                    value={currentReport.Unit || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Personnels"
                    placeholder="Personnel Involved"
                    value={currentReport.Personnels || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="Equipments"
                    placeholder="Equipment Used"
                    value={currentReport.Equipments || ''}
                    onChange={handleChange}
                />
               
                {editIndex !== null ? (
                    <button onClick={handleUpdate} className="update-btn">Update Record</button>
                ) : (
                    <button onClick={handleAdd} className="add-btn">Add Record</button>
                )}
            </div>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>LOC</th>
                        <th>Reporter</th>
                        <th>Action</th>
                        <th>Outcome</th>
                        <th>Unit</th>
                        <th>Personnels</th>
                        <th>Equipments</th>
                       
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.ID}</td>
                            <td>{report.Date}</td>
                            <td>{report.Status}</td>
                            <td>{report.Type}</td>
                            <td>{report.LOC}</td>
                            <td>{report.Reporter}</td>
                            <td>{report.Action}</td>
                            <td>{report.Outcome}</td>
                            <td>{report.Unit}</td>
                            <td>{report.Personnels}</td>
                            <td>{report.Equipments}</td>
                           
                            <td>
                                <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsPage;
