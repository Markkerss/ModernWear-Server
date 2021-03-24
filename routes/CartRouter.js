const CartController = require('../controllers/CartController');
const express = require('express');
const router = express.Router();

router.get('/', CartController.getCarts)
router.get('/total', CartController.totalPrice)
router.post('/:productId', CartController.addCart)
router.patch('/:id', CartController.editCart)
router.delete('/:id',  CartController.deleteCart)

module.exports = router