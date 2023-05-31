/**
 * Primary file for API
 * 
 */
//Dependencies
const http = require('http');
const url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
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


    //get the headers
    const headers = req.headers;
    console.log(headers);

    //get the payload  section 3.8 parsing payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data){
        buffer += decoder.write(data);
    });
    req.on('end', function(){
        buffer += decoder.end();
        res.end('Hello World\n');
        console.log(`request received on : ${trimmedPath} with this ${method} method `);
        console.log('req received with payload', buffer);
    });

});

server.listen(port,() => {
    console.log(`server is listening on ${port}`);
});
