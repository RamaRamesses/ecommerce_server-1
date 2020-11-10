const {Product} = require('../models/index');

class ProductController {
    static async addProduct(req, res, next) {
        try {
            let payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            let product = await Product.create(payload);
            res.status(201).json(product);
        } catch (err) {
            next(err);
        }
        
    }

    static async showProducts(req, res, next){
        try {
            let product = await Product.findAll();
            res.status(200).json(product);
        } catch (err) {
            next(err);
        }
    }

    static async editProduct(req, res, next){
        try {
            let payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            let product = await Product.update(payload, {where:{id: req.body.id}});
            res.status(200).json(product);
        } catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next){
        try{
            let product = await Product.destroy({where:{id: req.params.id}})
            res.status(200).json({message: `Product with id. ${req.params.id} has been removed`});
        } catch(err){
            next(err);
        }
    }
}

module.exports = ProductController;