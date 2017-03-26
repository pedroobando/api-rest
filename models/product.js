'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: {
    type: String,
    Required: 'Nombre del producto es obligatorio'
  },
  picture: String,
  price: {type: String, default: 0},
  category: {
    type: [{
      type: String,
      enum: ['computers', 'phones', 'accesories', 'books']
    }],
    default: 'computers'
  },
  description: String,
  create_date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', ProductSchema)
