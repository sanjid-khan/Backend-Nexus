const express=require("express");

const User=  require("../Models/users")
const useRouter= express.Router();
const userAuth=require("../middleware/userAuth");

useRouter.get("/", userAuth, async(req,res)=>{
  
  try{

    res.send(req.result);

  }
  catch (err)
  {
    res.send("Error"+err.message);
  }

})


useRouter.delete("/:id", userAuth, async(req,res)=>{

 try{

   await User.findByIdAndDelete(req.params.id);
   res.send("Deleted Successfully");

 }

 catch (err){

  res.send("Error"+err.message);

 }

})


useRouter.patch("/",userAuth ,async(req,res)=>{

  try{

    const {_id, ...update}=req.body;
    await User.findByIdAndUpdate(_id, update , {"runValidators":true});
    res.send("Update Successfully");
  }

  catch(err){
    res.send("Error"+err.message);
  }

})

module.exports=useRouter;