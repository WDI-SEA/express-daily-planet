'use strict';
module.exports = function(sequelize, DataTypes) {
  var news = sequelize.define('news', {
    title: DataTypes.STRING,
    body: 'varchar'
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return news;
};
