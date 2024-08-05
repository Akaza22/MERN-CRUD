import express from 'express';
import { getUsers, getUserById, saveUser, updateUser, deleteUser } from '../controllers/userController.js'; // Pastikan ekstensi .js ada

const router = express.Router();

// Rute untuk mendapatkan daftar pengguna
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;
