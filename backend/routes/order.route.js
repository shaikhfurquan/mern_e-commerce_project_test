import express from 'express';
import { isUserAuthenticated, roleBasedAccess } from '../middlewares/isAuth.middleware.js';
import { getSingleOrder, createNewOrder, getMyAllOrders, getAllOrders } from '../controllers/order.controller.js';



const orderRouter = express.Router();

orderRouter.post('/new/order', isUserAuthenticated, createNewOrder)
orderRouter.get('/admin/get/:orderId', isUserAuthenticated, roleBasedAccess('admin'), getSingleOrder)
orderRouter.get('/user/orders', isUserAuthenticated, getMyAllOrders)
orderRouter.get('/admin/orders', isUserAuthenticated, roleBasedAccess('admin'), getAllOrders)

export default orderRouter;
