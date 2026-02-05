import express from 'express'
import {protect} from '../Middleware/protect.js'
import { isAdmin } from '../Middleware/admin.js';
import { authSignup, authLogin } from '../Controller/authUserController.js';    

const authUserRoute = express.Router()
// http://localhost:5000/api/auth/authsign
authUserRoute.post('/authsign', authSignup)
authUserRoute.post('/ccc', authLogin)

authUserRoute.get("/profile", protect,(req, res) => {
    res.json({message: "Protected profile", user: req.user})
})

authUserRoute.get('/admin', protect, isAdmin, (req, res) => {
    res.json({message: "Welcome admin user",user: req.role})
})

export default authUserRoute;
