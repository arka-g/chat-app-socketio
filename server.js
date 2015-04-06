var express = require('express'),
	app = express(),
	//new version of express no create server
	server = require('http').createServer(app),
	//socket
	io = require('socket.io').listen(server);

server.listen(3000);
console.log("Server running on  port 3000");

app.use(express.static(__dirname + '/public'));
//routes
app.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});