import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import dotenv from 'dotenv';

// Memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Koneksi ke database MongoDB menggunakan URL dari .env
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Database terkoneksi'))
    .catch((error) => console.log('Koneksi database gagal:', error));

// Middleware
app.use(cors({
    origin: 'https://mern-crud-frontend-mu.vercel.app/'
  }));
  
app.use(express.json());

// Menggunakan router untuk rute '/api'
app.use('/api', userRoutes);

// Menjalankan server
app.listen(port, () => {
    console.log(`Server sedang berjalan di port ${port}`);
    if (mongoose.connection.readyState === 1) {
        console.log('Koneksi ke database berhasil.');
    } else {
        console.log('Koneksi ke database belum berhasil.');
    }
});
