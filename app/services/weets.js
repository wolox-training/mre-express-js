const axios = require('axios');
const { weetApi } = require('../../config').common.api;
const { defaultError } = require('../errors');

exports.getWeet = async () => {
  try {
    const { data } = await axios.get(weetApi);
    return data;
  } catch (error) {
    return defaultError(error);
  }
};
