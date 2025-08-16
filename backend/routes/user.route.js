import express from 'express';
import { loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword } from '../controllers/user.controller.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.post('/password/forgot', requestPasswordReset)
userRouter.post('/reset/:token', resetPassword)

export default userRouter;
