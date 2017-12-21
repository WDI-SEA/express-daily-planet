'use strict';
module.exports = (sequelize, DataTypes) => {
  var daily_planet = sequelize.define('daily_planet', {}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return daily_planet;
};