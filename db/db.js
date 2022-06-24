const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/grocery');


const ingredientSchema = new mongoose.Schema({
  product : String,
  measure : String,
  amount : Number,
  expiration : Date,
});


const postSchema = new mongoose.Schema({
  name : String,
  time :{
    prepration: Number,
    cook: Number
  },
  ingredients : [ingredientSchema],
  method: String

});

const Ingredient = mongoose.model('ingredient', ingredientSchema);
const Post = mongoose.model('post', postSchema);

module.exports = {Ingredient, Post};
