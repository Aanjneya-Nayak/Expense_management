import React, { useState } from "react";
import api from "../api/api";

const ItemList = ({
  items,
  onItemDeleted,
  onItemTypeFilter,
  isOwnItems = false,
}) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchName, setSearchName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    "Electronics",
    "Clothing",
    "Documents",
    "Accessories",
    "Books",
    "Bags",
    "Keys",
    "Other",
  ];

  const itemTypes = ["Lost", "Found"];

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (onItemTypeFilter) {
      onItemTypeFilter(type);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        setLoading(true);
        await api.delete(`/items/${id}`);
        alert("Item deleted successfully!");
        onItemDeleted();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting item");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditData({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      category: item.category,
      location: item.location,
      contactInfo: item.contactInfo,
      status: item.status,
      date: item.date.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveEdit = async (id) => {
    if (!window.confirm("Are you sure you want to update this item?")) return;

    try {
      setLoading(true);
      await api.put(`/items/${id}`, editData);
      alert("Item updated successfully!");
      setEditingId(null);
      onItemDeleted();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating item");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  // Filter items
  let filteredItems = items.filter((item) => {
    if (selectedType && item.type !== selectedType) return false;
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (
      searchName &&
      !item.itemName.toLowerCase().includes(searchName.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        {isOwnItems ? "Your Items" : "All Items"}
      </h3>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Item Type
          </label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">
            Search Item Name
          </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search item name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Items Summary */}
      {filteredItems.length > 0 && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-lg font-bold text-blue-800">
            Found {filteredItems.length} item(s)
          </p>
        </div>
      )}

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No items found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Item Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Location
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
                {!isOwnItems && (
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Reporter Contact
                  </th>
                )}
                {isOwnItems && (
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) =>
                editingId === item._id ? (
                  <tr key={item._id} className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="itemName"
                        value={editData.itemName}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="type"
                        value={editData.type}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        {itemTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="Active">Active</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleSaveEdit(item._id)}
                        disabled={loading}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 disabled:opacity-50 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {item.itemName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.type === "Lost"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {item.category}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {item.location}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.status === "Active"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    {!isOwnItems && (
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {item.userId?.contactInfo || item.contactInfo}
                      </td>
                    )}
                    {isOwnItems && (
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={loading}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
