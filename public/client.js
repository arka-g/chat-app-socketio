var socket = io();
$('#submit-username').on('click',function(e){
	e.preventDefault();
	var name = $('#enter-name').val();
	socket.emit('new user', name);
	//should check here later on if the username already exists or not
	$('#container').show();
	$('#users').show();
	$('#username-container').hide();
	$('#me').text("You are " + name);
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
	$('#msglist').append($('<li>').text(msg.username + ": " + msg.message));
	$("#chat").animate({ scrollTop: $("#chat")[0].scrollHeight}, 200);
});

socket.on('new user', function(name){
	$('#msglist').append($('<li>').text(name + " has joined the chat room"));
});

socket.on('disconnect user', function(name){
	$('#msglist').append($('<li>').text(name + " has left the chat room"));
});

socket.on('usernames', function(usernames){
	//clear list first
	$('#userslist').html("");
	//loop through usernames array and print
	for(i = 0; i<usernames.length;i++){
		$('#userslist').append($('<li>').text(usernames[i]));
	}
});

socket.on('secret message',function(msg){
	$('#secretMsgList').append($('<li>').text(msg.username + ": " + msg.message));
	$("#pchat").animate({ scrollTop: $("#pchat")[0].scrollHeight}, 200);
});

socket.on('kick user', function(kickUser){
	$('#msglist').append($('<li>').text(kickUser + " has been kicked!"));
	socket.emit('kick', kickUser);
});

