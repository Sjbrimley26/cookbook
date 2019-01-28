const { User } = require("../models");

const bcrypt = require("bcryptjs");

const verifyPassword = async (email, password, next) => {
  if (!email || !password) {
    return next(new Error("Email or password missing!"));
  }

  const user = await User.findOne({
    email
  }).exec();

  if (!user) {
    return next(new Error("No user with that email address!"));
  }

  const { password: hash } = user;

  const match = await bcrypt.compare(password, hash);

  if (match) {
    return user.public;
  } else {
    return next(new Error("Invalid password!"));
  }
};

module.exports = verifyPassword;
