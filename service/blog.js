//jshint esversion:6

//  ------------------ requirements ------------------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


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
      res.render('post', {
        title: post.title,
        content:post.content,
      });

    }else{
      console.log("Something is wrong!");
    }
    // I dont like the logic above, its not fast enough! with extra checking
  });
})




blog.get("/compose", (req, res)=>{
  res.render("blog/compose");
})

blog.post("/compose", (req, res)=>{

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect('/');
})



module.exports = blog;
