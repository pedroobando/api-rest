'use strict'

const express = require('express')
const userRoute = express.Router()
const userCtrl = require('../controllers/user')
// const auth = require('../middlewares/auth')

userRoute.route('/signup')
  .post(userCtrl.signUp)

userRoute.route('/signin')
  .post(userCtrl.signIn)

userRoute.route('/')
  .get(userCtrl.getUsers)

module.exports = userRoute
