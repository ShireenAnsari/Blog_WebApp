import express from 'express'
import { adduser } from '../controllers/user.js';
const routes=express.Router();
routes.get('/user',adduser)
export default routes;