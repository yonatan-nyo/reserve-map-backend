const express = require("express");
const UsersRouter = require("./UsersRouter");
const SpotsRouter = require("./SpotsRouter");
const TransactionController = require("../controllers/TransactionController");
const Authentication = require("../middlewares/Authentication");
const BookingController = require("../controllers/BookingController");
const Controller = require("../controllers/Controller");
const router = express.Router();

router.use("/spots", SpotsRouter);
router.use("/users", UsersRouter);
router.post("/weather", Controller.getWeather);
router.post("/midtrans-token/:spotId", Authentication, TransactionController.generateMidTransToken);
router.post("/postbook", Authentication, BookingController.postBook);

module.exports = router;
