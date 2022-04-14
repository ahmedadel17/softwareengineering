const express = require('express');
const bodyparser = require('body-parser');
const mongoose=require('mongoose');
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost:27017/Rafiqusers",{useNewUrlParser:true});
const images="theway.jpg";
let theemailnav;
const userschema={
  email:String,
  password:String,
}
const user=new mongoose.model("user",userschema);
app.get("/signup",function(req,res){
  // res.sendFile(__dirname+"/index.html");
  res.render("index")

});
app.get("/iwillbethere",function(req,res){
  res.render("image",{emailtitle:theemailnav,bookname:"i will be there",bookdescription:"iwill be there for you",bookstock:40,source:"there.jpg"})
})
app.get("/noplacelikehere",function(req,res){
  res.render("image",{emailtitle:theemailnav,bookname:"No Place like here",bookdescription:"a story talking about agood place",bookstock:60,source:"place.jpg"});
})
app.get("/image",function(req,res){
  res.render("image",{emailtitle:theemailnav,bookname:"theway",bookdescription:"hello world",bookstock:30,source:"theway.jpg"});
})
app.get("/signin",function(req,res){
  res.render("signin")
})
// home page
app.get("/",function(req,res){
  res.render("main",{theimage:images,emailtitle:theemailnav});
});
// about us page
app.get("/aboutus",function(req,res){
  res.render("aboutus",{heading:"aboutus",emailtitle:theemailnav});

})
//privacy page
app.get("/privacy",function(req,res){
  res.render("privacy",{title:"Privacy",emailtitle:theemailnav});
});
// help page
app.get("/help",function(req,res){
  res.render("help",{title:"Help",emailtitle:theemailnav})
});
// questions page
app.get("/questions",function(req,res){
  res.render("questions",{title:"Questions & answers",emailtitle:theemailnav});
});
// contactuspage
app.get("/contactus",function(req,res){
  res.render("contactus",{title:"Contact US",emailtitle:theemailnav})
})

app.post("/signup",function(req,res){
    const useremail=req.body.email;
    const userpassword=req.body.password;

  const newuser=new user({
    email:useremail,
    password:userpassword
  });
  if (useremail==="" ||userpassword===""){
    console.log("not allowed");
  }
  newuser.save(function(err){
    if(err){
      console.log(err);
    }else{
      theemailnav=useremail;
      res.redirect("/")
    }
  })
  // console.log(req.body.email);
  // console.log(req.body.password);
  // res.redirect("/")
});

app.post("/signin",function(req,res){
  console.log(req.body.email);
  console.log(req.body.password);
  const email=req.body.email;
  const password=req.body.password;
  user.findOne({email:email},function(err,founduser){
    if(err){
      console.log(err);

    }
    else if(founduser){
      if(founduser.password===password){
        theemailnav=email;
        res.redirect("/");

      }else{
        res.redirect("/signup")
      }

    }
  })
  // res.rdirect("/");
})

app.listen(3000,function(){
  console.log("server started at local host:3000");
})
