/*! CAF: cag.js
	v15.0.0-preB (c) 2022 Kyle Simpson
	MIT License: http://getify.mit-license.org
*/
!function UMD(e,n,t,r){"function"==typeof define&&define.amd?(t=Object.values(t),define(e,t,r)):"undefined"!=typeof module&&module.exports?(t=Object.keys(t).map((e=>require(e))),module.exports=r(...t)):(t=Object.values(t).map((e=>n[e])),n[e]=r(...t))}("CAG","undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:new Function("return this")(),{"./caf.js":"CAF","./shared.js":"CAFShared"},(function DEF(e,n){"use strict";var{TIMEOUT_TOKEN:t,UNSET:r,getSignalReason:o,cancelToken:l,signalPromise:a,processTokenOrSignal:i,deferred:u,isFunction:s,isPromise:d}=n;onceEvent=e(onceEvent);let f={};f=Object.assign(CAG,{onEvent:onEvent,onceEvent:onceEvent}),f.onEvent=onEvent,f.onceEvent=onceEvent;var v=new WeakSet;const c=Symbol("unset"),h=Symbol("returned"),p=Symbol("canceled");function CAG(e){return function instance(n,...l){var a,s;if(({tokenOrSignal:n,signal:a,signalPr:s}=i(n)),a.aborted){let e=o(a);throw e=e!==r?e:"Aborted",e}var f=u(),{it:y,ait:m}=function runner(e,n,t,r,...o){var l=e.call(this,{signal:r,pwait:pwait},...o);e=o=null;var a=r.pr.catch((e=>{throw{[p]:!0,reason:e}}));return a.catch((()=>{})),{it:l,ait:async function*runner(){var e,r=c;try{for(;!n.resolved;)if(r!==c?(e=r,r=c,e=l.throw(e)):e=l.next(e),d(e.value))if(v.has(e.value)){v.delete(e.value);try{if((e=await Promise.race([n,a,e.value]))===h)return}catch(e){if(e[p]){let n=l.return();throw void 0!==n.value?n.value:e.reason}r=e}}else e=yield e.value;else{if(e.done)return e.value;e=yield e.value}}finally{l=n=null,t()}}()}}(e,f.pr,onComplete,a,...l),E=m.return;return m.return=function doReturn(e){try{return f.pr.resolved=!0,f.resolve(h),Promise.resolve(y.return(e))}finally{E.call(m),onComplete()}},m;function onComplete(){n&&n!==a&&n[t]&&n.abort(),m&&(m.return=E,n=f=y=m=E=null)}}}function onEvent(e,n,t,r=!1){var o,l,a=!1,i=CAG((function*eventStream({pwait:e}){a||start();try{for(;;){if(0==o.length){let{pr:e,resolve:n}=u();o.push(e),l.push(n)}yield yield e(o.shift())}}finally{s(n.removeEventListener)?n.removeEventListener(t,handler,r):s(n.removeListener)?n.removeListener(t,handler):s(n.off)&&n.off(t,handler),o.length=l.length=0}}))(e,n,t,r);return i.start=start,i;function start(){a||(a=!0,o=[],l=[],s(n.addEventListener)?n.addEventListener(t,handler,r):s(n.addListener)?n.addListener(t,handler):s(n.on)&&n.on(t,handler))}function handler(e){if(l.length>0){l.shift()(e)}else{let{pr:n,resolve:t}=u();o.push(n),t(e)}}}function*onceEvent(e,n,t,r=!1){try{var o=onEvent(e,n,t,r);return(yield o.next()).value}finally{o.return()}}function pwait(e){var n=Promise.resolve(e);return v.add(n),n}return f}));