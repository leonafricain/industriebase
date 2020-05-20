const Joi = require('@hapi/joi')
module.exports = {
  middleWareRegister (req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{5,30}$/)
    })
    
   // const { error, value } = schema.validate(req.body); // ancienne bversion
   const {error, value} = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            message: 'You must provide a valid email adress'
          })
          break
        case 'password':
          res.status(400).send({
            message: `<strong>the password provided failed to match the flowing rules </strong>                                                                                                                               : <br>
            1. It must contain only characters lower case, upper case, numerics
            <br>
            2. It must be at least 5 characters in length and not graeter than 30
            `
          })
          break
        default :
          res.status(400).send({
            message: 'Invalid registration information'
          })
          break
      }
    } else {
      next()
      console.log('value :', value)
    }
  }
}











/* const schema = Joi.object({
  
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { } */