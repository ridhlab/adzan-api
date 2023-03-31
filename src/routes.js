const { Router } = require("express");
const CityController = require("./controllers/city");

const router = Router();

router.get("/", (req, res) => {
    res.status(200).send({ message: "success" });
});

router.get("/city", CityController.getAllCity);
router.get("/city/:id", CityController.getCity);

module.exports = router;
