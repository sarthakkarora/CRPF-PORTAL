import React, { useState } from 'react';
import './Inventory.css';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const initialInventory = [
  { id: 1, item: 'Rifles', quantity: 10, status: 'Available', supplier: 'Supplier 1' },
  { id: 2, item: 'Bullets', quantity: 50, status: 'Available', supplier: 'Supplier 2' },
  { id: 3, item: 'Medic Kits', quantity: 5, status: 'Limited', supplier: 'Supplier 3' },
  { id: 4, item: 'Grenades', quantity: 2, status: 'Out of Stock', supplier: 'Supplier 1' },
  { id: 5, item: 'Night Vision Goggles', quantity: 8, status: 'Available', supplier: 'Supplier 2' },
  { id: 6, item: 'Tactical Vests', quantity: 12, status: 'Available', supplier: 'Supplier 3' },
  { id: 7, item: 'First Aid Kits', quantity: 7, status: 'Limited', supplier: 'Supplier 1' },
  { id: 8, item: 'Flashlights', quantity: 20, status: 'Available', supplier: 'Supplier 2' },
  { id: 9, item: 'Survival Knives', quantity: 15, status: 'Limited', supplier: 'Supplier 3' },
  { id: 10, item: 'Camouflage Nets', quantity: 3, status: 'Out of Stock', supplier: 'Supplier 1' }
];

const Inventory = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [newItem, setNewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'item', direction: 'ascending' });
  const [selectedSupplier, setSelectedSupplier] = useState('');

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
    const supplier = prompt("Select Supplier (1, 2, or 3):");
    if (supplier) {
      alert(`Requested supplies for ${item.item} from Supplier ${supplier} on ${new Date().toLocaleDateString()}`);
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInventory = inventory
    .filter(item =>
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quantity.toString().includes(searchQuery) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredInventory);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inventory.csv');
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredInventory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory.xlsx');
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-heading">Inventory</h1>
      <div className="controls-container">
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by item, quantity, status, or supplier"
          />
        </div>
        <button className="toggle-add-item-button" onClick={() => setNewItem(newItem ? null : { item: '', quantity: '', status: 'Available', supplier: 'Supplier 1' })}>
          {newItem ? 'Cancel' : 'Add Item'}
        </button>
        <button className="export-button" onClick={exportToCSV}>
          Export CSV
        </button>
        <button className="export-button" onClick={exportToExcel}>
          Export Excel
        </button>
      </div>
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
          <select
            value={newItem.supplier}
            onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
          >
            <option value="Supplier 1">Supplier 1</option>
            <option value="Supplier 2">Supplier 2</option>
            <option value="Supplier 3">Supplier 3</option>
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
            <th onClick={() => handleSort('supplier')}>
              Supplier
              <span className="sort-arrow">
                {sortConfig.key === 'supplier' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
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
              <td>{item.supplier}</td>
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
