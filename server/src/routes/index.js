const express = require('express')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const userControllerPolicy = require('../policies/userControllerPolicy')
// importe Controllers
const userController = require('../controllers/user')
const pdfControlleur = require('../controllers/pdfdoc')
//const isAutenticated = require('../policies/isAuthenticated')
/*  */
const multer = require('multer');

////==============================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  
  const token = authHeader && authHeader.split(' ')[1]
  console.log("authenticateToken -> token", token)
  
  if (token == null) {
    res.status(401).json({
      message: 'Access is bloqued'
    })
  }
  jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
   
    if (err) {
          res.status(401).json({
            message: `Votre session s'est expiré, veuillez login ... ${err}`
          });
    }else {
      req.user = user
      next()
    }
  })
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file 
    const ext = path.extname(file.originalname);
    const allowed = ['.png', '.jpg', '.jpeg', '.pdf'];
    if(allowed.includes(ext)) {

    
      cb(null, true);
  
    }else {
      
      cb(new Error('Hi there! Only images are allowed'), false)
    }
  }
  
  const upload =  multer({
    storage:storage, 
    limits:{
      fileSize : 1024 * 1024 * 10
  },
  fileFilter:fileFilter
  })
// User routes
router.post('/register', userControllerPolicy.middleWareRegister, userController.register)
router.post('/login', userController.login)

// pdf routes
router.post('/pdfdoc', upload.single('pdfdocmulter'), pdfControlleur.createPdf);
router.get('/pdfdoc', authenticateToken,  pdfControlleur.getAllPdf);
router.get('/pdfdoc/:pdfId', authenticateToken, pdfControlleur.getOnePdf)
// bookmark routes
module.exports = router








