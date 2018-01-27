module.exports = function(sequelize, DataTypes){
				var User = sequelize.define('user', {
								name: {
												type: DataTypes.STRING
								},
								id: {
												type: DataTypes.STRING,
												primaryKey: true
								}
				});
				return User;
};