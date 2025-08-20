import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import OrderModel from '../models/order.model.js'
import HandleError from "../utils/handleError.js";



export const createNewOrder = handleAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice = 0,
        shippingPrice,
        totalPrice,
               
    } = req.body;

    const order = await OrderModel.create( {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice ,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user : req.user._id
               
    })

    res.status(200).json({
        success : true,
        order
    })

})