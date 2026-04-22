# Quick Start Guide - MERN Expense Management System

## ⚡ 5-Minute Setup

### Terminal 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Update .env file with MongoDB connection string
# Edit backend/.env and add:
# MONGODB_URI=your_mongodb_uri_here
# JWT_SECRET=your_secret_key

# Start backend server
npm start
```

**Expected Output:**
```
Server running on http://localhost:5000
MongoDB Connected: cluster0.mongodb.net
```

---

### Terminal 2: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view expense-management-frontend in the browser.
Local:            http://localhost:3000
```

---

## 🔧 .env Files to Update

### Backend: `backend/.env`
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/expense-db?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here_can_be_any_string
PORT=5000
NODE_ENV=development
```

### Frontend: `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📝 Test the Application

### 1. Register New User
- Go to http://localhost:3000/register
- Enter Name, Email, Password
- Click Register

### 2. Login
- Go to http://localhost:3000/login
- Enter Email & Password
- Click Login

### 3. Add Expense
- Fill expense form (Title, Amount, Category)
- Click "Add Expense"

### 4. View & Filter
- See all expenses in table
- Filter by Category or Date Range
- View Total Expense Amount

### 5. Edit/Delete
- Click Edit to modify expense
- Click Delete to remove expense

---

## 📦 MongoDB Connection Options

### Option A: MongoDB Atlas (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and free cluster
3. Get connection string
4. Add connection string to `backend/.env`

Example:
```
MONGODB_URI=mongodb+srv://user:pass@cluster0.mongodb.net/expense-db?retryWrites=true&w=majority
```

### Option B: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string:
```
MONGODB_URI=mongodb://localhost:27017/expense-db
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Backend won't start | Check if port 5000 is free, update PORT in .env |
| Frontend won't start | Check if port 3000 is free, try `PORT=3001 npm start` |
| MongoDB connection error | Verify connection string in .env, check IP whitelist |
| CORS error | Ensure backend is running on 5000, frontend on 3000 |
| Token not working | Clear localStorage, login again |
| Dependencies error | Delete `node_modules`, run `npm install` again |

---

## 📞 API Endpoints Quick Reference

```
Auth:
POST   http://localhost:5000/api/auth/register
POST   http://localhost:5000/api/auth/login

Expenses (Requires JWT Token):
GET    http://localhost:5000/api/expenses
POST   http://localhost:5000/api/expenses
PUT    http://localhost:5000/api/expenses/:id
DELETE http://localhost:5000/api/expenses/:id
```

---

## 🎯 Project Completion Checklist

- [x] Backend Setup (Node.js + Express + MongoDB)
- [x] User Schema with bcrypt password hashing
- [x] Expense Schema with categories
- [x] JWT Authentication
- [x] Protected Routes Middleware
- [x] Register & Login APIs
- [x] Expense CRUD APIs
- [x] Frontend Pages (Register, Login, Dashboard)
- [x] Form Handling & Validation
- [x] Token Storage (localStorage)
- [x] Expense List Display
- [x] Category Filtering
- [x] Date Range Filtering
- [x] Total Amount Calculation
- [x] Update & Delete Functionality
- [x] Tailwind CSS Styling
- [x] Responsive Design

---

## 💡 Pro Tips

1. **Use Postman/Thunder Client** for testing APIs before frontend
2. **Check browser console** for JavaScript errors
3. **Use browser DevTools** to inspect network requests
4. **Keep tokens in localStorage** for session persistence
5. **Test with multiple users** to ensure data isolation

---

## 📚 Files Overview

**Backend Key Files:**
- `server.js` - Main server
- `models/User.js`, `models/Expense.js` - Database schemas
- `routes/auth.js`, `routes/expense.js` - API routes
- `middleware/auth.js` - JWT verification
- `controllers/` - Request handlers

**Frontend Key Files:**
- `App.js` - Main component & routing
- `pages/Register.js`, `pages/Login.js`, `pages/Dashboard.js` - Pages
- `components/ExpenseForm.js`, `components/ExpenseList.js` - Components
- `context/AuthContext.js` - Auth state management
- `api/api.js` - Axios configuration

---

**Ready to go! 🚀**

Start both servers and access the app at http://localhost:3000
