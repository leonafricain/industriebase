const passport = require('passport');
const { User } = require('./models');

const JwtStrategy = require('passport-jwt').JwtStrategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config/config')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: authentication.jwtSecret,
    passReqToCallback: true
  }
  const strategy = new JwtStrategy(opts, (req, payload, next) => {
    User.findById( payload.id )
      .then(response => {

        if (!response) {
          return next(new Error(), false)
        }
        next(null, response)
      })
      .catch(err => {
        return next(new Error(err), false)
      })
  })
  passport.use(strategy)