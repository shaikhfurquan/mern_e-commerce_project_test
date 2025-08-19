import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import ProductModel from "../models/product.model.js";
import ApiFunctionality from "../utils/api.functionality.js";
import HandleError from "../utils/handleError.js";


export const addProduct = handleAsyncError(async (req, res, next) => {
    req.body.addedByUserId = req.user._id
    const product = await ProductModel.create(req.body)
    res.status(201).json({
        success: true,
        product
    });
})


export const getAllProducts = handleAsyncError(async (req, res, next) => {

    const resultsPerPage = 3
    const apiFeatures = new ApiFunctionality(ProductModel.find(), req.query).search().filter()


    // getting the filter query before pagination
    const filteredQuery = apiFeatures.query.clone()
    const productsCount = await filteredQuery.countDocuments()

    // calculating the total pages based on filered count
    const totalPages = Math.ceil(productsCount / resultsPerPage)
    const page = Number(req.query.page) || 1
    if (page > totalPages && productsCount > 0) {
        return next(new HandleError("This page doesn't exits", 404))
    }

    // Applying the pagination
    apiFeatures.pagination(resultsPerPage)
    const products = await apiFeatures.query

    if (!products || products.length === 0) {
        return next(new HandleError("No product found", 404))
    }

    res.status(200).json({
        success: true,
        productsCount,
        resultsPerPage,
        currentPage: page,
        totalPages,
        products,

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


// creating and updating the reviews for product
export const createAndUpdateReviewForProduct = handleAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await ProductModel.findById(productId)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))

    }

    // Check if the user has already reviewed the product
    const reviewExists = product.reviews.find(review => review.user.toString() === req.user._id.toString())

    if (reviewExists) {
        // Loop through reviews and update the existing review by the current user
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.rating = rating // Update the rating
                review.comment = comment // Update the comment
            }
        })
    } else {
        // If no review from the user, push a new review to the array
        product.reviews.push(review)
    }

    // Calculate total number of reviews and average rating for the product
    product.numberOfReviews = product.reviews.length;

    // Sum up all ratings and calculate the average
    let avgSum = 0;
    product.reviews.forEach(review => {
        avgSum += review.rating;
    });
    // Ensure rating is 0 if no reviews exist
    product.rating = product.reviews.length > 0 ? avgSum / product.reviews.length : 0;


    // Save the product document, bypassing validation (since review-related validation might not be needed)
    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        product
    })
})


// Getting the product reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
    const product = await ProductModel.findById(req.query.productId)
    if (!product) {
        return next(new HandleError("Product Not Found", 404))

    }
    res.status(200).json({
        success: true,
        reviews : product.reviews
    });
})



// Admin - Getting the all products
export const getAdminProduct = handleAsyncError(async (req, res, next) => {
    const products = await ProductModel.find()
    if (!products) {
        return next(new HandleError("Product Not Found", 404))

    }
    res.status(200).json({
        success: true,
        productsCount: products.length,
        products
    });
})