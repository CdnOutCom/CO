(function(window,factory){"use strict";if(typeof define==="function"&&define.amd){define(["backbone","underscore","jquery"],function(){return factory.apply(window,arguments)})}else if(typeof exports==="object"){var Backbone=require("backbone");var _=require("underscore");Backbone.$=Backbone.$||require("jquery");module.exports=factory.call(window,Backbone,_,Backbone.$)}else{factory.call(window,window.Backbone,window._,window.Backbone.$)}})(typeof global==="object"?global:this,function(Backbone,_,$){"use strict";var window=this;var ViewConstructor=Backbone.View;var aPush=Array.prototype.push;var aConcat=Array.prototype.concat;var aSplice=Array.prototype.splice;var trim=String.prototype.trim?_.bind(String.prototype.trim.call,String.prototype.trim):$.trim;var LayoutManager=Backbone.View.extend({_render:function(){var view=this;var manager=view.__manager__;var beforeRender=view.beforeRender;var def=view.deferred();if(view.hasRendered){view._removeViews()}manager.callback=function(){delete manager.isAsync;delete manager.callback;view.trigger("beforeRender",view);view._viewRender(manager).render().promise().then(function(){def.resolve()})};if(beforeRender){var ret=beforeRender.call(view,view);if(ret&&ret.then){manager.isAsync=true;ret.then(function(){manager.callback();def.resolve()},def.resolve)}if(ret===false){return def.resolve()}}if(!manager.isAsync){manager.callback()}return def.promise()},_applyTemplate:function(rendered,manager,def){if(_.isString(rendered)){if(manager.noel){rendered=$.parseHTML(rendered,true);this.$el.slice(1).remove();this.$el.replaceWith(rendered);this.setElement(rendered,false)}else{this.html(this.$el,rendered)}}def.resolveWith(this,[this])},_viewRender:function(manager){var url,contents,def;var root=this;function done(context,template){var rendered;manager.callback=function(rendered){delete manager.isAsync;delete manager.callback;root._applyTemplate(rendered,manager,def)};LayoutManager.cache(url,template);if(template){rendered=root.renderTemplate.call(root,template,context)}if(!manager.isAsync){root._applyTemplate(rendered,manager,def)}}return{render:function(){var context=root.serialize;var template=root.template;def=root.deferred();if(_.isFunction(context)){context=context.call(root)}manager.callback=function(contents){delete manager.isAsync;delete manager.callback;done(context,contents)};if(typeof template==="string"){url=root.prefix+template}if(contents=LayoutManager.cache(url)){done(context,contents,url);return def}if(typeof template==="string"){contents=root.fetchTemplate.call(root,root.prefix+template)}else if(typeof template==="function"){contents=template}else if(template!=null){contents=root.fetchTemplate.call(root,template)}if(!manager.isAsync){done(context,contents)}return def}}},constructor:function Layout(options){this.manage=true;_.extend(this,options);Backbone.View.apply(this,arguments)},async:function(){var manager=this.__manager__;manager.isAsync=true;return manager.callback},promise:function(){return this.__manager__.renderDeferred.promise()},renderViews:function(views){var root=this;var manager=root.__manager__;var newDeferred=root.deferred();if(views&&_.isArray(views)){views=_.chain(views)}else{views=root.getViews(views)}var promises=views.map(function(view){return view.render().__manager__.renderDeferred}).value();manager.renderDeferred=newDeferred.promise();root.when(promises).then(function(){newDeferred.resolveWith(root,[root])});return root},insertView:function(selector,view){if(view){return this.setView(selector,view,true)}return this.setView(selector,true)},insertViews:function(views){if(_.isArray(views)){return this.setViews({"":views})}_.each(views,function(view,selector){views[selector]=_.isArray(view)?view:[view]});return this.setViews(views)},getView:function(fn){if(fn==null){fn=arguments[1]}return this.getViews(fn).first().value()},getViews:function(fn){var views;if(typeof fn==="string"){fn=this.sections[fn]||fn;views=this.views[fn]||[];return _.chain([].concat(views))}views=_.chain(this.views).map(function(view){return _.isArray(view)?view:[view]},this).flatten();if(typeof fn==="object"){return views.where(fn)}return typeof fn==="function"?views.filter(fn):views},removeView:function(fn){var views;views=this.getViews(fn).each(function(nestedView){nestedView.remove()});views.value();return views},setView:function(name,view,insert){var manager,selector;var root=this;if(typeof name!=="string"){insert=view;view=name;name=""}manager=view.__manager__;if(!manager){throw new Error("The argument associated with selector '"+name+"' is defined and a View.  Set `manage` property to true for "+"Backbone.View instances.")}manager.parent=root;selector=manager.selector=root.sections[name]||name;if(!insert){if(root.getView(name)!==view){root.removeView(name)}return root.views[selector]=view}root.views[selector]=aConcat.call([],root.views[name]||[],view);root.__manager__.insert=true;return view},setViews:function(views){_.each(views,function(view,name){if(_.isArray(view)){return _.each(view,function(view){this.insertView(name,view)},this)}this.setView(name,view)},this);return this},render:function(){var root=this;var manager=root.__manager__;var parent=manager.parent;var rentManager=parent&&parent.__manager__;var def=root.deferred();function resolve(){_.each(root.views,function(views,selector){if(_.isArray(views)){root.htmlBatch(root,views,selector)}});if(parent&&!manager.insertedViaFragment){if(!root.contains(parent.el,root.el)){parent.partial(parent.$el,root.$el,rentManager,manager)}}root.delegateEvents();root.hasRendered=true;manager.renderInProgress=false;delete manager.triggeredByRAF;if(manager.queue&&manager.queue.length){manager.queue.shift()()}else{delete manager.queue}function completeRender(){var console=window.console;var afterRender=root.afterRender;if(afterRender){afterRender.call(root,root)}root.trigger("afterRender",root);if(manager.noel&&root.$el.length>1){if(_.isFunction(console.warn)&&!root.suppressWarnings){console.warn("`el: false` with multiple top level elements is "+"not supported.");if(_.isFunction(console.trace)){console.trace()}}}}if(rentManager&&(rentManager.renderInProgress||rentManager.queue)){parent.once("afterRender",completeRender)}else{completeRender()}return def.resolveWith(root,[root])}function actuallyRender(){root._render().done(function(){if(!_.keys(root.views).length){return resolve()}var promises=_.map(root.views,function(view){var insert=_.isArray(view);if(insert&&view.length){return root.when(_.map(view,function(subView){subView.__manager__.insertedViaFragment=true;return subView.render().__manager__.renderDeferred}))}return!insert?view.render().__manager__.renderDeferred:view});root.when(promises).done(resolve)})}manager.renderInProgress=true;root._registerWithRAF(actuallyRender,def);manager.renderDeferred=def;return root},remove:function(){LayoutManager._removeView(this,true);return this._remove.apply(this,arguments)},_registerWithRAF:function(callback,deferred){var root=this;var manager=root.__manager__;var rentManager=manager.parent&&manager.parent.__manager__;if(this.useRAF===false){if(manager.queue){aPush.call(manager.queue,callback)}else{manager.queue=[];callback()}return}manager.deferreds=manager.deferreds||[];manager.deferreds.push(deferred);deferred.done(resolveDeferreds);this._cancelQueuedRAFRender();if(rentManager&&rentManager.triggeredByRAF){return finish()}manager.rafID=root.requestAnimationFrame(finish);function finish(){manager.rafID=null;manager.triggeredByRAF=true;callback()}function resolveDeferreds(){for(var i=0;i<manager.deferreds.length;i++){manager.deferreds[i].resolveWith(root,[root])}manager.deferreds=[]}},_cancelQueuedRAFRender:function(){var root=this;var manager=root.__manager__;if(manager.rafID!=null){root.cancelAnimationFrame(manager.rafID)}}},{_cache:{},_removeViews:function(root,force){if(typeof root==="boolean"){force=root;root=this}root=root||this;root.getViews().each(function(view){if(view.hasRendered||force){LayoutManager._removeView(view,force)}}).value()},_removeView:function(view,force){var parentViews;var manager=view.__manager__;var rentManager=manager.parent&&manager.parent.__manager__;var keep=typeof view.keep==="boolean"?view.keep:view.options.keep;if(!keep&&rentManager&&rentManager.insert===true||force){LayoutManager.cleanViews(view);view._removeViews(true);view.$el.remove();view._cancelQueuedRAFRender();if(!manager.parent){return}parentViews=manager.parent.views[manager.selector];if(_.isArray(parentViews)){_.each(_.clone(parentViews),function(view,i){if(view&&view.__manager__===manager){aSplice.call(parentViews,i,1)}});if(_.isEmpty(parentViews)){manager.parent.trigger("empty",manager.selector)}return}delete manager.parent.views[manager.selector];manager.parent.trigger("empty",manager.selector)}},cache:function(path,contents){if(path in this._cache&&contents==null){return this._cache[path]}else if(path!=null&&contents!=null){return this._cache[path]=contents}},cleanViews:function(views){_.each(aConcat.call([],views),function(view){view.trigger("cleanup",view);view.unbind();if(view.model instanceof Backbone.Model){view.model.off(null,null,view)}if(view.collection instanceof Backbone.Collection){view.collection.off(null,null,view)}view.stopListening();if(_.isFunction(view.cleanup)){view.cleanup()}})},configure:function(options){_.extend(LayoutManager.prototype,options);if(options.manage){Backbone.View.prototype.manage=true}if(options.el===false){Backbone.View.prototype.el=false}if(options.suppressWarnings===true){Backbone.View.prototype.suppressWarnings=true}if(options.useRAF===false){Backbone.View.prototype.useRAF=false}if(options._){_=options._}},setupView:function(views,options){options=_.extend({},options);_.each(aConcat.call([],views),function(view){if(view.__manager__){return}var views,declaredViews;var proto=LayoutManager.prototype;_.defaults(view,{views:{},sections:{},__manager__:{},_removeViews:LayoutManager._removeViews,_removeView:LayoutManager._removeView},LayoutManager.prototype);view.options=options;_.extend(view,options);view._remove=Backbone.View.prototype.remove;view.render=LayoutManager.prototype.render;if(view.remove!==proto.remove){view._remove=view.remove;view.remove=proto.remove}views=options.views||view.views;if(_.keys(views).length){declaredViews=views;view.views={};_.each(declaredViews,function(declaredView,key){if(typeof declaredView==="function"){declaredViews[key]=declaredView.call(view,view)}});view.setViews(declaredViews)}})}});LayoutManager.VERSION="0.10.0";Backbone.Layout=LayoutManager;Backbone.View.prototype.constructor=function(options){var noel;options=options||{};if("el"in options?options.el===false:this.el===false){noel=true}if(options.manage||this.manage){LayoutManager.setupView(this,options)}if(this.__manager__){this.__manager__.noel=noel;this.__manager__.suppressWarnings=options.suppressWarnings}ViewConstructor.apply(this,arguments)};Backbone.View=Backbone.View.prototype.constructor;Backbone.View.extend=ViewConstructor.extend;Backbone.View.prototype=ViewConstructor.prototype;var defaultOptions={prefix:"",useRAF:true,deferred:function(){return $.Deferred()},fetchTemplate:function(path){return _.template($(path).html())},renderTemplate:function(template,context){return trim(template.call(this,context))},serialize:function(){return this.model?_.clone(this.model.attributes):{}},partial:function($root,$el,rentManager,manager){var $filtered;if(manager.selector){if(rentManager.noel){$filtered=$root.filter(manager.selector);$root=$filtered.length?$filtered:$root.find(manager.selector)}else{$root=$root.find(manager.selector)}}if(rentManager.insert){this.insert($root,$el)}else{this.html($root,$el)}},html:function($root,content){$root.empty().append(content)},htmlBatch:function(rootView,subViews,selector){var rentManager=rootView.__manager__;var manager={selector:selector};var els=_.reduce(subViews,function(memo,sub){var keep=typeof sub.keep==="boolean"?sub.keep:sub.options.keep;var exists=keep&&$.contains(rootView.el,sub.el);if(sub.el&&!exists){memo.push(sub.el)}return memo},[]);return this.partial(rootView.$el,$(els),rentManager,manager)},insert:function($root,$el){$root.append($el)},when:function(promises){return $.when.apply(null,promises)},contains:function(parent,child){return $.contains(parent,child)},requestAnimationFrame:function(){var lastTime=0;var vendors=["ms","moz","webkit","o"];var requestAnimationFrame=window.requestAnimationFrame;for(var i=0;i<vendors.length&&!window.requestAnimationFrame;++i){requestAnimationFrame=window[vendors[i]+"RequestAnimationFrame"]}if(!requestAnimationFrame){requestAnimationFrame=function(callback){var currTime=(new Date).getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id}}return _.bind(requestAnimationFrame,window)}(),cancelAnimationFrame:function(){var vendors=["ms","moz","webkit","o"];var cancelAnimationFrame=window.cancelAnimationFrame;for(var i=0;i<vendors.length&&!window.cancelAnimationFrame;++i){cancelAnimationFrame=window[vendors[i]+"CancelAnimationFrame"]||window[vendors[i]+"CancelRequestAnimationFrame"]}if(!cancelAnimationFrame){cancelAnimationFrame=function(id){clearTimeout(id)}}return _.bind(cancelAnimationFrame,window)}()};_.extend(LayoutManager.prototype,defaultOptions);return LayoutManager});