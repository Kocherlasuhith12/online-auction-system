<div align="center">

# 🔨 Online Auction System

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

**A full-stack, real-time online auction platform — built for buyers, sellers, and developers who want a clean, production-ready foundation.**

</div>

---

## 📌 Overview

The **Online Auction System** is a feature-rich web application that enables users to list items for auction, place competitive bids, and manage their activity through a personalized dashboard. Built on a modern MERN stack with JWT-based authentication and a responsive UI, it provides a solid, scalable foundation for anyone looking to run or extend a real-world auction platform.

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Register, log in, and stay protected with JWT-based auth and bcrypt password hashing
- 🏷️ **Auction Management** — Create, update, and delete auction listings with full CRUD support
- 💸 **Live Bidding** — Place and track bids on active auctions in real time
- 🗂️ **Category Browsing** — Filter and explore auctions across organized categories
- 📊 **User Dashboard** — Monitor your active listings, bids placed, and account details in one place
- 🔍 **Search & Filter** — Find auctions quickly by keyword, category, or status
- 📱 **Responsive Design** — Fully mobile-friendly interface powered by Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | Component-based UI |
| React Router | Client-side routing |
| Axios | HTTP requests to backend API |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| JWT | Stateless authentication |
| Bcrypt | Password hashing |
| CORS | Cross-origin resource sharing |

### Database
| Technology | Purpose |
|---|---|
| MongoDB | NoSQL document database |
| Mongoose | ODM for schema modeling |

---

## 📁 Project Structure

```
online-auction-system/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page-level components
│       ├── services/        # Axios API service layer
│       ├── context/         # React Context (auth, state)
│       └── App.jsx
│
├── server/                  # Node.js + Express backend
│   ├── config/              # DB and app configuration
│   ├── models/              # Mongoose schemas & models
│   ├── routes/              # API route definitions
│   ├── middleware/          # Auth & error middleware
│   ├── controllers/         # Business logic handlers
│   └── server.js            # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v14 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or [Atlas](https://www.mongodb.com/atlas))
- npm or yarn

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Kocherlasuhith12/online-auction-system.git
cd online-auction-system
```

**2. Install backend dependencies**

```bash
cd server
npm install
```

**3. Install frontend dependencies**

```bash
cd ../client
npm install
```

---

### ⚙️ Environment Configuration

> **⚠️ Critical Step — Do not skip this.**

Create a `.env` file inside the `/server` directory and add the following:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auction-system
JWT_SECRET=your_strong_secret_key_here
NODE_ENV=development
```

> Replace `your_strong_secret_key_here` with a long, random string. Never commit this file to version control.

---

### Running the Application

**Terminal 1 — Start the backend server:**

```bash
cd server
npm run dev
```

**Terminal 2 — Start the frontend dev server:**

```bash
cd client
npm start
```

**Access the app:**

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

## 📡 API Reference

### 🔑 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |

### 🏷️ Auctions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/auctions` | Fetch all auctions | ❌ |
| `GET` | `/api/auctions/:id` | Fetch a single auction by ID | ❌ |
| `POST` | `/api/auctions` | Create a new auction | ✅ |
| `PUT` | `/api/auctions/:id` | Update an existing auction | ✅ |
| `DELETE` | `/api/auctions/:id` | Delete an auction | ✅ |

### 💸 Bids

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/bids/:auctionId` | Place a bid on an auction | ✅ |
| `GET` | `/api/bids/user/:userId` | Get all bids by a user | ✅ |

### 👤 Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/users/profile` | Retrieve current user's profile | ✅ |
| `PUT` | `/api/users/profile` | Update current user's profile | ✅ |

---

## 🗺️ Roadmap

Planned features and improvements for upcoming releases:

- [ ] ⚡ Real-time bidding with WebSockets (Socket.io)
- [ ] 📧 Email notifications (bid alerts, auction results)
- [ ] 💳 Payment integration (Stripe / Razorpay)
- [ ] 🖼️ Image upload for auction items (Cloudinary / AWS S3)
- [ ] ⏳ Auction countdown timers
- [ ] ⭐ User ratings and reviews
- [ ] 🛡️ Admin panel for platform management
- [ ] 🔎 Advanced search filters (price range, date, location)
- [ ] 📜 Full bid history per auction
- [ ] 👁️ Watchlist / saved auctions functionality

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get involved:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a descriptive message
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request and describe your changes clearly

> Please follow standard commit conventions and ensure your code is tested before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

**KKS Suhith Sravan Babu**

[![GitHub](https://img.shields.io/badge/GitHub-Kocherlasuhith12-181717?style=for-the-badge&logo=github)](https://github.com/Kocherlasuhith12)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kks--suhith-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/kks-suhith-15522b271)
[![Email](https://img.shields.io/badge/Email-suhithsravan@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:suhithsravan@gmail.com)

</div>

---

<div align="center">

⭐ **If you found this project useful, consider giving it a star!** ⭐

</div>
