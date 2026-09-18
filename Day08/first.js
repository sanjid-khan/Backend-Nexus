require('dotenv').config();
const express=require("express");
const app=express();

const PORT = process.env.PORT || 4001;

// Route Handler

// app.use(route,RH, [RH, RH,RH],RH,RH)
// Middleware: mw-> mw-> mw-> RequestHandlerr

// app.use("/user",(req,res,next)=>{
     
//     console.log("first");
    // res.send("I am first");
//     next();
// })


// app.use("/user",(req,res,next)=>{
     
//     console.log("second");
    // res.send("I am second");
//     next();
// })


// app.use("/user",(req,res,next)=>{
     
//     console.log("third");
    // res.send("I am third");
//     next();
// })


// app.use("/user",(req,res,next)=>{
     
//     console.log("fourth");
//     res.send("I am fourth");
// })


// Maintain logs through middleware

app.use("/user",(req,res,next)=>{

     console.log(`${Date.now()} ${req.method} ${req.url}`);
    //  Authorization wagera kar sakta hu
     next();
})


app.get("/user",(req,res)=>{

    res.send("Info about server");
})

app.post("/user",(req,res)=>{

    res.send("Info saved");
})


app.delete("/user",(req,res)=>{

    res.send("Info deleted");
})


app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})


// Request: Log ko maintain karta
// Timing: Kis type ki request thi, URL