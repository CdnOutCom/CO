!function(a,b){"object"==typeof exports?module.exports=b(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],b):a.Backbone.Obscura=b(a._,a.Backbone)}(this,function(a,b){var c=function(c){return{backbone:b,underscore:a}[c]};return c=function d(a,b,e){function f(h,i){if(!b[h]){if(!a[h]){var j="function"==typeof c&&c;if(!i&&j)return j(h,!0);if(g)return g(h,!0);throw new Error("Cannot find module '"+h+"'")}var k=b[h]={exports:{}};a[h][0].call(k.exports,function(b){var c=a[h][1][b];return f(c?c:b)},k,k.exports,d,a,b,e)}return b[h].exports}for(var g="function"==typeof c&&c,h=0;h<e.length;h++)f(e[h]);return f}({HusaU0:[function(a,b){function k(a,b){this._superset=a,this._filtered=new f(a,b),this._sorted=new g(this._filtered,b),this._paginated=new h(this._sorted,b),i(this._paginated,this),j.call(this,this._filtered,n),j.call(this,this._sorted,p),j.call(this,this._paginated,r)}var d=a("underscore"),e=a("backbone"),f=a("backbone-filtered-collection"),g=a("backbone-sorted-collection"),h=a("backbone-paginated-collection"),i=a("backbone-collection-proxy"),j=a("./src/proxy-events.js"),l={superset:function(){return this._superset},getFilteredLength:function(){return this._filtered.length},removeTransforms:function(){return this._filtered.resetFilters(),this._sorted.removeSort(),this._paginated.removePagination(),this},destroy:function(){this.stopListening(),this._filtered.destroy(),this._sorted.destroy(),this._paginated.destroy(),this.length=0,this.trigger("obscura:destroy")}},m=["filterBy","removeFilter","resetFilters","refilter","hasFilter","getFilters"],n=["filtered:add","filtered:remove","filtered:reset"],o=["setSort","reverseSort","removeSort"],p=["sorted:add","sorted:remove"],q=["setPerPage","setPage","getPerPage","getNumPages","getPage","hasNextPage","hasPrevPage","nextPage","prevPage","movePage","removePagination","firstPage","lastPage"],r=["paginated:change:perPage","paginated:change:page","paginated:change:numPages"];d.each(m,function(a){l[a]=function(){var b=f.prototype[a].apply(this._filtered,arguments);return b===this._filtered?this:b}}),d.each(q,function(a){l[a]=function(){var b=h.prototype[a].apply(this._paginated,arguments);return b===this._paginated?this:b}}),d.each(o,function(a){l[a]=function(){var b=g.prototype[a].apply(this._sorted,arguments);return b===this._sorted?this:b}}),d.extend(k.prototype,l,e.Events),k.FilteredCollection=f,k.SortedCollection=g,k.PaginatedCollection=h,b.exports=k},{"./src/proxy-events.js":9,backbone:!1,"backbone-collection-proxy":3,"backbone-filtered-collection":4,"backbone-paginated-collection":6,"backbone-sorted-collection":7,underscore:!1}],obscura:[function(a,b){b.exports=a("HusaU0")},{}],3:[function(a,b){function h(a,b){function c(){b.length=a.length}function h(c){var e=d.toArray(arguments),f="change"===c||"change:"===c.slice(0,7);"reset"===c&&(b.models=a.models),d.contains(g,c)?(d.contains(["add","remove","destory"],c)?e[2]=b:d.contains(["reset","sort"],c)&&(e[1]=b),b.trigger.apply(this,e)):f&&b.contains(e[1])&&b.trigger.apply(this,e)}var i={};return d.each(d.functions(e.Collection.prototype),function(b){d.contains(f,b)||(i[b]=function(){return a[b].apply(a,arguments)})}),d.extend(b,e.Events,i),b.listenTo(a,"all",c),b.listenTo(a,"all",h),b.models=a.models,c(),b}var d=a("underscore"),e=a("backbone"),f=["_onModelEvent","_prepareModel","_removeReference","_reset","add","initialize","sync","remove","reset","set","push","pop","unshift","shift","sort","parse","fetch","create","model","off","on","listenTo","listenToOnce","bind","trigger","once","stopListening"],g=["add","remove","reset","sort","destroy"];b.exports=h},{backbone:!1,underscore:!1}],4:[function(a,b){function h(){this._filterResultCache={}}function i(a){for(var b in this._filterResultCache)this._filterResultCache.hasOwnProperty(b)&&delete this._filterResultCache[b][a]}function j(a,b){this._filters[a]&&i.call(this,a),this._filters[a]=b,this.trigger("filtered:add",a)}function k(a){delete this._filters[a],i.call(this,a),this.trigger("filtered:remove",a)}function l(a){this._filterResultCache[a.cid]||(this._filterResultCache[a.cid]={});var b=this._filterResultCache[a.cid];for(var c in this._filters)if(this._filters.hasOwnProperty(c)&&(b.hasOwnProperty(c)||(b[c]=this._filters[c].fn(a)),!b[c]))return!1;return!0}function m(){var a=[];this._superset&&(a=this._superset.filter(d.bind(l,this))),this._collection.reset(a),this.length=this._collection.length}function n(a){if(this._filterResultCache[a.cid]={},l.call(this,a)){if(!this._collection.get(a.cid)){for(var b=this.superset().indexOf(a),c=null,d=b-1;d>=0;d-=1)if(this.contains(this.superset().at(d))){c=this.indexOf(this.superset().at(d))+1;break}c=c||0,this._collection.add(a,{at:c})}}else this._collection.get(a.cid)&&this._collection.remove(a);this.length=this._collection.length}function o(a){this._filterResultCache[a.cid]={},l.call(this,a)||this._collection.get(a.cid)&&this._collection.remove(a)}function p(a){"change:"===a.slice(0,7)&&o.call(this,arguments[1])}function q(a){this.contains(a)&&this._collection.remove(a),this.length=this._collection.length}function r(a){this._superset=a,this._collection=new e.Collection(a.toArray()),f(this._collection,this),this.resetFilters(),this.listenTo(this._superset,"reset sort",m),this.listenTo(this._superset,"add change",n),this.listenTo(this._superset,"remove",q),this.listenTo(this._superset,"all",p)}var d=a("underscore"),e=a("backbone"),f=a("backbone-collection-proxy"),g=a("./src/create-filter.js"),s={defaultFilterName:"__default",filterBy:function(a,b){return b||(b=a,a=this.defaultFilterName),j.call(this,a,g(b)),m.call(this),this},removeFilter:function(a){return a||(a=this.defaultFilterName),k.call(this,a),m.call(this),this},resetFilters:function(){return this._filters={},h.call(this),this.trigger("filtered:reset"),m.call(this),this},superset:function(){return this._superset},refilter:function(a){return"object"==typeof a&&a.cid?n.call(this,a):(h.call(this),m.call(this)),this},getFilters:function(){return d.keys(this._filters)},hasFilter:function(a){return d.contains(this.getFilters(),a)},destroy:function(){this.stopListening(),this._collection.reset([]),this._superset=this._collection,this.length=0,this.trigger("filtered:destroy")}};d.extend(r.prototype,s,e.Events),b.exports=r},{"./src/create-filter.js":5,backbone:!1,"backbone-collection-proxy":3,underscore:!1}],5:[function(a,b){function e(a,b){return function(c){return c.get(a)===b}}function f(a,b){return function(c){return b(c.get(a))}}function g(a,b){return d.isArray(b)||(b=null),{fn:a,keys:b}}function h(a){var b=d.keys(a),c=d.map(b,function(b){var c=a[b];return d.isFunction(c)?f(b,c):e(b,c)}),h=function(a){for(var b=0;b<c.length;b++)if(!c[b](a))return!1;return!0};return g(h,b)}function i(a,b){return d.isFunction(a)?g(a,b):d.isObject(a)?h(a):void 0}var d=a("underscore");b.exports=i},{underscore:!1}],6:[function(a,b){function g(){var a=this.getPage()*this.getPerPage(),b=a+this.getPerPage();return[a,b]}function h(){var a=g.call(this);this._collection.reset(this.superset().slice(a[0],a[1]))}function i(){this._totalPages;var b=this.superset().length,c=this.getPerPage(),d=0===b%c?b/c:Math.floor(b/c)+1,e=this._totalPages!==d;return this._totalPages=d,e&&this.trigger("paginated:change:numPages",{numPages:d}),this.getPage()>=d?(this.setPage(d-1),!0):void 0}function j(){i.call(this)||h.call(this)}function k(a,b){for(var c=d.max([a.length,b.length]),e=0,f=0;c>e;e+=1,f+=1)if(a[e]!==b[f])if(b[e-1]===a[e])f-=1;else{if(b[e+1]!==a[e])return a[e];f+=1}}function l(){if(!i.call(this)){var d=g.call(this),e=d[0],f=d[1],h=k(this.superset().slice(e,f),this._collection.toArray()),j=k(this._collection.toArray(),this.superset().slice(e,f));j&&this._collection.remove(j),h&&this._collection.add(h,{at:this.superset().indexOf(h)-e})}}function m(a,b){this._superset=a,this._collection=new e.Collection(a.toArray()),this._page=0,this.setPerPage(b&&b.perPage?b.perPage:null),f(this._collection,this),this.listenTo(this._superset,"add remove",l),this.listenTo(this._superset,"reset sort",j)}var d=a("underscore"),e=a("backbone"),f=a("backbone-collection-proxy"),n={removePagination:function(){return this.setPerPage(null),this},setPerPage:function(a){return this._perPage=a,j.call(this),this.setPage(0),this.trigger("paginated:change:perPage",{perPage:a,numPages:this.getNumPages()}),this},setPage:function(a){var b=0,c=this.getNumPages()-1;return a=a>b?a:b,a=c>a?a:c,a=0>a?0:a,this._page=a,h.call(this),this.trigger("paginated:change:page",{page:a}),this},getPerPage:function(){return this._perPage||this.superset().length||1},getNumPages:function(){return this._totalPages},getPage:function(){return this._page},hasNextPage:function(){return this.getPage()<this.getNumPages()-1},hasPrevPage:function(){return this.getPage()>0},nextPage:function(){return this.movePage(1),this},prevPage:function(){return this.movePage(-1),this},firstPage:function(){this.setPage(0)},lastPage:function(){this.setPage(this.getNumPages()-1)},movePage:function(a){return this.setPage(this.getPage()+a),this},superset:function(){return this._superset},destroy:function(){this.stopListening(),this._collection.reset([]),this._superset=this._collection,this._page=0,this._totalPages=0,this.length=0,this.trigger("paginated:destroy")}};d.extend(m.prototype,n,e.Events),b.exports=m},{backbone:!1,"backbone-collection-proxy":3,underscore:!1}],7:[function(a,b){function h(a){return d.isFunction(a)?a:function(b){return b.get(a)}}function i(a){return this._comparator?this._reverse?g(this._collection.toArray(),a,h(this._comparator)):d.sortedIndex(this._collection.toArray(),a,h(this._comparator)):this._superset.indexOf(a)}function j(a){var b=i.call(this,a);this._collection.add(a,{at:b})}function k(a){this.contains(a)&&this._collection.remove(a)}function l(a){this.contains(a)&&this._collection.indexOf(a)!==i.call(this,a)&&(this._collection.remove(a),j.call(this,a))}function m(){if(!this._comparator)return this._collection.reset(this._superset.toArray()),void 0;var a=this._superset.sortBy(this._comparator);this._collection.reset(this._reverse?a.reverse():a)}function n(a){this._superset=a,this._reverse=!1,this._comparator=null,this._collection=new e.Collection(a.toArray()),f(this._collection,this),this.listenTo(this._superset,"add",j),this.listenTo(this._superset,"remove",k),this.listenTo(this._superset,"change",l),this.listenTo(this._superset,"reset",m)}var d=a("underscore"),e=a("backbone"),f=a("backbone-collection-proxy"),g=a("./src/reverse-sorted-index.js"),o={setSort:function(a,b){return this._reverse="desc"===b?!0:!1,this._comparator=a,m.call(this),a?this.trigger("sorted:add"):this.trigger("sorted:remove"),this},reverseSort:function(){return this._reverse=!this._reverse,m.call(this),this},removeSort:function(){return this.setSort(),this},superset:function(){return this._superset},destroy:function(){this.stopListening(),this._collection.reset([]),this._superset=this._collection,this.length=0,this.trigger("sorted:destroy")}};d.extend(n.prototype,o,e.Events),b.exports=n},{"./src/reverse-sorted-index.js":8,backbone:!1,"backbone-collection-proxy":3,underscore:!1}],8:[function(a,b){function e(a){return d.isFunction(a)?a:function(b){return b[a]}}function f(a,b,c,f){c=null==c?d.identity:e(c);for(var g=c.call(f,b),h=0,i=a.length;i>h;){var j=h+i>>>1;c.call(f,a[j])<g?i=j:h=j+1}return h}var d=a("underscore");b.exports=f},{underscore:!1}],9:[function(a,b){function e(a,b){d.each(b,function(b){this.listenTo(a,b,function(){var a=d.toArray(arguments);a.unshift(b),this.trigger.apply(this,a)})},this)}var d=a("underscore");b.exports=e},{underscore:!1}]},{},[]),c("obscura")});