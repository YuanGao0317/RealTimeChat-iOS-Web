(function() {
	angular.module('MyApp')
	 .controller('NavController', ['$scope', '$location', function($scope, $location) {
	 	$scope.isActive = function(destination) {
	 		
	 		return destination === $location.path();
	 	}
	 }])
})();