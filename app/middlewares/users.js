const { dataExistError } = require('../errors');
const ErrorMessages = require('../../config/error');
const { findUserByEmail } = require('../services/users');

exports.existUserDB = async (req, _, next) => {
  const exitEmail = await findUserByEmail(req.body.email);
  if (exitEmail) {
    return next(dataExistError(ErrorMessages.USER_EMAIL_EXIST));
  }
  return next();
};
