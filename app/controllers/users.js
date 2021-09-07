const logger = require('../logger');
const { createUser } = require('../services/users');
const { validatePassword, validateEmail, existEmail } = require('../validations/users');
const { encryptPassword } = require('../helpers/password');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    logger.info(`Init create user by email: ${email}`);
    validateEmail(email);
    validatePassword(password);
    await existEmail(email);
    const newPassword = await encryptPassword(password);
    const user = await createUser({ name, lastName, email, password: newPassword });
    logger.info(`The ${email} is created successfull`);
    return res.status(201).json(user.name);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
