const { data: cities } = require("../data/city.json");

module.exports = {
    TARGET_URL: "https://www.jadwalsholat.org/adzan/monthly.php/",
    NUM_OF_CITY: cities.length,
};
