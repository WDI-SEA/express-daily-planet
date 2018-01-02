'use strict';
module.exports = (sequelize, DataTypes) => {
  var article = sequelize.define('article', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return article;
};