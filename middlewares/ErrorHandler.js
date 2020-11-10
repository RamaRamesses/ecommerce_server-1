module.exports = (err, req, res, next) => {
    let status = err.status || "500";
    let message = {message: err.message} || {message: "Internal Server Error"}
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        status = 400;
        message['message'] = err.errors[0].message;
    }
    res.status(status).json(message);
}