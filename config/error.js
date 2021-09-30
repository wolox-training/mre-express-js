const ErrorMessages = {
  // Weet Api
  WEET_API_ERROR: 'Weet api request is failed',

  // User
  NAME_REQUIRED: 'The name is required.',
  LASTNAME_REQUIRED: 'The name is required.',
  EMAIL_REQUIRED: 'The email is required.',
  PASSWORD_REQUIRED: 'The password is required.',
  PASSWORD_NOT_LENGTH: 'Password should be at least 8 characters',
  USER_EMAIL_NOT_COMPANY: 'The email is not pertain to company.',
  USER_EMAIL_EXIST: 'This email already exist.',
  PASSWORD_NOT_COMPLY: 'The password not comply the required.',
  PASSWORD_NOT_ENCRYPT: 'The password encrypt have an error.',
  PASSWORD_OR_EMAIL_NOT_MATCH: 'Error due to incorrect access or password failure',
  JWT_TOKEN_ERROR: 'Error created the jwt token',
  JWT_MACH_ERROR: 'The user is not authorized',
  JWT_EXPIRED_ERROR: 'The token user is expired'
};

module.exports = ErrorMessages;
