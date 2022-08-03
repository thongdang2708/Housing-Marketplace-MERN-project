
const express = require("express");

const {createHouse, displayTopFive, displaySell, displayRent, getSingleHousing, getAllHousing, getHousingOffers, deleteHousing, getFull} = require("../controllers/housingControllers");

const {protect} = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getAllHousing).post(protect, createHouse);
router.route("/sell").get(displaySell);
router.route("/rent").get(displayRent);
router.route("/topfive").get(displayTopFive);
router.route("/offers").get(getHousingOffers);
router.route("/full").get(getFull);
router.route("/:id").get(getSingleHousing).delete(protect, deleteHousing);


module.exports = router;