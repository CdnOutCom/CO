/*!
 * wavesurfer.js mediasession plugin 4.5.0 (2021-02-14)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WaveSurfer", [], factory);
	else if(typeof exports === 'object')
		exports["WaveSurfer"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["mediasession"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/plugin/mediasession/index.js":
/*!******************************************!*\
  !*** ./src/plugin/mediasession/index.js ***!
  \******************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*global MediaMetadata*/

/**
 * @typedef {Object} MediaSessionPluginParams
 * @property {MediaMetadata} metadata A MediaMetadata object: a representation
 * of the metadata associated with a MediaSession that can be used by user agents
 * to provide a customized user interface.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('mediasession')`
 */

/**
 * Visualize MediaSession information for a wavesurfer instance.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import MediaSessionPlugin from 'wavesurfer.mediasession.js';
 *
 * // commonjs
 * var MediaSessionPlugin = require('wavesurfer.mediasession.js');
 *
 * // if you are using <script> tags
 * var MediaSessionPlugin = window.WaveSurfer.mediasession;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     MediaSessionPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
var MediaSessionPlugin = /*#__PURE__*/function () {
  _createClass(MediaSessionPlugin, null, [{
    key: "create",

    /**
     * MediaSession plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by wavesurfer to correctly instantiate the plugin.
     *
     * @param  {MediaSessionPluginParams} params parameters use to initialise the plugin
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {
      return {
        name: 'mediasession',
        deferInit: params && params.deferInit ? params.deferInit : false,
        params: params,
        instance: MediaSessionPlugin
      };
    }
  }]);

  function MediaSessionPlugin(params, ws) {
    var _this = this;

    _classCallCheck(this, MediaSessionPlugin);

    this.params = params;
    this.wavesurfer = ws;

    if ('mediaSession' in navigator) {
      // update metadata
      this.metadata = this.params.metadata;
      this.update(); // update metadata when playback starts

      this.wavesurfer.on('play', function () {
        _this.update();
      }); // set playback action handlers

      navigator.mediaSession.setActionHandler('play', function () {
        _this.wavesurfer.play();
      });
      navigator.mediaSession.setActionHandler('pause', function () {
        _this.wavesurfer.playPause();
      });
      navigator.mediaSession.setActionHandler('seekbackward', function () {
        _this.wavesurfer.skipBackward();
      });
      navigator.mediaSession.setActionHandler('seekforward', function () {
        _this.wavesurfer.skipForward();
      });
    }
  }

  _createClass(MediaSessionPlugin, [{
    key: "init",
    value: function init() {}
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "update",
    value: function update() {
      if ((typeof MediaMetadata === "undefined" ? "undefined" : _typeof(MediaMetadata)) === (typeof Function === "undefined" ? "undefined" : _typeof(Function))) {
        // set metadata
        navigator.mediaSession.metadata = new MediaMetadata(this.metadata);
      }
    }
  }]);

  return MediaSessionPlugin;
}();

exports.default = MediaSessionPlugin;
module.exports = exports.default;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/plugin/mediasession/index.js");
/******/ })()
;
});
//# sourceMappingURL=wavesurfer.mediasession.js.map