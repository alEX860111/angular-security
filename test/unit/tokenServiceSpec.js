describe("tokenService", function() {

	var payload = "payload";

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
		expect($window.sessionStorage.tokenPayload).toEqual(payload);
		tokenService.delete();
		expect($window.sessionStorage.token).toBeUndefined();
		expect($window.sessionStorage.tokenPayload).toBeUndefined();
	});

});
