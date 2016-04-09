(function() {
	angular.module('MyApp')
	 .controller('ChatroomController', ['$scope', 'SocketFactory', function($scope, SocketFactory) {
	 	SocketFactory.connect();
	 	$scope.messages = [];
	 	$scope.users = [];


	 	// Functions for front-end
	 	var promptUsername = function(message) {
	 		bootbox.prompt(message, function(name) {
	 			if (name != null) {
	 				SocketFactory.emit('add-user', {username: name});
	 			} else {
	 				promptUsername("You must enter a username!");
	 			}
	 		});
	 	};


	 	$scope.sendMessage = function(msg) {
	 		if (msg != null && msg != '') {
	 			SocketFactory.emit('message', {message: msg});
	 		}
	 		$scope.msg = '';
	 	}

	 	// Logic
	 	

	 	// ask for username
	 	promptUsername("What is your name?");
	 	// request all users
	 	SocketFactory.emit('request-users', {});

	 	SocketFactory.on('users', function(data) {
	 		$scope.users = data.users;
	 	});

	 	SocketFactory.on('message', function(data) {
	 		$scope.messages.push(data);
	 	});

	 	SocketFactory.on('add-user', function(data) {
	 		$scope.users.push(data.username);
	 		$scope.messages.push({username: data.username,
	 							  message: ' has entered the channel!'});

	 	});

	 	SocketFactory.on('remove-user', function(data) {
	 		$scope.users.splice($scope.users.indexOf(data.username), 1);
	 		$scope.messages.push({username: data.username,
	 							  message: ' has left the channel!'});
	 	});

	 	SocketFactory.on('prompt-username', function(data) {
	 		promptUsername(data.message);
	 	});

	 	$scope.$on('$locationChangeStart', function(event) {
	 		SocketFactory.disconnect(true);
	 	});

	 }]);
})();