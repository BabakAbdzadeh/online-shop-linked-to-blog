//  ----------- Modules require ------------
const express = require('express');
const bodyParser = require("body-parser");
const grocery = express();

const _ = require('lodash');
const db = require('../db/db.js');


//  ---------------  DB   ------------------
const Post = db.Post;
const Ingredient = db.Ingredient;



//  ------------ Modules setups ------------
// Set the view engine to ejs
grocery.set("view engine", "ejs");
// Body parser for parsing data from ejs file
grocery.use(bodyParser.urlencoded({
  extended: true
}));



// --------- Routing -------------------
grocery.route('/')
.get((req,res)=>{
  res.render('index')
});






//  ---------- Export --------------
module.exports = grocery;
