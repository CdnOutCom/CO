!function(n){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.basicModal=n()}}(function(){return function n(t,e,o){function l(c,s){if(!e[c]){if(!t[c]){var i="function"==typeof require&&require;if(!s&&i)return i(c,!0);if(a)return a(c,!0);var r=new Error("Cannot find module '"+c+"'");throw r.code="MODULE_NOT_FOUND",r}var u=e[c]={exports:{}};t[c][0].call(u.exports,function(n){var e=t[c][1][n];return l(e||n)},u,u.exports,n,t,e,o)}return e[c].exports}for(var a="function"==typeof require&&require,c=0;c<o.length;c++)l(o[c]);return l}({1:[function(n,t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=null,l=(e.THEME={small:"basicModal__small",xclose:"basicModal__xclose"},function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return!0===(arguments.length>1&&void 0!==arguments[1]&&arguments[1])?document.querySelectorAll(".basicModal "+n):document.querySelector(".basicModal "+n)}),a=function(n,t){return null!=n&&(n.constructor===Object?Array.prototype.forEach.call(Object.keys(n),function(e){return t(n[e],e,n)}):Array.prototype.forEach.call(n,function(e,o){return t(e,o,n)}))},c=function(n){return null==n||0===Object.keys(n).length?(console.error("Missing or empty modal configuration object"),!1):(null==n.body&&(n.body=""),null==n.class&&(n.class=""),!1!==n.closable&&(n.closable=!0),null==n.buttons?(console.error("basicModal requires at least one button"),!1):null!=n.buttons.action&&(null==n.buttons.action.class&&(n.buttons.action.class=""),null==n.buttons.action.title&&(n.buttons.action.title="OK"),null==n.buttons.action.fn)?(console.error("Missing fn for action-button"),!1):null==n.buttons.cancel||(null==n.buttons.cancel.class&&(n.buttons.cancel.class=""),null==n.buttons.cancel.title&&(n.buttons.cancel.title="Cancel"),null!=n.buttons.cancel.fn)||(console.error("Missing fn for cancel-button"),!1))},s=function(n){var t="";return t+="\n\t        <div class='basicModalContainer basicModalContainer--fadeIn' data-closable='"+n.closable+"'>\n\t            <div class='basicModal basicModal--fadeIn "+n.class+"' role=\"dialog\">\n\t                <div class='basicModal__content'>\n\t                    "+n.body+"\n\t                </div>\n\t                <div class='basicModal__buttons'>\n\t        ",null!=n.buttons.cancel&&(-1===n.buttons.cancel.class.indexOf("basicModal__xclose")?t+="<a id='basicModal__cancel' class='basicModal__button "+n.buttons.cancel.class+"'>"+n.buttons.cancel.title+"</a>":t+="<div id='basicModal__cancel' class='basicModal__button "+n.buttons.cancel.class+'\' aria-label=\'close\'><svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M405 136.798l-29.798-29.798-119.202 119.202-119.202-119.202-29.798 29.798 119.202 119.202-119.202 119.202 29.798 29.798 119.202-119.202 119.202 119.202 29.798-29.798-119.202-119.202z"/></svg></div>'),null!=n.buttons.action&&(t+="<a id='basicModal__action' class='basicModal__button "+n.buttons.action.class+"'>"+n.buttons.action.title+"</a>"),t+="\n\t                </div>\n\t            </div>\n\t        </div>\n\t        "},i=e.getValues=function(){var n={},t=l("input[name]",!0),e=l("select[name]",!0);return a(t,function(t){var e=t.getAttribute("name"),o=t.value;n[e]=o}),a(e,function(t){var e=t.getAttribute("name"),o=t.options[t.selectedIndex].value;n[e]=o}),0===Object.keys(n).length?null:n},r=function(n){return null!=n.buttons.cancel&&(l("#basicModal__cancel").onclick=function(){if(!0===this.classList.contains("basicModal__button--active"))return!1;this.classList.add("basicModal__button--active"),n.buttons.cancel.fn()}),null!=n.buttons.action&&(l("#basicModal__action").onclick=function(){if(!0===this.classList.contains("basicModal__button--active"))return!1;this.classList.add("basicModal__button--active"),n.buttons.action.fn(i())}),a(l("input",!0),function(n){n.oninput=n.onblur=function(){this.classList.remove("error")}}),a(l("select",!0),function(n){n.onchange=n.onblur=function(){this.classList.remove("error")}}),!0},u=(e.show=function n(t){if(!1===c(t))return!1;if(null!=l())return b(!0),setTimeout(function(){return n(t)},301),!1;o=document.activeElement;var e=s(t);document.body.insertAdjacentHTML("beforeend",e),r(t);var a=l("input");null!=a&&a.select();var i=l("select");return null==a&&null!=i&&i.focus(),null!=t.callback&&t.callback(t),!0},e.error=function(n){d();var t=l("input[name='"+n+"']")||l("select[name='"+n+"']");if(null==t)return!1;t.classList.add("error"),"function"==typeof t.select?t.select():t.focus(),l().classList.remove("basicModal--fadeIn","basicModal--shake"),setTimeout(function(){return l().classList.add("basicModal--shake")},1)},e.visible=function(){return null!=l()}),d=(e.action=function(){var n=l("#basicModal__action");return null!=n&&(n.click(),!0)},e.cancel=function(){var n=l("#basicModal__cancel");return null!=n&&(n.click(),!0)},e.reset=function(){var n=l(".basicModal__button",!0);a(n,function(n){return n.classList.remove("basicModal__button--active")});var t=l("input",!0);a(t,function(n){return n.classList.remove("error")});var e=l("select",!0);return a(e,function(n){return n.classList.remove("error")}),!0}),b=e.close=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!1===u())return!1;var t=l().parentElement;return("false"!==t.getAttribute("data-closable")||!1!==n)&&(t.classList.remove("basicModalContainer--fadeIn"),t.classList.add("basicModalContainer--fadeOut"),setTimeout(function(){return null!=t&&(null!=t.parentElement&&void t.parentElement.removeChild(t))},300),null!=o&&(o.focus(),o=null),!0)}},{}]},{},[1])(1)});