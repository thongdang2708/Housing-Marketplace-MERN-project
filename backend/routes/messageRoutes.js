
const express = require("express");

const {addMessage} = require("../controllers/messageControllers");

const router = express.Router();


router.route("/").post(addMessage);

module.exports = router;