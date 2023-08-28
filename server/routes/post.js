import express from 'express';
import {commentOnPost, createPost, deleteComment, deletePost, fetchUserPosts, getPost, getPostOfFollowing, likeAndUnlikePost, postLiked, updateCaption} from '../controllers/post.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/post/upload',isAuthenticated,createPost)

router.get('/post/like/:id',isAuthenticated,likeAndUnlikePost)

router.get('/post/liked/:id',isAuthenticated,postLiked)

router.get('/:username/posts',fetchUserPosts)

router.get('/post/:id',isAuthenticated,getPost)

router.put('/post/update/:id',isAuthenticated,updateCaption)

router.delete('/post/delete/:id',isAuthenticated,deletePost)

router.get('/posts',isAuthenticated,getPostOfFollowing)

router.put('/post/comment/:id',isAuthenticated,commentOnPost)

router.delete("/post/comment/:id", isAuthenticated,deleteComment);

export default router