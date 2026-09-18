require('dotenv').config();
const express=require("express");
const app=express();
const main = require("./database")
const User=  require("./Models/users")
const validateUser=require("./utils/validateUser");
const bcrypt=  require("bcrypt")

app.use(express.json());

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

app.get("/info", async (req,res)=>{

  try{
       const result= await User.find();
       res.send(result);
  }
  catch(err){
    res.send("Error"+err.message);
  }
})


app.get("/user/:id", async(req,res)=>{
  
  try{

    // code likhna padege, user ko authenticate kar paauon
    
     
    const result= await User.findById(req.params.id);
    res.send(result);

  }
  catch (err)
  {
    res.send("Error"+err.message);
  }

})


app.delete("/user/:id", async(req,res)=>{

 try{

   await User.findByIdAndDelete(req.params.id);
   res.send("Deleted Successfully");

 }

 catch (err){

  res.send("Error"+err.message);

 }

})


app.patch("/user", async(req,res)=>{

  try{

    const {_id, ...update}=req.body;
    await User.findByIdAndUpdate(_id, update , {"runValidators":true});
    res.send("Update Successfully");
  }

  catch(err){
    res.send("Error"+err.message);
  }

})


app.post("/login", async (req,res)=>{

  try
  {

    // validate karna

  const people= await User.findById(req.body._id);

  if(!(req.body.emailId===people.emailId))

    throw new Error("Invalid Credentials");


 const IsAllowed= await bcrypt.compare(req.body.password, people.password);

 if(!IsAllowed)
  throw new Error("Invalid Credentials");

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




 








