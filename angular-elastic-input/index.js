/** 
 * angular-elastic-input 
 * A directive for AngularJS which automatically resizes the width of input field according to the content, while typing. 
 * @version: 2.4.0 
 * @author: Jacek Pulit <jacek.pulit@gmail.com>
 * @license: MIT 
 * @build: Thursday, July 7th, 2016, 11:27:27 PM GMT+0200 
 */
(function(){
"use strict";angular.module("puElasticInput",[]).directive("puElasticInput",["$document","$window",function(a,b){function c(a,b){var c="";if(window.getComputedStyle)c=getComputedStyle(a).getPropertyValue(b);else if(a.currentStyle)try{c=a.currentStyle[b]}catch(d){}return c}function d(a){var b,d=a[0];do d=d.parentNode,b=parseInt(c(d,"width"),10)-parseInt(c(d,"padding-left"),10)-parseInt(c(d,"padding-right"),10);while("block"!=c(d,"display")&&"body"!=d.nodeName.toLowerCase());return b+"px"}function e(a,c,e){var f=b.getComputedStyle(c[0]),g="none"===f.maxWidth?d(c):f.maxWidth;c.css("minWidth",e.puElasticInputMinwidth||f.minWidth),c.css("maxWidth",e.puElasticInputMaxwidth||g),angular.forEach(["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing"],function(b){a.css(b,f[b])}),a.css("paddingLeft",f.textIndent),"border-box"===f.boxSizing?angular.forEach(["paddingLeft","paddingRight","borderLeftStyle","borderLeftWidth","borderRightStyle","borderRightWidth"],function(b){a.css(b,f[b])}):"padding-box"===f.boxSizing&&angular.forEach(["paddingLeft","paddingRight"],function(b){a.css(b,f[b])})}var f=angular.element('<div style="position:fixed; top:-999px; left:0;"></div>');return angular.element(a[0].body).append(f),{restrict:"A",link:function(a,b,c){function d(){var a=b.val()||c.placeholder||"";if(g.text()!=a){g.text(a);var d=parseInt(c.puElasticInputWidthDelta)||1;b.css("width",g.prop("offsetWidth")+d+"px")}}c.$set("ngTrim","true"===c.ngTrim?"true":"false");var g=angular.element('<span style="white-space:pre;">&#000;</span>');e(g,b,c),f.append(g),d(),a.$watch(c.ngModel,d),b.on("keydown keyup focus input propertychange change",d),a.$on("$destroy",function(){g.remove()})}}}]);
})();