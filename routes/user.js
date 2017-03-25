'use strict'

const express = require('express')
const userRoute = express.Router()
const userCtrl = require('../controllers/auth')
// const auth = require('../middlewares/auth')

userRoute.route('/signup')
  .post(userCtrl.signUp)

userRoute.route('/signin')
  .post(userCtrl.signIn)

userRoute.route('/all')
  .get(userCtrl.getUsers)

module.exports = userRoute
