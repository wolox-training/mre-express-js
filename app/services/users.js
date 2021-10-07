const { User } = require('../models');
const logger = require('../logger');
const { databaseError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.getUsers = async (offset, limit) => {
  try {
    const user = await User.findAndCountAll({
      limit,
      offset
    });
    return {
      page: parseInt(offset),
      limit: parseInt(limit),
      ...user
    };
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
