var http = require('http');
var port = process.PORT || 3000;
var fs = require('fs');
var server = http.createServer(handler);
var io = require('socket.io')(server);

function handler (request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + "/index.html", function(error, index) {
        response.end(index);
    });
}

io.on('connection', function(socket){
    socket.on("chat message", function(message) {
        io.emit('chat message', message);
    });
});


server.listen(port);

console.log("Node server listening on http://localhost:" + port);
