const mongoose = require("mongoose");
const Recipe = require("./Ingredient");
const Schema = mongoose.Schema;

const mealSchema = Schema(
  {
    owner: { type: ObjectId, ref: User },
    name: { type: String, required: true },
    dishes: [
      {
        id: { type: ObjectId, ref: Recipe, required: true },
      },
    ],
    calories: { type: Number },
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
