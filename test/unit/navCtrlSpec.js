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
		spyOn($location, "path");
	}));

	beforeEach(inject(function(_authService_) {
		authService = _authService_;
		spyOn(authService, "createSession");
		spyOn(authService, "destroySession");
		spyOn(authService, "getSession");
	}));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller("navCtrl", {
			$scope: scope
		});
	}));

	it("should provider empty default values", function() {

	});

});
