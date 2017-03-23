'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)

// Ejemplo
// app.get('/hola/:name', (req, res) => {
//   res.send({ message: `Hola ${req.params.name}..!` })
// })

module.exports = app
