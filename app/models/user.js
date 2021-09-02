const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: { type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE }
    },
    {
      underscored: true,
      hooks: {
        beforeCreate: async user => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(8, 'a');
            // eslint-disable-next-line require-atomic-updates
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      },
      instanceMethods: {
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        }
      }
    }
  );
  return User;
};
