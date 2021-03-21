const express = require('express')
const router = express.Router();
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const { authenticate } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send('Welcome!')
})

router.use(UserRouter);

router.use(authenticate);

router.use('/products', ProductRouter);

module.exports = router; 