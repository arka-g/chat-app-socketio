var socket = io();
$('#submit-server').on('click',function(){
	socket.emit('chat message', $('#message').val());
	//set text field back to default
	$('#message').val('');
	return false;
});
socket.on('chat message', function(msg){
	$('#msglist').append($('<li>').text(msg));
});
