
# ⚡ URL Shortener Frontend

This is the **frontend** of the Micro-SaaS URL Shortener application built using **React + Vite**. It allows users to shorten URLs, log in/log out, and view click analytics with a beautiful and responsive UI.

---

## 🚀 Features

- 🔐 **User Authentication** (Login via modal)
- ✂️ **URL Shortening** with copy-to-clipboard functionality
- 📊 **Click Analytics** with Chart.js
- 🧾 **Table View** of all shortened URLs with counts
- 🧠 **Redux Toolkit** for global state management
- 🎨 **Tailwind CSS** for styling
- 🌈 Smooth animations and responsive design

---

## 📁 Folder Structure

```
src/
├── assets/           # Static assets (e.g., icons)
│   └── react.svg
├── components/       # Reusable components
│   ├── Chart.jsx
│   ├── Navbar.jsx
│   ├── Table.jsx
│   └── UrlForm.jsx
├── redux/            # Redux slices and store config
│   ├── authSlice.js
│   ├── clickSlice.js
│   ├── store.js
│   └── urlSlice.js
├── App.jsx           # Main application wrapper
├── App.css           # Global styles
├── index.css         # Tailwind base
├── main.jsx          # Vite entry point
```

---

## 🔧 Environment Setup

### ✅ Prerequisites

- Node.js >= 16.x
- NPM >= 8.x

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

> You can set this URL according to your backend deployment.

---

## 💻 Running the App

```bash
npm run dev
```

The app will start on `http://localhost:5173`.

---

## 🔐 Authentication

Login is handled using Redux and shown as a modal popup. The credentials are sent to the backend API. Upon successful login, a token is stored in memory and used to access protected features like shortening URLs and viewing analytics.

---

## 🔍 Functional Highlights

| Feature        | Description                                         |
|----------------|-----------------------------------------------------|
| Login Modal    | Toggle-based modal for user login                  |
| Shorten URL    | Accepts long URL and returns short URL             |
| Table Display  | List of user's URLs with original, short, and clicks |
| Analytics      | Displays click stats via pie chart                 |
| Logout         | Clears auth state and returns to guest mode        |

---

## 📸 Screenshots (Optional)

> Add if needed – UI of login, dashboard, chart, etc.

---

## 📬 Feedback for Reviewer

- The project is fully modular with separation of components and slices.
- Clean and reusable code practices were followed.
- Integrated smooth transitions and conditional rendering logic.
- Open to adding features like QR generation, pagination, or dark mode upon feedback.

---

# 📦 URL Shortener Backend

This is the **Backend API** for the URL Shortener application. It provides RESTful endpoints for URL shortening, user authentication, and click tracking. Built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- 🔐 User Authentication (Login)
- 🔗 URL Shortening and Redirection
- 📊 Click Tracking (Analytics)
- 🧩 Modular Code Structure
- 🌐 CORS Enabled for Frontend Communication

---

## 📁 Project Structure

```
backend/
│
├── controllers/
│   └── url.js             # Business logic for shortening and redirecting URLs
│
├── models/
│   ├── Click.js           # Mongoose model for storing click stats
│   ├── Url.js             # Mongoose model for shortened URLs
│   └── User.js            # Mongoose model for users
│
├── routes/
│   └── routes.js          # All route definitions (URLs, login, analytics)
│
├── connection.js          # MongoDB database connection
├── index.js               # Main server entry point
├── .env                   # Environment variables (MONGO_URI, PORT, JWT_SECRET)
├── package.json           # Project metadata and dependencies
└── .gitignore             # Files and folders to ignore in git
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/IndrajeetNinjaCoder/URLShortener_backend.git
cd URLShortener_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/url-shortener
JWT_SECRET=your_jwt_secret
```

### 4. Run the Server

```bash
npm start
```

The server will run at `http://localhost:5000`.

---

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` — Authenticate user

### URL Management

- `POST /api/shorten` — Shorten a long URL
- `GET /:shortId` — Redirect to original URL
- `GET /api/url/all` — Get all shortened URLs
- `GET /api/url/create` — Short an URL (authenticated)
- `GET /api/clicks` — Get click analytics

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **Dotenv** for environment management

---


