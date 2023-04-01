const { data: cities } = require("../data/city.json");

class CityService {
    static getAllCity() {
        return cities;
    }
    static getCity(id) {
        return cities.find((item) => item.id === id);
    }
}

module.exports = CityService;
