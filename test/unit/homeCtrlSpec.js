describe("homeCtrl", function() {

	var session = {
		username: "joe"
	};

	var authService;

	var scope;

	beforeEach(function() {
		module("authentication");
		module("controllers");
	});

	beforeEach(inject(function(_authService_) {
		authService = _authService_;
		spyOn(authService, "getSession").and.returnValue(session);
	}));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller("homeCtrl", {
			$scope: scope
		});
	}));

	it("should provide the username", function() {
		expect(authService.getSession).toHaveBeenCalled();
		expect(scope.username).toEqual(session.username);
	});

});
