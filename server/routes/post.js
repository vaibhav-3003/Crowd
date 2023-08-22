import express from 'express';
import {commentOnPost, createPost, deleteComment, deletePost, fetchUserPosts, getPostOfFollowing, likeAndUnlikePost, updateCaption} from '../controllers/post.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/post/upload',isAuthenticated,createPost)

router.get('/post/:id',isAuthenticated,likeAndUnlikePost)

router.get('/:username/posts',fetchUserPosts)

router.put('/post/:id',isAuthenticated,updateCaption)

router.delete('/post/:id',isAuthenticated,deletePost)

router.get('/posts',isAuthenticated,getPostOfFollowing)

router.put('/post/comment/:id',isAuthenticated,commentOnPost)

router.delete("/post/comment/:id", isAuthenticated,deleteComment);

export default router