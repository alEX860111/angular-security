describe("authInterceptor", function() {

	var authService;

	var authInterceptor;

	beforeEach(function() {
		module("authentication");
	});

	beforeEach(inject(function(_authService_) {
		authService = _authService_;
	}));

	beforeEach(inject(function(_authInterceptor_) {
		authInterceptor = _authInterceptor_;
	}));

	describe("request", function() {
		describe("token exists", function() {
			var session = {
				token: "123"
			};

			beforeEach(function() {
				spyOn(authService, "getSession").and.returnValue(session);
			});

			it("should set the Authorization header", function() {
				var config = {
					headers: {}
				};
				authInterceptor.request(config);
				expect(config.headers.Authorization).toEqual(session.token);
			});

			it("should create the headers object if necessary", function() {
				var config = {};
				authInterceptor.request(config);
				expect(config.headers).toBeDefined();
				expect(config.headers.Authorization).toEqual(session.token);
			});
		});

		describe("token does not exist", function() {
			beforeEach(function() {
				spyOn(authService, "getSession").and.returnValue({});
			});

			it("should", function() {
				var config = {};
				authInterceptor.request(config);
				expect(config.headers).toBeUndefined();
			});
		});
	});

});
