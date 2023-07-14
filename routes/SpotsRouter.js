const express = require("express");
const router = express.Router();
const SpotController = require("../controllers/SpotController");

router.get("/", SpotController.getAll);
router.post("/", SpotController.post);

module.exports = router;
