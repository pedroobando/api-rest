'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    console.log(`${req.headers.authorization}`)
    return res.status(403).send({message: `No tiene autorizacion`})
  }

  //console.log(`${req.headers.authorization}`)
  const token = req.headers.authorization.split(' ')[1]
  var payload

  try {
    payload = jwt.decode(token, config.SECRET_TOKEN)
  } catch (err) {
    return res.status(500).send({message: `Error el token ${err}`})
  }

  //console.log(payload)
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'El Token ha expirado'})
  }

  req.user = payload.sub
  next()
}

module.exports = {
  isAuth
}
