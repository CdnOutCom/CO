/*
hinclude.js -- HTML Includes (version 0.9.5)

Copyright (c) 2005-2012 Mark Nottingham <mnot@mnot.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------------------------------------------------------------------------------

See http://mnot.github.com/hinclude/ for documentation.
*/
var hinclude;(function(){"use strict";hinclude={classprefix:"include_",set_content_async:function(a,b){4===b.readyState&&((200===b.status||304===b.status)&&(a.innerHTML=b.responseText),a.className=hinclude.classprefix+b.status)},buffer:[],set_content_buffered:function(a,b){4===b.readyState&&(hinclude.buffer.push([a,b]),hinclude.outstanding-=1,0===hinclude.outstanding&&hinclude.show_buffered_content())},show_buffered_content:function(){for(;hinclude.buffer.length>0;){var a=hinclude.buffer.pop();(200===a[1].status||304===a[1].status)&&(a[0].innerHTML=a[1].responseText),a[0].className=hinclude.classprefix+a[1].status}},outstanding:0,includes:[],run:function(){var a=0,b=this.get_meta("include_mode","buffered"),c=function(){};if(this.includes=document.getElementsByTagName("hx:include"),0===this.includes.length&&(this.includes=document.getElementsByTagName("include")),"async"===b)c=this.set_content_async;else if("buffered"===b){c=this.set_content_buffered;var d=1e3*this.get_meta("include_timeout",2.5);setTimeout(hinclude.show_buffered_content,d)}for(a;this.includes.length>a;a+=1)this.include(this.includes[a],this.includes[a].getAttribute("src"),c)},include:function(a,b,c){var d=b.substring(0,b.indexOf(":"));if("data"===d.toLowerCase()){var e=decodeURIComponent(b.substring(b.indexOf(",")+1,b.length));a.innerHTML=e}else{var f=!1;if(window.XMLHttpRequest)try{f=new XMLHttpRequest}catch(g){f=!1}else if(window.ActiveXObject)try{f=new ActiveXObject("Microsoft.XMLHTTP")}catch(h){f=!1}if(f){this.outstanding+=1,f.onreadystatechange=function(){c(a,f)};try{f.open("GET",b,!0),f.send("")}catch(i){this.outstanding-=1,alert("Include error: "+b+" ("+i+")")}}}},refresh:function(a){var b=0;this.get_meta("include_mode","buffered");var d=function(){};for(d=this.set_content_buffered,b;this.includes.length>b;b+=1)this.includes[b].getAttribute("id")===a&&this.include(this.includes[b],this.includes[b].getAttribute("src"),d)},get_meta:function(a,b){var c=0,d=document.getElementsByTagName("meta");for(c;d.length>c;c+=1){var e=d[c].getAttribute("name");if(e===a)return d[c].getAttribute("content")}return b},addDOMLoadEvent:function(a){if(!window.__load_events){var b=function(){var a=0;if(!hinclude.addDOMLoadEvent.done){for(hinclude.addDOMLoadEvent.done=!0,window.__load_timer&&(clearInterval(window.__load_timer),window.__load_timer=null),a;window.__load_events.length>a;a+=1)window.__load_events[a]();window.__load_events=null}};document.addEventListener&&document.addEventListener("DOMContentLoaded",b,!1),/WebKit/i.test(navigator.userAgent)&&(window.__load_timer=setInterval(function(){/loaded|complete/.test(document.readyState)&&b()},10)),window.onload=b,window.__load_events=[]}window.__load_events.push(a)}},hinclude.addDOMLoadEvent(function(){hinclude.run()})})();