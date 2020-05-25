const express = require('express')
const router = express.Router()
const userControllerPolicy = require('../policies/userControllerPolicy')
// importe Controllers
const userController = require('../controllers/user')
const pdfControlleur = require('../controllers/pdfdoc')
/*  */
const multer = require('multer');

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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
      cb(null, true);
  
    }else {
      
      cb(new Error('Hi there! Only images are allowed'), false)
    }
  }
  
  const upload =  multer({
    storage:storage, 
    limits:{
      fileSize : 1024 * 1024 * 5
  },
  fileFilter:fileFilter
  })
  
// User routes
router.post('/register', userControllerPolicy.middleWareRegister, userController.register)
router.post('/login', userController.login)

// pdf routes
router.post('/pdfdoc', upload.single('pdfdocmulter'), pdfControlleur.createPdf)
// bookmark routes
module.exports = router

