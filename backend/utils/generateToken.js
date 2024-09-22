const jwt = require("jsonwebtoken");

const User = require("../model/userSchema");

exports.generateToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token, "token");
  return token;
};
