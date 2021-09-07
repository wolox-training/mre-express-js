const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { encryptPasswordError } = require('../errors');
const ErrorMessages = require('../../config/error');
const { constants } = require('../../config/constants');

exports.encryptPassword = async password => {
  try {
    const salt = await bcrypt.genSaltSync(constants.LENGTH_PASSWORD_ENCRYPT);
    const encryptPassword = bcrypt.hashSync(password, salt);
    return encryptPassword;
  } catch (error) {
    logger.error(error.message);
    return encryptPasswordError(ErrorMessages.PASSWORD_NOT_ENCRYPT);
  }
};

exports.validPassword = (password, comparePassword) => bcrypt.compare(password, comparePassword);
