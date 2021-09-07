const ErrorMessages = require('../../config/error');
const { constants } = require('../../config/constants');
const { badRequestError, dataExistError } = require('../errors');
const { findUserByEmail } = require('../services/users');

exports.validatePassword = password => {
  if (!constants.ALPHANUMERIC.test(password)) {
    throw badRequestError(ErrorMessages.PASSWORD_NOT_COMPLY);
  }
  return true;
};

exports.validateEmail = email => {
  if (!constants.EMAIL_MACH.test(email)) {
    throw badRequestError(ErrorMessages.USER_EMAIL_NOT_COMPANY);
  }
  return true;
};

exports.existEmail = async email => {
  const exitEmail = await findUserByEmail(email);
  if (exitEmail) {
    return dataExistError(ErrorMessages.USER_EMAIL_EXITS);
  }
  return true;
};
