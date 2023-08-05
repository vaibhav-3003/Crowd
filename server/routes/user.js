import express from 'express';
import { register, login, followAndUnfollowUser } from "../controllers/user.js";
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.get('/follow/:id',isAuthenticated,followAndUnfollowUser)

export default router