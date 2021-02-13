var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});

app.use(express.static('client'));
app.get('/hello', function (req, res) {
    res.status(200).send('Heloooo');
});

var messages = [{
    id: 1,
    text: 'Welcome on chat of socket and NodeJS',
    nickname: 'Bot- Krys Lyn'
}];


io.on('connection', function (socket) {
    console.log('New client with IP:' + socket.handshake.address + 'is conected');

    socket.emit('messages', messages);

    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });


});

server.listen(3770, function () {
    console.log('Server works in http://Localhost:3770');
});