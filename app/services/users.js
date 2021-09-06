const { User } = require('../models/index');
const logger = require('../logger');
const { databaseError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.createUser = async (name, lastName, email, password) => {
  try {
    return await User.create({
      name,
      lastName,
      email,
      password
    });
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
