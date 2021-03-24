const express = require('express')
const router = express.Router()
const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const { authenticate } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.send('Welcome!')
})

router.use(UserRouter)

router.use(authenticate)

router.use('/products', ProductRouter)
router.use('/carts', CartRouter)

module.exports = router 