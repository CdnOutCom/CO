/*!
 * angular-translate - v2.18.4 - 2021-01-14
 * 
 * Copyright (c) 2021 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(n,t){"function"==typeof define&&define.amd?define([],function(){return t()}):"object"==typeof module&&module.exports?module.exports=t():t()}(0,function(){function n(t){"use strict";return function(n){t.warn("Translation for "+n+" doesn't exist")}}return n.$inject=["$log"],angular.module("pascalprecht.translate").factory("$translateMissingTranslationHandlerLog",n),n.displayName="$translateMissingTranslationHandlerLog","pascalprecht.translate"});