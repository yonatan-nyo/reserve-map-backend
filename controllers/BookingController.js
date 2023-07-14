const midtransClient = require("midtrans-client");
const { Spot, User, Following, Booking, Transaction } = require("../models");

class BookingController {
  static async postBook(req, res, next) {
    try {
      const { transactionDetail } = req.body;

      const transaction = await Transaction.create(transactionDetail);

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = BookingController;
