async function authorization(req, res, next){
    try {
        let { role } = req.userLoggedIn;
        console.log(req.userLoggedIn);
        if(role !== "admin"){
            throw {message: "Authorization Failed", status: 401};
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;