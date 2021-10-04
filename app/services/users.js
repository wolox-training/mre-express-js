const { User } = require('../models');
const logger = require('../logger');
const { databaseError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.getUsers = async (offset, limit) => {
  try {
    return await User.findAll({ offset, limit });
  } catch (error) {
    logger.error(error.message);
    return databaseError(ErrorMessages.DATABASE_ERROR);
  }
};

exports.createUser = async user => {
  try {
    return await User.create(user);
  } catch (error) {
    logger.error(error.message);
    return databaseError(ErrorMessages.DATABASE_ERROR);
  }
};

exports.findUserByEmail = async email => {
  try {
    return await User.findOne({ where: { email } });
  } catch (error) {
    logger.error(error.message);
    return databaseError(ErrorMessages.DATABASE_ERROR);
  }
};
