function logErrors(err, req, res, next) {
    // capture error and send it to next middleware
    console.log('enter into logErrors');
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    console.log('enter into errorHandler');
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        res.status(500).json({
            message: err.message,
            stack: err.stack,
        });
    }
    // If the error isn't controlated for boom, create general error handler
    next();
  }

module.exports = { logErrors, errorHandler };
