/**
  scrolldir - Vertical scroll direction in CSS
  @version v1.5.2
  @link https://github.com/yowainwright/scrolldir.git
  @author Patrick Fisher <patrick@pwfisher.com>, Jeffry Wainwright <yowainwright@gmail.com>
  @license MIT
**/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).scrollDir=e()}(this,function(){"use strict";var s,d,f="data-scrolldir",u="down",a=64,l=document.documentElement,c=window,m=document.body,h=32,p=512,b=Array(h),v=0;function e(){var t=c.scrollY||c.pageYOffset,e=s.timeStamp,n="down"===u?Math.max:Math.min,r=m.scrollHeight-c.innerHeight;if(t=Math.max(0,t),t=Math.min(r,t),b.unshift({y:t,t:e}),b.pop(),t===n(d,t))return v=e,void(d=t);var i=e-p;if(v<i){d=t;for(var o=0;o<h&&(b[o]&&!(b[o].t<i));o+=1)d=n(d,b[o].y)}Math.abs(t-d)>a&&(d=t,v=e,u="down"===u?"up":"down",l.setAttribute(f,u))}function n(t){return s=t,c.requestAnimationFrame(e)}return function(t){return t&&(t.attribute&&(f=t.attribute),t.el&&(l=t.el),t.win&&(c=t.win),t.dir&&(u=t.dir),t.thresholdPixels&&(a=t.thresholdPixels),!0===t.off)?(l.setAttribute(f,"off"),c.removeEventListener("scroll",n)):(d=c.scrollY||c.pageYOffset,l.setAttribute(f,u),c.addEventListener("scroll",n))}});
