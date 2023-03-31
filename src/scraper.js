require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const { TARGET_URL, NUM_OF_CITY } = require("./constants/constants");

const cityList = [];

async function getDataHtml(url) {
    const response = await axios.get(url);
    return response.data;
}

function getCityName($) {
    return $(".table_block_content:first>td>b").text().trim();
}

async function start() {
    for (let i = 1; i <= NUM_OF_CITY; i++) {
        const html = await getDataHtml(TARGET_URL + `?id=${i}`);
        const $ = cheerio.load(html);
        const city = getCityName($);
        cityList.push({ id: i, city });
    }

    fs.writeFile("src/data/city.json", JSON.stringify({ data: cityList }), (err) => {
        if (err) throw err;
        console.log("scraping successfully");
    });
}

start();
