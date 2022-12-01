!function(factory){"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof exports?module.exports=factory(require("jquery")):factory(jQuery)}((function($){function create(){return $($.map(arguments,$.proxy(document,"createElement")))}var Checkboxpicker=function(){function Checkboxpicker(element,options){this.element=element,this.$element=$(element);var data=this.$element.data();""===data.reverse&&(data.reverse=!0),""===data.switchAlways&&(data.switchAlways=!0),""===data.html&&(data.html=!0),this.options=$.extend({},$.fn.checkboxpicker.defaults,options,data),this.$element.closest("label").length?console.warn(this.options.warningMessage):(this.$group=$(document.createElement("div")),this.$buttons=create("button","button").attr("type","button").attr("tabindex",-1),this.$off=this.$buttons.eq(this.options.reverse?1:0),this.$on=this.$buttons.eq(this.options.reverse?0:1),this.init())}var _proto=Checkboxpicker.prototype;return _proto.init=function(){var fn=this.options.html?"html":"text";this.element.hidden=!0,this.$group.addClass(this.options.baseGroupCls).addClass(this.options.groupCls),this.$buttons.addClass(this.options.baseCls).addClass(this.options.cls),this.options.offLabel&&this.$off[fn](this.options.offLabel),this.options.onLabel&&this.$on[fn](this.options.onLabel),this.options.offIconCls&&(this.options.offLabel&&this.$off.prepend("&nbsp;"),create("span").addClass(this.options.iconCls).addClass(this.options.offIconCls).prependTo(this.$off)),this.options.onIconCls&&(this.options.onLabel&&this.$on.prepend("&nbsp;"),create("span").addClass(this.options.iconCls).addClass(this.options.onIconCls).prependTo(this.$on)),this.element.checked?(this.$on.addClass("active"),this.$on.addClass(this.options.onActiveCls),this.$off.addClass(this.options.offCls)):(this.$off.addClass("active"),this.$off.addClass(this.options.offActiveCls),this.$on.addClass(this.options.onCls)),this.element.title?this.$group.attr("title",this.element.title):(this.options.offTitle&&this.$off.attr("title",this.options.offTitle),this.options.onTitle&&this.$on.attr("title",this.options.onTitle)),this.$group.on("keydown",$.proxy(this,"keydown")),this.$buttons.on("click",$.proxy(this,"click")),this.$element.on("change",$.proxy(this,"toggleChecked")),$(this.element.labels).on("click",$.proxy(this,"focus")),$(this.element.form).on("reset",$.proxy(this,"reset")),this.$group.append(this.$buttons).insertAfter(this.element),this.element.readOnly||this.element.disabled?this.$buttons.prop("disabled",!0):(this.$group.attr("tabindex",this.element.tabIndex),this.element.autofocus&&this.focus())},_proto.toggleChecked=function(){this.$buttons.toggleClass("active"),this.$off.toggleClass(this.options.offCls),this.$off.toggleClass(this.options.offActiveCls),this.$on.toggleClass(this.options.onCls),this.$on.toggleClass(this.options.onActiveCls)},_proto.toggleDisabled=function(){this.$buttons.toggleClass("disabled"),this.element.disabled?this.$group.attr("tabindex",this.element.tabIndex):this.$group.removeAttr("tabindex")},_proto.focus=function(){this.$group.trigger("focus")},_proto.click=function(event){$(event.currentTarget).hasClass("active")&&!this.options.switchAlways||this.change()},_proto.change=function(){this.set(!this.element.checked)},_proto.set=function(value){this.element.checked=value,this.$element.trigger("change")},_proto.keydown=function(event){-1!==$.inArray(event.keyCode,this.options.toggleKeyCodes)?(event.preventDefault(),this.change()):13===event.keyCode&&$(this.element.form).trigger("submit")},_proto.reset=function(){(this.element.defaultChecked&&this.$off.hasClass("active")||!this.element.defaultChecked&&this.$on.hasClass("active"))&&this.set(this.element.defaultChecked)},Checkboxpicker}(),oldPropHooks=$.extend({},$.propHooks);return $.extend($.propHooks,{checked:{set:function(element,value){var data=$.data(element,"bs.checkbox");data&&element.checked!==value&&data.change(value),oldPropHooks.checked&&oldPropHooks.checked.set&&oldPropHooks.checked.set(element,value)}},disabled:{set:function(element,value){var data=$.data(element,"bs.checkbox");data&&element.disabled!==value&&data.toggleDisabled(),oldPropHooks.disabled&&oldPropHooks.disabled.set&&oldPropHooks.disabled.set(element,value)}}}),$.fn.checkboxpicker=function(options,elements){return(this instanceof $?this:$("string"==typeof options?options:elements)).each((function(){var data=$.data(this,"bs.checkbox");data||(data=new Checkboxpicker(this,options),$.data(this,"bs.checkbox",data))}))},$.fn.checkboxpicker.defaults={baseGroupCls:"btn-group",baseCls:"btn",groupCls:null,cls:null,offCls:"btn-default",onCls:"btn-default",offActiveCls:"btn-danger",onActiveCls:"btn-success",offLabel:"No",onLabel:"Yes",offTitle:!1,onTitle:!1,iconCls:"glyphicon",toggleKeyCodes:[13,32],warningMessage:"Please do not use Bootstrap-checkbox element in label element."},Checkboxpicker}));