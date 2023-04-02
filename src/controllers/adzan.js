const AdzanService = require("../services/adzan");
const responseErrorInvalidBuilder = require("../services/builder");
const CityService = require("../services/city");

class AdzanController {
    static async getAdzanTime(req, res) {
        let { cityId, month, year, date } = req.query;

        const city = CityService.getCity(parseInt(cityId));

        month = parseInt(month);
        year = parseInt(year);

        if (!city) {
            return res.status(400).send(responseErrorInvalidBuilder("city"));
        }
        if (!month || month > 12 || month < 1) {
            month = new Date().getMonth() + 1;
        }
        if (!year || year < 1) {
            year = new Date().getFullYear();
        }

        const adzanTime = await AdzanService.getAdzanTime(cityId, month, year, date);

        return res.status(200).send({
            statusCode: 200,
            message: "Success get data",
            data: {
                city,
                ...(!adzanTime.length && { date }),
                month: month.toString(),
                year: year.toString(),
                data: adzanTime,
            },
        });
    }
}

module.exports = AdzanController;
