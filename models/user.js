module.exports = function(sequelize, DataTypes){
				var User = sequelize.define('user', {
								name_first: {
												type: DataTypes.STRING
								},
								name_last: {
												type: DataTypes.STRING
								},
								id: {
												type: DataTypes.STRING,
												primaryKey: true
								}
				});
				return User;
};