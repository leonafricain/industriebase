const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    /* instanceMethods:{
      comparePassword: function (password) {
        console.log("===========================================================", password)
        return bcrypt.compare(password, this.password)
      }
    } */
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
  
  return User;
};



