module.exports = function(sequelize, DataTypes){
				var Recipe = sequelize.define('recipe', {
								name: {
												type: DataTypes.STRING
								},
								id: {
												type: DataTypes.STRING,
												primaryKey: true
								},
								ingredients: {
												type: DataTypes.ARRAY(DataTypes.STRING)
								},
								steps: {
												type: DataTypes.ARRAY(DataTypes.TEXT)
								},
								author: {
												type: DataTypes.STRING
								}
				});
				return Recipe;
};