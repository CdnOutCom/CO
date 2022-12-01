/*! audio5 2018-03-13 */
!function(a,b,c){"use strict";"undefined"!=typeof module&&module.exports?module.exports=c(b,a):"function"==typeof define&&define.amd?define(function(){return c(b,a)}):a[b]=c(b,a)}(window,"Audio5js",function(a,b){"use strict";function c(a){this.message=a}function d(a){var b,c={};for(b in a)"object"==typeof a[b]?c[b]=d(a[b]):c[b]=a[b];return c}var e=b.ActiveXObject;c.prototype=new Error;var f=function(a,b){var c,e=d(b);for(c in e)e.hasOwnProperty(c)&&(a[c]=e[c]);return a},g=function(a,b){return f(a.prototype,b)},h={on:function(a,b,c){this.subscribe(a,b,c,!1)},one:function(a,b,c){this.subscribe(a,b,c,!0)},off:function(a,b){if(void 0!==this.channels[a]){var c,d;for(c=0,d=this.channels[a].length;c<d;c++){if(this.channels[a][c].fn===b){this.channels[a].splice(c,1);break}}}},subscribe:function(a,b,c,d){void 0===this.channels&&(this.channels={}),this.channels[a]=this.channels[a]||[],this.channels[a].push({fn:b,ctx:c,once:d||!1})},trigger:function(a){if(this.channels&&this.channels.hasOwnProperty(a)){for(var b=Array.prototype.slice.call(arguments,1),c=[],d=[];this.channels[a].length>0;){var e=this.channels[a].shift();e.once||c.push(e),"function"==typeof e.fn&&d.push(e)}for(this.channels[a]=c;d.length>0;){var f=d.shift();f.fn.apply(f.ctx,b)}}}},i={flash_embed_code:function(b,c,d){var f=a+b,g='<param name="movie" value="'+c+"?playerInstanceNumber="+b+"&datetime="+d+'"/><param name="wmode" value="transparent"/><param name="allowscriptaccess" value="always" /></object>';return(e?'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" id="'+f+'">':'<object type="application/x-shockwave-flash" data="'+c+"?playerInstanceNumber="+b+"&datetime="+d+'" width="1" height="1" id="'+f+'" >')+g},can_play:function(a){var b,c=document.createElement("audio");switch(a){case"mp3":b="audio/mpeg;";break;case"vorbis":b='audio/ogg; codecs="vorbis"';break;case"opus":b='audio/ogg; codecs="opus"';break;case"webm":b='audio/webm; codecs="vorbis"';break;case"mp4":b='audio/mp4; codecs="mp4a.40.5"';break;case"wav":b='audio/wav; codecs="1"'}if(void 0!==b){if("mp3"===a&&navigator.userAgent.match(/Android/i)&&navigator.userAgent.match(/Firefox/i))return!0;try{return!!c.canPlayType&&""!==c.canPlayType(b)}catch(d){return!1}}return!1},has_flash:function(){var a=!1;if(navigator.plugins&&navigator.plugins.length&&navigator.plugins["Shockwave Flash"])a=!0;else if(navigator.mimeTypes&&navigator.mimeTypes.length){var b=navigator.mimeTypes["application/x-shockwave-flash"];a=b&&b.enabledPlugin}else try{var c=new e("ShockwaveFlash.ShockwaveFlash");a="object"==typeof c}catch(d){}return a}(),embedFlash:function(c,d){var e=document.createElement("div");if(e.style.position="absolute",e.style.width="1px",e.style.height="1px",e.style.top="1px",document.body.appendChild(e),"object"==typeof b.swfobject){var f={playerInstance:"window."+a+"_flash.instances['"+d+"']"},g={allowscriptaccess:"always",wmode:"transparent"};e.innerHTML='<div id="'+a+d+'"></div>',swfobject.embedSWF(c+"?ts="+((new Date).getTime()+Math.random()),a+d,"1","1","9.0.0",null,f,g)}else{var h=(new Date).getTime()+Math.random();e.innerHTML=this.flash_embed_code(d,c,h)}return document.getElementById(d)},formatTime:function(a){var b=parseInt(a/3600,10)%24,c=parseInt(a/60,10)%60,d=parseInt(a%60,10),e=(c<10?"0"+c:c)+":"+(d<10?"0"+d:d);return b>0?(b<10?"0"+b:b)+":"+e:e}};i.use_flash=i.can_play("mp3");var j,k,l,m={playing:!1,vol:1,duration:0,position:0,load_percent:0,seekable:!1,ready:null},n=b[a+"_flash"]=b[a+"_flash"]||{instances:[]};k=function(){if(i.use_flash&&!i.has_flash)throw new Error("Flash Plugin Missing")},k.prototype={init:function(a){n.instances.push(this),this.id=n.instances.length-1,this.embed(a)},embed:function(a){i.embedFlash(a,this.id)},eiReady:function(){this.audio=document.getElementById(a+this.id),this.trigger("ready")},eiLoadStart:function(){this.trigger("loadstart")},eiLoadedMetadata:function(){this.trigger("loadedmetadata")},eiCanPlay:function(){this.trigger("canplay")},eiTimeUpdate:function(a,b,c){this.position=a,this.duration=b,this.seekable=c,this.trigger("timeupdate",a,this.seekable?b:null)},eiProgress:function(a,b,c){this.load_percent=a,this.duration=b,this.seekable=c,this.trigger("progress",a)},eiLoadError:function(a){this.trigger("error",a)},eiPlay:function(){this.playing=!0,this.trigger("play"),this.trigger("playing")},eiPause:function(){this.playing=!1,this.trigger("pause")},eiEnded:function(){this.pause(),this.trigger("ended")},eiSeeking:function(){this.trigger("seeking")},eiSeeked:function(){this.trigger("seeked")},reset:function(){this.seekable=!1,this.duration=0,this.position=0,this.load_percent=0},load:function(a){this.reset(),this.audio.load(a)},play:function(){this.audio.pplay()},pause:function(){this.audio.ppause()},volume:function(a){if(void 0===a||isNaN(parseInt(a,10)))return this.vol;this.audio.setVolume(a),this.vol=a},seek:function(a){try{this.audio.seekTo(a),this.position=a}catch(b){}},rate:function(){},destroyAudio:function(){this.audio&&(this.pause(),this.audio.parentNode.removeChild(this.audio),delete n.instances[this.id],n.instances.splice(this.id,1),delete this.audio)}},g(k,h),g(k,m),l=function(){},l.prototype={init:function(){this._rate=1,this.trigger("ready")},createAudio:function(){this.audio=new Audio,this.audio.autoplay=!1,this.audio.preload="auto",this.audio.autobuffer=!0,this.audio.playbackRate=this._rate,this.bindEvents()},destroyAudio:function(){if(this.audio){this.pause(),this.unbindEvents();try{this.audio.setAttribute("src","")}finally{delete this.audio}}},setupEventListeners:function(){this.listeners={loadstart:this.onLoadStart.bind(this),canplay:this.onLoad.bind(this),loadedmetadata:this.onLoadedMetadata.bind(this),play:this.onPlay.bind(this),playing:this.onPlaying.bind(this),pause:this.onPause.bind(this),ended:this.onEnded.bind(this),error:this.onError.bind(this),timeupdate:this.onTimeUpdate.bind(this),seeking:this.onSeeking.bind(this),seeked:this.onSeeked.bind(this)}},bindEvents:function(){void 0===this.listeners&&this.setupEventListeners(),this.audio.addEventListener("loadstart",this.listeners.loadstart,!1),this.audio.addEventListener("canplay",this.listeners.canplay,!1),this.audio.addEventListener("loadedmetadata",this.listeners.loadedmetadata,!1),this.audio.addEventListener("play",this.listeners.play,!1),this.audio.addEventListener("playing",this.listeners.playing,!1),this.audio.addEventListener("pause",this.listeners.pause,!1),this.audio.addEventListener("ended",this.listeners.ended,!1),this.audio.addEventListener("error",this.listeners.error,!1),this.audio.addEventListener("timeupdate",this.listeners.timeupdate,!1),this.audio.addEventListener("seeking",this.listeners.seeking,!1),this.audio.addEventListener("seeked",this.listeners.seeked,!1)},unbindEvents:function(){this.audio.removeEventListener("loadstart",this.listeners.loadstart),this.audio.removeEventListener("canplay",this.listeners.canplay),this.audio.removeEventListener("loadedmetadata",this.listeners.loadedmetadata),this.audio.removeEventListener("play",this.listeners.play),this.audio.removeEventListener("playing",this.listeners.playing),this.audio.removeEventListener("pause",this.listeners.pause),this.audio.removeEventListener("ended",this.listeners.ended),this.audio.removeEventListener("error",this.listeners.error),this.audio.removeEventListener("timeupdate",this.listeners.timeupdate),this.audio.removeEventListener("seeking",this.listeners.seeking),this.audio.removeEventListener("seeked",this.listeners.seeked)},onLoadStart:function(){this.trigger("loadstart")},onLoad:function(){if(!this.audio)return setTimeout(this.onLoad.bind(this),100);this.seekable=this.audio.seekable&&this.audio.seekable.length>0,this.seekable&&(this.timer=setInterval(this.onProgress.bind(this),250)),this.trigger("canplay")},onLoadedMetadata:function(){this.trigger("loadedmetadata")},onPlay:function(){this.playing=!0,this.trigger("play")},onPlaying:function(){this.playing=!0,this.trigger("playing")},onPause:function(){this.playing=!1,this.trigger("pause")},onEnded:function(){this.playing=!1,this.trigger("ended")},onTimeUpdate:function(){if(this.audio&&this.playing){try{this.position=this.audio.currentTime,this.duration=this.audio.duration===1/0?null:this.audio.duration}catch(a){}this.trigger("timeupdate",this.position,this.duration)}},onProgress:function(){this.audio&&null!==this.audio.buffered&&this.audio.buffered.length&&(this.duration=this.audio.duration===1/0?null:this.audio.duration,this.load_percent=parseInt(this.audio.buffered.end(this.audio.buffered.length-1)/this.duration*100,10),this.trigger("progress",this.load_percent),this.load_percent>=100&&this.clearLoadProgress())},onError:function(a){this.trigger("error",a)},onSeeking:function(){this.trigger("seeking")},onSeeked:function(){this.trigger("seeked")},clearLoadProgress:function(){void 0!==this.timer&&(clearInterval(this.timer),delete this.timer)},reset:function(){this.clearLoadProgress(),this.seekable=!1,this.duration=0,this.position=0,this.load_percent=0},load:function(a){this.reset(),this.trigger("pause"),void 0===this.audio&&this.createAudio(),this.audio.setAttribute("src",a),this.audio.load()},play:function(){if(this.audio){var a=this.audio.play();return this.audio.playbackRate=this._rate,a}},pause:function(){this.audio&&this.audio.pause()},volume:function(a){if(void 0===a||isNaN(parseInt(a,10)))return this.vol;var b=a<0?0:Math.min(1,a);this.audio.volume=b,this.vol=b},seek:function(a){var b=this.playing;this.position=a,this.audio.currentTime=a,b?this.play():null!==this.audio.buffered&&this.audio.buffered.length&&this.trigger("timeupdate",this.position,this.duration)},rate:function(a){if(void 0===a||isNaN(parseFloat(a)))return this._rate;this._rate=a,this.audio&&(this.audio.playbackRate=a)}},g(l,h),g(l,m);var o={swf_path:"/swf/audiojs.swf",throw_errors:!0,format_time:!0,codecs:["mp3"]};return j=function(a){a=a||{};var b;for(b in o)o.hasOwnProperty(b)&&!a.hasOwnProperty(b)&&(a[b]=o[b]);this.init(a)},j.can_play=function(a){return i.can_play(a)},j.prototype={init:function(a){this.ready=!1,this.settings=a,this.audio=this.getPlayer(),this.bindAudioEvents(),this.settings.use_flash?this.audio.init(a.swf_path):this.audio.init()},getPlayer:function(){var a,b,c,d;if(this.settings.use_flash)c=new k,this.settings.player={engine:"flash",codec:"mp3"};else{for(a=0,b=this.settings.codecs.length;a<b;a++)if(d=this.settings.codecs[a],j.can_play(d)){c=new l,this.settings.use_flash=!1,this.settings.player={engine:"html",codec:d};break}void 0===c&&(this.settings.use_flash=!j.can_play("mp3"),c=this.settings.use_flash?new k:new l,this.settings.player={engine:this.settings.use_flash?"flash":"html",codec:"mp3"})}return c},bindAudioEvents:function(){this.audio.on("ready",this.onReady,this),this.audio.on("loadstart",this.onLoadStart,this),this.audio.on("loadedmetadata",this.onLoadedMetadata,this),this.audio.on("play",this.onPlay,this),this.audio.on("pause",this.onPause,this),this.audio.on("ended",this.onEnded,this),this.audio.on("canplay",this.onCanPlay,this),this.audio.on("timeupdate",this.onTimeUpdate,this),this.audio.on("progress",this.onProgress,this),this.audio.on("error",this.onError,this),this.audio.on("seeking",this.onSeeking,this),this.audio.on("seeked",this.onSeeked,this)},unbindAudioEvents:function(){this.audio.off("ready",this.onReady),this.audio.off("loadstart",this.onLoadStart),this.audio.off("loadedmetadata",this.onLoadedMetadata),this.audio.off("play",this.onPlay),this.audio.off("pause",this.onPause),this.audio.off("ended",this.onEnded),this.audio.off("canplay",this.onCanPlay),this.audio.off("timeupdate",this.onTimeUpdate),this.audio.off("progress",this.onProgress),this.audio.off("error",this.onError),this.audio.off("seeking",this.onSeeking),this.audio.off("seeked",this.onSeeked)},load:function(a){var b=this,c=function(a){b.audio.load(a),b.trigger("load")};this.ready?c(a):this.on("ready",c)},play:function(){if(!this.playing)return this.audio.play()},pause:function(){this.playing&&this.audio.pause()},playPause:function(){this[this.playing?"pause":"play"]()},volume:function(a){if(void 0===a||isNaN(parseInt(a,10)))return this.vol;this.audio.volume(a),this.vol=a},seek:function(a){this.audio.seek(a),this.position=a},rate:function(a){return this.audio.rate(a)},destroy:function(){this.unbindAudioEvents(),this.audio.destroyAudio()},onReady:function(){this.ready=!0,"function"==typeof this.settings.ready&&this.settings.ready.call(this,this.settings.player),this.trigger("ready")},onLoadStart:function(){this.trigger("loadstart")},onLoadedMetadata:function(){this.trigger("loadedmetadata")},onPlay:function(){this.playing=!0,this.trigger("play")},onPause:function(){this.playing=!1,this.trigger("pause")},onEnded:function(){this.playing=!1,this.trigger("ended")},onError:function(){var a=new c("Audio Error. Failed to Load Audio");if(this.settings.throw_errors)throw a;this.trigger("error",a)},onCanPlay:function(){this.trigger("canplay")},onSeeking:function(){this.trigger("seeking")},onSeeked:function(){this.trigger("seeked")},onTimeUpdate:function(a,b){this.position=this.settings.format_time?i.formatTime(a):a,this.duration=this.settings.format_time&&null!==b?i.formatTime(b):b,this.trigger("timeupdate",this.position,this.duration)},onProgress:function(a){this.duration=this.audio.duration,this.load_percent=a,this.trigger("progress",a)}},g(j,h),g(j,m),j});