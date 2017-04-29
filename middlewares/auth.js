'use strict'

const services = require('../services');

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    console.log(`${req.headers.authorization}`)
    return res.status(403).send({message: `No tiene autorizacion`})
  }

  // console.log(`${req.headers.authorization}`)
  const token = req.headers.authorization.split(' ')[1]

  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = {
  isAuth
}
