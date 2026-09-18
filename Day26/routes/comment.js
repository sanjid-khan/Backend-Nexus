const express=require("express");

const commentRouter= express.Router(); 

commentRouter.get("/",(req,res)=>{

    res.send("Comment Send");

})


commentRouter.patch("/",(req,res)=>{
    res.send("Comment updated");
})


commentRouter.delete("/",(req,res)=>{
    res.send("Comment deleted");
})


module.exports=commentRouter;