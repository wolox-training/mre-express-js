const logger = require('../logger');
const { createUser, validatePassword, validateUserExists } = require('../services/users');
const { encryptPassword } = require('../helpers/password');
const { createUserToken } = require('../helpers/user');

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
    const dataUser = await validateUserExists(email);
    await await validatePassword(password, dataUser.password);
    const token = createUserToken(dataUser);
    logger.info(`The ${email} created token is successfull`);
    return res.status(200).json({ ...dataUser, token });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
