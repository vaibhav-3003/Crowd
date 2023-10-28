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
  getAllUsers,
  forgotPassword,
  resetPassword,
  updateProfileImage,
  userFollowed,
  deleteProfilePicture
} from "../controllers/user.js";
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.get('/logout',logout)

router.get('/follow/:id',isAuthenticated,followAndUnfollowUser)

router.get('/followed/:followerUsername',isAuthenticated,userFollowed)

router.put('/update/password',isAuthenticated,updatePassword)

router.put('/update/profile',isAuthenticated,updateProfile)

router.put('/update/profile/photo',isAuthenticated,updateProfileImage)

router.delete('/delete/profile/photo',isAuthenticated,deleteProfilePicture)

router.delete('/delete/me',isAuthenticated,deleteMyProfile)

router.get('/me',isAuthenticated,myProfile)

router.get('/user/:username',getUserProfile)

router.get('/users',isAuthenticated,getAllUsers)

router.post('/forgot/password',forgotPassword)

router.put('/password/reset/:token',resetPassword)

export default router