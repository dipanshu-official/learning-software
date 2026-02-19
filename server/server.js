import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoute from './src/routes/studentRoute.js';
import authRoutes from  './src/routes/authRoutes.js'

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
  { origin: process.env.CLIENT_URL || 'http://localhost:5173' }
));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});


//api routes
app.use('/students', studentRoute); 
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
