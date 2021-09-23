const { User } = require('../models');
const logger = require('../logger');
const { databaseError, dataNotFoundError } = require('../errors');
const ErrorMessages = require('../../config/error');
const { validPassword } = require('../helpers/password');

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

exports.validatePassword = async (password, comparePassword) => {
  const validpasword = await validPassword(password, comparePassword);
  if (!validpasword) {
    logger.error('password', validpasword);
    throw dataNotFoundError(ErrorMessages.PASSWORD_OR_EMAIL_NOT_MATCH);
  }
  return validPassword;
};

exports.validateUserExists = async email => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    logger.error('email', user);
    throw dataNotFoundError(ErrorMessages.PASSWORD_OR_EMAIL_NOT_MATCH);
  }
  return user.dataValues;
};
