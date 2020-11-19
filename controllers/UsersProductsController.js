const {UsersProducts, Product} = require('../models/index');
const { use } = require('../routes');

class UsersProductsController {
    static async getProducts (req, res, next) {
        try {
            const userId = req.userLoggedIn.id;
            const usersProducts = await UsersProducts.findAll({where: {UserId: userId, paid: false}, include: [Product]});
            res.status(200).json(usersProducts);
        } catch (err) {
            next(err);
        }
    }

    static async getTransactions (req, res, next) {
        try {
            const userId = req.userLoggedIn.id;
            const usersProducts = await UsersProducts.findAll({where: {UserId: userId, paid: true}, include: [Product]});
            res.status(200).json(usersProducts);
        } catch (err) {
            next(err);
        }
    }

    static async addProduct (req, res, next) {
        try {
            const payload = {
                UserId: req.userLoggedIn.id,
                ProductId: req.params.id,
                quantity: req.body.quantity,
                paid: false
            }
            const product = await Product.findOne({ where: { id: payload.ProductId } });
            if(product.stock > 0 && product.stock >= req.body.quantity) {
                const getUserProduct = await UsersProducts.findOne({where: {ProductId: payload.ProductId, UserId: payload.UserId}})
                let usersProducts = []
                if (!getUserProduct || getUserProduct.paid === true) {
                    usersProducts = await UsersProducts.create(payload);
                } else {
                    const updatePayload = {
                     quantity: parseInt(getUserProduct.quantity) + parseInt(req.body.quantity)
                    }
                    usersProducts = await UsersProducts.update(updatePayload, { where: { ProductId: payload.ProductId }})
                }
                res.status(201).json(usersProducts);
            } else {
                throw { message: 'Stock tidak cukup', status: '400' }
            }
            res.status(201).json(usersProducts);
        } catch (err) {
            next(err);
        }
    }

    static async removeProduct (req, res, next) {
        try {
            const stockPayload = {
                stock: req.body.stock
            }
            await Product.update(stockPayload, { where: { id: req.params.id } })
            await UsersProducts.destroy({where: {ProductId: req.params.id, UserId: req.userLoggedIn.id}});
            res.status(200).json({message: 'Product removed from cart list'});
        } catch (err) {
            next(err);
        }
    }

    static async checkoutProduct (req, res, next) {
        try {
            const stockPayload = {
                stock: req.body.stock
            }
            const payload = {
                paid: true
            }
            const usersProduct = await UsersProducts.findOne({ where: { ProductId: req.params.id, UserId: req.userLoggedIn.id}})
            const product = await Product.findOne({ where: { id: req.params.id }})
            if (product.stock >= usersProduct.quantity) {
                await Product.update(stockPayload, { where: { id: req.params.id } })
                await UsersProducts.update(payload, {where: {ProductId: req.params.id, UserId: req.userLoggedIn.id}});
                res.status(200).json({message: 'Product has been checked out'});
            } else {
                throw { message: 'Stok tidak cukup', status: 400 }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UsersProductsController