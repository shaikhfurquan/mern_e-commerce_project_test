// Custom error class extending built-in Error
class HandleError extends Error {
    constructor(message, statusCode) {
        super(message); // Call parent Error constructor
        this.statusCode = statusCode; // Add custom status code
        Error.captureStackTrace(this, this.constructor); // Capture clean stack trace
    }
}

export default HandleError; // Export the class for use in other files
