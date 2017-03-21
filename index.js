'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('./models/product');


const app = express();
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())


// Ejemplo
// app.get('/hola/:name', (req, res) => {
//   res.send({ message: `Hola ${req.params.name}..!` })
// })

// Rutas del API-RESTful
app.get('/api/product/', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
    if (!products) return res.status(404).send({ message: `No existen productos`})

    res.status(200).send({ products })
  })
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, productfind) => {
    if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
    if (!productfind) return res.status(404).send({ message: `El producto de codigo no existe..!`})

    res.status(200).send({ product: productfind})
  })

})

app.post('/api/product', (req, res) => {
  // console.log(req.body)
  // res.status(200).send({ message: `El producto: ${req.body.name} se ha recibido..!` })
  // console.log(req.body);

  let product = new Product()
  product.name = req.body.name
  product.price = req.body.price
  product.picture = req.body.picture
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) {
      res.status(500).send({ message: `Error al salvar en la base de datos: ${err}`})
    }
    res.status(200).send({_id:productStored._id, product: productStored})
    console.log('Ok.. POST /api/product');
  })

})

app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) res.status(500).send({ message: `Error al actualizar el producto: ${err}`})

    res.status(200).send({ product: productUpdate })
  })
})

app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error en la peticion de borrar: ${err}`});
    if (!product) return res.status(404).send({  _id:`${productId}`, message: `Producto ${productId} no localizado`});

    product.remove( err => {
      if (err) res.status(500).send({ message: `Error al borrar el producto: ${err}`})
      res.status(200).send({ _id:`${productId}`, message: `El producto ha sido borrado`})
    })

  })

})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`);
  }
  console.log(`Conexion a la base de datos establecidad...`);

  app.listen(port,() => {
    console.log(`API RESTful corriendo en http://localhost:${port}`)
  });

})
