const express = require('express')
const router = express.Router()
const userControllerPolicy = require('../policies/userControllerPolicy')
// importe Controllers
const userController = require('../controllers/user')
/*  */
// User routes
router.post('/register', userControllerPolicy.middleWareRegister, userController.register)
router.post('/login', userController.login)

// songs routes

// bookmark routes
module.exports = router

