import HandleError from "../utils/handleError.js";


// Error handling middleware for Express


export const errorHandleMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // CastError
    if (err.name === 'CastError') {
        const message = `This is invalid resource ${err.path}`
        err = new HandleError(message, 404)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack?.split('\n')[1]?.trim(),
        // stack: process.env.NODE_ENV === "development" ? err.stack : undefined // 🧠,
    });
};




// export const errorHandleMiddleware = (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";

//     res.status(err.statusCode).json({
//         success: false,
//         message: err.message
//     });
// };



