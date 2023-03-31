require("dotenv").config();

const cheerio = require("cheerio");
const fs = require("fs");

const { TARGET_URL, NUM_OF_CITY } = require("./constants/constants");
const { getDataHtml } = require("./utils");

const cityList = [];

function getCityName($) {
    return $(".table_block_content:first>td>b").text().trim();
}

function getGmt($) {
    const text = $(".table_title:first>td>h1.h1_edit").text().trim();
    const arr = text.split(" ");
    return arr[arr.length - 1];
}

function getLocation($) {
    const text = $(".table_block_content:first>td").first().text();
    const arr = text.split(" ");
    return {
        latitude: `${arr[arr.length - 4]} ${arr[arr.length - 3]}`,
        longtitude: `${arr[arr.length - 2]} ${arr[arr.length - 1]}`,
    };
}

function getDirection($) {
    const text = $(".table_block_content:eq(1)").text().trim();
    const arr = text.split(" ");
    return `${arr[1].substring(1)} ${arr[2]}`;
}

function getDistance($) {
    const text = $(".table_block_content:eq(2)").text().trim();
    const arr = text.split(" ");
    return `${arr[1].substring(1)} ${arr[2]}`;
}

async function start() {
    for (let i = 1; i <= NUM_OF_CITY; i++) {
        const html = await getDataHtml(TARGET_URL + `?id=${i}`);
        const $ = cheerio.load(html);
        const city = getCityName($);
        const gmt = getGmt($);
        const location = getLocation($);
        const { latitude, longtitude } = location;
        const directionToMecca = getDirection($);
        const distanceToMecca = getDistance($);
        cityList.push({ id: i, city, gmt, latitude, longtitude, directionToMecca, distanceToMecca });
    }

    fs.writeFile("src/data/city.json", JSON.stringify({ data: cityList }), (err) => {
        if (err) throw err;
        console.log("scraping successfully");
    });
}

start();
