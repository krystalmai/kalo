const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ingredientSchema = Schema(
  { id: {type: Number, required: true},
    name: { type: String, required: true },
    category: { type: String, required: true },
    calories_per_100g: {type: Number, required: true},
    carbs_per_100g: {type: Number, required: true},
    protein_per_100g: {type: Number, required: true},
    fat_per_100g: {type: Number, required: true},
    saturated_fat_per_100g: {type: Number, required: true},
    fiber_per_100g: {type: Number, required: true},
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);


const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;