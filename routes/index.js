'use strict'

const express = require('express')
const api = express.Router()
const productCtrl = require('../controllers/product')

// Rutas del API-RESTful
api.get('/product/', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

module.exports = api
