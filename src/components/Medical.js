import React, { useState } from 'react';
import './Medical.css';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';

const initialRecords = [
  { id: 1, name: 'Amit Kumar', age: 45, bloodGroup: 'B+', height: '5.7', weight: '85', medications: 'Metformin', medicalHistory: 'Hypertension', lastVisit: '2023-07-15', emergencyContact: 'Sunita Kumar', primaryCarePhysician: 'Dr. Rajesh Verma' },
  { id: 2, name: 'Priya Singh', age: 29, bloodGroup: 'A-', height: '5.4', weight: '60', medications: 'None', medicalHistory: 'Asthma', lastVisit: '2023-07-18', emergencyContact: 'Ravi Singh', primaryCarePhysician: 'Dr. Neha Gupta' },
  { id: 3, name: 'Rahul Sharma', age: 52, bloodGroup: 'AB+', height: '5.6', weight: '75', medications: 'Aspirin', medicalHistory: 'High Cholesterol', lastVisit: '2023-07-10', emergencyContact: 'Anita Sharma', primaryCarePhysician: 'Dr. Suresh Menon' },
  { id: 4, name: 'Anjali Patel', age: 34, bloodGroup: 'O-', height: '5.5', weight: '65', medications: 'None', medicalHistory: 'None', lastVisit: '2023-07-20', emergencyContact: 'Vikas Patel', primaryCarePhysician: 'Dr. Lakshmi Nair' },
  { id: 5, name: 'Rohit Joshi', age: 40, bloodGroup: 'B-', height: '5.8', weight: '78', medications: 'Amlodipine', medicalHistory: 'Kidney Stones', lastVisit: '2023-07-17', emergencyContact: 'Seema Joshi', primaryCarePhysician: 'Dr. Anand Deshmukh' },
  { id: 6, name: 'Sonal Mehta', age: 38, bloodGroup: 'A+', height: '5.6', weight: '62', medications: 'None', medicalHistory: 'None', lastVisit: '2023-07-22', emergencyContact: 'Arun Mehta', primaryCarePhysician: 'Dr. Kavita Rao' },
  { id: 7, name: 'Vikram Reddy', age: 55, bloodGroup: 'O+', height: '5.9', weight: '80', medications: 'Ibuprofen', medicalHistory: 'Gout', lastVisit: '2023-07-13', emergencyContact: 'Rama Reddy', primaryCarePhysician: 'Dr. Sudhir Reddy' },
  { id: 8, name: 'Meena Rao', age: 31, bloodGroup: 'AB-', height: '5.3', weight: '55', medications: 'None', medicalHistory: 'None', lastVisit: '2023-07-19', emergencyContact: 'Amit Rao', primaryCarePhysician: 'Dr. Anjali Gupta' },
  { id: 9, name: 'Suresh Iyer', age: 60, bloodGroup: 'B+', height: '5.7', weight: '82', medications: 'Insulin', medicalHistory: 'Heart Surgery', lastVisit: '2023-07-16', emergencyContact: 'Lata Iyer', primaryCarePhysician: 'Dr. Karthik Iyer' },
  { id: 10, name: 'Kavita Shah', age: 27, bloodGroup: 'A-', height: '5.4', weight: '58', medications: 'None', medicalHistory: 'None', lastVisit: '2023-07-21', emergencyContact: 'Rajesh Shah', primaryCarePhysician: 'Dr. Priya Mehta' },
  { id: 11, name: 'Arjun Kapoor', age: 48, bloodGroup: 'O+', height: '5.9', weight: '85', medications: 'Losartan', medicalHistory: 'Kidney Disease', lastVisit: '2023-07-14', emergencyContact: 'Rekha Kapoor', primaryCarePhysician: 'Dr. Nitin Malhotra' },
  { id: 12, name: 'Neha Desai', age: 36, bloodGroup: 'B-', height: '5.5', weight: '64', medications: 'None', medicalHistory: 'None', lastVisit: '2023-07-12', emergencyContact: 'Sandeep Desai', primaryCarePhysician: 'Dr. Sunita Sharma' },
  { id: 13, name: 'Manoj Gupta', age: 50, bloodGroup: 'AB+', height: '5.6', weight: '78', medications: 'Metformin', medicalHistory: 'Eye Surgery', lastVisit: '2023-07-11', emergencyContact: 'Kiran Gupta', primaryCarePhysician: 'Dr. Pradeep Saxena' },
  { id: 14, name: 'Lakshmi Pillai', age: 33, bloodGroup: 'A+', height: '5.6', weight: '60', medications: 'None', medicalHistory: 'None', lastVisit: '2023-07-23', emergencyContact: 'Hari Pillai', primaryCarePhysician: 'Dr. Renu Menon' },
  { id: 15, name: 'Sanjay Bhatt', age: 42, bloodGroup: 'O-', height: '5.8', weight: '80', medications: 'Amlodipine', medicalHistory: 'None', lastVisit: '2023-07-09', emergencyContact: 'Rita Bhatt', primaryCarePhysician: 'Dr. Arvind Patel' }
];

