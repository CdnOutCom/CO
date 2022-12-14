angular.module("ui.slider",[]).value("uiSliderConfig",{}).directive("uiSlider",["uiSliderConfig","$timeout",function(e,i){return e=e||{},{require:"ngModel",compile:function(){var a=function(a,n,u,l){function r(e,i){return i?parseFloat(e):parseInt(e,10)}function d(){n.hasClass("ui-slider")&&n.slider("destroy")}var s=angular.copy(a.$eval(u.uiSlider)),t=angular.extend(s||{},e),o={min:null,max:null},v=["min","max","step","lowerBound","upperBound"],p=!angular.isUndefined(u.useDecimals),f=angular.isDefined(t.updateOn)?t.updateOn:"slide",g=function(){angular.isArray(l.$viewValue)&&t.range!==!0&&(console.warn("Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true."),t.range=!0),angular.forEach(v,function(e){angular.isDefined(u[e])&&(t[e]=r(u[e],p))}),n.slider(t),g=angular.noop};angular.forEach(v,function(e){u.$observe(e,function(i){i&&(g(),t[e]=r(i,p),n.slider("option",e,r(i,p)),l.$render())})}),u.$observe("disabled",function(e){g(),n.slider("option","disabled",!!e)}),a.$watch(u.uiSlider,function(e){g(),void 0!==e&&n.slider("option",e)},!0),i(g,0,!0),n.bind(f,function(e,i){var u;if(i.values){var r=i.values.slice();t.lowerBound&&r[0]<t.lowerBound&&(r[0]=Math.max(r[0],t.lowerBound)),t.upperBound&&r[1]>t.upperBound&&(r[1]=Math.min(r[1],t.upperBound)),r[0]===i.values[0]&&r[1]===i.values[1]||(u=!0,i.values=r)}else{var d=i.value;t.lowerBound&&d<t.lowerBound&&(d=Math.max(d,t.lowerBound)),t.upperBound&&d>t.upperBound&&(d=Math.min(d,t.upperBound)),d!==i.value&&(u=!0,i.value=d)}if(l.$setViewValue(i.values||i.value),$(i.handle).find(".ui-slider-tip").text(i.value),a.$apply(),u)return setTimeout(function(){n.slider("value",i.values||i.value)},0),!1}),l.$render=function(){g();var e=t.range===!0?"values":"value";if(t.range===!0||!isNaN(l.$viewValue)||l.$viewValue instanceof Array?t.range&&!angular.isDefined(l.$viewValue)&&(l.$viewValue=[0,0]):l.$viewValue=0,t.range===!0){if(l.$viewValue&&angular.isString(l.$viewValue)&&1===(l.$viewValue.match(/,/g)||[]).length){var i=l.$viewValue.split(",");l.$viewValue=[Number(i[0]),Number(i[1])]}angular.isDefined(t.min)&&t.min>l.$viewValue[0]&&(l.$viewValue[0]=t.min),angular.isDefined(t.max)&&t.max<l.$viewValue[1]&&(l.$viewValue[1]=t.max),l.$viewValue[0]>l.$viewValue[1]&&(o.min>=l.$viewValue[1]&&(l.$viewValue[1]=o.min),o.max<=l.$viewValue[0]&&(l.$viewValue[0]=o.max)),o.min=l.$viewValue[0],o.max=l.$viewValue[1]}n.slider(e,l.$viewValue)},a.$watch(u.ngModel,function(){t.range===!0?(l.$render(),$(n).find(".ui-slider-tip").each(function(e,i){$(i).text(l.$viewValue[e])})):$(n).find(".ui-slider-tip").text(l.$viewValue)},!0),a.$on("$destroy",d),n.one("$destroy",d)},n=function(e,a,n,u){var l=angular.extend({},e.$eval(n.uiSlider)),r=["min","max","step","tick","tip"];if(angular.forEach(r,function(e){angular.isDefined(n[e])&&(l[e]=n[e])}),angular.isDefined(l.tick)&&angular.isDefined(l.step))for(var d=parseInt((parseInt(l.max)-parseInt(l.min))/parseInt(l.step)),s=d;s>=0;s--){var t=s/d*100+"%";$("<div/>").addClass("ui-slider-tick").appendTo(a).css({left:t})}angular.isDefined(l.tip)&&i(function(){var e=a.find(".ui-slider-handle");e&&e.length>1&&u.$viewValue&&angular.isArray(u.$viewValue)?($(e[0]).append('<div class="ui-slider-tip">'+u.$viewValue[0]+"</div>"),$(e[1]).append('<div class="ui-slider-tip">'+u.$viewValue[1]+"</div>")):a.find(".ui-slider-handle").append('<div class="ui-slider-tip">'+u.$viewValue+"</div>")},10)};return{pre:a,post:n}}}}]);
//# sourceMappingURL=slider.min.js.map