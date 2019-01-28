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
  const { name, recipes, id } = this;
  return { name, recipes, id };
});

const User = model("User", UserSchema);

module.exports = User;
