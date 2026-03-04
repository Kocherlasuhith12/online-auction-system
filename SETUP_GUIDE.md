# Online Auction System - Setup Guide

## Quick Start Guide

### Prerequisites
Before you begin, make sure you have installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Free cloud database) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download here](https://git-scm.com/)

### Step-by-Step Installation

#### 1. Upload to GitHub

First, let's get your project on GitHub:

```bash
# Navigate to the project directory
cd online-auction-system

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Online Auction System"

# Create a new repository on GitHub (do this on github.com)
# Then connect your local repo to GitHub:
git remote add origin https://github.com/Kocherlasuhith12/online-auction-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env file with your settings
# Use any text editor (nano, vim, notepad, VS Code, etc.)
nano .env
```

**For Local MongoDB (.env configuration):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auction-system
JWT_SECRET=your_super_secret_key_change_this_12345
NODE_ENV=development
```

**For MongoDB Atlas (.env configuration):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auction-system?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_this_12345
NODE_ENV=development
```

```bash
# Start the backend server
npm run dev

# You should see:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

#### 3. Frontend Setup

Open a **new terminal window** and:

```bash
# Navigate to client directory from project root
cd client

# Install dependencies
npm install

# Start the frontend
npm start

# The app will open at http://localhost:3000
```

### MongoDB Atlas Setup (Cloud Database - Recommended)

1. **Sign up** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. **Create a free cluster** (M0 Sandbox - Free forever)
3. **Create a database user:**
   - Click "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Username: `auctionuser`
   - Password: Create a strong password
4. **Whitelist your IP:**
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
5. **Get connection string:**
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Use this in your `.env` file

### Testing the Application

1. **Open browser** at http://localhost:3000
2. **Register** a new account
3. **Login** with your credentials
4. **Create an auction**
5. **Browse auctions** and place bids
6. **Check dashboard** to see your auctions and bids

### Common Issues & Solutions

#### Issue: MongoDB connection error
**Solution:**
- If using local MongoDB: Make sure MongoDB is running
  ```bash
  # Start MongoDB (varies by OS)
  # macOS with Homebrew:
  brew services start mongodb-community
  
  # Windows: MongoDB runs as a service
  # Linux:
  sudo systemctl start mongod
  ```
- If using Atlas: Check your connection string and network access

#### Issue: Port already in use
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

#### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Project Structure Explained

```
online-auction-system/
├── client/                     # React Frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── AuctionCard.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Auctions.jsx
│   │   │   ├── AuctionDetails.jsx
│   │   │   ├── CreateAuction.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/          # API service functions
│   │   │   ├── authService.js
│   │   │   ├── auctionService.js
│   │   │   └── bidService.js
│   │   ├── context/           # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx            # Main app component
│   │   └── index.jsx          # Entry point
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── config/                # Configuration
│   │   └── db.js
│   ├── models/                # MongoDB Models
│   │   ├── User.js
│   │   ├── Auction.js
│   │   └── Bid.js
│   ├── routes/                # API Routes
│   │   ├── auth.js
│   │   ├── auctions.js
│   │   ├── bids.js
│   │   └── users.js
│   ├── controllers/           # Route Controllers
│   │   ├── authController.js
│   │   ├── auctionController.js
│   │   ├── bidController.js
│   │   └── userController.js
│   ├── middleware/            # Custom Middleware
│   │   └── auth.js
│   ├── server.js              # Server entry point
│   └── package.json
│
├── README.md                   # Project documentation
├── SETUP_GUIDE.md             # This file
└── .gitignore                 # Git ignore rules
```

### API Endpoints Reference

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (auth required)

#### Auctions
- `GET /api/auctions` - Get all auctions (with filters)
- `GET /api/auctions/:id` - Get single auction
- `POST /api/auctions` - Create auction (auth required)
- `PUT /api/auctions/:id` - Update auction (auth required)
- `DELETE /api/auctions/:id` - Delete auction (auth required)
- `GET /api/auctions/user/:userId` - Get user's auctions

#### Bids
- `POST /api/bids/:auctionId` - Place bid (auth required)
- `GET /api/bids/auction/:auctionId` - Get auction bids
- `GET /api/bids/user/:userId` - Get user's bids
- `GET /api/bids/winning/:userId` - Get user's winning bids (auth required)

#### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `GET /api/users/:id` - Get user by ID

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload. Changes will reflect automatically.

2. **Database GUI**: Use MongoDB Compass to view your database visually
   - [Download MongoDB Compass](https://www.mongodb.com/products/compass)

3. **API Testing**: Use Postman or Thunder Client to test API endpoints
   - [Download Postman](https://www.postman.com/downloads/)

4. **Debugging**:
   - Backend: Check terminal running `npm run dev`
   - Frontend: Check browser console (F12)
   - MongoDB: Check MongoDB logs

### Deployment Options

#### Deploy Backend (Heroku)
```bash
# Install Heroku CLI
# Then:
heroku create auction-system-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git subtree push --prefix server heroku main
```

#### Deploy Frontend (Vercel/Netlify)
```bash
# Build for production
cd client
npm run build

# Deploy to Vercel
npx vercel

# Or deploy to Netlify
# Upload the 'build' folder to Netlify
```

### Next Steps

1. ✅ Get the project running locally
2. ✅ Upload to GitHub
3. 🎯 Customize the design
4. 🎯 Add more features (see README.md)
5. 🎯 Deploy to production

### Getting Help

- **GitHub Issues**: Create an issue in your repository
- **Email**: kocherlasravan@gmail.com
- **LinkedIn**: [kks-suhith-15522b271](https://linkedin.com/in/kks-suhith-15522b271)

### License

This project is open source and available under the MIT License.

---

**Created by**: Babuuu (Kocherlasuhith12)
**Institution**: SRM Institute of Science and Technology, Trichy
**Year**: 3rd Year CSE (2027 Graduate)

Good luck with your project! 🚀
