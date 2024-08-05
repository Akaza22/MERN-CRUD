import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log('Database connection failed:', error));

// Configure CORS
app.use(cors());

// Middleware
app.use(express.json());

// API routes
app.use('/api', userRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
