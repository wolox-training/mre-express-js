const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.WEET_API_ERROR = 'weet_api_error';
exports.weetApiError = message => internalError(message, exports.WEET_API_ERROR);

exports.BAD_REQUEST_ERROR = 'bad_request_error';
exports.badRequestError = message => internalError(message, exports.BAD_REQUEST_ERROR);

exports.DATA_EXIST_ERROR = 'data_exist_error';
exports.dataExistError = message => internalError(message, exports.DATA_EXIST_ERROR);

exports.ENCRYPT_PASSWORD_ERROR = 'encrypt_password_error';
exports.encryptPasswordError = message => internalError(message, exports.ENCRYPT_PASSWORD_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);

exports.JWT_ERROR = 'jwt_error';
exports.jwtError = message => internalError(message, exports.JWT_ERROR);
