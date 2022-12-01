"use strict";angular.module("doowb.angular-pusher",[]).provider("PusherService",function(){function createScript($document,callback){var tag=$document.createElement("script");tag.type="text/javascript",tag.async=!0,tag.id=scriptId,tag.src=scriptUrl,tag.onreadystatechange=tag.onload=function(){var state=tag.readyState;callback.done||state&&!/loaded|complete/.test(state)||(callback.done=!0,callback())},$document.getElementsByTagName("head")[0].appendChild(tag)}var scriptUrl="//js.pusher.com/2.2/pusher.min.js",scriptId="pusher-sdk",apiKey="",initOptions={};this.setPusherUrl=function(url){return url&&(scriptUrl=url),this},this.setOptions=function(options){return initOptions=options||initOptions,this},this.setToken=function(token){return apiKey=token||apiKey,this},this.$get=["$document","$timeout","$q","$rootScope","$window","$location","PusherEventsService",function($document,$timeout,$q,$rootScope,$window,$location,PusherEventsService){function onSuccess(){pusher=new $window.Pusher(apiKey,initOptions),pusher.connection.bind("connecting",function(){$rootScope.$broadcast(es.connecting)}).bind("connected",function(){$rootScope.$broadcast(es.connected)}).bind("unavailable",function(){$rootScope.$broadcast(es.unavailable)}).bind("failed",function(){$rootScope.$broadcast(es.failed)}).bind("disconnected",function(){$rootScope.$broadcast(es.disconnected)}).bind("state_change",function(states){$rootScope.$broadcast(es.connected,states)})}var pusher,deferred=$q.defer(),es=PusherEventsService.connection,onScriptLoad=function(){onSuccess(),$timeout(function(){deferred.resolve(pusher)})};return createScript($document[0],onScriptLoad),deferred.promise}]}).factory("Pusher",["$rootScope","$q","PusherService","PusherEventsService",function($rootScope,$q,PusherService,PusherEventsService){return{subscribe:function(channelName,eventName,callback){var channelDeferred=$q.defer();return PusherService.then(function(pusher){var channel=pusher.channel(channelName)||pusher.subscribe(channelName);channel.bind(eventName,function(data){callback&&callback(data),$rootScope.$broadcast(channelName+":"+eventName,data),$rootScope.$digest()}).bind(PusherEventsService.channel.success,function(){$rootScope.$broadcast(PusherEventsService.channel.success)}).bind(PusherEventsService.channel.error,function(status){$rootScope.$broadcast(PusherEventsService.channel.error,status)}),-1!=channelName.indexOf("presence-")&&channel.bind(PusherEventsService.presence.success,function(members){var dataObj={count:members.count,list:[]};members.each(function(member){dataObj.list.push({id:member.id,info:member.info})}),$rootScope.$broadcast(PusherEventsService.presence.success,dataObj)}).bind(PusherEventsService.presence.memberAdded,function(member){$rootScope.$broadcast(PusherEventsService.presence.memberAdded,member)}).bind(PusherEventsService.presence.memberRemoved,function(member){$rootScope.$broadcast(PusherEventsService.presence.memberAdded,member)}),channelDeferred.resolve(channel)}),channelDeferred.promise},unsubscribe:function(channelName){PusherService.then(function(pusher){pusher.channel(channelName)&&pusher.unsubscribe(channelName)})},trigger:function(channelName,eventName,obj){return-1==eventName.indexOf("client-")?"Event name requires 'client-' prefix.":void PusherService.then(function(pusher){var channel=pusher.channel(channelName);return channel.trigger(eventName,obj)})},connectionState:function(){PusherService.then(function(pusher){return pusher.connection.state})},members:function(channelName){return-1==channelName.indexOf("presence-")?"Requires presence channel.":void PusherService.then(function(pusher){var presenceChannel=pusher.channel(channelName),arr=[];return presenceChannel.members.each(function(member){arr.push({id:member.id,info:member.info})}),arr})},membersMe:function(channelName){return-1==channelName.indexOf("presence-")?"Requires presence channel.":void PusherService.then(function(pusher){var presenceChannel=pusher.channel(channelName);return presenceChannel.members.me})},membersGet:function(channelName,memberId){return-1==channelName.indexOf("presence-")?"Requires presence channel.":void PusherService.then(function(pusher){var presenceChannel=pusher.channel(channelName);return presenceChannel.members.get(memberId)})},membersCount:function(channelName){return-1==channelName.indexOf("presence-")?"Requires presence channel.":void PusherService.then(function(pusher){var presenceChannel=pusher.channel(channelName);return presenceChannel.members.count})},disconnect:function(){PusherService.then(function(pusher){return pusher.disconnect()})}}}]).service("PusherEventsService",[function(){return{connection:{connecting:"pusher:connection:connecting",connected:"pusher:connection:connected",unavailable:"pusher:connection:unavailable",failed:"pusher:connection:failed",disconnected:"pusher:connection:disconnected",state_change:"pusher:connection:state_change"},channel:{success:"pusher:subscription_succeeded",error:"pusher:subscription_error"},presence:{success:"pusher:subscription_succeeded",error:"pusher:subscription_error",memberAdded:"pusher:member_added",memberRemoved:"pusher:member_removed"}}}]);