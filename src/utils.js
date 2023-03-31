const axios = require("axios");

async function getDataHtml(url) {
    const response = await axios.get(url);
    return response.data;
}

module.exports = { getDataHtml };
