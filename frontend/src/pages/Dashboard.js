import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [ownItems, setOwnItems] = useState([]);
  const [activeTab, setActiveTab] = useState("report"); // "report" or "browse"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchAllItems();
    fetchUserItems();
  }, [isAuthenticated, navigate]);

  const fetchAllItems = async () => {
    try {
      setLoading(true);
      const response = await api.get("/items");
      setItems(response.data.items);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserItems = async () => {
    try {
      const response = await api.get("/items/my-items");
      setOwnItems(response.data.items);
    } catch (err) {
      console.error("Error fetching user items:", err);
    }
  };

  const handleItemAdded = () => {
    fetchAllItems();
    fetchUserItems();
  };

  const handleItemDeleted = () => {
    fetchAllItems();
    fetchUserItems();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Lost & Found System</h1>
                <p className="text-blue-100 text-sm">Campus Item Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-blue-100">Logged in as</p>
                <p className="font-semibold">{user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-danger flex items-center gap-2"
              >
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start gap-3">
            <svg
              className="w-6 h-6 flex-shrink-0 mt-0.5"
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

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {["report", "browse", "myitems"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab
                  ? "btn-primary shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab === "report" && (
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
              {tab === "browse" && (
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
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2v-5.5a2 2 0 012-2H7a2 2 0 012 2v5.5a2 2 0 01-2 2zm0 0V7"
                    />
                  </svg>
                  Browse Items
                </>
              )}
              {tab === "myitems" && (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  My Items
                </>
              )}
            </button>
          ))}
        </div>

        {/* Report Item Tab */}
        {activeTab === "report" && (
          <div className="animate-fadeIn">
            <ItemForm
              onItemAdded={handleItemAdded}
              userContactInfo={user?.contactInfo}
            />
          </div>
        )}

        {/* Browse Items Tab */}
        {activeTab === "browse" && (
          <div className="animate-fadeIn">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
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
                </div>
                <p className="text-gray-600 font-semibold">Loading items...</p>
              </div>
            ) : (
              <ItemList
                items={items}
                onItemDeleted={handleItemDeleted}
                isOwnItems={false}
              />
            )}
          </div>
        )}

        {/* My Items Tab */}
        {activeTab === "myitems" && (
          <div className="animate-fadeIn">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
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
                </div>
                <p className="text-gray-600 font-semibold">
                  Loading your items...
                </p>
              </div>
            ) : (
              <ItemList
                items={ownItems}
                onItemDeleted={handleItemDeleted}
                isOwnItems={true}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
