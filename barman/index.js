// barman 0.4.2
// https://github.com/dfernandez79/barman
// Copyright (c) 2014 Diego Fernandez
// Barman may be freely distributed under the MIT license.

!function(a){if("object"==typeof exports)module.exports=a();else if("function"==typeof define&&define.amd)define(a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.barman=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";function c(){}function d(a,b){if(k(b,"constructor")){if(!l(b.constructor))throw new TypeError("The constructor property must be a function")}else b.constructor=function(){a.apply(this,arguments)};return b}function e(a,b,e,f){var i=d(a,h(a.prototype,b,e)),k=g(i.constructor,f);return j(k,"__super__",a.prototype),j(k,"super_",a),k.prototype=i,k.extend=c.extend,k}function f(){var a=n(arguments),b=c,d=[];return l(a[0])&&(b=a.shift()),m(a[0])&&(d=a.shift()),e(b,d,a[0],a[1])}var g=a("./extend"),h=a("./mix"),i=a("./util"),j=i.defineSpecialProperty,k=i.has,l=i.isFunction,m=i.isArray,n=i.toArray;j(c,"__super__",c.prototype),c.extend=function(){var a=n(arguments);return a.unshift(this),f.apply(null,a)},b.exports={newclass:f,Nil:c}},{"./extend":3,"./mix":6,"./util":7}],2:[function(a,b){"use strict";function c(a){return g(a)?a:Object.create(a)}function d(a){function b(){}return g(a)?a:(b.prototype=a,new b)}var e=a("./util"),f=e.has,g=e.isUndefined,h=f(Object,"create")?c:d;b.exports=h},{"./util":7}],3:[function(a,b){"use strict";function c(a){return e(f(arguments),function(b){b&&e(b,function(b,c){a[c]=b})}),a}var d=a("./util"),e=d.each,f=d.tail;b.exports=c},{"./util":7}],4:[function(a,b){"use strict";var c=a("./classes"),d=a("./merge");b.exports={Nil:c.Nil,newclass:c.newclass,merge:d,conflict:d.conflict,required:d.required,clone:a("./clone"),extend:a("./extend"),mix:a("./mix")}},{"./classes":1,"./clone":2,"./extend":3,"./merge":5,"./mix":6}],5:[function(a,b){"use strict";function c(){throw new Error("An implementation is required")}function d(){throw new Error("This property was defined by multiple merged objects, override it with the proper implementation")}function e(a,b,c){return j(a,function(a,d){c[d]=b.call(this,a,d)},c),c}function f(a,b){return m(a)||a===b||a===c}function g(a,b){var e=l(this,b)?this[b]:void 0;return f(e,a)?a:a===c?e:d}function h(){var a={};return j(k(arguments),function(b){e(b,g,a)}),a}var i=a("./util"),j=i.each,k=i.flatten,l=i.has,m=i.isUndefined;h.required=c,h.conflict=d,h.assertNoConflict=function(a){var b=[];if(j(a,function(a,c){a===h.conflict&&b.push(c)}),b.length>0)throw new Error("There is a merge conflict for the following properties: "+b.sort().join(","))},b.exports=h},{"./util":7}],6:[function(a,b){"use strict";function c(a,b,c){var d=g(f(a),e(b),c);return e.assertNoConflict(d),d}function d(){var a=k(arguments),b={},d=[];return a.length>1&&j(a[0])&&!i(a[0])&&(b=a.shift()),i(a[0])&&(d=a.shift()),c(b,d,a[0])}var e=a("./merge"),f=a("./clone"),g=a("./extend"),h=a("./util"),i=h.isArray,j=h.isObject,k=h.toArray;b.exports=d},{"./clone":2,"./extend":3,"./merge":5,"./util":7}],7:[function(a,b){"use strict";function c(a){return"undefined"==typeof a}function d(a){return"function"==typeof a}function e(a,b){return a?Object.prototype.hasOwnProperty.call(a,b):!1}function f(a){return a===Object(a)}function g(a){return r.call(a)}function h(a){return r.call(a,1)}function i(a,b,c){for(var d in a)b.call(c,a[d],d,a)}function j(a,b,c){var d,f;for(i(a,b,c),d=0,f=s.length;f>d;d++)e(a,s[d])&&b.call(c,a[s[d]],s[d],a)}function k(a,b,d){var e,f;if(!c(a)&&null!==a)if(q&&a.forEach===q)a.forEach(b,d);else if(a.length===+a.length)for(e=0,f=a.length;f>e;e++)b.call(d,a[e],e,a);else u(a,b,d)}function l(a,b,c){return Object.defineProperty(a,b,{value:c,writable:!1,enumerable:!1,configurable:!1}),a}function m(a,b,c){return a[b]=c,a}function n(a,b){for(var c=b.length,d=null,e=0;c>e;e++)d=b[e],w(d)?n(a,d):a.push(d);return a}function o(a){return n([],a)}var p=Array.prototype,q=p.forEach,r=p.slice,s=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],t=function(){var a={constructor:1};for(var b in a)if(e(a,b))return!0;return!1}(),u=t?i:j,v=d(Object.getOwnPropertyNames)?l:m,w=d(Array.isArray)?Array.isArray:function(a){var b=Object.prototype.toString;return"[object Array]"===b.call(a)};b.exports={defineSpecialProperty:v,each:k,flatten:o,has:e,isArray:w,isFunction:d,isObject:f,isUndefined:c,tail:h,toArray:g}},{}]},{},[4])(4)});
//# sourceMappingURL=barman.min.js.map