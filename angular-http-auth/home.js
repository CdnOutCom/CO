!function(){"use strict";angular.module("http-auth-interceptor",["http-auth-interceptor-buffer"]).factory("authService",["$rootScope","httpBuffer",function($rootScope,httpBuffer){return{loginConfirmed:function(data,configUpdater){var updater=configUpdater||function(config){return config};$rootScope.$broadcast("event:auth-loginConfirmed",data),httpBuffer.retryAll(updater)},loginCancelled:function(data,reason){httpBuffer.rejectAll(reason),$rootScope.$broadcast("event:auth-loginCancelled",data)}}}]).config(["$httpProvider",function($httpProvider){$httpProvider.interceptors.push(["$rootScope","$q","httpBuffer",function($rootScope,$q,httpBuffer){return{responseError:function(rejection){var config=rejection.config||{};if(!config.ignoreAuthModule)switch(rejection.status){case 401:var deferred=$q.defer(),bufferLength=httpBuffer.append(config,deferred);return 1===bufferLength&&$rootScope.$broadcast("event:auth-loginRequired",rejection),deferred.promise;case 403:$rootScope.$broadcast("event:auth-forbidden",rejection)}return $q.reject(rejection)}}}])}]),angular.module("http-auth-interceptor-buffer",[]).factory("httpBuffer",["$injector",function($injector){function retryHttpRequest(config,deferred){function successCallback(response){deferred.resolve(response)}function errorCallback(response){deferred.reject(response)}$http=$http||$injector.get("$http"),$http(config).then(successCallback,errorCallback)}var $http,buffer=[];return{append:function(config,deferred){return buffer.push({config:config,deferred:deferred})},rejectAll:function(reason){if(reason)for(var i=0;i<buffer.length;++i)buffer[i].deferred.reject(reason);buffer=[]},retryAll:function(updater){for(var i=0;i<buffer.length;++i){var _cfg=updater(buffer[i].config);_cfg!==!1&&retryHttpRequest(_cfg,buffer[i].deferred)}buffer=[]}}}])}(),"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="http-auth-interceptor");