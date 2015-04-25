angular.module("controllers")
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
