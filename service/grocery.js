//  ----------- Modules require ------------
const express = require('express');
const bodyParser = require("body-parser");
const grocery = express();

const _ = require('lodash');
const db = require('../db/db.js');


//  ---------------  DB   ------------------
const Post = db.Post;
const Ingredient = db.Ingredient;
const SellProduct = db.SellProduct;



//  ------------ Modules setups ------------
// Set the view engine to ejs
grocery.set("view engine", "ejs");
// Body parser for parsing data from ejs file
grocery.use(bodyParser.urlencoded({
  extended: true
}));


//  define
const basket = [];
const idArrya = [];


// --------- Routing -------------------

grocery.route('/add')
.get((req,res)=>{
  res.render('index')
})
.post((req ,res)=> {



  const shopIngredient = new Ingredient({
      product : req.body.product,
      measure : req.body.measure,
      amount : req.body.amount
    });

  shopIngredient.save();



  const newSellProduct = new SellProduct({
    brand : req.body.brand,
    price : req.body.price,
    expiration : req.body.expiration,
    quantity : req.body.quantity,
    ingredients : shopIngredient
  });
  newSellProduct.save();
  console.log(newSellProduct);
  res.redirect("/");



});


grocery.route('/')
.get((req,res)=>{
  SellProduct.find((err, results) =>{
    if(!err){
      res.render('homePage',{
        items : results,
        basket : basket
      });}
  });
})
.post((req, res)=> {
  const id = req.body.id;
  //  search by id
  SellProduct.findById(id, (err, result)=>{
    if(!err){

      basket.push(result);

      idArrya.push(id);
      res.redirect("/");
    }
  });
  // alg: (2)
  //
});





//  ---------- Export --------------
module.exports = grocery;
