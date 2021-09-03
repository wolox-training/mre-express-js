const EMAIL_MACH = 'wolox.co';
const ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
const MAX_CHARACTERS = 8;
const { User } = require('../models/index');
const logger = require('../logger');
const ErrorMessages = require('../../config/error');

exports.createUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  if (!ALPHANUMERIC.test(password) && password.length >= MAX_CHARACTERS) {
    logger.error(ErrorMessages.PASSWORD_NOT_COMPLY);
    res.status(400).json(ErrorMessages.PASSWORD_NOT_COMPLY);
  }

  const validateEmail = email.split('@', 2);
  if (EMAIL_MACH !== validateEmail[1]) {
    logger.error(ErrorMessages.USER_EMAIL_NOT_COMPANY);
    res.status(400).json({ message: ErrorMessages.USER_EMAIL_NOT_COMPANY });
  }

  const exitEmail = await User.findOne({ where: { email } });
  if (exitEmail) {
    logger.error(ErrorMessages.USER_EMAIL_EXITS);
    res.status(400).json({ message: ErrorMessages.USER_EMAIL_EXITS });
  }
  const user = await User.create({
    name,
    lastName,
    email,
    password
  });

  res.status(201).json(user.name);
};
