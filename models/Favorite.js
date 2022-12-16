const mongoose = require('mongoose');
const Recipe = require('./Recipe');
const User = require('./User');
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
  user: {type: ObjectId, ref: User, required: true},
  recipe: {type: ObjectId, ref: Recipe, required}
},
{ timestamps: true })

const Favorite = mongoose.model("Favorite", favoriteSchema)
module.exports = Favorite