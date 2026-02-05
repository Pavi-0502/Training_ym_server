import { createUserController,getAllUsersController,updateUserPasswordController, deleteUserController } from "../Controller/userController.js";

import express from 'express'
const userRoute = express.Router(); // post get put delete

userRoute.post('/signup', createUserController);
userRoute.get('/getusers', getAllUsersController);
userRoute.put('/updatepass/:id', updateUserPasswordController); 
userRoute.delete('/deleteuser/:id', deleteUserController);

export default userRoute;