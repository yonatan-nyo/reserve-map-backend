class Authorization {
  static async admin(req, res, next) {
    try {
      if (!require("../data/authorizedEmail.json").find((v) => v === req.additionalData.userEmail)) {
        throw { name: "Unauthorized" };
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  static async spot(req, res, next) {
    try {
    } catch (error) {}
  }
}
module.exports = Authorization;
