var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*var messages = [{
	id:1,
	text: "",
	author: ""
}];*/

app.use(express.static('public'));

io.sockets.on('connection', function(socket){
	socket.on('sendMessage', function(data){
		io.sockets.emit('newMessage',{msg: data});
	});
});

server.listen(3000, function(){
	console.log("Servidor corriendo: http://localhost:3000");
});

