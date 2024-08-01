import React, { useState } from 'react';
import './Personnel.css';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';


const exampleData = [
{
    serialNumber: '01',
    opName: 'Operation Rakshak',
    realName: 'Rajesh Kumar',
    rank: 'Commandant',
    status: 'Active',
    missions: '20',
    dutyStation: 'Jammu & Kashmir',
    department: 'Infantry',
    skills: 'Counter-Terrorism, Leadership',
    equipmentIssued: 'Rifle, Binoculars',
    successRate: '92'
  },
  {
    serialNumber: '02',
    opName: 'Operation Cactus',
    realName: 'Amit Singh',
    rank: 'Deputy Commandant',
    status: 'Active',
    missions: '18',
    dutyStation: 'North East India',
    department: 'Mountain Division',
    skills: 'Mountain Warfare, Tactical Planning',
    equipmentIssued: 'Assault Rifle, Climbing Gear',
    successRate: '88'
  },
  {
    serialNumber: '03',
    opName: 'Operation Meghdoot',
    realName: 'Suresh Patil',
    rank: 'Assistant Commandant',
    status: 'Inactive',
    missions: '12',
    dutyStation: 'Siachen',
    department: 'Mountain Division',
    skills: 'High Altitude Warfare, Survival Skills',
    equipmentIssued: 'Snow Boots, Ice Axe',
    successRate: '85'
  },
  {
    serialNumber: '04',
    opName: 'Operation Blue Star',
    realName: 'Vikram Sharma',
    rank: 'Inspector',
    status: 'Active',
    missions: '25',
    dutyStation: 'Punjab',
    department: 'Special Forces',
    skills: 'Close Quarters Combat, Reconnaissance',
    equipmentIssued: 'Night Vision Goggles, Handgun',
    successRate: '90'
  },
  {
    serialNumber: '05',
    opName: 'Operation Vijay',
    realName: 'Arjun Verma',
    rank: 'Sub-Inspector',
    status: 'Active',
    missions: '15',
    dutyStation: 'Kargil',
    department: 'Infantry',
    skills: 'Strategic Planning, Sniper Training',
    equipmentIssued: 'Sniper Rifle, Range Finder',
    successRate: '95'
  },
  {
    serialNumber: '06',
    opName: 'Operation Trident',
    realName: 'Sanjay Joshi',
    rank: 'Assistant Sub-Inspector',
    status: 'Inactive',
    missions: '10',
    dutyStation: 'Coastal Areas',
    department: 'Marine Division',
    skills: 'Naval Warfare, Diving',
    equipmentIssued: 'Underwater Gear, Rifle',
    successRate: '80'
  },
  {
    serialNumber: '07',
    opName: 'Operation Pawan',
    realName: 'Manish Tiwari',
    rank: 'Head Constable',
    status: 'Active',
    missions: '22',
    dutyStation: 'Sri Lanka',
    department: 'Peacekeeping Forces',
    skills: 'Peacekeeping, Negotiation',
    equipmentIssued: 'Handgun, Baton',
    successRate: '87'
  },
  {
    serialNumber: '08',
    opName: 'Operation Parakram',
    realName: 'Rohit Das',
    rank: 'Constable',
    status: 'Active',
    missions: '14',
    dutyStation: 'Western Border',
    department: 'Border Security',
    skills: 'Patrolling, Surveillance',
    equipmentIssued: 'Rifle, Night Vision',
    successRate: '91'
  },
  {
    serialNumber: '09',
    opName: 'Operation Rhino',
    realName: 'Vikas Rana',
    rank: 'Deputy Inspector',
    status: 'Inactive',
    missions: '8',
    dutyStation: 'Assam',
    department: 'Counter-Insurgency',
    skills: 'Jungle Warfare, Tracking',
    equipmentIssued: 'Machete, Rifle',
    successRate: '83'
  },
  {
    serialNumber: '10',
    opName: 'Operation Hifazat',
    realName: 'Anil Singh',
    rank: 'Assistant Commandant',
    status: 'Active',
    missions: '17',
    dutyStation: 'Chhattisgarh',
    department: 'Anti-Naxal Operations',
    skills: 'Guerrilla Warfare, Intelligence Gathering',
    equipmentIssued: 'Bulletproof Vest, Rifle',
    successRate: '89'
  }
];

