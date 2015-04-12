angular.module("controllers", ["angular-jwt"])

.controller("navCtrl", ["$scope", "$location", "$window", function($scope, $location, $window) {
	$scope.getRoute = function() {
		return $location.path();
	};
	$scope.goto = function(path) {
		$location.path(path);
	}
	$scope.logout = function() {
		delete $window.sessionStorage.token;
		$scope.goto("/login");
	};
	$scope.$watch(function(scope) {
		return $window.sessionStorage.token;
	}, function() {
		$scope.userIsLoggedIn = $window.sessionStorage.token ? true : false;
	});
}])

.controller("productsCtrl", ["$scope", function($scope) {
	$scope.msg = "hello world";
}])

.factory("tokenService", ["$window", "jwtHelper", function($window, jwtHelper) {
	return {
		store: function(token) {
			$window.sessionStorage.token = token;
			$window.sessionStorage.tokenPayload = jwtHelper.decodeToken(token);
		},
		delete: function() {
			delete $window.sessionStorage.token;
			delete $window.sessionStorage.tokenPayload;
		}
	};
}])

.controller("loginCtrl", ["$scope", "$rootScope", "$location", "$http", "tokenService", function($scope, $rootScope, $location, $http, tokenService) {
	$scope.user = {
		username: "",
		password: ""
	};
	$scope.errorMessage = "";

	$scope.submit = function() {
		$http
			.post("/rest-api/token", $scope.user)
			.success(function(data, status, headers, config) {
				tokenService.store(data.token);
				$location.path(angular.isDefined($rootScope.nextPath) ? $rootScope.nextPath : "/home");
			})
			.error(function(data, status, headers, config) {
				tokenService.delete();
				$scope.errorMessage = data.message;
				$scope.user.username = "";
				$scope.user.password = "";
			});
	};
}]);
