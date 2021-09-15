const ErrorMessages = require('../../config/error');
// const { constants } = require('../../config/constants');
const { findUserByEmail } = require('../services/users');

exports.userSchema = {
  name: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: ErrorMessages.NAME_REQUIRED
    }
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: ErrorMessages.LASTNAME_REQUIRED
    }
  },
  email: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: ErrorMessages.EMAIL_REQUIRED
    },
    // custom: {
    //   options: email => constants.EMAIL_MACH.test(email),
    //   errorMessage: ErrorMessages.USER_EMAIL_NOT_COMPANY
    // }
    // TODO: CREAR LA VALIDACION DE DOS EMAILS
    custom: {
      options: async email => {
        const { dataValues } = await findUserByEmail(email);
        return dataValues;
      },
      errorMessage: ErrorMessages.USER_EMAIL_EXITS
    }
  },
  password: {
    isEmpty: {
      negated: true,
      errorMessage: ErrorMessages.PASSWORD_REQUIRED
    },
    isLength: {
      errorMessage: ErrorMessages.PASSWORD_NOT_LENGTH,
      options: { min: 6 }
    },
    isAlphanumeric: true,
    errorMessage: ErrorMessages.PASSWORD_NOT_COMPLY
  }
};
