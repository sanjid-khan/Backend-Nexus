const http=require('http');

const PORT = process.env.PORT || 4000;

const server=http.createServer((req,res)=>{

    // res.end("Hello Coder Army");
    if(req.url==="/")
        {
        res.end("Hello Coder Army");
        }
    else if(req.url==="/contact")
        {
        res.end("This is our Contact Page");
        }
    else if(req.url==="/about")
        {
        res.end("This is our About Page")
        }
    else
        {
        res.end("Error:Page Not Found");
       }
});

server.listen(PORT,()=>{
    console.log(`I am Listening at port number ${PORT}`);
})




// Node Js diye server build korle manually sob handle korte hoy
// ja onk koshter kaj.. aida resolve korar jonno Express Js use korbo
// Express JS best for server manage is JS.