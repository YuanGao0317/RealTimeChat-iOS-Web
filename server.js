var express = require('express');
var app = express();

var PORT = 3000;

// Attaching a socket.io server for real-time communication
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/client'));
app.use('/libs', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
	res.render('index.html');
});

var users = [];
io.on('connection', function(socket) {
	var username = '';

	socket.on('add-user', function(data) {
		if (users.indexOf(data.username) == -1) {
			io.emit('add-user', {username: data.username});
			username = data.username;
			users.push(data.username);
		} else {
			socket.emit('prompt-username', {message: 'User already exists!'});
		}
	});

	socket.on('request-users', function(){
		socket.emit('users', {users: users});
	});

	socket.on('message', function(data) {
		io.emit('message', {username: username,
							message: data.message});
	});

	socket.on('disconnect', function() {
		users.splice(users.indexOf(username), 1);
		io.emit('remove-user', {username: username});
	});

});

server.listen(PORT, function() {
	console.log('SERVER RUNNING... PORT: ', PORT);
});