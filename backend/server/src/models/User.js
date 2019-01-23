const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  recipes: [ObjectId],
  memberSince: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  }
});

UserSchema.virtual("public").get(function() {
  const {
    email,
    password,
    ...details
  } = this;
  return details;
});

const User = model("User", UserSchema);

module.exports = User;
