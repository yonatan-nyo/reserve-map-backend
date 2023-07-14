const { generateToken } = require("../helpers/jwt");
const { Spot, User, Following, Booking, Transaction } = require("../models");
const { default: axios } = require("axios");
const serviceAccount = require("../path/to/serviceAccountKey.json");
const { admin } = require("../path/firebase/admin");
const { uuid } = require("uuidv4");

class UserController {
  static async githubSignIn(req, res, next) {
    try {
      const { username, email } = req.body;

      const [user, isCreated] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username,
        },
        hooks: false,
      });
      if (!user.isActive) throw { name: "DeletedUser" };

      const statusCode = isCreated ? 201 : 200;
      res.status(statusCode).json({
        access_token: generateToken({ email: user.email, myKey: user.email.substring(user.email.length - 2) }),
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getProfile(req, res, next) {
    try {
      const { userId } = req.additionalData;

      const user = await User.findByPk(userId);
      if (!user) throw { name: "empty" };

      if (!user.isActive) throw { name: "DeletedUser" };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async getHistories(req, res, next) {
    try {
      const { userId } = req.additionalData;
      const histories = await Transaction.findAll({ where: { UserId: userId }, include: Spot });

      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }
  static async getLocation(req, res, next) {
    try {
      const { lat, lng } = req.body;
      const { data } = await axios({
        url: `https://api.opencagedata.com/geocode/v1/json?key=01e1e5a2ed7140748483731478cc9f37&q=${lat},${lng}`,
        method: "GET",
      });
      res.status(200).json(data.results[0].formatted);
    } catch (error) {
      next(error);
    }
  }
  static async editProfile(req, res, next) {
    try {
      const { username } = req.body;
      const image = req.files?.image;
      const { userId } = req.additionalData;

      let imgUrl = "";

      if (image) {
        const str = uuid();
        const fileExtension = image.name.split(".").pop(); // Get the file extension
        const fileName = str.slice(str.length - 10) + "." + fileExtension;
        const bucket = admin.storage().bucket();
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream();

        await new Promise((resolve, reject) => {
          blobStream.on("finish", () => {
            resolve(blobStream);
          });

          blobStream.on("error", (error) => {
            reject(error);
          });

          blobStream.end(image.data);
        });

        imgUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`;
      }

      let UpdateItems = {};
      if (imgUrl) UpdateItems.imgUrl = imgUrl;
      if (username) UpdateItems.username = username;

      await User.update(UpdateItems, { where: { id: userId } });

      res.status(200).json({
        message: "Successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const { userId } = req.additionalData;

      await User.update({ isActive: false }, { where: { id: userId } });

      res.status(200).json({
        message: "Your account has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
