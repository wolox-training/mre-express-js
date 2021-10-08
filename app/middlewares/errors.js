const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.WEET_API_ERROR]: 500,
  [errors.BAD_REQUEST_ERROR]: 400,
  [errors.DATA_EXIST_ERROR]: 409,
  [errors.ENCRYPT_PASSWORD_ERROR]: 400,
  [errors.SCHEMA_ERROR]: 422,
  [errors.DATA_NOT_FOUND_ERROR]: 400,
  [errors.JWT_ERROR]: 400,
  [errors.JWT_MACH_ERROR]: 401
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
