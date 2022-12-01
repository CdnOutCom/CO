/**
 * angular-chosen-localytics - Angular Chosen directive is an AngularJS Directive that brings the Chosen jQuery in a Angular way
 * @version v1.9.2
 * @link http://github.com/leocaseiro/angular-chosen
 * @license MIT
 */
(function(){var e,n=[].indexOf||function(e){for(var n=0,r=this.length;n<r;n++)if(n in this&&this[n]===e)return n;return-1};angular.module("localytics.directives",[]),e=angular.module("localytics.directives"),e.provider("chosen",function(){var e;return e={},{setOption:function(n){angular.extend(e,n)},$get:function(){return e}}}),e.directive("chosen",["chosen","$timeout","$parse",function(e,r,t){var i,a,s,l;return a=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,i=["allowSingleDeselect","disableSearch","disableSearchThreshold","enableSplitWordSearch","inheritSelectClasses","maxSelectedOptions","noResultsText","placeholderTextMultiple","placeholderTextSingle","searchContains","groupSearch","singleBackstrokeDelete","width","displayDisabledOptions","displaySelectedOptions","includeGroupLabelInSelected","maxShownResults","caseSensitiveSearch","hideResultsOnSelect","rtl"],l=function(e){return e.replace(/[A-Z]/g,function(e){return"_"+e.toLowerCase()})},s=function(e){var n;if(angular.isArray(e))return 0===e.length;if(angular.isObject(e))for(n in e)if(e.hasOwnProperty(n))return!1;return!0},{restrict:"A",require:["select","?ngModel"],priority:1,link:function(u,o,c,d){var f,h,g,p,S,b,v,y,w,O,m,x,C,V,A,T;if(u.disabledValuesHistory=u.disabledValuesHistory?u.disabledValuesHistory:[],o=$(o),o.addClass("localytics-chosen"),w=d[0],y=d[1],v=c.ngOptions&&c.ngOptions.match(a),A=v&&t(v[7]),V=v&&v[8],g=u.$eval(c.chosen)||{},O=angular.copy(e),angular.extend(O,g),angular.forEach(c,function(e,r){if(n.call(i,r)>=0)return c.$observe(r,function(e){var n;return n=String(o.attr(c.$attr[r])).slice(0,2),O[l(r)]="{{"===n?e:u.$eval(e),p()})}),m=function(){return o.addClass("loading").attr("disabled",!0).trigger("chosen:updated")},x=function(){return o.removeClass("loading"),angular.isDefined(c.disabled)?o.attr("disabled",c.disabled):o.attr("disabled",!1),o.trigger("chosen:updated")},h=null,S=!1,b=function(){if(!h)return u.$evalAsync(function(){if(!h)return h=o.chosen(O).data("chosen")})},p=function(){return h&&S&&o.attr("disabled",!0),o.trigger("chosen:updated")},y?(f=y.$render,y.$render=function(){var e,n,r,t;b();try{r=w.readValue()}catch(i){}f();try{n=w.readValue()}catch(i){}if(e=!V&&!c.multiple,t=e?r!==n:!angular.equals(r,n))return o.trigger("chosen:updated")},o.on("chosen:hiding_dropdown",function(){return u.$applyAsync(function(){return y.$setTouched()})}),c.multiple&&(T=function(){return y.$viewValue},u.$watch(T,y.$render,!0))):b(),c.$observe("disabled",function(){return o.trigger("chosen:updated")}),c.ngOptions&&y)return C=null,u.$watchCollection(A,function(e,n){return C=r(function(){return angular.isUndefined(e)?m():(S=s(e),x(),p())})}),u.$on("$destroy",function(e){if(null!=C)return r.cancel(C)})}}}])}).call(this);