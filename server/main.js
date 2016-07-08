var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'))


server.listen(3000,function(){
	console.log("Servidor corriendo: http://localhost:3000");
});