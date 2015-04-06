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

io.on('connection', function(socket){
	console.log('a user connected');

	//user disconnect
	socket.on('disconnect', function(socket){
		console.log('user disconnected');
	});

	//new user logs in
	socket.on('new user', function(name){
		console.log('name: ' + name);
		io.emit('new user', name);
	});

	//new chat message sent
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		//send to everyone
		io.emit('chat message', msg);
	});
});

