const { Spot, User, Following, Booking, Transaction } = require("../models");

class SpotController {
  static async getAll(req, res, next) {
    try {
      const { typeId } = req.query;

      let option = { where: {} };
      if (+typeId === 1) option.where.isRestaurant = true;
      if (+typeId === 2) option.where.isCafe = true;
      if (+typeId === 3) option.where.isPark = true;

      const spots = await Spot.findAll(option);

      res.status(200).json(spots);
    } catch (err) {
      next(err);
    }
  }
  static async post(req, res, next) {
    try {
      const { name, isRestaurant, isCafe, isPark, email, lat, lng } = req.body;

      const createdSpot = await Spot.create({ name, isRestaurant, isCafe, isPark, email, lat, lng });

      res.status(200).json({
        createdSpot,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = SpotController;
