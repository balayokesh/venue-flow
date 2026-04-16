// src/pages/AdminMenu.jsx
import { useState } from 'react';
import { menuData } from '../data/menu';
import { concessionStands } from '../data/stands';

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState(menuData);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: 'Meals',
    description: '',
    standId: concessionStands[0]?.id || 'stand1'
  });
  const [editingItem, setEditingItem] = useState(null);

  const addNewItem = () => {
    if (!newItem.name || !newItem.price) {
      alert("Name and Price are required!");
      return;
    }

    const itemToAdd = {
      id: Date.now(),
      ...newItem,
      price: parseInt(newItem.price)
    };

    setMenuItems([...menuItems, itemToAdd]);
    setNewItem({
      name: '',
      price: '',
      category: 'Meals',
      description: '',
      standId: concessionStands[0]?.id || 'stand1'
    });
    alert("New menu item added successfully!");
  };

  const deleteItem = (id) => {
    if (window.confirm("Delete this menu item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      description: item.description || '',
      standId: item.standId
    });
  };

  const saveEdit = () => {
    if (!editingItem) return;

    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id 
        ? { ...item, ...newItem, price: parseInt(newItem.price) }
        : item
    ));

    setEditingItem(null);
    setNewItem({
      name: '',
      price: '',
      category: 'Meals',
      description: '',
      standId: concessionStands[0]?.id || 'stand1'
    });
    alert("Menu item updated successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Manage Menu</h1>
        <p className="text-zinc-400 mb-10">Add, edit or remove food items available for attendees</p>

        {/* Add / Edit Form */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Item Name</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                placeholder="e.g. Chicken Burger"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Price (₹)</label>
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                placeholder="280"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Category</label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
              >
                <option value="Meals">Meals</option>
                <option value="Drinks">Drinks</option>
                <option value="Snacks">Snacks</option>
                <option value="Combos">Combos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Assign to Stand</label>
              <select
                value={newItem.standId}
                onChange={(e) => setNewItem({ ...newItem, standId: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
              >
                {concessionStands.map(stand => (
                  <option key={stand.id} value={stand.id}>
                    {stand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-400 mb-2">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 h-24"
                placeholder="Brief description of the item"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {editingItem ? (
              <>
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setNewItem({ name: '', price: '', category: 'Meals', description: '', standId: concessionStands[0]?.id || 'stand1' });
                  }}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-4 rounded-2xl font-semibold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={addNewItem}
                className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold text-lg"
              >
                Add to Menu
              </button>
            )}
          </div>
        </div>

        {/* Current Menu Items */}
        <h2 className="text-2xl font-semibold mb-6">Current Menu Items ({menuItems.length})</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-zinc-900 rounded-2xl p-6 border border-zinc-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-green-400 font-bold text-xl mt-1">₹{item.price}</p>
                </div>
                <span className="px-3 py-1 bg-zinc-800 text-xs rounded-full text-zinc-400">
                  {item.category}
                </span>
              </div>

              {item.description && (
                <p className="text-zinc-400 text-sm mt-3 line-clamp-2">{item.description}</p>
              )}

              <p className="text-xs text-zinc-500 mt-4">
                Stand: {concessionStands.find(s => s.id === item.standId)?.name || 'Unknown'}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => startEditing(item)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-2.5 rounded-xl text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;