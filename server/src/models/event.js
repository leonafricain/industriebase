module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        name: DataTypes.STRING,
        details: DataTypes.STRING,
        start: DataTypes.STRING,
        end: DataTypes.STRING,
        color: DataTypes.STRING,
    }, {});
    Event.associate = function(models) {
      // associations can be defined here
        Event.belongsTo(models.Structure)
    };
    
    return Event;
  };
  
  