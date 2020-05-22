const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')
const { User } = require('../models')

const ctrl = {}


function jwtLogUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: '24h' })
}


 ctrl.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({
      user : user,
      token: jwtLogUser(user.toJSON())
    });

  } catch (error) {
    res.status(400).send({
      message: `Cet adresse email est déja utilisée`,
      error: error
    })
  }

}

ctrl.login = (req, res, next) => {
}

module.exports = ctrl
