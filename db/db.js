const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/grocery');


const ingredientSchema = new mongoose.Schema({
  product : String,
  measure : String,
  amount : Number,
});

const sellProductSchema = new mongoose.Schema({
  brand : String,
  price : Number,
  expiration : Date,
  quantity : Number,
  ingredients : ingredientSchema
});

const postSchema = new mongoose.Schema({
  name : String,
  
    prepration: Number,
    cook: Number,

  ingredients : [ingredientSchema],
  method: String
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);
const SellProduct = mongoose.model('sellProduct', sellProductSchema);
const Post = mongoose.model('post', postSchema);

module.exports = {Ingredient, SellProduct, Post};
