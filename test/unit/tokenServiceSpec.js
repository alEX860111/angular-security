describe("tokenService", function() {

	var payload = {
		sub: "subj",
		role: "USER"
	};

	var jwtHelper;

	var tokenService;

	var $window;

	beforeEach(function() {
		module("angular-jwt");
		module("controllers");
	});

	beforeEach(inject(function(_jwtHelper_) {
		jwtHelper = _jwtHelper_;
		spyOn(jwtHelper, "decodeToken").and.returnValue(payload);
	}));

	beforeEach(inject(function(_tokenService_, _$window_) {
		tokenService = _tokenService_;
		$window = _$window_;
	}));

	it("should delete any token if submit is not successful", function() {
		var token = "123";
		expect($window.sessionStorage.token).toBeUndefined();
		expect($window.sessionStorage.tokenPayload).toBeUndefined();
		tokenService.store(token);
		expect(jwtHelper.decodeToken).toHaveBeenCalledWith(token);
		expect($window.sessionStorage.token).toEqual(token);
		expect($window.sessionStorage.username).toEqual(payload.sub);
		expect($window.sessionStorage.role).toEqual(payload.role);
		expect(tokenService.getToken()).toEqual(token);
		expect(tokenService.getUsername()).toEqual(payload.sub);
		tokenService.delete();
		expect($window.sessionStorage.token).toBeUndefined();
		expect($window.sessionStorage.username).toBeUndefined();
		expect($window.sessionStorage.role).toBeUndefined();
	});

});
