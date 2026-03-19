<div align="center">

# 🔨 Online Auction System

### *A full-stack MERN auction platform — real-time bidding, secure auth & a responsive dashboard*

<br>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=flat-square)](LICENSE)

<br>

<img src="https://img.shields.io/badge/Status-Active_Development-22c55e?style=for-the-badge" />

</div>

---

## 📌 Overview

The **Online Auction System** is a production-ready web application where users can list items for auction, place competitive bids, and track all activity through a personalized dashboard. Built on the MERN stack with JWT-based authentication and a responsive Tailwind UI, it provides a clean, scalable foundation for developers and a seamless experience for buyers and sellers alike.

---

## ✨ Key Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Secure Authentication** | Register, login & stay protected with JWT + bcrypt |
| 🏷️ | **Auction Management** | Full CRUD — create, update, and delete listings |
| 💸 | **Live Bidding** | Place and track bids on active auctions |
| 🗂️ | **Category Browsing** | Filter and explore auctions across organized categories |
| 📊 | **User Dashboard** | Monitor your listings, bids, and account in one place |
| 🔍 | **Search & Filter** | Find auctions by keyword, category, or status |
| 📱 | **Responsive Design** | Mobile-friendly interface powered by Tailwind CSS |
| 🛡️ | **Auth Middleware** | Protected routes enforced server-side |

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td valign="top" width="33%">

### 🖥️ Frontend
- ⚛️ React 18
- 🔁 React Router
- 📡 Axios
- 🎨 Tailwind CSS
- 🔷 Lucide React

    </td>
    <td valign="top" width="33%">

### ⚙️ Backend
- 🟢 Node.js
- 🚂 Express.js
- 🔒 JWT
- 🔑 Bcrypt
- 🌐 CORS

    </td>
    <td valign="top" width="33%">

### 🗄️ Database
- 🍃 MongoDB
- 📐 Mongoose ODM

    </td>
  </tr>
</table>

---

## 📁 Project Structure

```
online-auction-system/
│
├── client/                   ← React frontend
│   └── src/
│       ├── components/       ← Reusable UI components
│       ├── pages/            ← Page-level views
│       ├── services/         ← Axios API layer
│       ├── context/          ← Auth & global state
│       └── App.jsx
│
├── server/                   ← Node.js + Express backend
│   ├── config/               ← DB configuration
│   ├── models/               ← Mongoose schemas
│   ├── routes/               ← API route definitions
│   ├── middleware/           ← Auth & error handlers
│   ├── controllers/          ← Business logic
│   └── server.js             ← App entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

> Make sure the following are installed before continuing.

- ✅ [Node.js](https://nodejs.org/) v14+
- ✅ [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas))
- ✅ npm or yarn

---

### Installation

**Step 1 — Clone the repository**

```bash
git clone https://github.com/Kocherlasuhith12/online-auction-system.git
cd online-auction-system
```

**Step 2 — Install backend dependencies**

```bash
cd server
npm install
```

**Step 3 — Install frontend dependencies**

```bash
cd ../client
npm install
```

---

### ⚠️ Environment Configuration

> **Do not skip this step.** The app will not run without a valid `.env` file.

Create a file at `server/.env` with the following content:

```env
# ── Server ─────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── Database ────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/auction-system

# ── Auth ─────────────────────────────────────────
# Use a long, random string. Never commit this to version control.
JWT_SECRET=your_strong_secret_key_here
```

---

### ▶️ Running the App

Open two terminals:

**Terminal 1 — Backend**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend**
```bash
cd client
npm start
```

| Service | URL |
|---|---|
| 🌐 Frontend | http://localhost:3000 |
| 🔧 Backend API | http://localhost:5000 |

---

## 📡 API Reference

### 🔑 Authentication

| Method | Endpoint | Description | Auth |
|:---:|---|---|:---:|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive a JWT token | ❌ |

### 🏷️ Auctions

| Method | Endpoint | Description | Auth |
|:---:|---|---|:---:|
| `GET` | `/api/auctions` | Fetch all auctions | ❌ |
| `GET` | `/api/auctions/:id` | Fetch a single auction by ID | ❌ |
| `POST` | `/api/auctions` | Create a new auction | ✅ |
| `PUT` | `/api/auctions/:id` | Update an existing auction | ✅ |
| `DELETE` | `/api/auctions/:id` | Delete an auction | ✅ |

### 💸 Bids

| Method | Endpoint | Description | Auth |
|:---:|---|---|:---:|
| `POST` | `/api/bids/:auctionId` | Place a bid on an auction | ✅ |
| `GET` | `/api/bids/user/:userId` | Get all bids by a user | ✅ |

### 👤 Users

| Method | Endpoint | Description | Auth |
|:---:|---|---|:---:|
| `GET` | `/api/users/profile` | Get the current user's profile | ✅ |
| `PUT` | `/api/users/profile` | Update the current user's profile | ✅ |

---

## 🗺️ Roadmap

Planned features for upcoming releases:

- [ ] ⚡ Real-time bidding with WebSockets *(Socket.io)*
- [ ] 📧 Email notifications — bid alerts & auction results
- [ ] 💳 Payment integration *(Stripe / Razorpay)*
- [ ] 🖼️ Image upload for auction listings *(Cloudinary / S3)*
- [ ] ⏳ Live auction countdown timers
- [ ] ⭐ User ratings & reviews system
- [ ] 🛡️ Admin panel for platform management
- [ ] 🔎 Advanced search — price range, date, location
- [ ] 📜 Full bid history per auction
- [ ] 👁️ Watchlist / saved auctions

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

```bash
# 1. Fork the repo and clone it
git clone https://github.com/your-username/online-auction-system.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit with a descriptive message
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

> Please follow [Conventional Commits](https://www.conventionalcommits.org/) and ensure your code is tested before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

<div align="center">

<br>

**KKS Suhith Sravan Babu**

*B.Tech CSE · SRM Institute of Science and Technology, Trichy*

<br>

[![GitHub](https://img.shields.io/badge/GitHub-Kocherlasuhith12-181717?style=for-the-badge&logo=github)](https://github.com/Kocherlasuhith12)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kks--suhith-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/kks-suhith-15522b271)
[![Email](https://img.shields.io/badge/Email-suhithsravan%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:suhithsravan@gmail.com)

<br>

---

*⭐ Found this useful? Give it a star — it genuinely helps. ⭐*

</div>
