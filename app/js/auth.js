angular.module("authentication", ["angular-jwt"])

.factory("authInterceptor", ["tokenService", function(tokenService) {
	return {
		request: function(config) {
			var token = tokenService.getToken();
			config.headers = config.headers || {};
			if (token) {
				config.headers.Authorization = token;
			}
			return config;
		}
	};
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
}]);