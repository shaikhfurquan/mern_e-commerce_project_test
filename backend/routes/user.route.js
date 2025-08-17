import express from 'express';
import { adminGetSingleUserInfo, adminGetUsersListInfo, adminUpdateUserRole, getUserProfileDetails, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, updatePassword, updateUserProfile } from '../controllers/user.controller.js';
import { isUserAuthenticated, roleBasedAccess } from '../middlewares/isAuth.middleware.js';



const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logoutUser)
userRouter.get('/profile', isUserAuthenticated, getUserProfileDetails)
userRouter.post('/password/forgot', requestPasswordReset)
userRouter.post('/reset/:token', resetPassword)
userRouter.post('/update/password', isUserAuthenticated, updatePassword)
userRouter.post('/update/profile', isUserAuthenticated, updateUserProfile)
userRouter.get('/admin/users-list', isUserAuthenticated, roleBasedAccess('admin'), adminGetUsersListInfo)
userRouter.get('/admin/user/:userId', isUserAuthenticated, roleBasedAccess('admin'), adminGetSingleUserInfo)
userRouter.put('/admin/update-user-role/:userId', isUserAuthenticated, roleBasedAccess('admin'), adminUpdateUserRole)

export default userRouter;
