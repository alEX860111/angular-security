var app = angular.module("myapp", ["ngRoute", "controllers"]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/products", {
			templateUrl: "app/views/products.html",
			controller: "productsCtrl",
			resolve: {
				authorize: ["$http", function($http) {
					return $http.get("/rest-api/ping");
				}]
			}
		})
		.when("/login", {
			templateUrl: "app/views/login.html",
			controller: "loginCtrl"
		})
		.when("/home", {
			templateUrl: "app/views/home.html"
		}).otherwise({
			redirectTo: "/home"
		});
}]);

app.factory("authInterceptor", ["$window", function($window) {
	return {
		request: function(config) {
			config.headers = config.headers || {};
			if ($window.sessionStorage.token) {
				config.headers.Authorization = $window.sessionStorage.token;
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
