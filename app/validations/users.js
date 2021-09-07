const ErrorMessages = require('../../config/error');
const { constants } = require('../../config/constants');
const { badRequestError, dataExistError } = require('../errors');
const { findUserByEmail } = require('../services/users');

exports.validatePassword = password => {
  const isAphanumeric = constants.ALPHANUMERIC.test(password);
  if (!isAphanumeric) {
    throw badRequestError(ErrorMessages.PASSWORD_NOT_COMPLY);
  }
  return isAphanumeric;
};

exports.validateEmail = email => {
  const isValidEmail = constants.EMAIL_MACH.test(email);
  if (!isValidEmail) {
    throw badRequestError(ErrorMessages.USER_EMAIL_NOT_COMPANY);
  }
  return isValidEmail;
};

exports.existEmail = async email => {
  const exitEmail = await findUserByEmail(email);
  if (exitEmail) {
    throw dataExistError(ErrorMessages.USER_EMAIL_EXITS);
  }
  return {};
};
