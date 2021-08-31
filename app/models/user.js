module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    ID: { type: DataTypes.INTEGER, unique: true, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    gmail: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  });
  return User;
};
