const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:3000',
  'https://freshbind.com',
  'https://backend.freshbind.com'
];

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: isProduction,  // true in production (requires HTTPS)
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? '.freshbind.com' : undefined
  }
}));

// Routes
app.use('/api', productRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
