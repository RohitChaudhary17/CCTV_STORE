// errorHandler.js

import ApiError from "../Utils/ApiError.utils.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
      // Custom error handling (ApiError)
      return res.status(err.statusCode).json({
          success: false,
          statusCode: err.statusCode,
          message: err.message,
          errors: err.errors || [],
      });
  }

  // Generic error handler for uncaught errors
  console.error(err.stack); // Log the error for debugging purposes
  return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      errors: [err.message],
  });
};

export default errorHandler;
