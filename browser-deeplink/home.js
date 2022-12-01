/**
 * browser-deeplink v0.1
 *
 * Author: Hampus Ohlsson, Nov 2014
 * GitHub: http://github.com/hampusohlsson/browser-deeplink
 *
 * MIT License
 */

(function(e,t){if(typeof define==="function"&&define.amd){define("deeplink",t(e))}else if(typeof exports==="object"){module.exports=t(e)}else{e["deeplink"]=t(e)}})(window||this,function(e){"use strict";if(!e.document||!e.navigator){return}var t;var n={};var r={iOS:{},android:{},fallback:true,delay:1e3,delta:500};var i=function(e,t){var n={};for(var r in e){n[r]=e[r]}for(var r in t){n[r]=t[r]}return n};var s=function(){var e="itms-apps://itunes.apple.com/app/";var t=n.iOS.appName;var r=n.iOS.appId;return r&&t?e+t+"/id"+r+"?mt=8":null};var o=function(){var e="market://details?id=";var t=n.android.appId;return t?e+t:null};var u=function(){var e={ios:n.iOS.storeUrl||s(),android:n.android.storeUrl||o()};return e[n.platform]};var a=function(){return navigator.userAgent.match("Android")};var f=function(){return navigator.userAgent.match("iPad")||navigator.userAgent.match("iPhone")||navigator.userAgent.match("iPod")};var l=function(){return a()||f()};var c=function(e){return function(){var t=u();var r=n.delay+n.delta;if(typeof t==="string"&&Date.now()-e<r){document.location.href=t}}};var h=function(e){n=i(r,e);if(a())n.platform="android";if(f())n.platform="ios"};var p=function(e){if(!l()){return}if(a()&&!navigator.userAgent.match(/Firefox/)){var r=e.match(/([^:]+):\/\/(.+)$/i);e="intent://"+r[2]+"#Intent;scheme="+r[1];e+=";package="+n.android.appId+";end"}if(n.fallback){t=setTimeout(c(Date.now()),n.delay)}var i=document.createElement("iframe");i.onload=function(){clearTimeout(t);i.parentNode.removeChild(i);window.location.href=e};i.src=e;i.setAttribute("style","display:none;");document.body.appendChild(i)};return{setup:h,open:p}})