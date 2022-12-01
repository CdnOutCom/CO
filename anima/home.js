!function(){"use strict";function t(t){return w?w+t:t}function i(){this.handlers={}}function e(t,i,e,n,s){this.item=t,this.translate=i.translate&&i.translate.map(parseFloat),this.rotate=i.rotate&&i.rotate.map(parseFloat),this.scale=i.scale,this.opacity=i.opacity,this.start=null,this.diff=null,this.duration=0|(i.duration||e),this.delay=0|(i.delay||s),this.ease=O[i.ease]||O[n]||O.linear,this.easeName=n||"linear"}function n(t,i,e,n,s,o){this.item=t,this.name=i.name||i,this.start=null,this.diff=null,this.duration=0|(i.duration||e),this.delay=0|(i.delay||s),this.ease=O.css[i.ease]||O.css[n]||O.css.linear,this._infinite=!1,this._generated=o}function s(t){i.call(this),this.start=null,this.item=t,this.delay=0,this.duration=0,this.easeName="linear",this.animations=[]}function o(t){s.call(this,t)}function r(t){s.call(this,t),this._infinite=!1}function a(t,i){!document.styleSheets.length&&this.createStyleSheet(),this.stylesheet=document.styleSheets[0],this.item=t,this.animation=t.animation,!i&&this.style()}function u(){i.call(this),this.items=[],this.frame=null,this.init()}function c(){u.call(this,!0),this.currentTime=0,this.start=0}function h(t){i.call(this),this.dom=t,this.init()}function p(){var t=x.sub(this.state.translate,this.current.position);this.current.acceleration=x.add(this.current.acceleration,t)}function l(t,i,e){t||(t=x.set(0)),i||(i=x.set(0)),e||(e=!0);for(var n=0;3>n;++n)(this.current.position[n]<t[n]||this.current.position[n]>i[n])&&(e?this.previous.position[n]=2*this.current.position[n]-this.previous.position[n]:this.current.position[n]=Math.max(t[n],Math.min(i[n],this.current.position[n])))}function f(t,i){var e=this.current,n=this.previous;e.acceleration=x.scale(e.acceleration,this.mass),e.velocity=x.sub(e.position,n.position),void 0!==i&&(e.velocity=x.scale(e.velocity,i)),n.position=e.position,e.position=x.add(e.position,x.add(e.velocity,x.scale(e.acceleration,t*t))),e.acceleration=x.zero()}function m(t,i,e,n){h.call(this,t),i===Object(i)&&(e=i.viscosity,n=i.edge,i=i.mass),i/=100,i||(i=.01),e||(e=.1),n||(n=!1),this.mass=1/i,this.viscosity=e,this.edge=n}var y={};y.world=function(){return new u},y.timeline=function(){return new c},"object"==typeof module&&"object"==typeof module.exports?module.exports=y:"function"==typeof define&&define.amd?define(y):window.anima=window.a=y;for(var d=top.requestAnimationFrame,v=top.cancelAnimationFrame,b=["moz","webkit","ms"],g=0;g<b.length&&!d;g++)d=top[b[g]+"RequestAnimationFrame"],v=top[b[g]+"CancelAnimationFrame"]||top[b[g]+"CancelRequestAnimationFrame"];var z,w=([].slice.call(getComputedStyle(document.documentElement,null)).join("").match(/(-(moz|webkit|ms)-)transform/)||[])[1],M=t("transform"),k=t("animation"),A=top.performance&&top.performance.now?top.performance:Date;d(function(t){z=t>1e12!=A.now()>1e12});var x={set:function(t,i,e){return Array.isArray(t)&&(i=t[1],e=t[2],t=t[0]),void 0===t&&(t=0),void 0===i&&(i=t,e=t),[t,i,e]},length:function(t,i,e){return Array.isArray(t)&&(i=t[1],e=t[2],t=t[0]),Math.sqrt(t*t+i*i+e*e)},add:function(t,i){return[t[0]+i[0],t[1]+i[1],t[2]+i[2]]},sub:function(t,i){return[t[0]-i[0],t[1]-i[1],t[2]-i[2]]},norm:function(t,i,e){Array.isArray(t)&&(i=t[1],e=t[2],t=t[0]);var n=this.length(t,i,e);return 0!==n?(t/=n,i/=n,e/=n):(t=0,i=0,e=0),[t,i,e]},dist:function(t,i){var e=t[0]-i[0],n=t[1]-i[1],s=t[2]-i[2];return Math.sqrt(e*e+n*n+s+s)},cross:function(t,i){var e=t[1]*i[2]-t[2]*i[1],n=t[2]*i[0]-t[0]*i[2],s=t[1]*i[1]-t[1]*i[0];return[e,n,s]},clone:function(t){return t.slice()},scale:function(t,i,e,n){return Array.isArray(t)&&(n=i,i=t[1],e=t[2],t=t[0]),[t*n,i*n,e*n]},zero:function(){return[0,0,0]}},q=Math.PI/180,j={identity:function(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},multiply:function S(t,i){var e=this.identity();return e[0]=t[0]*i[0]+t[1]*i[4]+t[2]*i[8],e[1]=t[0]*i[1]+t[1]*i[5]+t[2]*i[9],e[2]=t[0]*i[2]+t[1]*i[6]+t[2]*i[10],e[4]=t[4]*i[0]+t[5]*i[4]+t[6]*i[8],e[5]=t[4]*i[1]+t[5]*i[5]+t[6]*i[9],e[6]=t[4]*i[2]+t[5]*i[6]+t[6]*i[10],e[8]=t[8]*i[0]+t[9]*i[4]+t[10]*i[8],e[9]=t[8]*i[1]+t[9]*i[5]+t[10]*i[9],e[10]=t[8]*i[2]+t[9]*i[6]+t[10]*i[10],e[12]=t[12]*i[0]+t[13]*i[4]+t[14]*i[8]+i[12],e[13]=t[12]*i[1]+t[13]*i[5]+t[14]*i[9]+i[13],e[14]=t[12]*i[2]+t[13]*i[6]+t[14]*i[10]+i[14],2>=arguments.length?e:S.apply(this,[e].concat(Array.prototype.slice.call(arguments,2)))},translate:function(t,i,e){return t||i||e?(t||(t=0),i||(i=0),e||(e=0),[1,0,0,0,0,1,0,0,0,0,1,0,t,i,e,1]):this.identity()},scale:function(t,i,e){return t||i||e?(t||(t=1),i||(i=1),e||(e=1),[t,0,0,0,0,i,0,0,0,0,e,0,0,0,0,1]):this.identity()},rotate:function(t,i,e){if(!(t||i||e))return this.identity();t||(t=0),i||(i=0),e||(e=0),t*=q,i*=q,e*=q;var n=Math.sin(t),s=Math.cos(t),o=Math.sin(i),r=Math.cos(i),a=Math.sin(e),u=Math.cos(e);return[r*u,s*a+n*o*u,n*a-s*o*u,0,-r*a,s*u-n*o*a,n*u+s*o*a,0,o,-n*r,s*r,0,0,0,0,1]},rotate3d:function(t,i,e,n){n||(n=0),n*=q;var s=Math.sin(n),o=Math.cos(n),r=x.norm(t,i,e);t=r[0],i=r[1],e=r[2];var a=t*t,u=i*i,c=e*e,h=1-o;return[a+(1-a)*o,t*i*h+e*s,t*e*h-i*s,0,t*i*h-e*s,u+(1-u)*o,i*e*h+t*s,0,t*e*h+i*s,i*e*h-t*s,c+(1-c)*o,0,0,0,0,1]},skew:function(t,i){return t||i?(t||(t=0),i||(i=0),t*=q,i*=q,[1,Math.tan(i),0,0,Math.tan(t),1,0,0,0,0,1,0,0,0,0,1]):this.identity()},perspective:function(t){return t=-1/t,[1,0,0,0,0,1,0,0,0,0,1,t,0,0,0,1]},parse:function(t){var i=t.match(/\((.+)\)/)[1].split(/,\s?/);return 6===i.length&&(i.splice(2,0,"0","0"),i.splice(6,0,"0","0"),i.splice(8,0,"0","0","1","0"),i.push("0","1")),i},inverse:function(t){var i=this.identity(),e=t[5]*t[10]-t[6]*t[9],n=t[1]*t[10]-t[2]*t[9],s=t[1]*t[6]-t[2]*t[5],o=t[4]*t[10]-t[6]*t[8],r=t[0]*t[10]-t[2]*t[8],a=t[0]*t[6]-t[2]*t[4],u=t[4]*t[9]-t[5]*t[8],c=t[0]*t[9]-t[1]*t[8],h=t[0]*t[5]-t[1]*t[4],p=1/(t[0]*e-t[1]*o+t[2]*u);return i[0]=p*e,i[1]=-p*n,i[2]=p*s,i[4]=-p*o,i[5]=p*r,i[6]=-p*a,i[8]=p*u,i[9]=-p*c,i[10]=p*h,i[12]=-t[12]*i[0]-t[13]*i[4]-t[14]*i[8],i[13]=-t[12]*i[1]-t[13]*i[5]-t[14]*i[9],i[14]=-t[12]*i[2]-t[13]*i[6]-t[14]*i[10],i},compose:function(t,i,e){t||(t=[]),i||(i=[]),e||(e=[]);var n=this.rotate(i[0],i[1],i[2]);return e.length&&(n[0]*=e[0],n[1]*=e[0],n[2]*=e[0],n[4]*=e[1],n[5]*=e[1],n[6]*=e[1],n[8]*=e[2],n[9]*=e[2],n[10]*=e[2]),t.length&&(n[12]=t[0],n[13]=t[1],n[14]=t[2]),n},decompose:function(t){var i=x.length(t[0],t[1],t[2]),e=x.length(t[4],t[5],t[6]),n=x.length(t[8],t[9],t[10]),s=Math.atan2(-t[9]/n,t[10]/n)/q,o=Math.asin(t[8]/n)/q,r=Math.atan2(-t[4]/e,t[0]/i)/q;(1===t[4]||-1===t[4])&&(s=0,o=t[4]*-Math.PI/2,r=t[4]*Math.atan2(t[6]/e,t[5]/e)/q);var a=t[12],u=t[13],c=t[14];return{translate:[a,u,c],rotate:[s,o,r],scale:[i,e,n]}},transpose:function(t){var i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,t},lookAt:function(t,i,e){var n=x.sub(t,i);n=x.norm(n),0===x.length(n)&&(n[2]=1);var s=x.cross(e,n);0===x.length(s)&&(n[0]+=1e-4,s=x.norm(x.cross(e,n)));var o=x.cross(n,s),r=this.identity();return r[0]=s[0],r[1]=s[1],r[2]=s[2],r[4]=o[0],r[5]=o[1],r[6]=o[2],r[8]=n[0],r[9]=n[1],r[10]=n[2],r},stringify:function(t){for(var i=0;i<t.length;++i)Math.abs(t[i])<1e-6&&(t[i]=0);return"matrix3d("+t.join()+")"}};i.prototype.on=function(t,i){return(this.handlers[t]=this.handlers[t]||[]).push(i),this},i.prototype.off=function(t,i){var e=this.handlers[t];return i?e.splice(e.indexOf(i),1):delete this.handlers[t],this},i.prototype.emit=function(t){var i=Array.prototype.slice.call(arguments,1),e=this.handlers[t];if(e)for(var n=0;n<e.length;++n)e[n].apply(this,i);return this},i.prototype.listeners=function(t){return this.handlers[t]||[]};var O=function(){var t={quad:function(t){return Math.pow(t,2)},cubic:function(t){return Math.pow(t,3)},quart:function(t){return Math.pow(t,4)},quint:function(t){return Math.pow(t,5)},expo:function(t){return Math.pow(t,6)},sine:function(t){return 1-Math.cos(t*Math.PI/2)},circ:function(t){return 1-Math.sqrt(1-t*t)},back:function(t){return t*t*(3*t-2)}},i={linear:function(t){return t}};return Object.keys(t).forEach(function(e){var n=t[e];i["ease-in-"+e]=n,i["ease-out-"+e]=function(t){return 1-n(1-t)},i["ease-in-out-"+e]=function(t){return.5>t?n(2*t)/2:1-n(-2*t+2)/2}}),i.css={linear:"cubic-bezier(0.000, 0.000, 1.000, 1.000)","ease-in-quad":"cubic-bezier(0.550, 0.085, 0.680, 0.530)","ease-in-cubic":"cubic-bezier(0.550, 0.055, 0.675, 0.190)","ease-in-quart":"cubic-bezier(0.895, 0.030, 0.685, 0.220)","ease-in-quint":"cubic-bezier(0.755, 0.050, 0.855, 0.060)","ease-in-sine":"cubic-bezier(0.470, 0.000, 0.745, 0.715)","ease-in-expo":"cubic-bezier(0.950, 0.050, 0.795, 0.035)","ease-in-circ":"cubic-bezier(0.600, 0.040, 0.980, 0.335)","ease-in-back":"cubic-bezier(0.600, -0.280, 0.735, 0.045)","ease-out-quad":"cubic-bezier(0.250, 0.460, 0.450, 0.940)","ease-out-cubic":"cubic-bezier(0.215, 0.610, 0.355, 1.000)","ease-out-quart":"cubic-bezier(0.165, 0.840, 0.440, 1.000)","ease-out-quint":"cubic-bezier(0.230, 1.000, 0.320, 1.000)","ease-out-sine":"cubic-bezier(0.390, 0.575, 0.565, 1.000)","ease-out-expo":"cubic-bezier(0.190, 1.000, 0.220, 1.000)","ease-out-circ":"cubic-bezier(0.075, 0.820, 0.165, 1.000)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1.275)","ease-in-out-quad":"cubic-bezier(0.455, 0.030, 0.515, 0.955)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1.000)","ease-in-out-quart":"cubic-bezier(0.770, 0.000, 0.175, 1.000)","ease-in-out-quint":"cubic-bezier(0.860, 0.000, 0.070, 1.000)","ease-in-out-sine":"cubic-bezier(0.445, 0.050, 0.550, 0.950)","ease-in-out-expo":"cubic-bezier(1.000, 0.000, 0.000, 1.000)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.150, 0.860)","ease-in-out-back":"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},i}();e.prototype.init=function(t,i){if(null===this.start||i){this.start=t+this.delay;var e=this.item.state;this.initial={translate:e.translate.slice(),rotate:e.rotate.slice(),scale:e.scale.slice(),opacity:e.opacity}}},e.prototype.run=function(t){if(!(t<this.start)){var i=(t-this.start)/this.duration;i=this.ease(i),this.transform(i)}},e.prototype.pause=function(){this.diff=A.now()-this.start},e.prototype.resume=function(){this.start=A.now()-this.diff},e.prototype.set=function(t,i){var e=this.item.state,n=this.initial;if(Array.isArray(this[t]))for(var s=0;3>s;++s)this[t][s]&&(e[t][s]=n[t][s]+this[t][s]*i);else void 0!==this[t]&&(e[t]=n[t]+(this[t]-n[t])*i)},e.prototype.transform=function(t){this.set("translate",t),this.set("rotate",t),this.set("scale",t),this.set("opacity",t)},e.prototype.end=function(t){!t&&this.transform(1),this.start=null},n.prototype.init=function(t,i){(null===this.start||i)&&(this.start=t+this.delay,this.item.style(k,this.name+" "+this.duration+"ms"+" "+this.ease+" "+this.delay+"ms"+(this._infinite?" infinite":"")+" "+"forwards"))},n.prototype.run=function(){},n.prototype.pause=function(){this.item.style(k+"-play-state","paused"),this.diff=A.now()-this.start},n.prototype.resume=function(){this.item.style(k+"-play-state","running"),this.start=A.now()-this.diff},n.prototype.end=function(){if(this._generated){var t=getComputedStyle(this.item.dom,null),i=t[M],e=t.opacity;this.item.style(k,""),this.item.state=j.decompose(j.parse(i)),this.item.state.opacity=Number(e),this.item.style()}this.start=null},s.prototype=Object.create(i.prototype),s.prototype.constructor=s,s.prototype.add=function(t,i,a,u,c){function h(t,e){var n=new r(t);return e.forEach(function(t){n.add(t,i,a,u)}),n}function p(t,e){var n=new o(t);return e.forEach(function(e){Array.isArray(e)?n.add(h(t,e)):n.add(e,i,a,u)}),n}return Array.isArray(t)?t=p(this.item,t):"string"==typeof t||void 0!=t.name?t=new n(this.item,t,i,a,u,c):t instanceof s||(t=new e(this.item,t,i,a,u)),this.animations.push(t),i=this.animations.map(function(t){return t.duration+t.delay}),this.duration=this instanceof o?Math.max.apply(null,i):i.reduce(function(t,i){return t+i},0),this},Object.defineProperty(s.prototype,"length",{get:function(){return this.animations.length}}),s.prototype.get=function(t){return this.animations[t]},s.prototype.empty=function(){this.animations=[]},s.prototype.animate=function(t,i,e,n){return this.add(t,i,e,n)},s.prototype.css=function(){return this.item.css()},o.prototype=Object.create(s.prototype),o.prototype.constructor=o,o.prototype.all=function(t){for(var i=Array.prototype.slice.call(arguments,1),e=0;e<this.animations.length;++e){var n=this.animations[e];n[t].apply(n,i)}},o.prototype.init=function(t,i){(null===this.start||i)&&(this.start=t,this.all("init",t,i),this.emit("start"))},o.prototype.run=function(t){if(this.animations.length){for(var i=0;i<this.animations.length;++i){var e=this.animations[i];e.start+e.duration<=t?(this.animations.splice(i--,1),e.end()):e.run(t)}this.item.style(),this.animations.length||this.end()}},o.prototype.seek=function(t){this.run(t)},o.prototype.pause=function(){this.all("pause")},o.prototype.resume=function(){this.all("resume")},o.prototype.end=function(t){this.all("end",t),this.emit("end")},r.prototype=Object.create(s.prototype),r.prototype.constructor=r,r.prototype.init=function(t,i){(null===this.start||i)&&(this.start=t,this.animations[0].init(t,i),this.emit("start"))},r.prototype.run=function(t,i){if(this.animations.length){for(;0!==this.animations.length;){if(i=this.animations[0],i instanceof n&&(i._infinite=this._infinite),i.init(t),!(i.start+i.duration<=t)){i.run(t);break}if(this._infinite&&i instanceof n)break;this.animations.shift(),i.end(),!this._infinite||i instanceof n||this.animations.push(i)}i instanceof n||this.item.style(),this.animations.length||this.end()}},r.prototype.seek=function(t){if(0!==this.animations.length)for(var i=0,e=0;e<this.animations.length;++e){var n=this.animations[e];n.init(i,!0);{if(!(n.start+n.duration<=t)){n.run(t),this.item.style();break}n.end(),i+=n.delay+n.duration}}},r.prototype.infinite=function(){return this._infinite=!0,this},r.prototype.pause=function(){this.animations.length&&this.animations[0].pause()},r.prototype.resume=function(){this.animations.length&&this.animations[0].resume()},r.prototype.end=function(t){for(var i=0;i<this.animations.length;++i)this.animations[i].end(t);this.animations=[],this._infinite=!1,this.emit("end")},a.prototype.createStyleSheet=function(){var t=document.createElement("style");document.getElementsByTagName("head")[0].appendChild(t)},a.prototype.pause=function(){this.animation.pause()},a.prototype.resume=function(){this.animation.resume()},a.prototype.stop=function(){var t=getComputedStyle(this.item.dom,null),i=t[M],e=t.opacity;return this.item.style(k,""),this.item.state=j.decompose(j.parse(i)),this.item.state.opacity=Number(e),this.item.style(),this},a.prototype.style=function(){var t="a"+Date.now()+"r"+Math.floor(1e3*Math.random());this.stylesheet.insertRule(this.keyframes(t),this.stylesheet.cssRules.length),this.animation.empty(),this.animation.add(t,this.animation.duration,"",0,!0)},a.prototype.keyframes=function(i){for(var n=0,s=["@"+t("keyframes")+" "+i+"{"],o=0;o<this.animation.length;++o){var r=this.animation.get(o),a=this.animation.get(o+1);if(r.init(),r instanceof e)0===o&&s.push(this.frame(0,O.css[r.easeName])),r.delay&&s.push(this.frame(n+=r.delay)),r.transform(1),s.push(this.frame(n+=r.duration,a&&O.css[a.easeName]));else{var u=[];r.animations.forEach(function(t){t.delay&&-1===u.indexOf(t.delay)&&u.push(t.delay),t.duration&&-1===u.indexOf(t.delay+t.duration)&&u.push(t.delay+t.duration)}),u=u.sort(function(t,i){return t-i});for(var c=0;c<u.length;++c){for(var h=u[c],p=0;p<r.animations.length;++p){var l=r.animations[p];l.delay>=h||l.delay+l.duration<h||l.transform(l.ease((h-l.delay)/l.duration))}s.push(this.frame(n+=h))}}}return s.push("}"),s.join("")},a.prototype.percent=function(t){return(100*t/this.animation.duration).toFixed(3)},a.prototype.frame=function(i,e){var n=this.percent(i);return n+"% {"+(n?M+":"+this.item.transform()+";":"")+(n?"opacity:"+this.item.opacity()+";":"")+(e?t("animation-timing-function")+":"+e+";":"")+"}"},u.prototype=Object.create(i.prototype),u.prototype.constructor=u,u.prototype.init=function(){function t(e){z&&(e=A.now()),i.update(e),i.frame=d(t)}var i=this;this.frame=d(t)},u.prototype.update=function(t){for(var i=0;i<this.items.length;++i)this.items[i].update(t)},u.prototype.add=function(t,i,e,n){var s;return s=i?new m(t,i,e,n):new h(t),this.items.push(s),s},u.prototype.cancel=function(){this.frame&&v(this.frame),this.frame=0},u.prototype.stop=function(){this.cancel();for(var t=0;t<this.items.length;++t)this.items[t].stop()},u.prototype.pause=function(){this.cancel();for(var t=0;t<this.items.length;++t)this.items[t].pause()},u.prototype.resume=function(){for(var t=0;t<this.items.length;++t)this.items[t].resume();this.init()},c.prototype=Object.create(u.prototype),c.prototype.constructor=c,c.prototype.init=function(){function t(e){z&&(e=A.now()),i.running&&(i.currentTime=e-i.start),i.update(i.currentTime),i.frame=d(t)}this.frame=d(t);var i=this},c.prototype.update=function(t){for(var i=0,e=this.items.length;e>i;++i){var n=this.items[i];this.changed<e||this.running?(n.timeline(t),this.changed++,this.emit("update",t)):n.style()}},c.prototype.play=function(){this.running=!0,this.start=A.now()-this.currentTime},c.prototype.pause=function(){this.running=!1},c.prototype.stop=function(){this.currentTime=0,this.running=!1},c.prototype.seek=function(t){this.changed=0,this.currentTime=t},h.prototype=Object.create(i.prototype),h.prototype.constructor=h,h.prototype.init=function(){this.animation=new r(this),this.running=!0;var t=getComputedStyle(this.dom,null).opacity||1;this.state={translate:x.zero(),rotate:x.zero(),scale:x.set(1),opacity:Number(t)}},h.prototype.update=function(t){this.running&&this.animation.run(t)},h.prototype.timeline=function(t){this.clear(),this.animation.seek(t)},h.prototype.pause=function(){this.running&&(this.animation.pause(),this.running=!1)},h.prototype.resume=function(){this.running||(this.animation.resume(),this.running=!0)},h.prototype.style=function(t,i){t&&i?this.dom.style[t]=i:(this.dom.style[M]=this.transform(),this.dom.style.opacity=this.opacity())},h.prototype.transform=function(){return j.stringify(this.matrix())},h.prototype.matrix=function(){var t=this.state;return j.compose(t.translate,t.rotate,t.scale)},h.prototype.center=function(){return j.decompose(j.inverse(this.matrix()))},h.prototype.lookAt=function(t){var i=j.decompose(j.lookAt(t,this.state.translate,x.set(0,1,0)));this.state.rotate=i.rotate},h.prototype.opacity=function(){return this.state.opacity},h.prototype.add=function(t,i){return this.state[t][0]+=i[0],this.state[t][1]+=i[1],this.state[t][2]+=i[2],this},h.prototype.set=function(t,i){return this.state[t]=i,this},h.prototype.translate=function(t){return this.add("translate",t)},h.prototype.rotate=function(t){return this.add("rotate",t)},h.prototype.scale=function(t){return this.add("scale",t)},h.prototype.clear=function(){this.state.translate=x.zero(),this.state.rotate=x.zero(),this.state.scale=x.set(1),this.state.opacity=1},h.prototype.animate=function(t,i,e,n){return this.animation.add(t,i,e,n)},h.prototype.finish=function(t){return this.animation.end(t),this},h.prototype.stop=function(){return this.finish(!0)},h.prototype.css=function(t){return new a(this,t)},m.prototype=Object.create(h.prototype),m.prototype.constructor=m,m.prototype.init=function(){h.prototype.init.call(this),this.current={position:x.zero(),velocity:x.zero(),acceleration:x.zero()},this.previous={position:x.zero(),velocity:x.zero(),acceleration:x.zero()},this.clock=null},m.prototype.update=function(t){this.animation.run(t),this.integrate(t),this.style()},m.prototype.timeline=function(t){this.clear(),this.animation.seek(t),this.integrate(t,!0),this.style()},m.prototype.integrate=function(t,i){this.clock||(this.clock=t);var e=t-this.clock;e&&(i&&(e=Math.max(-16,Math.min(16,e))),this.clock=t,e*=.001,p.call(this),this.edge&&l.call(this,x.set(this.edge.min),x.set(this.edge.max),this.edge.bounce),f.call(this,e,1-this.viscosity))},m.prototype.css=function(){throw new Error("CSS is nor supported for physics")},m.prototype.matrix=function(){var t=this.state;return j.compose(this.current.position,t.rotate,t.scale)}}();
//# sourceMappingURL=anima.min.js.map