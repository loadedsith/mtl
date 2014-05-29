angular.module('mtlApp')
  .factory('FramesService', function Frames() {
    'use strict';


    // AngularJS will instantiate a singleton by calling 'new' on this function
    var mtl = this;
    mtl.count = 0;
    mtl.results = [];
    mtl.categoryOffset = {
      bars:0
    };
    
    mtl.hashtagSearch = function (tag) {
      
      if (!(tag in mtl.results)) {
        mtl.results[tag] = []
      }
      if (mtl.tagOffset[tag] === undefined) {
        mtl.tagOffset[tag] = 0;
      }
      var parameters = {
        'tag': tag
      };

      $http({
        isArray:false,
        method:'JSONP',
        'url':'http://localhost:8080/api',
        params:parameters
      }).success(function (data, code, headers, config) {
        var category = config.params.category_filter;
        // ga('send', 'mtlCategory'+category);
        
        if(mtl.results[mtl.count]===undefined){
          mtl.results[mtl.count] = {};
        }
        mtl.results[mtl.count] = data;
        mtl.results[mtl.count].tag = tag;
        mtl.results[mtl.count].id = mtl.count;
        mtl.tagOffset[tag] = config.params.offset;
        mtl.count++;
        $rootScope.$broadcast('updateResults',{results:data, config:config, tagFilter:tag});
      })
    };
    
    return mtl;


  });
