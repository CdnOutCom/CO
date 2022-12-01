/*
 * angular-auto-validate - v1.19.0 - 2015-10-25
 * https://github.com/jonsamwell/angular-auto-validate
 * Copyright (c) 2015 Jon Samwell (http://www.jonsamwell.com)
 */
!function(a,b){"use strict";function c(){var a={},c=!0,d=!0,e=!0,f=function(a){var b;return a&&0!==a.length?(b=a.toLowerCase(),a=!("f"===b||"0"===b||"false"===b)):a=!1,a},g=function(a,b){var c;return void 0!==a&&(c=a.attr(b)||a.attr("data-"+b)),c},h=function(a,b){var c;return void 0!==a&&(c=void 0!==a.attr(b)||void 0!==a.attr("data-"+b)),c},i=function(a,b){return f(g(a,b))},j=function(a){return c&&!i(a,"disable-valid-styling")},k=function(a){return!i(a,"disable-auto-validate")},l=function(a){return d&&!i(a,"disable-invalid-styling")};this.enable=function(a){e=a},this.isEnabled=function(){return e},this.setDefaultElementModifier=function(b){if(void 0===a[b])throw new Error("Element modifier not registered: "+b);this.defaultElementModifier=b},this.registerDomModifier=function(b,c){a[b]=c},this.setErrorMessageResolver=function(a){this.errorMessageResolver=a},this.getErrorMessage=function(a,c){var d;if(void 0===this.errorMessageResolver)throw new Error("Please set an error message resolver via the setErrorMessageResolver function before attempting to resolve an error message.");return h(c,"disable-validation-message")?(d=b.injector(["ng"]).get("$q").defer(),d.resolve(""),d.promise):this.errorMessageResolver(a,c)},this.setValidElementStyling=function(a){c=a},this.setInvalidElementStyling=function(a){d=a},this.getDomModifier=function(b){var c=(void 0!==b?b.attr("element-modifier"):this.defaultElementModifier)||(void 0!==b?b.attr("data-element-modifier"):this.defaultElementModifier)||this.defaultElementModifier;if(void 0===c)throw new Error("Please set a default dom modifier via the setDefaultElementModifier method on the validator class.");return a[c]},this.makeValid=function(a){k(a)&&(j(a)?this.getDomModifier(a).makeValid(a):this.makeDefault(a))},this.makeInvalid=function(a,b){k(a)&&(l(a)?this.getDomModifier(a).makeInvalid(a,b):this.makeDefault(a))},this.makeDefault=function(a){if(k(a)){var b=this.getDomModifier(a);b.makeDefault&&b.makeDefault(a)}},this.defaultFormValidationOptions={forceValidation:!1,disabled:!1,validateNonVisibleControls:!1,removeExternalValidationErrorsOnSubmit:!0,validateOnFormSubmit:!1},this.$get=[function(){return this}]}function d(a){var c=function(a){b.forEach(a.find("span"),function(a){a=b.element(a),(a.hasClass("error-msg")||a.hasClass("form-control-feedback")||a.hasClass("control-feedback"))&&a.remove()}),a.removeClass("has-success has-error has-feedback")},d=function(a,b){for(var c,d=a,e=0;10>=e;e+=1){if(void 0!==d&&d.hasClass(b)){c=d;break}void 0!==d&&(d=d.parent())}return c},e=function(a,c){for(var d,f=0;f<a.children.length&&(d=a.children[f],void 0===d||!b.element(d).hasClass(c))&&!(void 0!==d.children&&(d=e(d,c),d.length>0));f+=1);return b.element(d)},f=function(a){return d(a,"form-group")},g=function(a){return e(a,"input-group")},h=function(a,b){a[0].parentNode.insertBefore(b[0],a[0].nextSibling)},i=!1,j=function(a){i=a},k=function(d){var e,j=f(d);if(j){if(c(j),e=g(j[0]),j.addClass("has-success "+(e.length>0||i===!1?"":"has-feedback")),i){var k='<span class="glyphicon glyphicon-ok form-control-feedback"></span>';e.length>0&&(k=k.replace("form-",""),k='<span class="input-group-addon control-feedback">'+k+"</span"),h(d,b.element(k))}}else a.error("Angular-auto-validate: invalid bs3 form structure elements must be wrapped by a form-group class")},l=function(d,e){var j,k=f(d),l=b.element('<span class="help-block has-error error-msg">'+e+"</span>");if(k){if(c(k),j=g(k[0]),k.addClass("has-error "+(j.length>0||i===!1?"":"has-feedback")),h(j.length>0?j:m(d),l),i){var n='<span class="glyphicon glyphicon-remove form-control-feedback"></span>';j.length>0&&(n=n.replace("form-",""),n='<span class="input-group-addon control-feedback">'+n+"</span"),h(m(d),b.element(n))}}else a.error("Angular-auto-validate: invalid bs3 form structure elements must be wrapped by a form-group class")},m=function(a){var b=a,c=a[0].type?a[0].type.toLowerCase():"";return"checkbox"!==c&&"radio"!==c||"label"!==a.parent()[0].nodeName.toLowerCase()||(b=a.parent()),b},n=function(b){var d=f(b);d?c(d):a.error("Angular-auto-validate: invalid bs3 form structure elements must be wrapped by a form-group class")};return{makeValid:k,makeInvalid:l,makeDefault:n,enableValidationStateIcons:j,key:"bs3"}}function e(a){var c=function(c,d,e){d=b.isUndefined(d)?0:d,e=b.isUndefined(e)?!0:e;var f=0;return function(){var b=this,g=arguments;f+=1;var h=function(a){return function(){return a===f?c.apply(b,g):void 0}}(f);return a(h,d,e)}};return{debounce:c}}function f(a,c){var d,e="default",f="js/angular-auto-validate/dist/lang",g=function(a){return d=c.get("{0}/jcs-auto-validate_{1}.json".format(f,a.toLowerCase()))},h=function(a){f=a},i=function(c,f){var h=a.defer();return f=f||g,e=c.toLowerCase(),void 0===b.autoValidate.errorMessages[e]?(d=f(c),d.then(function(a){d=void 0,b.autoValidate.errorMessages[e]=a.data,h.resolve(b.autoValidate.errorMessages[e])},function(a){b.autoValidate.errorMessages[e]={defaultMsg:"Loading culture failed!"},d=null,h.reject(a)})):h.resolve(b.autoValidate.errorMessages[e]),h.promise},j=function(c){var f=a.defer();return c=void 0===c?e:c.toLowerCase(),void 0!==d?d.then(function(){f.resolve(b.autoValidate.errorMessages[c])},function(a){f.reject(a)}):f.resolve(b.autoValidate.errorMessages[c]),f.promise},k=function(a,b){var c;return b&&(a+="-err-type",c=b.attr("ng-"+a),void 0===c&&(c=b.attr("data-ng-"+a)||b.attr(a)),c&&(c=c.replace(/[\W]/g,""))),c},l=function(c,f){var g,h,i,j=a.defer(),m=[];if(void 0!==d)d.then(function(){l(c,f).then(function(a){j.resolve(a)})});else{if(g=b.autoValidate.errorMessages[e][c],i=k(c,f),i&&(g=b.autoValidate.errorMessages[e][i]),void 0===g&&void 0!==i?g=b.autoValidate.errorMessages[e].defaultMsg.format(i):void 0===g&&(g=b.autoValidate.errorMessages[e].defaultMsg.format(c)),f&&f.attr)try{h=f.attr("ng-"+c),void 0===h&&(h=f.attr("data-ng-"+c)||f.attr(c)),m.push(h||""),g=g.format(m)}catch(n){}j.resolve(g)}return j.promise};return{setI18nFileRootPath:h,setCulture:i,getErrorMessages:j,resolve:l}}function g(){var a=function(a,c){b.forEach(a.find("small"),function(a){b.element(a).hasClass("error")&&b.element(a).remove()}),c.removeClass("error")},c=function(a){for(var b=a,c=0;3>=c&&(void 0===b||!b.hasClass("columns")&&!b.hasClass("column"));c+=1)void 0!==b&&(b=b.parent());return b},d=function(b){var d=c(b);a(d&&d.length>0?d:b,b)},e=function(d,e){var f,g=c(d);a(g||d,d),d.addClass("error"),g&&(f=b.element('<small class="error">'+e+"</small>"),g.append(f))},f=function(a){d(a)};return{makeValid:d,makeInvalid:e,makeDefault:f,key:"foundation5"}}function h(){var a=function(a){return a[0].offsetWidth>0&&a[0].offsetHeight>0};return{isElementVisible:a}}function i(a,c){var d=["input","textarea","select","form"],e=function(a){return c.isElementVisible(a)},f=function(c){var d,e=b.element(c).controller("form");return d=void 0!==e&&null!==e?e.autoValidateFormOptions:a.defaultFormValidationOptions},g=function(a,b,c){var f,g,h,i=a&&a.length>0,j=i&&"#comment"===a[0].nodeName.toLowerCase();return i&&j===!1&&(f=e(a)||b.validateNonVisibleControls,g=d.indexOf(a[0].nodeName.toLowerCase())>-1||a[0].hasAttribute("register-custom-form-control"),h=b.validateOnFormSubmit===!1||b.validateOnFormSubmit===!0&&c===!0),i&&!j&&f&&g&&h},h=function(c,d,e){var h,i=!0,j=e||f(d),k=c.$pristine===!1||j.forceValidation,l=function(a){var c,d=!0;return b.forEach(a,function(a,b){d&&a&&(d=!1,c=b)}),c};return j.disabled===!1&&(j.forceValidation||g(d,j,j.getFormController().$submitted)&&c&&k)&&(i=!c.$invalid,j.removeExternalValidationErrorsOnSubmit&&c.removeAllExternalValidation&&c.removeAllExternalValidation(),i?a.makeValid(d):(h=l(c.$errors||c.$error),void 0===h?i=!0:a.getErrorMessage(h,d).then(function(b){a.makeInvalid(d,b)}))),i},i=function(b){a.makeDefault(b)},j=function(a){b.forEach(a[0].all||a[0].elements||a[0],function(a){var c,d=b.element(a);c=d.controller("ngModel"),void 0!==c&&("form"===d[0].nodeName.toLowerCase()?j(d):c.$setPristine())})},k=function(a){var c,d=!0,e=a?b.element(a).controller("form"):void 0,i=function(a,c,i){var j,l,m,n;if(a=b.element(a),j=a.controller("ngModel"),void 0!==j&&(c||g(a,i,e.$submitted)))if("form"===a[0].nodeName.toLowerCase())k(a);else{m=f(a),n=m.forceValidation,m.forceValidation=c;try{l=h(j,a,m),d=d&&l}finally{m.forceValidation=n}}};return void 0===a||void 0!==e&&e.autoValidateFormOptions.disabled?void 0!==a:(c=b.copy(e.autoValidateFormOptions),c.forceValidation=!0,b.forEach(a[0].elements||a[0].all||a[0],function(a){i(a,!0,c)}),a[0].customHTMLFormControlsCollection&&b.forEach(a[0].customHTMLFormControlsCollection,function(a){i(a,!0,c)}),d)},l=function(b,c,d){c?a.getErrorMessage(c,b).then(function(c){a.makeInvalid(b,c)}):a.makeInvalid(b,d)};return{setElementValidationError:l,validateElement:h,validateForm:k,resetElement:i,resetForm:j}}function j(a,b){return void 0!==a&&null!==a||void 0===b?"false"!==a:b}function k(a,c,d){var e=a.autoValidateFormOptions=a.autoValidateFormOptions||b.copy(c.defaultFormValidationOptions);e.getFormController=function(){return a},e.forceValidation=!1,e.disabled=!c.isEnabled()||j(d.disableDynamicValidation,e.disabled),e.validateNonVisibleControls=j(d.validateNonVisibleControls,e.validateNonVisibleControls),e.validateOnFormSubmit=j(d.validateOnFormSubmit,e.validateOnFormSubmit),e.removeExternalValidationErrorsOnSubmit=void 0===d.removeExternalValidationErrorsOnSubmit?e.removeExternalValidationErrorsOnSubmit:j(d.removeExternalValidationErrorsOnSubmit,e.removeExternalValidationErrorsOnSubmit),c.isEnabled()===!1&&"false"===d.disableDynamicValidation&&(e.disabled=!1)}function l(a){return{restrict:"E",link:function(b,c){function d(){a.resetForm(c),e.$setPristine&&e.$setPristine(),e.$setUntouched&&e.$setUntouched()}var e=c.controller("form");void 0!==e&&e.autoValidateFormOptions&&e.autoValidateFormOptions.disabled===!1&&(c.on("reset",d),b.$on("$destroy",function(){c.off("reset",d)}))}}}function m(){var a=function(a){for(var c=a,d=0;50>=d&&(void 0===c||"form"!==c.nodeName.toLowerCase());d+=1)void 0!==c&&(c=b.element(c).parent()[0]);return c};return{restrict:"A",link:function(b,c){var d=a(c.parent()[0]);d&&(d.customHTMLFormControlsCollection=d.customHTMLFormControlsCollection||[],d.customHTMLFormControlsCollection.push(c[0]))}}}function n(a,b,c){return a[0].compile=function(a,d){var e=b(d.ngSubmit),f="true"===d.ngSubmitForce;return function(a,b){function d(d){a.$apply(function(){void 0!==i&&null!==i&&i.autoValidateFormOptions&&i.autoValidateFormOptions.disabled===!0?e(a,{$event:d}):(void 0===i.$setSubmitted&&(i.$submitted=!0),(c.validateForm(b)||f===!0)&&e(a,{$event:d}))})}function g(){b[0].reset?b[0].reset():c.resetForm(b)}var h,i=b.controller("form");i&&i.autoValidateFormOptions&&(i.autoValidateFormOptions.resetForm=g,void 0!==i.$name&&""!==i.$name&&(h=a.$on("form:"+i.$name+":reset",g))),b.on("submit",d),a.$on("$destroy",function(){b.off("submit",d),h&&h()})}},a}function o(a){a.decorator("ngSubmitDirective",n)}function p(a,b,c,d){a.setErrorMessageResolver(b.resolve),a.registerDomModifier(c.key,c),a.registerDomModifier(d.key,d),a.setDefaultElementModifier(c.key)}b.module("jcs-autoValidate",[]),b.module("jcs-autoValidate").provider("validator",c),d.$inject=["$log"],b.module("jcs-autoValidate").factory("bootstrap3ElementModifier",d),e.$inject=["$timeout"],b.module("jcs-autoValidate").factory("jcs-debounce",e),"format"in a.prototype||(a.prototype.format=function(){var a=arguments;return this.replace(/{(\d+)}/g,function(b,c){return void 0!==typeof a[c]?a[c]:b})}),b.autoValidate=b.autoValidate||{errorMessages:{}},b.autoValidate.errorMessages["default"]={defaultMsg:"Please add error message for {0}",email:"Please enter a valid email address",minlength:"Please enter at least {0} characters",maxlength:"You have entered more than the maximum {0} characters",min:"Please enter the minimum number of {0}",max:"Please enter the maximum number of {0}",required:"This field is required",date:"Please enter a valid date",pattern:"Please ensure the entered information adheres to this pattern {0}",number:"Please enter a valid number",url:"Please enter a valid URL in the format of http(s)://www.google.com"},f.$inject=["$q","$http"],b.module("jcs-autoValidate").factory("defaultErrorMessageResolver",f),b.module("jcs-autoValidate").factory("foundation5ElementModifier",g),i.$inject=["validator","jcs-elementUtils"],b.module("jcs-autoValidate").factory("jcs-elementUtils",h),b.module("jcs-autoValidate").factory("validationManager",i),b.module("jcs-autoValidate").directive("form",["validator",function(a){return{restrict:"E",require:"form",priority:9999,compile:function(){return{pre:function(b,c,d,e){k(e,a,d)}}}}}]),b.module("jcs-autoValidate").directive("ngForm",["validator",function(a){return{restrict:"EA",require:"form",priority:9999,compile:function(){return{pre:function(b,c,d,e){k(e,a,d)}}}}}]),l.$inject=["validationManager"],b.module("jcs-autoValidate").directive("form",l),b.module("jcs-autoValidate").directive("registerCustomFormControl",m),n.$inject=["$delegate","$parse","validationManager"],o.$inject=["$provide"],b.module("jcs-autoValidate").config(o),b.module("jcs-autoValidate").config(["$provide",function(a){a.decorator("ngModelDirective",["$timeout","$delegate","validationManager","jcs-debounce",function(a,c,d,e){var f=c[0],g=f.link||f.compile;return f.compile=function(a){var c=b.version.major>=1&&b.version.minor>=3,f=g;return c&&b.isFunction(g)&&(f=g(a)),{pre:function(a,g,h,i){var j=i[0],k=i[1],l=void 0===h.ngModelOptions?void 0:a.$eval(h.ngModelOptions),m=j.$setValidity,n=j.$setPristine,o=e.debounce(function(){var a=void 0!==k&&null!==k?k.autoValidateFormOptions:void 0;d.validateElement(j,g,a)},100);return void 0===h.formnovalidate&&void 0!==k&&null!==k&&k.autoValidateFormOptions&&k.autoValidateFormOptions.disabled===!1&&(c&&void 0!==l&&void 0!==l.updateOn&&""!==l.updateOn?(g.on(l.updateOn,function(){o()}),a.$on("$destroy",function(){g.off(l.updateOn)})):j.$setValidity=function(a,b){m.call(j,a,b),o()},j.$setPristine=function(){n.call(j),d.resetElement(g)},j.autoValidated=!0),j.setExternalValidation=function(a,b,c){if(c){var e=j.$error||j.$errors;e[a]=!1}j.externalErrors=j.externalErrors||{},j.externalErrors[a]=!1,d.setElementValidationError(g,a,b)},j.removeExternalValidation=function(a,b){if(b){var c=j.$error||j.$errors;delete c[a]}j.externalErrors&&delete j.externalErrors[a],d.resetElement(g)},j.removeAllExternalValidation=function(){if(j.externalErrors){var a=j.$error||j.$errors;b.forEach(j.externalErrors,function(b,c){delete a[c]}),j.externalErrors={},d.resetElement(g)}},k&&(k.setExternalValidation=function(a,b,c,d){var e=!1;return k[a]&&(k[a].setExternalValidation(b,c,d),e=!0),e},k.removeExternalValidation=function(a,b,c,d){var e=!1;return k[a]&&(k[a].removeExternalValidation(b,d),e=!0),e}),f.pre?f.pre.apply(this,arguments):this},post:function(a,b,c,d){return f.post?f.post.apply(this,arguments):f.apply(this,arguments)}}},c}])}]),p.$inject=["validator","defaultErrorMessageResolver","bootstrap3ElementModifier","foundation5ElementModifier"],b.module("jcs-autoValidate").run(p)}(String,angular);