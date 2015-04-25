describe("loginCtrl", function() {

	var $location;

	var authService;

	var scope;

	beforeEach(function() {
		module("authentication");
		module("controllers");
	});

	beforeEach(inject(function(_$location_) {
		$location = _$location_;
	}));

	beforeEach(inject(function(_authService_) {
		authService = _authService_;
	}));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller("navCtrl", {
			$scope: scope
		});
	}));

	describe("getRoute", function() {
		it("should return the current route", function() {
			spyOn($location, "path").and.returnValue("/home");
			expect(scope.getRoute()).toEqual("/home");
			expect($location.path).toHaveBeenCalled();
		});
	});

	describe("changeRoute", function() {
		it("should pass the destination route to the location service", function() {
			spyOn($location, "path");
			scope.changeRoute("/home");
			expect($location.path).toHaveBeenCalled();
		});
	});

	describe("logout", function() {
		it("should destroy the session and change route to login", function() {
			spyOn(authService, "destroySession");
			spyOn(scope, "changeRoute");
			scope.logout();
			expect(authService.destroySession).toHaveBeenCalled();
			expect(scope.changeRoute).toHaveBeenCalledWith("/login");
		});
	});

	describe("session data", function() {
		it("should be provided", function() {
			var session = {
				token: "123",
				username: "joe",
				role: "USER"
			};
			spyOn(authService, "getSession").and.returnValue(session);
			scope.$apply();
			expect(scope.userIsLoggedIn).toBe(true);
			expect(scope.username).toEqual(session.username);
			expect(scope.role).toEqual(session.role);
		});
	});

});
