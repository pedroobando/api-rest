'use strict'

const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.MDB, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log(`Conexion a la base de datos establecidad...`)
  app.listen(config.PORT, () => {
    console.log(`API RESTful corriendo en http://localhost:${config.PORT}`)
  })
})
