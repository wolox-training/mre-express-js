const { checkSchema } = require('express-validator/check');
const { validationResult } = require('express-validator');
const logger = require('../logger');
const { schemaError } = require('../errors');

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
