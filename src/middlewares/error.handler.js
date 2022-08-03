function logErrors(err, req, res, next) {
    // capture error and send it to next middleware
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        // If the error isn't controlated for boom, create general error handler
        res.status(500).json({
            statusCode: 500,
            error: err.stack,
            message: err.message
        });
    }
    next();
  }

module.exports = { logErrors, errorHandler };
