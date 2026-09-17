const http = require('http');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    
    const { url, method } = req;

    if (method === "GET" && url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello Coder Army");
    } 

    else if (method === "GET" && url === "/contact") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>This is our Contact Page</h1>");
    } 

    else if (method === "GET" && url === "/about") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            name:"sanjid",
            age:"22",
            dept:"CSE",
        }));
    } 

    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error: Page Not Found");
    }
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});