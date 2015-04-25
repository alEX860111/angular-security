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
	});
}])

.controller("productsCtrl", ["$scope", function($scope) {
	$scope.msg = "hello world";
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
}])

.controller("userCtrl", ["$scope", "$http", "tokenService", function($scope, $http, tokenService) {
	$scope.users = [];
	$scope.selectedUsername = "";
	$scope.loggedInUser = tokenService.getUsername();
	$scope.newUser = {
		username: "",
		password: "",
		role: "USER"
	};
	$scope.sort = "username";

	function updateUsers() {
		$http.get("/rest-api/users").success(function(users) {
			$scope.users = users;
		});
	}

	updateUsers();

	$scope.deleteUser = function(username) {
		$http.delete("/rest-api/users/" + username).success(function() {
			updateUsers();
		});
	};

	$scope.createUser = function() {
		$http.post("/rest-api/users", $scope.newUser).success(function() {
			$scope.newUser = {
				username: "",
				password: "",
				role: "USER"
			};
			updateUsers();
		});
	};

	$scope.selectUser = function(username) {
		$scope.selectedUsername = username;
	};

}]);
