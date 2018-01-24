module.exports = function(sequelize, DataTypes){
				var Recipe = sequelize.define('recipe', {
								name: {
												type: DataTypes.STRING
								},

								ingredient: {
												type: DataTypes.JSON
								},
								step: {
												type: DataTypes.ARRAY(DataTypes.TEXT)
								}
				});
				return Recipe;
};