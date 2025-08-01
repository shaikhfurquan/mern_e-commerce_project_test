import HandleError from "../utils/handleError.js";


// Error handling middleware for Express


export const errorHandleMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //  CastError (e.g., invalid ObjectId)
    if (err.name === "CastError") {
        const message = `🔍 Resource not found: Invalid field "${err.path}"`;
        err = new HandleError(message, 400);
    }

    // Duplicate key error
    if (err.code === 11000) {
        const message = `⚠️ Duplicate field: "${Object.keys(err.keyValue)}" already exists.Please login to continue 😊`;
        err = new HandleError(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(val => `❌ ${val.message}`);
        err = new HandleError(messages.join(" "), 400);
    }

    // JWT: Invalid token
    if (err.name === "JsonWebTokenError") {
        err = new HandleError("🔐 Invalid token. Please log in again.", 401);
    }

    // JWT: Token expired
    if (err.name === "TokenExpiredError") {
        err = new HandleError("⏰ Token expired. Please log in again.", 401);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack?.split('\n')[1]?.trim(),
        // stack: process.env.NODE_ENV === "development" ? err.stack : undefined // 🧠,
    });
};

