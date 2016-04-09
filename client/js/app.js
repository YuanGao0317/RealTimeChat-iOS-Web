var myApp = angular.module('MyApp', [
		'ngRoute',
		'btford.socket-io'
	]).
	config(($routeProvider, $locationProvider) => {
		$routeProvider.otherwise({redirectTo: '/home'});

		// typical routes
		$routeProvider.when('/home', {
			templateUrl: '/views/partials/home.html',
			controller: 'HomeController'
		});
		$routeProvider.when('/profile', {
			templateUrl: '/views/partials/profile.html',
			controller: 'ProfileController'
		});
		$routeProvider.when('/chatroom', {
			templateUrl: '/views/partials/chatroom.html',
			controller: 'ChatroomController'
		});

		$locationProvider.html5Mode({enabled: true, requireBase: false});
	})