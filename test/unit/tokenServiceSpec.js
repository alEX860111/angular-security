describe("authService", function() {

	var token = "123";

	var payload = {
		sub: "subj",
		role: "USER"
	};

	var jwtHelper;

	var authService;

	var $window;

	beforeEach(function() {
		module("angular-jwt");
		module("authentication");
	});

	beforeEach(inject(function(_jwtHelper_) {
		jwtHelper = _jwtHelper_;
		spyOn(jwtHelper, "decodeToken").and.returnValue(payload);
	}));

	beforeEach(inject(function(_authService_, _$window_) {
		authService = _authService_;
		authService.destroySession();
		$window = _$window_;
	}));

	it("should store the session data in sessionStorage", function() {
		expect($window.sessionStorage.token).toBeUndefined();
		expect($window.sessionStorage.username).toBeUndefined();
		expect($window.sessionStorage.role).toBeUndefined();
	});

	describe("createSession", function() {
		it("should call the jwtHelper", function() {
			authService.createSession(token);
			expect(jwtHelper.decodeToken).toHaveBeenCalledWith(token);
		});

		it("should store the session data in sessionStorage", function() {
			authService.createSession(token);
			expect($window.sessionStorage.token).toEqual(token);
			expect($window.sessionStorage.username).toEqual(payload.sub);
			expect($window.sessionStorage.role).toEqual(payload.role);
		});
	});

	describe("getSession", function() {
		it("should return the session information", function() {
			authService.createSession(token);
			var session = authService.getSession();
			expect(session.token).toEqual(token);
			expect(session.username).toEqual(payload.sub);
			expect(session.role).toEqual(payload.role);
		});
	});

	describe("destroySession", function() {
		it("should delete the session data from sessionStorage", function() {
			authService.createSession(token);
			authService.destroySession();
			expect($window.sessionStorage.token).toBeUndefined();
			expect($window.sessionStorage.username).toBeUndefined();
			expect($window.sessionStorage.role).toBeUndefined();
		});
	});

});
