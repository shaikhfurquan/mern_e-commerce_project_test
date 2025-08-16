import express from 'express';
import { getUserProfileDetails, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword } from '../controllers/user.controller.js';
import { isUserAuthenticated } from '../middlewares/isAuth.middleware.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.post('/password/forgot', requestPasswordReset)
userRouter.post('/reset/:token', resetPassword)
userRouter.get('/profile', isUserAuthenticated, getUserProfileDetails)

export default userRouter;
