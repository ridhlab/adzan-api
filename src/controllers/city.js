const CityService = require("../services/city");

class CityController {
    static getAllCity(req, res) {
        const cities = CityService.getAllCity();
        return res.status(200).send({ statusCode: 200, data: cities });
    }

    static getCity(req, res) {
        let id = req.params.id;
        id = parseInt(id);

        const city = CityService.getCity(id);

        if (!city) {
            return res.status(400).send({ statusCode: 400, message: "City not found" });
        }

        return res.status(200).send({ statusCode: 200, data: city });
    }
}

module.exports = CityController;
