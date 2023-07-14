const { Spot, User, Following, Booking, Transaction } = require("../models");
const { default: axios } = require("axios");

class Controller {
  static async home(req, res, next) {
    res.status(200).json({
      success: true,
    });
  }
  static async getWeather(req, res, next) {
    try {
      const { lat, lng } = req.body;
      const { data } = await axios({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API_KEY}`,
        method: "GET",
      });
      res.status(200).json(data.weather[0].main);
      // res.status(200).json("Rain");
    } catch (error) {}
  }
}
module.exports = Controller;
