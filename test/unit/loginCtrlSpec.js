describe("loginCtrl", function() {

	var $httpBackend;

	var authService;

	var scope;

	beforeEach(function() {
		module("angular-jwt");
		module("controllers");
	});

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	beforeEach(inject(function(_authService_) {
		authService = _authService_;
		spyOn(authService, "createSession");
		spyOn(authService, "destroySession");
	}));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller("loginCtrl", {
			$scope: scope
		});
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should provider empty default values", function() {
		expect(scope.errorMessage).toEqual("");
		expect(scope.user.username).toEqual("");
		expect(scope.user.password).toEqual("");
	});

	it("should submit the user data and store the token", function() {
		var data = {
			token: "123"
		};
		scope.user.username = "joe";
		scope.user.password = "pw";
		scope.submit();
		$httpBackend.expectPOST("/rest-api/token", scope.user).respond(200, data);
		$httpBackend.flush();
		expect(authService.createSession).toHaveBeenCalledWith(data.token);
	});

	it("should delete any token if submit is not successful", function() {
		var data = {
			message: "not successful"
		};
		scope.user.username = "joe";
		scope.user.password = "pw";
		scope.submit();
		$httpBackend.expectPOST("/rest-api/token", scope.user).respond(401, data);
		$httpBackend.flush();
		expect(authService.destroySession).toHaveBeenCalled();
		expect(scope.errorMessage).toEqual(data.message);
		expect(scope.user.username).toEqual("");
		expect(scope.user.password).toEqual("");
	});

});
