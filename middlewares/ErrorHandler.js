module.exports = (err, req, res, next) => {
    let status = err.status || "500";
    let message = {message: err} || {message: "Internal Server Error"}
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
        status = 400;
        message = err.errors.map((error) => {
            return {message: error.message}
        });
    }
    res.status(status).json(message);
}