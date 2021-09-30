const jwt = require('jsonwebtoken');
const logger = require('../logger');
const config = require('../../config').common.jwt;
const { jwtMachError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.authValidator = async (req, res, next) => {
  let token = '';
  if (!req.headers.authorization) {
    logger.error('The user not have authorization');
    return next(jwtMachError(ErrorMessages.JWT_MACH_ERROR));
  }
  token = req.headers.authorization.substring(7);
  await jwt.verify(token, config.secretKey, (error, decoded) => {
    if (error) {
      logger.error('The token is not verify', error);
      return next(jwtMachError(ErrorMessages.JWT_EXPIRED_ERROR));
    }
    req.body.user = decoded.user;
    return decoded;
  });
  return next();
};
