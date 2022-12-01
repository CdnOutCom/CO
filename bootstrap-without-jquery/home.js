/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
"document"in self&&!("classList"in document.createElement("_"))&&function(e){"use strict";if("Element"in e){var t="classList",n="prototype",r=e.Element[n],a=Object,i=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},s=Array[n].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},l=function(e,t){this.name=e,this.code=DOMException[e],this.message=t},o=function(e,t){if(""===t)throw new l("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(t))throw new l("INVALID_CHARACTER_ERR","String contains an invalid character");return s.call(e,t)},c=function(e){for(var t=i.call(e.getAttribute("class")||""),n=t?t.split(/\s+/):[],r=0,a=n.length;a>r;r++)this.push(n[r]);this._updateClassName=function(){e.setAttribute("class",""+this)}},u=c[n]=[],d=function(){return new c(this)};if(l[n]=Error[n],u.item=function(e){return this[e]||null},u.contains=function(e){return e+="",-1!==o(this,e)},u.add=function(){var e,t=arguments,n=0,r=t.length,a=!1;do e=t[n]+"",-1===o(this,e)&&(this.push(e),a=!0);while(r>++n);a&&this._updateClassName()},u.remove=function(){var e,t=arguments,n=0,r=t.length,a=!1;do{e=t[n]+"";var i=o(this,e);-1!==i&&(this.splice(i,1),a=!0)}while(r>++n);a&&this._updateClassName()},u.toggle=function(e,t){e+="";var n=this.contains(e),r=n?t!==!0&&"remove":t!==!1&&"add";return r&&this[r](e),!n},u.toString=function(){return this.join(" ")},a.defineProperty){var g={get:d,enumerable:!0,configurable:!0};try{a.defineProperty(r,t,g)}catch(h){-2146823252===h.number&&(g.enumerable=!1,a.defineProperty(r,t,g))}}else a[n].__defineGetter__&&r.__defineGetter__(t,d)}}(self),/*!
 * Bootstrap without jQuery v0.6.1 for Bootstrap 3
 * By Daniel Davis under MIT License
 * https://github.com/tagawa/bootstrap-without-jquery
 */
function(){"use strict";function e(){var e,t=document.createElement("div"),n={transition:"transitionend",OTransition:"otransitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in n)if(n.hasOwnProperty(e)&&void 0!==t.style[e])return n[e];return!1}function t(e){var t={};e=e||window.event,t.evTarget=e.currentTarget||e.srcElement;var n=t.evTarget.getAttribute("data-target");return t.dataTarget=n?document.querySelector(n):!1,t}function n(e){var t=e.style.height;e.style.height="auto";var n=getComputedStyle(e).height;return e.style.height=t,e.offsetHeight,n}function r(e,t){if(document.createEvent){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!1),e.dispatchEvent(n)}else e.fireEvent("on"+t)}function a(e,t){e.classList.remove("collapse"),e.classList.add("collapsing"),t.classList.remove("collapsed"),t.setAttribute("aria-expanded",!0),e.style.height=n(e),d?e.addEventListener(d,function(){s(e)},!1):s(e)}function i(e,t){e.classList.remove("collapse"),e.classList.remove("in"),e.classList.add("collapsing"),t.classList.add("collapsed"),t.setAttribute("aria-expanded",!1),e.style.height=getComputedStyle(e).height,e.offsetHeight,e.style.height="0px"}function s(e){e.classList.remove("collapsing"),e.classList.add("collapse"),e.setAttribute("aria-expanded",!1),"0px"!==e.style.height&&(e.classList.add("in"),e.style.height="auto")}function l(e){e.preventDefault();var n=t(e),r=n.dataTarget;return r.classList.contains("in")?i(r,n.evTarget):a(r,n.evTarget),!1}function o(e){function n(){try{i.parentNode.removeChild(i),r(i,"closed.bs.alert")}catch(e){window.console.error("Unable to remove alert")}}e.preventDefault();var a=t(e),i=a.dataTarget;if(!i){var s=a.evTarget.parentNode;s.classList.contains("alert")?i=s:s.parentNode.classList.contains("alert")&&(i=s.parentNode)}return r(i,"close.bs.alert"),i.classList.remove("in"),d&&i.classList.contains("fade")?i.addEventListener(d,function(){n()},!1):n(),!1}function c(e){e=e||window.event;var t=e.currentTarget||e.srcElement;return t.parentElement.classList.toggle("open"),!1}function u(e){e=e||window.event;var t=e.currentTarget||e.srcElement;return t.parentElement.classList.remove("open"),e.relatedTarget&&"dropdown"!==e.relatedTarget.getAttribute("data-toggle")&&e.relatedTarget.click(),!1}for(var d=e(),g=document.querySelectorAll("[data-toggle=collapse]"),h=0,f=g.length;f>h;h++)g[h].onclick=l;for(var m=document.querySelectorAll("[data-dismiss=alert]"),v=0,p=m.length;p>v;v++)m[v].onclick=o;for(var y,E=document.querySelectorAll("[data-toggle=dropdown]"),w=0,b=E.length;b>w;w++)y=E[w],y.setAttribute("tabindex","0"),y.onclick=c,y.onblur=u}();