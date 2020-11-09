const {User} = require('../models/index')

class UserController {
    static async register (req, res, next) {
        try {
            let payload = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            let user = await User.create(payload);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;