const path = require('path')

module.exports = {
  dialect: 'sqlite',
  port: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || 'industrieDB',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'mohand',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../indutrieDB.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}