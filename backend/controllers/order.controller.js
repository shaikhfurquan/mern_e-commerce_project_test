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

    const order = await OrderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id

    })

    res.status(200).json({
        success: true,
        order
    })

})


// Admin - getting th single order
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.orderId).populate("user", "name email")
    if (!order) {
        return next(new HandleError("Order not found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })

})


// my all order (login user) 
export const getMyAllOrders = handleAsyncError(async (req, res, next) => {
    const myOrders = await OrderModel.find({ user: req.user._id })
    if (!myOrders) {
        return next(new HandleError("Order not found", 404))
    }

    res.status(200).json({
        success: true,
        totalOrders: myOrders.length,
        myOrders
    })

})


// Admin -  get all order 
export const getAllOrders = handleAsyncError(async (req, res, next) => {
    const allOrders = await OrderModel.find()

    let totalAmount = 0
    allOrders.forEach(order => {
        totalAmount += order.totalPrice
    })
    if (!allOrders) {
        return next(new HandleError("Orders not found", 404))
    }

    res.status(200).json({
        success: true,
        allOrdersCount: allOrders.length, 
        totalAmount,
        allOrders
    })

})