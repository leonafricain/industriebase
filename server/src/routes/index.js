const express = require('express')
const router = express.Router()

// importe Controllers
const userController = require('../controllers/user')
/*  */
// User routes
router.post('/register', userController.register)
router.post('/login', userController.login)

// songs routes

// bookmark routes
module.exports = router

