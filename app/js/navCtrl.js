angular.module("controllers", ["authentication"])
	.controller("navCtrl", ["$scope", "$location", "tokenService", function($scope, $location, tokenService) {
		$scope.getRoute = function() {
			return $location.path();
		};
		$scope.goto = function(path) {
			$location.path(path);
		}
		$scope.logout = function() {
			tokenService.delete();
			$scope.goto("/login");
		};
		$scope.$watch(function(scope) {
			return tokenService.getToken();
		}, function() {
			$scope.userIsLoggedIn = tokenService.getToken() ? true : false;
			$scope.username = tokenService.getUsername();
			$scope.role = tokenService.getRole();
		});
	}]);
