const express=require("express");
const bcrypt=  require("bcrypt") 
const User=  require("../Models/users")
const authRouter= express.Router();
const validateUser=require("../utils/validateUser");
const redisClient = require("../config/redis");
const jwt = require('jsonwebtoken');
const userAuth= require("../middleware/userAuth");

//  auth/register
authRouter.post("/register", async(req,res)=>{
    
     try{

      // aykhane validate function call korte hobe
        validateUser(req.body);

        // converting password into hashing
      req.body.password= await bcrypt.hash(req.body.password,10);

         await User.create(req.body);
         res.send("User Registered Successfully");

     }
     catch(err){
       res.send("Error"+ err.message);
     }
})

// auth/login
authRouter.post("/login", async (req,res)=>{

  try
  {

    // validate karna

  const people= await User.findOne({emailId:req.body.emailId});

  // if(!(req.body.emailId===people.emailId))
  //   throw new Error("Invalid Credentials");

 const IsAllowed= people.verifyPassword(req.body.password);

 if(!IsAllowed)
  throw new Error("Invalid Credentials");

//  jwt token

const token= people.getJWT();

res.cookie("token",token);
 res.send("Login Successfully");

  }
  catch(err)
  {
    res.send("Error: "+err.message);
  }
})

// auth/logout

// Reddis ke database mein humko Blocked Token
// token: exp:

authRouter.post("/logout", userAuth ,async (req,res)=>{

  try
  {

    const{token}=req.cookies;
    // console.log(token);

   const payload= jwt.decode(token);
  //  console.log(payload);

    await redisClient.set(`token:${token}`,"Blocked");
    // await redisClient.expire(`token:${token}`,1800);
    await redisClient.expireAt(`token:${token}`,payload.exp);

    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logged Out Successfully");

  }
  catch(err)
  {
    res.send("Error: "+err.message);
  }
})

module.exports=authRouter;






// লগআউট প্রক্রিয়ার সংক্ষিপ্ত সারাংশ:

// 1.টোকেন নেওয়া – কুকি থেকে JWT টোকেন নেওয়া হয়।

// 2.টোকেন ডিকোড – JWT ডিকোড করে এক্সপায়ারেশন টাইম বের করা হয়।

// 3.রেডিসে ব্লক – টোকেনকে রেডিসে "Blocked" হিসেবে সেভ করে টোকেনের এক্সপায়ার টাইমে অটো ডিলিটের ব্যবস্থা করা হয়।

// 4.কুকি ডিলিট – ব্রাউজারের কুকি সাথে সাথে ডিলিট করা হয়।

// 5.কনফার্মেশন – ইউজারকে লগআউট সফল হওয়ার মেসেজ দেওয়া হয়।



// Summary (এক লাইনে পুরো flow)

// 1.Cookie থেকে token নিলো

// 2.Token decode করে expiry time পেল

// 3.Redis এ token:yourtoken key store করলো → "Blocked"

// 4.Exact token expiry time পর্যন্ত Redis-এ রাখল

// 5.Browser cookie clear করলো

// 6.Logout success message দিল