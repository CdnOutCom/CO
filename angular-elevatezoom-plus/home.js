!function(){"use strict";function e(l){return{restrict:"A",scope:{ezpModel:"=",ezpOptions:"=",onComplete:"=ezpOnComplete",onDestroy:"=ezpOnDestroy",onImageClick:"=ezpOnImageClick",onImageSwap:"=ezpOnImageSwap",onImageSwapComplete:"=ezpOnImageSwapComplete",onShow:"=ezpOnShow",onZoomedImageLoaded:"=ezpOnZoomedImageLoaded"},link:e};function e(r,d,e){var u,a=!1,t=null,i={},g={onComplete:function(){r.onComplete&&r.onComplete()&&r.onComplete()()},onDestroy:function(){r.onDestroy&&r.onDestroy()&&r.onDestroy()()},onImageClick:function(){r.onImageClick&&r.onImageClick()&&r.onImageClick()()},onImageSwap:function(){r.onImageSwap&&r.onImageSwap()&&r.onImageSwap()()},onImageSwapComplete:function(){r.onImageSwapComplete&&r.onImageSwapComplete()&&r.onImageSwapComplete()()},onShow:function(){r.onShow&&r.onShow()&&r.onShow()()},onZoomedImageLoaded:function(){r.onZoomedImageLoaded&&r.onZoomedImageLoaded()&&r.onZoomedImageLoaded()()}};function c(e,o){var n=angular.element(e).ezPlus(o);return(t=n&&0<n.length?s(n[0]):null)&&(i[t.options.zoomId]=!0),t}function s(e){return angular.element(e||d).data("ezPlus")}function z(){var e=s();e&&e.showHideZoomContainer("hide")}function w(){var e=s();e&&e.showHideZoomContainer("show")}r.ezpOptions&&angular.extend(g,r.ezpOptions),g.appendto&&(g.zoomContainerAppendTo=g.appendto),g.loader&&(u=g.loader),r.$on("ezp-hidesAll",function(e,o){z()}),r.$on("ezp-showAll",function(e,o){w()}),r.$on("ezp-disableZoom",function(e,o){var n=s();n&&n.changeState("disable")}),r.$on("ezp-enableZoom",function(e,o){var n=s();n&&n.changeState("enable")}),r.$watch("ezpOptions",function(e,o){if(a){var n=s();n.destroy(),angular.extend(g,r.ezpOptions),n&&c(d,g)}else a=!0},!0),r.$watch("ezpModel",function(e,o){var n=e,a=n&&n.thumb||"",t=n&&n.small||"",i=n&&n.large||"",l=null,m=s();function p(e,o){var n=o;return"thumb"===e.initial?n=a:"small"===e.initial?n=t:"large"===e.initial&&(n=i),n}m&&m.options.enabled?n?(z(),u&&m.swaptheimage(u,u),l=p(g,t),d.data(r.ezpOptions.attrImageZoomSrc||"zoom-image",r.ezpModel.large||""),m.swaptheimage(l,i),w()):m.closeAll():n&&((l=p(g))&&d.attr("src",l),d.data(r.ezpOptions.attrImageZoomSrc||"zoom-image",r.ezpModel.large||""),c(d,g))}),r.$on("$destroy",function(){var e=s();e&&e.destroy();for(var o in i)if(i.hasOwnProperty(o)){var n=(a=o,angular.element(l).find("[uuid="+a+"]"));n.remove()}var a;i={}})}}angular.module("ezplus",[]).directive("ezPlus",e),e.$inject=["$document"]}();