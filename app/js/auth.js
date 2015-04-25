angular.module("authentication", ["angular-jwt"])
	.factory("authService", ["$window", "jwtHelper", function($window, jwtHelper) {
		return {
			createSession: function(token) {
				var payload = jwtHelper.decodeToken(token);
				$window.sessionStorage.token = token;
				$window.sessionStorage.username = payload.sub;
				$window.sessionStorage.role = payload.role;
			},
			destroySession: function() {
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.username;
				delete $window.sessionStorage.role;
			},
			getSession: function() {
				return {
					token: $window.sessionStorage.token,
					username: $window.sessionStorage.username,
					role: $window.sessionStorage.role
				};
			}
		};
	}])
	.factory("authInterceptor", ["authService", function(authService) {
		return {
			request: function(config) {
				var token = authService.getSession().token;
				if (token) {
					config.headers = config.headers || {};
					config.headers.Authorization = token;
				}
				return config;
			}
		};
	}]);
