import express from 'express';
import { loginUser, logoutUser, registerUser, requestPasswordReset } from '../controllers/user.controller.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.post('/password/forgot', requestPasswordReset)

export default userRouter;
