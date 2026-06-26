# 🌌 Archive Terminal

Archive Terminal is a highly polished, full-stack MERN CRUD application designed to manage a digital library of technical resources (such as AI Models, Code Snippets, Research Papers, and Tools). It features a futuristic "vibe coding" / cyberpunk-inspired aesthetic with rich glassmorphism effects, neon glow highlights, custom 3D animations, and monospace typography.

---

## 📸 Interface Preview & Aesthetic

- **Theme:** Ultra-dark theme (`#0a0a0f`) with glowing neon cyan (`#00f0ff`), deep purple (`#a855f7`), and accent status indicators.
- **Glassmorphism:** Frosty backdrops (`backdrop-blur`) and semi-transparent panels.
- **Micro-interactions:** Staggered card entry animations, animated neon button borders, glowing input fields on focus, and hover lift effects.
- **3D Branding:** A floating 3D "AT" logo utilizing CSS perspective transforms and interactive axis tilt effects.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 (Functional Components, Hooks)
- **Styling:** Tailwind CSS v4 (using CSS variables & direct `@theme` integration)
- **Routing:** React Router v6
- **HTTP Client:** Axios (configured with baseURL and request proxies)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM:** Mongoose

---

## 🗄️ Database Schema (Resource Model)

Each technical resource is structured according to the following Mongoose schema:

| Field | Type | Description / Constraints |
| :--- | :--- | :--- |
| `title` | `String` | Required, trimmed, name of the resource. |
| `category` | `String` | Required. Enum: `['AI Model', 'Code Snippet', 'Research Paper', 'Tool']`. |
| `description` | `String` | Required. Explanation of the resource. |
| `status` | `String` | Default: `'Active'`. Enum: `['Archived', 'Active', 'In Review']`. |
| `createdAt` | `Date` | Default: `Date.now`. Auto-generated timestamp. |

---

## ⚡ Core Functionality (CRUD)

- **Create:** Click `ADD RESOURCE` to launch a fully validated, animated neon slide-up modal.
- **Read:** Grid layout featuring custom data cards with status pills and color-coded category badges. Real-time client-side search filters the cards instantaneously by title.
- **Update:** Edit button opens the modal pre-populated with MongoDB data to execute updates.
- **Delete:** Clicking delete prompts a styled confirmation modal to prevent accidental removal from the database.

---

## ⚙️ Project Structure

```
CRUD/
├── server/                          # Node.js + Express Backend
│   ├── config/db.js                 # MongoDB connection logic
│   ├── models/Resource.js           # Mongoose Resource Model
│   ├── routes/resourceRoutes.js     # Express routes for CRUD endpoints
│   ├── server.js                    # Express server entry point
│   ├── .env                         # Server environment variables
│   └── package.json                 # Backend dependencies
│
├── client/                          # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Fixed navigation bar with 3D logo
│   │   │   ├── SearchBar.jsx        # Terminal-style search input
│   │   │   ├── ResourceCard.jsx     # Glowing interactive data card
│   │   │   ├── ResourceModal.jsx    # Create/Edit slide-up form modal
│   │   │   ├── ConfirmModal.jsx     # Stylized warning/delete dialog
│   │   │   └── Dashboard.jsx        # Core state manager & orchestration hub
│   │   ├── services/api.js          # Axios API caller mapping endpoints
│   │   ├── App.jsx                  # Main router setup
│   │   ├── App.css                  # Custom keyframes, 3D logo, glass styles
│   │   ├── index.css                # Tailwind directives and theme overrides
│   │   └── main.jsx                 # React DOM bootstrapper
│   ├── index.html                   # HTML entry point (embedded fonts & meta)
│   ├── vite.config.js               # Dev server configuration & proxy settings
│   └── package.json                 # Frontend dependencies
│
└── README.md                        # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
1. **Node.js** (v18.x or higher)
2. **MongoDB** installed and running locally on port `27017` (or MongoDB Atlas connection string).

### 1. Setup the Backend
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. A default `.env` is provided:
   ```env
   MONGO_URI=mongodb://localhost:27017/archive_terminal
   PORT=5000
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000`.*

### 2. Setup the Frontend
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will launch at `http://localhost:5173`.*

---

## 📈 Deployment Recommendations

### Frontend
- **Platform:** Vercel / Netlify
- **Environment variables:** None needed for static build. Adjust Axios `baseURL` in `client/src/services/api.js` to point to production backend if deployed separately.

### Backend
- **Platform:** Render / Heroku / railway.app
- **Environment variables:** Config `MONGO_URI` and `PORT`.

### Database
- **Platform:** MongoDB Atlas (Cloud database)
- Configure network access to allow access from any IP (`0.0.0.0/0`) during initial deployment config.
