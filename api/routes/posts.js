import express from 'express';
import { addPost, deletePost, getPosts, singlepost, updatepost } from '../controllers/post.js';
const postRoutes=express.Router()
postRoutes.get('/get-posts',getPosts);
postRoutes.get('/:id',singlepost);
postRoutes.post('/',addPost);
postRoutes.delete('/:id',deletePost);
postRoutes.put('/:id',updatepost)
export default postRoutes