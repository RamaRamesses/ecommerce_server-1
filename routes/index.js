const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);

router.post('/products', ProductController.addProduct);

module.exports = router;