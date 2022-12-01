/*! asynquence-contrib
    v0.28.2 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function UMD(e,r){"undefined"!=typeof module&&module.exports?(module.exports=function $$inject$dependency(e){if("string"==typeof e)try{e=require(e)}catch(t){return $$inject$dependency}return r(e)},"string"==typeof e&&(module.exports=module.exports(require("path").join("..",e)))):"function"==typeof define&&define.amd?define([e],r):r(e)}(this.ASQ||"asynquence",function DEF(e){"use strict";function isPromise(r){var t=typeof r;return null!==r&&("object"==t||"function"==t)&&!e.isSequence(r)&&"function"==typeof r.then}var r=Array.prototype.slice,t=Object.create(null),n="__ASQ__",a=e.__schedule,u=e.__tapSequence;return e.extend("after",function $$extend(e,n){return function $$after(n){var a=arguments.length>1?r.call(arguments,1):void 0;return n=+n||0,e.then(function $$then(e){var u=a||r.call(arguments,1);setTimeout(function $$set$timeout(){e.apply(t,u)},n)}),e}}),e.after=function $$after(){return e().after.apply(t,arguments)},function IIFE(){var u;e.iterable=function $$iterable(){function throwSequenceErrors(){throw 1===$.length?$[0]:$}function notifyErrors(){var e;if(s=null,o)for(0!==f.length||l||(l=!0,throwSequenceErrors());f.length>0;){l=!0,e=f.shift();try{e.apply(t,$)}catch(r){checkBranding(r)?$=$.concat(r):$.push(r),0===f.length&&throwSequenceErrors()}}}function val(){if(o||c||0===arguments.length)return i;var e=r.call(arguments).map(function mapper(e){return"function"!=typeof e?function $$val(){return e}:e});return p.push.apply(p,e),i}function or(){return c||0===arguments.length?i:(f.push.apply(f,arguments),s||(s=a(notifyErrors)),i)}function pipe(){return c||0===arguments.length?i:(r.call(arguments).forEach(function $$each(e){val(e).or(e.fail)}),i)}function next(){if(o||c||0===p.length)return p.length>0&&$throw$("Sequence cannot be iterated"),{done:!0};try{return{value:p.shift().apply(t,arguments)}}catch(r){return e.isMessageWrapper(r)?$throw$.apply(t,r):$throw$(r),{}}}function $throw$(){return o||c?i:($.push.apply($,arguments),o=!0,s||(s=a(notifyErrors)),i)}function $return$(e){return(o||c)&&(e=void 0),abort(),{done:!0,value:e}}function abort(){o||c||(c=!0,clearTimeout(s),s=null,p.length=f.length=$.length=0)}function duplicate(){var r;return u={val_queue:p.slice(),or_queue:f.slice()},r=e.iterable(),u=null,r}function defer(){return f.push(function $$ignored(){}),i}function brandIt(e){return Object.defineProperty(e,n,{enumerable:!1,value:!0}),e}var i,s,o=!1,l=!1,c=!1,p=[],f=[],$=[];return i=brandIt({val:val,then:val,or:or,pipe:pipe,next:next,"throw":$throw$,"return":$return$,abort:abort,duplicate:duplicate,defer:defer}),i["function"==typeof Symbol&&Symbol.iterator||"@@iterator"]=function $$iter(){return i},u&&(p=u.val_queue.slice(0),f=u.or_queue.slice(0)),i.val.apply(t,arguments),i}}(),e.extend("race",function $$extend(n,a){return function $$race(){if(a("seq_error")||a("seq_aborted")||0===arguments.length)return n;var i=r.call(arguments).map(function $$map(r){var t;return e.isSequence(r)?(t={seq:r},u(t),function $$fn(e){t.seq.pipe(e)}):r});return n.then(function $$then(e){var n=r.call(arguments);i.forEach(function $$each(e){e.apply(t,n)})}),n}}),e.extend("runner",function $$extend(n,u){return function $$runner(){if(u("seq_error")||u("seq_aborted")||0===arguments.length)return n;var i=r.call(arguments);return n.then(function $$then(n){function wrap(r){return"function"==typeof r?(r=r.call(t,p),isPromise(r)&&(r=e.iterable(r))):r=e.isSequence(r)&&"next"in r?r.duplicate():e.iterable(r),e.isSequence(r)&&r.or(function $$or(){n.fail.apply(t,arguments)}),r}function addWrapped(){c.push.apply(c,r.call(arguments).map(wrap))}function iterateOrQuit(r,u){c.length>0?u?r():a(r):("undefined"!=typeof f?e.isMessageWrapper(f)||(f=[f]):f=[],n.apply(t,f))}var s,o,l,c=i,p={messages:r.call(arguments,1),add:addWrapped},f=p;c=c.map(wrap),function iterate(r){o=r?"throw":"next",s=c.shift();try{l=e.isMessageWrapper(f)&&e.isSequence(s)?s[o].apply(s,f):s[o](f)}catch(a){return n.fail(a)}if(!u("seq_aborted"))if(l.value===p)l.done||c.push(s),f=p,iterateOrQuit(iterate,!1);else{if(!e.isSequence(l.value))if(isPromise(l.value))l.value=e().promise(l.value);else if("function"==typeof l.value){var i=l.value;l.value=e(function $$ASQ(e){i(e.errfcb)})}else e.isMessageWrapper(l.value)?l.value=e.apply(t,l.value.length>0?l.value:e.messages(void 0)):"undefined"!=typeof l.value?l.value=e(l.value):l.value=e();l.value.val(function $$val(){u("seq_aborted")||(arguments.length>0&&(f=arguments.length>1?e.messages.apply(t,arguments):arguments[0]),l.done||(f===p?c.push(s):c.unshift(s)),iterateOrQuit(iterate,!0))}).or(function $$or(){u("seq_aborted")||(l.done?n.fail.apply(t,arguments):(c.unshift(s),f=arguments.length>1?e.messages.apply(t,arguments):arguments[0],iterate(!0)))})}}()}),n}}),e.extend("toPromise",function $$extend(n,a){return function $$to$promise(){return new Promise(function $$executor(a,u){n.val(function $$val(){var n=r.call(arguments);return a.call(t,n.length>1?n:n[0]),e.messages.apply(t,n)}).or(function $$or(){var e=r.call(arguments);u.call(t,e.length>1?e:e[0])})})}}),e.wrap=function $$wrap(n,a){function checkThis(e,r){return!e||"undefined"!=typeof window&&e===window||"undefined"!=typeof global&&e===global?r:e}function paramSpread(e){return regeneratorRuntime.mark(function paramSpread(r){return regeneratorRuntime.wrap(function paramSpread$(t){for(;;)switch(t.prev=t.next){case 0:return t.delegateYield(e.apply(this,r.messages),"t0",1);case 1:case"end":return t.stop()}},paramSpread,this)})}var u,i,s,o,l;if(a=a&&"object"==typeof a?a:{},a.errfcb&&a.splitcb||a.errfcb&&a.simplecb||a.splitcb&&a.simplecb||"errfcb"in a&&!a.errfcb&&!a.splitcb&&!a.simplecb||a.params_first&&a.params_last||a.spread&&!a.gen)throw Error("Invalid options");return o=a["this"]&&"object"==typeof a["this"]?a["this"]:t,u=a.errfcb||!(a.splitcb||a.simplecb),i=!!a.params_first||!a.params_last&&!("params_first"in a||a.params_first)||"params_last"in a&&!a.params_first&&!a.params_last,l=!(!a.spread&&"spread"in a),s=i?"push":"unshift",a.gen?(l&&(n=paramSpread(n)),function $$wrapped$gen(){return e(e.messages.apply(t,arguments)).runner(n)}):u?function $$wrapped$errfcb(){var t=r.call(arguments),a=checkThis(this,o);return e(function $$asq(e){t[s](e.errfcb),n.apply(a,t)})}:a.splitcb?function $$wrapped$splitcb(){var t=r.call(arguments),a=checkThis(this,o);return e(function $$asq(e){t[s](e,e.fail),n.apply(a,t)})}:a.simplecb?function $$wrapped$simplecb(){var t=r.call(arguments),a=checkThis(this,o);return e(function $$asq(e){t[s](e),n.apply(a,t)})}:void 0},e});