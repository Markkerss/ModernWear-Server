const { Product } = require('../models')

class ProductController {
    static addProduct (req, res, next) {
        let data = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: +req.body.price,
            stock: +req.body.stock
        }
        console.log(data)
        Product.create(data)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProducts (req, res, next) {
        Product.findAll()
            .then(data => {
                let result = []
                data.forEach(datas => {
                    result.push({
                        id: datas.id,
                        name: datas.name,
                        image_url: datas.image_url,
                        price: datas.price,
                        stock: datas.stock
                    })
                })
                res.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

    static editProduct (req, res, next) {
        let id = +req.params.id
        let data = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        console.log(data)
        Product.update(data, {where: {id}})
            .then(datas => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct (req, res, next) {
        let id = +req.params.id
        Product.destroy({where: {id}})
            .then(data => {
                res.status(200).json({ message: 'Product has been successfully deleted.' })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ProductController 