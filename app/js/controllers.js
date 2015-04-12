angular.module("controllers", [])

.controller("navCtrl", ["$scope", "$location", "$window", function($scope, $location, $window) {
	$scope.getRoute = function() {
		return $location.path();
	};
	$scope.logout = function() {
		delete $window.sessionStorage.token;
		$location.path("/login");
	};
	$scope.goto = function(path) {
		$location.path(path);
	}
	$scope.$watch(function(scope) {
		return $window.sessionStorage.token;
	}, function() {
		$scope.userIsLoggedIn = $window.sessionStorage.token ? true : false;
	});
}])

.controller("productsCtrl", ["$scope", function($scope) {
	$scope.msg = "hello world";
}])

.controller("loginCtrl", ["$rootScope", "$scope", "$http", "$window", "$location", function($rootScope, $scope, $http, $window, $location) {
	$scope.user = {
		username: "",
		password: ""
	};
	$scope.errorMessage = "";

	$scope.submit = function() {
		$http
			.post("/rest-api/token", $scope.user)
			.success(function(data, status, headers, config) {
				$window.sessionStorage.token = data.token;
				$location.path(angular.isDefined($rootScope.nextPath) ? $rootScope.nextPath : "/home");
			})
			.error(function(data, status, headers, config) {
				delete $window.sessionStorage.token;
				$scope.errorMessage = data.message;
				$scope.user.username = "";
				$scope.user.password = "";
			});
	};
}]);
