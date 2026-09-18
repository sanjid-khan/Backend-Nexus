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



app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 4001;


app.use("/auth",authRouter);
app.use("/user",useRouter);
app.use("/comment",commentRouter);


const InitializeConnection= async ()=>{

  try{
      
    //  await redisClient.connect();
    //  console.log("Connected to Reddis");

    //  await main();
    //  console.log("Connected to MongoDB");

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






