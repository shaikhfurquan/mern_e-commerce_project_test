import jwt from 'jsonwebtoken';
import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import UserModel from "../models/user.model.js";
import HandleError from "../utils/handleError.js";


export const isUserAuthenticated = handleAsyncError(async (req, res, next) => {
  try {
    // console.log("isAuthUser");
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new HandleError('Unauthorized, User access', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await UserModel.findById(decoded._id)
    req.user = user
    return next()

  } catch (error) {
    return next(error);
  }
})

