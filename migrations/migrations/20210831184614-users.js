'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
      {
        id: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, allowNull: false },
        name: { type: Sequelize.STRING, allowNull: false },
        lastname: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, unique: true, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
        createdAt: { type: Sequelize.DATE },
        updatedAt: { type: Sequelize.DATE }
      },
      {
        underscored: true
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  }
};
