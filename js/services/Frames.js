angular.module('mtlApp')
  .factory('FramesService', function Frames($http, $rootScope, $cookies) {
    'use strict';


    // AngularJS will instantiate a singleton by calling 'new' on this function
    var mtl = this;
    mtl.count = 0;
    mtl.results = [];
    mtl.hashtagSearch = function (tag) {

      if ($cookies.ua_session_token === undefined) {
        return;
      }
      if (!(tag in mtl.results)) {
        mtl.results[tag] = []
      }
      var parameters = {
        'ua_session_token': $cookies.ua_session_token,
        'tag': tag,
        'callback':'JSON_CALLBACK'
      };

      $http({
        isArray:false,
        method:'JSONP',
        'url':'http://' + window.location.host + '/api',
        params:parameters
      }).success(function (data, code, headers, config) {
        var category = config.params.category_filter;
        ga('send', 'searchForTag' + tag);
        
        if(mtl.results[mtl.count]===undefined){
          mtl.results[mtl.count] = {};
        }
        mtl.results[mtl.count] = data;
        mtl.results[mtl.count].tag = tag;
        mtl.results[mtl.count].id = mtl.count;
        mtl.count++;
        $rootScope.$broadcast('updateHashtag',{results:data, config:config, tagFilter:tag});
      }).error(function (data, code, headers, config) {
        ga('send', 'failedSearchForTag' + tag);
      });
      
    };
    
    return mtl;


  });
