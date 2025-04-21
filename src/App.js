import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const WarehouseSystem = () => {
  const [maxCapacity, setMaxCapacity] = useState(null); // State for maximum capacity
  const [crops, setCrops] = useState([]);
  const [cropName, setCropName] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [editCropId, setEditCropId] = useState(null);
  const [editCropName, setEditCropName] = useState('');
  const [editWeight, setEditWeight] = useState('');

  const usedCapacity = crops.reduce((total, crop) => total + crop.weight, 0);
  const remainingCapacity = maxCapacity ? maxCapacity - usedCapacity : 0;

  const pieData = [
    ...crops.map((crop) => ({
      name: crop.name,
      value: crop.weight,
    })),
    { name: 'Remaining Capacity', value: remainingCapacity > 0 ? remainingCapacity : 0 },
  ];

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cropName || !weight) {
      setError('Please fill in all fields');
      return;
    }
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight');
      return;
    }
    if (usedCapacity + weightNum > maxCapacity) {
      setError('Adding this crop would exceed warehouse capacity');
      return;
    }
    const newCrop = {
      id: Date.now(),
      name: cropName,
      weight: weightNum,
      date: new Date().toLocaleString(),
    };
    setCrops([...crops, newCrop]);
    setCropName('');
    setWeight('');
    setError('');
  };

  const handleRemoveCrop = (id) => {
    setCrops(crops.filter((crop) => crop.id !== id));
  };

  const handleEditCrop = (id) => {
    const crop = crops.find((crop) => crop.id === id);
    setEditCropId(id);
    setEditCropName(crop.name);
    setEditWeight(crop.weight);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(editWeight);
    if (!editCropName || isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter valid details');
      return;
    }
    const updatedCrops = crops.map((crop) =>
      crop.id === editCropId ? { ...crop, name: editCropName, weight: weightNum } : crop
    );
    setCrops(updatedCrops);
    setEditCropId(null);
    setEditCropName('');
    setEditWeight('');
    setError('');
  };

  // Render the input for maximum capacity if not set
  if (maxCapacity === null) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Warehouse Management System</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Set Maximum Capacity</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const capacity = parseFloat(e.target.capacity.value);
              if (isNaN(capacity) || capacity <= 0) {
                alert('Please enter a valid capacity');
                return;
              }
              setMaxCapacity(capacity);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="capacity">
                Maximum Capacity (kg)
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter maximum capacity in kg"
                step="1"
                min="1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Set Capacity
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render the main application once the maximum capacity is set
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Warehouse Management System</h1>

      {/* Capacity Summary and Pie Chart Side-by-Side */}
      <div className="flex-row">
        {/* Capacity Summary */}
        <div className="flex-item bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Warehouse Capacity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Total Capacity</h3>
              <p className="text-2xl font-bold">{maxCapacity.toLocaleString()} kg</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800">Used Capacity</h3>
              <p className="text-2xl font-bold">{usedCapacity.toLocaleString()} kg</p>
              <p className="text-sm">({((usedCapacity / maxCapacity) * 100).toFixed(1)}%)</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-800">Remaining Capacity</h3>
              <p className="text-2xl font-bold">{remainingCapacity.toLocaleString()} kg</p>
              <p className="text-sm">({((remainingCapacity / maxCapacity) * 100).toFixed(1)}%)</p>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex-item pie-chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Crop Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add Crop to Warehouse</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="cropName">
                Crop Name
              </label>
              <input
                type="text"
                id="cropName"
                className="w-full px-3 py-2 border rounded-lg"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="Enter crop name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                className="w-full px-3 py-2 border rounded-lg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                step="0.01"
                min="0"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Crop
            </button>
          </form>
        </div>
      </div>

      {/* Crops List */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Stored Crops</h2>
        {crops.length === 0 ? (
          <p className="text-gray-500">No crops in warehouse yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {crops.map((crop) => (
                  <tr key={crop.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editCropId === crop.id ? (
                        <input
                          type="text"
                          value={editCropName}
                          onChange={(e) => setEditCropName(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      ) : (
                        crop.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editCropId === crop.id ? (
                        <input
                          type="number"
                          value={editWeight}
                          onChange={(e) => setEditWeight(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      ) : (
                        crop.weight.toLocaleString()
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{crop.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editCropId === crop.id ? (
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditCrop(crop.id)}
                          className="text-blue-600 hover:text-blue-900 mr-2"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveCrop(crop.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarehouseSystem;