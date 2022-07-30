function logErrors(err, req, res, next) {
    // capture error and send it to next middleware
    console.log('enter into logErrors');
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    console.log('enter into errorHandler');
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }

module.exports = { logErrors, errorHandler };
