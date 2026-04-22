import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const categories = [
    "Food",
    "Travel",
    "Bills",
    "Entertainment",
    "Shopping",
    "Health",
    "Other",
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchExpenses();
  }, [isAuthenticated, navigate]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/expenses");
      setExpenses(response.data.expenses);
      setFilteredExpenses(response.data.expenses);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses();
  };

  const handleExpenseDeleted = () => {
    fetchExpenses();
  };

  const handleCategoryFilter = (category) => {
    if (category === "") {
      setFilteredExpenses(expenses);
    } else {
      setFilteredExpenses(expenses.filter((exp) => exp.category === category));
    }
  };

  const handleDateFilter = async (startDate, endDate) => {
    try {
      const response = await api.get("/expenses", {
        params: {
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
      setFilteredExpenses(response.data.expenses);
    } catch (err) {
      setError(err.response?.data?.message || "Error filtering expenses");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Expense Manager</h1>
            <p className="text-blue-100">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Add Expense Form */}
        <ExpenseForm
          onExpenseAdded={handleExpenseAdded}
          categories={categories}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading expenses...</p>
          </div>
        ) : (
          /* Expenses List */
          <ExpenseList
            expenses={filteredExpenses}
            onExpenseDeleted={handleExpenseDeleted}
            categories={categories}
            onCategoryFilter={handleCategoryFilter}
            onDateFilter={handleDateFilter}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
