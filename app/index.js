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

    //choose the hanlder this request should go
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var data = {
        'trimmedPath': trimmedPath,
        'queryStringObject': queryStringObject,
        'method': method,
        'headers': headers,
        'payload': buffer
    };

    chosenHandler(data,function(statusCode, payload){
        // use status code callback by handler to default to 200
        statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
        //use payload callback byhandler or default to empty object
        payload = typeof(payload) == 'object' ? payload : {};

        //convret the payload to string
        var payloadString = JSON.stringify(payload);

        res.setHeader('Content-Type', 'application/json');
        
        res.writeHead(statusCode); 
        res.end(payloadString);
        console.log('returning response', statusCode, payloadString);
    });
    });

});

server.listen(port,() => {
    console.log(`server is listening on ${port}`);
});

//define a request router

var handlers = {};
handlers.sample = function(data, callback) {
    callback(406, {'name': 'sample handler'});
};

handlers.notFound = function(data, callback) {
callback(404);
};

var router = {
    'sample' : handlers.sample
}
