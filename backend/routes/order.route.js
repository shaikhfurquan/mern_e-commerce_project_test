import express from 'express';
import { isUserAuthenticated, roleBasedAccess } from '../middlewares/isAuth.middleware.js';
import { createNewOrder } from '../controllers/order.controller.js';



const orderRouter = express.Router();

orderRouter.post('/new/order' , isUserAuthenticated , createNewOrder)

export default orderRouter;
