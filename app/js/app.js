var app = angular.module("myapp", ["ngRoute", "controllers"]);

app.config(["$routeProvider", function($routeProvider) {
	var resolve = {
		authorize: ["$http", function($http) {
			return $http.get("/rest-api/ping");
		}]
	};

	$routeProvider
		.when("/login", {
			templateUrl: "app/views/login.html",
			controller: "loginCtrl"
		})
		.when("/products", {
			templateUrl: "app/views/products.html",
			controller: "productsCtrl",
			resolve: resolve
		})
		.when("/users", {
			templateUrl: "app/views/users.html",
			controller: "usersCtrl",
			resolve: resolve
		})
		.when("/home", {
			templateUrl: "app/views/home.html",
			resolve: resolve
		}).otherwise({
			redirectTo: "/home"
		});
}]);

app.factory("authInterceptor", ["tokenService", function(tokenService) {
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
}]);

app.config(function($httpProvider) {
	$httpProvider.interceptors.push("authInterceptor");
});

app.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function(event, nextRoute, currentRoute) {
		$rootScope.nextPath = nextRoute.$$route.originalPath;
		$location.path("/login");
	});
}]);
