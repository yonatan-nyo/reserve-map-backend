const bcrypt = require("bcryptjs");

const checkPw = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

const hashPw = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
module.exports = { checkPw, hashPw };
