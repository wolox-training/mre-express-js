const bcrypt = require('bcryptjs');
const { constants } = require('../../config/constants');

exports.encryptPassword = async password => {
  const salt = await bcrypt.genSaltSync(constants.LENGTH_PASSWORD_ENCRYPT);
  const encryptPassword = bcrypt.hashSync(password, salt);
  return encryptPassword;
};

exports.validPassword = (password, comparePassword) => bcrypt.compare(password, comparePassword);
