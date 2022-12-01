angular.module("ImgCache",[]).provider("ImgCache",function(){ImgCache.$init=function(){ImgCache.init(function(){ImgCache.$deferred.resolve()},function(){ImgCache.$deferred.reject()})},this.manualInit=!1,this.setOptions=function(e){angular.extend(ImgCache.options,e)},this.setOption=function(e,c){ImgCache.options[e]=c},this.$get=["$q",function(e){return ImgCache.$deferred=e.defer(),ImgCache.$promise=ImgCache.$deferred.promise,this.manualInit||ImgCache.$init(),ImgCache}]}).directive("imgCache",["ImgCache",function(){return{restrict:"A",scope:{icBg:"@",icSrc:"@"},link:function(e,c,n){var i=function(e,c,n){ImgCache.getCachedFileURL(n,function(n,i){"bg"===e?c.css({"background-image":"url("+i+")"}):c.attr("src",i)})},t=function(e,c,n){ImgCache.$promise.then(function(){ImgCache.isCached(n,function(t,r){r?i(e,c,n):ImgCache.cacheFile(n,function(){i(e,c,n)})})})};n.$observe("icSrc",function(e){t("src",c,e)}),n.$observe("icBg",function(e){t("bg",c,e)})}}}]);