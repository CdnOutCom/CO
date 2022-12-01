!function(n,e){"function"==typeof define&&define.amd?define(["angular","smooth-scrollbar"],e):"object"==typeof exports?module.exports=e(require("angular"),require("smooth-scrollbar")):n.undefined=e(n.angular,n.Scrollbar)}(this,function(n,e){"use strict";function r(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var t=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(n[t]=r[t])}return n},o=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}();n.module("SmoothScrollbar",[]).constant("SCROLLBAR_VERSION",e.version).provider("ScrollbarService",function(){var i={},c={},a={};this.setDefaultOptions=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return n.extend(i,e)};this.$get=["$q",function(n){var l=function(){function l(){r(this,l),this.id=0}return o(l,[{key:"generateName",value:function(){return this.id++,Date.now().toString(32)+"$"+this.id}},{key:"getInstance",value:function(e){var r=a[e]=a[e]||n.defer();return c.hasOwnProperty(e)&&r.resolve(c[e]),r.promise}},{key:"createInstance",value:function(n,r,o){if(c.hasOwnProperty(n))return c[n];var l={};Object.keys(o).forEach(function(n){void 0!==o[n]&&(l[n]=o[n])});var u=c[n]=e.init(r,t({},i,l));return a.hasOwnProperty(n)&&a[n].resolve(u),u}},{key:"destroyInstance",value:function(n){var e=c[n];e&&(e.destroy(!0),delete c[n],delete a[n])}}]),l}();return new l}]}).directive("scrollbar",["ScrollbarService",function(e){return{restrict:"AE",transclude:!0,scope:{speed:"=",damping:"=",thumbMinSize:"=",syncCallbacks:"=",renderByPixels:"=",alwaysShowTracks:"=",continuousScrolling:"=",overscrollEffect:"=",overscrollDamping:"=",overscrollEffectColor:"@"},link:function(r,t,o,i,c){"auto"===o.continuousScrolling&&(r.continuousScrolling="auto");var a=o.scrollbar||o.name||e.generateName(),l=e.createInstance(a,t[0],r),u={scrollTo:l.scrollTo.bind(l),addListener:l.addListener.bind(l),infiniteScroll:l.infiniteScroll.bind(l)},s=function(n){return"function"==typeof n?function(){n.apply(void 0,arguments),r.$apply()}:void 0};l.scrollTo=function(n,e,r,t){u.scrollTo(n,e,r,s(t))},l.addListener=function(n){"function"==typeof n&&u.addListener(s(n))},l.infiniteScroll=function(n,e){"function"==typeof n&&u.infiniteScroll(s(n),e)},r.$on("$destroy",function(){e.destroyInstance(a)});var f=n.element(l.targets.content);c(function(n){f.append(n)},f)}}}])});
//# sourceMappingURL=angular-smooth-scrollbar.min.js.map