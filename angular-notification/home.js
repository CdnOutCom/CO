/*! Angular notification v1.1.1 | (c) 2013 Greg Bergé | License MIT */
function $notificationProvider(){function a(a,c,d){function e(c,d){function f(){d=angular.extend({focusWindowOnClick:!0},b.options||{},d);try{g.baseNotification=new a.Notification(c,d)}catch(e){return}d.delay&&setTimeout(angular.bind(g,g.close),d.delay),d.focusWindowOnClick&&g.$on("click",function(){a.focus()}),g._events.forEach(function(a){g.$on.apply(g,a)}),g._events=[]}if(!a.Notification)return!1;d=d||{};var g=this;return this._events=[],"granted"===a.Notification.permission?f():void("denied"!==a.Notification.permission&&e.requestPermission().then(f))}function f(a,b){return new e(a,b)}return e.prototype.$on=function(a,b){function d(){var a=arguments;c.$apply(function(){b.apply(e,a)})}var e=this;return this.baseNotification?(this.baseNotification.addEventListener(a,d),function(){this.baseNotification.removeListener(event,d)}):this._events.push([a,b])},e.prototype.close=function(){this.baseNotification&&this.baseNotification.close()},e.isSupported=!!a.Notification,e.getPermission=function(){return a.Notification?a.Notification.permission:void 0},e.requestPermission=function(){return d(function(b,c){return a.Notification?void a.Notification.requestPermission(function(c){a.Notification.permission=a.Notification.permission||c,b(a.Notification.permission)}):c()})},f.isSupported=e.isSupported,f.getPermission=e.getPermission,f.requestPermission=e.requestPermission,f}var b=this;this.$get=["$window","$rootScope","$q",a],this.setOptions=function(a){this.options=a}}angular.module("notification",[]).provider("$notification",$notificationProvider);
//# sourceMappingURL=angular-notification.min.js.map