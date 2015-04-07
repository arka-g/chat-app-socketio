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
usernames =[];

io.on('connection', function(socket){
	//console.log('a user connected');

	//new user logs in
	socket.on('new user', function(name){
		//console.log('name: ' + name);
		//bind to socket of user
		socket.username = name;
		//add to array
		usernames.push(socket.username);
		io.emit('new user', name + " has joined the chat room");
		io.emit('usernames', usernames);
	});

	//new chat message sent
	socket.on('chat message', function(msg){
		//console.log('message: ' + msg + " username: " + socket.username);
		//send to everyone (send an object to contain username)
		io.emit('chat message', {message: msg, username: socket.username});
	});

		//user disconnect
	socket.on('disconnect', function(){
		//console.log(usernames+ ' disconnected');
		var index = usernames.indexOf(socket.username);
		//remove username from array
		usernames.splice(index,1);
		//update usernames
		io.emit('usernames', usernames);
		io.emit('new user', socket.username + " has left the chat room");

		//no username
		if(!socket.username){
			return;
		}
	});
});

