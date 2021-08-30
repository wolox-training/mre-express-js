const { url } = require('../../config').common.api;
const axios = require('axios');

exports.getWeet = async () => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}
