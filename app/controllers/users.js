const logger = require('../logger');
const { createUser, findUserByEmail } = require('../services/users');
const { encryptPassword, validPassword } = require('../helpers/password');
const { createUserToken } = require('../helpers/user');
const { dataNotFoundError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    logger.info(`Init create user by email: ${email}`);
    const newPassword = await encryptPassword(password);
    const user = await createUser({ name, lastName, email, password: newPassword });
    logger.info(`The ${email} is created successfull`);
    return res.status(201).json(user.name);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    logger.info(`Init login user by email: ${email}`);
    const dataUser = await findUserByEmail(email);
    if (!dataUser) {
      logger.error('email', dataUser);
      throw dataNotFoundError(ErrorMessages.PASSWORD_OR_EMAIL_NOT_MATCH);
    }
    const { dataValues } = dataUser;
    const validpasword = await validPassword(password, dataValues.password);
    if (!validpasword) {
      logger.error('password', validpasword);
      throw dataNotFoundError(ErrorMessages.PASSWORD_OR_EMAIL_NOT_MATCH);
    }
    const token = createUserToken(dataValues);
    logger.info(`The ${email} created token is successfull`);
    return res.status(200).json({ ...dataValues, token });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
