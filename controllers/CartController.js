const {Cart, Product} = require('../models')

class CartController {
    static getCarts(req, res, next) {
        Cart.findAll({where: {UserId: req.currentUser.id}, include: {model: Product}})
            .then(data => {
                // console.log(data[0].Product.image_url)
                res.status(200).json({data})
            })
            .catch(err => {
                next(err)
            })
    }

    static addCart(req, res, next) {
        const cartData = {
            UserId: req.currentUser.id,
            ProductId: req.params.productId,
            quantity: +req.body.quantity
        }
        Cart.findAll({where: {UserId: cartData.UserId, ProductId: cartData.ProductId}, include: {model: Product}})
            .then(data => {
                if(data.length !== 0) {
                    if((+cartData.quantity + +data[0].quantity) <= data[0].Product.stock) {
                        Cart.increment('quantity', {by: cartData.quantity, where: {UserId: cartData.UserId, ProductId: cartData.ProductId}})
                        .then(() => {
                            res.status(200).json({message: "Successfully incremented quantity column"})
                        })
                        .catch(err => {
                            next(err)
                        })
                    } else {
                        next({code: 400, message:'Quantity must not be more than stock'})
                    }
                } else {
                    Product.findOne({where: {id: cartData.ProductId}})
                        .then(product => {
                            if (+cartData.quantity <= product.stock) {
                                Cart.create(cartData)
                                    .then(datas => {
                                        res.status(201).json({id: datas.id, UserId: datas.UserId, ProductId: datas.ProductId})
                                    })
                                    .catch(err => {
                                        next(err)
                                    })      
                            } else {
                                next({code: 400, message:'Quantity must not be more than stock'})
                            }
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
        
    }

    static deleteCart(req, res, next) {
        Cart.destroy({where: {id: req.params.id, UserId: req.currentUser.id}})
            .then(data => {
                if (data === 0) {
                    next({code: 401, message:'Access Denied'})
                } else {
                    res.status(200).json({message: "Successfully deleted cart"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static editCart(req, res, next) {
        const editedCart = {
            quantity: req.body.quantity
        }
        Cart.findOne({where: {id: req.params.id, UserId: req.currentUser.id}, include: {model: Product}})
            .then(data => {
                if (data !== null) {
                    if(data.Product.stock >= editedCart.quantity) {
                        Cart.update({quantity: editedCart.quantity},{where: {id: data.id}})
                            .then(data => {
                                res.status(200).json({message: "Quantity in cart successfully updated"})
                            })
                            .catch(err => {
                                next(err)
                            })
                    } else {
                        next({code: 400, message:'Quantity must not be more than stock'})
                    }
                } else {
                    next({code: 401, message:'Access Denied'})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static totalPrice(req, res, next) {
        Cart.findAll({where: {UserId: req.currentUser.id}, include: {model: Product}})
            .then(datas => {
                let totalPrice = 0
                datas.map(data => {
                    totalPrice += (+data.Product.price * +data.quantity)
                })
                res.status(200).json({totalPrice})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController