'use strict'

const Product = require('../models/product')

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, productfind) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!productfind) return res.status(404).send({message: `El producto de codigo no existe..!`})

    res.status(200).send({product: productfind})
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!products) return res.status(404).send({message: `No existen productos`})

    // res.status(200).send({ products })
    res.status(200).json(products)
  })
}

function saveProduct (req, res) {
  // console.log(req.body)
  // res.status(200).send({ message: `El producto: ${req.body.name} se ha recibido..!` })
  // console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.price = req.body.price
  product.picture = req.body.picture
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) {
      res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
    } else {
      res.status(200).send({id: productStored._id, product: productStored})
      console.log('Ok.. POST /api/product')  
    }
  })
}

function updateProduct (req, res) {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

    res.status(200).json({id: productUpdate._id, body: req.body})
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error en la peticion de borrar: ${err}`})
    if (!product) return res.status(404).send({id: `${productId}`, message: `Producto ${productId} no localizado`})

    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
      res.status(200).send({id: `${productId}`, message: `El producto ha sido borrado`})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
