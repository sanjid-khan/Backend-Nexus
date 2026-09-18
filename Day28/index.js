const express=require('express');
const app= express();
const main= require("./aichat");

app.use(express.json());


const chattingHistory ={};
// we will install our user chat history here
// key: value pair
// key=id
// value= array


app.post('/chat',async (req,res)=>{

    const {id,msg}= req.body;
    
    if(!chattingHistory[id]){
      chattingHistory[id]=[]
    }

    // extract user History
    const History = chattingHistory[id];

    // History+current : array

    // [{}, {}, {}, {}]
    const promptmessage=[...History ,{
       role:'user',
       parts: [{text:msg}]
    }]

   const answer= await main(promptmessage);

  //  User Question ko bhi insert hai
  // model ke response ko bhi insert karna hai
  History.push({role:'user', parts:[{text:msg}]})
  History.push({role:'model', parts:[{text:answer}]})
   res.send(answer);

})

const PORT = process.env.PORT || 4001;

app.listen(PORT,()=>{
  console.log(`Listening at port ${PORT}`);
})
