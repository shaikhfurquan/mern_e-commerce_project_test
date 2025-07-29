// Error handling middleware for Express


export const errorHandleMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined // 🧠
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



