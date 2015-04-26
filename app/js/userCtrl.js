angular.module("controllers")
	.controller("userCtrl", ["$scope", "$http", "authService", function($scope, $http, authService) {
		$scope.loggedInUser = authService.getSession().username;
		$scope.sort = "username";
		$scope.users = [];
		$scope.selectedUsername = "";
		$scope.errorMessage = "";

		function resetNewUser() {
			$scope.newUser = {
				username: "",
				password: "",
				role: "USER"
			};
		}

		function updateUsers() {
			$http.get("/rest-api/users").success(function(users) {
				$scope.users = users;
			});
		}

		resetNewUser();
		updateUsers();

		$scope.deleteUser = function(username) {
			$http.delete("/rest-api/users/" + username).success(function() {
				updateUsers();
			});
		};

		$scope.createUser = function() {
			$http.post("/rest-api/users", $scope.newUser).success(function() {
				resetNewUser();
				updateUsers();
			}).error(function(data) {
				resetNewUser();
				$scope.errorMessage = data.message;
			});
		};

		$scope.selectUser = function(username) {
			$scope.selectedUsername = username;
		};

	}]);
