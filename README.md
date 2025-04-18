# ⚡ URL Shortener
Live here: https://shortify-your-url.netlify.app/

A **Micro-SaaS URL Shortener** built with the **MERN stack** to simplify long URLs, track analytics, and manage links—all within a beautiful and responsive interface.

This project is divided into two main parts:
- 🔹 **Frontend** – Built with **React + Vite**
- 🔹 **Backend** – Built with **Node.js + Express + MongoDB**

---

## ✨ Features at a Glance

### 🔐 Authentication
- Secure user login via modal (JWT-based)

### ✂️ URL Shortening
- Instantly shorten long URLs
- Copy-to-clipboard functionality

### 📊 Analytics
- Track click stats per shortened URL
- Interactive pie charts via **Chart.js**

### 🧾 URL Dashboard
- View all your links in a table
- Original URL, shortened URL, and click counts

### ⚙️ Tech Stack
- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **Styling**: Tailwind CSS
- **Analytics**: Chart.js

---

# 🖥️ Frontend – React + Vite

## 🚀 Features

- User login via modal
- Shorten URL with instant feedback
- Dashboard with table view and click analytics
- Responsive design with animations
- Global state with **Redux Toolkit**

## 🔧 Setup Instructions

### ✅ Prerequisites

- Node.js `>= 16.x`
- NPM `>= 8.x`

### 📦 Installation

```bash
npm install
```

### 🧪 Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> Update this to match your backend deployment URL if hosted.

### 💻 Run the Development Server

```bash
npm run dev
```

> App will run on `http://localhost:5173`.

---

# 🔐 Authentication Flow

- Login handled via Redux modal
- JWT token stored in `localStorage`
- Token used to access protected routes (e.g. URL creation, analytics)

---

## 🔍 Functional Highlights

| Feature         | Description                                               |
|-----------------|-----------------------------------------------------------|
| **Login Modal** | Lightweight modal popup for user authentication           |
| **Shorten URL** | Accepts long URLs and returns shortened version           |
| **Table View**  | Displays user's links with click count and redirect URLs  |
| **Analytics**   | Real-time stats via Chart.js                              |
| **Logout**      | Clears auth data and reverts to guest mode                |

---

# 📦 Backend – Node.js + Express

A RESTful API built to handle user login, URL shortening, and click tracking.

## 🧩 Key Features

- Secure JWT-based login
- URL shortening and redirection
- Click tracking and analytics
- Modular codebase with middleware
- CORS support for frontend-backend communication

## 🔧 Setup Instructions

### ✅ Prerequisites

- Node.js `>= 16.x`
- MongoDB instance (local or Atlas)

### 📦 Installation

```bash
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the root of the backend directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/url-shortener
JWT_SECRET=your_jwt_secret
```

> Replace credentials with your MongoDB Atlas URI and secure JWT secret.

### 🚀 Run the Server

```bash
npm start
```

> Server will start at `http://localhost:5000`.

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/auth/login`   | User login           |

### URL Routes
| Method | Endpoint             | Description                         |
|--------|----------------------|-------------------------------------|
| POST   | `/api/shorten`       | Create a new short URL              |
| GET    | `/:shortId`          | Redirect to original URL            |
| GET    | `/api/url/all`       | Get all user-specific URLs          |
| GET    | `/api/url/create`    | Authenticated URL creation          |
| GET    | `/api/clicks`        | Get data of all clicks              |

---

# 🔧 Project Structure

```bash
.
├── frontend/         # React + Vite App
│   └── src/
├── backend/          # Node.js + Express API
│   └── routes/
│   └── controllers/
│   └── models/
│   └── middleware/
└── README.md
```

