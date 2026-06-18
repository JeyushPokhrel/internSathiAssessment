

// Global error handler
// Catches errors passed via next(error) from anywhere in the app

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;