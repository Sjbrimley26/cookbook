const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const example = {
  author: "askdjsfgodhf2035",
  name: "Mapo Tofu",
  ingredients: [
    "1 lb Ground Pork",
    "14 oz Firm Tofu",
    "3 Tb Soy Sauce",
    "1-1/2 Tb Chili Oil",
    "1 Tb Seasame Paste",
    "2 Tb Hoisin Sauce",
    "1 Tb Ground Sriracha Peppercorn",
    "4 cloves garlic",
    "1 cup water"
  ],
  directions: [
    "Fry garlic until slightly translucent",
    "Add pork add cook until half pink",
    "Add in seasonings, water, and tofu",
    "Simmer about half an hour until slightly thickened"
  ]
};

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