const MedicalRecordsPage = () => {
  const [records, setRecords] = useState(initialRecords);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      age: '',
      bloodGroup: '',
      height: '',
      weight: '',
      medications: '',
      medicalHistory: '',
      lastVisit: '',
      emergencyContact: '',
      primaryCarePhysician: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleAddRecord = () => {
      if (editingIndex !== null) {
          const updatedRecords = [...records];
          updatedRecords[editingIndex] = formData;
          setRecords(updatedRecords);
          setEditingIndex(null);
      } else {
          setRecords([...records, formData]);
      }
      setFormData({
          name: '',
          age: '',
          bloodGroup: '',
          height: '',
          weight: '',
          medications: '',
          medicalHistory: '',
          lastVisit: '',
          emergencyContact: '',
          primaryCarePhysician: ''
      });
      setShowForm(false);
  };

  const handleEditRecord = (index) => {
      setFormData(records[index]);
      setEditingIndex(index);
      setShowForm(true);
  };

  const handleDeleteRecord = (index) => {
      setRecords(records.filter((_, i) => i !== index));
  };

  const handleExportCSV = () => {
      const csvRows = [];
      const headers = ['Name', 'Age', 'Blood Group', 'Height', 'Weight', 'Medications', 'Medical History', 'Last Visit', 'Emergency Contact', 'Primary Care Physician'];
      csvRows.push(headers.join(','));

      records.forEach(record => {
          const values = headers.map(header => record[header.toLowerCase().replace(/\s/g, '')] || '');
          csvRows.push(values.join(','));
      });

      const csvBlob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'medical_records.csv';
      link.click();
  };

  const handleExportExcel = () => {
      const ws = XLSX.utils.json_to_sheet(records);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Records');
      XLSX.writeFile(wb, 'medical_records.xlsx');
  };

  const handleSearch = (e) => {
      setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredRecords = records.filter(record =>
      Object.values(record).some(val =>
          val.toString().toLowerCase().includes(searchQuery)
      )
  );

  return (
      <div className="medical-records-container">
          <h2>Medical Records</h2>
          <div className="actions">
          <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
              />
              <button onClick={() => setShowForm(!showForm)}>
                  {showForm ? 'Cancel' : (editingIndex !== null ? 'Update Record' : 'Add New Record')}
              </button>
              <button onClick={handleExportCSV}>Convert to CSV</button>
              <button onClick={handleExportExcel}>Convert to Excel</button>
             
          </div>
          {showForm && (
              <div className="form">
                  <h3>{editingIndex !== null ? 'Edit Record' : 'Add New Record'}</h3>
                  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                  <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                  <input type="text" name="bloodGroup" placeholder="Blood Group" value={formData.bloodGroup} onChange={handleChange} />
                  <input type="text" name="height" placeholder="Height" value={formData.height} onChange={handleChange} />
                  <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
                  <input type="text" name="medications" placeholder="Medications" value={formData.medications} onChange={handleChange} />
                  <input type="text" name="medicalHistory" placeholder="Medical History" value={formData.medicalHistory} onChange={handleChange} />
                  <input type="date" name="lastVisit" placeholder="Last Visit" value={formData.lastVisit} onChange={handleChange} />
                  <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
                  <input type="text" name="primaryCarePhysician" placeholder="Primary Care Physician" value={formData.primaryCarePhysician} onChange={handleChange} />
                  <button onClick={handleAddRecord}>
                      {editingIndex !== null ? 'Update Record' : 'Add Record'}
                  </button>
              </div>
          )}
          <table className="medical-records-table">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Blood Group</th>
                      <th>Height</th>
                      <th>Weight</th>
                      <th>Medications</th>
                      <th>Medical History</th>
                      <th>Last Visit</th>
                      <th>Emergency Contact</th>
                      <th>Primary Care Physician</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredRecords.map((record, index) => (
                      <tr key={index}>
                          <td>{record.name}</td>
                          <td>{record.age}</td>
                          <td>{record.bloodGroup}</td>
                          <td>{record.height}</td>
                          <td>{record.weight}</td>
                          <td>{record.medications}</td>
                          <td>{record.medicalHistory}</td>
                          <td>{record.lastVisit}</td>
                          <td>{record.emergencyContact}</td>
                          <td>{record.primaryCarePhysician}</td>
                          <td>
                              <button onClick={() => handleEditRecord(index)}>Edit</button>
                              <button onClick={() => handleDeleteRecord(index)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
};

export default MedicalRecordsPage;