const cheerio = require("cheerio");
const { TARGET_URL } = require("../constants/constants");
const { getDataHtml } = require("../utils");

class AdzanService {
    parseDataAdzan($) {
        const dataAdzan = [];
        $("tr.table-row-striped").map((id, element) => {
            const rowData = [];
            for (let i = 0; i <= 9; i++) {
                const data = $(element).find("td").eq(i).text();
                rowData.push(data);
            }
            dataAdzan.push(rowData);
        });

        const finalDataAdzan = [];

        for (let i = 0; i < dataAdzan.length; i++) {
            const objAdzanTime = {
                date: dataAdzan[i][0].split(" ").slice(0, 1).join(" "),
                islamicDate: dataAdzan[i][1],
            };
            const adzan = {};
            for (let j = 2; j < dataAdzan[0].length; j++) {
                $("table thead tr").map((key, element) => {
                    adzan[$(element).find("th").eq(j).text().toLowerCase()] = dataAdzan[i][j];
                });
            }
            objAdzanTime["adzan"] = adzan;

            finalDataAdzan.push(objAdzanTime);
        }

        return finalDataAdzan;
    }

    static async getAdzanTime(cityId, month, year, date) {
        const dataHtml = await getDataHtml(TARGET_URL + `?id=${cityId}&m=${month}&y=${year}`);
        const $ = cheerio.load(dataHtml);

        let dataAdzan = new AdzanService().parseDataAdzan($);

        if (date) {
            date = parseInt(date);
            if (!date || date < 1 || date > dataAdzan.length) return dataAdzan;
            return dataAdzan[date - 1];
        }

        return dataAdzan;
    }
}

module.exports = AdzanService;
