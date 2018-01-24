module.exports = function(sequelize, DataTypes){
				var Recipe = sequelize.define('recipe', {
								name: {
												type: DataTypes.STRING
								},
								ingredients: {
												type: DataTypes.ARRAY(DataTypes.STRING)
								},
								steps: {
												type: DataTypes.ARRAY(DataTypes.TEXT)
								}
				});
				return Recipe;
};