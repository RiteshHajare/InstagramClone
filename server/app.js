 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const bodyParser = require('body-parser')
 const passport = require('passport');
 const session = require("express-session");
 const passportLocalMongoose = require('passport-local-mongoose');

const app =express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
const nextDay = 1000*60*60*24;
app.use(session({
  secret:"someSecret",
  saveUninitialized:true,
  cookie:{maxAge:nextDay},
  resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/instaDB");

const userSchema = new mongoose.Schema({
  email:String,
  username:String,
  password:String,
  userImage:String,
  following:Number,
  followers:Number,
  followingto:[String],
  posts:[{title:String,details:String,postImage:String,userImage:String}]
});
const instaSchema = new mongoose.Schema({
  title:String,
  details:String,
  postImage:String,
  userImage:String
});



userSchema.plugin(passportLocalMongoose);

const UserCred = new mongoose.model("user",userSchema);
passport.use(UserCred.createStrategy());
passport.serializeUser(UserCred.serializeUser());
passport.deserializeUser(UserCred.deserializeUser());
const UsersPosts = new mongoose.model("usersposts",instaSchema);



app.post("/register",function(req,res){
  const {email,username,password} = req.body;
  const cred = new UserCred({
    email:email,
    username:username
  });

  UserCred.register(cred,req.body.password,function(err,user){
    if (err) {
      res.send(err);

    }else{
      passport.authenticate("local")(req,res,function(){
        console.log("YEssssssssssss");
      });
      res.send("registered");
    }
  });
});

app.post("/profiledata",function(req,res){

  if(req.body !== null){

    username=req.body.username;
    userImage=req.body.userImage;
    UserCred.findOne({username},function(err,user){
      user.userImage=userImage;
      user.save();
 });

  }
});

app.get("/profiledata",function(req,res){
  UsersPosts.find({}, function (err, allposts) {
    if(!err){
      res.send(allposts);
    }
  });
});

app.get("/profiledata/:username",function(req,res){
  const usernameForGetUserImg = req.params.username.trim();
  UserCred.find({username:usernameForGetUserImg}, function (err, post) {
    if(!err){

      res.send(post[0].userImage);
    }
  });
});

app.get("/createpost/:username",function(req,res){
  const usernameForGet = req.params.username.trim();
  console.log(usernameForGet);
  UserCred.findOne({username:usernameForGet}, function (err, docs) {
    if(!err){
      // console.log(docs);
      res.send(docs);
    }
  });
});



app.post("/createpost",function(req,res){
 const username = req.body.username;
const title=req.body.title;
const details=req.body.details;
const postImage=req.body.postImage;
const userImage=req.body.userImage;

   UserCred.findOne({username},function(err,cred){
     if (!err) {

       const post = {
         title:title,
         details:details,
         postImage:postImage,
         userImage:userImage
       }
       cred.posts.push(post);
       cred.save();
     }

});

const forAllPost = new UsersPosts({
  title:title,
  details:details,
  postImage:postImage,
  userImage:userImage
});
forAllPost.save();

});

app.post("/login",function(req,res){
username = req.body.username.trim();
  passport.authenticate("local")(req,res,function(err){

    UserCred.findOne({username},function(err,cred){
      // console.log(cred);
      res.send(cred);
  });


  });

});

app.get("/getimage/:username",function(req,res){
  const username = req.params.username.trim();
  // console.log(username);
  UserCred.findOne({username:username},function(err,cred){
    // console.log(cred.userImage);
    res.send(cred.userImage);
});
});

app.post("/followed",function(req,res){
// console.log(req.body);
if(req.body.bool){
  UserCred.findOne({username:req.body.userCred},function(err,cred){
    if (cred.followingto.includes(req.body.userImgg)==false) {
      console.log("jsbddbbbbbbbbbbbbbbb");
      const image = req.body.userImgg;
      cred.followingto.push(image);
      cred.save();
    }
});
}else{
  const imggg = req.body.userImgg;

  UserCred.findOne({ username:req.body.userCred }, function(err,cred){
    var index = cred.followingto.indexOf(imggg);
    console.log(index);
    if (index !== -1) {
      cred.followingto.splice(index, 1);
    }
    cred.save();
  });
}


  UserCred.findOne({userImage:req.body.userImgg},function(err,credd){

    credd.followers = req.body.number;
    credd.save();
});



});



app.post("/getinguser",function(req,res){
   const data = req.body;
   // console.log(data);
   UserCred.findOne({username:req.body.userCred},function(err,cred){
     if (cred.followingto.includes(req.body.userImgg)) {

       UserCred.findOne({userImage:req.body.userImgg},function(err,credd){
         // console.log(credd.followers);
         if (credd.followers!=null) {
           const followerss=credd.followers;
           const data = {bool:true,number:followerss,posts:credd.posts.length,following:credd.followingto.length}
           res.send(data);
         } else {
           const data = {bool:true,number:0,posts:credd.posts.length,following:credd.followingto.length}
           res.send(data);
         }


       });
        // res.send(true);
     }else{

       UserCred.findOne({userImage:req.body.userImgg},function(err,credd){
         // console.log(credd.followers);
         if (credd.followers!=null) {
           const followerss=credd.followers;
           const data = {bool:false,number:followerss,posts:credd.posts.length,following:credd.followingto.length}
           res.send(data);
         } else {
           const data = {bool:false,number:0,posts:credd.posts.length,following:credd.followingto.length}
           res.send(data);
         }


       });
        // res.send(false);
     }
 });


});


app.get("/logout",function(req,res){

  req.logout(function(err) {
     if (!err) { res.send("Successfully Logout"); }

   });
});





app.listen("4500",()=>{
  console.log("server is running on port 4500");
});
