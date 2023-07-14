const midtransClient = require("midtrans-client");
const { hashPw } = require("../helpers/bcrypt");
const { Spot, User, Following, Booking, Transaction } = require("../models");

class TransactionController {
  static async generateMidTransToken(req, res, next) {
    try {
      const { gross_amount } = req.body;
      if (isNaN(gross_amount)) throw { name: "invalidPrice" };
      const { spotId } = req.params;
      console.log(spotId);
      const { userId } = req.additionalData;
      const user = User.findByPk(userId);

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID" + hashPw(`${Math.floor(Math.random() * 10)}`).substring(0, 10),
          gross_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      const transactionDetail = {
        value: gross_amount,
        hasUserPaid: true,
        isSentToSpot: false,
        UserId: userId,
        SpotId: spotId,
      };

      res.status(201).json({ token: transaction.token, transactionDetail });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = TransactionController;
