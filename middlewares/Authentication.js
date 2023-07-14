const { getPayload } = require("../helpers/jwt");
const { User } = require("../models");

async function Authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthenticated" };

    const payload = getPayload(access_token);
    if (!payload) throw { name: "Unauthenticated" };

    const { email, myKey } = payload;
    if (myKey !== email.substring(email.length - 2)) throw { name: "Unauthenticated" };

    const user = await User.findOne({ where: { email } });
    if (!user) throw { name: "Unauthenticated" };

    req.additionalData = {
      userId: user.id,
      userEmail: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = Authentication;
