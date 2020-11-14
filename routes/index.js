const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/Authentication');
const authorization = require('../middlewares/Authorization');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/products', ProductController.showProducts);
router.use(authentication);
router.post('/products', authorization , ProductController.addProduct);
router.put('/products/:id', authorization, ProductController.editProduct);
router.delete('/products/:id', authorization, ProductController.deleteProduct);

module.exports = router;