import React, { useState } from "react";
import api from "../api/api";

const ItemForm = ({ onItemAdded, userContactInfo }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    type: "Lost",
    category: "Electronics",
    location: "",
    contactInfo: userContactInfo || "",
    date: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/items", formData);

      alert("✅ Item reported successfully!");
      setFormData({
        itemName: "",
        description: "",
        type: "Lost",
        category: "Electronics",
        location: "",
        contactInfo: userContactInfo || "",
        date: new Date().toISOString().split("T")[0],
      });

      onItemAdded();
    } catch (err) {
      setError(err.response?.data?.message || "Error reporting item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Report Item</h3>
          <p className="text-sm text-gray-600">
            Help others find their belongings
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
          <svg
            className="w-5 h-5 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., iPhone 13, Blue Backpack"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-field cursor-pointer"
          >
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {type === "Lost" ? "🔍 Lost Item" : "✅ Found Item"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Library 3rd Floor, Building A"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Info <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="input-field"
            placeholder="Your phone number"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field resize-none"
            placeholder="Describe the item in detail: color, brand, model, any unique features, condition, etc."
            rows="4"
            required
          />
          <p className="text-xs text-gray-500 mt-2">
            📝 Provide as much detail as possible to help identify the item
          </p>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Reporting...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Report Item
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
