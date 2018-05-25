module.exports = function(sequelize, DataTypes){
  var Book = sequelize.define('book', {
    title: {
      type: DataTypes.STRING
    },
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING
    }
  });
  return Book;
};