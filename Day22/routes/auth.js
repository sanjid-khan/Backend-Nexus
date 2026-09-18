const express=require("express");
const bcrypt=  require("bcrypt") 
const User=  require("../Models/users")
const authRouter= express.Router();
const validateUser=require("../utils/validateUser");

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
authRouter.post("/logout", async (req,res)=>{

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

module.exports=authRouter;