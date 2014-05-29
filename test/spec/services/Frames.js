'use strict';

describe('Service: Frames', function () {

  // load the service's module
  beforeEach(module('foundationLibsassTemplateApp'));

  // instantiate service
  var Frames;
  beforeEach(inject(function (_Frames_) {
    Frames = _Frames_;
  }));

  it('should do something', function () {
    expect(!!Frames).toBe(true);
  });

});
