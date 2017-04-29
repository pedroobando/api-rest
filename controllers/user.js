'use strict'

// const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) res.status(500).send({message: `Error al crear el usuario ${err}`})

    return res.status(200).send({token: service.createToken(user)})
  })
}

function signIn (req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })

  // let userId = req.params.userId

  let isMatch = false
  User.findOne({email: user.email}, (err, userfind) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!userfind) return res.status(404).send({message: `El usuario no existe..!`})

    // console.log(userfind)
    // console.log(user)

    userfind.comparePassword(user.password, (err, isMatch) => {
      if (err) res.status(500).send({message: `Error al authenticar el usuario ${err}`})
      console.log(`password: ${user.password} is ${isMatch}`)
    })

    req.user = userfind
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(userfind)
    })
  })

  /*
  Viejo codigo
  res.status(200).json({isMatch})
  */

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
