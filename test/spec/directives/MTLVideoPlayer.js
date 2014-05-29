'use strict';

describe('Directive: MTLVideoPlayer', function () {

  // load the directive's module
  beforeEach(module('mtlApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-m-t-l-video-player></-m-t-l-video-player>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the MTLVideoPlayer directive');
  }));
});
