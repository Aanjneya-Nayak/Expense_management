import React, { useState } from "react";
import api from "../api/api";

const ExpenseList = ({
  expenses,
  onExpenseDeleted,
  categories,
  onCategoryFilter,
  onDateFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const handleDateFilter = () => {
    onDateFilter(startDate, endDate);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        setLoading(true);
        await api.delete(`/expenses/${id}`);
        alert("Expense deleted successfully!");
        onExpenseDeleted();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting expense");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.split("T")[0],
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
    if (!window.confirm("Are you sure you want to update this expense?"))
      return;

    try {
      setLoading(true);
      await api.put(`/expenses/${id}`, {
        ...editData,
        amount: parseFloat(editData.amount),
      });
      alert("Expense updated successfully!");
      setEditingId(null);
      onExpenseDeleted();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating expense");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory && expense.category !== selectedCategory) return false;
    return true;
  });

  const total = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Expenses</h3>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
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

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleDateFilter}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Filter by Date
          </button>
        </div>
      </div>

      {/* Total Section */}
      {filteredExpenses.length > 0 && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-lg font-bold text-blue-800">
            Total Expenses: ₹{total.toFixed(2)}
          </p>
          <p className="text-gray-700">
            Count: {filteredExpenses.length} expense(s)
          </p>
        </div>
      )}

      {/* Expenses List */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No expenses found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) =>
                editingId === expense._id ? (
                  <tr key={expense._id} className="bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      <input
                        type="number"
                        name="amount"
                        value={editData.amount}
                        onChange={handleEditChange}
                        step="0.01"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleSaveEdit(expense._id)}
                        disabled={loading}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={expense._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {expense.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {expense.category}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                      ₹{expense.amount.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                      {expense.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        disabled={loading}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
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

export default ExpenseList;
