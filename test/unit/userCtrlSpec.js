describe("userCtrl", function() {

	var users;

	var $httpBackend;

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

	it("should update the users after instantiation", function() {
		expect(scope.users).toEqual(users);
	});

	it("should update the selected username", function() {
		expect(scope.selectedUsername).toEqual("");
		scope.selectUser("joe");
		expect(scope.selectedUsername).toEqual("joe");
	});

	it("should update the users after successful delete", function() {
		expect(scope.users).toEqual(users);
		$httpBackend.expectDELETE("/rest-api/users/joe").respond(200);
		$httpBackend.expectGET("/rest-api/users").respond(200, []);
		scope.deleteUser("joe");
		$httpBackend.flush();
		expect(scope.users).toEqual([]);
	});

	it("should not update the users after unsuccessful delete", function() {
		expect(scope.users).toEqual(users);
		$httpBackend.expectDELETE("/rest-api/users/joe").respond(400);
		scope.deleteUser("joe");
		$httpBackend.flush();
		expect(scope.users).toEqual(users);
	});

	it("should update the users after successful create", function() {
		var defaultNewUser = {
			username: "",
			password: "",
			role: "USER"
		};

		expect(scope.newUser).toEqual(defaultNewUser);
		scope.newUser = {
			username: "max",
			password: "pw",
			role: "USER"
		};
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

});
