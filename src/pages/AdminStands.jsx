// src/pages/AdminStands.jsx
import { useState } from 'react';
import { concessionStands } from '../data/stands';

const AdminStands = () => {
  const [stands, setStands] = useState(concessionStands);
  const [newStand, setNewStand] = useState({
    name: '',
    location: '',
    estimatedTime: 10
  });
  const [editingStand, setEditingStand] = useState(null);

  const addNewStand = () => {
    if (!newStand.name || !newStand.location) {
      alert("Stand Name and Location are required!");
      return;
    }

    const standToAdd = {
      id: `stand${Date.now()}`,
      ...newStand,
      estimatedTime: parseInt(newStand.estimatedTime)
    };

    setStands([...stands, standToAdd]);
    setNewStand({ name: '', location: '', estimatedTime: 10 });
    alert("New Express Pickup Stand added successfully!");
  };

  const deleteStand = (id) => {
    if (window.confirm("Are you sure you want to delete this stand?")) {
      setStands(stands.filter(stand => stand.id !== id));
    }
  };

  const startEditing = (stand) => {
    setEditingStand(stand);
    setNewStand({
      name: stand.name,
      location: stand.location,
      estimatedTime: stand.estimatedTime
    });
  };

  const saveEdit = () => {
    if (!editingStand) return;

    setStands(stands.map(stand => 
      stand.id === editingStand.id 
        ? { ...stand, ...newStand, estimatedTime: parseInt(newStand.estimatedTime) }
        : stand
    ));

    setEditingStand(null);
    setNewStand({ name: '', location: '', estimatedTime: 10 });
    alert("Stand updated successfully!");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Manage Express Pickup Stands</h1>
        <p className="text-zinc-400 mb-10">Add, edit or remove dedicated pickup counters for mobile orders</p>

        {/* Add / Edit Form */}
        <div className="bg-zinc-900 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {editingStand ? "Edit Pickup Stand" : "Add New Pickup Stand"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-zinc-400 mb-2">Stand Name</label>
              <input
                type="text"
                value={newStand.name}
                onChange={(e) => setNewStand({ ...newStand, name: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                placeholder="e.g. Gate A Grill"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Estimated Wait Time (minutes)</label>
              <input
                type="number"
                value={newStand.estimatedTime}
                onChange={(e) => setNewStand({ ...newStand, estimatedTime: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm text-zinc-400 mb-2">Location / Description</label>
              <input
                type="text"
                value={newStand.location}
                onChange={(e) => setNewStand({ ...newStand, location: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3"
                placeholder="e.g. Near Section C Entrance"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {editingStand ? (
              <>
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingStand(null);
                    setNewStand({ name: '', location: '', estimatedTime: 10 });
                  }}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 py-4 rounded-2xl font-semibold"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={addNewStand}
                className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-semibold text-lg"
              >
                Add New Stand
              </button>
            )}
          </div>
        </div>

        {/* Current Stands List */}
        <h2 className="text-2xl font-semibold mb-6">Current Express Pickup Stands ({stands.length})</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {stands.map((stand) => (
            <div key={stand.id} className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700 hover:border-green-500 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-semibold mb-1">{stand.name}</h3>
                  <p className="text-green-400 font-mono text-lg">{stand.estimatedTime} min average wait</p>
                </div>
                <span className="px-4 py-1.5 bg-green-900 text-green-400 text-xs rounded-full font-medium">
                  Active
                </span>
              </div>

              <p className="text-zinc-400 mt-4">{stand.location}</p>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => startEditing(stand)}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-2xl font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStand(stand.id)}
                  className="flex-1 bg-red-600 hover:bg-red-500 py-3 rounded-2xl font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {stands.length === 0 && (
          <p className="text-center text-zinc-500 py-12">No stands available. Add your first Express Pickup stand above.</p>
        )}
      </div>
    </div>
  );
};

export default AdminStands;