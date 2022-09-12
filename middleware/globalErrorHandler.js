const globalErrorHandler = (err, req, res, next) => {
    // Log the error
    console.log(err);

    // Give the received error a status code and/or message if it doesn't already have one/both
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = "An unknown error occurred";

    res.status(err.statusCode).json({ message: err.message });
}

export default globalErrorHandler;