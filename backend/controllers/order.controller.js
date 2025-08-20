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


// Admin -  update order status
export const updateOrderStatus = handleAsyncError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.orderId);

    if (!order) {
        return next(new HandleError("Order not found", 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new HandleError("This order has already been delivered", 400));
    }

    // // Update stock for each product
    // await Promise.all(
    //     order.orderItems.map(item => updateQuantity(item.product, item.quantity))
    // );

    // // Update order status
    // order.orderStatus = req.body.status;

    // if (order.orderStatus === 'Delivered') {
    //     order.deliveredAt = Date.now();
    // }

    // Only reduce stock if the new status is 'Delivered'
    if (req.body.status === 'Delivered') {
        await Promise.all(
            order.orderItems.map(item => updateQuantity(item.product, item.quantity))
        );

        order.deliveredAt = Date.now();
    }

    // Update order status
    order.orderStatus = req.body.status;


    // Save the updated order
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order
    });
});

// Helper function to update stock
async function updateQuantity(productId, quantity) {
    const product = await ProductModel.findById(productId);
    if (!product) {
        // Instead of using `next`, throw an error directly
        throw new HandleError("Product not found", 404);
    }

    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}
