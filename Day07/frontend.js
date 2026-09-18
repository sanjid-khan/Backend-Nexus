
// default get method
const response2= await fetch('https://api.example.com/data')


const response= await fetch('https://api.example.com/data',{
    method:'POST',
    headers:{
     'Content-Type': 'application/json'
    },
    body:JSON.stringify({name:'JOHN', age:30})
})


const response3= await fetch('https://api.example.com/data',{
    method:'PATCH',
    headers:{
     'Content-Type': 'application/json'
    },
    body:JSON.stringify({age:30})
})