describe("userCtrl", function() {

	var users;

	var $httpBackend;

	var authService;

	var scope;

	beforeEach(function() {
		module("controllers");
	});

	beforeEach(function() {
		users = [{
			username: "joe",
			role: "USER"
		}];
	});

	beforeEach(inject(function(_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	beforeEach(inject(function(_authService_) {
		authService = _authService_;
		spyOn(authService, "getSession").and.returnValue({
			username: "joe"
		});
	}));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller("userCtrl", {
			$scope: scope
		});
	}));

	beforeEach(function() {
		expect(scope.users).toEqual([]);
		$httpBackend.expectGET("/rest-api/users").respond(200, users);
		$httpBackend.flush();
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should provider the username of the logged in user", function() {
		expect(scope.loggedInUser).toEqual("joe");
		expect(authService.getSession).toHaveBeenCalled();
	});

	it("should update the users after instantiation", function() {
		expect(scope.users).toEqual(users);
	});

	it("should update the selected username", function() {
		expect(scope.selectedUsername).toEqual("");
		scope.selectUser("joe");
		expect(scope.selectedUsername).toEqual("joe");
	});

	it("should default the sort parameter to 'username'", function() {
		expect(scope.sort).toEqual("username");
	});

	describe("delete", function() {
		it("success should update the users", function() {
			expect(scope.users).toEqual(users);
			$httpBackend.expectDELETE("/rest-api/users/joe").respond(200);
			$httpBackend.expectGET("/rest-api/users").respond(200, []);
			scope.deleteUser("joe");
			$httpBackend.flush();
			expect(scope.users).toEqual([]);
		});

		it("error should not update the users", function() {
			expect(scope.users).toEqual(users);
			$httpBackend.expectDELETE("/rest-api/users/joe").respond(400);
			scope.deleteUser("joe");
			$httpBackend.flush();
			expect(scope.users).toEqual(users);
		});
	});

	describe("create", function() {
		var defaultNewUser = {
			username: "",
			password: "",
			role: "USER"
		};
		var newUser = {
			username: "max",
			password: "pw",
			role: "USER"
		};

		it("success should update the users", function() {
			expect(scope.newUser).toEqual(defaultNewUser);
			scope.newUser = newUser;
			$httpBackend.expectPOST("/rest-api/users", scope.newUser).respond(200);
			users.push({
				username: scope.newUser.username,
				role: scope.newUser.role
			});
			$httpBackend.expectGET("/rest-api/users").respond(200, users);
			scope.createUser();
			$httpBackend.flush();
			expect(scope.newUser).toEqual(defaultNewUser);
			expect(scope.users).toEqual(users);
		});

		it("error should provider an errorMessage", function() {
			expect(scope.errorMessage).toEqual("");
			scope.newUser = newUser;
			$httpBackend.expectPOST("/rest-api/users", scope.newUser).respond(400, {
				message: "Failure"
			});
			scope.createUser();
			$httpBackend.flush();
			expect(scope.newUser).toEqual(defaultNewUser);
			expect(scope.errorMessage).toEqual("Failure");
		});
	});

});
