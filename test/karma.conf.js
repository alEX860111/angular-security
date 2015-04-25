module.exports = function(config) {
	config.set({

		basePath: "../",

		files: [
			"app/bower_components/angular/angular.min.js",
			"app/bower_components/angular-mocks/angular-mocks.js",
			"app/bower_components/angular-jwt/dist/angular-jwt.min.js",
			"app/js/auth.js",
			"app/js/navCtrl.js",
			"app/js/loginCtrl.js",
			"app/js/userCtrl.js",
			"app/js/homeCtrl.js",
			"app/js/productCtrl.js",
			"app/js/app.js",
			"test/unit/**/*.js"
		],

		autoWatch: true,

		frameworks: ["jasmine"],

		browsers: ["Chrome"],

		plugins: [
			"karma-chrome-launcher",
			"karma-firefox-launcher",
			"karma-jasmine"
		],

		junitReporter: {
			outputFile: "test_out/unit.xml",
			suite: "unit"
		}

	});
};
