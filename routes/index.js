'use strict'

const express = require('express')
const api = express.Router()
const productCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')

// Rutas del API-RESTful
// api.get('/product/', productCtrl.getProducts)
// api.get('/product/:productId', productCtrl.getProduct)
// api.post('/product', productCtrl.saveProduct)
// api.put('/product/:productId', productCtrl.updateProduct)
// api.delete('/product/:productId', productCtrl.deleteProduct)

api.route('/product/')
  .get(productCtrl.getProducts)
  .post(productCtrl.saveProduct)

api.route('/product/faker')
  .post(productCtrl.postfakerProduct)

api.route('/product/:productId')
  .get(productCtrl.getProduct)
  .put(productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct)

api.route('/private')
  .get(auth.isAuth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso..!'})
  })

module.exports = api
