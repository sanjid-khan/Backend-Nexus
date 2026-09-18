require('dotenv').config();
const express=require("express");
const app=express();


const PORT = process.env.PORT || 4001;


const BookStore=[
    {id:1,name:"Harry Potter", author:"DevFlux"},
    {id:2, name:"Friends", author:"Vikas"},
    {id:3, name:"Nexus", author:"Rohit"},
    {id:4, name:"DSA", author:"Maharaj"},
    {id:5, name:"Prem kahani", author:"Rohan"}
]


app.use(express.json());

// // localhost:3000/book/3
 

app.get("/book", (req,res)=>{

    res.send(BookStore);
})



app.get("/book/:id", (req,res)=>{

    const id=parseInt(req.params.id);
    console.log(typeof req.params.id);
    const Book=BookStore.find(info=> info.id===id);
    res.send(Book);
})


app.post("/book", (req,res)=>{
    console.log(req.body);
    BookStore.push(req.body);
    res.send("Data Saved Successfully");
})



app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})




