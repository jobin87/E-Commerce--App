import express from 'express';
import {  login, logout, sessions, signup, updateProfile, upload, verifyEmail } from '../controllers/authController';
import {  checkSession } from '../middlewares/authMiddlewares';

const authRoutes = express.Router();

  // ✅ Route for updating profile (with image & role update)
authRoutes.post('/registration', signup);
authRoutes.get('/verify-email', verifyEmail);
authRoutes.delete('/logout-current-session', checkSession, logout);
authRoutes.post('/login', login);
authRoutes.get('/getSessions',checkSession,sessions);


// authRoutes.post('/checkemail', checkEmailExist);
// authRoutes.post('/logout',logout)

export default authRoutes;