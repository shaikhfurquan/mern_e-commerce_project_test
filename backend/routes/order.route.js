import express from 'express';
import { isUserAuthenticated, roleBasedAccess } from '../middlewares/isAuth.middleware.js';
import { getSingleOrder, createNewOrder } from '../controllers/order.controller.js';



const orderRouter = express.Router();

orderRouter.post('/new/order', isUserAuthenticated, createNewOrder)
orderRouter.get('/admin/get/:orderId', isUserAuthenticated, roleBasedAccess('admin'), getSingleOrder)

export default orderRouter;
