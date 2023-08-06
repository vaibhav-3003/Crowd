import express from 'express';
import {createPost, deletePost, getPostOfFollowing, likeAndUnlikePost, updateCaption} from '../controllers/post.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/post/upload',isAuthenticated,createPost)

router.get('/post/:id',isAuthenticated,likeAndUnlikePost)

router.put('/post/:id',isAuthenticated,updateCaption)

router.delete('/post/:id',isAuthenticated,deletePost)

router.get('/posts',isAuthenticated,getPostOfFollowing)

export default router