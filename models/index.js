'use strict'

var Sequelize = require('sequelize');
var db = {};
var sequelize = new Sequelize(process.env.DATABASE_URL);


db["User"] = sequelize['import'](__dirname + "/user.js");
db["Book"] = sequelize['import'](__dirname + "/book.js");

Object.keys(db).forEach(function(modelName){
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;