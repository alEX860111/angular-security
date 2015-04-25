angular.module("controllers")
	.controller("loginCtrl", ["$scope", "$rootScope", "$location", "$http", "authService", function($scope, $rootScope, $location, $http, authService) {
		$scope.user = {
			username: "",
			password: ""
		};
		$scope.errorMessage = "";

		$scope.submit = function() {
			$http
				.post("/rest-api/token", $scope.user)
				.success(function(data, status, headers, config) {
					authService.createSession(data.token);
					$location.path(angular.isDefined($rootScope.nextPath) ? $rootScope.nextPath : "/home");
				})
				.error(function(data, status, headers, config) {
					authService.destroySession();
					$scope.errorMessage = data.message;
					$scope.user.username = "";
					$scope.user.password = "";
				});
		};
	}]);
