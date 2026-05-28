import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import studentRoute from './src/routes/studentRoute.js';
import authRoutes from './src/routes/authRoutes.js';
import instituteRoutes from './src/routes/instituteRoutes.js';
import connectDB from './src/config/db.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// Routes
app.use('/api/students', studentRoute);
app.use('/api/auth', authRoutes);
app.use('/api/institutes', instituteRoutes);

app.get('/', (req, res) => {
  res.send("Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});