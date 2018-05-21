'use strict'

var Sequelize = require('sequelize');
var config = require('../config.js');
var db = {};

var sequelize = new Sequelize(process.env.DATABASE_URL || config.data.URL);


db["User"] = sequelize['import'](__dirname + "/user.js");

Object.keys(db).forEach(function(modelName){
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;