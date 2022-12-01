angular.module("angularResizable",[]).directive("resizable",function(){function e(e){void 0===t?(t=e,setTimeout(function(){t(),t=void 0},100)):t=e}var t;return{restrict:"AE",scope:{rDirections:"=",rCenteredX:"=",rCenteredY:"=",rWidth:"=",rHeight:"=",rFlex:"=",rGrabber:"@",rDisabled:"@"},link:function(t,r,n){var i="flexBasis"in document.documentElement.style?"flexBasis":"webkitFlexBasis"in document.documentElement.style?"webkitFlexBasis":"msFlexPreferredSize"in document.documentElement.style?"msFlexPreferredSize":"flexBasis";t.$watch("rWidth",function(e){r[0].style.width=t.rWidth+"px"}),t.$watch("rHeight",function(e){r[0].style.height=t.rHeight+"px"}),r.addClass("resizable");var a,s,l,o,d,u=window.getComputedStyle(r[0],null),c=t.rDirections,h=t.rCenteredX?2:1,m=t.rCenteredY?2:1,p=t.rGrabber?t.rGrabber:"<span></span>",g={},f=function(e){g.width=!1,g.height=!1,"x"===d?g.width=parseInt(r[0].style[t.rFlex?i:"width"]):g.height=parseInt(r[0].style[t.rFlex?i:"height"]),g.id=r[0].id,g.evt=e},x=function(n){var u,c="x"===d?l-n.clientX:l-n.clientY;switch(o){case"top":u=t.rFlex?i:"height",r[0].style[u]=s+c*m+"px";break;case"bottom":u=t.rFlex?i:"height",r[0].style[u]=s-c*m+"px";break;case"right":u=t.rFlex?i:"width",r[0].style[u]=a-c*h+"px";break;case"left":u=t.rFlex?i:"width",r[0].style[u]=a+c*h+"px"}f(n),e(function(){t.$emit("angular-resizable.resizing",g)})},b=function(e){f(),t.$emit("angular-resizable.resizeEnd",g),t.$apply(),document.removeEventListener("mouseup",b,!1),document.removeEventListener("mousemove",x,!1),r.removeClass("no-transition")},v=function(e,n){o=n,d="left"===o||"right"===o?"x":"y",l="x"===d?e.clientX:e.clientY,a=parseInt(u.getPropertyValue("width")),s=parseInt(u.getPropertyValue("height")),r.addClass("no-transition"),document.addEventListener("mouseup",b,!1),document.addEventListener("mousemove",x,!1),e.stopPropagation&&e.stopPropagation(),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.returnValue=!1,f(e),t.$emit("angular-resizable.resizeStart",g),t.$apply()};c.forEach(function(e){var n=document.createElement("div");n.setAttribute("class","rg-"+e),n.innerHTML=p,r[0].appendChild(n),n.ondragstart=function(){return!1},n.addEventListener("mousedown",function(r){var n="true"===t.rDisabled;n||1!==r.which||v(r,e)},!1)})}}});