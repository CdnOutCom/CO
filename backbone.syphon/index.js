// Backbone.Syphon, v0.8.0
// ----------------------------------
//
// Copyright (c) 2018 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.syphon

!function(a,b){if("function"==typeof define&&define.amd)define(["underscore","backbone","jquery"],function(a,c,d){return b(a,c,d)});else if("undefined"!=typeof exports){var c=require("underscore"),d=require("backbone"),e=require("jquery");module.exports=b(c,d,e)}else b(a._,a.Backbone,a.jQuery)}(this,function(a,b,c){"use strict";var d=b.Syphon,e=b.Syphon={};e.VERSION="0.8.0",e.noConflict=function(){return b.Syphon=d,this},e.ignoredTypes=["button","submit","reset","fieldset"],e.serialize=function(b,d){var e={},h=i(d),k=f(b,h);return a.each(k,function(a){var b=c(a),d=g(b),f=h.keyExtractors.get(d),i=f(b),k=h.inputReaders.get(d),l=k(b),m=h.keyAssignmentValidators.get(d);if(m(b,i,l)){var n=h.keySplitter(i);e=j(e,n,l)}}),e},e.deserialize=function(b,d,e){var h=i(e),j=f(b,h),l=k(h,d);a.each(j,function(a){var b=c(a),d=g(b),e=h.keyExtractors.get(d),f=e(b),i=h.inputWriters.get(d),j=l[f];i(b,j)})};var f=function(b,d){var e=h(b);return e=a.reject(e,function(b){var e,f=g(b),h=d.keyExtractors.get(f),i=h(c(b)),j=a.find(d.ignoredTypes,function(a){return a===f||c(b).is(a)}),k=a.includes(d.include,i),l=a.includes(d.exclude,i);return e=!k&&(!!d.include||(l||j))})},g=function(a){var b,d=c(a),e=d[0].tagName,f=e;return"input"===e.toLowerCase()&&(b=d.attr("type"),f=b?b:"text"),"true"===(""+d.attr("contenteditable")).toLowerCase()&&(f="contenteditable"),f.toLowerCase()},h=function(b){return a.isUndefined(b.$el)?c(b).find(":input, [contenteditable]"):b.$(":input, [contenteditable]")},i=function(b){var c=a.clone(b)||{};return c.ignoredTypes=a.clone(e.ignoredTypes),c.inputReaders=c.inputReaders||e.InputReaders,c.inputWriters=c.inputWriters||e.InputWriters,c.keyExtractors=c.keyExtractors||e.KeyExtractors,c.keySplitter=c.keySplitter||e.KeySplitter,c.keyJoiner=c.keyJoiner||e.KeyJoiner,c.keyAssignmentValidators=c.keyAssignmentValidators||e.KeyAssignmentValidators,c},j=function(b,c,d){if(!c)return b;var e=c.shift();return b[e]||(b[e]=a.isArray(e)?[]:{}),0===c.length&&(a.isArray(b[e])?b[e].push(d):b[e]=d),c.length>0&&j(b[e],c,d),b},k=function(b,c,d){var e={};return a.each(c,function(c,f){var g={};d&&(f=b.keyJoiner(d,f)),a.isArray(c)?(f+="[]",g[f]=c):a.isObject(c)?g=k(b,c,f):g[f]=c,a.extend(e,g)}),e},l=e.TypeRegistry=function(){this.registeredTypes={}};l.extend=b.Model.extend,a.extend(l.prototype,{get:function(b){return a.has(this.registeredTypes,b)?this.registeredTypes[b]:this.registeredTypes.default},register:function(a,b){this.registeredTypes[a]=b},registerDefault:function(a){this.registeredTypes.default=a},unregister:function(b){a.has(this.registeredTypes,b)&&delete this.registeredTypes[b]}});var m=e.KeyExtractorSet=l.extend(),n=e.KeyExtractors=new m;n.registerDefault(function(a){return a.prop("name")||a.data("name")||""});var o=e.InputReaderSet=l.extend(),p=e.InputReaders=new o;p.registerDefault(function(a){return a.val()}),p.register("contenteditable",function(a){return a.html()}),p.register("checkbox",function(a){return a.prop("indeterminate")?null:a.prop("checked")});var q=e.InputWriterSet=l.extend(),r=e.InputWriters=new q;r.registerDefault(function(a,b){a.val(b)}),r.register("contenteditable",function(a,b){a.html(b)}),r.register("checkbox",function(a,b){null===b?a.prop("indeterminate",!0):a.prop("checked",b)}),r.register("radio",function(b,c){var d=!a.isUndefined(c)&&b.val()===c.toString();b.prop("checked",d)});var s=e.KeyAssignmentValidatorSet=l.extend(),t=e.KeyAssignmentValidators=new s;return t.registerDefault(function(){return!0}),t.register("radio",function(a,b,c){return a.prop("checked")}),e.KeySplitter=function(a){var b,c=a.match(/[^\[\]]+/g);return a.length>1&&a.indexOf("[]")===a.length-2&&(b=c.pop(),c.push([b])),c},e.KeyJoiner=function(a,b){return a+"["+b+"]"},b.Syphon});
//# sourceMappingURL=backbone.syphon.min.map