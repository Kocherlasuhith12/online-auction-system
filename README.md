# Online Auction System

A full-stack online auction platform built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Auction Management**: Create, view, and manage auctions
- **Real-time Bidding**: Place bids on active auctions
- **Auction Categories**: Browse auctions by category
- **User Dashboard**: View your auctions and bids
- **Search & Filter**: Search auctions and filter by category/status
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled

## Project Structure

```
online-auction-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── App.jsx
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── controllers/      # Route controllers
│   └── server.js
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd online-auction-system
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auction-system
   JWT_SECRET=your_jwt_secret_key_here_change_this
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Run the application**

   **Terminal 1 - Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start Frontend:**
   ```bash
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Auctions
- `GET /api/auctions` - Get all auctions
- `GET /api/auctions/:id` - Get single auction
- `POST /api/auctions` - Create auction (auth required)
- `PUT /api/auctions/:id` - Update auction (auth required)
- `DELETE /api/auctions/:id` - Delete auction (auth required)

### Bids
- `POST /api/bids/:auctionId` - Place bid (auth required)
- `GET /api/bids/user/:userId` - Get user bids

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)

## Usage

1. **Register/Login**: Create an account or login
2. **Browse Auctions**: View all active auctions
3. **Create Auction**: Click "Create Auction" to list items
4. **Place Bids**: Enter bid amount on auction details page
5. **Dashboard**: View your auctions and bids in the dashboard

## Features to Add (Future Enhancements)

- [ ] Real-time bidding with WebSockets
- [ ] Email notifications
- [ ] Payment integration (Stripe/PayPal)
- [ ] Image upload for auction items
- [ ] Auction timer/countdown
- [ ] User ratings and reviews
- [ ] Admin panel
- [ ] Advanced search filters
- [ ] Bid history
- [ ] Watchlist functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Babuuu - [GitHub](https://github.com/Kocherlasuhith12)

## Contact

- Email: kocherlasravan@gmail.com
- Phone: 9014886099
- LinkedIn: [kks-suhith-15522b271](https://linkedin.com/in/kks-suhith-15522b271)
