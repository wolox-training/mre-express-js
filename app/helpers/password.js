const bcrypt = require('bcryptjs');

exports.encryptPassword = async password => {
  const salt = await bcrypt.genSaltSync(8, 'a');
  return bcrypt.hashSync(password, salt);
};

exports.validPassword = (password, comparePassword) => bcrypt.compare(password, comparePassword);
