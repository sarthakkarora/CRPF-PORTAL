import React, { useState } from 'react';
import './Inventory.css';

const initialInventory = [
  { id: 1, item: 'Rifles', quantity: 10, status: 'Available' },
  { id: 2, item: 'Bullets', quantity: 50, status: 'Available' },
  { id: 3, item: 'Medic Kits', quantity: 5, status: 'Limited' },
  { id: 4, item: 'Grenades', quantity: 2, status: 'Out of Stock' },
  { id: 5, item: 'Night Vision Goggles', quantity: 8, status: 'Available' },
];

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [newItem, setNewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('item');
  const [sortConfig, setSortConfig] = useState({ key: 'item', direction: 'ascending' });

  const handleAddItem = () => {
    if (editingItem) {
      setInventory(
        inventory.map(item => (item.id === editingItem.id ? { ...newItem, id: item.id } : item))
      );
      setEditingItem(null);
    } else {
      setInventory([
        ...inventory,
        { ...newItem, id: Date.now() }
      ]);
    }
    setNewItem(null);
  };

  const handleModifyItem = (item) => {
    setNewItem(item);
    setEditingItem(item);
  };

  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleRequestSupply = (item) => {
    alert(`Requesting supply for ${item.item}`);
  };

  const handleSort = (key) => {
    const direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredInventory = inventory
    .filter(item =>
      item[searchField].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

  return (
    <div className="inventory-container">
      <h1 className="inventory-heading">Inventory</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={`Search ${searchField}`}
        />
        <select
          value={searchField}
          onChange={handleSearchFieldChange}
          className="search-field-select"
        >
          <option value="item">Item Name</option>
          <option value="quantity">Quantity</option>
          <option value="status">Status</option>
        </select>
      </div>
      <button className="toggle-add-item-button" onClick={() => setNewItem(newItem ? null : { item: '', quantity: '', status: 'Available' })}>
        {newItem ? 'Cancel' : 'Add Item'}
      </button>
      {newItem && (
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          />
          <select
            value={newItem.status}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Limited">Limited</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <button className="submit-add-item-button" onClick={handleAddItem}>
            {editingItem ? 'Modify Item' : 'Add Item'}
          </button>
        </div>
      )}
      <table className="inventory-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('item')}>
              Item
              <span className="sort-arrow">
                {sortConfig.key === 'item' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </span>
            </th>
            <th onClick={() => handleSort('quantity')}>
              Quantity
              <span className="sort-arrow">
                {sortConfig.key === 'quantity' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </span>
            </th>
            <th onClick={() => handleSort('status')}>
              Status
              <span className="sort-arrow">
                {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id}>
              <td className={`status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.item}</td>
              <td>{item.quantity}</td>
              <td className={`status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</td>
              <td>
                <button className="modify-button" onClick={() => handleModifyItem(item)}>
                  Modify
                </button>
                <button className="remove-button" onClick={() => handleDeleteItem(item.id)}>
                  Remove
                </button>
                {(item.status === 'Limited' || item.status === 'Out of Stock') && (
                  <button className="request-supply-button" onClick={() => handleRequestSupply(item)}>
                    Request Supply
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
