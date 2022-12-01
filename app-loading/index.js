"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();!function(){var e=function(e,t){var o=function(){function e(){_classCallCheck(this,e),this.opts={className:"app-loading",loadingBar:".loading-bar",color:null}}return _createClass(e,[{key:"start",value:function(e){return this.showBar(e),this}},{key:"stop",value:function(){return this.hideBar(),this}},{key:"showBar",value:function(e){var o=this.getBar();this.opts.color&&(o.style.backgroundColor=this.opts.color),e&&(o.style.backgroundColor=e),t.querySelector("body").classList.add(this.opts.className)}},{key:"hideBar",value:function(){t.querySelector("body").classList.remove(this.opts.className),this.getBar().style.backgroundColor=null}},{key:"getBar",value:function(){var e=t.querySelector(this.opts.loadingBar);return e||(e=this.initBar()),e}},{key:"initBar",value:function(){var e=t.createElement("div");return e.className=this.opts.loadingBar.substring(1),t.body.appendChild(e),e}},{key:"setColor",value:function(e){return this.opts.color=e,this.getBar().style.backgroundColor=e,this}}]),e}();return new o};!function(e,t,o){"undefined"!=typeof module?module.exports=o:"undefined"!=typeof e&&(e[t]=o)}(window,"appLoading",e(window,document))}();
//# sourceMappingURL=app-loading.min.js.map