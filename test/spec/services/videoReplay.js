'use strict';

describe('Service: Videoreplay', function () {

  // load the service's module
  beforeEach(module('mtlApp'));

  // instantiate service
  var Videoreplay;
  beforeEach(inject(function (_Videoreplay_) {
    Videoreplay = _Videoreplay_;
  }));

  it('should do something', function () {
    expect(!!Videoreplay).toBe(true);
  });

});
