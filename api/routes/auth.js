import express from "express";
import { login, register } from "../controllers/auth.js";
const authroutes=express.Router();
authroutes.post('/register',register);
authroutes.post('/login',login);
export default authroutes