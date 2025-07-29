import jwt from 'jsonwebtoken';
import EmployeeModel from '../models/employee.model.js';


export const protect = async (req, res, next) => {
  try {
    // console.log("isAuthUser");
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, There is no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await EmployeeModel.findById(decoded._id)
    req.user = user
    return next()

  } catch (error) {
    return next(error);
  }
}



export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};
