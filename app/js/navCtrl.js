angular.module("controllers", ["authentication"])
	.controller("navCtrl", ["$scope", "$location", "authService", function($scope, $location, authService) {
		$scope.getRoute = function() {
			return $location.path();
		};
		$scope.goto = function(path) {
			$location.path(path);
		}
		$scope.logout = function() {
			authService.destroySession();
			$scope.goto("/login");
		};
		$scope.$watch(function(scope) {
			return authService.getSession().token;
		}, function() {
			var session = authService.getSession();
			$scope.userIsLoggedIn = session.token ? true : false;
			$scope.username = session.username;
			$scope.role = session.role;
		});
	}]);