const Personnel = () => {
  const [filteredData, setFilteredData] = useState(exampleData);
  const [sortConfig, setSortConfig] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    serialNumber: '',
    opName: '',
    realName: '',
    rank: '',
    status: '',
    missions: '',
    dutyStation: '',
    department: '',
    skills: '',
    equipmentIssued: '',
    successRate: ''
  });

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = exampleData.filter(
      (item) =>
        item.serialNumber.toLowerCase().includes(query) ||
        item.opName.toLowerCase().includes(query) ||
        item.realName.toLowerCase().includes(query) ||
        item.rank.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.missions.toLowerCase().includes(query) ||
        item.dutyStation.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.skills.toLowerCase().includes(query) ||
        item.equipmentIssued.toLowerCase().includes(query) ||
        item.successRate.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredData(sorted);
  };

  const getSortButtonClass = (key) => {
    if (!sortConfig) return '';
    return sortConfig.key === key ? sortConfig.direction : '';
  };

  const handleModify = (record) => {
    setFormData(record);
    setFormVisible(true);
  };

  const handleRemove = (serialNumber) => {
    const updatedData = filteredData.filter((item) => item.serialNumber !== serialNumber);
    setFilteredData(updatedData);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formData.serialNumber) {
      const updatedData = filteredData.map((item) =>
        item.serialNumber === formData.serialNumber ? formData : item
      );
      setFilteredData(updatedData);
    } else {
      setFilteredData([...filteredData, { ...formData, serialNumber: (filteredData.length + 1).toString().padStart(2, '0') }]);
    }
    setFormVisible(false);
    setAddFormVisible(false);
  };

  const handleAddField = () => {
    setFormData({
      serialNumber: '',
      opName: '',
      realName: '',
      rank: '',
      status: '',
      missions: '',
      dutyStation: '',
      department: '',
      skills: '',
      equipmentIssued: '',
      successRate: ''
    });
    setAddFormVisible(true);
    setFormVisible(false);
  };

  const getSuccessRateClass = (successRate) => {
    if (successRate >= 90) return 'high';
    if (successRate >= 80) return 'medium';
    return 'low';
  };


const handleExport = (type) => {
  if (type === 'csv') {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'personnel_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (type === 'xls') {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Personnel Records');
    XLSX.writeFile(wb, 'personnel_records.xlsx');
  }
};
  return (
    <div className="personnel-container">
      <h1 className="page-heading">Personnel Records</h1>
      <div className="controls">
        <input type="text" placeholder="Search..." onChange={handleSearch} className="search-input" />
        <button onClick={handleAddField} className="add-field-button">Add Item</button>
        <button onClick={() => handleExport('csv')} className="export-button">Export to CSV</button>
        <button onClick={() => handleExport('xls')} className="export-button">Export to Excel</button>
      </div>
      {(formVisible || addFormVisible) && (
        <form className="personnel-form" onSubmit={handleFormSubmit}>
          <input type="text" name="opName" value={formData.opName} onChange={handleFormChange} placeholder="Operation Name" required />
          <input type="text" name="realName" value={formData.realName} onChange={handleFormChange} placeholder="Real Name" required />
          <input type="text" name="rank" value={formData.rank} onChange={handleFormChange} placeholder="Rank" required />
          <input type="text" name="status" value={formData.status} onChange={handleFormChange} placeholder="Status" required />
          <input type="text" name="missions" value={formData.missions} onChange={handleFormChange} placeholder="Missions" required />
          <input type="text" name="dutyStation" value={formData.dutyStation} onChange={handleFormChange} placeholder="Duty Station" required />
          <input type="text" name="department" value={formData.department} onChange={handleFormChange} placeholder="Department" required />
          <input type="text" name="skills" value={formData.skills} onChange={handleFormChange} placeholder="Skills" required />
          <input type="text" name="equipmentIssued" value={formData.equipmentIssued} onChange={handleFormChange} placeholder="Equipment Issued" required />
          <input type="text" name="successRate" value={formData.successRate} onChange={handleFormChange} placeholder="Success Rate" required />
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={() => { setFormVisible(false); setAddFormVisible(false); }} className="cancel-button">Cancel</button>
        </form>
      )}
      <table className="personnel-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('serialNumber')} className={getSortButtonClass('serialNumber')}>#</th>
            <th onClick={() => handleSort('opName')} className={getSortButtonClass('opName')}>Operation Name</th>
            <th onClick={() => handleSort('realName')} className={getSortButtonClass('realName')}>Real Name</th>
            <th onClick={() => handleSort('rank')} className={getSortButtonClass('rank')}>Rank</th>
            <th onClick={() => handleSort('status')} className={getSortButtonClass('status')}>Status</th>
            <th onClick={() => handleSort('missions')} className={getSortButtonClass('missions')}>Missions</th>
            <th onClick={() => handleSort('dutyStation')} className={getSortButtonClass('dutyStation')}>Duty Station</th>
            <th onClick={() => handleSort('department')} className={getSortButtonClass('department')}>Department</th>
            <th onClick={() => handleSort('skills')} className={getSortButtonClass('skills')}>Skills</th>
            <th onClick={() => handleSort('equipmentIssued')} className={getSortButtonClass('equipmentIssued')}>Equipment Issued</th>
            <th onClick={() => handleSort('successRate')} className={getSortButtonClass('successRate')}>Success Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((record) => (
            <tr key={record.serialNumber}>
              <td>{record.serialNumber}</td>
              <td>{record.opName}</td>
              <td>{record.realName}</td>
              <td className={`rank-${record.rank.replace(/\s+/g, '-')}`}>{record.rank}</td>
              <td>{record.status}</td>
              <td>{record.missions}</td>
              <td>{record.dutyStation}</td>
              <td>{record.department}</td>
              <td>{record.skills}</td>
              <td>{record.equipmentIssued}</td>
              <td className={getSuccessRateClass(record.successRate)}>{record.successRate}</td>
              <td>
                <button onClick={() => handleModify(record)} className="modify-button">Modify</button>
                <button onClick={() => handleRemove(record.serialNumber)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Personnel;
