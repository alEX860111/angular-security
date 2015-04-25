angular.module("controllers")
	.controller("homeCtrl", ["$scope", "authService", function($scope, authService) {
		$scope.username = authService.getSession().username;
	}]);
