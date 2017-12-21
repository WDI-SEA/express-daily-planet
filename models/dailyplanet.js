'use strict';
module.exports = (sequelize, DataTypes) => {
  var dailyplanet = sequelize.define('dailyplanet', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return dailyplanet;
};