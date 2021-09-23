const jwt = require('jsonwebtoken');

exports.createUserToken = user =>
  jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: process.env.SECRET_KEY_EXPIRES
  });
