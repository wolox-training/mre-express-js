const logger = require('../logger');
const { getUsers, createUser, findUserByEmail } = require('../services/users');
const { encryptPassword, validPassword } = require('../helpers/password');
const { createUserToken } = require('../helpers/user');
const { badRequestError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.getUsers = async (req, res, next) => {
  try {
    logger.info('Init get all users');
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const users = await getUsers(page, limit);
    logger.info('Finish get all users');
    return res.status(200).json(users);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};

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
      logger.error('The user not exit in the database', dataUser);
      throw badRequestError(ErrorMessages.PASSWORD_OR_EMAIL_NOT_MATCH);
    }
    const { dataValues } = dataUser;
    const validpasword = await validPassword(password, dataValues.password);
    if (!validpasword) {
      logger.error('The password is not mach', validpasword);
      throw badRequestError(ErrorMessages.PASSWORD_OR_EMAIL_NOT_MATCH);
    }
    const token = await createUserToken(dataValues);
    logger.info(`The ${email} created token is successfull`);
    return res.status(200).json(token);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
