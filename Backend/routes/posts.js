import express from "express";
import { getPost, createPost, updatePost, deletePost, likePost } from "../controller/posts.js";
const router = express.Router();
import auth from '../middleware/auth.js'

router.get('/', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)


export default router;