var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var nicknames = {};


//server.listen(process.env.PORT, process.env.IP);

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    socket.on('send message', function(data) {
        io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });
    
    socket.on('new user', function(data, callback) {
        if (data in nicknames) {
            callback(false);
        } else {
            callback(true);
            socket.nickname = data;
            nicknames[socket.nickname] = 1;
            updateNickNames();
        }
    }); 

      socket.on('disconnect', function(data){
        if (!socket.nickname)return;
        delete nicknames[socket.nickname];
        updateNickNames();
    });

    
    function updateNickNames() {
        io.sockets.emit('usernames', nicknames);
    }
});

server.listen(3000, function(){
    console.log("Servidor corriendo: http://localhost:3000");
});