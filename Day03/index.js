const fs=require('fs');

let a=10;
let b="hello ji";

console.log(b);

function sum (a,b){
    return(a+b);
}

fs.readFile("./data.json", "utf-8", (err,res)=>{
    console.log(res);
})


setTimeout(()=>{
   console.log("Hello Time Out");
},3000);

console.log(a);
console.log(sum(3,8));


