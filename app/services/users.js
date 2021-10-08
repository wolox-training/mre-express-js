const { User } = require('../models');
const logger = require('../logger');
const { databaseError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.getUsers = async (offset, limit) => {
  try {
    const user = await User.findAndCountAll({
      attributes: ['id', 'name', 'lastName', 'email'],
      limit,
      offset
    });
    return {
      page: parseInt(offset),
      limit: parseInt(limit),
      count: user.count,
      users: user.rows
    };
  } catch (error) {
    logger.error(error.message);
    throw databaseError(ErrorMessages.DATABASE_ERROR);
  }
};

exports.createUser = async user => {
  try {
    return await User.create(user);
  } catch (error) {
    logger.error(error.message);
    throw databaseError(ErrorMessages.DATABASE_ERROR);
  }
};

exports.findUserByEmail = async email => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    logger.error(error.message);
    throw databaseError(ErrorMessages.DATABASE_ERROR);
  }
};
