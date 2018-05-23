'use strict'

var Sequelize = require('sequelize');
var db = {};
console.log(process.env.DATABASE_URL)
var sequelize = new Sequelize(process.env.DATABASE_URL);


db["User"] = sequelize['import'](__dirname + "/user.js");

Object.keys(db).forEach(function(modelName){
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;