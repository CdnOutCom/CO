/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/infinitegrid project is licensed under the MIT license
 * 
 * @egjs/infinitegrid JavaScript library
 * 
 * 
 * @version 2.0.0
 * 
 * All-in-one packaged file for ease use of '@egjs/infinitegrid' with below dependencies.
 * NOTE: This is not an official distribution file and is only for user convenience.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("InfiniteGrid", [], factory);
	else if(typeof exports === 'object')
		exports["InfiniteGrid"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["InfiniteGrid"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.utils = exports.Mixin = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _browser = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SUPPORT_COMPUTEDSTYLE = !!("getComputedStyle" in _browser.window);
var SUPPORT_ADDEVENTLISTENER = !!("addEventListener" in _browser.document);
var SUPPORT_PASSIVE = function () {
	var supportsPassiveOption = false;

	try {
		if (SUPPORT_ADDEVENTLISTENER && Object.defineProperty) {
			_browser.document.addEventListener("test", null, Object.defineProperty({}, "passive", {
				get: function get() {
					supportsPassiveOption = true;
				}
			}));
		}
	} catch (e) {}
	return supportsPassiveOption;
}();

var utils = {
	/**
  * Select or create element
  * @param {String|HTMLElement|jQuery} param
  *  when string given is as HTML tag, then create element
  *  otherwise it returns selected elements
  * @param {Boolean} multi
  * @returns {HTMLElement}
  */
	$: function $(param) {
		var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		var el = void 0;

		if (typeof param === "string") {
			// String (HTML, Selector)
			// check if string is HTML tag format
			var match = param.match(/^<([a-z]+)\s*([^>]*)>/);

			// creating element
			if (match) {
				// HTML
				var dummy = _browser.document.createElement("div");

				dummy.innerHTML = param;
				el = this.toArray(dummy.childNodes);
			} else {
				// Selector
				el = this.toArray(_browser.document.querySelectorAll(param));
			}
			if (!multi) {
				el = el.length >= 1 ? el[0] : undefined;
			}
		} else if (param === _browser.window) {
			// window
			el = param;
		} else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
			// HTMLElement, Document
			el = param;
		} else if ("jQuery" in _browser.window && param instanceof jQuery || param.constructor.prototype.jquery) {
			// jQuery
			el = multi ? param.toArray() : param.get(0);
		} else if (Array.isArray(param)) {
			el = param.map(function (v) {
				return utils.$(v);
			});
			if (!multi) {
				el = el.length >= 1 ? el[0] : undefined;
			}
		}
		return el;
	},
	addEvent: function addEvent(element, type, handler, eventListenerOptions) {
		if (SUPPORT_ADDEVENTLISTENER) {
			var options = eventListenerOptions || false;

			if ((typeof eventListenerOptions === "undefined" ? "undefined" : _typeof(eventListenerOptions)) === "object") {
				options = SUPPORT_PASSIVE ? eventListenerOptions : false;
			}
			element.addEventListener(type, handler, options);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeEvent: function removeEvent(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	scrollTop: function scrollTop(el) {
		if (el === _browser.window) {
			return _browser.document.body.scrollTop || _browser.document.documentElement.scrollTop;
		} else {
			return el.scrollTop;
		}
	},
	scrollTo: function scrollTo(el, x, y) {
		if (el === _browser.window) {
			el.scrollTo(x, y);
		} else {
			el.scrollLeft = x;
			el.scrollTop = y;
		}
	},
	getSize: function getSize(el, name) {
		if (el === _browser.window) {
			// WINDOW
			return el.document.documentElement["client" + name];
		} else if (el.nodeType === 9) {
			// DOCUMENT_NODE
			var doc = el.documentElement;

			return Math.max(el.body["scroll" + name], doc["scroll" + name], el.body["offset" + name], doc["offset" + name], doc["client" + name]);
		} else {
			// NODE
			var style = SUPPORT_COMPUTEDSTYLE ? _browser.window.getComputedStyle(el) : el.currentStyle;
			var value = style[name.toLowerCase()];

			return parseFloat(/auto|%/.test(value) ? el["offset" + name] : style[name.toLowerCase()]);
		}
	},
	innerWidth: function innerWidth(el) {
		return this.getSize(el, "Width");
	},
	innerHeight: function innerHeight(el) {
		return this.getSize(el, "Height");
	},
	isEmptyObject: function isEmptyObject(obj) {
		var name = void 0;

		for (name in obj) {
			return false;
		}
		return true;
	},
	toArray: function toArray(nodes) {
		// SCRIPT5014 in IE8
		var array = [];

		if (nodes) {
			for (var i = 0, len = nodes.length; i < len; i++) {
				array.push(nodes[i]);
			}
		}
		return array;
	}
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass || function () {
			function _class() {
				_classCallCheck(this, _class);
			}

			return _class;
		}();
	}

	MixinBuilder.prototype["with"] = function _with() {
		for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
			mixins[_key] = arguments[_key];
		}

		return mixins.reduce(function (c, m) {
			return m(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var Mixin = function Mixin(superclass) {
	return new MixinBuilder(superclass);
};

exports.Mixin = Mixin;
exports.utils = utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.CONTAINER_CLASSNAME = exports.RETRY = exports.IS_ANDROID2 = exports.IS_IOS = exports.IS_IE = undefined;

var _browser = __webpack_require__(2);

var ua = _browser.window.navigator.userAgent;

var IS_IE = exports.IS_IE = /MSIE|Trident|Windows Phone|Edge/.test(ua);
var IS_IOS = exports.IS_IOS = /iPhone|iPad/.test(ua);
var IS_ANDROID2 = exports.IS_ANDROID2 = /Android 2\./.test(ua);
var RETRY = exports.RETRY = 3;
var CONTAINER_CLASSNAME = exports.CONTAINER_CLASSNAME = "_eg-infinitegrid-container_";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/* eslint-disable no-new-func, no-nested-ternary */
var win = typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
/* eslint-enable no-new-func, no-nested-ternary */

exports.window = win;
var document = exports.document = win.document;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _InfiniteGrid = __webpack_require__(4);

var _InfiniteGrid2 = _interopRequireDefault(_InfiniteGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = _InfiniteGrid2["default"]; /**
                                             * Copyright (c) NAVER Corp.
                                             * egjs-infinitegrid projects are licensed under the MIT license
                                             */

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Copyright (c) 2017 NAVER Corp.
                                                                                                                                                                                                                                                                               * egjs projects are licensed under the MIT license
                                                                                                                                                                                                                                                                              */


var _component = __webpack_require__(5);

var _component2 = _interopRequireDefault(_component);

var _eventHandler = __webpack_require__(6);

var _eventHandler2 = _interopRequireDefault(_eventHandler);

var _browser = __webpack_require__(2);

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

var _ImageLoaded = __webpack_require__(7);

var _ImageLoaded2 = _interopRequireDefault(_ImageLoaded);

var _LayoutManager = __webpack_require__(8);

var _LayoutManager2 = _interopRequireDefault(_LayoutManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// IE8
// https://stackoverflow.com/questions/43216659/babel-ie8-inherit-issue-with-object-create
/* eslint-disable */
if (typeof Object.create !== "function") {
	Object.create = function (o, properties) {
		if ((typeof o === "undefined" ? "undefined" : _typeof(o)) !== "object" && typeof o !== "function") {
			throw new TypeError("Object prototype may only be an Object: " + o);
		} else if (o === null) {
			throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
/* eslint-enable */

/**
 * A module used to arrange card elements including content infinitely on a grid layout. With this module, you can implement a grid-pattern user interface composed of different card elements whose sizes vary. It guarantees performance by maintaining the number of DOMs the module is handling under any circumstance
 * @ko ???????????? ?????? ?????? ??????????????? ????????? ??????????????? ???????????? ???????????? ??????. ????????? ????????? ?????? ??????????????? ?????? ???????????? ???????????? UI??? ?????? ??? ??????. ?????? ??????????????? ????????? ?????? ???????????? ????????? ???????????? DOM??? ????????? ???????????? ????????? ????????? ????????? ????????????
 * @alias eg.InfiniteGrid
 * @extends eg.Component
 *
 * @example
```
<ul id="grid">
	<li class="card">
		<div>test1</div>
	</li>
	<li class="card">
		<div>test2</div>
	</li>
	<li class="card">
		<div>test3</div>
	</li>
	<li class="card">
		<div>test4</div>
	</li>
	<li class="card">
		<div>test5</div>
	</li>
	<li class="card">
		<div>test6</div>
	</li>
</ul>
<script>
var some = new eg.InfiniteGrid("#grid").on("layoutComplete", function(e) {
	// ...
});
</script>
```
 *
 * @support {"ie": "8+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
 **/
var InfiniteGrid = function (_Mixin$with) {
	_inherits(InfiniteGrid, _Mixin$with);

	/**
  * @param {HTMLElement|String|jQuery} element A base element for a module <ko>????????? ????????? ?????? ????????????</ko>
  * @param {Object} [options] The option object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid ????????? ?????? ??????</ko>
  * @param {String} [options.itemSelector] A selector to select card elements that make up the layout<ko>??????????????? ???????????? ?????? ??????????????? ????????? ?????????(selector)</ko>
  * @param {Number} [options.count=30] The number of DOMs handled by module. If the count value is greater than zero, the number of DOMs is maintained. If the count value is zero or less than zero, the number of DOMs will increase as card elements are added. <ko>????????? ????????? ?????? DOM??? ??????. count ?????? 0?????? ?????? DOM ????????? ???????????? ????????????. count ?????? 0 ????????? ?????? ??????????????? ??????????????? DOM ????????? ?????? ????????????.</ko>
  * @param {String} [options.defaultGroupKey=null] The default group key configured in a card element contained in the markup upon initialization of a module object <ko>?????? ????????? ???????????? ??? ???????????? ?????? ?????? ??????????????? ????????? ?????? ??? </ko>
  * @param {Boolean} [options.isEqualSize=false] Indicates whether sizes of all card elements are equal to one another. If sizes of card elements to be arranged are all equal and this option is set to "true", the performance of layout arrangement can be improved. <ko>?????? ??????????????? ????????? ???????????? ??????. ????????? ?????? ??????????????? ????????? ?????? ????????? ??? ??? ????????? 'true'??? ???????????? ???????????? ?????? ????????? ?????? ??? ??????</ko>
  * @param {Boolean} [options.isOverflowScroll=false] Indicates whether overflow:scroll is applied<ko>overflow:scroll ??????????????? ????????????.</ko>
  * @param {Number} [options.threshold=300] The threshold size of an event area where card elements are added to a layout.<br>- append event: If the current vertical position of the scroll bar is greater than "the bottom property value of the card element at the top of the layout" plus "the value of the threshold option", the append event will occur.<br>- prepend event: If the current vertical position of the scroll bar is less than "the bottom property value of the card element at the top of the layout" minus "the value of the threshold option", the prepend event will occur. <ko>???	??????????????? ?????? ??????????????? ???????????? ???????????? ???????????? ?????? ????????? ??????.<br>- append ?????????: ?????? ???????????? y ?????? ?????? '??????????????? ??? ????????? ?????? ?????? ??????????????? top ????????? ??? + threshold ????????? ???'?????? ?????? append ???????????? ????????????.<br>- prepend ?????????: ?????? ???????????? y ?????? ?????? '??????????????? ??? ?????? ?????? ?????? ??????????????? bottom ????????? ??? - threshold ????????? ???'?????? ????????? prepend ???????????? ????????????</ko>
  *
  */
	function InfiniteGrid(el, options) {
		_classCallCheck(this, InfiniteGrid);

		var _this = _possibleConstructorReturn(this, _Mixin$with.call(this, el, options));

		_extends(_this.options = {
			isEqualSize: false,
			defaultGroupKey: null,
			count: 100,
			isOverflowScroll: false,
			itemSelector: "*",
			threshold: 300
		}, options);
		_consts.IS_ANDROID2 && (_this.options.isOverflowScroll = false);

		_this._initElements(el);
		_this.layoutManager = new _LayoutManager2["default"](_this.el, _this.options);
		_this._reset();
		_this._resizeViewport();

		// for IE8
		var elements = [];

		for (var i = 0, children = _this.el.children, len = children.length; i < len; i++) {
			elements.push(children[i]);
		}
		elements = _this._selectItems(elements);
		if (elements.length > 0) {
			_this.layout(true, _LayoutManager2["default"].itemize(elements, _this.options.defaultGroupKey));
		}
		_this._attachEvent();
		return _this;
	}

	InfiniteGrid.prototype._initElements = function _initElements(el) {
		var base = _utils.utils.$(el);

		if (this.options.isOverflowScroll) {
			var container = base.querySelector("." + _consts.CONTAINER_CLASSNAME);

			if (!container) {
				container = _browser.document.createElement("div");
				container.className = _consts.CONTAINER_CLASSNAME;

				var children = base.children;
				var length = children.length; // for IE8

				for (var i = 0; i < length; i++) {
					container.appendChild(children[0]);
				}
				base.style.overflowY = "scroll";
				base.appendChild(container);
				this.view = base;
				this.el = container;
			}
		} else {
			this.view = _browser.window;
			this.el = base;
		}
	};

	InfiniteGrid.prototype._resizeViewport = function _resizeViewport() {
		this._status.clientHeight = _utils.utils.innerHeight(this.view);
	};

	/**
  * Returns the current state of a module such as location information. You can use the setStatus() method to restore the information returned through a call to this method.
  * @ko ????????? ?????? ?????? ??? ????????? ?????? ?????? ????????? ????????????. ??? ???????????? ????????? ????????? ????????? ???????????? setStatus() ???????????? ????????? ??? ??????
  * @return {Object} State object of the eg.InfiniteGrid module<ko>eg.InfiniteGrid ????????? ?????? ??????</ko>
  */


	InfiniteGrid.prototype.getStatus = function getStatus() {
		var data = {};
		var target = this.view === _browser.window ? this.el : this.view;

		for (var p in this._status) {
			if (this._status.hasOwnProperty.call(p) && !(this._status[p] instanceof Element)) {
				data[p] = this._status[p];
			}
		}
		return {
			html: target.innerHTML,
			cssText: target.style.cssText,
			layoutManager: this.layoutManager.getStatus(),
			options: _extends({}, this.options),
			prop: data
		};
	};

	/**
  * Sets the state of the eg.InfiniteGrid module with the information returned through a call to the getStatue() method.
  * @ko getStatue() ???????????? ????????? ????????? eg.InfiniteGrid ????????? ????????? ????????????.
  * @param {Object} status State object of the eg.InfiniteGrid module <ko>eg.InfiniteGrid ????????? ?????? ??????</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>?????? ????????? ????????????</ko>
  */


	InfiniteGrid.prototype.setStatus = function setStatus(status) {
		if (!status || !status.options || !status.prop || !status.layoutManager || !status.html || !status.cssText) {
			return this;
		}
		var target = status.options.isOverflowScroll ? this.view : this.el;

		this._detachEvent();
		this._initElements(this.view === _browser.window ? this.el : this.view);
		target.style.cssText = status.cssText;
		target.innerHTML = status.html;
		_extends(this.options, status.options);
		_extends(this._status, status.prop);
		this.layoutManager.setStatus(status.layoutManager);
		this._status.topElement = this.getTopElement();
		this._status.bottomElement = this.getBottomElement();
		this._attachEvent();

		return this;
	};

	/**
  * Checks whether a card element is being added.
  * @ko ?????? ???????????? ????????? ?????? ????????? ????????????
  * @return {Boolean} Indicates whether a card element is being added <ko>?????? ???????????? ?????? ?????? ??? ??????</ko>
  */


	InfiniteGrid.prototype.isProcessing = function isProcessing() {
		return this._status.isProcessing;
	};

	/**
  * Checks whether the total number of added card elements is greater than the value of the count option. Note that the value of the count option is always greater than zero. If it returns true, the number of DOMs won't increase even though card elements are added; instead of adding a new DOM, existing DOMs are recycled to maintain the number of DOMs.
  * @ko ????????? ?????? ??????????????? ?????? ????????? count ????????? ????????? ?????? ????????????. ???, count ????????? ?????? 0?????? ??????. 'true'??? ???????????? ?????? ??????????????? ??? ???????????? DOM??? ????????? ???????????? ?????? ?????? DOM??? ?????????(recycle)??? DOM??? ????????? ???????????? ????????????
  * @return {Boolean} Indicates whether the total number of added card elements is greater than the value of the count option. <ko>????????? ?????? ??????????????? ?????? ????????? count ????????? ????????? ?????? ??????</ko>
  */


	InfiniteGrid.prototype.isRecycling = function isRecycling() {
		return this.options.count > 0 && this._status.isRecycling;
	};

	/**
  * Returns the list of group keys which belongs to card elements currently being maintained. You can use the append() or prepend() method to configure group keys so that multiple card elements can be managed at once. If you do not use these methods to configure group keys, it returns undefined as a group key.
  * @ko ?????? ???????????? ?????? ?????? ??????????????? ?????? ??? ????????? ????????????. ?????? ?????? ?????? ??????????????? ????????? ????????? ??? ????????? append() ???????????? prepend() ??????????????? ?????? ?????? ????????? ??? ??????. append() ???????????? prepend() ??????????????? ?????? ?????? ???????????? ???????????? 'undefined'??? ?????? ?????? ????????????
  * @return {Array} List of group keys <ko>?????? ?????? ??????</ko>
  */


	InfiniteGrid.prototype.getGroupKeys = function getGroupKeys() {
		return this.layoutManager.getGroupKeys();
	};

	/**
  * Rearranges a layout.
  * @ko ??????????????? ?????? ????????????.
  * @param {Boolean} [isRelayout=true] Indicates whether a card element is being relayouted <ko>?????? ???????????? ????????? ??????</ko>
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>?????? ????????? ????????????</ko>
  *
  *  [private parameter]
  * _addItems: added items
  * _options: {
  *	 isAppend: Checks whether the append() method is used to add a card element.
  *	 removedCount: The number of deleted card elements to maintain the number of DOMs.
  *}
  */


	InfiniteGrid.prototype.layout = function layout() {
		var isRelayout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
		var _addItems = arguments[1];
		var _options = arguments[2];

		this._status.isProcessing = true;
		var options = _extends({
			isAppend: true,
			removedCount: 0
		}, _options);

		// for exception
		if (!_addItems && !options.isAppend) {
			options.isAppend = true;
		}
		this._waitResource(isRelayout, options.isAppend ? _addItems : _addItems.reverse(), options);
		return this;
	};

	InfiniteGrid.prototype._onLayoutComplete = function _onLayoutComplete(isRelayout, addItems, options) {
		this.layoutManager.layoutItems(isRelayout, addItems, options);
		this._postLayout(isRelayout, addItems, options);
	};

	/**
  * Adds a card element at the bottom of a grid layout. This method is available only if the isProcessing() method returns false.
  * @ko ?????? ??????????????? ????????? ??????????????? ????????? ????????????. isProcessing() ???????????? ???????????? 'false'??? ?????? ??? ???????????? ????????? ??? ??????
  * ??? ???????????? isProcessing()??? ???????????? false??? ???????????? ?????? ????????????.
  * @param {Array|jQuery} elements Array of the card elements to be added <ko>????????? ?????? ??????????????? ??????</ko>
  * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>????????? ?????? ??????????????? ????????? ?????? ???. ???????????? ?????? 'undefined'??? ????????????</ko>
  * @return {Number} The number of added card elements <ko>????????? ?????? ??????????????? ??????</ko>
  */


	InfiniteGrid.prototype.append = function append(paramElements, groupKey) {
		return this._insert(paramElements, groupKey, true);
	};

	/**
  * Adds a card element at the top of a grid layout. This method is available only if the isProcessing() method returns false and the isRecycling() method returns true.
  * @ko ?????? ??????????????? ????????? ??????????????? ?????? ????????????. isProcessing() ???????????? ???????????? 'false'??????, isRecycling() ???????????? ???????????? 'true'??? ?????? ??? ???????????? ????????? ??? ??????
  * @param {Array|jQuery} elements Array of the card elements to be added <ko>????????? ?????? ???????????? ??????</ko>
  * @param {Number|String} [groupKey] The group key to be configured in a card element. It is set to "undefined" by default.<ko>????????? ?????? ??????????????? ????????? ?????? ???. ???????????? ?????? 'undefined'??? ????????????</ko>
  * @return {Number} The number of added card elements <ko>????????? ?????? ??????????????? ??????</ko>
  */


	InfiniteGrid.prototype.prepend = function prepend(paramElements, groupKey) {
		return this._insert(paramElements, groupKey, false);
	};

	/**
  * Clears added card elements and data.
  * @ko ????????? ?????? ??????????????? ???????????? ?????? ?????????.
  * @return {eg.InfiniteGrid} An instance of a module itself<ko>?????? ????????? ????????????</ko>
  */


	InfiniteGrid.prototype.clear = function clear() {
		this.el.innerHTML = "";
		this.el.style.height = "";
		this._reset();
		return this;
	};

	/**
  * Returns a card element at the top of a layout.
  * @ko ??????????????? ??? ?????? ?????? ?????? ??????????????? ????????????.
  *
  * @return {HTMLElement} Card element at the top of a layout. (if the position of card elements are same, it returns the first left element) <ko>??????????????? ??? ?????? ?????? ?????? ???????????? (????????? ????????? ?????? ??????, ?????? ??????????????? ????????????)</ko>
  */


	InfiniteGrid.prototype.getTopElement = function getTopElement() {
		var item = this.layoutManager.getTopItem();

		return item && item.el;
	};

	/**
  * Returns a card element at the bottom of a layout.
  * @ko ??????????????? ??? ????????? ?????? ?????? ??????????????? ????????????.
  *
  * @return {HTMLElement} Card element at the bottom of a layout (if the position of card elements are same, it returns the first right element)<ko>??????????????? ??? ????????? ?????? ?????? ???????????? (????????? ????????? ?????? ??????, ????????? ??????????????? ????????????)</ko>
  */


	InfiniteGrid.prototype.getBottomElement = function getBottomElement() {
		var item = this.layoutManager.getBottomItem();

		return item && item.el;
	};

	InfiniteGrid.prototype._resizeContainerHeight = function _resizeContainerHeight() {
		this.el.style.height = this.layoutManager.getLogicalHeight() + "px";
	};

	InfiniteGrid.prototype._postLayout = function _postLayout(isRelayout) {
		var addItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
		var options = arguments[2];

		if (!this.isProcessing()) {
			return;
		}
		this._resizeContainerHeight();
		this._timer.doubleCheckCount = _consts.RETRY;

		// refresh element
		this._status.topElement = this.getTopElement();
		this._status.bottomElement = this.getBottomElement();

		var distance = 0;

		if (!options.isAppend) {
			distance = addItems.length >= this.layoutManager.items.length ? 0 : this.layoutManager.items[addItems.length].position.y;
			if (distance > 0) {
				this._status.prevScrollTop = _utils.utils.scrollTop(this.view) + distance;
				_utils.utils.scrollTo(this.view, 0, this._status.prevScrollTop);
			}
		}

		// reset flags
		this._status.isProcessing = false;

		/**
   * This event is fired when layout is successfully arranged through a call to the append(), prepend(), or layout() method.
   * @ko ???????????? ????????? ???????????? ??? ???????????? ?????????. append() ???????????? prepend() ?????????, layout() ????????? ?????? ??? ????????? ????????? ???????????? ??? ????????????
   * @event eg.InfiniteGrid#layoutComplete
   *
   * @param {Object} param The object of data to be sent to an event <ko>???????????? ???????????? ????????? ??????</ko>
   * @param {Array} param.target Rearranged card elements<ko>???????????? ?????? ???????????????</ko>
   * @param {Boolean} param.isAppend Checks whether the append() method is used to add a card element. It returns true even though the layoutComplete event is fired after the layout() method is called. <ko>?????? ??????????????? append() ???????????? ??????????????? ????????????. layout() ???????????? ????????? ??? layoutComplete ???????????? ???????????? 'true'??? ????????????.</ko>
   * @param {Number} param.distance Distance the card element at the top of a grid layout has moved after the layoutComplete event is fired. In other words, it is the same as an increased height with a new card element added using the prepend() method <ko>????????? ??????????????? ??? ?????? ?????? ?????? ??????????????? layoutComplete ????????? ?????? ??? ????????? ??????. ???, prepend() ???????????? ?????? ??????????????? ????????? ????????? ?????????.</ko>
   * @param {Number} param.croppedCount The number of deleted card elements to maintain the number of DOMs<ko>????????? DOM ????????? ???????????? ??????, ????????? ?????? ?????????????????? ??????</ko>
   */
		this.trigger("layoutComplete", {
			target: addItems.concat(),
			isAppend: options.isAppend,
			distance: distance,
			croppedCount: options.removedCount
		});

		!options.isAppend && this._doubleCheckForPrepend();
	};

	InfiniteGrid.prototype._doubleCheckForPrepend = function _doubleCheckForPrepend() {
		var _this2 = this;

		// doublecheck!!! (workaround)
		if (_utils.utils.scrollTop(this.view) === 0) {
			clearInterval(this._timer.doubleCheck);
			this._timer.doubleCheck = setInterval(function () {
				if (_utils.utils.scrollTop(_this2.view) === 0) {
					_this2.trigger("prepend", {
						scrollTop: 0
					});
					--_this2._timer.doubleCheckCount <= 0 && clearInterval(_this2._timer.doubleCheck);
				}
			}, 500);
		}
	};

	InfiniteGrid.prototype._selectItems = function _selectItems(elements) {
		var _this3 = this;

		return elements.filter(function (v) {
			if (_this3.options.itemSelector === "*") {
				return (/DIV|SPAN|LI/.test(v.tagName)
				);
			} else {
				return v.className.split(" ").some(function (c) {
					return c === _this3.options.itemSelector;
				});
			}
		});
	};

	InfiniteGrid.prototype._prepareElement = function _prepareElement(paramElements) {
		var elements = _utils.utils.$(paramElements, true);

		elements = this._selectItems(elements);
		this._status.isProcessing = true;
		if (!this.isRecycling()) {
			this._status.isRecycling = this.layoutManager.items.length + elements.length >= this.options.count;
		}
		return elements;
	};

	// elements => [HTMLElement, HTMLElement, ...]


	InfiniteGrid.prototype._insert = function _insert(paramElements, groupKey, isAppend) {
		if (this.isProcessing() || paramElements.length === 0) {
			return 0;
		}
		var elements = this._prepareElement(paramElements);
		var cloneElements = elements.concat();
		var dummy = -this._status.clientHeight + "px";

		elements.forEach(function (v) {
			v.style.position = "absolute";
			v.style.top = dummy;
		});
		var removedCount = this._adjustRange(isAppend, cloneElements);

		// prepare HTML
		var docFragment = _browser.document.createDocumentFragment();

		cloneElements.forEach(function (v) {
			return docFragment.appendChild(v);
		});
		isAppend ? this.el.appendChild(docFragment) : this.el.insertBefore(docFragment, this.el.firstChild);
		this.layout(false, _LayoutManager2["default"].itemize(cloneElements, groupKey), {
			isAppend: isAppend,
			removedCount: removedCount
		});
		// console.info("remove count", removedCount, this.el.children.length, "+", elements.length, "||", cloneElements.length);

		return cloneElements.length;
	};

	InfiniteGrid.prototype._waitResource = function _waitResource(isRelayout, addItems, options) {
		var needCheck = _ImageLoaded2["default"].checkImageLoaded(this.el);
		var callback = function () {
			this._onLayoutComplete(isRelayout, addItems, options);
		}.bind(this);

		if (needCheck.length > 0) {
			_ImageLoaded2["default"].waitImageLoaded(needCheck, callback);
		} else {
			// convert to async
			setTimeout(function () {
				callback && callback();
			}, 0);
		}
	};

	InfiniteGrid.prototype._adjustRange = function _adjustRange(isTop, elements) {
		var removedCount = 0;

		if (!this.isRecycling()) {
			return removedCount;
		}

		// trim $elements
		if (this.options.count <= elements.length) {
			removedCount += isTop ? elements.splice(0, elements.length - this.options.count).length : elements.splice(this.options.count).length;
		}

		var diff = this.layoutManager.items.length + elements.length - this.options.count;
		var idx = void 0;

		if (diff <= 0 || (idx = this.layoutManager.getDelimiterIndex(isTop, diff)) < 0) {
			return removedCount;
		}

		var targets = this.layoutManager.adjustItems(isTop, idx);

		// @todo improve performance
		targets.forEach(function (v) {
			idx = elements.indexOf(v.el);
			if (idx !== -1) {
				elements.splice(idx, 1);
			} else {
				v.el.parentNode.removeChild(v.el);
			}
		});
		removedCount += targets.length;
		return removedCount;
	};

	/**
 * Removes extra space caused by adding card elements.
 * @private
 */


	InfiniteGrid.prototype._fitItems = function _fitItems() {
		var y = this.layoutManager.fit();

		y !== 0 && this._resizeContainerHeight();
		return y;
	};

	InfiniteGrid.prototype._reset = function _reset() {
		this._status = {
			isProcessing: false,
			isRecycling: false,
			prevScrollTop: 0,
			topElement: null,
			bottomElement: null,
			clientHeight: this._status && this._status.clientHeight
		};
		this._timer = {
			resize: null,
			doubleCheck: null,
			doubleCheckCount: _consts.RETRY
		};
		this.layoutManager.resetCols();
		this.layoutManager.clear();
	};

	/**
  * Removes a card element on a grid layout.
  * @ko ????????? ??????????????? ?????? ??????????????? ????????????.
  * @param {HTMLElement} Card element to be removed <ko>????????? ?????? ????????????</ko>
  * @return {Object}  Removed card element <ko>????????? ?????? ???????????? ??????</ko>
  */


	InfiniteGrid.prototype.remove = function remove(element) {
		return this.layoutManager.removeItem(element);
	};

	/**
  * Destroys elements, properties, and events used on a grid layout.
  * @ko ????????? ??????????????? ????????? ??????????????? ??????, ???????????? ????????????
  */


	InfiniteGrid.prototype.destroy = function destroy() {
		this.off();
		this._detachEvent();
		this._reset();
	};

	return InfiniteGrid;
}((0, _utils.Mixin)(_component2["default"])["with"](_eventHandler2["default"]));

InfiniteGrid.VERSION = "2.0.0";
exports["default"] = InfiniteGrid;
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/component project is licensed under the MIT license
 * 
 * @egjs/component JavaScript library
 * http://naver.github.io/egjs/component
 * 
 * @version 2.0.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Component"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Component"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Component = __webpack_require__(1);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Component2["default"].VERSION = "2.0.0";
module.exports = _Component2["default"];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/**
 * A class used to manage events and options in a component
 * @ko ??????????????? ???????????? ????????? ????????? ??? ?????? ?????? ?????????
 * @alias eg.Component
 */
var Component = function () {
	/**
  * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
  */
	function Component() {
		_classCallCheck(this, Component);

		this._eventHandler = {};
		this.options = {};
	}
	/**
  * Triggers a custom event.
  * @ko ????????? ???????????? ???????????????
  * @param {String} eventName The name of the custom event to be triggered <ko>????????? ????????? ???????????? ??????</ko>
  * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>????????? ???????????? ????????? ??? ????????? ?????????</ko>
  * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <ko>????????? ?????? ??????. ????????? ????????? ??????????????? stop() ???????????? ???????????? 'false'??? ???????????? ????????? ????????? ????????????.</ko>
  * @example
 class Some extends eg.Component {
  some(){
    this.trigger("hi");// fire hi event.
  }
 }
  */


	Component.prototype.trigger = function trigger(eventName) {
		var customEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		var handlerList = this._eventHandler[eventName] || [];
		var hasHandlerList = handlerList.length > 0;

		if (!hasHandlerList) {
			return true;
		}

		// If detach method call in handler in first time then handeler list calls.
		handlerList = handlerList.concat();

		customEvent.eventType = eventName;

		var isCanceled = false;
		var arg = [customEvent];
		var i = 0;

		customEvent.stop = function () {
			isCanceled = true;
		};

		for (var _len = arguments.length, restParam = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			restParam[_key - 2] = arguments[_key];
		}

		if (restParam.length >= 1) {
			arg = arg.concat(restParam);
		}

		for (i = 0; handlerList[i]; i++) {
			handlerList[i].apply(this, arg);
		}

		return !isCanceled;
	};
	/**
  * Executed event just one time.
  * @ko ???????????? ????????? ????????????.
  * @param {eventName} eventName The name of the event to be attached <ko>????????? ???????????? ??????</ko>
  * @param {Function} handlerToAttach The handler function of the event to be attached <ko>????????? ???????????? ????????? ??????</ko>
  * @return {eg.Component} An instance of a component itself<ko>???????????? ????????? ????????????</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    alert("hi");
  }
  thing() {
    this.once("hi", this.hi);
  }
 }
 var some = new Some();
 some.thing();
 some.trigger("hi");
 // fire alert("hi");
 some.trigger("hi");
 // Nothing happens
  */


	Component.prototype.once = function once(eventName, handlerToAttach) {
		if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var i = void 0;

			for (i in eventHash) {
				this.once(i, eventHash[i]);
			}
			return this;
		} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
			var self = this;

			this.on(eventName, function listener() {
				for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					arg[_key2] = arguments[_key2];
				}

				handlerToAttach.apply(self, arg);
				self.off(eventName, listener);
			});
		}

		return this;
	};

	/**
  * Checks whether an event has been attached to a component.
  * @ko ??????????????? ???????????? ??????????????? ????????????.
  * @param {String} eventName The name of the event to be attached <ko>?????? ????????? ????????? ???????????? ??????</ko>
  * @return {Boolean} Indicates whether the event is attached. <ko>????????? ?????? ??????</ko>
  * @example
 class Some extends eg.Component {
  some() {
    this.hasOn("hi");// check hi event.
  }
 }
  */


	Component.prototype.hasOn = function hasOn(eventName) {
		return !!this._eventHandler[eventName];
	};

	/**
  * Attaches an event to a component.
  * @ko ??????????????? ???????????? ????????????.
  * @param {eventName} eventName The name of the event to be attached <ko>????????? ???????????? ??????</ko>
  * @param {Function} handlerToAttach The handler function of the event to be attached <ko>????????? ???????????? ????????? ??????</ko>
  * @return {eg.Component} An instance of a component itself<ko>???????????? ????????? ????????????</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    console.log("hi");
  }
  some() {
    this.on("hi",this.hi); //attach event
  }
 }
 */


	Component.prototype.on = function on(eventName, handlerToAttach) {
		if ((typeof eventName === "undefined" ? "undefined" : _typeof(eventName)) === "object" && typeof handlerToAttach === "undefined") {
			var eventHash = eventName;
			var name = void 0;

			for (name in eventHash) {
				this.on(name, eventHash[name]);
			}
			return this;
		} else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
			var handlerList = this._eventHandler[eventName];

			if (typeof handlerList === "undefined") {
				this._eventHandler[eventName] = [];
				handlerList = this._eventHandler[eventName];
			}

			handlerList.push(handlerToAttach);
		}

		return this;
	};
	/**
  * Detaches an event from the component.
  * @ko ??????????????? ????????? ???????????? ????????????
  * @param {eventName} eventName The name of the event to be detached <ko>????????? ???????????? ??????</ko>
  * @param {Function} handlerToDetach The handler function of the event to be detached <ko>????????? ???????????? ????????? ??????</ko>
  * @return {eg.Component} An instance of a component itself <ko>???????????? ????????? ????????????</ko>
  * @example
 class Some extends eg.Component {
  hi() {
    console.log("hi");
  }
  some() {
    this.off("hi",this.hi); //detach event
  }
 }
  */


	Component.prototype.off = function off(eventName, handlerToDetach) {
		// All event detach.
		if (typeof eventName === "undefined") {
			this._eventHandler = {};
			return this;
		}

		// All handler of specific event detach.
		if (typeof handlerToDetach === "undefined") {
			if (typeof eventName === "string") {
				this._eventHandler[eventName] = undefined;
				return this;
			} else {
				var eventHash = eventName;
				var name = void 0;

				for (name in eventHash) {
					this.off(name, eventHash[name]);
				}
				return this;
			}
		}

		// The handler of specific event detach.
		var handlerList = this._eventHandler[eventName];

		if (handlerList) {
			var k = void 0;
			var handlerFunction = void 0;

			for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
				if (handlerFunction === handlerToDetach) {
					handlerList = handlerList.splice(k, 1);
					break;
				}
			}
		}

		return this;
	};

	return Component;
}();

exports["default"] = Component;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=component.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports["default"] = function (superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class(el, options) {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, _superclass.call(this));

			_this._onScroll = _this._onScroll.bind(_this);
			_this._onResize = _this._onResize.bind(_this);
			return _this;
		}

		_class.prototype._attachEvent = function _attachEvent() {
			_utils.utils.addEvent(this.view, "scroll", this._onScroll);
			_utils.utils.addEvent(window, "resize", this._onResize);
		};

		_class.prototype._onScroll = function _onScroll() {
			if (this.isProcessing()) {
				return;
			}
			var scrollTop = _utils.utils.scrollTop(this.view);
			var prevScrollTop = this._status.prevScrollTop;

			if (_consts.IS_IOS && scrollTop === 0 || prevScrollTop === scrollTop) {
				return;
			}
			var ele = void 0;
			var rect = void 0;

			if (prevScrollTop < scrollTop) {
				if (_utils.utils.isEmptyObject(this._status.bottomElement)) {
					this._status.bottomElement = this.getBottomElement();
					if (this._status.bottomElement == null) {
						return;
					}
				}
				ele = this._status.bottomElement;
				rect = ele.getBoundingClientRect();
				if (rect.top <= this._status.clientHeight + this.options.threshold) {
					/**
      * This event is fired when a card element must be added at the bottom of a grid layout because there is no card to be displayed on screen when a user scrolls near bottom.
      * @ko ?????? ??????????????? ????????? ??????????????? ????????? ???????????? ??? ??? ???????????? ?????????. ???????????? ????????? ??????????????? ????????? ????????? ????????? ?????? ??? ????????????
      * @event eg.InfiniteGrid#append
      *
      * @param {Object} param The object of data to be sent to an event <ko>???????????? ???????????? ????????? ??????</ko>
      * @param {Number} param.scrollTop Current vertical position of the scroll bar<ko>?????? ???????????? y ?????? ???</ko>
      */
					this.trigger("append", {
						scrollTop: scrollTop
					});
				}
			} else {
				if (_utils.utils.isEmptyObject(this._status.topElement)) {
					this._status.topElement = this.getTopElement();
					if (this._status.topElement == null) {
						return;
					}
				}
				ele = this._status.topElement;
				rect = ele.getBoundingClientRect();
				if (rect.bottom >= -this.options.threshold) {
					/**
      * This event is fired when a card element must be added at the top of a grid layout because there is no card to be displayed on screen when a user scrolls near top. This event is available only if the isRecycling() method returns true.
      * @ko ????????? ????????? ??????????????? ?????? ???????????? ??? ??? ???????????? ?????????. ???????????? ?????? ??????????????? ????????? ????????? ????????? ?????? ??? ????????????. ??? ???????????? isRecycling() ???????????? ???????????? 'true'??? ?????? ????????????
      * @event eg.InfiniteGrid#prepend
      *
      * @param {Object} param The object of data to be sent to an event<ko>???????????? ???????????? ????????? ??????</ko>
      * @param {Number} param.scrollTop Current vertical position of the scroll bar<ko>?????? ???????????? y ?????? ???</ko>
      */
					var croppedDistance = this._fitItems();

					if (croppedDistance > 0) {
						scrollTop -= croppedDistance;
						_utils.utils.scrollTo(this.view, 0, scrollTop);
					}
					this.trigger("prepend", {
						scrollTop: scrollTop
					});
				}
			}
			this._status.prevScrollTop = scrollTop;
		};

		_class.prototype._onResize = function _onResize() {
			var _this2 = this;

			if (this._timer.resize) {
				clearTimeout(this._timer.resize);
			}
			this._timer.resize = setTimeout(function () {
				if (_this2.layoutManager.isNeededResize()) {
					_this2._resizeViewport();
					_this2.layout(true);
				}
				_this2._timer.resize = null;
				_this2._status.prevScrollTop = -1;
			}, 100);
		};

		_class.prototype._detachEvent = function _detachEvent() {
			_utils.utils.removeEvent(this.view, "scroll", this._onScroll);
			_utils.utils.removeEvent(window, "resize", this._onResize);
		};

		return _class;
	}(superclass);
};

module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _consts = __webpack_require__(1);

var _utils = __webpack_require__(0);

var ImageLoaded = {
	checkImageLoaded: function checkImageLoaded(el) {
		return _utils.utils.toArray(el.querySelectorAll("img")).filter(function (v) {
			if (v.nodeType && [1, 9, 11].indexOf(v.nodeType) !== -1) {
				return !v.complete;
			} else {
				return false;
			}
		});
	},
	waitImageLoaded: function waitImageLoaded(needCheck, callback) {
		var checkCount = needCheck.length;
		var checkImage = function checkImage() {
			checkCount--;
			checkCount <= 0 && callback && callback();
		};
		var onCheck = function onCheck(e) {
			_utils.utils.removeEvent(e.target || e.srcElement, "load", onCheck);
			_utils.utils.removeEvent(e.target || e.srcElement, "error", onCheck);
			checkImage();
		};

		// workaround for IE
		_consts.IS_IE && needCheck.forEach(function (v) {
			return v.setAttribute("src", v.getAttribute("src"));
		});
		needCheck.forEach(function (v) {
			if (v.complete) {
				checkImage();
			} else {
				_utils.utils.addEvent(v, "load", onCheck);
				_utils.utils.addEvent(v, "error", onCheck);
			}
		});
	}
};

exports["default"] = ImageLoaded;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayoutManager = function () {
	LayoutManager.itemize = function itemize(elements, groupKey, isAppend) {
		return _utils.utils.toArray(elements).map(function (v) {
			return {
				el: v,
				position: {
					x: 0,
					y: 0
				},
				groupKey: typeof groupKey === "undefined" ? null : groupKey
			};
		});
	};

	function LayoutManager(el, options) {
		_classCallCheck(this, LayoutManager);

		this.options = options;
		this.size = {
			columnWidth: null,
			containerWidth: null,
			equalItemSize: null
		};
		this.el = el;
		this.el.style.position = "relative";
		this.clear();
		this.prependCols = [];
		this.appendCols = [];
	}

	LayoutManager.prototype.appendItems = function appendItems(items) {
		this.items = this.items.concat(items);
	};

	LayoutManager.prototype.prependItems = function prependItems(items) {
		// insert items (when prepending)
		this.items = items.concat(this.items);
		var y = this.getTopPositonY();

		if (y !== 0) {
			this.items.forEach(function (v) {
				v.position.y -= y;
			});
			this.syncCols(false); // for prepending
			this.syncCols(true); // for appending
			return this.items;
		}
		return items;
	};

	LayoutManager.prototype.removeItem = function removeItem(element) {
		var item = null;
		var idx = -1;

		for (var i = 0, len = this.items.length; i < len; i++) {
			if (this.items[i].el === element) {
				idx = i;
				break;
			}
		}
		if (~idx) {
			// remove item information
			item = _extends({}, this.items[idx]);
			this.items.splice(idx, 1);

			// remove item element
			item.el.parentNode.removeChild(item.el);
		}
		return item;
	};

	LayoutManager.prototype.prepareLayout = function prepareLayout(isRelayout, addItems, isAppend) {
		var isInit = !this.items.length;

		// insert items (when appending)
		if (addItems && isAppend) {
			this.appendItems(addItems);
		}
		if (isInit && addItems) {
			addItems.forEach(function (v) {
				v.el.style.position = "absolute";
			});
		}
		if (isInit || isRelayout) {
			this.resetCols(this.measureColumns());
		} else if (!addItems) {
			this.appendCols = [].concat(this.prependCols);
		}
	};

	LayoutManager.prototype.layoutItems = function layoutItems(isRelayout, addItems, options) {
		var _this = this;

		this.prepareLayout(isRelayout, addItems, options.isAppend);
		var items = addItems || this.items;

		items.forEach(function (v) {
			v.position = _this.getItemPosition(isRelayout, v, options.isAppend);
		});
		if (addItems && !options.isAppend) {
			// insert items (when prepending)
			items = this.prependItems(addItems.sort(function (p, c) {
				return p.position.y - c.position.y;
			}));
		}

		// for performance
		var style = void 0;

		items.forEach(function (v) {
			if (v.el) {
				style = v.el.style;
				style.left = v.position.x + "px";
				style.top = v.position.y + "px";
			}
		});
	};

	LayoutManager.prototype.resetCols = function resetCols(count) {
		var arr = [];
		var tmpCount = count || this.appendCols.length || 0;

		while (tmpCount--) {
			arr.push(0);
		}
		this.appendCols = arr.concat();
		this.prependCols = arr.concat();
	};

	LayoutManager.prototype.clear = function clear() {
		this.items = [];
	};

	LayoutManager.prototype.getItemPosition = function getItemPosition(isRelayout, item, isAppend) {
		if (!item || !item.el) {
			return {
				x: 0,
				y: 0
			};
		}

		if (isRelayout || !item.size) {
			item.size = this.getItemSize(item.el);
		}
		var cols = isAppend ? this.appendCols : this.prependCols;
		var y = Math[isAppend ? "min" : "max"].apply(Math, cols);
		var shortColIndex = void 0;

		if (isAppend) {
			shortColIndex = cols.indexOf(y);
		} else {
			var i = cols.length;

			while (i-- >= 0) {
				if (cols[i] === y) {
					shortColIndex = i;
					break;
				}
			}
		}
		cols[shortColIndex] = y + (isAppend ? item.size.height : -item.size.height);

		return {
			x: this.size.columnWidth * shortColIndex,
			y: isAppend ? y : y - item.size.height
		};
	};

	LayoutManager.prototype.getGroupKeys = function getGroupKeys() {
		return this.items.map(function (v) {
			return v.groupKey;
		});
	};

	LayoutManager.prototype.syncCols = function syncCols(isBottom) {
		if (!this.items.length) {
			return;
		}
		var items = this.getColItems(isBottom);
		var col = isBottom ? this.appendCols : this.prependCols;
		var len = col.length;

		for (var i = 0; i < len; i++) {
			col[i] = items[i].position.y + (isBottom ? items[i].size.height : 0);
		}
	};

	LayoutManager.prototype.getTopPositonY = function getTopPositonY() {
		var item = this.getTopItem();

		return item ? item.position.y : 0;
	};

	LayoutManager.prototype.getTopItem = function getTopItem() {
		var item = null;
		var min = Infinity;

		this.getColItems(false).forEach(function (v) {
			if (v && v.position.y < min) {
				min = v.position.y;
				item = v;
			}
		});
		return item;
	};

	LayoutManager.prototype.getBottomItem = function getBottomItem() {
		var max = -Infinity;
		var item = null;
		var pos = void 0;

		this.getColItems(true).forEach(function (v) {
			pos = v ? v.position.y + v.size.height : 0;
			if (pos >= max) {
				max = pos;
				item = v;
			}
		});
		return item;
	};

	LayoutManager.prototype.getColIdx = function getColIdx(item) {
		return parseInt(item.position.x / parseInt(this.size.columnWidth, 10), 10);
	};

	LayoutManager.prototype.getColItems = function getColItems(isBottom) {
		var len = this.appendCols.length;
		var colItems = new Array(len);
		var item = void 0;
		var idx = void 0;
		var count = 0;
		var i = isBottom ? this.items.length - 1 : 0;

		while (item = this.items[i]) {
			idx = this.getColIdx(item);
			if (!colItems[idx]) {
				colItems[idx] = item;
				if (++count === len) {
					return colItems;
				}
			}
			i += isBottom ? -1 : 1;
		}
		return colItems;
	};
	// fit size


	LayoutManager.prototype.fit = function fit() {
		// for caching
		if (this.options.count <= 0) {
			this.fit = function () {
				return 0;
			};
			return false;
		}

		var y = this.getTopPositonY();

		if (y !== 0) {
			// need to fit
			this.items.forEach(function (v) {
				v.position.y -= y;
				v.el.style.top = v.position.y + "px";
			});
			this.syncCols(false); // for prepending
			this.syncCols(true); // for appending
		}
		return y;
	};

	LayoutManager.prototype.getLogicalHeight = function getLogicalHeight() {
		return Math.max.apply(Math, this.appendCols);
	};

	LayoutManager.prototype.getDelimiterIndex = function getDelimiterIndex(isTop, removeCount) {
		var len = this.items.length;

		if (len === removeCount) {
			return len;
		}
		var i = void 0;
		var idx = 0;
		var baseIdx = isTop ? removeCount - 1 : len - removeCount;
		var targetIdx = baseIdx + (isTop ? 1 : -1);
		var groupKey = this.items[baseIdx].groupKey;

		if (groupKey != null && groupKey === this.items[targetIdx].groupKey) {
			if (isTop) {
				for (i = baseIdx; i > 0; i--) {
					if (groupKey !== this.items[i].groupKey) {
						break;
					}
				}
				idx = i === 0 ? -1 : i + 1;
			} else {
				for (i = baseIdx; i < len; i++) {
					if (groupKey !== this.items[i].groupKey) {
						break;
					}
				}
				idx = i === len ? -1 : i;
			}
		} else {
			idx = isTop ? targetIdx : baseIdx;
		}
		return idx;
	};

	LayoutManager.prototype.adjustItems = function adjustItems(isTop, idx) {
		var targets = void 0;

		if (isTop) {
			targets = this.items.splice(0, idx);
			this.syncCols(false); // for prepending
		} else {
			targets = idx === this.items.length ? this.items.splice(0) : this.items.splice(idx, this.items.length - idx);
			this.syncCols(true); // for appending;
		}
		return targets;
	};

	LayoutManager.prototype.measureColumns = function measureColumns() {
		this.el.style.width = null;
		this.size.containerWidth = _utils.utils.innerWidth(this.el);
		this.size.columnWidth = this.getColumnWidth() || this.size.containerWidth;
		var cols = this.size.containerWidth / this.size.columnWidth;
		var excess = this.size.columnWidth - this.size.containerWidth % this.size.columnWidth;

		// if overshoot is less than a pixel, round up, otherwise floor it
		cols = Math.max(Math[excess && excess <= 1 ? "round" : "floor"](cols), 1);
		return cols || 0;
	};

	LayoutManager.prototype.getItemSize = function getItemSize(el) {
		return this.size.equalItemSize || {
			width: _utils.utils.innerWidth(el),
			height: _utils.utils.innerHeight(el)
		};
	};

	LayoutManager.prototype.getColumnWidth = function getColumnWidth() {
		var width = 0;
		var el = this.items[0] && this.items[0].el;

		if (el) {
			width = _utils.utils.innerWidth(el);
			if (this.options.isEqualSize) {
				this.size.equalItemSize = {
					width: width,
					height: _utils.utils.innerHeight(el)
				};
			}
		}
		return width;
	};

	LayoutManager.prototype.isNeededResize = function isNeededResize() {
		return _utils.utils.innerWidth(this.el) !== this.size.containerWidth;
	};

	LayoutManager.prototype.getStatus = function getStatus() {
		var data = {};

		for (var p in this) {
			if (Object.prototype.hasOwnProperty.call(this, p) && typeof this[p] !== "function" && !(this[p] instanceof Element)) {
				data[p] = this[p];
			}
		}
		return {
			prop: data,
			items: this.items.map(function (v) {
				var clone = _extends({}, v);

				delete clone.el;
				return clone;
			})
		};
	};

	LayoutManager.prototype.setStatus = function setStatus(status) {
		if (!status || !status.prop || !status.items) {
			return this;
		}
		_extends(this, status.prop);
		this.items = _utils.utils.toArray(this.el.children).map(function (v, i) {
			status.items[i].el = v;
			return status.items[i];
		});
		return this;
	};

	return LayoutManager;
}();

exports["default"] = LayoutManager;
module.exports = exports["default"];

/***/ })
/******/ ]);
});