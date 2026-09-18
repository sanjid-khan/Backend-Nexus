require('dotenv').config();
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


app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 4001;


app.use("/auth",authRouter);
app.use("/user",useRouter);
app.use("/comment",commentRouter);


main()
.then(async()=>{
    console.log("Connected to DB")
    app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${PORT}`);
  })
})
.catch((err)=>console.log(err));





