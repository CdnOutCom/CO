!function(){var version="1.0.3";Event.prototype.preventDefault||(Event.prototype.preventDefault=function(){this.returnValue=!1}),Object.keys||(Object.keys=function(obj){var keys=[];for(var i in obj)obj.hasOwnProperty(i)&&keys.push(i);return keys});var Promise=this.Promise=function(){this.callbacks=[],this.state=null,this.data=null};Promise.prototype.fire=function(type,data){"function"!=typeof type&&(this.state="success"==type?!0:!1),this.callbacks.filter(function(cb){return"function"==typeof type?cb.fn==type&&!cb.fired:cb.type==type&&!cb.fired}).forEach(function(cb){cb.fire(data)})},Promise.prototype.then=function(good,bad){this.callbacks.push(new Promise.Callback(good,"success")),bad&&this.callbacks.push(new Promise.Callback(bad,"fail")),null!==this.state&&(this.state?this.fire(good,this.data):this.fire(bad,this.data))},Promise.Callback=function(fn,type){this.fired=!1,this.fn=fn,this.type=type},Promise.Callback.prototype.fire=function(data){this.fn(data),this.fired=!0};var Defer=this.Defer=function(){this.promise=new Promise};Defer.prototype.resolve=function(data){this.promise.data=data,this.promise.fire("success",data)},Defer.prototype.reject=function(error){this.promise.fire("fail",error)};var Result=function(data){this.data=data,this.outputs={},Object.keys(this.data).forEach(function(index){this.outputs[index]=new Result.Output(this.data[index])},this)};Result.prototype.getOutput=function(outputName){return this.outputs[outputName]},Result.Output=function(data){this.data=data,this.refs={},Object.keys(this.data.output).forEach(function(index){this.refs[index]=this.data.output[index]},this)},Result.Output.prototype.getLocation=function(refName){return this.refs[refName].location},Result.Output.prototype.getWidth=function(refName){return this.refs[refName].info.width},Result.Output.prototype.getHeight=function(refName){return this.refs[refName].info.height},Result.Output.prototype.getSize=function(refName){return this.refs[refName].info},Result.Output.prototype.getBytes=function(refName){return this.refs[refName].info.bytes},Result.Info=function(data){this.data=data.getOutput("info")},Result.Info.prototype.getWidth=function(refName){return this.data.getWidth(refName)},Result.Info.prototype.getHeight=function(refName){return this.data.getHeight(refName)},Result.Info.prototype.getBytes=function(refName){return this.data.getBytes(refName)},Result.Info.prototype.getSize=function(refName){return this.data.getSize(refName)};var Output=function(refs){this.refs=refs||{},this.type="image/png",this.urlLocation=!1,this.actions=[],this.tagName="",this.hasFilters=!1,this.filters={},this.data={}};Output.prototype.tag=function(name){return this.tagName=name,this},Output.prototype.resize=function(size){return this.data.resize=px.mergeObject(this.data.resize||{},size),this},Output.prototype.filter=function(type,value){return"object"!=typeof type||type instanceof Array?(this.filters[type]=value,this.hasFilters=!0,this):(this.filters=type,this.hasFilters=!0,this)},Output.prototype.url=function(location){return this.urlLocation=location,this},Output.prototype.rotate=function(options){return this.data.rotate=px.mergeObject(this.data.rotate||{},options),this},Output.prototype.crop=function(position){return this.data.crop=px.mergeObject(this.data.crop||{},position),this},Output.prototype.layer=function(refName,options){var action={method:"layer",options:{ref:refName}};return!options||"object"!=typeof options||options instanceof Array||Object.keys(options).forEach(function(index){action.options[index]=options[index]}),this.actions.push(action),this},Output.prototype.type=function(mime){return this.type=mime,this},Output.prototype.export=function(){this.hasFilters&&this.actions.push({method:"filter",options:this.filters}),Object.keys(this.data).forEach(function(index){var val=this.data[index];this.actions.push({method:index,options:val})},this);var output={ref:this.refs,type:this.type,tag:this.tagName,methods:this.actions};return this.urlLocation&&(output.url=this.urlLocation),output};var _6px=function(images){this.reset(),images&&"object"==typeof images&&Object.keys(images).forEach(function(index){this.load(index,images[index])},this)};_6px.prototype.load=function(name,path){return this.images[name]=path,this},_6px.prototype.output=function(refs){var output=new Output(refs);return this.outputs.push(output),output},_6px.prototype.reset=function(){this.images={},this.outputs=[],this.callback=!1},_6px.prototype.callback=function(url){return this.url=url,this},_6px.prototype.getOutputByTagName=function(tag){var relevant=this.outputs.filter(function(out){return out.tagName==tag});return relevant.length>0?relevant[0]:null},_6px.prototype.getInfo=function(fn){var d=new Defer,refs={};return Object.keys(this.images).forEach(function(index){refs[index]=!1}),this.output(refs).tag("info"),this.save().then(function(res){var r=new Result.Info(res);d.resolve(r),fn&&fn(null,r)},function(err){d.reject(err),fn&&fn(err)}),d.promise},_6px.prototype.upload=function(fn){var d=new Defer,refs={};return Object.keys(this.images).forEach(function(index){refs[index]=!1}),this.output(refs).url("6px").tag("info"),this.save().then(function(res){var r=new Result.Info(res);d.resolve(r),fn&&fn(null,r)},function(err){d.reject(err),fn&&fn(err)}),d.promise},_6px.prototype.save=function(options,fn){var d=new Defer,_this=this;"function"==typeof options&&(fn=options,options={});var inputs={},inputTotal=Object.keys(this.images),inputTotalLen=inputTotal.length,done=function(){var json={input:inputs,output:_this.outputs.map(function(output){return output.export()})};_this.callback&&(json.callback={url:_this.callback}),px.sendToServer("post","/users/:userId/jobs",json,function(res){px.once("job.done."+res.id,function(){px.get(res.id,function(job){var r=new Result(job.processed);d.resolve(r),fn&&fn.call(_this,null,r)})})},function(){d.reject("Error sending to server"),fn&&fn.call(_this,"Error sending to server")})};return inputTotal.forEach(function(index){px.parseInput(this.images[index],function(data){inputs[index]=data,--inputTotalLen||done()})},this),d.promise};var px=function(input){if(!px.userData)throw"6px: You must call init!";return new _6px(input)};px.init=function(data){var d=new Defer;if(px.userData)throw"6px: Init must only be called once!";if(px.debug=!!data.debug||!1,px.dryRun=!!data.dryRun||!1,!data.apiKey)throw"6px: apiKey is required!";if(!data.userId)throw"6px: userId is required!";px.userData=data;var success=function(res){px.openSocket(d),px.log(res),px.on("job.update",function(e,jobId,status){"complete"==status&&px.trigger("job.done."+jobId)})},failed=function(res){px.log("failed:",res),px.trigger("error","")};return px.sendToServer("post","/users/:userId/auth",null,success,failed),d.promise},px.openSocket=function(d){var host="http:"==document.location.protocol?"ws://socks.6px.io":"wss://socks.6px.io",socket=new WebSocket(host);socket.onopen=function(){px.sendSocketMsg(socket,{auth:{user_id:px.userData.userId}})},setInterval(function(){socket.send(JSON.stringify({ping:!0}))},3e4),socket.onclose=function(){setTimeout(function(){px.openSocket()},1e3)},socket.onmessage=function(msg){px.handleIncoming(msg,d)}},px.sendSocketMsg=function(socket,obj){socket.send(JSON.stringify(obj))},px.handleIncoming=function(msg,d){var data=JSON.parse(msg.data);data.auth&&data.auth===!0&&(px.trigger("connection"),d.resolve()),data.job_id&&data.status&&px.trigger("job.update",data.job_id,data.status)},px.on=function(name,fn){window.addEventListener(name,function(e){var args=[e];e.detail&&Object.keys(e.detail).forEach(function(index){args.push(e.detail[index])},this),fn.apply(null,args)},!1)},px.once=function(name,fn){var listener=function(e){var args=[e];e.detail&&Object.keys(e.detail).forEach(function(index){args.push(e.detail[index])},this),fn.apply(null,args),window.removeEventListener(name,listener,!1)};window.addEventListener(name,listener,!1)},px.trigger=function(name){var options=Array.prototype.slice.call(arguments,1);"error"==name&&px.log(options[0],!0),window.dispatchEvent(new CustomEvent(name,{detail:options}))},px.dropZone=function(input,options){var elm;if(elm="string"==typeof input?document.querySelector(input):input,!elm)return px.trigger("error","Element is not defined"),!1;var wrapCallbacks=function(e,cb){return e.preventDefault(),cb&&cb(e),!1},dragOver=function(e){return wrapCallbacks(e,options.onDragOver)},dragEnd=function(e){return wrapCallbacks(e,options.onDragEnd)},dropped=function(e){return wrapCallbacks(e,options.onDrop)};elm.ondragover=dragOver,elm.ondragend=function(){return dragEnd},elm.ondrop=dropped},px.parseInput=function(input,fn){if("string"==typeof input)return void fn.call(null,input);if(input instanceof Image)return void fn.call(null,input.src);if(1===input.nodeType&&"img"==input.tagName.toLowerCase())return void fn.call(null,input.src);if(void 0===window.FormData)throw"6px: FileAPI not supported with your browser.";var f=input.files[0],dataUrlReader=new FileReader;dataUrlReader.onloadend=function(){fn.call(null,this.result)},dataUrlReader.readAsDataURL(f)},px.sendToServer=function(method,path,json,success,failed){var user=px.userData;path=path.replace(":userId",user.userId);var url="https://api.6px.io/v1"+path+(/\?/.test(url)?"&":"?")+"key="+user.apiKey,xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){return xhr.readyState<4?void 0:200!==xhr.status?failed.call(window,JSON.parse(xhr.responseText)):void(4===xhr.readyState&&success.call(null,JSON.parse(xhr.responseText)))},xhr.open(method.toUpperCase(),url,!0),json?(xhr.setRequestHeader("Content-Type","application/json"),xhr.send(JSON.stringify(json))):xhr.send()},px.log=function(msg,err){px.debug&&console&&console.log&&(err?console.error("6px:",msg):console.log("6px:",msg))},px.get=function(jobId,cb,binding){px.sendToServer("get","/users/:userId/jobs/"+jobId,!1,function(res){cb.call(binding||window,res)},function(res){cb.call(binding||window,res)})},px.mergeObject=function(obj1,obj2){var obj3={};return Object.keys(obj1).forEach(function(index){obj3[index]=obj1[index]}),Object.keys(obj2).forEach(function(index){obj3[index]=obj2[index]}),obj3},px.version=version,window.px=px}();