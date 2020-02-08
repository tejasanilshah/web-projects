var http = require('http');

var server = http.createServer(function(request, response){
    var userAgent = request.headers['user-agent'].split('(')[1].split(')')[0];
    var lang = request.headers['accept-language'].split(',')[0];
    var ip = request.headers['x-forwarded-for'] || 
    request.connection.remoteAddress || 
    request.socket.remoteAddress || 
    request.connection.socket.remoteAddress;
    if(request.url==="/"){
        response.setHeader('Content-Type','text/html');
        response.end("This is the landing page for api endpoints");
    }
    if(request.url==="/api/whoami"){
        response.setHeader('Content-Type', "application/json");
        response.end(JSON.stringify({
            "ipAddress" : ip,
            "language" : lang,
            "software" : userAgent
        }));
    }
});
server.listen(process.env.PORT || 4000);