//jshint esversion:6

//  ------------------ requirements ------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const db = require('../db/db.js');


//  ---------------  DB   ------------------
const Post = db.Post;
const Ingredient = db.Ingredient;
const SellProduct = db.SellProduct;


// ------------------ lurespam Data -----------------
let homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//  ------------------ setups ------------------------
const blog = express();

blog.set('view engine', 'ejs');

blog.use(bodyParser.urlencoded({extended: true}));
blog.use(express.static("public"));


// ------------------- Variables -------------------

let posts =[];
let postID =[];


// -------------------- Application -----------------
blog.get("/", (req, res)=>{
  res.render("blog/home", {
    homeStartingContent: homeStartingContent,
    posts: posts,

  });

})

blog.get("/about", (req,res)=>{
  res.render("blog/about", {aboutContent: aboutContent});
})

blog.get("/contact", (req, res)=>{
  res.render("blog/contact", {contactContent: contactContent});
})


// Dynamic URL
blog.get("/post/:postID", (req, res)=>{

  // Matching URL with post title
const postID = _.lowerCase(req.params.postID);
  posts.forEach(post=>{
    const title = _.lowerCase(post.title);
    if(postID === title){
      console.log("Matched");
      res.render('blog/post', {
        title: post.title,
        content:post.content,
      });

    }else{
      console.log("Something is wrong!");
    }
    // I dont like the logic above, its not fast enough! with extra checking
  });
})

var ingredients = [];
var postData = [];


blog.get("/compose", (req, res)=>{
  res.render("blog/compose", {
    ingredients : ingredients
  });
})

blog.post("/compose", (req, res)=>{

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }

  // req.body.forEach(item => {
  //   postData.push(item);
  //   console.log(postData);

  // });

  console.log(req.body);
  console.log(Object.values(req.body));
const commingData = Object.values(req.body);

inputDataOrganizer(commingData);


  // clearing the array
  ingredients.length = 0;

  posts.push(post);
  res.redirect('/blog/');
});

blog.post("/update", (req, res)=>{

  const ingredient = {
    product : req.body.product,
    amount: req.body.amount,
    measure : req.body.measure
  };
  ingredients.push(ingredient);
  res.redirect('/blog/compose');
})

//  extremly bad code!
function inputDataOrganizer(array){
  const title = array.shift();
const post = array.shift();


  const prepare = array.shift();
  const cook = array.shift();


var length = array[0].length;
console.log(length);


const array2 =[];
var temp = [];
for(var j = 0; j<length; j++){
  for(var i = 0; i< 3 ; i++){
    temp.push(array[i][j]);
  };
    // using methods for clearnig temp need async-await-promise
    array2.push(temp);
    temp = [];
};

const arrayOfObject = [];
  for(var k = 0; k< array2.length; k++){
    console.log(array2);
    console.log(array2[0]);
    console.log(array2[0][0]);
    const postIngredient = new Ingredient({
      product : array2[k][0],
      measure: array2[k][2],
      amount: array2[k][1]

    });
    postIngredient.save();
    arrayOfObject.push(newIngredient);
    console.log(`Arrau of objects are: ${arrayOfObject}`);
  };
  const newPost = new Post({
    name : title,
    prepration : prepare,
    cook : cook,
    ingredients : arrayOfObject,
    method: post
  });
newPost.save();

};


module.exports = blog;
