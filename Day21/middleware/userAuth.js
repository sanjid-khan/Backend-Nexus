const jwt = require('jsonwebtoken');
const User=require("../Models/users");

const userAuth= async (req,res,next)=>{

   try{

    const {token}=req.cookies;
    if(!token){
      throw new Error("Token Doesn't exist");
    }

    const payload= jwt.verify(req.cookies.token,"rishab@123125");
      console.log(payload);

      const{_id}=payload;

      if(!_id){
        throw new Error("Id is missing");
      }

    const result= await User.findById(payload._id);

    if(!result){
      throw new Error ("User doesn't exist");
    }

    req.result=result;

    console.log("User Authentication");

      next();
  }

  catch (err) {

    res.send("Error: "+err.message);

  }

}

module.exports=userAuth;



// _id চেক → Token valid কিনা
// result চেক → User বাস্তবে (DB তে) আছে কিনা
// Token valid হলেও যদি user delete হয়ে যায় → error

// দুটোই না করলে authentication secure হয় না।



// id চেক = টোকেনের ডাটা সঠিক কিনা

// result চেক = ডাটাবেসে ইউজার আছে কিনা

// দুটোই দরকার কারণ টোকেন এবং ডাটাবেস - দুটোই আলাদা সিস্টেম। 
// টোকেন valid হতে পারে, কিন্তু ডাটাবেসে ইউজার নাও থাকতে পারে। 
// দুটো চেক করাই সিকিউর এবং রোবাস্ট অ্যাপ্লিকেশনের জন্য জরুরি।