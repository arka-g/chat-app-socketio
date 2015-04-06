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

//users connected
var users = {};
var numUsers = 0;

io.on('connection', function(socket){
	console.log('a user connected');
	// socket.on('disconnect', function(socket){
	// 	console.log('user disconnected');
	// });
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});
