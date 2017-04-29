'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: true
  },
  displayName: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: false
  },
  password: {
    type: String,
    select: true,
    require: true
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  lastLogin: {
    type: Date
  }
})

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword.compare, candidatePassword.base, (err, isMatch) => {
    if (err) return err
    cb(null, isMatch)
  })
}

UserSchema.methods.gravatar = function () {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)
