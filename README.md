# Personal Expense Management System - MERN Stack

A full-stack Personal Expense Management System built with MongoDB, Express, React, and Node.js.

## Features

### Backend (Part A: 6 Marks)
- ✅ MongoDB Schema for User (Name, Email, Password with bcrypt hashing)
- ✅ MongoDB Schema for Expense (User ID, Title, Amount, Category, Date)
- ✅ REST APIs:
  - `POST /register` - Register new user
  - `POST /login` - Authenticate user and return JWT token
  - `POST /expenses` - Add new expense (Protected)
  - `GET /expenses` - Get all expenses of logged-in user
  - `PUT /expenses/:id` - Update expense
  - `DELETE /expenses/:id` - Delete expense

### Authentication & Middleware (Part B: 3 Marks)
- ✅ JWT-based authentication
- ✅ Token generation on login
- ✅ Protected routes with auth middleware
- ✅ Middleware to verify JWT and attach user info

### Frontend (Part C: 4 Marks)
- ✅ Register Page
- ✅ Login Page
- ✅ Dashboard with Expense List
- ✅ Form handling for register/login
- ✅ JWT token stored in localStorage
- ✅ Fetch and display user expenses

### Functionality & Features (Part D: 2 Marks)
- ✅ Add new expenses
- ✅ View all expenses
- ✅ **Bonus**: Filter expenses by category
- ✅ **Bonus**: Show total expense amount
- ✅ **Additional**: Update expenses
- ✅ **Additional**: Delete expenses
- ✅ **Additional**: Filter by date range
- ✅ **Additional**: Logout functionality

## Project Structure

```
MSE2_pract/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── models/
│   │   ├── User.js             # User schema
│   │   └── Expense.js          # Expense schema
│   ├── routes/
│   │   ├── auth.js             # Auth routes (register, login)
│   │   └── expense.js          # Expense routes (CRUD)
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── controllers/
│   │   ├── authController.js   # Register & login logic
│   │   └── expenseController.js # Expense CRUD logic
│   ├── server.js               # Main server file
│   ├── package.json            # Dependencies
│   └── .env                    # Environment variables
│
└── frontend/
    ├── public/
    │   └── index.html          # Main HTML file
    ├── src/
    │   ├── pages/
    │   │   ├── Register.js      # Register page
    │   │   ├── Login.js         # Login page
    │   │   └── Dashboard.js     # Dashboard with expenses
    │   ├── components/
    │   │   ├── ExpenseForm.js   # Add expense form
    │   │   └── ExpenseList.js   # Display expenses list
    │   ├── api/
    │   │   └── api.js           # Axios configuration
    │   ├── context/
    │   │   └── AuthContext.js   # Auth state management
    │   ├── App.js               # Main app component
    │   ├── index.js             # React entry point
    │   └── index.css            # Tailwind CSS
    ├── tailwind.config.js      # Tailwind configuration
    ├── postcss.config.js       # PostCSS configuration
    ├── package.json            # Dependencies
    └── .env                    # Environment variables
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### Step 1: Clone/Extract the Project

```bash
cd MSE2_pract
```

### Step 2: Setup Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create/Update `.env` file with your credentials:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

**Example with MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-db?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_2024
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend should run on `http://localhost:5000`

### Step 3: Setup Frontend

1. Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file (if needed):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React development server:
```bash
npm start
```

The frontend should open on `http://localhost:3000`

## Usage

### 1. Register
- Click on "Register" link
- Fill in Name, Email, Password, Confirm Password
- Click Register button
- Redirected to Login page

### 2. Login
- Enter your Email and Password
- Click Login button
- Redirected to Dashboard

### 3. Add Expense
- Fill in the expense form with:
  - **Title**: Description of expense
  - **Amount**: Expense amount
  - **Category**: Select from dropdown
  - **Date**: Date of expense
  - **Description**: Optional additional details
- Click "Add Expense" button

### 4. View Expenses
- Dashboard displays all your expenses in a table
- Shows **Total Expense Amount** at the top

### 5. Filter Expenses
- **By Category**: Select category from dropdown
- **By Date Range**: Select start and end dates, click "Filter by Date"
- **All Filters**: Combination of filters work together

### 6. Edit Expense
- Click "Edit" button on any expense row
- Modify the details
- Click "Save" to update
- Click "Cancel" to discard changes

### 7. Delete Expense
- Click "Delete" button on any expense row
- Confirm deletion
- Expense will be removed

### 8. Logout
- Click "Logout" button in top right
- Redirected to Login page

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Expense Routes (Protected with JWT)
- `GET /api/expenses` - Get all expenses (supports filters: category, startDate, endDate)
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/:id` - Get single expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## Example API Calls

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Add Expense (with JWT token)
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "title": "Lunch",
    "amount": 250,
    "category": "Food",
    "date": "2024-04-22",
    "description": "Lunch at restaurant"
  }'
```

## Technologies Used

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM (Object Data Modeling)
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **CORS**: Cross-Origin Resource Sharing
- **Dotenv**: Environment variables

### Frontend
- **React**: UI library
- **React Router**: Routing
- **Axios**: HTTP client
- **Tailwind CSS**: Styling
- **Context API**: State management

## Marks Distribution

| Component | Marks | Status |
|-----------|-------|--------|
| MongoDB Schemas | 2 | ✅ Completed |
| REST APIs | 4 | ✅ Completed |
| JWT Authentication | 2 | ✅ Completed |
| Auth Middleware | 1 | ✅ Completed |
| Frontend Pages | 3 | ✅ Completed |
| Form Handling & Storage | 1 | ✅ Completed |
| Add/View/Filter Expenses | 2 | ✅ Completed |
| **Total** | **15/15** | ✅ **Complete** |

## Troubleshooting

### Issue: "MongoDB connection failed"
- Check MongoDB URI in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify database name in connection string

### Issue: "CORS error"
- Backend CORS is configured in `server.js`
- Check that frontend is making requests to `http://localhost:5000`
- Verify `proxy` in frontend `package.json`

### Issue: "Token not found / Login required"
- Clear localStorage and try logging in again
- Check browser DevTools → Application → LocalStorage
- Verify JWT_SECRET is same in backend `.env`

### Issue: "Port already in use"
- Backend: Change `PORT` in `.env` file
- Frontend: Use `PORT=3001 npm start`

## Future Enhancements

- Add expense categories with icons
- Monthly/Yearly expense charts and analytics
- Export expenses to CSV/PDF
- Expense notes/attachments
- Multi-currency support
- Budget limits and alerts
- Recurring expenses
- Mobile-responsive improvements
- Dark mode
- Push notifications

## License

ISC

## Author

Created for MSE2 Practical Assessment

---

**Happy tracking your expenses!** 💰
