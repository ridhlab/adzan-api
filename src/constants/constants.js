const { data: cities } = require("../data/city.json");

module.exports = {
    TARGET_URL: process.env.TARGET_URL,
    NUM_OF_CITY: cities.length,
};
