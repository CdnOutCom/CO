/*! angular-ladda 0.4.3 */
!function(e,n){"use strict";if("function"==typeof define&&define.amd)define(["angular","ladda"],n);else{if("undefined"==typeof module||"object"!=typeof module.exports)return n(e.angular,e.Ladda);module.exports=n(window.angular||require("angular"),require("ladda"))}}(this,function(e,n){"use strict";var t="angular-ladda";return e.module(t,[]).provider("ladda",function(){var n={style:"zoom-in"};return{setOption:function(t){e.extend(n,t)},$get:function(){return n}}}).directive("ladda",["ladda","$timeout",function(t,a){return{restrict:"A",priority:-1,link:function(r,i,d){a(function(){if(i.addClass("ladda-button"),e.isUndefined(i.attr("data-style"))&&i.attr("data-style",t.style||"zoom-in"),e.isUndefined(i.attr("data-spinner-size"))&&t.spinnerSize&&i.attr("data-spinner-size",t.spinnerSize),e.isUndefined(i.attr("data-spinner-color"))&&t.spinnerColor&&i.attr("data-spinner-color",t.spinnerColor),!i[0].querySelector(".ladda-label")){var a=document.createElement("span");a.className="ladda-label",e.element(a).append(i.contents()),i.append(a)}var o=n.create(i[0]);r.$watch(d.ladda,function(n){return n||e.isNumber(n)?(o.isLoading()||o.start(),void(e.isNumber(n)&&o.setProgress(n))):(o.stop(),void(d.ngDisabled&&i.attr("disabled",r.$eval(d.ngDisabled))))}),r.$on("$destroy",function(){o&&o.remove()})})}}}]),t});