const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')
const { User } = require('../models')

const ctrl = {}


/* function jwtLogUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, { expiresIn: '1h' })
}
 */


 ctrl.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send({
      user : user
    });

  } catch (error) {
    res.status(400).send({
      erreur: `Cet Email est déja utilisé: ${error}`
    })
  }

}

ctrl.login = (req, res, next) => {
}

module.exports = ctrl
