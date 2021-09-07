const constants = Object.freeze({
  ALPHANUMERIC: /^[a-zA-Z0-9]{8,}$/,
  EMAIL_MACH: /[\w._%+-]+@(?:wolox)\.(com|co|cl|ar)$/,
  LENGTH_PASSWORD_ENCRYPT: 8
});

module.exports = {
  constants
};
