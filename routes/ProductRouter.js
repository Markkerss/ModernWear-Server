const ProductController = require('../controllers/ProductController');
const express = require('express');
const { authorize } = require('../middlewares/auth');
const router = express.Router();

router.get('/', ProductController.getProducts)
router.post('/', authorize, ProductController.addProduct)
router.put('/:id', authorize,  ProductController.editProduct)
router.delete('/:id', authorize,  ProductController.deleteProduct)

module.exports = router