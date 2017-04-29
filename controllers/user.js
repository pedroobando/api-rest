'use strict'

// const mongoose = require('mongoose')

const User = require('../models/user')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')

function signUp (req, res) {
  let user = new User()
  user.email = req.body.email
  user.displayName = req.body.displayName
  user.password = req.body.password

  user.save((err, userStored) => {
    if (err) {
      res.status(500).send({message: `Error al crear el usuario ${err}`})
    } else {
      res.status(200).send({token: service.createToken(user)})
      // console.log(`Ok POST /usr/signUp ${userStored}`)
    }
  })
}

function signIn (req, res) {
  let user = new User({
    email: req.body.email,
    password: req.body.password
  })

  // let userId = req.params.userId

  //let isMatch = false

  User.findOne({email: user.email}, (err, userfind) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!userfind) return res.status(404).send({message: `El usuario no existe..!`})

    bcrypt.compare(user.password, userfind.password, (err, isMatch) => {
      if (err) return err
      if (isMatch) {
        res.status(200).send({
          message: 'Te has logueado correctamente',
          token: service.createToken(userfind)
        })
      } else {
        res.status(500).send({
          message: 'No te has logueado correctamente',
          token: null
        })
      }
    })
  })

}

/* Esto no debe de ir aqui se debe de crear un
  controllers para usuarios, el cual contenga los methods, getUser() getUsers()
  deleteUser(), etc..
*/

function getUser (req, res) {
  let userId = req.params.userId

  User.findById(userId, (err, userfind) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!userfind) return res.status(404).send({message: `El usuario no existe..!`})

    res.status(200).send({user: userfind})
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!users) return res.status(404).send({message: `No existen productos`})

    res.status(200).json(users)
  })
}

module.exports = {
  signIn,
  signUp,
  getUsers,
  getUser
}
