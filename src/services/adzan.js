const cheerio = require("cheerio");
const { TARGET_URL } = require("../constants/constants");
const { getDataHtml } = require("../utils");

class AdzanService {
    static async getAdzanTimeFullMonth(cityId, month, year) {
        const dataHtml = await getDataHtml(TARGET_URL + `?id=${cityId}&m=${month}&y=${year}`);
        const $ = cheerio.load(dataHtml);

        const dataAdzan = [];

        const data = $("tr[align=center]").map((id, element) => {
            const rowData = [];
            for (let i = 0; i < 9; i++) {
                const data = $(element).find("td").eq(i).text();
                rowData.push(data);
            }
            dataAdzan.push(rowData);
        });
        dataAdzan.pop();

        const finalDataAdzan = [];

        for (let i = 1; i < dataAdzan.length; i++) {
            const objAdzanTime = {
                date: dataAdzan[i][0],
            };
            const adzan = {};
            for (let j = 1; j < dataAdzan[0].length; j++) {
                adzan[[dataAdzan[0][j]]] = dataAdzan[i][j];
            }
            objAdzanTime["adzan"] = adzan;

            finalDataAdzan.push(objAdzanTime);
        }

        return finalDataAdzan;
    }
}

module.exports = AdzanService;
