const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const UsersProductsController = require('../controllers/UsersProductsController');
const authentication = require('../middlewares/Authentication');
const authorization = require('../middlewares/Authorization');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/products', ProductController.showProducts);
router.get('/products/:category', ProductController.showByCategory)
router.use(authentication);
router.post('/products', authorization , ProductController.addProduct);
router.put('/products/:id', authorization, ProductController.editProduct);
router.delete('/products/:id', authorization, ProductController.deleteProduct);

router.get('/transactions', UsersProductsController.getTransactions);
router.get('/cart', UsersProductsController.getProducts);
router.post('/addToCart/:id', UsersProductsController.addProduct);
router.delete('/cart/:id', UsersProductsController.removeProduct);
router.post('/cart/:id', UsersProductsController.checkoutProduct);

module.exports = router;