const axios = require('axios');
const { weetApi } = require('../../config').common.api;
const { weetApiError } = require('../errors');
const ErrorMessages = require('../../config/error');

exports.getWeet = async () => {
  try {
    const { data } = await axios.get(weetApi);
    return data;
  } catch (error) {
    return weetApiError(ErrorMessages.WEET_API_ERROR);
  }
};
