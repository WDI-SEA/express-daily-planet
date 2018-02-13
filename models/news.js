'use strict';
module.exports = function(sequelize, DataTypes) {
  var news = sequelize.define('news', {
    title: DataTypes.STRING,
    body: 'varchar',
    author: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return news;
};
