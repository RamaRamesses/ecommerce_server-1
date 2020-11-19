const {verifyToken} = require('../helpers/jwt');
const {User} = require('../models/index');

async function authentication(req, res, next){
    try {
        let {access_token} = req.headers;
        if(access_token){
            let decoded = verifyToken(access_token);
            let user = await User.findOne({where: {email: decoded.email}});
            if(!user){
                throw {message: 'Authentication failed', status: 401};
            } else {
                req.userLoggedIn = decoded;
                next();
            }
        } else {
            throw {message: 'Authentication failed', status: 401};
        }
    } catch (err) {
        next(err);
    }

}

module.exports = authentication;