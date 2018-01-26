module.exports = function(sequelize, DataTypes){
				var User = sequelize.define('user', {
								name: {
												type: DataTypes.STRING
								},
								email: {
												type: DataTypes.STRING
								},
								entryList: {
												type: DataTypes.ARRAY(DataTypes.STRING)
								}
				});
				return User;
};