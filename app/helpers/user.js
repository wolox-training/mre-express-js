const jwt = require('jsonwebtoken');
const logger = require('../logger');
const config = require('../../config').common.jwt;
const { jwtError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.createUserToken = user => {
  try {
    return jwt.sign(user, config.secretKey, {
      expiresIn: config.secretKeyExpires
    });
  } catch (error) {
    logger.error('Error created jwt token', error);
    throw jwtError(ErrorMessages.JWT_TOKEN_ERROR);
  }
};
