import React, { useState, useEffect } from 'react';
import './Indent.css';

// Dummy data fetcher
const fetchIndents = async () => {
  // Replace this with real data fetching logic
  return [
    {
      resource: "Communication Devices",
      quantity: 15,
      priority: "Normal",
      specifications: "Two-way radios, Range 5km",
      date: "2024-07-31 14:00:00",
      status: "Pending"
    },
  ];
};

const Indent = () => {
  const [form, setForm] = useState({
    resource: '',
    quantity: '',
    priority: 'Normal',
    specifications: '',
    requester: '',
    department: '',
    deliveryDate: ''
  });
  const [indents, setIndents] = useState([]);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [currentIndent, setCurrentIndent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadIndents = async () => {
      setLoading(true);
      try {
        const fetchedIndents = await fetchIndents();
        setIndents(fetchedIndents);
      } catch (error) {
        setError('Failed to load indents. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadIndents();
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(1));
      }, 2000); // Notifications disappear after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    const { resource, quantity, requester, department, deliveryDate } = form;
    if (!resource.trim() || quantity <= 0 || isNaN(quantity) || !requester.trim() || !department.trim() || !deliveryDate) {
      setError('Please enter valid details in all required fields.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newIndent = {
      ...form,
      quantity: Number(form.quantity),
      date: new Date().toLocaleString(),
      status: 'Pending'
    };

    setUndoStack([...undoStack, { type: 'ADD', indent: newIndent }]);
    setIndents([...indents, newIndent]);
    setForm({
      resource: '',
      quantity: '',
      priority: 'Normal',
      specifications: '',
      requester: '',
      department: '',
      deliveryDate: ''
    });
    setNotifications([...notifications, 'Indent submitted successfully!']);
  };

  const handleApproval = (index) => {
    if (window.confirm('Are you sure you want to approve this indent?')) {
      const updatedIndents = indents.map((indent, i) =>
        i === index ? { ...indent, status: 'Approved' } : indent
      );
      setUndoStack([...undoStack, { type: 'UPDATE', index, previousIndent: indents[index] }]);
      setIndents(updatedIndents);
      setNotifications([...notifications, 'Indent approved successfully!']);
    }
  };

  const handleRejection = (index) => {
    if (window.confirm('Are you sure you want to reject this indent?')) {
      const updatedIndents = indents.map((indent, i) =>
        i === index ? { ...indent, status: 'Rejected' } : indent
      );
      setUndoStack([...undoStack, { type: 'UPDATE', index, previousIndent: indents[index] }]);
      setIndents(updatedIndents);
      setNotifications([...notifications, 'Indent rejected successfully!']);
    }
  };

  const handleUndo = () => {
    const lastAction = undoStack.pop();
    if (!lastAction) {
      setNotifications([...notifications, 'No actions to undo.']);
      return;
    }

    if (lastAction.type === 'ADD') {
      setIndents(indents.filter(indent => indent !== lastAction.indent));
      setNotifications([...notifications, 'Last indent submission undone.']);
    } else if (lastAction.type === 'UPDATE') {
      const updatedIndents = indents.map((indent, i) =>
        i === lastAction.index ? lastAction.previousIndent : indent
      );
      setIndents(updatedIndents);
      setNotifications([...notifications, 'Last status update undone.']);
    }

    setUndoStack([...undoStack]);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleDetailView = (indent) => {
    setCurrentIndent(indent);
  };

  const handleCloseDetailView = () => {
    setCurrentIndent(null);
  };

  const filteredIndents = indents
    .filter(indent =>
      (filterStatus === 'All' || indent.status === filterStatus) &&
      indent.resource.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'resource') {
        return a.resource.localeCompare(b.resource);
      }
      return b.quantity - a.quantity;
    });

  const paginatedIndents = filteredIndents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredIndents.length / itemsPerPage);

  return (
    <div className="indent-resource-container">
      <h1>Indent Resource/Equipment</h1>
      <form onSubmit={handleSubmit} className="indent-form">
        <div className="form-group">
          <label htmlFor="resource">Resource/Equipment</label>
          <input 
            id="resource"
            name="resource"
            type="text" 
            value={form.resource} 
            onChange={handleChange} 
            placeholder="Enter resource/equipment" 
            aria-required="true"
            aria-describedby="resource-help"
          />
          <small id="resource-help">e.g., Laptop, Ammo, Weapons, etc</small>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input 
            id="quantity"
            name="quantity"
            type="number" 
            value={form.quantity} 
            onChange={handleChange} 
            placeholder="Enter quantity" 
            aria-required="true"
            aria-describedby="quantity-help"
          />
          <small id="quantity-help">e.g., 10, 5</small>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select 
            id="priority" 
            name="priority"
            value={form.priority} 
            onChange={handleChange} 
            aria-required="true"
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="specifications">Specifications</label>
          <textarea 
            id="specifications"
            name="specifications"
            value={form.specifications} 
            onChange={handleChange} 
            placeholder="Enter specifications (if any)" 
            aria-describedby="specifications-help"
          />
          <small id="specifications-help">e.g., Model number, features</small>
        </div>
        <div className="form-group">
          <label htmlFor="requester">Requester</label>
          <input 
            id="requester"
            name="requester"
            type="text" 
            value={form.requester} 
            onChange={handleChange} 
            placeholder="Enter requester's name" 
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input 
            id="department"
            name="department"
            type="text" 
            value={form.department} 
            onChange={handleChange} 
            placeholder="Enter department name" 
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date</label>
          <input 
            id="deliveryDate"
            name="deliveryDate"
            type="date" 
            value={form.deliveryDate} 
            onChange={handleChange} 
            aria-required="true"
          />
        </div>
        <button type="submit">Submit Indent</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="filters">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select id="status-filter" value={filterStatus} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <label htmlFor="search">Search:</label>
        <input 
          id="search"
          type="text" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          placeholder="Search by resource"
        />
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="date">Date</option>
          <option value="resource">Resource</option>
          <option value="quantity">Quantity</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="indent-list">
          {paginatedIndents.length === 0 ? (
            <p>No indents found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Quantity</th>
                  <th>Priority</th>
                  <th>Specifications</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedIndents.map((indent, index) => (
                  <tr key={index}>
                    <td>{indent.resource}</td>
                    <td>{indent.quantity}</td>
                    <td>{indent.priority}</td>
                    <td>{indent.specifications}</td>
                    <td>{indent.date}</td>
                    <td>{indent.status}</td>
                    <td>
  {indent.status === 'Pending' && (
    <>
      <button className="approve-btn" onClick={() => handleApproval(index)}>Approve</button>
      <button className="reject-btn" onClick={() => handleRejection(index)}>Reject</button>
    </>
  )}
  <button className="view-btn" onClick={() => handleDetailView(indent)}>View</button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
         
        </div>
      )}
      {currentIndent && (
        <div className="detail-view">
          <h3>Indent Details</h3>
          <p><strong>Resource:</strong> {currentIndent.resource}</p>
          <p><strong>Quantity:</strong> {currentIndent.quantity}</p>
          <p><strong>Priority:</strong> {currentIndent.priority}</p>
          <p><strong>Specifications:</strong> {currentIndent.specifications}</p>
          <p><strong>Date:</strong> {currentIndent.date}</p>
          <p><strong>Status:</strong> {currentIndent.status}</p>
          <button onClick={handleCloseDetailView}>Close</button>
        </div>
      )}
      <button className="undo-btn" onClick={handleUndo} disabled={undoStack.length === 0}>Undo</button>

      <div className="notifications">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indent;
