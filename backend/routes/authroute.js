import express from 'express';
import { signup, login, logout, updateProfile, checkAuth } from '../controllers/authcontroll.js';
import protectRoute from '../middleware/authprotect.js'

const route = express.Router()

route.post("/signup", signup)

route.post("/login", login)

route.post("/logout", logout)

route.put("/update-pfp", protectRoute, updateProfile)

route.get("/check", protectRoute, checkAuth);

export default route