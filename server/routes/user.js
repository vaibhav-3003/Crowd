import express from 'express';
import {
  register,
  login,
  followAndUnfollowUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers
} from "../controllers/user.js";
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.get('/logout',logout)

router.get('/follow/:id',isAuthenticated,followAndUnfollowUser)

router.put('/update/password',isAuthenticated,updatePassword)

router.put('/update/profile',isAuthenticated,updateProfile)

router.delete('/delete/me',isAuthenticated,deleteMyProfile)

router.get('/me',isAuthenticated,myProfile)

router.get('/user/:id',isAuthenticated,getUserProfile)

router.get('/users',isAuthenticated,getAllUsers)

export default router