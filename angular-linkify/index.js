/*
angular-linkify - v2.0.0 - 1/13/2017
Angular filter to linkify urls, "@" usernames, and hashtags.
Copyright (c) 2017 ; Licensed  
*/
angular.module("linkify",[]),angular.module("linkify").filter("linkify",function(){"use strict";function linkify(_str,type){function addProtocol(url){return/(([\w]+:)?\/\/)/gi.test(url)===!1&&(url="http://"+url),url}if(_str){var _text=_str.replace(/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/gi,function(url){var wrap=document.createElement("div"),anch=document.createElement("a");return anch.href=addProtocol(url),anch.target="_blank",anch.innerHTML=url,wrap.appendChild(anch),wrap.innerHTML});return _text?("twitter"===type&&(_text=_text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g,'$1<a href="https://twitter.com/$2" target="_blank">@$2</a>'),_text=_text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g,'$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>')),"github"===type&&(_text=_text.replace(/(|\s)*@(\w+)/g,'$1<a href="https://github.com/$2" target="_blank">@$2</a>')),_text):""}}return function(text,type){return linkify(text,type)}}).factory("linkify",["$filter",function($filter){"use strict";function _linkifyAsType(type){return function(str){return $filter("linkify")(str,type)}}return{twitter:_linkifyAsType("twitter"),github:_linkifyAsType("github"),normal:_linkifyAsType()}}]).directive("linkify",["$filter","$timeout","linkify",function($filter,$timeout,linkify){"use strict";return{restrict:"A",link:function(scope,element,attrs){var type=attrs.linkify||"normal";$timeout(function(){element.html(linkify[type](element.html()))})}}}]);