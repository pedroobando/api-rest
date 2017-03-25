'use strict'

const express = require('express')
const userRoute = express.Router()
const userCtrl = require('../controllers/auth')
const auth = require('../middlewares/auth')

userRoute.route('/signup')
  .post(userCtrl.signUp)

userRoute.route('/private')
  .get(auth.isAuth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso..!'})
  })

module.exports = userRoute
