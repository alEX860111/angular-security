angular.module("myapp", ["ngRoute", "controllers"])

.config(["$routeProvider", function($routeProvider) {
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
			controller: "userCtrl",
			resolve: resolve
		})
		.when("/home", {
			templateUrl: "app/views/home.html",
			resolve: resolve
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
