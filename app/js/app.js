angular.module("myapp", ["ngRoute", "controllers"])

.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/login", {
			templateUrl: "app/views/login.html",
			controller: "loginCtrl"
		})
		.when("/products", {
			templateUrl: "app/views/products.html",
			controller: "productCtrl",
			resolve: {
				authorize: ["$http", function($http) {
					return $http.get("/rest-api/ping/products");
				}]
			}
		})
		.when("/users", {
			templateUrl: "app/views/users.html",
			controller: "userCtrl",
			resolve: {
				authorize: ["$http", function($http) {
					return $http.get("/rest-api/ping/users");
				}]
			}
		})
		.when("/home", {
			templateUrl: "app/views/home.html",
			controller: "homeCtrl",
			resolve: {
				authorize: ["$http", function($http) {
					return $http.get("/rest-api/ping/home");
				}]
			}
		}).otherwise({
			redirectTo: "/home"
		});
}])

.config(function($httpProvider) {
	$httpProvider.interceptors.push("authInterceptor");
})

.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function(event, nextRoute, currentRoute) {
		$rootScope.nextPath = nextRoute.$$route.originalPath;
		$location.path("/login");
	});
}]);
