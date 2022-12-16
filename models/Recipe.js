const mongoose = require("mongoose");
const Ingredient = require("./Ingredient");
const User = require("./User");
const Schema = mongoose.Schema;

const recipeSchema = Schema({
  owner: { type: ObjectId, ref: User },
  name: { type: String, required: true },
  ingredients: [
    {
      id: { type: ObjectId, ref: Ingredient, required: true },
      amount: { type: Number, required: true },
      unit: { type: String, required: true },
    }
  ],
  instruction: { type: String, default: "" },
  calories: { type: Number },
});

const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe