const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
  await queryInterface.createTable('users', {
    ID: { type: Sequelize.INTEGER, unique: true, autoIncrement: true, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    gmail: { type: Sequelize.STRING, unique: true, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false }
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('users');
}

module.exports = { up, down };
