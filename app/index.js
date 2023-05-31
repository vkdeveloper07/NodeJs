/**
 * Primary file for API
 * 
 */
//Dependencies
const http = require('http');
const url = require('url');
const port = 3000;
const server = http.createServer(function(req, res){

    //Get URL and parse it
    const parsedUrl = url.parse(req.url,true);

    //Get the path
    const path = parsedUrl.pathname;

    //Parsing query string
    const queryStringObject = parsedUrl.query;
    //Get the Http method
    const method = req.method.toLowerCase();
    //Send the response
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')
    //Log the request path
    res.end('Hello World\n');
    console.log(`request received on : ${trimmedPath} with this ${method} method `);
    console.log('and with this queryString parameter ', queryStringObject);

    //get the headers
    const headers = req.headers;
    console.log(headers);
});

server.listen(port,() => {
    console.log(`server is listening on ${port}`);
});
