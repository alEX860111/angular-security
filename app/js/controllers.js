angular.module("controllers", ["angular-jwt"])

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

.factory("tokenService", ["$window", "jwtHelper", function($window, jwtHelper) {
	return {
		store: function(token) {
			var payload;
			$window.sessionStorage.token = token;
			payload = jwtHelper.decodeToken(token);
			$window.sessionStorage.username = payload.sub;
			$window.sessionStorage.role = payload.role;
		},
		delete: function() {
			delete $window.sessionStorage.token;
			delete $window.sessionStorage.username;
			delete $window.sessionStorage.role;
		},
		getToken: function() {
			return $window.sessionStorage.token;
		},
		getUsername: function() {
			return $window.sessionStorage.username;
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
}])

.controller("usersCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.users = [];
	$scope.newUser = {
		username: "",
		password: "",
		role: "USER"
	};
	$scope.selectedUsername = "";

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

	$scope.createUser = function(user) {
		$http.post("/rest-api/users", user).success(function() {
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
