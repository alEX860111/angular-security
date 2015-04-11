describe('myctrl', function() {

  var scope;

  beforeEach(function() {
    module('myapp');
  });

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('myctrl', {
      $scope: scope
    });
  }));

  it('should say hello world', function() {
    expect(scope.msg).toEqual("hello world");
  });

});
