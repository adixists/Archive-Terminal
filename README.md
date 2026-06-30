<div align="center">

# 🌌 Archive Terminal

**A futuristic full-stack CRUD application for managing your digital library of technical resources**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

*Cyberpunk-inspired digital archive with glassmorphism, neon glows & real-time CRUD operations*

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Aesthetic & Design](#-aesthetic--design)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Features](#-features)
- [Database Schema](#%EF%B8%8F-database-schema)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#%EF%B8%8F-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌟 About the Project

**Archive Terminal** is a highly polished, full-stack **MERN** (MongoDB, Express, React, Node.js) CRUD application designed to be your personal command center for cataloguing and managing technical resources — AI Models, Code Snippets, Research Papers, and Tools.

Built with a "vibe coding" philosophy, every pixel of this application has been crafted to feel like a piece of next-generation developer tooling — dark, sleek, responsive, and alive.

> *"The archive is always open. The terminal never sleeps."*

---

## 🎨 Aesthetic & Design

The interface strictly adheres to a **futuristic cyberpunk** aesthetic:

| Design Element | Implementation |
| :--- | :--- |
| **Background** | Ultra-dark charcoal `#0a0a0f` — nearly black but with subtle warmth |
| **Primary Accent** | Neon Cyan `#00f0ff` — used for buttons, borders, active states |
| **Secondary Accent** | Deep Purple `#a855f7` — used for Code Snippet category badges |
| **Status Colors** | 🟢 Active `#00ff88` · 🟡 In Review `#ffaa00` · ⚫ Archived `#8888aa` |
| **Glassmorphism** | `backdrop-filter: blur(16–20px)` with semi-transparent panel backgrounds |
| **Typography** | **JetBrains Mono** for headings & data, **Inter** for body text |
| **Animations** | Staggered card entrance, slide-up modals, pulse glows, hover lifts |
| **3D Branding** | CSS perspective transforms on the floating "AT" logo in the navbar |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Role |
| :--- | :---: | :--- |
| **React** | 18 | UI framework with functional components & hooks |
| **Vite** | 6.x | Lightning-fast dev server & build tool |
| **Tailwind CSS** | v4 | Utility-first styling with `@theme` CSS variable integration |
| **React Router** | v6 | Client-side routing |
| **Axios** | latest | HTTP client for API communication |

### Backend

| Technology | Version | Role |
| :--- | :---: | :--- |
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 4.x | RESTful API framework |
| **MongoDB** | 8.x | NoSQL document database |
| **Mongoose** | 8.x | ODM for schema definition & validation |
| **CORS** | latest | Cross-origin resource sharing middleware |
| **dotenv** | latest | Environment variable management |
| **nodemon** | latest | Auto-reloading dev server |

---

## ⚡ Features

### Core CRUD Operations
- ✅ **Create** — Animated neon slide-up modal form with full validation
- ✅ **Read** — Responsive masonry-style grid of glassmorphism data cards
- ✅ **Update** — Modal auto-populates with existing resource data for seamless editing
- ✅ **Delete** — Stylized confirmation dialog prevents accidental data loss

### UI/UX Highlights
- 🔍 **Real-time Search** — Client-side title filtering with instant visual feedback
- 📊 **Stats Bar** — Live counts of Active, Archived, and In Review resources
- 💀 **Skeleton Loading** — Animated placeholder cards shown while data is fetching
- 📭 **Empty States** — Context-aware messaging for empty archive vs. no search results
- 📱 **Responsive Grid** — 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- ♿ **Accessibility** — ARIA labels, roles, semantic HTML throughout

---

## 🗄️ Database Schema

The **Resource** Mongoose model represents a single item in the digital archive:

```js
{
  title:       String,   // required, trimmed
  category:    String,   // required — enum below
  description: String,   // required
  status:      String,   // default: 'Active' — enum below
  createdAt:   Date,     // default: Date.now
}
```

### Field Constraints

| Field | Type | Constraints | Values |
| :--- | :---: | :--- | :--- |
| `title` | `String` | Required, trimmed | Any string |
| `category` | `String` | Required, enum | `AI Model` · `Code Snippet` · `Research Paper` · `Tool` |
| `description` | `String` | Required | Any string |
| `status` | `String` | Optional, enum, default `Active` | `Active` · `Archived` · `In Review` |
| `createdAt` | `Date` | Auto-generated | `Date.now` |

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Status Codes |
| :---: | :--- | :--- | :--- |
| `GET` | `/resources` | Fetch all resources (newest first) | `200` |
| `GET` | `/resources/:id` | Fetch a single resource by ID | `200` · `404` |
| `POST` | `/resources` | Create a new resource | `201` · `500` |
| `PUT` | `/resources/:id` | Update a resource by ID | `200` · `404` · `500` |
| `DELETE` | `/resources/:id` | Delete a resource by ID | `200` · `404` · `500` |
| `GET` | `/` | API health check | `200` |

### Example Request — Create Resource

```bash
curl -X POST http://localhost:5000/api/resources \
  -H "Content-Type: application/json" \
  -d '{
    "title": "GPT-4 Vision",
    "category": "AI Model",
    "description": "Multimodal language model with image understanding.",
    "status": "Active"
  }'
```

### Example Response

```json
{
  "_id": "64a8f3c2b5e1234567890abc",
  "title": "GPT-4 Vision",
  "category": "AI Model",
  "description": "Multimodal language model with image understanding.",
  "status": "Active",
  "createdAt": "2024-07-08T10:30:00.000Z",
  "__v": 0
}
```

---

## ⚙️ Project Structure

```
CRUD/
│
├── 📁 server/                        # Node.js + Express Backend
│   ├── 📁 config/
│   │   └── db.js                     # MongoDB connection via Mongoose
│   ├── 📁 models/
│   │   └── Resource.js               # Mongoose schema & model definition
│   ├── 📁 routes/
│   │   └── resourceRoutes.js         # 5 RESTful CRUD API endpoints
│   ├── server.js                     # Express app entry point & middleware setup
│   ├── .env                          # Environment variables (not committed)
│   ├── package.json                  # Backend dependency manifest
│   └── package-lock.json
│
├── 📁 client/                        # React + Vite Frontend
│   ├── 📁 public/
│   │   └── favicon.svg
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx            # Fixed top nav with 3D floating "AT" logo
│   │   │   ├── SearchBar.jsx         # Neon-styled search with SVG icon & clear btn
│   │   │   ├── ResourceCard.jsx      # Glassmorphism card with badges & actions
│   │   │   ├── ResourceModal.jsx     # Create/Edit slide-up form modal
│   │   │   ├── ConfirmModal.jsx      # Delete confirmation with warning animation
│   │   │   └── Dashboard.jsx         # Main orchestrator — all CRUD state & logic
│   │   ├── 📁 services/
│   │   │   └── api.js                # Axios instance + CRUD helper functions
│   │   ├── App.jsx                   # React Router v6 setup & layout wrapper
│   │   ├── App.css                   # 15+ custom classes, 6 keyframe animations
│   │   ├── index.css                 # Tailwind v4 @import + 17 custom @theme tokens
│   │   └── main.jsx                  # React 18 DOM entry point
│   ├── index.html                    # Base HTML — Google Fonts, meta tags, FOUC fix
│   ├── vite.config.js                # Tailwind v4 plugin + /api proxy to port 5000
│   ├── package.json                  # Frontend dependency manifest
│   └── package-lock.json
│
├── .gitignore                        # Excludes node_modules, dist, .env
└── README.md                         # You are here 📍
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=nodedotjs) — [Download](https://nodejs.org/)
- ![MongoDB](https://img.shields.io/badge/MongoDB-v6+-47A248?style=flat-square&logo=mongodb) — [Download](https://www.mongodb.com/try/download/community) or use [Atlas](https://cloud.mongodb.com/)
- ![Git](https://img.shields.io/badge/Git-latest-F05032?style=flat-square&logo=git) — [Download](https://git-scm.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/adixists/CRUD-Application.git
cd CRUD-Application
```

---

### Step 2 — Setup the Backend

```bash
# Navigate into the server directory
cd server

# Install all backend dependencies
npm install

# Start the development server (with nodemon hot-reload)
npm run dev
```

> 🟢 Server will be live at **`http://localhost:5000`**

---

### Step 3 — Setup the Frontend

Open a **new terminal window** (keep the backend running):

```bash
# Navigate into the client directory
cd client

# Install all frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

> 🟢 Frontend will be live at **`http://localhost:5173`**

---

### Step 4 — Open the App

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser. Both servers must be running simultaneously.

The Vite dev server automatically **proxies all `/api` requests** to `http://localhost:5000`, so no manual configuration is needed during development.

---

## 🔐 Environment Variables

The `server/.env` file controls the backend configuration. A default version is included for local development:

```env
# MongoDB connection string
# Local:  mongodb://localhost:27017/archive_terminal
# Atlas:  mongodb+srv://<user>:<password>@cluster.mongodb.net/archive_terminal
MONGO_URI=mongodb://localhost:27017/archive_terminal

# Port for the Express server
PORT=5000
```

> ⚠️ **Never commit your real `.env` file to version control.** It is already listed in `.gitignore`.

---

## 📦 Available Scripts

### Backend (`/server`)

| Script | Command | Description |
| :--- | :--- | :--- |
| Start (production) | `npm start` | Runs with `node server.js` |
| Start (development) | `npm run dev` | Runs with `nodemon` (auto-reload) |

### Frontend (`/client`)

| Script | Command | Description |
| :--- | :--- | :--- |
| Development server | `npm run dev` | Starts Vite dev server on port 5173 |
| Production build | `npm run build` | Bundles app into `client/dist/` |
| Preview build | `npm run preview` | Locally previews the production build |

---

## ☁️ Deployment

### Recommended Stack

| Layer | Platform | Notes |
| :--- | :--- | :--- |
| 🖥️ **Frontend** | [Vercel](https://vercel.com) | Zero-config Vite/React support, auto-deploys from GitHub |
| ⚙️ **Backend** | [Render](https://render.com) | Free tier Node.js hosting, connects to GitHub |
| 🗄️ **Database** | [MongoDB Atlas](https://cloud.mongodb.com) | Free M0 cluster, 512 MB storage |

### Deployment Checklist

- [ ] Create a MongoDB Atlas cluster and get the connection string
- [ ] Set `MONGO_URI` environment variable on your backend host (Render)
- [ ] Update the Axios `baseURL` in `client/src/services/api.js` to your Render backend URL
- [ ] Update the `cors` origin in `server/server.js` to your Vercel frontend URL
- [ ] Deploy backend to Render (set environment variables in dashboard)
- [ ] Deploy frontend to Vercel (set root directory to `client/`)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. **Fork** the repository
2. **Create** a new feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ⚡ by [adixists](https://github.com/adixists)**

*If you found this project useful, please consider giving it a ⭐ on GitHub!*

</div>
