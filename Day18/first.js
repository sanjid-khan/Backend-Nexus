const bcrypt= require("bcrypt")


const password="Rohit@123";

async function Hashing() {
    // Hashcode + salt

// const salt= await bcrypt.genSalt(10);
// const hashpass= await bcrypt.hash(password,10);

const hashpass= await bcrypt.hash(password,10);

const ans=   await bcrypt.compare("Rohit",hashpass);
// console.log(ans);


// console.log(salt);
// console.log(hashpass);
}

Hashing();


// Algorithm ---> hashCode


// const pass="KhanSanjid@07";

// async function Hashing (){

//     const hashform= await bcrypt.hash(pass,10);

//     const ans=await bcrypt.compare("KhanSanjid@07",hashform);

//     console.log(ans);

// }

// Hashing();
