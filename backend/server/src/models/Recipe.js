const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const RecipeSchema = Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  directions: {
    type: [String],
    required: true
  },
  author: {
    type: ObjectId,
    required: true
  }
});

const Recipe = model("Recipe", RecipeSchema);

module.exports = Recipe;
