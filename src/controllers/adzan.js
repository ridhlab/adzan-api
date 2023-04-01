const AdzanService = require("../services/adzan");
const responseErrorInvalidBuilder = require("../services/builder");
const CityService = require("../services/city");

class AdzanController {
    static async getAdzanTime(req, res) {
        let { cityId, month, year } = req.query;
        const city = CityService.getCity(parseInt(cityId));
        month = parseInt(month);
        year = parseInt(year);

        if (!month || month > 12 || month < 1) {
            return res.status(400).send(responseErrorInvalidBuilder("month"));
        }
        if (!year || year < 1) {
            return res.status(400).send(responseErrorInvalidBuilder("year"));
        }

        if (!city) {
            return res.status(400).send(responseErrorInvalidBuilder("city"));
        }

        const adzanTimeFullMonth = await AdzanService.getAdzanTimeFullMonth(cityId, month, year);

        return res.status(200).send({
            statusCode: 200,
            message: "Success get data",
            data: {
                city,
                month: month.toString(),
                year: year.toString(),
                adzanTime: adzanTimeFullMonth,
            },
        });
    }
}

module.exports = AdzanController;
