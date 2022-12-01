//! api-check version 7.5.5 built with ♥ by Kent C. Dodds <kent@doddsfamily.us> (http://kent.doddsfamily.us) (ó ì_í)=óò=(ì_í ò)
!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):"object"==typeof exports?exports.apiCheck=r():e.apiCheck=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(3),i=n(o);r["default"]=i["default"],e.exports=r["default"]},function(e,r){function t(e,r){var t=[],o=[];return r=r||function(e,r){return"[Circular "+n(r,t,o)+"]"},function(n,i){var a=i;return"object"==typeof i&&i&&(-1!==t.indexOf(i)?a=r(n,i):(t.push(i),o.push(n))),e&&(a=e(n,a)),a}}function n(e,r,t){var n=r.indexOf(e),o=[t[n]];for(n--;n>=0;n--)r[n][o[0]]===e&&(e=r[n],o.unshift(t[n]));return"~"+o.join(".")}function o(e,r,n,o){return JSON.stringify(e,t(r,o),n)}e.exports=o,o.getSerialize=t},function(e,r,t){"use strict";function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e){var r=i(e),t=void 0;if("array"===r)t=[];else{if("object"!==r)return e;t={}}return f(e,function(e,r){t[r]=e}),t}function i(e){return Array.isArray(e)?"array":e instanceof RegExp?"object":typeof e}function a(e,r){var t=void 0,n=r&&r["short"];return t=n&&e.shortType?e.shortType:!n&&"object"==typeof e.type||"function"===e.type?u(e,r):u(e,r)||e.displayName||e.name}function u(e,r){var t=e.type;if("function"==typeof t){var o=t.__apiCheckData,i=t(r);t=n({__apiCheckData:o},o.type,i)}return t}function p(e){return e?Array.isArray(e)?e:[e]:[]}function f(e,r,t){return Array.isArray(e)?s(e,r,t):c(e,r,t)}function c(e,r,t){var n=void 0,o=Object.prototype.hasOwnProperty;for(var i in e)if(o.call(e,i)&&(n=r.call(t,e[i],i,e),n===!1))return n;return!0}function s(e,r,t){for(var n=void 0,o=e.length,i=0;o>i;i++)if(n=r.call(t,e[i],i,e),n===!1)return n;return!0}function l(e){return e instanceof Error}function y(e,r,t){e=p(e);var n=e.slice(),o=n.pop();return 1===n.length&&(r=" "),n.join(r)+(""+(n.length?r+t:"")+o)}function h(e,r,t){"function"==typeof t&&(t=t({"short":!0}));var n="object"!=typeof t?t:A(t);return new Error(d(e,r)+" must be "+v(n))}function d(e,r){var t=v(e||"value"),n=r?" at "+v(r):"";return""+t+n}function v(e){return"`"+e+"`"}function g(e){return"undefined"==typeof e}function b(e,r,t){return t&&(e=_(),e.isNoop=!0),"string"==typeof e.type&&(e.shortType=e.type),f(r,function(r,t){return e[t]=r}),e.displayName||(e.displayName="apiCheck "+v(e.shortType||e.type||e.name)+" type checker"),e.notRequired||(e=m(e,t)),e.notNullable||k(e,t),e.notOptional||O(e,t),e}function m(e,r){var t=r?_():function(r,t,n,o){if(g(r)&&!e.isOptional){var i=n?" in "+v(n):"",u=a(e,{"short":!0}),p="object"!=typeof u?u:A(u);return new Error("Required "+v(t)+" not specified"+i+". Must be "+v(p))}return e(r,t,n,o)};return j(e,t),t.originalChecker=e,t}function O(e,r){var t=r?_():function(r,t,n,o){return g(r)?void 0:e(r,t,n,o)};j(e,t),t.isOptional=!0,t.displayName=e.displayName+" (optional)",t.originalChecker=e,e.optional=t,C(e,e.optional)}function k(e,r){var t=r?_():function(r,t,n,o){return null!==r?e(r,t,n,o):void 0};j(e,t),t.isNullable=!0,t.displayName=e.displayName+" (nullable)",t.originalChecker=e,e.nullable=t,C(e,e.nullable),e.notOptional||O(e.nullable,r)}function C(e,r){if("object"==typeof r.type)r.type=o(r.type);else{if("function"!=typeof r.type)return void(r.type+=" (optional)");r.type=function(){return e.type.apply(e,arguments)}}r.type.__apiCheckData=o(e.type.__apiCheckData)||{},r.type.__apiCheckData.optional=!0}function j(e,r){f(Object.keys(e),function(t){return r[t]=e[t]})}function x(){}function _(){return function(){}}var A=t(1),T={addOptional:O,getRequiredVersion:m,setupChecker:b,addNullable:k};e.exports={each:f,copy:o,typeOf:i,arrayify:p,getCheckerDisplay:a,isError:l,list:y,getError:h,nAtL:d,t:v,undef:g,checkerHelpers:T,noop:x}},function(e,r,t){"use strict";function n(){function r(n,i,a){if(r.config.disabled||e.exports.globalConfig.disabled)return{apiTypes:{},argTypes:{},passed:!0,message:"",failed:!1};t(arguments),Array.isArray(n)?i=Array.prototype.slice.call(i):(n=[n],i=[i]);var u=p(n,i);u.length||(u=o(n,i));var f=c(n,i);return f.args=i,u.length?(f.message=r.getErrorMessage(n,i,u,a),f.failed=!0,f.passed=!1):(f.message="",f.failed=!1,f.passed=!0),f}function t(e){var t=e[0],n=e[1],i=Array.isArray(n)||n&&"object"==typeof n&&"number"==typeof n.length;if(Array.isArray(t)&&!i)throw new Error(a(t,[n],["If an array is provided for the api, an array must be provided for the args as well."],{prefix:"apiCheck"}));var u=o(C.checkApiCheckApi,e);if(u.length){var p=r.getErrorMessage(C.checkApiCheckApi,e,u,{prefix:"apiCheck"});r.handleErrorMessage(p,!0)}}function n(e){return function(t,n,o){var i=r(t,n,o);return r.handleErrorMessage(i.message,e),i}}function i(e,r){if(r&&e)throw new Error(e);e&&console.warn(e)}function a(e,t){function n(){var e=p.onlyPrefix;return e||(e=((f.prefix||"")+" "+(p.prefix||"")).trim()),e}function o(){var e=p.onlySuffix;return e||(e=((p.suffix||"")+" "+(f.suffix||"")).trim()),e}function i(){var e=p.url;return e||(e=f.docsBaseUrl&&p.urlSuffix&&(""+f.docsBaseUrl+p.urlSuffix).trim()),e}var a=arguments.length<=2||void 0===arguments[2]?[]:arguments[2],p=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],f=r.config.output||{},c=n(),s=o(),l=i(),y="apiCheck failed! "+a.join(", "),h="\n\n"+u(e,t);return(c+" "+y+" "+s+" "+(l||"")+h).trim()}function u(e,r){function t(e){h(e,function(r,n){-1===f.indexOf(r)&&(f.push(r),"object"==typeof r?t(e):"function"==typeof r&&(e[n]=r.displayName||r.name||"anonymous function"))})}function n(e){return e&&e.length?(e&&1===e.length&&(e=e[0]),l(e,null,2)):"nothing"}function o(){var e="\n",t=!0;r&&1===r.length&&(t="object"==typeof r[0]&&null!==r[0]?!!Object.keys(r[0]).length:!1);var n="type"+(t?"s":""),o=e+e;return"You passed:"+e+s+o+("With the "+n+":"+e+u+o)+("The API calls for:"+e+a)}var i=c(e,r),a=i.apiTypes,u=i.argTypes,p=Array.prototype.slice.call(r||[]),f=[];t(p);var s=n(p);return u=n(u),a=n(a),o()}function c(t,n){t=g(t),n=g(n);var o=t.map(function(t,o){var i=e.exports.globalConfig.hasOwnProperty("verbose");return b(t,{terse:i?!e.exports.globalConfig.verbose:!r.config.verbose,obj:n[o],addHelpers:!0})}),i=n.map(function(e){return f(e,[])});return{argTypes:i,apiTypes:o}}var s=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],d=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];j&&arguments.length&&j["throw"](C.getApiCheckInstanceCheckers,arguments,{prefix:"creating an apiCheck instance"});var v={"throw":n(!0),warn:n(!1),getErrorMessage:a,handleErrorMessage:i,config:{output:s.output||{prefix:"",suffix:"",docsBaseUrl:""},verbose:s.verbose||!1,disabled:s.disabled||!1},utils:y};h(v,function(e,t){return r[t]=e});var m=r.disabled||e.exports.globalConfig.disabled;return h(k.getCheckers(m),function(e,t){return r[t]=e}),h(d,function(e,t){return r[t]=e}),r}function o(e,r){for(var t=[],n=!1,o=0,i=0,u=void 0,p=void 0,f=void 0,c=void 0,s=void 0,l=void 0,y=void 0;(p=e[o++])&&i<r.length;)u=r[i++],s="Argument "+i+(p.isOptional?" (optional)":""),f=p(u,"value",s),l=d(f),c=o>=e.length,y=o>1&&e[o-1].isOptional,l&&c||l&&!c&&!p.isOptional&&!y?(n=!0,t.push(a(f,p,u))):l&&p.isOptional?i--:t.push(v(s)+" passed");return n?t:[]}function i(e,r,t){var n=k.shape({type:k.string,optional:k.bool}),o=k.func.withProperties({__apiCheckData:n}),a=k.shape({__apiCheckData:n}),u=k.oneOfType([o,a])(e,r,t);return d(u)?u:"function"==typeof e||e.hasOwnProperty(e.__apiCheckData.type)?void 0:O(r,t,i.type)}function a(e,r,t){var n=u(r,t);return n=n?" - "+n:"",e.message+n}function u(e,r){var t=e.help;return t?("function"==typeof t&&(t=t(r)),t):""}function p(e,r){var t=e.filter(function(e){return!e.isOptional});return r.length<t.length?["Not enough arguments specified. Requires `"+t.length+"`, you passed `"+r.length+"`"]:[]}function f(e,r){function t(){return e&&Object.keys(e).length}function n(){return-1!==r.indexOf(e)?"[Circular]":(r.push(e),c(e,r))}var o=e&&e.constructor&&e.constructor.name,i=m(e);if("function"===i){if(t()){var a=l(n());return o+" (with properties: "+a+")"}return o}return null===e?"null":"array"!==i&&"object"!==i?i:t()?n():o}function c(e,r){var t={};return h(e,function(e,n){return t[n]=f(e,r)}),t}function s(){var e=k.string.optional,r=k.func.withProperties({type:k.oneOfType([k.string,i]).optional,displayName:k.string.optional,shortType:k.string.optional,notOptional:k.bool.optional,notRequired:k.bool.optional}),t=[k.shape({output:k.shape({prefix:k.string.optional,suffix:k.string.optional,docsBaseUrl:k.string.optional}).strict.optional,verbose:k.bool.optional,disabled:k.bool.optional}).strict.optional,k.objectOf(r).optional],n=[k.typeOrArrayOf(r),k.any.optional,k.shape({prefix:e,suffix:e,urlSuffix:e,onlyPrefix:e,onlySuffix:e,url:e}).strict.optional];return{checkerFnChecker:r,getApiCheckInstanceCheckers:t,checkApiCheckApi:n}}var l=t(1),y=t(2),h=y.each,d=y.isError,v=y.t,g=y.arrayify,b=y.getCheckerDisplay,m=y.typeOf,O=y.getError,k=t(4),C=s();e.exports=n,e.exports.VERSION="7.5.5",e.exports.utils=y,e.exports.globalConfig={verbose:!1,disabled:!1};var j=n({output:{prefix:"apiCheck"}});e.exports.internalChecker=j,h(k,function(r,t){return e.exports[t]=r}),i.type="function with __apiCheckData property and `${function.type}` property"},function(e,r,t){"use strict";function n(e){function r(r){var t=r.toLowerCase();return b(function(e,n,o){return a(e)!==t?y(n,o,r):void 0},{type:r},e)}function t(){var r="Function",t=b(function(e,t,n){return"function"!==a(e)?y(t,n,r):void 0},{type:r},e);return t.withProperties=function(r){var t=m.objectOf(m.func)(r,"properties","apiCheck.func.withProperties");if(c(t))throw t;var n=m.shape(r,!0);return n.type.__apiCheckData.type="func.withProperties",b(function(e,r,t){var o=m.func(e,r,t);return c(o)?o:n(e,r,t)},{type:n.type,shortType:"func.withProperties"},e)},t}function n(){var r="Object",t="Object (null ok)",n=b(function(e,r,n){return"object"!==a(e)?y(r,n,t):void 0},{type:t},e),o=b(function(e,r,t){return null===e||c(n(e,r,t))?y(r,t,o.type):void 0},{type:r,nullOk:n},e);return o}function i(r){return b(function(e,t,n){return e instanceof r?void 0:y(t,n,r.name)},{type:r.name},e)}function v(r){var t={__apiCheckData:{optional:!1,type:"enum"},"enum":r},n="oneOf["+r.map(function(e){return o(e)}).join(", ")+"]";return b(function(e,t,o){return r.some(function(r){return r===e})?void 0:y(t,o,n)},{type:t,shortType:n},e)}function O(r){function t(e){return e&&e["short"]?o:r.map(function(r){return f(r,e)})}var n=r.map(function(e){return f(e,{"short":!0})}),o="oneOfType["+n.join(", ")+"]";return t.__apiCheckData={optional:!1,type:"oneOfType"},b(function(e,t,n){return r.some(function(r){return!c(r(e,t,n))})?void 0:y(t,n,o)},{type:t,shortType:o},e)}function k(r){function t(e){return e&&e["short"]?o:f(r,e)}var n=f(r,{"short":!0}),o="arrayOf["+n+"]";return t.__apiCheckData={optional:!1,type:"arrayOf"},b(function(e,t,n){return c(m.array(e))||!e.every(function(e){return!c(r(e))})?y(t,n,o):void 0},{type:t,shortType:o},e)}function C(r){function t(e){return e&&e["short"]?o:f(r,e)}var n=f(r,{"short":!0}),o="objectOf["+n+"]";return t.__apiCheckData={optional:!1,type:"objectOf"},b(function(e,t,n){var i=m.object(e,t,n);if(c(i))return i;var a=u(e,function(e,n){return c(r(e,n,t))?!1:void 0});return a?void 0:y(t,n,o)},{type:t,shortType:o},e)}function j(r){function t(e){return e&&e["short"]?o:f(r,e)}var n=f(r,{"short":!0}),o="typeOrArrayOf["+n+"]";return t.__apiCheckData={optional:!1,type:"typeOrArrayOf"},b(function(e,t,n,i){return c(m.oneOfType([r,m.arrayOf(r)])(e,t,n,i))?y(t,n,o):void 0},{type:t,shortType:o},e)}function x(){function r(r,t){function n(){function e(e,r,t,n,o){function a(t,n,o){"string"==typeof e[r]?e[r]+=o:e[r].__apiCheckData[t]=n}if(t||!o||n.isOptional){if(t){var u=n(i[r],r,null,i);c(u)&&a("error","THIS IS THE PROBLEM: "+u.message," <-- THIS IS THE PROBLEM: "+u.message)}}else{var p="ITEM";n.type&&n.type.__apiCheckData&&(p=n.type.__apiCheckData.type.toUpperCase()),a("missing","MISSING THIS "+p," <-- YOU ARE MISSING THIS")}}var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n={},o=t.terse,i=t.obj,a=t.addHelpers,p=t.required;return u(r,function(r,t){var u=i&&i.hasOwnProperty(t),c=g(p)?!r.isOptional:p;o&&!u&&r.isOptional||(n[t]=f(r,{terse:o,obj:i&&i[t],required:c,addHelpers:a})),a&&e(n,t,u,r,c)}),n}function o(){return n.apply(void 0,arguments)}var i={};u(r,function(e,r){i[r]=f(e)}),n.__apiCheckData={strict:!1,optional:!1,type:"shape"};var a=b(function(e,n,o){var i=!t&&m.object(e,n,o);if(c(i))return i;var a=void 0;return o=o?o+(n?"/":""):"",n=n||"",u(r,function(r,t){return e.hasOwnProperty(t)||!r.isOptional?(a=r(e[t],t,""+o+n,e),!c(a)):void 0}),c(a)?a:void 0},{type:n,shortType:"shape"},e);return o.__apiCheckData=p(a.type.__apiCheckData),o.__apiCheckData.strict=!0,a.strict=b(function(e,t,n){var o=a(e,t,n);if(c(o))return o;var i=Object.keys(r),u=Object.keys(e).filter(function(e){return-1===i.indexOf(e)});return u.length?new Error(h(t,n)+" cannot have extra properties: "+d(u.join("`, `"))+".It is limited to "+d(i.join("`, `"))):void 0},{type:o,shortType:"strict shape"},e),a}function t(r,t,o){var i=d(t.join(", ")),a="if "+(r?"all of":"at least one of"),u="specified "+a+" these are not specified: "+i+" (otherwise it's optional)",p="requiredIfNot"+(r?".all":"")+"["+t.join(", ")+"}]",f=n(o,u,p);return b(function(e,n,i,a){var u=a&&a.hasOwnProperty(n),p=r?"every":"some",c=t[p](function(e){return a&&a.hasOwnProperty(e)});return c||u?u?o(e,n,i,a):void 0:y(n,i,f)},{type:f,notRequired:!0},e)}function n(e,r,t){function n(r){return r&&r["short"]?t:f(e)}return n.__apiCheckData={optional:!1,type:"ifNot",description:r},n}return r.ifNot=function(r,t){Array.isArray(r)||(r=[r]);var o=void 0;o=1===r.length?"specified only if "+r[0]+" is not specified":"specified only if none of the following are specified: ["+l(r,", ","and ")+"]";var i="ifNot["+r.join(", ")+"]",a=n(t,o,i);return b(function(e,n,o,i){var u=i&&i.hasOwnProperty(n),p=r.some(function(e){return i&&i.hasOwnProperty(e)});return u===p?y(n,o,a):u?t(e,n,o,i):void 0},{notRequired:!0,type:a,shortType:i},e)},r.onlyIf=function(r,t){r=s(r);var o=void 0;o=1===r.length?"specified only if "+r[0]+" is also specified":"specified only if all of the following are specified: ["+l(r,", ","and ")+"]";var i="onlyIf["+r.join(", ")+"]",a=n(t,o,i);return b(function(e,n,o,i){var u=r.every(function(e){return i.hasOwnProperty(e)});return u?t(e,n,o,i):y(n,o,a)},{type:a,shortType:i},e)},r.requiredIfNot=function(e,r){return Array.isArray(e)||(e=[e]),t(!1,e,r)},r.requiredIfNot.all=function(e,r){if(!Array.isArray(e))throw new Error("requiredIfNot.all must be passed an array");return t(!0,e,r)},r}function _(){var r="function arguments";return b(function(e,t,n){return Array.isArray(e)||c(m.object(e))||c(m.number(e.length))?y(t,n,r):void 0},{type:r},e)}function A(){return b(function(){},{type:"any"},e)}function T(){var r="null";return b(function(e,t,n){return null!==e?y(t,n,r):void 0},{type:r},e)}function w(r,t){var n="Range ("+r+" - "+t+")";return b(function(e,o,i){return"number"!=typeof e||r>e||e>t?y(o,i,n):void 0},{type:n},e)}function E(r){var t="lessThan["+r+"]";return b(function(e,n,o){return"number"!=typeof e||e>r?y(n,o,t):void 0},{type:t},e)}function D(r){var t="greaterThan["+r+"]";return b(function(e,n,o){return"number"!=typeof e||r>e?y(n,o,t):void 0},{type:t},e)}function N(){var r="empty object";return b(function(e,t,n){return"object"!==a(e)||null===e||Object.keys(e).length?y(t,n,r):void 0},{type:r},e)}return{array:r("Array"),bool:r("Boolean"),number:r("Number"),string:r("String"),func:t(),object:n(),emptyObject:N(),instanceOf:i,oneOf:v,oneOfType:O,arrayOf:k,objectOf:C,typeOrArrayOf:j,range:w,lessThan:E,greaterThan:D,shape:x(),args:_(),any:A(),"null":T()}}var o=t(1),i=t(2),a=i.typeOf,u=i.each,p=i.copy,f=i.getCheckerDisplay,c=i.isError,s=i.arrayify,l=i.list,y=i.getError,h=i.nAtL,d=i.t,v=i.checkerHelpers,g=i.undef,b=v.setupChecker,m=e.exports=n();e.exports.getCheckers=n}])});
//# sourceMappingURL=api-check.min.js.map