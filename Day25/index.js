const express=require("express");
const app=express();
const main = require("./database")
const User=  require("./Models/users")
const validateUser=require("./utils/validateUser");
const bcrypt=  require("bcrypt") 
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const userAuth= require("./middleware/userAuth");
require('dotenv').config()
const authRouter= require("./routes/auth");
const useRouter=require("./routes/user");
const commentRouter=require("./routes/comment");
const redisClient=require("./config/redis");
const rateLimiter=require("./middleware/RateLimiter");



app.use(express.json());
app.use(cookieParser());
app.use(rateLimiter);


const PORT = process.env.PORT || 4001;


app.use("/auth",authRouter);
app.use("/user",useRouter);
app.use("/comment",commentRouter);


const InitializeConnection= async ()=>{

  try{
      
    await Promise.all([redisClient.connect(), main()]);
    console.log("DB connected");

     app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${PORT}`);
  })

  }

  catch(err){
        console.log("Error: "+err);
  }

}


InitializeConnection ();


 




