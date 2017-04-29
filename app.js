'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const usrRoute = require('./routes/user')

const hbs = require('express-handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Motor de Plantillas vistas
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Rutas de acceso
app.use('/api', api)
app.use('/usr', usrRoute)

app.get('/login', (req, res) => {
  res.render('login')
})

module.exports = app
