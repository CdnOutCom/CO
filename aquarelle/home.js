var THREE=window.THREE||{},d3=window.d3||{};d3.geom=d3.geom||{},function(){function t(e,i,o){var r=this;r.setOptions(t.defaultOptions),r.setOptions(o),r.mask={},r.mask.canvas=document.createElement("canvas"),r.mask.ctx=r.mask.canvas.getContext("2d"),"string"==typeof i?(r.mask.img=new Image,r.mask.img.onload=function(){r.drawMaskImage()},r.mask.crossOrigin="Anonymous",r.mask.img.src=i):i.nodeName&&i.src&&(r.mask.img=i,r.drawMaskImage()),THREE.ImageUtils.crossOrigin="",(new THREE.TextureLoader).load(e&&("string"==typeof e?e:e.nodeName&&e.src)||"",function(t){r.texture=t,t.minFilter=THREE.LinearFilter;var e=r.getComposer();e.addPass(new THREE.ClearPass);var s=new THREE.Texture(r.mask.canvas);s.needsUpdate=!0,s.minFilter=THREE.LinearFilter;var i=r.turbulentPass=new THREE.AquarellePass(t,s);e.addPass(i);var o=new THREE.ShaderPass(THREE.CopyShader);o.renderToScreen=!0,e.addPass(o),r.dispatchEvent(r.getEventObject("created")),r.options.autoplay&&r.start(),r.reset(),r.isInitialized=!0}),s.push(r)}function e(){var t=Date.now(),o=t-i;i=t,s.forEach(function(t){t.render(o/1e3)}),requestAnimationFrame(e)}var s=[],i=Date.now();Object.assign(t.prototype,THREE.EventDispatcher.prototype),t.prototype.getRenderer=function(){if(!this.renderer){var t=this.renderer=new THREE.WebGLRenderer({alpha:!0});t.setClearColor(0,0),t.setSize(this.texture.image.width,this.texture.image.height),t.autoClear=!1}return this.renderer},t.prototype.getCanvas=function(){return this.getRenderer().domElement},t.prototype.getComposer=function(){return this.composer||(this.composer=new THREE.EffectComposer(this.getRenderer(),new THREE.WebGLRenderTarget(this.texture.image.width,this.texture.image.height))),this.composer},t.prototype.drawMaskImage=function(){var t=this.mask||{};if(t.img){t.canvas.width=t.img.width,t.canvas.height=t.img.height,t.ctx.drawImage(t.img,0,0);var e=t.ctx.getImageData(0,0,t.img.width,t.img.height).data;t.points=d3.geom.contour(function(s,i){return e[4*(i*t.img.width+s)+3]>0})}},t.prototype.renderMask=function(){var t=this.mask||{};t.points&&(t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height),t.ctx.lineJoin="round",t.ctx.lineWidth=2*Math.abs(t.offset),t.offset&&(t.ctx.globalCompositeOperation="source-"+(t.offset<0?"out":"over"),this.pathPoints(),t.ctx.stroke()),this.pathPoints(),t.ctx.fill())},t.prototype.pathPoints=function(){var t=this.mask||{};t.ctx.beginPath(),t.points.forEach(function(e,s){t.ctx[s?"lineTo":"moveTo"](e[0],e[1])}),t.ctx.closePath()},t.prototype.direction=1,t.prototype.progress=1,t.prototype.isPaused=!0,t.prototype.render=function(t){if(this.turbulentPass&&this.composer){var e=this.progress,s=this.clampedProgress(e+this.direction*t/(this.options.duration/1e3));this.isPaused||e===s||(this.progress=s,this.reset()),this.renderMask(),this.getRenderer().clear(),this.getComposer().render(t)}},t.prototype.transitionForProgressInRange=function(t,e,s){return e+(s-e)*t},t.prototype.progressForValueInRange=function(t,e,s){return(t-e)/(s-e)},t.prototype.clampedProgress=function(t){return Math.max(0,Math.min(t,1))},t.prototype.transitionInRange=function(t,e,s,i){return this.transitionForProgressInRange(this.clampedProgress(this.progressForValueInRange(this.progress,(s||0)/this.options.duration,(i||this.options.duration)/this.options.duration)),t,e)},t.prototype.isComplete=function(){return this.direction>0?1===this.progress:this.direction<0&&!this.progress},t.prototype.pause=function(){this.isPaused||(this.isPaused=!0,this.isInitialized&&this.dispatchEvent(this.getEventObject("paused")))},t.prototype.play=function(){this.isPaused&&(this.isPaused=!1,this.dispatchEvent(this.getEventObject("played")))},t.prototype.stop=function(){this.progress===+(this.direction>=0)&&this.isPaused||(this.progress=+(this.direction>=0),this.pause(),this.isInitialized&&this.dispatchEvent(this.getEventObject("stopped")))},t.prototype.start=function(){(this.progress!==+(this.direction<0)||this.isPaused)&&(this.progress=+(this.direction<0),this.dispatchEvent(this.getEventObject("started")),this.play())},t.prototype.reverse=function(){this.direction=this.direction<0?1:-1},t.prototype.reset=function(){if(this.turbulentPass){if(this.turbulentPass.uniforms.Amplitude.value=this.transitionInRange(this.options.fromAmplitude,this.options.toAmplitude),this.turbulentPass.uniforms.Frequency.value=this.transitionInRange(this.options.fromFrequency,this.options.toFrequency),this.mask.offset=this.transitionInRange(this.options.fromOffset,this.options.toOffset),this.turbulentPass.uniforms.Mask.value.needsUpdate=!0,this.dispatchEvent(this.getEventObject("changed")),this.isComplete()){this.dispatchEvent(this.getEventObject("completed"));var t=this.isPaused;this.stop()}this.isComplete()&&this.options.loop&&!t&&this.start()}},t.prototype.getEventObject=function(t){return{type:t,timeStamp:Date.now(),direction:this.direction,progress:this.progress,isComplete:this.isComplete()}},t.prototype.setOptions=function(t){"object"==typeof t&&null!==t&&(this.options=Object.assign(this.options||{},t))},t.defaultOptions={fromAmplitude:50,toAmplitude:0,fromFrequency:8,toFrequency:7,fromOffset:-30,toOffset:28,autoplay:!1,loop:!1,duration:8e3},e(),window.Aquarelle=t}();