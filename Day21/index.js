require('dotenv').config();
const express=require("express");
const app=express();
const main = require("./database")
const User=  require("./Models/users")
const validateUser=require("./utils/validateUser");
const bcrypt=  require("bcrypt") 
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const userAuth=require("./middleware/userAuth");


app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4001;


app.post("/register", async(req,res)=>{
    
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


app.get("/user", userAuth, async(req,res)=>{
  
  try{

    res.send(req.result);
    
  }
  catch (err)
  {
    res.send("Error"+err.message);
  }

})


app.delete("/user/:id", userAuth, async(req,res)=>{

 try{

   await User.findByIdAndDelete(req.params.id);
   res.send("Deleted Successfully");

 }

 catch (err){

  res.send("Error"+err.message);

 }

})


app.patch("/user", userAuth,async(req,res)=>{

  try{

    const {_id, ...update}=req.body;
    await User.findByIdAndUpdate(_id, update , {"runValidators":true});
    res.send("Update Successfully");
  }

  catch(err){
    res.send("Error"+err.message);
  }

})


app.post("/login",async (req,res)=>{

  try
  {

    // validate karna

  const people= await User.findOne({emailId:req.body.emailId});

  // if(!(req.body.emailId===people.emailId))
  //   throw new Error("Invalid Credentials");

 const IsAllowed= await bcrypt.compare(req.body.password, people.password);

 if(!IsAllowed)
  throw new Error("Invalid Credentials");


//  jwt token

const token= jwt.sign({_id:people._id, emailId:people.emailId},"rishab@123125",{expiresIn:"1h"});
res.cookie("token",token);

 res.send("Login Successfully");

  }
  catch(err)
  {
    res.send("Error: "+err.message);
  }
})


main()
.then(async()=>{
    console.log("Connected to DB")
    app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
  })
})
.catch((err)=>console.log(err));




 















// app.get("/info", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json({ message: "Users fetched", data: users });
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching users", error: err });
//   }
// });

// app.post("/info", async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json({ message: "User created", data: user });
//   } catch (err) {
//     res.status(400).json({ message: "Error creating user", error: err });
//   }
// });

// app.put("/info/:name", async (req, res) => {
//   try {
//     const user = await User.updateOne({ name: req.params.name }, req.body);
//     res.status(200).json({ message: "User updated", data: user });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating user", error: err });
//   }
// });

// app.delete("/info/:name", async (req, res) => {
//   try {
//     const result = await User.deleteOne({ name: req.params.name });
//     res.status(200).json({ message: "User deleted", data: result });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting user", error: err });
//   }
// });






