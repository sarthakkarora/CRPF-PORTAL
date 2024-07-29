import React, { useState } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, item: 'First Aid Kit', quantity: 10, status: 'Available' },
    { id: 2, item: 'Flashlight', quantity: 5, status: 'Low' },
  ]);

  const [newItem, setNewItem] = useState({ item: '', quantity: '', status: '' });
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({ item: '', quantity: '', status: '' });

  const handleAdd = () => {
    if (newItem.item && newItem.quantity && newItem.status) {
      setInventoryItems([
        ...inventoryItems,
        { ...newItem, id: Date.now() },
      ]);
      setNewItem({ item: '', quantity: '', status: '' });
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = inventoryItems.find(item => item.id === id);
    setEditItemId(id);
    setEditedItem(itemToEdit);
  };

  const handleUpdate = () => {
    setInventoryItems(inventoryItems.map(item =>
      item.id === editItemId ? editedItem : item
    ));
    setEditItemId(null);
  };

  const handleDelete = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <div className="inventory-buttons">
          <button className="btn add" onClick={handleAdd}>Add Item</button>
          {editItemId && <button className="btn modify" onClick={handleUpdate}>Update Item</button>}
        </div>
        {editItemId && (
          <div className="form-container">
            <input
              type="text"
              value={editedItem.item}
              onChange={(e) => setEditedItem({ ...editedItem, item: e.target.value })}
              placeholder="Item"
            />
            <input
              type="number"
              value={editedItem.quantity}
              onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
              placeholder="Quantity"
            />
            <select
              value={editedItem.status}
              onChange={(e) => setEditedItem({ ...editedItem, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Low">Low</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        )}
        {!editItemId && (
          <div className="form-container">
            <input
              type="text"
              value={newItem.item}
              onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
              placeholder="Item"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              placeholder="Quantity"
            />
            <select
              value={newItem.status}
              onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Low">Low</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        )}
      </div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</td>
              <td>
                <button className="btn modify" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="btn remove" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
