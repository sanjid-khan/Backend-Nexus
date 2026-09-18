require('dotenv').config();
const express=require("express");
const app=express();
const main = require("./database")
const User=  require("./Models/users")

app.use(express.json());

const PORT = process.env.PORT || 4001;

app.post("/register", async(req,res)=>{
    
     try{

        // Validate kya uske andar firstName
        // req.body ke andar data aaya hai, usmein fist_name persent hona chahiye
        const mandatoryField= ["firstName","emailId","age","password"]

        const IsAllowed= mandatoryField.every((k)=> Object.keys(req.body).includes(k));

        if(!IsAllowed)
          throw new Error("Fields Missing");

        // Password validation karenge
        // firstName>3 max>20

         await User.create(req.body);
         res.send("User Registered Successfully");

     }
     catch(err){
       res.send("Error "+ err.message);
     }
})

app.get("/info", async (req,res)=>{

  try{
       const result= await User.find();
       res.send(result);
  }
  catch(err){
    res.send("Error "+err.message);
  }
})


app.get("/user/:id", async(req,res)=>{
  
  try{
     
    const result= await User.findById(req.params.id);
    res.send(result);

  }
  catch (err)
  {
    res.send("Error "+err.message);
  }

})


app.delete("/user/:id", async(req,res)=>{

 try{

   await User.findByIdAndDelete(req.params.id);
   res.send("Deleted Successfully");

 }

 catch (err){

  res.send("Error "+err.message);

 }

})


app.patch("/user", async(req,res)=>{

  try{

    // ay khane destructing kora hocche
    const {_id, ...update}=req.body;
    await User.findByIdAndUpdate(_id, update , {"runValidators":true});
    res.send("Update Successfully");
  }

  catch(err){
    res.send("Error "+err.message);
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







 










