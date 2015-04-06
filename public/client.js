var socket = io();
$('#submit-username').on('click',function(e){
	e.preventDefault();
	socket.emit('new user', $('#enter-name').val() + " has entered the chat room");
	//should check here later on if the username already exists or not
	$('#container').show();
	$('#username-container').hide();
	//reset 
	$('#enter-name').val('');
	return false;
});
//submit a message
$('#submit-server').on('click',function(e){
	e.preventDefault;
	socket.emit('chat message', $('#message').val());
	//set text field back to default
	$('#message').val('');
	return false;
});

//add message to chat div
socket.on('chat message', function(msg){
	$('#msglist').append($('<li>').text(msg));
});

socket.on('new user', function(name){
	$('#msglist').append($('<li>').text(name));
});