require('dotenv').config();
const express=require("express");

const app=express();


const PORT = process.env.PORT || 5001;

// "/detail"
// "/contact/person"
// "/about"
// "detail/home/10"

// (?) char become Optional 
// + char can be repeated multiple times
// * any number of character can arrive



// app.use("/about/:id/:user",(req,res)=>{
//     console.log(req.params);
//     res.send({"name":"Rohit", "age":20,"money":70, "Mon":20});
// })


app.use("/about/:id",(req,res)=>{
    console.log(req.params);
    res.send({"name":"Rohit", "age":20,"money":70, "Mon":20});
})


// app.use("/about",(req,res)=>{
//     res.send({"name":"Rohit", "age":20,"money":70, "Mon":20});
// })

// app.use("/contact",(req,res)=>{
//     res.send("I am your contact page");
// })

// app.use("/detail",(req,res)=>{
//     res.send("I am your detail page");
// })

// app.use("/",(req,res)=>{
//     res.send("I am your Home Page");
// })

// app.use((req,res)=>{
//     res.send("I am your Home Page");
// })

app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})


