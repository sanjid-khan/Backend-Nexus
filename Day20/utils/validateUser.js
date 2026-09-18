
const validator=  require("validator");

function validateUser (data){ 

const mandatoryField= ["firstName","emailId","age","password"]

        const IsAllowed= mandatoryField.every((k)=> Object.keys(data).includes(k));

        if(!IsAllowed)
          throw new Error("Fields Missing");

        if(!validator.isEmail(data.emailId))
            throw new Error ("Invalid Email");

        if(!validator.isStrongPassword(data.password))
            throw new Error ("Week Password");

        if(!(data.firstName.length>=3 && data.firstName.length<=20))
            throw new Error("Name should have atleast 3 char and almost 20 char");
        
        }

        module.exports=validateUser;


        
// Schema বলে: “Data দেখতে কেমন হবে”
// API বলে: “এই request accept করবো কিনা”

// 👉 API validation ছাড়া backend মানে দরজা ছাড়া ঘর 🏠🚪


