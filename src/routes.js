const { Router } = require("express");
const CityController = require("./controllers/city");
const AdzanController = require("./controllers/adzan");

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to adzan api",
        endpoints: {
            getCity: "/city",
            getCityDetail: "/city/:id",
            getAdzanTime: "/adzan?cityId={cityId}&month={month}&year={year}&date={date}",
        },
        author: "Muhammad Ridwan",
        sourceCode: "https://github.com/ridhlab/adzan-api",
    });
});

router.get("/city", CityController.getAllCity);
router.get("/city/:id", CityController.getCity);

router.get("/adzan", AdzanController.getAdzanTime);

router.get("*", (req, res) => {
    return res.status(404).send({ statusCode: 400, message: "Not found" });
});

module.exports = router;
