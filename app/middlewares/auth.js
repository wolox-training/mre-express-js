const logger = require('../logger');
const { jwtMachError } = require('../errors');
const ErrorMessages = require('../../config/error');
const { validateUserToken } = require('../helpers/user');

exports.authValidator = async (req, _, next) => {
  try {
    if (!req.headers.authorization) {
      logger.error('The user not have authorization');
      throw jwtMachError(ErrorMessages.JWT_MACH_ERROR);
    }
    const token = req.headers.authorization.replace(/^Bearer\s+/, '');
    await validateUserToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
