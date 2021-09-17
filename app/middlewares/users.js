const { checkSchema } = require('express-validator');
const { validationResult } = require('express-validator');
const logger = require('../logger');
const { schemaError, dataExistError } = require('../errors');
const ErrorMessages = require('../../config/error');
const { findUserByEmail } = require('../services/users');

exports.existUserDB = async (req, _, next) => {
  const exitEmail = await findUserByEmail(req.body.email);
  if (exitEmail) {
    return next(dataExistError(ErrorMessages.USER_EMAIL_EXITS));
  }
  return next();
};

const validateResult = (req, _, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    logger.error(`An error ocurred: ${JSON.stringify(err)}`);
    return next(schemaError(err.mapped()));
  }
  return next();
};
const verifySchema = schema => checkSchema(schema);

exports.validateBySchema = schema => [verifySchema(schema), validateResult];
