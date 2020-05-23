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

ctrl.login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (!user) {
      return res.status(403).send({
        message: ''
      })
    }
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(403).send({
        message: 'The login information was incorrect'
      })
    }

    //const userJson = user.toJSON()
    res.status(201).json({
      user: user,
      token: jwtLogUser(user.toJSON())
    })
  } catch (err) {
    res.status(500).send({
      message: 'An error has occured trying to log in'
    })
  }
}

module.exports = ctrl
