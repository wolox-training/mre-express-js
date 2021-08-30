const axios = require('axios');
const { url } = require('../../config').common.api;

exports.getWeet = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};
