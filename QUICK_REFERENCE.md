# Quick Reference Card - Online Auction System

## 🚀 Getting Started in 5 Minutes

### 1️⃣ Upload to GitHub
```bash
cd online-auction-system
git init
git add .
git commit -m "Initial commit: Online Auction System"
git remote add origin https://github.com/Kocherlasuhith12/online-auction-system.git
git branch -M main
git push -u origin main
```

### 2️⃣ Start Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env file (change JWT_SECRET and set MONGODB_URI)
npm run dev
```

### 3️⃣ Start Frontend (in new terminal)
```bash
cd client
npm install
npm start
```

### 4️⃣ Open Browser
```
http://localhost:3000
```

## 📝 Environment Variables (.env)

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auction-system
JWT_SECRET=change_this_to_something_very_secret_and_random
NODE_ENV=development
```

## 🗄️ MongoDB Options

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# Then start it:
mongod
```

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Sign up at mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Get connection string
5. Update MONGODB_URI in .env

## 📦 NPM Commands

### Backend (server/)
```bash
npm install          # Install dependencies
npm start            # Start production server
npm run dev          # Start development server (with auto-reload)
```

### Frontend (client/)
```bash
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

## 🔧 Troubleshooting

### MongoDB won't connect?
- Check if MongoDB is running: `mongod`
- Check connection string in .env
- For Atlas: Whitelist your IP address

### Port already in use?
```bash
# Find and kill process on port 5000
lsof -i :5000        # Mac/Linux
netstat -ano | findstr :5000  # Windows
```

### Dependencies won't install?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Access URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 👤 Default Test User

Register your own account at:
http://localhost:3000/register

## 📚 Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## 📁 Important Files

```
.env                    → Backend environment variables
client/src/App.jsx      → Main React component
server/server.js        → Backend entry point
server/models/          → Database models
client/src/pages/       → Page components
```

## 🎯 Features

✅ User authentication (register/login)
✅ Create auctions
✅ Browse and search auctions
✅ Place bids
✅ View dashboard
✅ Filter by category
✅ Real-time bid updates

## 🔐 Security Notes

⚠️ Change JWT_SECRET in production
⚠️ Use strong passwords
⚠️ Enable HTTPS in production
⚠️ Use environment variables for secrets

## 📞 Support

- GitHub: Kocherlasuhith12
- Email: kocherlasravan@gmail.com
- LinkedIn: kks-suhith-15522b271

---
Created by Babuuu | SRM Institute of Science and Technology
