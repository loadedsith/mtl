angular.module("mtlApp").factory("FramesService",function t(){"use strict";var t=this;return t.count=0,t.results=[],t.categoryOffset={bars:0},t.hashtagSearch=function(s){s in t.results||(t.results[s]=[]),void 0===t.tagOffset[s]&&(t.tagOffset[s]=0);var r={tag:s};$http({isArray:!1,method:"JSONP",url:"http://localhost:8080/api",params:r}).success(function(r,a,e,u){var o=u.params.category_filter;void 0===t.results[t.count]&&(t.results[t.count]={}),t.results[t.count]=r,t.results[t.count].tag=s,t.results[t.count].id=t.count,t.tagOffset[s]=u.params.offset,t.count++,$rootScope.$broadcast("updateResults",{results:r,config:u,tagFilter:s})})},t});