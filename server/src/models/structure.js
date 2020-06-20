    
module.exports = (sequelize, DataTypes) => {
    const Structure = sequelize.define('Structure', {
        name: DataTypes.STRING,
        sigle: DataTypes.STRING,
    }, {
      timestamps: false
    });
    Structure.associate = function(models) {
      // associations can be defined here
     

    };
    
    return Structure;
  };
  
  