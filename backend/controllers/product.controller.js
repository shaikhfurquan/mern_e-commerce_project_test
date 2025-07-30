import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import ProductModel from "../models/product.model.js";
import ApiFunctionality from "../utils/api.functionality.js";
import HandleError from "../utils/handleError.js";


export const addProduct = handleAsyncError(async (req, res, next) => {

    const product = await ProductModel.create(req.body)
    res.status(201).json({
        success: true,
        product
    });
})


export const getAllProducts = handleAsyncError(async (req, res, next) => {
    
    const resultPerPage = 3
    const apiFunctionality = new ApiFunctionality(ProductModel.find(), req.query).search().filter().pagination(resultPerPage)

    const products = await apiFunctionality.query

    res.status(200).json({
        success: true,
        productsCount: products.length,
        products
    });
})


export const getSingleProduct = handleAsyncError(async (req, res, next) => {
    const product = await ProductModel.findById(req.params.productId)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        product
    });
})


export const updateProduct = handleAsyncError(async (req, res, next) => {
    const product = await ProductModel.findByIdAndUpdate(req.params.productId, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) {
        return next(new HandleError("Product Not Found", 404))
    }
    res.status(200).json({
        success: true,
        product
    });
})


export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await ProductModel.findByIdAndDelete(req.params.productId)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))

    }
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
})