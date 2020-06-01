const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')
const router = require('./routes')
//const passport = require('passport')


const app = express()

app.use(morgan('dev'))
app.use(express.static('uploads'));
app.use(bodyParser.json())
app.use(cors())

/* require('./passport')
app.use(passport.initialize()) */
app.use(router)

sequelize.sync({force: false})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })