if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config();
}

const express = require('express')
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errHandler)

module.exports = app