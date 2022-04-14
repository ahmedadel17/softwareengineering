const express = require('express');
const bodyparser = require('body-parser');
const mongoose=require('mongoose');
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/testusers",{useNewUrlParser:true});
const userschema={
    email:String,
    password:String,
    firstname:String,
    lastname:String,
    username:String,
    city:String,
    State:String,
    zip:String,
    Gender:String
  }
  const User=new mongoose.model("User",userschema);
  app.get("/signup",function(req,res){
      res.sendFile(__dirname+"/signup.html");
  });
  app.post("/signup",function(req,res){
      const Firstname=req.body.firstname;
      const Lastname=req.body.lastname;
      const Email=req.body.email;
      const Password=req.body.password;
      const Username=req.body.username;
      const Zip=req.body.zip;
      const cominguser=new User({
          email:Email,
          password:Password,
          firstname:Firstname,
          lastname:Lastname,
          username:Username,
          city:"egypt",
          state:"mansoura",
          zip:Zip,
          Gender:"male"
      })
      res.send("Done");

  })
  app.listen("4000",function(){
      console.log("the server is working on 4000");
  })