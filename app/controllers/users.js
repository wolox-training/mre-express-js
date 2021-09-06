const ALPHANUMERIC = /^[a-zA-Z0-9]{8,}$/;
const EMAIL_MACH = /[\w._%+-]+@(?:wolox)\.(com|co|cl|ar)$/;
const logger = require('../logger');
const { createUser, findUserByEmail } = require('../services/users');
const ErrorMessages = require('../../config/error');

exports.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!ALPHANUMERIC.test(password)) {
      logger.error(ErrorMessages.PASSWORD_NOT_COMPLY);
      return res.status(400).json(ErrorMessages.PASSWORD_NOT_COMPLY);
    }

    if (!EMAIL_MACH.test(email)) {
      logger.error(ErrorMessages.USER_EMAIL_NOT_COMPANY);
      return res.status(400).json({ message: ErrorMessages.USER_EMAIL_NOT_COMPANY });
    }

    const exitEmail = await findUserByEmail(email);
    if (exitEmail) {
      logger.error(ErrorMessages.USER_EMAIL_EXITS);
      return res.status(400).json({ message: ErrorMessages.USER_EMAIL_EXITS });
    }
    const user = await createUser(name, lastName, email, password);

    return res.status(201).json(user.name);
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
